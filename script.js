// === Animated Background: Soft Floating Balloons ===
const canvas = document.getElementById('bg-canvas');
if (canvas) {
  const ctx = canvas.getContext('2d');
  let balloons = [];
  let w = window.innerWidth;
  let h = window.innerHeight;
  canvas.width = w;
  canvas.height = h;

  function randomPastel() {
    const colors = ['#e09ec3', '#a18cd1', '#f8f6fa', '#b5ead7', '#f7cac9', '#c7ceea'];
    return colors[Math.floor(Math.random() * colors.length)];
  }

  function Balloon() {
    this.x = Math.random() * w;
    this.y = h + 40 + Math.random() * 100;
    this.r = 28 + Math.random() * 22;
    this.color = randomPastel();
    this.speed = 0.7 + Math.random() * 0.7;
    this.drift = (Math.random() - 0.5) * 0.7;
    this.opacity = 0.7 + Math.random() * 0.3;
  }
  Balloon.prototype.draw = function() {
    ctx.save();
    ctx.globalAlpha = this.opacity;
    ctx.beginPath();
    ctx.ellipse(this.x, this.y, this.r * 0.8, this.r, 0, 0, 2 * Math.PI);
    ctx.fillStyle = this.color;
    ctx.fill();
    ctx.restore();
  };
  Balloon.prototype.update = function() {
    this.y -= this.speed;
    this.x += this.drift;
    if (this.y < -60) {
      this.x = Math.random() * w;
      this.y = h + 40 + Math.random() * 100;
      this.color = randomPastel();
      this.opacity = 0.7 + Math.random() * 0.3;
    }
    this.draw();
  };
  function animateBalloons() {
    ctx.clearRect(0, 0, w, h);
    for (let b of balloons) b.update();
    requestAnimationFrame(animateBalloons);
  }
  function resizeCanvas() {
    w = window.innerWidth;
    h = window.innerHeight;
    canvas.width = w;
    canvas.height = h;
    balloons = [];
    for (let i = 0; i < Math.max(18, Math.floor(w/80)); i++) {
      balloons.push(new Balloon());
    }
  }
  window.addEventListener('resize', resizeCanvas);
  resizeCanvas();
  animateBalloons();
}

// === Animate.css + GSAP Entrance Animations ===
window.addEventListener('DOMContentLoaded', () => {
  gsap.from('.headline', { duration: 1.2, y: -60, opacity: 0, ease: 'power2.out' });
  gsap.from('.sub-message', { duration: 1.2, y: 40, opacity: 0, delay: 0.3, ease: 'power2.out' });
  gsap.from('.jane-img-wrapper', { duration: 1.2, scale: 0.7, opacity: 0, delay: 0.6, ease: 'back.out(1.7)' });
});

// === Gallery Lightbox ===
const galleryItems = document.querySelectorAll('.gallery-item');
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightbox-img');
const lightboxVideo = document.getElementById('lightbox-video');
const closeBtn = document.querySelector('.lightbox .close');

galleryItems.forEach(item => {
  item.addEventListener('click', () => {
    const img = item.querySelector('img');
    const video = item.querySelector('video');
    if (item.classList.contains('video-thumb')) {
      lightboxImg.style.display = 'none';
      lightboxVideo.style.display = 'block';
      lightboxVideo.src = video.src;
      lightboxVideo.play();
    } else {
      lightboxImg.src = img.src;
      lightboxImg.style.display = 'block';
      lightboxVideo.style.display = 'none';
      lightboxVideo.pause();
    }
    lightbox.style.display = 'flex';
  });
});
if (closeBtn) {
  closeBtn.onclick = function() {
    lightbox.style.display = 'none';
    lightboxVideo.pause();
  };
}
window.onclick = function(event) {
  if (event.target === lightbox) {
    lightbox.style.display = 'none';
    lightboxVideo.pause();
  }
};

// === Music Toggle ===
const musicBtn = document.getElementById('music-toggle');
const bgMusic = document.getElementById('bg-music');
if (musicBtn && bgMusic) {
  let playing = false;
  musicBtn.addEventListener('click', () => {
    if (!playing) {
      bgMusic.play();
      musicBtn.innerHTML = '<i class="fas fa-music"></i> Pause Music';
    } else {
      bgMusic.pause();
      musicBtn.innerHTML = '<i class="fas fa-music"></i> Play Music';
    }
    playing = !playing;
  });
}

// === Fireworks/Sparkles Animation (Bottom) ===
const fireworksCanvas = document.getElementById('fireworks');
if (fireworksCanvas) {
  const ctx = fireworksCanvas.getContext('2d');
  let W = window.innerWidth;
  let H = 180;
  fireworksCanvas.width = W;
  fireworksCanvas.height = H;
  let particles = [];
  function randomColor() {
    const colors = ['#e09ec3', '#a18cd1', '#f7cac9', '#fff6fa', '#b5ead7'];
    return colors[Math.floor(Math.random() * colors.length)];
  }
  function Particle() {
    this.x = Math.random() * W;
    this.y = H;
    this.radius = 2 + Math.random() * 2;
    this.color = randomColor();
    this.speed = 2 + Math.random() * 2;
    this.angle = -Math.PI/2 + (Math.random() - 0.5) * Math.PI/2;
    this.alpha = 1;
  }
  Particle.prototype.draw = function() {
    ctx.save();
    ctx.globalAlpha = this.alpha;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
    ctx.fillStyle = this.color;
    ctx.fill();
    ctx.restore();
  };
  Particle.prototype.update = function() {
    this.x += Math.cos(this.angle) * this.speed;
    this.y += Math.sin(this.angle) * this.speed;
    this.alpha -= 0.012;
    this.draw();
  };
  function launchFirework() {
    for (let i = 0; i < 18; i++) {
      particles.push(new Particle());
    }
  }
  function animateFireworks() {
    ctx.clearRect(0, 0, W, H);
    particles = particles.filter(p => p.alpha > 0);
    for (let p of particles) p.update();
    requestAnimationFrame(animateFireworks);
  }
  setInterval(launchFirework, 1200);
  animateFireworks();
  window.addEventListener('resize', () => {
    W = window.innerWidth;
    fireworksCanvas.width = W;
  });
}

// === Animate Gallery Items on Scroll ===
function animateOnScroll() {
  const items = document.querySelectorAll('.gallery-item');
  const trigger = window.innerHeight * 0.9;
  items.forEach(item => {
    const rect = item.getBoundingClientRect();
    if (rect.top < trigger) {
      item.classList.add('animate__animated', 'animate__fadeInUp');
    }
  });
}
window.addEventListener('scroll', animateOnScroll);
window.addEventListener('DOMContentLoaded', animateOnScroll);

// === Sparkles on Hero Image ===
function createSparkle(x, y, parent) {
  const sparkle = document.createElement('div');
  sparkle.className = 'sparkle';
  sparkle.style.left = x + 'px';
  sparkle.style.top = y + 'px';
  parent.appendChild(sparkle);
  setTimeout(() => sparkle.remove(), 1200);
}
const heroImgWrapper = document.querySelector('.jane-img-wrapper');
if (heroImgWrapper) {
  setInterval(() => {
    const x = 40 + Math.random() * 140;
    const y = 40 + Math.random() * 140;
    createSparkle(x, y, heroImgWrapper);
  }, 700);
}

// === Birthday Video Function ===
function playBirthdayVideo() {
  const lightbox = document.getElementById('lightbox');
  const lightboxImg = document.getElementById('lightbox-img');
  const lightboxVideo = document.getElementById('lightbox-video');
  
  lightboxImg.style.display = 'none';
  lightboxVideo.style.display = 'block';
  lightboxVideo.src = '/Assets/Birthday song.mp4';
  lightboxVideo.play();
  lightbox.style.display = 'flex';
} 