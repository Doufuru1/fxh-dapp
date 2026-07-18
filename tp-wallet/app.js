const wallets = [
  {
    id: 'trx-1',
    name: 'TRX-1',
    address: 'TKcK...z9qA',
    type: 'watch',
    typeLabel: '观察钱包',
    balance: '$511,887.43',
    tokens: [
      {
        name: 'TRX',
        symbol: 'TRX',
        amount: '200.882396',
        value: '$65.04',
        price: '$0.3237',
        change: '+0.29%',
        up: true,
        color: '#ff0a2b',
        trc: false
      },
      {
        name: 'USDT',
        symbol: 'USDT',
        amount: '511,822.389946',
        value: '$511,822.38',
        price: '$1.0000',
        change: '0%',
        up: true,
        color: '#26a17b',
        trc: true
      }
    ]
  },
  {
    id: 'trx-2',
    name: 'TRX-2',
    address: 'TKxQ...m7rP',
    type: 'main',
    typeLabel: '主钱包',
    balance: '$2,450.00',
    tokens: [
      {
        name: 'TRX',
        symbol: 'TRX',
        amount: '5,000.000000',
        value: '$1,618.50',
        price: '$0.3237',
        change: '+0.29%',
        up: true,
        color: '#ff0a2b',
        trc: false
      },
      {
        name: 'USDT',
        symbol: 'USDT',
        amount: '800.000000',
        value: '$800.00',
        price: '$1.0000',
        change: '0%',
        up: true,
        color: '#26a17b',
        trc: true
      },
      {
        name: 'BTT',
        symbol: 'BTT',
        amount: '12,500.000000',
        value: '$31.50',
        price: '$0.0025',
        change: '-1.2%',
        up: false,
        color: '#000000',
        trc: false
      }
    ]
  }
];

let currentWalletIndex = 0;
let balanceHidden = false;

const marketData = [
  { rank: 1, name: 'Bitcoin', symbol: 'BTC', price: '$48,254.00', change: '+3.2%', up: true, cap: '$947.2B', color: '#f7931a' },
  { rank: 2, name: 'Ethereum', symbol: 'ETH', price: '$1,747.80', change: '-1.4%', up: false, cap: '$210.1B', color: '#627eea' },
  { rank: 3, name: 'Tether', symbol: 'USDT', price: '$1.00', change: '+0.0%', up: true, cap: '$83.5B', color: '#26a17b' },
  { rank: 4, name: 'BNB', symbol: 'BNB', price: '$215.49', change: '+5.7%', up: true, cap: '$35.6B', color: '#f3ba2f' },
  { rank: 5, name: 'Solana', symbol: 'SOL', price: '$36.44', change: '+8.3%', up: true, cap: '$15.2B', color: '#14f195' },
  { rank: 6, name: 'XRP', symbol: 'XRP', price: '$0.62', change: '-0.5%', up: false, cap: '$33.8B', color: '#23292f' },
  { rank: 7, name: 'TRON', symbol: 'TRX', price: '$0.32', change: '+0.29%', up: true, cap: '$29.4B', color: '#ff0a2b' },
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
const authListEl = document.getElementById('authList');
const marketListEl = document.getElementById('marketList');
const dappListEl = document.getElementById('dappList');
const balanceValueEl = document.getElementById('balanceValue');
const eyeBtn = document.getElementById('eyeBtn');
const walletNameEl = document.getElementById('walletName');
const walletLockEl = document.getElementById('walletLock');
const watchTagEl = document.getElementById('watchTag');
const walletLabelEl = document.getElementById('walletLabel');
const walletModal = document.getElementById('walletModal');
const walletModalClose = document.getElementById('walletModalClose');
const walletModalOverlay = document.getElementById('walletModalOverlay');
const walletListEl = document.getElementById('walletList');
const addWalletBtn = document.getElementById('addWalletBtn');
const modal = document.getElementById('modal');
const modalTitle = document.getElementById('modalTitle');
const modalBody = document.getElementById('modalBody');
const modalClose = document.getElementById('modalClose');

function getCurrentWallet() {
  return wallets[currentWalletIndex];
}

function renderTokens() {
  const wallet = getCurrentWallet();
  tokenListEl.innerHTML = wallet.tokens.map(t => `
    <div class="token-item" data-symbol="${t.symbol}">
      <div class="token-left">
        <div class="token-icon" style="background: ${t.color}; box-shadow: 0 4px 12px ${t.color}40; font-size: ${t.trc ? '10px' : '14px'}; letter-spacing: ${t.trc ? '-0.5px' : '0'};">
          ${t.trc ? 'TRC20' : t.symbol[0]}
        </div>
        <div class="token-meta">
          <div class="token-name">${t.name}</div>
          <div class="token-symbol">
            ${t.price} <span class="token-change ${t.up ? 'up' : 'down'}">${t.change}</span>
          </div>
        </div>
      </div>
      <div class="token-right">
        <div class="token-amount">${balanceHidden ? '****' : t.amount}</div>
        <div class="token-value">${balanceHidden ? '****' : t.value}</div>
      </div>
    </div>
  `).join('');
}

function renderWalletUI() {
  const wallet = getCurrentWallet();
  walletNameEl.textContent = wallet.name;
  balanceValueEl.textContent = balanceHidden ? '****' : wallet.balance;
  watchTagEl.textContent = wallet.typeLabel;
  watchTagEl.className = `watch-tag ${wallet.type === 'watch' ? 'watch' : 'main'}`;
  watchTagEl.style.display = 'inline-block';
  walletLockEl.style.display = wallet.type === 'watch' ? 'inline-block' : 'none';
  
  document.querySelectorAll('.me-name').forEach(el => el.textContent = wallet.name);
  document.querySelectorAll('.me-address').forEach(el => el.textContent = wallet.address);
  
  const sendBtn = document.querySelector('[data-action="send"]');
  if (wallet.type === 'watch') {
    sendBtn.classList.add('disabled');
  } else {
    sendBtn.classList.remove('disabled');
  }
  
  renderTokens();
  renderWalletSelector();
}

function renderWalletSelector() {
  walletListEl.innerHTML = wallets.map((w, index) => `
    <div class="wallet-option ${index === currentWalletIndex ? 'active' : ''}" data-index="${index}">
      <div class="wallet-option-avatar">${w.name[0]}</div>
      <div class="wallet-option-info">
        <div class="wallet-option-name">
          ${w.name}
          <span class="wallet-tag ${w.type === 'watch' ? 'watch' : 'main'}">${w.typeLabel}</span>
        </div>
        <div class="wallet-option-type">${w.address} · ${w.tokens.length} 种代币</div>
      </div>
      <div class="wallet-option-check">✓</div>
    </div>
  `).join('');
  
  document.querySelectorAll('.wallet-option').forEach(opt => {
    opt.addEventListener('click', () => {
      currentWalletIndex = parseInt(opt.dataset.index);
      renderWalletUI();
      hideWalletModal();
    });
  });
}

function showWalletModal() {
  walletModal.classList.add('show');
  renderWalletSelector();
}

function hideWalletModal() {
  walletModal.classList.remove('show');
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
  balanceValueEl.textContent = balanceHidden ? '****' : getCurrentWallet().balance;
  renderTokens();
  eyeBtn.innerHTML = balanceHidden
    ? '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.93 9.93 0 0 1 12 4c7 0 11 8 11 8a18.45 18.45 0 0 1-2.1 2.57M1 1l22 22"/></svg>'
    : '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>';
}

function switchMainTab(tabName) {
  document.querySelectorAll('.tab-page').forEach(p => p.classList.remove('active'));
  document.querySelectorAll('.nav-item').forEach(n => n.classList.remove('active'));
  document.getElementById(`tab-${tabName}`).classList.add('active');
  document.querySelector(`[data-tab="${tabName}"]`).classList.add('active');
}

function switchAssetsTab(tabName) {
  const assetTabs = document.querySelectorAll('.tab');
  assetTabs.forEach(t => t.classList.remove('active'));
  document.querySelector(`[data-tab="${tabName}"]`).classList.add('active');
  
  if (tabName === 'assets') {
    tokenListEl.style.display = 'flex';
    authListEl.style.display = 'none';
  } else {
    tokenListEl.style.display = 'none';
    authListEl.style.display = 'flex';
  }
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
  renderWalletUI();
  renderMarket();
  renderDapps();

  walletLabelEl.addEventListener('click', showWalletModal);
  walletModalClose.addEventListener('click', hideWalletModal);
  walletModalOverlay.addEventListener('click', hideWalletModal);
  
  addWalletBtn.addEventListener('click', () => {
    showModal('添加钱包', '<p>这里将打开创建/导入钱包页面。</p><button class="modal-btn" onclick="hideModal()">知道了</button>');
  });

  eyeBtn.addEventListener('click', toggleBalance);

  document.querySelectorAll('.nav-item').forEach(btn => {
    btn.addEventListener('click', () => switchMainTab(btn.dataset.tab));
  });

  document.querySelectorAll('.tab').forEach(btn => {
    btn.addEventListener('click', () => switchAssetsTab(btn.dataset.tab));
  });

  document.querySelectorAll('.action-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      if (btn.classList.contains('disabled')) return;
      const action = btn.dataset.action;
      const titles = { send: '转账', receive: '收款', resources: '资源', more: '更多工具' };
      showModal(titles[action], `<p>这里将打开 <strong>${titles[action]}</strong> 功能页面。演示界面，仅展示交互。</p><button class="modal-btn" onclick="hideModal()">知道了</button>`);
    });
  });

  modalClose.addEventListener('click', hideModal);
  modal.querySelector('.modal-overlay').addEventListener('click', hideModal);

  document.querySelectorAll('.market-tab').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.market-tab').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      renderMarket();
    });
  });

  document.querySelectorAll('.trade-tab').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.trade-tab').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
    });
  });

  document.querySelector('.add-token-btn').addEventListener('click', () => {
    showModal('添加代币', '<p>这里将打开添加代币页面。</p><button class="modal-btn" onclick="hideModal()">知道了</button>');
  });

  document.querySelector('.trade-confirm').addEventListener('click', () => {
    showModal('立即兑换', '<p>这里将提交兑换交易。</p><button class="modal-btn" onclick="hideModal()">知道了</button>');
  });

  document.querySelectorAll('.auth-revoke').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      showModal('取消授权', '<p>这里将取消该 DApp 的代币授权。</p><button class="modal-btn" onclick="hideModal()">知道了</button>');
    });
  });
}

init();

window.hideModal = hideModal;
window.hideWalletModal = hideWalletModal;
