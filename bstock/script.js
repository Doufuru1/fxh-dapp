const toast = document.querySelector('.toast');
const shareAmount = document.querySelector('#shareAmount');
const mintCost = document.querySelector('#mintCost');
const menuButton = document.querySelector('.menu-button');
const nav = document.querySelector('.nav');
let toastTimer;

function showToast(message) {
  toast.textContent = message;
  toast.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove('show'), 3200);
}

function updateMintCost() {
  if (!shareAmount || !mintCost) return;
  const shares = Math.min(10, Math.max(1, Number(shareAmount.value) || 1));
  shareAmount.value = shares;
  mintCost.textContent = `${(shares * 0.002).toFixed(3)} BNB`;
}

document.querySelectorAll('.amount-step').forEach((button) => {
  button.addEventListener('click', () => {
    const next = Number(shareAmount.value || 1) + Number(button.dataset.step || 0);
    shareAmount.value = Math.min(10, Math.max(1, next));
    updateMintCost();
  });
});
shareAmount?.addEventListener('input', updateMintCost);

menuButton?.addEventListener('click', () => {
  const open = nav.classList.toggle('open');
  menuButton.setAttribute('aria-expanded', String(open));
});
nav?.querySelectorAll('a').forEach((link) => link.addEventListener('click', () => {
  nav.classList.remove('open');
  menuButton?.setAttribute('aria-expanded', 'false');
}));

document.querySelectorAll('.js-connect').forEach((button) => {
  button.addEventListener('click', () => {
    button.innerHTML = '演示钱包 0x…BSTK <span>✓</span>';
    button.classList.add('connected');
    showToast('演示钱包已连接；当前不会发起链上交易。');
  });
});

document.querySelector('.js-mint')?.addEventListener('click', () => {
  showToast('公平铸造演示：真实合约地址与 ABI 接入后才会发起交易。');
});

document.querySelector('.cursor-glow')?.addEventListener('pointermove', () => {});
window.addEventListener('pointermove', (event) => {
  const glow = document.querySelector('.cursor-glow');
  if (glow && window.matchMedia('(pointer:fine)').matches) {
    glow.style.left = `${event.clientX}px`;
    glow.style.top = `${event.clientY}px`;
  }
});

updateMintCost();
