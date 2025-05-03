// js/common.js
document.addEventListener('DOMContentLoaded', function() {
  const backToTop = document.querySelector('.back-to-top');
  
  function checkScroll() {
    const isTop = window.scrollY === 0;
    backToTop.style.display = isTop ? 'none' : 'block';
  }
  
  window.addEventListener('scroll', () => {
    requestAnimationFrame(checkScroll);
  });
  
  checkScroll(); // 初始化檢測
});