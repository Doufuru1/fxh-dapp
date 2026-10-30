document.querySelectorAll('a[href^="#"]').forEach((link) => {
  link.addEventListener('click', (event) => {
    const target = document.querySelector(link.getAttribute('href'));
    if (!target) return;
    event.preventDefault();
    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
  });
});

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (!entry.isIntersecting) return;
    entry.target.classList.add('is-visible');
    revealObserver.unobserve(entry.target);
  });
}, { threshold: 0.12 });

document.querySelectorAll('.principle-card, .token-card, .allocation-card, .roadmap-item, details, .mint-panel, .mint-side-card').forEach((element) => {
  element.classList.add('reveal');
  revealObserver.observe(element);
});

const style = document.createElement('style');
style.textContent = `.reveal{opacity:0;transform:translateY(15px);transition:opacity .6s ease,transform .6s ease}.reveal.is-visible{opacity:1;transform:none}`;
document.head.appendChild(style);

const BASE_PRICE = 0.002;
const MAX_SHARES = 10;
const MINT_DURATION = 7 * 24 * 60 * 60 * 1000;
const DEMO_MINTED = 4420;
const DEMO_TIER_CAP = 10000;
const mintButton = document.querySelector('#mintButton');
const shareInput = document.querySelector('#shareInput');
const mintCost = document.querySelector('#mintCost');
const mintCountdown = document.querySelector('#mintCountdown');
const mintProgressBar = document.querySelector('#mintProgressBar');
const mintProgressText = document.querySelector('#mintProgressText');
const mintTierLabel = document.querySelector('#mintTierLabel');
let mintConnected = false;

function formatBnb(value) {
  return value.toFixed(6).replace(/0+$/, '').replace(/\.$/, '');
}

function tierPriceU(tier) {
  if (tier === 1) return 1;
  if (tier <= 11) return 1 + (tier - 1) * 0.1;
  if (tier <= 181) return 2.1 + (tier - 12) * 0.02;
  return Math.round((5.5 + (tier - 182) * 0.015) * 100) / 100;
}

function tierRange(tier) {
  if (tier === 1) return [0, 10000];
  if (tier <= 181) {
    const start = 10001 + (tier - 2) * 1000;
    return [start, start + 999];
  }
  const start = 1000001 + (tier - 182) * 20000;
  return [start, start + 19999];
}

function getTierForSupply(supply) {
  for (let tier = 1; tier <= 353; tier += 1) {
    const [, end] = tierRange(tier);
    if (supply <= end) return tier;
  }
  return 353;
}

function updateMintCost() {
  if (!shareInput || !mintCost) return;
  const shares = Math.max(1, Math.min(MAX_SHARES, Number(shareInput.value || 1)));
  shareInput.value = shares;
  const tier = getTierForSupply(DEMO_MINTED);
  const price = tierPriceU(tier) * BASE_PRICE;
  mintCost.textContent = `${formatBnb(shares * price)} BNB`;
  if (mintTierLabel) mintTierLabel.textContent = `当前第 ${tier} 级 · ${tierPriceU(tier)}U = ${formatBnb(price)} BNB`;
}

function updateCountdown() {
  if (!mintCountdown) return;
  const storageKey = 'binancian-demo-mint-start';
  let start = Number(localStorage.getItem(storageKey));
  if (!start || Date.now() - start > MINT_DURATION) {
    start = Date.now();
    localStorage.setItem(storageKey, String(start));
  }
  const remaining = Math.max(0, start + MINT_DURATION - Date.now());
  if (!remaining) {
    mintCountdown.textContent = 'CLOSED';
    if (mintButton) {
      mintButton.disabled = true;
      mintButton.textContent = '铸造窗口已关闭';
    }
    return;
  }
  const days = Math.floor(remaining / 86400000);
  const hours = Math.floor((remaining % 86400000) / 3600000);
  const minutes = Math.floor((remaining % 3600000) / 60000);
  const seconds = Math.floor((remaining % 60000) / 1000);
  mintCountdown.textContent = `${days}D ${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
}

function showMintToast(message) {
  let toast = document.querySelector('.mint-toast');
  if (!toast) {
    toast = document.createElement('div');
    toast.className = 'mint-toast';
    document.body.appendChild(toast);
  }
  toast.textContent = message;
  toast.classList.add('show');
  clearTimeout(window.__mintToastTimer);
  window.__mintToastTimer = setTimeout(() => toast.classList.remove('show'), 3000);
}

document.querySelectorAll('.mint-step').forEach((button) => {
  button.addEventListener('click', () => {
    const next = Number(shareInput.value || 1) + Number(button.dataset.step || 0);
    shareInput.value = Math.max(1, Math.min(MAX_SHARES, next));
    updateMintCost();
  });
});
shareInput?.addEventListener('input', updateMintCost);
shareInput?.addEventListener('change', updateMintCost);
mintButton?.addEventListener('click', () => {
  const shares = Number(shareInput?.value || 1);
  if (!mintConnected) {
    mintConnected = true;
    mintButton.classList.add('is-connected');
    mintButton.innerHTML = '已连接 · 确认铸造 <span>↗</span>';
    showMintToast('演示钱包已连接，铸造权限已解锁。');
    return;
  }
  showMintToast(`演示铸造订单已生成：${shares} 份 · ${mintCost.textContent}`);
});

updateMintCost();
updateCountdown();
setInterval(updateCountdown, 1000);

if (mintProgressBar) mintProgressBar.style.width = `${(DEMO_MINTED / DEMO_TIER_CAP) * 100}%`;
if (mintProgressText) mintProgressText.textContent = `${DEMO_MINTED.toLocaleString()} / ${DEMO_TIER_CAP.toLocaleString()} 份`;
