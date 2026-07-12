// Validates the contact form client-side, then submits it to Formspree so
// messages actually reach an inbox (Formspree's free tier needs no backend).
//
// Setup: sign up at https://formspree.io, create a form pointed at your
// email, and replace FORMSPREE_ENDPOINT below with the endpoint it gives you.
const FORMSPREE_ENDPOINT = 'https://formspree.io/f/meeyjbdj';

function validate(fields) {
  const errors = {};
  if (!fields.name.trim()) errors.name = 'Please enter your name';
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(fields.email.trim())) {
    errors.email = 'Enter a valid email address';
  }
  if (fields.message.trim().length < 10) {
    errors.message = 'Message must be at least 10 characters';
  }
  return errors;
}

function setFieldError(form, name, message) {
  const field = form.querySelector(`[data-field="${name}"]`);
  if (!field) return;
  const errorEl = field.querySelector('.contact-form__error');
  field.classList.toggle('has-error', Boolean(message));
  if (errorEl) errorEl.textContent = message || '';
}

export function initContactForm() {
  const form = document.querySelector('.contact-form');
  const statusEl = document.querySelector('.contact-form__status');
  const sentNameEl = statusEl?.querySelector('[data-sent-name]');
  const resetBtn = statusEl?.querySelector('[data-reset]');
  if (!form || !statusEl) return;

  const showForm = () => {
    form.hidden = false;
    statusEl.hidden = true;
  };
  const showSuccess = (name) => {
    if (sentNameEl) sentNameEl.textContent = name;
    form.hidden = true;
    statusEl.hidden = false;
  };

  resetBtn?.addEventListener('click', () => {
    form.reset();
    ['name', 'email', 'message'].forEach((f) => setFieldError(form, f, ''));
    showForm();
  });

  form.addEventListener('submit', async (event) => {
    event.preventDefault();

    const fields = {
      name: form.elements.name.value,
      email: form.elements.email.value,
      message: form.elements.message.value,
    };
    const errors = validate(fields);
    ['name', 'email', 'message'].forEach((f) => setFieldError(form, f, errors[f]));
    if (Object.keys(errors).length) return;

    const submitBtn = form.querySelector('button[type="submit"]');
    submitBtn.disabled = true;
    submitBtn.textContent = 'Sending...';

    try {
      const response = await fetch(FORMSPREE_ENDPOINT, {
        method: 'POST',
        headers: { Accept: 'application/json' },
        body: new FormData(form),
      });
      if (!response.ok) throw new Error('Form submission failed');
      showSuccess(fields.name.trim().split(' ')[0]);
    } catch (err) {
      setFieldError(form, 'message', "Couldn't send your message — please email me directly instead.");
    } finally {
      submitBtn.disabled = false;
      submitBtn.textContent = 'Send message';
    }
  });
}
