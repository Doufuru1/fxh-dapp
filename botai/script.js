const toast = document.querySelector('.toast');
const bnbAmount = document.querySelector('#bnbAmount');
const contributionValue = document.querySelector('#contributionValue');
const countdown = document.querySelector('#countdown');
const refundButton = document.querySelector('.js-refund');
const nav = document.querySelector('.nav');
const menuButton = document.querySelector('.menu-button');
let toastTimer;

const launchState = {
  raised: 12.48,
  target: 50,
  endsAt: Date.now() + 48 * 60 * 60 * 1000,
};

function showToast(message) {
  if (!toast) return;
  toast.textContent = message;
  toast.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove('show'), 3400);
}

function formatContribution() {
  const amount = Math.min(10, Math.max(0.01, Number(bnbAmount?.value) || 0.01));
  if (bnbAmount) bnbAmount.value = amount.toFixed(2);
  if (contributionValue) contributionValue.textContent = `${amount.toFixed(2)} BNB`;
}

document.querySelectorAll('.amount-step').forEach((button) => {
  button.addEventListener('click', () => {
    const next = (Number(bnbAmount?.value) || 0.1) + Number(button.dataset.step || 0);
    if (bnbAmount) bnbAmount.value = Math.min(10, Math.max(0.01, next)).toFixed(2);
    formatContribution();
  });
});
bnbAmount?.addEventListener('input', formatContribution);

function renderCountdown() {
  const remaining = Math.max(0, launchState.endsAt - Date.now());
  const totalSeconds = Math.floor(remaining / 1000);
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;
  if (countdown) countdown.innerHTML = `<span>${String(hours).padStart(2, '0')}</span><b>:</b><span>${String(minutes).padStart(2, '0')}</span><b>:</b><span>${String(seconds).padStart(2, '0')}</span>`;
  if (remaining === 0 && launchState.raised < launchState.target && refundButton) {
    refundButton.disabled = false;
    refundButton.textContent = '申请退款 ↗';
  }
}
setInterval(renderCountdown, 1000);
renderCountdown();
formatContribution();

menuButton?.addEventListener('click', () => {
  const open = nav.classList.toggle('open');
  menuButton.setAttribute('aria-expanded', String(open));
});
nav?.querySelectorAll('a').forEach((link) => link.addEventListener('click', () => {
  nav.classList.remove('open');
  menuButton?.setAttribute('aria-expanded', 'false');
}));

document.querySelector('.js-connect')?.addEventListener('click', (event) => {
  event.currentTarget.innerHTML = '演示钱包 0x…BOT <span>✓</span>';
  showToast('演示钱包已连接；当前不会发起链上交易。');
});

document.querySelector('.js-launch')?.addEventListener('click', () => {
  showToast('参与演示已打开：真实合约与 ABI 接入后才会发起交易。');
});

refundButton?.addEventListener('click', () => {
  if (refundButton.disabled) {
    showToast('退款窗口将在 48 小时结束且目标未达成后开放。');
    return;
  }
  showToast('退款申请演示已打开；请使用原参与钱包核验。');
});
