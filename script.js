// 获取DOM元素
const startBtn = document.getElementById('startBtn');
const particlesContainer = document.getElementById('particlesContainer');
const warmTipsContainer = document.getElementById('warmTipsContainer');
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
function showWarmTips(count = 50) {
    // 清除旧的提示窗口
    warmTipsContainer.innerHTML = '';
    
    // 获取视口尺寸
    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;
    
    // 创建多个提示窗口
    for (let i = 0; i < count; i++) {
        setTimeout(() => {
            createWarmTip(viewportWidth, viewportHeight);
        }, i * 5); // 间隔5ms创建一个窗口，模拟Python版本的快速弹出效果
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
        setTimeout(() => {
            tipElement.remove();
        }, 300);
    });
    
    // 自动消失（5-10秒后）
    setTimeout(() => {
        tipElement.style.opacity = '0';
        setTimeout(() => {
            tipElement.remove();
        }, 300);
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
        showWarmTips(50);
        
        // 5秒后恢复按钮状态
        setTimeout(() => {
            startBtn.disabled = false;
            startBtn.textContent = '开始';
        }, 5000);
    });
    
    // 窗口大小变化时重新初始化粒子效果
    window.addEventListener('resize', () => {
        if (isParticlesActive) {
            createParticles(true);
        }
    });
}



// 初始化函数
function init() {
    // 初始化事件监听器
    initEventListeners();
    
    // 默认打开粒子效果
    createParticles();
    
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
});