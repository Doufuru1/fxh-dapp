const $ = (selector, root = document) => root.querySelector(selector);
const $$ = (selector, root = document) => [...root.querySelectorAll(selector)];

let connected = false;
let currentLang = 'zh';
const BASE_PRICE = 0.002;

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

function buildTierTable() {
  const table = $('#tierTable');
  if (!table) return;
  const fragment = document.createDocumentFragment();
  for (let tier = 1; tier <= 353; tier += 1) {
    const [start, end] = tierRange(tier);
    const row = document.createElement('div');
    row.className = `tier-row${tier === 1 ? ' active' : ''}`;
    row.innerHTML = `<b>${tier}</b><strong>${start.toLocaleString()} — ${end.toLocaleString()}</strong><span>${formatBnb(tierPriceU(tier) * BASE_PRICE)} BNB</span><span class="${tier === 1 ? 'tag' : ''}">${tier === 1 ? 'CURRENT' : `T${tier}`}</span>`;
    fragment.appendChild(row);
  }
  table.appendChild(fragment);
}

function showToast(message) {
  const toast = $('#toast');
  toast.textContent = message;
  toast.classList.add('show');
  clearTimeout(window.__toastTimer);
  window.__toastTimer = setTimeout(() => toast.classList.remove('show'), 2800);
}

function syncLabels() {
  const english = currentLang === 'en';
  if (!connected) $('#connectBtn').textContent = english ? 'Connect wallet' : '连接钱包';
  $('#mintBtn').textContent = connected
    ? (english ? 'Mint BIBI shares ↗' : '铸造 BIBI 份额 ↗')
    : (english ? 'Connect to mint BIBI ↗' : '连接钱包铸造 BIBI ↗');
}

function updateMintCost() {
  const input = $('#shareInput');
  const shares = Math.max(1, Math.min(10, Number(input.value || 1)));
  input.value = shares;
  $('#costValue').textContent = (shares * BASE_PRICE).toFixed(3).replace(/0$/, '') + ' BNB';
}

function openWalletModal() { $('#modal').classList.add('show'); }
function closeWalletModal() { $('#modal').classList.remove('show'); }

function setConnected() {
  connected = true;
  $('#connectBtn').textContent = '0xA2…7F91';
  $('#connectBtn').classList.add('connected');
  syncLabels();
  closeWalletModal();
  showToast(currentLang === 'en' ? 'Agent ID verified. BIBI mint access unlocked ✓' : 'Agent ID 已验证，BIBI 铸造权限已解锁 ✓');
}

$('#shareInput').addEventListener('input', updateMintCost);
$('#shareInput').addEventListener('change', updateMintCost);

$('#connectBtn').addEventListener('click', () => {
  if (connected) {
    connected = false;
    $('#connectBtn').classList.remove('connected');
    syncLabels();
    showToast(currentLang === 'en' ? 'Demo wallet disconnected' : '演示钱包已断开');
    return;
  }
  openWalletModal();
});

$('#mintBtn').addEventListener('click', () => {
  if (!connected) return openWalletModal();
  const shares = Number($('#shareInput').value || 1);
  const cost = (shares * BASE_PRICE).toFixed(3).replace(/0$/, '');
  showToast(currentLang === 'en' ? `Mint order created: ${shares} share(s) · ${cost} BNB` : `铸造订单已生成：${shares} 份 · ${cost} BNB`);
});

$$('.wallet-choice').forEach((button) => button.addEventListener('click', setConnected));
$('#closeModal').addEventListener('click', closeWalletModal);
$('#modal').addEventListener('click', (event) => { if (event.target === $('#modal')) closeWalletModal(); });

buildTierTable();

window.languageController = window.initBibiLanguage({
  onChange: (lang) => {
    currentLang = lang;
    syncLabels();
  }
});

$('#menuBtn').addEventListener('click', () => {
  const nav = $('.nav');
  const open = nav.dataset.open === 'true';
  nav.dataset.open = String(!open);
  nav.style.display = open ? '' : 'flex';
  nav.style.position = open ? '' : 'absolute';
  nav.style.top = '68px';
  nav.style.left = '14px';
  nav.style.right = '14px';
  nav.style.padding = open ? '' : '14px';
  nav.style.background = open ? '' : 'rgba(17,19,15,.98)';
  nav.style.border = open ? '' : '1px solid #33382b';
  nav.style.borderRadius = open ? '' : '10px';
  nav.style.flexDirection = open ? '' : 'column';
  nav.style.alignItems = open ? '' : 'stretch';
});

$$('a[href^="#"]').forEach((link) => link.addEventListener('click', () => {
  const nav = $('.nav');
  nav.dataset.open = 'false';
  if (window.innerWidth <= 940) nav.style.display = 'none';
}));

updateMintCost();
