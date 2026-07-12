// Mobile menu toggle: swap the hamburger/close icon, show/hide the dropdown,
// and close it whenever a link inside is clicked (anchor scrolling itself is
// handled natively via CSS scroll-behavior + scroll-margin-top).
export function initNav() {
  const toggle = document.querySelector('.menu-toggle');
  const panel = document.querySelector('.nav-mobile');
  if (!toggle || !panel) return;

  const icon = toggle.querySelector('i');

  const setOpen = (open) => {
    panel.hidden = !open;
    toggle.setAttribute('aria-expanded', String(open));
    icon.classList.toggle('fa-bars', !open);
    icon.classList.toggle('fa-xmark', open);
  };

  toggle.addEventListener('click', () => {
    setOpen(panel.hidden);
  });

  panel.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => setOpen(false));
  });
}
