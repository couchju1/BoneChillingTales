<?php
// Suggest-a-case form handler. Sends one plain-text email per real submission.
// Answers JSON to the page's script, or redirects when the browser posted the form itself.
declare(strict_types=1);

const MAX_PER_HOUR = 5;
const MIN_SECONDS = 3;
const LIMITS = [
    'case' => 200,
    'place' => 120,
    'details' => 5000,
    'links' => 2000,
    'email' => 254,
];

$wantsJson = str_contains($_SERVER['HTTP_ACCEPT'] ?? '', 'application/json');

function respond(bool $ok, int $status = 200, string $message = '', array $errors = []): never
{
    global $wantsJson;
    http_response_code($status);
    header('Cache-Control: no-store');
    if ($wantsJson) {
        header('Content-Type: application/json; charset=utf-8');
        echo json_encode(['ok' => $ok, 'message' => $message, 'errors' => (object) $errors]);
        exit;
    }
    if ($ok) {
        header('Location: /suggest/sent/', true, 303);
        exit;
    }
    header('Content-Type: text/html; charset=utf-8');
    $text = htmlspecialchars($message ?: 'That didn\'t go through.', ENT_QUOTES, 'UTF-8');
    $list = '';
    foreach ($errors as $error) {
        $list .= '<li>' . htmlspecialchars($error, ENT_QUOTES, 'UTF-8') . '</li>';
    }
    echo "<!doctype html><html lang=\"en\"><meta charset=\"utf-8\"><meta name=\"viewport\" content=\"width=device-width, initial-scale=1\">"
        . "<meta name=\"robots\" content=\"noindex\"><title>Not sent | Bone Chilling Tales</title>"
        . "<body style=\"background:#120F0D;color:#E8DACB;font:1.1rem/1.6 Georgia,serif;max-width:40rem;margin:3rem auto;padding:0 1rem\">"
        . "<h1>Not sent</h1><p>{$text}</p>" . ($list ? "<ul>{$list}</ul>" : '')
        . "<p>Your browser's back button takes you to the form with what you typed.</p>"
        . "<p><a style=\"color:#E8DACB\" href=\"/suggest/\">Open a fresh form</a></p></body></html>";
    exit;
}

/** Trims, drops control characters except newlines and tabs in long fields. */
function clean(string $value, bool $multiline): string
{
    $value = str_replace(["\r\n", "\r"], "\n", trim($value));
    $pattern = $multiline ? '/[^\P{C}\n\t]/u' : '/\p{C}/u';
    return (string) preg_replace($pattern, '', $value);
}

if (($_SERVER['REQUEST_METHOD'] ?? '') !== 'POST') {
    header('Allow: POST');
    respond(false, 405, 'Use the form on the Suggest a case page.');
}

$config = is_file(__DIR__ . '/config.php') ? require __DIR__ . '/config.php' : [];
$to = (string) ($config['to'] ?? '');
$domain = (string) ($config['domain'] ?? 'bonechillingtales.com');

// Bots fill in the hidden "website" field, or post faster than a person can type.
// Both get the same answer as a real sender, and nothing is sent.
if (trim((string) ($_POST['website'] ?? '')) !== '') {
    respond(true);
}
$started = (int) ($_POST['started'] ?? 0);
if ($started > 0 && (time() * 1000 - $started) < MIN_SECONDS * 1000) {
    respond(true);
}

$fields = [
    'case' => clean((string) ($_POST['case'] ?? ''), false),
    'place' => clean((string) ($_POST['place'] ?? ''), false),
    'details' => clean((string) ($_POST['details'] ?? ''), true),
    'links' => clean((string) ($_POST['links'] ?? ''), true),
    'email' => clean((string) ($_POST['email'] ?? ''), false),
];

// Set when the reader came from a story's "Suggest a correction" link.
$story = (string) ($_POST['story'] ?? '');
$story = preg_match('/^[a-z0-9_-]{1,120}$/', $story) ? $story : '';

$errors = [];
if ($fields['case'] === '') $errors['case'] = 'Add the case or the person\'s name.';
if ($fields['place'] === '') $errors['place'] = 'Add the town and state.';
if ($fields['details'] === '') $errors['details'] = 'Tell us what we should know.';
if ($fields['email'] !== '' && !filter_var($fields['email'], FILTER_VALIDATE_EMAIL)) {
    $errors['email'] = 'That email doesn\'t look right. Check it, or leave it blank.';
}
foreach (LIMITS as $name => $max) {
    if (!isset($errors[$name]) && mb_strlen($fields[$name]) > $max) {
        $errors[$name] = "Keep this under {$max} characters.";
    }
}
if ($errors) {
    respond(false, 422, 'Fix the fields marked below and send it again.', $errors);
}

if ($to === '' || !filter_var($to, FILTER_VALIDATE_EMAIL)) {
    respond(false, 503, 'The form isn\'t set up yet. Try again later.');
}

// Rate limit: five sends per address per hour, counted in a temp file outside the site folder.
$ip = (string) ($_SERVER['REMOTE_ADDR'] ?? 'unknown');
$file = sys_get_temp_dir() . '/bct-suggest-' . hash('sha256', $ip . __DIR__) . '.json';
$handle = fopen($file, 'c+');
if ($handle !== false && flock($handle, LOCK_EX)) {
    $now = time();
    $times = json_decode((string) stream_get_contents($handle), true);
    $times = array_values(array_filter(is_array($times) ? $times : [], fn ($t) => is_int($t) && $t > $now - 3600));
    if (count($times) >= MAX_PER_HOUR) {
        flock($handle, LOCK_UN);
        fclose($handle);
        respond(false, 429, 'You\'ve sent a few already. Try again in an hour.');
    }
    $times[] = $now;
    ftruncate($handle, 0);
    rewind($handle);
    fwrite($handle, json_encode($times));
    flock($handle, LOCK_UN);
    fclose($handle);
}

$subject = ($story ? 'Correction request: ' : 'Case suggestion: ') . mb_substr($fields['case'], 0, 80);
$body = ($story ? "Sent from the story: https://www.{$domain}/cases/{$story}/\n" : '')
    . "Case or person: {$fields['case']}\n"
    . "Town and state: {$fields['place']}\n"
    . 'Reply to: ' . ($fields['email'] ?: 'no email given') . "\n\n"
    . "What they want us to know:\n{$fields['details']}\n\n"
    . "Links:\n" . ($fields['links'] ?: 'none') . "\n\n"
    . '-- Sent from the Suggest a case form, ' . gmdate('Y-m-d H:i') . " UTC\n";

$headers = [
    'From' => "Bone Chilling Tales <noreply@{$domain}>",
    'Content-Type' => 'text/plain; charset=UTF-8',
    'X-Mailer' => 'bct-suggest',
];
if ($fields['email'] !== '') {
    $headers['Reply-To'] = $fields['email'];
}

$sent = mail($to, mb_encode_mimeheader($subject, 'UTF-8'), $body, $headers);
if (!$sent) {
    respond(false, 500, 'That didn\'t go through. Try again in a minute.');
}
respond(true);
