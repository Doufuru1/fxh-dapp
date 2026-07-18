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
let selectedToken = null;

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

const mockTx = [
  { type: 'out', symbol: 'TRX', amount: '-50.0000', time: '2026-07-18 09:23', status: '成功' },
  { type: 'in', symbol: 'USDT', amount: '+1,200.00', time: '2026-07-17 15:42', status: '成功' },
  { type: 'out', symbol: 'TRX', amount: '-12.5000', time: '2026-07-16 11:05', status: '成功' },
  { type: 'in', symbol: 'TRX', amount: '+300.0000', time: '2026-07-15 08:30', status: '成功' },
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

const tokenDetailModal = document.getElementById('tokenDetailModal');
const tokenDetailOverlay = document.getElementById('tokenDetailOverlay');
const tokenDetailBack = document.getElementById('tokenDetailBack');
const tokenDetailName = document.getElementById('tokenDetailName');
const tokenDetailIcon = document.getElementById('tokenDetailIcon');
const tokenDetailBalance = document.getElementById('tokenDetailBalance');
const tokenDetailValue = document.getElementById('tokenDetailValue');
const tokenDetailPrice = document.getElementById('tokenDetailPrice');
const tokenDetailChange = document.getElementById('tokenDetailChange');
const tokenDetailSend = document.getElementById('tokenDetailSend');
const tokenDetailReceive = document.getElementById('tokenDetailReceive');
const tokenDetailSwap = document.getElementById('tokenDetailSwap');
const tokenTxList = document.getElementById('tokenTxList');

const sendModal = document.getElementById('sendModal');
const sendOverlay = document.getElementById('sendOverlay');
const sendBack = document.getElementById('sendBack');
const sendTokenSelected = document.getElementById('sendTokenSelected');
const sendTokenIcon = document.getElementById('sendTokenIcon');
const sendTokenName = document.getElementById('sendTokenName');
const sendTokenBalance = document.getElementById('sendTokenBalance');
const sendAddress = document.getElementById('sendAddress');
const sendAmount = document.getElementById('sendAmount');
const sendTokenUnit = document.getElementById('sendTokenUnit');
const sendAmountValue = document.getElementById('sendAmountValue');
const sendFee = document.getElementById('sendFee');
const sendReceive = document.getElementById('sendReceive');
const sendMaxBtn = document.getElementById('sendMaxBtn');
const sendConfirmBtn = document.getElementById('sendConfirmBtn');
const sendScanBtn = document.getElementById('sendScanBtn');

function getCurrentWallet() {
  return wallets[currentWalletIndex];
}

function parseAmount(str) {
  return parseFloat(str.replace(/,/g, '')) || 0;
}

function getTokenPrice(symbol) {
  const priceMap = { TRX: 0.3237, USDT: 1.0, BTT: 0.0025 };
  return priceMap[symbol] || 0;
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
  
  document.querySelectorAll('.token-item').forEach(item => {
    item.addEventListener('click', () => openTokenDetail(item.dataset.symbol));
  });
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

function openTokenDetail(symbol) {
  const wallet = getCurrentWallet();
  selectedToken = wallet.tokens.find(t => t.symbol === symbol);
  if (!selectedToken) return;
  
  tokenDetailName.textContent = selectedToken.name;
  tokenDetailIcon.textContent = selectedToken.trc ? 'TRC20' : selectedToken.symbol[0];
  tokenDetailIcon.style.fontSize = selectedToken.trc ? '10px' : '14px';
  tokenDetailIcon.style.letterSpacing = selectedToken.trc ? '-0.5px' : '0';
  tokenDetailIcon.style.background = selectedToken.color;
  tokenDetailBalance.textContent = `${selectedToken.amount} ${selectedToken.symbol}`;
  tokenDetailValue.textContent = `≈ ${selectedToken.value}`;
  tokenDetailPrice.textContent = selectedToken.price;
  tokenDetailChange.textContent = selectedToken.change;
  tokenDetailChange.className = `token-detail-change ${selectedToken.up ? 'up' : 'down'}`;
  
  const isWatch = wallet.type === 'watch';
  if (isWatch) {
    tokenDetailSend.classList.add('disabled');
  } else {
    tokenDetailSend.classList.remove('disabled');
  }
  
  tokenTxList.innerHTML = mockTx.filter(tx => tx.symbol === selectedToken.symbol).map(tx => `
    <div class="tx-item">
      <div class="tx-left">
        <div class="tx-icon">${tx.type === 'in' ? '↓' : '↑'}</div>
        <div class="tx-info">
          <div class="tx-type">${tx.type === 'in' ? '收款' : '转账'}</div>
          <div class="tx-time">${tx.time}</div>
        </div>
      </div>
      <div class="tx-right">
        <div class="tx-amount ${tx.type}">${tx.amount} ${tx.symbol}</div>
        <div class="tx-status">${tx.status}</div>
      </div>
    </div>
  `).join('');
  
  tokenDetailModal.classList.add('show');
}

function hideTokenDetail() {
  tokenDetailModal.classList.remove('show');
  selectedToken = null;
}

function openSendModal(tokenSymbol = null) {
  const wallet = getCurrentWallet();
  if (wallet.type === 'watch') {
    showModal('观察钱包', '<p>观察钱包不支持转出操作。</p><button class="modal-btn" onclick="hideModal()">知道了</button>');
    return;
  }
  
  const symbol = tokenSymbol || wallet.tokens[0].symbol;
  selectedToken = wallet.tokens.find(t => t.symbol === symbol) || wallet.tokens[0];
  if (!selectedToken) return;
  
  sendTokenIcon.textContent = selectedToken.trc ? 'TRC20' : selectedToken.symbol[0];
  sendTokenIcon.style.fontSize = selectedToken.trc ? '10px' : '14px';
  sendTokenIcon.style.letterSpacing = selectedToken.trc ? '-0.5px' : '0';
  sendTokenIcon.style.background = selectedToken.color;
  sendTokenName.textContent = selectedToken.name;
  sendTokenBalance.textContent = `余额 ${selectedToken.amount}`;
  sendTokenUnit.textContent = selectedToken.symbol;
  sendAddress.value = '';
  sendAmount.value = '';
  updateSendAmount();
  
  tokenDetailModal.classList.remove('show');
  sendModal.classList.add('show');
}

function hideSendModal() {
  sendModal.classList.remove('show');
}

function updateSendAmount() {
  const amount = parseFloat(sendAmount.value) || 0;
  const price = getTokenPrice(selectedToken ? selectedToken.symbol : 'TRX');
  sendAmountValue.textContent = `$${(amount * price).toFixed(2)}`;
  
  const fee = selectedToken && selectedToken.symbol === 'TRX' ? 0.26 : 0;
  sendFee.textContent = fee.toFixed(2);
  
  const receive = Math.max(0, amount - fee);
  sendReceive.textContent = receive.toFixed(2);
  
  sendConfirmBtn.disabled = amount <= 0 || !sendAddress.value.trim();
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
      if (action === 'send') {
        openSendModal();
      } else {
        const titles = { receive: '收款', resources: '资源', more: '更多工具' };
        showModal(titles[action], `<p>这里将打开 <strong>${titles[action]}</strong> 功能页面。</p><button class="modal-btn" onclick="hideModal()">知道了</button>`);
      }
    });
  });

  modalClose.addEventListener('click', hideModal);
  modal.querySelector('.modal-overlay').addEventListener('click', hideModal);

  tokenDetailBack.addEventListener('click', hideTokenDetail);
  tokenDetailOverlay.addEventListener('click', hideTokenDetail);
  tokenDetailSend.addEventListener('click', () => openSendModal(selectedToken ? selectedToken.symbol : null));
  tokenDetailReceive.addEventListener('click', () => showModal('收款', `<p>${selectedToken ? selectedToken.name : ''} 收款地址：</p><p style="word-break:break-all;">${getCurrentWallet().address}</p><button class="modal-btn" onclick="hideModal()">复制地址</button>`));
  tokenDetailSwap.addEventListener('click', () => showModal('兑换', `<p>这里将打开 ${selectedToken ? selectedToken.name : ''} 兑换页面。</p><button class="modal-btn" onclick="hideModal()">知道了</button>`));

  sendBack.addEventListener('click', hideSendModal);
  sendOverlay.addEventListener('click', hideSendModal);
  sendMaxBtn.addEventListener('click', () => {
    if (!selectedToken) return;
    const amount = parseAmount(selectedToken.amount);
    sendAmount.value = amount;
    updateSendAmount();
  });
  sendAmount.addEventListener('input', updateSendAmount);
  sendAddress.addEventListener('input', updateSendAmount);
  sendScanBtn.addEventListener('click', () => showModal('扫一扫', '<p>这里将打开相机扫描二维码。</p><button class="modal-btn" onclick="hideModal()">知道了</button>'));
  sendConfirmBtn.addEventListener('click', () => {
    showModal('转账确认', `<p>已向 <strong>${sendAddress.value}</strong> 发起 ${sendAmount.value} ${selectedToken ? selectedToken.symbol : ''} 转账。</p><button class="modal-btn" onclick="hideSendModal();hideModal();">完成</button>`);
  });

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
window.hideTokenDetail = hideTokenDetail;
window.hideSendModal = hideSendModal;
