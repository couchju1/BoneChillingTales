<?php
// Newsletter sign-up handler. Emails the new subscriber's address to the site inbox.
// Answers JSON to the page's script, or redirects when the browser posted the form itself.
declare(strict_types=1);

const MAX_PER_HOUR = 5;
const MIN_SECONDS = 2;

$wantsJson = str_contains($_SERVER['HTTP_ACCEPT'] ?? '', 'application/json');

function respond(bool $ok, int $status = 200, string $message = ''): never
{
    global $wantsJson;
    http_response_code($status);
    header('Cache-Control: no-store');
    if ($wantsJson) {
        header('Content-Type: application/json; charset=utf-8');
        echo json_encode(['status' => $ok ? 'success' : 'failed', 'message' => $message]);
        exit;
    }
    if ($ok) {
        header('Location: /newsletter/joined/', true, 303);
        exit;
    }
    header('Content-Type: text/html; charset=utf-8');
    $text = htmlspecialchars($message ?: 'That didn\'t go through.', ENT_QUOTES, 'UTF-8');
    echo "<!doctype html><html lang=\"en\"><meta charset=\"utf-8\"><meta name=\"viewport\" content=\"width=device-width, initial-scale=1\">"
        . "<meta name=\"robots\" content=\"noindex\"><title>Not signed up | Bone Chilling Tales</title>"
        . "<body style=\"background:#120F0D;color:#E8DACB;font:1.1rem/1.6 Georgia,serif;max-width:40rem;margin:3rem auto;padding:0 1rem\">"
        . "<h1>Not signed up</h1><p>{$text}</p>"
        . "<p><a style=\"color:#E8DACB\" href=\"/newsletter/\">Try again</a></p></body></html>";
    exit;
}

if (($_SERVER['REQUEST_METHOD'] ?? '') !== 'POST') {
    header('Allow: POST');
    respond(false, 405, 'Use the sign-up form on the Newsletter page.');
}

$config = is_file(__DIR__ . '/config.php') ? require __DIR__ . '/config.php' : [];
$to = (string) ($config['to'] ?? '');
$domain = (string) ($config['domain'] ?? 'bonechillingtales.com');
$cc = (string) ($config['newsletterCc'] ?? '');

// Bots fill in the hidden "website" field, or post faster than a person can type.
// Both get the same answer as a real sign-up, and nothing is sent.
if (trim((string) ($_POST['website'] ?? '')) !== '') {
    respond(true);
}
$started = (int) ($_POST['started'] ?? 0);
if ($started > 0 && (microtime(true) * 1000 - $started) < MIN_SECONDS * 1000) {
    respond(true);
}

$email = (string) preg_replace('/\p{C}/u', '', trim((string) ($_POST['email_address'] ?? '')));
if ($email === '' || mb_strlen($email) > 254 || !filter_var($email, FILTER_VALIDATE_EMAIL)) {
    respond(false, 422, 'That email doesn\'t look right. Check it and try again.');
}

// Set when the reader signed up from a story.
$story = (string) ($_POST['story'] ?? '');
$story = preg_match('/^[a-z0-9_-]{1,120}$/', $story) ? $story : '';

if ($to === '' || !filter_var($to, FILTER_VALIDATE_EMAIL)) {
    respond(false, 503, 'Sign-up isn\'t set up yet. Try again later.');
}

// Rate limit: five sign-ups per address per hour, counted in a temp file outside the site folder.
$ip = (string) ($_SERVER['REMOTE_ADDR'] ?? 'unknown');
$file = sys_get_temp_dir() . '/bct-subscribe-' . hash('sha256', $ip . __DIR__) . '.json';
$handle = fopen($file, 'c+');
if ($handle !== false && flock($handle, LOCK_EX)) {
    $now = time();
    $times = json_decode((string) stream_get_contents($handle), true);
    $times = array_values(array_filter(is_array($times) ? $times : [], fn ($t) => is_int($t) && $t > $now - 3600));
    if (count($times) >= MAX_PER_HOUR) {
        flock($handle, LOCK_UN);
        fclose($handle);
        respond(false, 429, 'Too many sign-ups from this connection. Try again in an hour.');
    }
    $times[] = $now;
    ftruncate($handle, 0);
    rewind($handle);
    fwrite($handle, json_encode($times));
    flock($handle, LOCK_UN);
    fclose($handle);
}

$subject = "Newsletter sign-up: {$email}";
$body = "New newsletter sign-up: {$email}\n"
    . ($story ? "Signed up from the story: https://www.{$domain}/cases/{$story}/\n" : '')
    . "\n-- Sent from the newsletter form, " . gmdate('Y-m-d H:i') . " UTC\n";

$headers = [
    'From' => "Bone Chilling Tales <noreply@{$domain}>",
    'Reply-To' => $email,
    'Content-Type' => 'text/plain; charset=UTF-8',
    'X-Mailer' => 'bct-subscribe',
];
if ($cc !== '' && filter_var($cc, FILTER_VALIDATE_EMAIL) && strcasecmp($cc, $to) !== 0) {
    $headers['Cc'] = $cc;
}

$sent = mail($to, mb_encode_mimeheader($subject, 'UTF-8'), $body, $headers);
if (!$sent) {
    respond(false, 500, 'That didn\'t go through. Try again in a minute.');
}
respond(true);
