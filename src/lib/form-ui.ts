// Browser helpers shared by the newsletter and suggest forms.

/** Marks a field invalid and shows its message in the element its aria-describedby points to. */
export function setFieldError(field: HTMLInputElement | HTMLTextAreaElement, message: string) {
  const box = document.getElementById(`${field.id}-error`);
  field.setAttribute("aria-invalid", "true");
  if (box) {
    box.textContent = message;
    box.hidden = false;
  }
}

export function clearFieldError(field: HTMLInputElement | HTMLTextAreaElement) {
  const box = document.getElementById(`${field.id}-error`);
  field.removeAttribute("aria-invalid");
  if (box) {
    box.textContent = "";
    box.hidden = true;
  }
}

/** Disables the submit button and swaps its label while a request is out. */
export function setBusy(button: HTMLButtonElement, busy: boolean, busyLabel = "Sending") {
  button.dataset.label ??= button.textContent ?? "";
  button.disabled = busy;
  button.setAttribute("aria-busy", String(busy));
  button.textContent = busy ? busyLabel : button.dataset.label;
}

export const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
