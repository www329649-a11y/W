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
            startBtn.textContent = '开始';
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
