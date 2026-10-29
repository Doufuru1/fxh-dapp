const $ = (selector, root = document) => root.querySelector(selector);
const $$ = (selector, root = document) => [...root.querySelectorAll(selector)];

let connected = false;
let currentLang = 'zh';
const BASE_PRICE = 0.002;
const INITIAL_SHARES = 4420;
const MAX_SHARES = 10000;

function showToast(message) {
  const toast = $('#toast');
  toast.textContent = message;
  toast.classList.add('show');
  clearTimeout(window.__toastTimer);
  window.__toastTimer = setTimeout(() => toast.classList.remove('show'), 2800);
}

function updateMintCost() {
  const input = $('#shareInput');
  const shares = Math.max(1, Math.min(10, Number(input.value || 1)));
  input.value = shares;
  $('#costValue').textContent = (shares * BASE_PRICE).toFixed(3).replace(/0$/, '') + ' BNB';
}

function openWalletModal() {
  $('#modal').classList.add('show');
}

function closeWalletModal() {
  $('#modal').classList.remove('show');
}

function setConnected() {
  connected = true;
  $('#connectBtn').textContent = '0xA2…7F91';
  $('#connectBtn').classList.add('connected');
  $('#mintBtn').textContent = 'Mint BIBI shares ↗';
  closeWalletModal();
  showToast('Agent ID 已验证，BIBI 铸造权限已解锁 ✓');
}

function renderLanguage() {
  const english = currentLang === 'en';
  document.documentElement.lang = english ? 'en' : 'zh-CN';
  $('#langBtn').textContent = english ? '中' : 'EN';
  document.title = english ? 'BIBI Agent ID · $BIBI Mint' : 'BIBI Agent ID · $BIBI 铸造';

  const translations = {
    'Mint': english ? 'Mint' : '铸造',
    'Mechanics': english ? 'Mechanics' : '机制',
    'Tiers': english ? 'Tiers' : '分级',
    'Whitepaper': english ? 'Whitepaper' : '白皮书',
    'FAQ': english ? 'FAQ' : '常见问题',
    'Connect wallet': english ? 'Connect wallet' : '连接钱包',
    'Start minting ↗': english ? 'Start minting ↗' : '开始铸造 ↗',
    'How it works': english ? 'How it works' : '运作方式',
    'Current mint progress': english ? 'Current mint progress' : '当前铸造进度',
    'Mint shares': english ? 'Mint shares' : '铸造份数',
    'Estimated cost': english ? 'Estimated cost' : '预计支付',
    'Connect to mint BIBI ↗': english ? 'Connect to mint BIBI ↗' : '连接钱包铸造 BIBI ↗',
    'Mint BIBI shares ↗': english ? 'Mint BIBI shares ↗' : '铸造 BIBI 份额 ↗',
    'BIBI Agent ID Tiers': english ? 'BIBI Agent ID Tiers' : 'BIBI Agent ID 分级',
    'Whitepaper': english ? 'Whitepaper' : '白皮书',
  };
  $$('[data-i18n]').forEach((node) => {
    const key = node.dataset.i18n;
    if (translations[key]) node.textContent = translations[key];
  });
  if (!connected) $('#connectBtn').textContent = translations['Connect wallet'];
  if (!connected) $('#mintBtn').textContent = translations['Connect to mint BIBI ↗'];
}

$('#shareInput').addEventListener('input', updateMintCost);
$('#shareInput').addEventListener('change', updateMintCost);

$('#connectBtn').addEventListener('click', () => {
  if (connected) {
    connected = false;
    $('#connectBtn').classList.remove('connected');
    $('#connectBtn').textContent = currentLang === 'en' ? 'Connect wallet' : '连接钱包';
    $('#mintBtn').textContent = currentLang === 'en' ? 'Connect to mint BIBI ↗' : '连接钱包铸造 BIBI ↗';
    showToast('Demo wallet disconnected');
    return;
  }
  openWalletModal();
});

$('#mintBtn').addEventListener('click', () => {
  if (!connected) return openWalletModal();
  const shares = Number($('#shareInput').value || 1);
  showToast(`铸造订单已生成：${shares} 份 · ${ (shares * BASE_PRICE).toFixed(3).replace(/0$/, '') } BNB`);
});

$$('.wallet-choice').forEach((button) => button.addEventListener('click', setConnected));
$('#closeModal').addEventListener('click', closeWalletModal);
$('#modal').addEventListener('click', (event) => {
  if (event.target === $('#modal')) closeWalletModal();
});

$('#langBtn').addEventListener('click', () => {
  currentLang = currentLang === 'zh' ? 'en' : 'zh';
  renderLanguage();
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
renderLanguage();