const amountInput = document.querySelector('#amount');
const estimate = document.querySelector('#estimate');
const presetButtons = document.querySelectorAll('[data-amount]');
const modal = document.querySelector('#connect-modal');
const menuToggle = document.querySelector('.menu-toggle');
const nav = document.querySelector('.desktop-nav');
const COMMUNITY_ALLOCATION = 800000000;
let activeLanguage = localStorage.getItem('okmeme-language') || 'zh';

function formatNumber(value) {
  return new Intl.NumberFormat('en-US', { maximumFractionDigits: 0 }).format(value);
}

function updateEstimate() {
  const raw = Number(amountInput.value) || 0;
  const bounded = Math.min(Math.max(raw, 0), 20);
  const totalInput = document.querySelector('#progress-input');
  const totalLabel = document.querySelector('#community-total');
  const communityTotal = Math.max(Number(totalInput?.value) || 0, bounded, 0.000001);
  const result = bounded / communityTotal * COMMUNITY_ALLOCATION;
  estimate.textContent = formatNumber(result);
  if (totalLabel) totalLabel.textContent = Number.isInteger(communityTotal) ? communityTotal : communityTotal.toFixed(1);
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
  const statusText = activeLanguage === 'en'
    ? (isOver ? 'OVER SOFT CAP' : isReached ? 'SOFT CAP REACHED' : 'IN PROGRESS')
    : (isOver ? '超过软顶' : isReached ? '软顶已达' : '进行中');
  progressStatus.textContent = statusText;
  progressStatus.classList.toggle('is-over', isOver);
  progressTrack.setAttribute('aria-valuenow', String(amount));
  updateEstimate();
}

progressInput.addEventListener('input', updateProgress);
updateProgress();

const langToggle = document.querySelector('#lang-toggle');
const translations = {
  zh: {
    '.desktop-nav a:nth-child(1)': '关于 DAO',
    '.desktop-nav a:nth-child(2)': 'OKM',
    '.desktop-nav a:nth-child(3)': '参与规则',
    '.desktop-nav a:nth-child(4)': '路线图',
    '.header-cta': '连接钱包 <span>↗</span>',
    '.eyebrow': '<span class="pulse"></span> DAO COMMUNITY BUILD · X LAYER',
    'h1': '让发行回归公平<span class="lime">，</span><br />让平台回归社区<span class="lime">。</span>',
    '.hero-lead': 'OK.MEME DAO 是一个由社区共同建设、共同治理、共享长期价值的 MEME 生态计划。',
    '.hero-actions .button-primary': '查看参与方式 <span>↓</span>',
    '.hero-actions .button-ghost': '了解计划 <span>↗</span>',
    '.hero-note': '<span class="lock-icon">⌁</span> 公平发射 · 统一规则 · 价值共享',
    '#about .section-kicker': '01 / ABOUT OK.MEME',
    '.metric-intro h2': '不只是一个<br /><em>发射平台。</em>',
    '.metric-intro p': '从 MEME 发射到链上交易，从 Tax Token 到 RWA 流动性，OK.MEME 正在 X Layer 上持续构建开放、高效的链上资产基础设施。',
    '.metrics-grid .metric:nth-child(2) small': '已发行项目',
    '.metrics-grid .metric:nth-child(3) small': '累计创建流动性',
    '.feature-list div:nth-child(1) b': 'Tax Token',
    '.feature-list div:nth-child(1) small': '自定义交易税机制',
    '.feature-list div:nth-child(2) b': 'RWA / Stock Pools',
    '.feature-list div:nth-child(2) small': '现实资产流动性池',
    '.feature-list div:nth-child(3) b': 'Uniswap v4 Hooks',
    '.feature-list div:nth-child(3) small': '新一代交易架构',
    '.feature-list div:nth-child(4) b': 'Wallet & AVE',
    '.feature-list div:nth-child(4) small': '钱包及行情数据集成',
    '#token .section-kicker': '02 / THE DAO TOKEN',
    '#token .section-heading h2': 'OKM，社区的<br /><span>共建凭证。</span>',
    '#token .section-heading > p': 'OKM 是 OK.MEME DAO 的社区治理与权益代币，用于平台治理、社区激励和生态价值回流。',
    '#token .allocation-legend div:nth-child(1) span': 'DAO 社区捐赠',
    '#token .allocation-legend div:nth-child(2) span': '初始流动性',
    '#token .allocation-legend div:nth-child(3) span': '团队长期建设',
    '#token .allocation-foot span': '总发行量',
    '.token-copy h3': '固定总量，<br /><span>没有隐藏份额。</span>',
    '.token-copy p': '8 亿枚 OKM 面向符合条件的社区捐赠用户开放，按照有效捐赠 OKB 占总有效捐赠量的比例统一分配。',
    '.token-copy blockquote': '真正的 MEME 生态，不应只属于少数资本和早期参与者，而应该由整个社区共同建设。',
    '#participate .section-kicker': '03 / COMMUNITY CONTRIBUTION',
    '#participate .section-heading h2': '参与共建，<br /><span>拿回你的份额。</span>',
    '#participate .section-heading > p': '公开捐赠、统一比例、加权分配。每一个符合条件的地址，都按照同一套公式参与社区份额分配。',
    '.soft-cap-title span': 'SOFT CAP PROGRESS',
    '.soft-cap-title small': 'SOFT CAP / 200 OKB',
    '.progress-input-row > span': '模拟累计捐赠',
    '#participate .field-label span:first-child': '模拟有效捐赠',
    '.estimate > div > span': '预计获得 OKM',
    '.estimate small': '全网有效捐赠总量：<b id="community-total">200</b> OKB',
    '.calculator-foot > span:first-child': '公式：个人有效捐赠 ÷ 全网有效捐赠 × 800,000,000',
    '#participate .donation-card .full-width': '官方捐赠入口待公布 <span>↗</span>',
    '#participate .rule-row:nth-child(1) b': '0.2 — 20 OKB',
    '#participate .rule-row:nth-child(1) p': '单地址有效捐赠区间',
    '#participate .rule-row:nth-child(2) b': '72 小时',
    '#participate .rule-row:nth-child(2) p': '公开捐赠持续时间',
    '#participate .rule-row:nth-child(3) b': '24 小时内',
    '#participate .rule-row:nth-child(3) p': '捐赠结束后完成代币发放',
    '#participate .rule-row:nth-child(4) b': '统一资格审核',
    '#participate .rule-row:nth-child(4) p': '近三个月符合要求的 MEME 链上交易记录',
    '#participate .notice p': '<b>重要提示：</b>官方捐赠地址尚未公布。请勿向任何个人或非官方地址转账，最终资格、估值、上限及退款规则以官方正式公告为准。',
    '#roadmap .section-kicker': '04 / VALUE FLOW',
    '.flow-heading h2': '社区参与，<br /><span>价值回到社区。</span>',
    '.flow-heading p': '平台计划将 80% 的可分配收益用于 OKM 回购，其余部分用于社区激励与生态长期建设，所有执行记录定期公开。',
    '#roadmap .flow-step:nth-child(1) strong': '平台业务',
    '#roadmap .flow-step:nth-child(1) small': '交易活动 · 生态收入',
    '#roadmap .flow-step:nth-child(3) strong': 'OKM 回购',
    '#roadmap .flow-step:nth-child(3) small': '80% 可分配收益',
    '#roadmap .flow-step:nth-child(5) strong': '生态激励',
    '#roadmap .flow-step:nth-child(5) small': '社区 · 建设者 · 长期发展',
    '.final-cta h2': '把 MEME 的未来，<br /><span>交回社区。</span>',
    '.final-cta p': '我们需要的不是短期投机者，而是认同公平发行、长期建设和去中心化理念的社区共建者。',
    '.final-cta .button': '加入 OK.MEME DAO <span>↗</span>',
    '.modal-panel h2': '官方入口即将开放',
    '.modal-panel p': '当前 OK.MEME DAO 捐赠地址、合约和正式开放时间尚未公布。为保护社区资产安全，请不要向任何地址转账。',
    '.modal-status': '<i></i> 计划准备中 · 请关注官方公告',
    '.modal-panel .button-ghost': '我知道了'
  },
  en: {
    '.desktop-nav a:nth-child(1)': 'About DAO',
    '.desktop-nav a:nth-child(2)': 'OKM',
    '.desktop-nav a:nth-child(3)': 'Rules',
    '.desktop-nav a:nth-child(4)': 'Roadmap',
    '.header-cta': 'Connect Wallet <span>↗</span>',
    '.eyebrow': '<span class="pulse"></span> DAO COMMUNITY BUILD · X LAYER',
    'h1': 'Bring the launch back to <span class="lime">fairness,</span><br />bring the platform back to the <span class="lime">community.</span>',
    '.hero-lead': 'OK.MEME DAO is a community-built, community-governed MEME ecosystem designed to share long-term value.',
    '.hero-actions .button-primary': 'View contribution <span>↓</span>',
    '.hero-actions .button-ghost': 'Explore the plan <span>↗</span>',
    '.hero-note': '<span class="lock-icon">⌁</span> Fair launch · unified rules · shared value',
    '#about .section-kicker': '01 / ABOUT OK.MEME',
    '.metric-intro h2': 'More than a<br /><em>launch platform.</em>',
    '.metric-intro p': 'From MEME launches and on-chain trading to Tax Tokens and RWA liquidity, OK.MEME is building open, efficient asset infrastructure on X Layer.',
    '.metrics-grid .metric:nth-child(2) small': 'Projects launched',
    '.metrics-grid .metric:nth-child(3) small': 'Liquidity created',
    '.feature-list div:nth-child(1) b': 'Tax Token',
    '.feature-list div:nth-child(1) small': 'Custom trading tax mechanics',
    '.feature-list div:nth-child(2) b': 'RWA / Stock Pools',
    '.feature-list div:nth-child(2) small': 'Real-world asset liquidity',
    '.feature-list div:nth-child(3) b': 'Uniswap v4 Hooks',
    '.feature-list div:nth-child(3) small': 'Next-generation trading architecture',
    '.feature-list div:nth-child(4) b': 'Wallet & AVE',
    '.feature-list div:nth-child(4) small': 'Wallet and market data integration',
    '#token .section-kicker': '02 / THE DAO TOKEN',
    '#token .section-heading h2': 'OKM, the<br /><span>community credential.</span>',
    '#token .section-heading > p': 'OKM is the governance and utility token of OK.MEME DAO, designed for platform governance, community incentives, and ecosystem value flow.',
    '#token .allocation-legend div:nth-child(1) span': 'DAO community contribution',
    '#token .allocation-legend div:nth-child(2) span': 'Initial liquidity',
    '#token .allocation-legend div:nth-child(3) span': 'Long-term team build',
    '#token .allocation-foot span': 'Total supply',
    '.token-copy h3': 'Fixed supply,<br /><span>no hidden allocation.</span>',
    '.token-copy p': '800 million OKM is open to eligible community contributors and allocated by each address’s share of total valid OKB contributions.',
    '.token-copy blockquote': 'A true MEME ecosystem should not belong only to a few early participants. It should be built by the whole community.',
    '#participate .section-kicker': '03 / COMMUNITY CONTRIBUTION',
    '#participate .section-heading h2': 'Build together,<br /><span>claim your share.</span>',
    '#participate .section-heading > p': 'Open contribution, one formula, weighted allocation. Every eligible address participates under the same rules.',
    '.soft-cap-title span': 'SOFT CAP PROGRESS',
    '.soft-cap-title small': 'SOFT CAP / 200 OKB',
    '.progress-input-row > span': 'Simulated total',
    '#participate .field-label span:first-child': 'Your contribution',
    '.estimate > div > span': 'Estimated OKM',
    '.estimate small': 'Total valid contributions: <b id="community-total">200</b> OKB',
    '.calculator-foot > span:first-child': 'Formula: personal OKB ÷ total valid OKB × 800,000,000',
    '#participate .donation-card .full-width': 'Official entry pending <span>↗</span>',
    '#participate .rule-row:nth-child(1) b': '0.2 — 20 OKB',
    '#participate .rule-row:nth-child(1) p': 'Valid contribution per address',
    '#participate .rule-row:nth-child(2) b': '72 hours',
    '#participate .rule-row:nth-child(2) p': 'Open contribution window',
    '#participate .rule-row:nth-child(3) b': 'Within 24 hours',
    '#participate .rule-row:nth-child(3) p': 'Token distribution after close',
    '#participate .rule-row:nth-child(4) b': 'Unified eligibility review',
    '#participate .rule-row:nth-child(4) p': 'Qualified MEME activity within the last three months',
    '#participate .notice p': '<b>Important:</b> The official contribution address has not been announced. Never transfer funds to personal or unofficial addresses. Final eligibility, valuation, cap, and refund rules follow the official announcement.',
    '#roadmap .section-kicker': '04 / VALUE FLOW',
    '.flow-heading h2': 'Community participation,<br /><span>value flows back.</span>',
    '.flow-heading p': 'The platform plans to use 80% of distributable revenue for OKM buybacks, with the rest supporting community incentives and long-term ecosystem growth.',
    '#roadmap .flow-step:nth-child(1) strong': 'Platform business',
    '#roadmap .flow-step:nth-child(1) small': 'Trading activity · ecosystem revenue',
    '#roadmap .flow-step:nth-child(3) strong': 'OKM buybacks',
    '#roadmap .flow-step:nth-child(3) small': '80% of distributable revenue',
    '#roadmap .flow-step:nth-child(5) strong': 'Ecosystem incentives',
    '#roadmap .flow-step:nth-child(5) small': 'Community · builders · long-term growth',
    '.final-cta h2': 'Put the future of MEME<br /><span>back in the community.</span>',
    '.final-cta p': 'We are looking for community builders who believe in fair launches, long-term construction, and decentralized growth—not short-term speculation.',
    '.final-cta .button': 'Join OK.MEME DAO <span>↗</span>',
    '.modal-panel h2': 'Official entry coming soon',
    '.modal-panel p': 'The official OK.MEME DAO contribution address, contract, and opening time have not been announced. For community safety, do not transfer funds to any address.',
    '.modal-status': '<i></i> Plan in preparation · Follow official updates',
    '.modal-panel .button-ghost': 'Got it'
  }
};

function applyLanguage(language) {
  activeLanguage = language === 'en' ? 'en' : 'zh';
  Object.entries(translations[activeLanguage]).forEach(([selector, html]) => {
    const node = document.querySelector(selector);
    if (node) node.innerHTML = html;
  });
  document.documentElement.lang = activeLanguage === 'en' ? 'en' : 'zh-CN';
  localStorage.setItem('okmeme-language', activeLanguage);
  if (langToggle) {
    langToggle.classList.toggle('is-en', activeLanguage === 'en');
    langToggle.setAttribute('aria-pressed', String(activeLanguage === 'en'));
    langToggle.setAttribute('aria-label', activeLanguage === 'en' ? 'Switch to Chinese' : '切换到 English');
  }
  updateProgress();
}

langToggle?.addEventListener('click', () => {
  applyLanguage(activeLanguage === 'en' ? 'zh' : 'en');
});
applyLanguage(activeLanguage);
