const canvas = document.querySelector("canvas");
const ctx = canvas.getContext('2d');

let mouseMoved = false;

const pointer = {
    x: .5 * window.innerWidth,
    y: .5 * window.innerHeight,
}
const params = {
    pointsNumber: 40,
    widthFactor: .3,
    mouseThreshold: .6,
    spring: .4,
    friction: .5
};

const trail = new Array(params.pointsNumber);
for (let i = 0; i < params.pointsNumber; i++) {
    trail[i] = {
        x: pointer.x,
        y: pointer.y,
        dx: 0,
        dy: 0,
    }
}

window.addEventListener("click", e => {
    updateMousePosition(e.pageX, e.pageY);
});
window.addEventListener("mousemove", e => {
    mouseMoved = true;
    updateMousePosition(e.pageX, e.pageY);
});
window.addEventListener("touchmove", e => {
    mouseMoved = true;
    updateMousePosition(e.targetTouches[0].pageX, e.targetTouches[0].pageY);
});

function updateMousePosition(eX, eY) {
    pointer.x = eX;
    pointer.y = eY;
}

setupCanvas();
update(0);
window.addEventListener("resize", setupCanvas);


function update(t) {

    if (!mouseMoved) {
        pointer.x = (.5 + .3 * Math.cos(.002 * t) * (Math.sin(.005 * t))) * window.innerWidth;
        pointer.y = (.5 + .2 * (Math.cos(.005 * t)) + .1 * Math.cos(.01 * t)) * window.innerHeight;
    }

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    trail.forEach((p, pIdx) => {
        const prev = pIdx === 0 ? pointer : trail[pIdx - 1];
        const spring = pIdx === 0 ? .4 * params.spring : params.spring;
        p.dx += (prev.x - p.x) * spring;
        p.dy += (prev.y - p.y) * spring;
        p.dx *= params.friction;
        p.dy *= params.friction;
        p.x += p.dx;
        p.y += p.dy;
    });

    ctx.lineCap = "round";
	 ctx.beginPath();
    ctx.moveTo(trail[0].x, trail[0].y);

    for (let i = 1; i < trail.length - 1; i++) {
        const xc = .5 * (trail[i].x + trail[i + 1].x);
        const yc = .5 * (trail[i].y + trail[i + 1].y);
        ctx.quadraticCurveTo(trail[i].x, trail[i].y, xc, yc);
        ctx.lineWidth = params.widthFactor * (params.pointsNumber - i);
        ctx.stroke();
    }
    ctx.lineTo(trail[trail.length - 1].x, trail[trail.length - 1].y);
    ctx.stroke();
    
    window.requestAnimationFrame(update);
}

function setupCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}
let timer;

// 將原有程式碼改為以下內容
document.addEventListener('DOMContentLoaded', function() {
    let timer;
    const hint = document.getElementById('scroll-hint');
  
    function checkScrollTop() {
      const isTop = window.scrollY === 0;
      const hint = document.getElementById('scroll-hint');
      const backToTop = document.querySelector('.back-to-top');
    
      // 控制下滑提示
      hint.classList.toggle('active', isTop);
    
      // 控制返回按鈕：頂部時隱藏，其他位置顯示
      backToTop.style.display = isTop ? 'none' : 'block';
  
      if (isTop) {
        // 直接顯示提示（移除 3 秒延遲）
        hint.classList.add('active');
      } else {
        hint.classList.remove('active');
        clearTimeout(timer);
      }
    }
  
    // 首次載入立即檢測
    checkScrollTop();
  
    // 滾動事件監聽（優化防抖）
    let isScrolling;
    window.addEventListener('scroll', () => {
      clearTimeout(isScrolling);
      isScrolling = setTimeout(checkScrollTop, 50);
    });
  });
  
  
