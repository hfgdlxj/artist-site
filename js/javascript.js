function toggleMenu() {
  const menu = document.getElementById('menu');
  menu.classList.toggle('open');
}

/* ===== Hero 轮播（叠放淡入版） ===== */
const root = document.querySelector('.main-visual');
const images = Array.from(document.querySelectorAll('.main-visual-images img'));
const prevBtn = document.querySelector('.prev');
const nextBtn = document.querySelector('.next');

let index = 0;
let timer = null;
const INTERVAL = 5000; // 自动切换间隔（毫秒）

// 初始化：确保第一张是 active
images.forEach((img, i) => img.classList.toggle('active', i === 0));

function goTo(n){
  const prev = index;
  index = (n + images.length) % images.length;
  if (prev === index) return;
  images[prev].classList.remove('active');
  images[index].classList.add('active');
}

function nextSlide(){ goTo(index + 1); }
function prevSlide(){ goTo(index - 1); }

nextBtn?.addEventListener('click', nextSlide);
prevBtn?.addEventListener('click', prevSlide);

// 自动播放 + 悬停/触摸暂停
function start(){ if (!timer) timer = setInterval(nextSlide, INTERVAL); }
function stop(){ if (timer){ clearInterval(timer); timer = null; } }

root?.addEventListener('mouseenter', stop);
root?.addEventListener('mouseleave', start);
root?.addEventListener('touchstart', stop, { passive: true });
root?.addEventListener('touchend', start,   { passive: true });

// 标签页隐藏时暂停，返回继续
document.addEventListener('visibilitychange', () => {
  document.hidden ? stop() : start();
});

// 启动
start();
  // 自动轮播
  setInterval(nextSlide, 5000);

  // 初始位置
  window.addEventListener('load', updateSlide);
  window.addEventListener('resize', updateSlide); // 窗口大小变化时保持同步