document.addEventListener('DOMContentLoaded', () => {
    // 立即參與按鈕
    const joinBtn = document.getElementById('joinBtn');
    if (joinBtn) {
        joinBtn.addEventListener('click', () => {
            // 創建脈衝效果
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
            
            // 平滑滾動到卡牌區
            const cardsSection = document.querySelector('.cards-section');
            if (cardsSection) {
                setTimeout(() => {
                    cardsSection.scrollIntoView({ behavior: 'smooth' });
                }, 300);
            }
        });
    }
    
    // 數字滾動動畫
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
    
    // 統計數字動畫
    const statValues = document.querySelectorAll('.stat-value');
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
                    // 小數情況
                    el.textContent = originalText;
                }
            }, 500 + index * 200);
        }
    });
    
    // 卡牌 3D 傾斜效果
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
    
    // 卡片滑動慣性增強
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
    
    // 動態生成星空粒子
    const stars = document.querySelector('.stars');
    if (stars) {
        // 已有的 radial-gradient 會提供基礎星空，這裡添加偶爾的閃爍效果
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
    
    // 導航按鈕提示
    const iconBtns = document.querySelectorAll('.icon-btn');
    iconBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            btn.style.transform = 'scale(0.9)';
            setTimeout(() => btn.style.transform = '', 150);
        });
    });
});
