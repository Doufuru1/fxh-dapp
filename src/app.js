// FXH Staking DApp - Main JavaScript

// Check referral binding on load
window.addEventListener('load', () => {
    const hasReferral = localStorage.getItem('fxh_referral');
    if (!hasReferral) {
        setTimeout(() => {
            showToast('请绑定推荐关系');
        }, 2000);
    }
});

// Tab switching
function switchTab(page, el) {
    // Hide all pages
    document.querySelectorAll('.page').forEach(p => {
        p.classList.add('hidden');
        p.classList.remove('active');
    });
    
    // Show target page
    const target = document.getElementById('page-' + page);
    if (target) {
        target.classList.remove('hidden');
        target.classList.add('active');
    }
    
    // Update tab styles
    document.querySelectorAll('.tab-item').forEach(t => {
        t.classList.remove('active', 'text-[#6366f1]');
        t.classList.add('text-[#707080]');
    });
    
    if (el) {
        el.classList.add('active', 'text-[#6366f1]');
        el.classList.remove('text-[#707080]');
    }
}

// Mining mode toggle
function setMiningMode(mode) {
    const btnU = document.getElementById('miningModeU');
    const btnHalf = document.getElementById('miningModeHalf');
    const halfInput = document.getElementById('miningHalfInput');
    
    if (mode === 'u') {
        btnU?.classList.add('bg-[#6366f1]', 'text-white');
        btnU?.classList.remove('bg-[#252530]', 'text-[#a0a0b0]');
        btnHalf?.classList.remove('bg-[#6366f1]', 'text-white');
        btnHalf?.classList.add('bg-[#252530]', 'text-[#a0a0b0]');
        halfInput?.classList.add('hidden');
    } else {
        btnHalf?.classList.add('bg-[#6366f1]', 'text-white');
        btnHalf?.classList.remove('bg-[#252530]', 'text-[#a0a0b0]');
        btnU?.classList.remove('bg-[#6366f1]', 'text-white');
        btnU?.classList.add('bg-[#252530]', 'text-[#a0a0b0]');
        halfInput?.classList.remove('hidden');
    }
    calcMining();
}

// Calculate mining amounts
function calcMining() {
    const amount = parseFloat(document.getElementById('miningAmount')?.value) || 0;
    const buyAmount = document.getElementById('buyAmount');
    const lpAmount = document.getElementById('lpAmount');
    
    if (buyAmount) buyAmount.textContent = '$' + (amount * 0.5).toFixed(2);
    if (lpAmount) lpAmount.textContent = '$' + (amount * 0.5).toFixed(2);
}

// Create mining order
function createMiningOrder() {
    const amount = document.getElementById('miningAmount')?.value;
    const isU = document.getElementById('miningModeU')?.classList.contains('bg-[#6366f1]');
    const mode = isU ? '💵 只用U' : '⚖️ U+币各半';
    showToast(`🚀 订单创建成功！${amount} USDT ${mode}`);
}

// Trade mode toggle
function setTradeMode(mode) {
    const btnSell = document.getElementById('btnSell');
    const btnBuy = document.getElementById('btnBuy');
    
    if (mode === 'sell') {
        btnSell?.classList.add('bg-gradient-to-r', 'from-[#6366f1]', 'to-[#818cf8]', 'text-white');
        btnSell?.classList.remove('bg-[#252530]', 'text-[#a0a0b0]');
        btnBuy?.classList.remove('bg-gradient-to-r', 'from-[#6366f1]', 'to-[#818cf8]', 'text-white');
        btnBuy?.classList.add('bg-[#252530]', 'text-[#a0a0b0]');
    } else {
        btnBuy?.classList.add('bg-gradient-to-r', 'from-[#6366f1]', 'to-[#818cf8]', 'text-white');
        btnBuy?.classList.remove('bg-[#252530]', 'text-[#a0a0b0]');
        btnSell?.classList.remove('bg-gradient-to-r', 'from-[#6366f1]', 'to-[#818cf8]', 'text-white');
        btnSell?.classList.add('bg-[#252530]', 'text-[#a0a0b0]');
    }
    showToast(mode === 'sell' ? '切换到卖出模式' : '切换到买入模式');
}

// Toast notification
function showToast(msg) {
    const toast = document.getElementById('toast');
    const toastMsg = document.getElementById('toastMsg');
    if (toast && toastMsg) {
        toastMsg.textContent = msg;
        toast.classList.remove('opacity-0');
        toast.classList.add('opacity-100');
        setTimeout(() => {
            toast.classList.remove('opacity-100');
            toast.classList.add('opacity-0');
        }, 2000);
    }
}

// Language toggle
function toggleLang() {
    showToast('语言切换功能开发中');
}

// Live balance update
setInterval(() => {
    const balance = document.querySelector('.balance-value');
    const homePage = document.getElementById('page-home');
    if (balance && homePage?.classList.contains('active')) {
        const current = parseFloat(balance.textContent.replace(/[$,]/g, ''));
        const change = (Math.random() - 0.3) * 5;
        const newVal = (current + change).toFixed(2);
        balance.textContent = '$' + newVal.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    }
}, 5000);
