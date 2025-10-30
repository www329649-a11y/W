// 获取DOM元素
const startBtn = document.getElementById('startBtn');
const particlesContainer = document.getElementById('particlesContainer');
const warmTipsContainer = document.getElementById('warmTipsContainer');
const cherryBlossomContainer = document.getElementById('cherryBlossomContainer');
const backgroundEffects = document.querySelector('.background-effects');

// 状态变量
let isParticlesActive = false;

// 提示文字列表（从text.py中复制）
const tips = [
    '多喝水哦~', '保持微笑呀', '每天都要元气满满',
    '记得吃水果', '保持好心情', '好好爱自己', '我想你了',
    '梦想成真', '期待下一次见面', '金榜题名',
    '顺顺利利', '早点休息', '愿所有烦恼都消失',
    '别熬夜', '今天过得开心嘛', '天冷了，多穿衣服'
];

// 背景颜色列表
const bgColors = ['pink'];

// 随机选择函数
function randomChoice(array) {
    return array[Math.floor(Math.random() * array.length)];
}



// 显示温馨提示
function showWarmTips(count = 30) {
    // 清除旧的提示窗口
    warmTipsContainer.innerHTML = '';
    
    // 获取视口尺寸
    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;
    
    // 创建多个提示窗口
    for (let i = 0; i < count; i++) {
        setTimeout(() => {
            createWarmTip(viewportWidth, viewportHeight);
        }, i * 500); // 间隔5ms创建一个窗口，模拟Python版本的快速弹出效果
    }
}

// 创建单个温馨提示窗口
function createWarmTip(viewportWidth, viewportHeight) {
    const tipElement = document.createElement('div');
    tipElement.className = 'warm-tip';
    
    // 随机选择提示文字
    const tipText = randomChoice(tips);
    tipElement.textContent = tipText;
    
    // 随机选择背景颜色
    const bgColor = randomChoice(bgColors);
    tipElement.style.backgroundColor = bgColor;
    
    // 随机位置，但确保窗口完全在视口内
    const windowWidth = 250;
    const windowHeight = 90;
    const x = Math.random() * (viewportWidth - windowWidth);
    const y = Math.random() * (viewportHeight - windowHeight);
    
    tipElement.style.left = `${x}px`;
    tipElement.style.top = `${y}px`;
    
    // 添加点击关闭事件
    tipElement.addEventListener('click', () => {
        tipElement.style.opacity = '0';
        tipElement.style.transform = 'translateY(-10px) scale(0.95)';
        setTimeout(() => {
            tipElement.remove();
        }, 1000);
    });
    
    // 自动消失（5-10秒后）
    setTimeout(() => {
        tipElement.style.opacity = '0';
        tipElement.style.transform = 'translateY(-10px) scale(0.95)';
        setTimeout(() => {
            tipElement.remove();
        }, 1000);
    }, 5000 + Math.random() * 5000);
    
    warmTipsContainer.appendChild(tipElement);
    
    // 返回创建的元素
    return tipElement;
}



// 粒子效果函数
function createParticles(forceReset = false) {
    // 清空容器
    particlesContainer.innerHTML = '';
    
    // 设置状态
    isParticlesActive = true;
    
    // 获取容器尺寸
    const containerWidth = window.innerWidth;
    const containerHeight = window.innerHeight;
    
    // 创建100个粒子
    for (let i = 0; i < 100; i++) {
        const particle = document.createElement('div');
        particle.classList.add('particle');
        
        // 随机大小
        const size = Math.random() * 5 + 1;
        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;
        
        // 随机位置
        particle.style.left = `${Math.random() * containerWidth}px`;
        particle.style.top = `${Math.random() * containerHeight}px`;
        
        // 随机颜色（使用温暖的颜色）
        const colors = ['#ff6b6b', '#ffa502', '#ffd700', '#90ee90', '#87cefa', '#dda0dd'];
        particle.style.background = randomChoice(colors);
        
        // 随机动画延迟和持续时间
        const delay = Math.random() * 5;
        const duration = Math.random() * 20 + 10;
        particle.style.animationDelay = `${delay}s`;
        particle.style.animationDuration = `${duration}s`;
        
        particlesContainer.appendChild(particle);
    }
    
    // 确保容器可见
    particlesContainer.style.display = 'block';
}

// 初始化事件监听器
function initEventListeners() {
    // 开始按钮
    startBtn.addEventListener('click', () => {
        // 禁用按钮防止重复点击
        startBtn.disabled = true;
        startBtn.textContent = '进行中...';
        
        // 显示温馨提示效果
        showWarmTips(30);
        
        // 5秒后恢复按钮状态
        setTimeout(() => {
            startBtn.disabled = false;
            startBtn.textContent = '想你了';
        }, 10000);
    });

    // 窗口大小变化时重新初始化粒子效果
    window.addEventListener('resize', () => {
        updateViewportHeight();
        if (isParticlesActive) {
            createParticles(true);
        }
    });
}



// 创建樱花效果
function createCherryBlossoms() {
    if (!cherryBlossomContainer) return;
    
    // 更新视口高度变量
    updateViewportHeight();
    
    // 获取视口尺寸
    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;
    
    // 创建初始的50个樱花花瓣
    for (let i = 0; i < 50; i++) {
        createCherryBlossom(viewportWidth, viewportHeight);
    }
    
    // 每隔一段时间创建新的樱花花瓣
    const interval = setInterval(() => {
        // 每次创建2-5个新的花瓣
        const count = Math.floor(Math.random() * 4) + 2;
        for (let i = 0; i < count; i++) {
            createCherryBlossom(viewportWidth, viewportHeight);
        }
    }, 1000);
    
    // 存储intervalID以便后续清理
    cherryBlossomContainer._intervalID = interval;
}

// 设置视口高度变量
function updateViewportHeight() {
    // 设置vh变量以确保在移动设备上正确显示
    document.documentElement.style.setProperty('--vh', `${window.innerHeight * 0.01}px`);
}

// 创建单个樱花花瓣
function createCherryBlossom(viewportWidth, viewportHeight) {
    if (!cherryBlossomContainer) return;
    
    const petal = document.createElement('div');
    petal.classList.add('cherry-blossom');
    
    // 随机大小（5-15px）
    const size = Math.random() * 10 + 5;
    petal.style.width = `${size}px`;
    petal.style.height = `${size * 1.2}px`; // 稍微拉长一点
    
    // 随机位置（x坐标在视口内，y坐标从顶部外开始）
    petal.style.left = `${Math.random() * viewportWidth}px`;
    petal.style.top = `-${size * 2}px`;
    
    // 随机旋转角度
    petal.style.transform = `rotate(${Math.random() * 360}deg)`;
    
    // 设置随机的水平移动距离
    const translateX = Math.random() * 100 - 50; // -50到50像素的水平移动
    petal.style.setProperty('--translate-x', `${translateX}px`);
    
    // 随机动画延迟和持续时间
    const delay = Math.random() * 10;
    const duration = Math.random() * 15 + 15; // 15-30秒
    petal.style.animationDelay = `${delay}s`;
    petal.style.animationDuration = `${duration}s`;
    
    // 添加到容器
    cherryBlossomContainer.appendChild(petal);
    
    // 动画结束后移除花瓣
    setTimeout(() => {
        if (petal.parentNode) {
            petal.style.opacity = '0';
            setTimeout(() => {
                if (petal.parentNode) {
                    petal.remove();
                }
            }, 1000);
        }
    }, (delay + duration) * 1000);
}

// 初始化函数
function init() {
    // 初始化事件监听器
    initEventListeners();
    
    // 默认打开粒子效果
    createParticles();
    
    // 添加樱花效果
    createCherryBlossoms();
    
    console.log('页面初始化完成');
}

// 添加主题切换动画样式
const style = document.createElement('style');
style.textContent = `
    .theme-change-animation {
        animation: themeChange 0.5s ease;
    }
    
    @keyframes themeChange {
        0% { transform: scale(1); }
        50% { transform: scale(0.98); }
        100% { transform: scale(1); }
    }
`;
document.head.appendChild(style);

// 页面加载完成后初始化
window.addEventListener('DOMContentLoaded', init);

// 页面卸载时清理资源
window.addEventListener('beforeunload', () => {
    // 移除粒子效果
    particlesContainer.innerHTML = '';
    
    // 清理樱花效果
    if (cherryBlossomContainer && cherryBlossomContainer._intervalID) {
        clearInterval(cherryBlossomContainer._intervalID);
        cherryBlossomContainer.innerHTML = '';
    }
});

// =========================== 增强互动性功能 ===========================

// 1. 拖拽功能 - 为温馨提示窗口添加拖拽能力
function enableDragging(element) {
    let isDragging = false;
    let offsetX, offsetY;
    
    element.addEventListener('mousedown', (e) => {
        isDragging = true;
        offsetX = e.clientX - element.getBoundingClientRect().left;
        offsetY = e.clientY - element.getBoundingClientRect().top;
        
        // 提高当前拖拽元素的层级
        element.style.zIndex = 10002;
        element.style.cursor = 'grabbing';
    });
    
    document.addEventListener('mousemove', (e) => {
        if (!isDragging) return;
        
        const x = e.clientX - offsetX;
        const y = e.clientY - offsetY;
        
        // 确保元素不会拖出视口
        const maxX = window.innerWidth - element.offsetWidth;
        const maxY = window.innerHeight - element.offsetHeight;
        
        element.style.left = `${Math.max(0, Math.min(x, maxX))}px`;
        element.style.top = `${Math.max(0, Math.min(y, maxY))}px`;
        
        // 停止浮动动画
        element.style.animationPlayState = 'paused';
    });
    
    document.addEventListener('mouseup', () => {
        if (isDragging) {
            isDragging = false;
            element.style.cursor = 'move';
            // 恢复浮动动画
            setTimeout(() => {
                element.style.animationPlayState = 'running';
            }, 1000);
        }
    });
}

// 2. 鼠标点击特效 - 爱心粒子爆炸
function addClickEffect(x, y) {
    const effect = document.createElement('div');
    effect.className = 'click-effect';
    
    // 创建爱心形状和粉色系颜色
    const colors = ['#ff85a2', '#ff9fb0', '#ffa5ba', '#ffb8c8', '#ffcad4', '#ffd7e0'];
    const particleCount = 12; // 增加粒子数量，使爆炸效果更丰富
    
    for (let i = 0; i < particleCount; i++) {
        // 创建爱心粒子 - 使用SVG来创建爱心形状
        const particle = document.createElementNS("http://www.w3.org/2000/svg", "svg");
        const size = Math.random() * 15 + 10; // 爱心大小范围
        particle.setAttribute('width', size);
        particle.setAttribute('height', size);
        particle.style.position = 'absolute';
        particle.style.left = '50%';
        particle.style.top = '50%';
        particle.style.transform = 'translate(-50%, -50%)';
        particle.style.opacity = '0.8';
        particle.style.fill = colors[Math.floor(Math.random() * colors.length)];
        
        // 创建爱心路径
        const heartPath = document.createElementNS("http://www.w3.org/2000/svg", "path");
        // 爱心SVG路径
        heartPath.setAttribute('d', 'M12,21.35l-1.45-1.32C5.4,15.36,2,12.28,2,8.5C2,5.42,4.42,3,7.5,3c1.74,0,3.41,0.81,4.5,2.09C13.09,3.81,14.76,3,16.5,3 C19.58,3,22,5.42,22,8.5c0,3.78-3.4,6.86-8.55,11.54L12,21.35z');
        
        particle.appendChild(heartPath);
        
        // 计算随机角度和距离，使爱心向四周爆炸
        const angle = (i / particleCount) * Math.PI * 2 + Math.random() * 0.5; // 添加一些随机性
        const distance = Math.random() * 40 + 30; // 增加爆炸距离
        const translateX = Math.cos(angle) * distance;
        const translateY = Math.sin(angle) * distance;
        
        // 设置CSS变量
        particle.style.setProperty('--translate-x', `${translateX}px`);
        particle.style.setProperty('--translate-y', `${translateY}px`);
        
        // 添加旋转角度变化，使爱心旋转
        const rotateDegrees = Math.random() * 360 - 180;
        particle.style.setProperty('--rotate-degrees', `${rotateDegrees}deg`);
        
        // 添加动画 - 更长的持续时间让效果更明显
        particle.style.animation = `clickParticle ${Math.random() * 0.8 + 0.7}s ease-out forwards`;
        particle.style.animationDelay = `${Math.random() * 0.2}s`;
        
        effect.appendChild(particle);
    }
    
    // 设置点击效果位置
    effect.style.left = `${x}px`;
    effect.style.top = `${y}px`;
    
    document.body.appendChild(effect);
    
    // 移除效果元素 - 增加移除时间以匹配更长的动画
    setTimeout(() => {
        effect.remove();
    }, 1500);
}

// 3. 增强版动态背景效果 - 平滑渐变背景
class SmoothGradientBackground {
    constructor(element) {
        this.element = element;
        this.gradientPoints = [
            { color: '#f9f2f4', position: 0 },  // 非常浅的粉色
            { color: '#f1e1e8', position: 0.3 }, // 柔和的粉色
            { color: '#e8e6f0', position: 0.6 }, // 柔和的淡紫蓝色
            { color: '#f0e6ee', position: 1 }   // 柔和的淡紫色
        ];
        this.animationSpeed = 10; // 降低动画速度，使变化更缓慢
        this.lastUpdateTime = 0;
        this.updateInterval = 200; // 增加更新间隔，减少变化频率
        
        // 初始设置渐变背景
        this.updateGradient();
    }
    
    // 更新渐变背景
    updateGradient() {
        let gradientString = 'linear-gradient(135deg';
        
        // 生成渐变点
        this.gradientPoints.forEach(point => {
            gradientString += `, ${point.color} ${point.position * 100}%`;
        });
        
        gradientString += ')';
        
        // 应用渐变背景
        this.element.style.background = gradientString;
        // 添加平滑过渡效果
        this.element.style.transition = 'background 2s ease';
    }
    
    // 稍微变化渐变点的颜色
    shiftColors() {
        this.gradientPoints.forEach(point => {
            // 将十六进制颜色转换为RGB
            const rgb = this.hexToRgb(point.color);
            
            // 稍微变化RGB值
            rgb.r = this.clampColor(rgb.r + (Math.random() * 2 - 1) * this.animationSpeed);
            rgb.g = this.clampColor(rgb.g + (Math.random() * 2 - 1) * this.animationSpeed);
            rgb.b = this.clampColor(rgb.b + (Math.random() * 2 - 1) * this.animationSpeed);
            
            // 转换回十六进制
            point.color = this.rgbToHex(rgb.r, rgb.g, rgb.b);
        });
    }
    
    // 稍微变化渐变点的位置
    shiftPositions() {
        this.gradientPoints.forEach((point, index) => {
            // 跳过第一个和最后一个点，保持渐变的边界稳定
            if (index > 0 && index < this.gradientPoints.length - 1) {
                // 小范围随机调整位置
                point.position = Math.max(0, Math.min(1, 
                    point.position + (Math.random() * 0.04 - 0.02) * this.animationSpeed / 50));
            }
        });
    }
    
    // 动画循环函数
    animate(timestamp) {
        // 限制更新频率
        if (!this.lastUpdateTime || timestamp - this.lastUpdateTime > this.updateInterval) {
            this.lastUpdateTime = timestamp;
            
            // 变化颜色和位置
            this.shiftColors();
            this.shiftPositions();
            
            // 更新渐变
            this.updateGradient();
        }
        
        requestAnimationFrame(time => this.animate(time));
    }
    
    // 辅助函数：十六进制转RGB
    hexToRgb(hex) {
        const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
        return result ? {
            r: parseInt(result[1], 16),
            g: parseInt(result[2], 16),
            b: parseInt(result[3], 16)
        } : null;
    }
    
    // 辅助函数：RGB转十六进制
    rgbToHex(r, g, b) {
        return '#' + [r, g, b].map(x => {
            const hex = x.toString(16);
            return hex.length === 1 ? '0' + hex : hex;
        }).join('');
    }
    
    // 辅助函数：确保颜色值在0-255范围内
    clampColor(color) {
        return Math.max(0, Math.min(255, Math.round(color)));
    }
    
    // 开始动画
    start() {
        requestAnimationFrame(time => this.animate(time));
    }
}

// 背景动画函数
function animateBackground() {
    if (backgroundEffects) {
        const gradientBg = new SmoothGradientBackground(backgroundEffects);
        gradientBg.start();
    }
}

// 4. 初始化所有互动功能
function initInteractions() {
    // 为所有已存在的温馨提示添加拖拽功能
    document.querySelectorAll('.warm-tip').forEach(tip => {
        enableDragging(tip);
    });
    
    // 为新创建的温馨提示添加拖拽功能（修改createWarmTip函数）
    const originalCreateWarmTip = createWarmTip;
    createWarmTip = function(viewportWidth, viewportHeight) {
        const tip = originalCreateWarmTip(viewportWidth, viewportHeight);
        // 延迟添加拖拽功能，确保元素已添加到DOM
        setTimeout(() => {
            const latestTip = warmTipsContainer.lastElementChild;
            if (latestTip) {
                enableDragging(latestTip);
            }
        }, 0);
        return tip;
    };
    
    // 添加全局点击特效
    document.addEventListener('click', (e) => {
        // 排除按钮点击
        if (!e.target.closest('.start-button')) {
            addClickEffect(e.clientX, e.clientY);
        }
    });
    
    // 启动背景动画
    animateBackground();
}

// 添加点击粒子动画样式
const clickEffectStyle = document.createElement('style');
clickEffectStyle.textContent = `
    /* 点击效果容器样式 */
    .click-effect {
        position: fixed;
        pointer-events: none;
        z-index: 1000;
        width: 0;
        height: 0;
    }
    
    /* 爱心粒子动画 */
    @keyframes clickParticle {
        0% {
            transform: translate(-50%, -50%) scale(0);
            opacity: 1;
            filter: blur(0px);
        }
        20% {
            transform: translate(-50%, -50%) scale(1.2) rotate(0deg);
            opacity: 0.9;
        }
        60% {
            transform: translate(calc(-50% + var(--translate-x, 0) * 0.7), calc(-50% + var(--translate-y, 0) * 0.7)) 
                       scale(0.9) rotate(var(--rotate-degrees, 0deg));
            opacity: 0.6;
        }
        100% {
            transform: translate(calc(-50% + var(--translate-x, 0)), calc(-50% + var(--translate-y, 0))) 
                       scale(0.3) rotate(var(--rotate-degrees, 0deg) * 2);
            opacity: 0;
            filter: blur(2px);
        }
    }
`;
document.head.appendChild(clickEffectStyle);

// 在页面初始化时也初始化互动功能
window.addEventListener('DOMContentLoaded', () => {
    // 等待init函数执行完成
    setTimeout(initInteractions, 100);
});
