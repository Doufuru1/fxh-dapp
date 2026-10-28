const amountInput = document.querySelector('#amount');
const estimate = document.querySelector('#estimate');
const presetButtons = document.querySelectorAll('[data-amount]');
const modal = document.querySelector('#connect-modal');
const menuToggle = document.querySelector('.menu-toggle');
const nav = document.querySelector('.desktop-nav');
const COMMUNITY_TOTAL = 10000;
const COMMUNITY_ALLOCATION = 800000000;

function formatNumber(value) {
  return new Intl.NumberFormat('en-US', { maximumFractionDigits: 0 }).format(value);
}

function updateEstimate() {
  const raw = Number(amountInput.value) || 0;
  const bounded = Math.min(Math.max(raw, 0), 20);
  const result = bounded / COMMUNITY_TOTAL * COMMUNITY_ALLOCATION;
  estimate.textContent = formatNumber(result);
  presetButtons.forEach((button) => {
    button.classList.toggle('selected', Number(button.dataset.amount) === bounded);
  });
}

amountInput.addEventListener('input', updateEstimate);
presetButtons.forEach((button) => {
  button.addEventListener('click', () => {
    amountInput.value = button.dataset.amount;
    updateEstimate();
  });
});

function toggleModal(show) {
  modal.hidden = !show;
  document.body.style.overflow = show ? 'hidden' : '';
  if (show) modal.querySelector('[data-close-modal]').focus();
}

document.querySelectorAll('.js-connect').forEach((button) => {
  button.addEventListener('click', () => toggleModal(true));
});
document.querySelectorAll('[data-close-modal]').forEach((button) => {
  button.addEventListener('click', () => toggleModal(false));
});
document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape' && !modal.hidden) toggleModal(false);
});

menuToggle.addEventListener('click', () => {
  const open = nav.classList.toggle('open');
  menuToggle.setAttribute('aria-expanded', String(open));
});
nav.querySelectorAll('a').forEach((link) => {
  link.addEventListener('click', () => {
    nav.classList.remove('open');
    menuToggle.setAttribute('aria-expanded', 'false');
  });
});

updateEstimate();

const heroArt = document.querySelector('.hero-art');
const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const finePointer = window.matchMedia('(pointer: fine)').matches;

if (heroArt && finePointer && !reducedMotion) {
  let frame;
  const resetParallax = () => {
    heroArt.style.setProperty('--parallax-x', '0px');
    heroArt.style.setProperty('--parallax-y', '0px');
    heroArt.style.setProperty('--parallax-x-small', '0px');
    heroArt.style.setProperty('--parallax-y-small', '0px');
    heroArt.style.setProperty('--parallax-x-tag', '0px');
    heroArt.style.setProperty('--parallax-y-tag', '0px');
  };

  heroArt.addEventListener('pointermove', (event) => {
    const rect = heroArt.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width - 0.5;
    const y = (event.clientY - rect.top) / rect.height - 0.5;
    cancelAnimationFrame(frame);
    frame = requestAnimationFrame(() => {
      heroArt.style.setProperty('--parallax-x', `${x * 10}px`);
      heroArt.style.setProperty('--parallax-y', `${y * 10}px`);
      heroArt.style.setProperty('--parallax-x-small', `${x * 15}px`);
      heroArt.style.setProperty('--parallax-y-small', `${y * 15}px`);
      heroArt.style.setProperty('--parallax-x-tag', `${x * 5}px`);
      heroArt.style.setProperty('--parallax-y-tag', `${y * 5}px`);
    });
  });
  heroArt.addEventListener('pointerleave', resetParallax);
}

const SOFT_CAP = 200;
const progressInput = document.querySelector('#progress-input');
const progressFill = document.querySelector('#progress-fill');
const progressTrack = document.querySelector('#progress-track');
const progressPercent = document.querySelector('#progress-percent');
const progressAmount = document.querySelector('#progress-amount');
const progressStatus = document.querySelector('#progress-status');

function updateProgress() {
  const amount = Math.max(Number(progressInput.value) || 0, 0);
  const percent = amount / SOFT_CAP * 100;
  const displayedPercent = Number.isInteger(percent) ? percent : Number(percent.toFixed(1));
  const isOver = percent > 100;
  const isReached = percent === 100;

  progressFill.style.width = `${Math.min(percent, 100)}%`;
  progressTrack.classList.toggle('is-over', isOver);
  progressPercent.textContent = `${displayedPercent}%`;
  progressPercent.style.color = isOver ? 'var(--orange)' : 'var(--lime)';
  progressAmount.textContent = Number.isInteger(amount) ? amount : amount.toFixed(1);
  progressStatus.textContent = isOver ? 'OVER SOFT CAP' : isReached ? 'SOFT CAP REACHED' : 'IN PROGRESS';
  progressStatus.classList.toggle('is-over', isOver);
  progressTrack.setAttribute('aria-valuenow', String(amount));
}

progressInput.addEventListener('input', updateProgress);
updateProgress();
