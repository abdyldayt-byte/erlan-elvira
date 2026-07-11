// Opening card
const cover = document.getElementById('cover');

function openInvitation() {
  if (cover.classList.contains('cover--hidden')) return;
  cover.classList.add('cover--hidden');
  document.documentElement.classList.remove('locked');
  document.body.classList.remove('no-scroll');
  document.querySelector('.hero').classList.add('visible');

  setTimeout(() => {
    cover.remove();
  }, 950);
}

cover.addEventListener('click', openInvitation);
cover.addEventListener('keydown', (e) => {
  if (e.key === 'Enter' || e.key === ' ') {
    e.preventDefault();
    openInvitation();
  }
});

// Countdown
const weddingDate = new Date('2026-08-16T16:00:00');

function updateCountdown() {
  const now = new Date();
  const diff = weddingDate - now;

  const els = {
    days: document.getElementById('cd-days'),
    hours: document.getElementById('cd-hours'),
    minutes: document.getElementById('cd-minutes'),
    seconds: document.getElementById('cd-seconds'),
  };

  if (diff <= 0) {
    els.days.textContent = '00';
    els.hours.textContent = '00';
    els.minutes.textContent = '00';
    els.seconds.textContent = '00';
    return;
  }

  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((diff / (1000 * 60)) % 60);
  const seconds = Math.floor((diff / 1000) % 60);

  els.days.textContent = String(days).padStart(2, '0');
  els.hours.textContent = String(hours).padStart(2, '0');
  els.minutes.textContent = String(minutes).padStart(2, '0');
  els.seconds.textContent = String(seconds).padStart(2, '0');
}

updateCountdown();
setInterval(updateCountdown, 1000);

// Reveal on scroll
const revealEls = document.querySelectorAll('.reveal');
const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.15 });

revealEls.forEach((el) => observer.observe(el));
observer.unobserve(document.querySelector('.hero'));

// Program timeline: heart rides exactly along the wavy SVG path as the user scrolls
const programPath = document.getElementById('programPath');
const programHeart = document.getElementById('programHeart');
const programTimeline = document.querySelector('.program-timeline-vertical');

if (programPath && programHeart && programTimeline) {
  const pathLength = programPath.getTotalLength();

  const updateHeartOnPath = () => {
    const rect = programTimeline.getBoundingClientRect();
    const timelineTop = rect.top + window.scrollY;
    const centerOffset = window.innerHeight / 2;
    const adjustedTimelineTop = timelineTop - centerOffset;
    const progress = Math.max(0, Math.min(1, (window.scrollY - adjustedTimelineTop) / rect.height));

    const point = programPath.getPointAtLength(progress * pathLength);
    const scale = rect.width / 340; // viewBox width -> rendered width

    programHeart.style.left = (point.x * scale) + 'px';
    programHeart.style.top = (point.y * scale) + 'px';
  };

  window.addEventListener('scroll', updateHeartOnPath, { passive: true });
  window.addEventListener('resize', updateHeartOnPath);
  updateHeartOnPath();
}
