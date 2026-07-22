document.addEventListener('DOMContentLoaded', () => {
    const tabBar = document.getElementById('tabBar');
    const pages = document.querySelectorAll('.page');
    const toast = document.getElementById('toast');
    const pageContainer = document.getElementById('pageContainer');
    
    // Tab 切换
    const switchTab = (tabName) => {
        // 更新 tab 按钮状态
        tabBar.querySelectorAll('.tab-item').forEach(item => {
            item.classList.toggle('active', item.dataset.tab === tabName);
        });
        
        // 更新页面显示
        pages.forEach(page => {
            if (page.dataset.tab === tabName) {
                page.classList.add('active');
                // 重置滚动位置到顶部
                const scrollArea = page.querySelector('.page-scroll');
                if (scrollArea) scrollArea.scrollTop = 0;
            } else {
                page.classList.remove('active');
            }
        });
    };
    
    tabBar.addEventListener('click', (e) => {
        const tabItem = e.target.closest('.tab-item');
        if (!tabItem) return;
        const tabName = tabItem.dataset.tab;
        switchTab(tabName);
        
        // 触发轻微震动反馈（如果支持）
        if (navigator.vibrate) {
            navigator.vibrate(10);
        }
    });
    
    // 链接钱包按钮
    const walletBtn = document.getElementById('walletBtn');
    if (walletBtn) {
        walletBtn.addEventListener('click', () => {
            showToast('钱包功能即将推出');
        });
    }
    
    // 立即参与按钮
    const joinBtn = document.getElementById('joinBtn');
    const participatePanel = document.getElementById('participatePanel');
    const participateBackdrop = document.getElementById('participateBackdrop');
    const participateClose = document.getElementById('participateClose');
    const cancelBtn = document.getElementById('cancelBtn');
    const confirmBtn = document.getElementById('confirmBtn');
    const participateAmount = document.getElementById('participateAmount');
    const minBtn = document.getElementById('minBtn');
    const maxBtn = document.getElementById('maxBtn');
    const bnbBalance = document.getElementById('bnbBalance');
    
    const openPanel = () => {
        if (participatePanel) {
            participatePanel.classList.add('active');
            if (participateAmount) participateAmount.value = '';
            if (participateAmount) participateAmount.focus();
            if (confirmBtn) confirmBtn.disabled = true;
        }
    };
    
    const closePanel = () => {
        if (participatePanel) {
            participatePanel.classList.remove('active');
        }
    };
    
    if (joinBtn) {
        joinBtn.addEventListener('click', () => {
            // 创建脉冲效果
            const pulse = document.createElement('div');
            pulse.style.cssText = `
                position: fixed;
                top: 50%;
                left: 50%;
                width: 20px;
                height: 20px;
                border-radius: 50%;
                background: radial-gradient(circle, rgba(255,107,53,0.8), transparent);
                transform: translate(-50%, -50%);
                pointer-events: none;
                z-index: 9999;
            `;
            document.body.appendChild(pulse);
            
            pulse.animate([
                { transform: 'translate(-50%, -50%) scale(0)', opacity: 1 },
                { transform: 'translate(-50%, -50%) scale(20)', opacity: 0 }
            ], {
                duration: 600,
                easing: 'ease-out'
            }).onfinish = () => pulse.remove();
            
            // 打开参与面板
            setTimeout(() => {
                openPanel();
            }, 300);
        });
    }
    
    if (participateBackdrop) participateBackdrop.addEventListener('click', closePanel);
    if (participateClose) participateClose.addEventListener('click', closePanel);
    if (cancelBtn) cancelBtn.addEventListener('click', closePanel);
    
    if (participateAmount) {
        participateAmount.addEventListener('input', () => {
            const val = parseFloat(participateAmount.value);
            if (confirmBtn) {
                confirmBtn.disabled = !(val >= 0.05 && val <= 3);
            }
        });
    }
    
    if (minBtn) {
        minBtn.addEventListener('click', () => {
            if (participateAmount) participateAmount.value = '0.05';
            if (confirmBtn) confirmBtn.disabled = false;
        });
    }
    
    if (maxBtn) {
        maxBtn.addEventListener('click', () => {
            if (participateAmount) {
                const balance = parseFloat(bnbBalance?.textContent || '0');
                const max = Math.min(balance, 3);
                participateAmount.value = max.toFixed(6).replace(/\.?0+$/, '');
            }
            if (confirmBtn) confirmBtn.disabled = false;
        });
    }
    
    if (confirmBtn) {
        confirmBtn.addEventListener('click', () => {
            if (confirmBtn.disabled) return;
            showToast(`参与 ${participateAmount.value} BNB 成功`);
            closePanel();
        });
    }
    
    // Toast 提示
    const showToast = (message) => {
        toast.textContent = message;
        toast.classList.add('show');
        setTimeout(() => {
            toast.classList.remove('show');
        }, 2500);
    };
    
    // 复制邀请链接
    const copyBtn = document.getElementById('copyBtn');
    const inviteLink = document.getElementById('inviteLink');
    if (copyBtn && inviteLink) {
        copyBtn.addEventListener('click', async () => {
            try {
                await navigator.clipboard.writeText(inviteLink.textContent.trim());
                showToast('链接已复制');
            } catch (err) {
                // 降级方案
                const textArea = document.createElement('textarea');
                textArea.value = inviteLink.textContent.trim();
                document.body.appendChild(textArea);
                textArea.select();
                document.execCommand('copy');
                document.body.removeChild(textArea);
                showToast('链接已复制');
            }
            
            if (navigator.vibrate) {
                navigator.vibrate([20, 30, 20]);
            }
        });
    }
    
    // 领取奖励按钮
    const claimBtn = document.getElementById('claimBtn');
    if (claimBtn) {
        claimBtn.addEventListener('click', () => {
            showToast('暂无可领取奖励');
        });
    }
    
    // 倒计时
    const countdownEl = document.getElementById('countdownTime');
    if (countdownEl) {
        let totalSeconds = 22 * 3600 + 12 * 60 + 28;
        
        const updateCountdown = () => {
            const hours = Math.floor(totalSeconds / 3600).toString().padStart(2, '0');
            const minutes = Math.floor((totalSeconds % 3600) / 60).toString().padStart(2, '0');
            const seconds = (totalSeconds % 60).toString().padStart(2, '0');
            countdownEl.textContent = `${hours}:${minutes}:${seconds}`;
            
            if (totalSeconds > 0) {
                totalSeconds--;
            }
        };
        
        updateCountdown();
        setInterval(updateCountdown, 1000);
    }
    
    // 进度条动画
    const progressFill = document.getElementById('progressFill');
    const progressValue = document.getElementById('progressValue');
    let progress = 0;
    
    const animateProgress = () => {
        if (progress <= 0) return;
        if (progressFill) progressFill.style.width = progress + '%';
        if (progressValue) progressValue.textContent = progress.toFixed(2) + '%';
    };
    
    // 数字滚动动画
    const animateValue = (element, start, end, duration, prefix = '', suffix = '') => {
        let startTimestamp = null;
        const step = (timestamp) => {
            if (!startTimestamp) startTimestamp = timestamp;
            const progress = Math.min((timestamp - startTimestamp) / duration, 1);
            const value = Math.floor(progress * (end - start) + start);
            element.textContent = prefix + value.toLocaleString() + suffix;
            if (progress < 1) {
                window.requestAnimationFrame(step);
            }
        };
        window.requestAnimationFrame(step);
    };
    
    // 首页统计数字动画
    const statValues = document.querySelectorAll('.page-home .stat-value');
    statValues.forEach((el, index) => {
        const originalText = el.textContent;
        const isCurrency = originalText.startsWith('$');
        const prefix = isCurrency ? '$' : '';
        const numericValue = parseFloat(originalText.replace(/[$,]/g, ''));
        
        if (!isNaN(numericValue)) {
            el.textContent = prefix + '0';
            setTimeout(() => {
                if (Number.isInteger(numericValue)) {
                    animateValue(el, 0, numericValue, 2000, prefix);
                } else {
                    el.textContent = originalText;
                }
            }, 500 + index * 200);
        }
    });
    
    // 动态生成星空闪烁
    const stars = document.querySelector('.stars');
    if (stars) {
        const addTwinkle = () => {
            const star = document.createElement('div');
            star.style.cssText = `
                position: fixed;
                width: 2px;
                height: 2px;
                background: white;
                border-radius: 50%;
                top: ${Math.random() * 100}%;
                left: ${Math.random() * 100}%;
                pointer-events: none;
                z-index: 0;
                opacity: 0;
            `;
            document.body.appendChild(star);
            
            star.animate([
                { opacity: 0, transform: 'scale(0)' },
                { opacity: 1, transform: 'scale(1.5)' },
                { opacity: 0, transform: 'scale(0)' }
            ], {
                duration: 2000,
                easing: 'ease-in-out'
            }).onfinish = () => star.remove();
        };
        
        setInterval(addTwinkle, 800);
    }
    
    // 导航按钮提示
    const iconBtns = document.querySelectorAll('.icon-btn');
    iconBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            btn.style.transform = 'scale(0.9)';
            setTimeout(() => btn.style.transform = '', 150);
            showToast('即将推出');
        });
    });
    
    // 菜单项点击
    const menuItems = document.querySelectorAll('.menu-item');
    menuItems.forEach(item => {
        item.addEventListener('click', () => {
            const label = item.querySelector('.menu-label')?.textContent || '';
            showToast(`${label} 即将推出`);
        });
    });
    
    // 仪表盘数字动画 - 只在切换到仪表盘时触发一次
    let dashboardAnimated = false;
    const dashboardTab = document.querySelector('.tab-item[data-tab="dashboard"]');
    if (dashboardTab) {
        dashboardTab.addEventListener('click', () => {
            if (dashboardAnimated) return;
            dashboardAnimated = true;
            
            setTimeout(() => {
                // 进度条动画
                progress = 23.5;
                animateProgress();
                
                // 数字增长动画
                const dashValues = document.querySelectorAll('.page-dashboard .dashboard-stat-value');
                dashValues.forEach((el, index) => {
                    const original = el.textContent;
                    const hasSlash = original.includes('/');
                    const isDecimal = original.includes('.');
                    
                    if (hasSlash) {
                        el.textContent = '0/60 D';
                        setTimeout(() => el.textContent = original, 800 + index * 100);
                    } else if (isDecimal) {
                        el.textContent = '0.000000';
                        setTimeout(() => {
                            el.textContent = original;
                        }, 800 + index * 100);
                    } else {
                        el.textContent = '0';
                        setTimeout(() => {
                            animateValue(el, 0, parseInt(original), 800, '', '');
                        }, 800 + index * 100);
                    }
                });
            }, 300);
        });
    }
    
    // 防止 iOS 橡皮筋效果
    document.body.addEventListener('touchmove', (e) => {
        if (e.target.closest('.page-scroll')) return;
        e.preventDefault();
    }, { passive: false });
});
