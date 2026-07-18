const tokens = [
  { name: 'Bitcoin', symbol: 'BTC', amount: '0.1852', value: '$8,932.14', change: '+3.2%', up: true, color: '#f7931a' },
  { name: 'Ethereum', symbol: 'ETH', amount: '1.25', value: '$2,184.75', change: '-1.4%', up: false, color: '#627eea' },
  { name: 'Tether', symbol: 'USDT', amount: '850.00', value: '$850.00', change: '+0.0%', up: true, color: '#26a17b' },
  { name: 'BNB', symbol: 'BNB', amount: '1.85', value: '$398.65', change: '+5.7%', up: true, color: '#f3ba2f' },
  { name: 'Solana', symbol: 'SOL', amount: '1.45', value: '$52.84', change: '+8.3%', up: true, color: '#14f195' },
  { name: 'Chainlink', symbol: 'LINK', amount: '12.5', value: '$120.54', change: '-2.1%', up: false, color: '#2a5ada' },
];

const marketData = [
  { rank: 1, name: 'Bitcoin', symbol: 'BTC', price: '$48,254.00', change: '+3.2%', up: true, cap: '$947.2B', color: '#f7931a' },
  { rank: 2, name: 'Ethereum', symbol: 'ETH', price: '$1,747.80', change: '-1.4%', up: false, cap: '$210.1B', color: '#627eea' },
  { rank: 3, name: 'Tether', symbol: 'USDT', price: '$1.00', change: '+0.0%', up: true, cap: '$83.5B', color: '#26a17b' },
  { rank: 4, name: 'BNB', symbol: 'BNB', price: '$215.49', change: '+5.7%', up: true, cap: '$35.6B', color: '#f3ba2f' },
  { rank: 5, name: 'Solana', symbol: 'SOL', price: '$36.44', change: '+8.3%', up: true, cap: '$15.2B', color: '#14f195' },
  { rank: 6, name: 'XRP', symbol: 'XRP', price: '$0.62', change: '-0.5%', up: false, cap: '$33.8B', color: '#23292f' },
  { rank: 7, name: 'Cardano', symbol: 'ADA', price: '$0.45', change: '+2.8%', up: true, cap: '$15.9B', color: '#0033ad' },
  { rank: 8, name: 'Dogecoin', symbol: 'DOGE', price: '$0.08', change: '+12.4%', up: true, cap: '$11.3B', color: '#c2a633' },
];

const dapps = [
  { name: 'Uniswap', desc: '去中心化交易所', tag: 'DEX', color: '#ff007a' },
  { name: 'Aave', desc: '去中心化借贷协议', tag: 'DeFi', color: '#b6509e' },
  { name: 'OpenSea', desc: 'NFT 交易市场', tag: 'NFT', color: '#2081e2' },
  { name: 'PancakeSwap', desc: 'BSC 链上 DEX', tag: 'DEX', color: '#d1884f' },
  { name: 'Compound', desc: '算法货币市场', tag: 'DeFi', color: '#00d395' },
];

const tokenListEl = document.getElementById('tokenList');
const marketListEl = document.getElementById('marketList');
const dappListEl = document.getElementById('dappList');
const balanceValueEl = document.getElementById('balanceValue');
const eyeBtn = document.getElementById('eyeBtn');
const modal = document.getElementById('modal');
const modalTitle = document.getElementById('modalTitle');
const modalBody = document.getElementById('modalBody');
const modalClose = document.getElementById('modalClose');

let balanceHidden = false;
const realBalance = '$12,438.92';

function renderTokens() {
  tokenListEl.innerHTML = tokens.map(t => `
    <div class="token-item" data-symbol="${t.symbol}">
      <div class="token-left">
        <div class="token-icon" style="background: ${t.color}; box-shadow: 0 4px 12px ${t.color}40;">${t.symbol[0]}</div>
        <div class="token-meta">
          <div class="token-name">${t.name}</div>
          <div class="token-symbol">${t.amount} ${t.symbol}</div>
        </div>
      </div>
      <div class="token-right">
        <div class="token-amount">${balanceHidden ? '****' : t.value}</div>
        <div class="token-change ${t.up ? 'up' : 'down'}">${t.change}</div>
      </div>
    </div>
  `).join('');
}

function renderMarket() {
  marketListEl.innerHTML = marketData.map(m => `
    <div class="market-item">
      <div style="display:flex;align-items:center;flex:1;">
        <div class="market-rank">${m.rank}</div>
        <div class="token-icon" style="background: ${m.color}; width: 36px; height: 36px; font-size: 13px; margin-right: 12px;">${m.symbol[0]}</div>
        <div class="token-meta">
          <div class="token-name">${m.name}</div>
          <div class="token-symbol">${m.cap}</div>
        </div>
      </div>
      <div class="token-right">
        <div class="market-price">${m.price}</div>
        <div class="token-change ${m.up ? 'up' : 'down'}">${m.change}</div>
      </div>
    </div>
  `).join('');
}

function renderDapps() {
  dappListEl.innerHTML = dapps.map(d => `
    <div class="dapp-item">
      <div class="dapp-icon" style="background: ${d.color};">${d.name[0]}</div>
      <div class="dapp-info">
        <div class="dapp-name">${d.name}</div>
        <div class="dapp-desc">${d.desc}</div>
      </div>
      <div class="dapp-tag">${d.tag}</div>
    </div>
  `).join('');
}

function toggleBalance() {
  balanceHidden = !balanceHidden;
  balanceValueEl.textContent = balanceHidden ? '****' : realBalance;
  renderTokens();
  eyeBtn.innerHTML = balanceHidden
    ? '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.93 9.93 0 0 1 12 4c7 0 11 8 11 8a18.45 18.45 0 0 1-2.1 2.57M1 1l22 22"/></svg>'
    : '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>';
}

function switchTab(tabName) {
  document.querySelectorAll('.tab-page').forEach(p => p.classList.remove('active'));
  document.querySelectorAll('.nav-item').forEach(n => n.classList.remove('active'));
  document.getElementById(`tab-${tabName}`).classList.add('active');
  document.querySelector(`[data-tab="${tabName}"]`).classList.add('active');
}

function showModal(title, body) {
  modalTitle.textContent = title;
  modalBody.innerHTML = body;
  modal.classList.add('show');
}

function hideModal() {
  modal.classList.remove('show');
}

function init() {
  renderTokens();
  renderMarket();
  renderDapps();

  eyeBtn.addEventListener('click', toggleBalance);

  document.querySelectorAll('.nav-item').forEach(btn => {
    btn.addEventListener('click', () => switchTab(btn.dataset.tab));
  });

  document.querySelectorAll('.action-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const action = btn.dataset.action;
      const titles = { send: '发送', receive: '接收', buy: '购买', swap: '兑换', earn: '理财' };
      showModal(titles[action], `<p>这里将打开 <strong>${titles[action]}</strong> 功能页面。这是一个演示界面，仅展示钱包 App 的交互。</p><button class="modal-btn" onclick="hideModal()">知道了</button>`);
    });
  });

  modalClose.addEventListener('click', hideModal);
  modal.querySelector('.modal-overlay').addEventListener('click', hideModal);

  document.querySelectorAll('.filter-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      renderTokens();
    });
  });

  document.querySelectorAll('.market-tab').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.market-tab').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      renderMarket();
    });
  });
}

init();

window.hideModal = hideModal;
