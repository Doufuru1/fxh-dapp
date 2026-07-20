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
    
    // 立即參與按鈕
    const joinBtn = document.getElementById('joinBtn');
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
                background: radial-gradient(circle, rgba(176,38,255,0.8), transparent);
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
            
            // 切换到卡牌页
            setTimeout(() => {
                switchTab('cards');
            }, 300);
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
                showToast('鏈接已複製');
            } catch (err) {
                // 降级方案
                const textArea = document.createElement('textarea');
                textArea.value = inviteLink.textContent.trim();
                document.body.appendChild(textArea);
                textArea.select();
                document.execCommand('copy');
                document.body.removeChild(textArea);
                showToast('鏈接已複製');
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
            showToast('暫無可領取獎勵');
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
    
    // 卡牌 3D 倾斜效果
    const cards = document.querySelectorAll('.card-item');
    cards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            const rotateX = (y - centerY) / 10;
            const rotateY = (centerX - x) / 10;
            
            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.02)`;
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale(1)';
        });
    });
    
    // 卡片滑动惯性增强
    const cardsScroll = document.querySelector('.cards-scroll');
    if (cardsScroll) {
        let isDown = false;
        let startX;
        let scrollLeft;
        
        cardsScroll.addEventListener('mousedown', (e) => {
            isDown = true;
            cardsScroll.style.cursor = 'grabbing';
            startX = e.pageX - cardsScroll.offsetLeft;
            scrollLeft = cardsScroll.scrollLeft;
        });
        
        cardsScroll.addEventListener('mouseleave', () => {
            isDown = false;
            cardsScroll.style.cursor = 'grab';
        });
        
        cardsScroll.addEventListener('mouseup', () => {
            isDown = false;
            cardsScroll.style.cursor = 'grab';
        });
        
        cardsScroll.addEventListener('mousemove', (e) => {
            if (!isDown) return;
            e.preventDefault();
            const x = e.pageX - cardsScroll.offsetLeft;
            const walk = (x - startX) * 2;
            cardsScroll.scrollLeft = scrollLeft - walk;
        });
    }
    
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
            showToast('即將推出');
        });
    });
    
    // 菜单项点击
    const menuItems = document.querySelectorAll('.menu-item');
    menuItems.forEach(item => {
        item.addEventListener('click', () => {
            const label = item.querySelector('.menu-label')?.textContent || '';
            showToast(`${label} 即將推出`);
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
