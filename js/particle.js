// 在 js/script.js 中添加以下代碼
document.querySelector('.logo-hover').addEventListener('click', function(e) {
    // 觸發基礎縮放
    this.style.transform = 'scale(0.9)';
    setTimeout(() => this.style.transform = 'scale(1)', 100);
  
    // 生成粒子
    const particles = document.getElementById('particles');
    for (let i = 0; i < 12; i++) {
      const particle = document.createElement('div');
      particle.className = 'particle';
      
      // 計算隨機飛行方向
      const angle = (Math.PI * 2 * i) / 12;
      const distance = 100;
      const x = Math.cos(angle) * distance;
      const y = Math.sin(angle) * distance;
      
      particle.style.setProperty('--x', `${x}px`);
      particle.style.setProperty('--y', `${y}px`);
      
      // 定位粒子起始位置
      const rect = this.getBoundingClientRect();
      particle.style.left = `${rect.left + rect.width/2}px`;
      particle.style.top = `${rect.top + rect.height/2}px`;
      
      particles.appendChild(particle);
      
      // 自動移除粒子
      setTimeout(() => particle.remove(), 1000);
    }
    // 點擊時播放音效
const clickSound = new Audio('audio/soft-click.mp3');
document.querySelector('.logo-hover').addEventListener('click', () => {
  clickSound.currentTime = 0;
  clickSound.play();
});
  });