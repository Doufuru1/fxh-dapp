const shares = document.querySelector('#shares');
const cost = document.querySelector('#cost');
const toast = document.querySelector('.toast');
const nav = document.querySelector('.nav');
const menu = document.querySelector('.menu-button');
let toastTimer;
function showToast(message){if(!toast)return;toast.textContent=message;toast.classList.add('show');clearTimeout(toastTimer);toastTimer=setTimeout(()=>toast.classList.remove('show'),3200)}
function updateCost(){const value=Math.min(10,Math.max(1,Number(shares?.value)||1));if(shares)shares.value=value; if(cost)cost.textContent=`${(value*.002).toFixed(3)} BNB`}
document.querySelectorAll('.step').forEach(btn=>btn.addEventListener('click',()=>{shares.value=Math.min(10,Math.max(1,Number(shares.value||1)+Number(btn.dataset.step||0)));updateCost()}));
shares?.addEventListener('input',updateCost);updateCost();
const endsAt=Date.now()+7*24*60*60*1000;
function tick(){const remaining=Math.max(0,endsAt-Date.now());const total=Math.floor(remaining/1000);const d=Math.floor(total/86400);const h=Math.floor(total%86400/3600);const m=Math.floor(total%3600/60);const s=total%60;const node=document.querySelector('#countdown');if(node)node.textContent=`${d}D ${String(h).padStart(2,'0')}:${String(m).padStart(2,'0')}:${String(s).padStart(2,'0')}`}tick();setInterval(tick,1000);
menu?.addEventListener('click',()=>{const open=nav.classList.toggle('open');menu.setAttribute('aria-expanded',String(open))});nav?.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>{nav.classList.remove('open');menu?.setAttribute('aria-expanded','false')}));
document.querySelector('.js-connect')?.addEventListener('click',e=>{e.currentTarget.innerHTML='演示钱包 0x…BDOG <span>✓</span>';showToast('演示钱包已连接；当前不会发起链上交易。')});
document.querySelector('.js-mint')?.addEventListener('click',()=>showToast('公平铸造演示：真实合约与 ABI 接入后才会发起交易。'));
