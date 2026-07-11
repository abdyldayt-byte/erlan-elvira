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

// Program timeline heart animation on scroll
function updateHeartPosition() {
  const heart = document.querySelector('.program-heart');
  const timeline = document.querySelector('.program-timeline-vertical');

  if (!heart || !timeline) return;

  const timelineRect = timeline.getBoundingClientRect();
  const timelineTop = timelineRect.top + window.scrollY;
  const timelineHeight = timelineRect.height;

  const scrollY = window.scrollY;
  const heartProgress = Math.max(0, Math.min(1, (scrollY - timelineTop) / timelineHeight));

  const heartTop = timelineTop + (heartProgress * timelineHeight);

  heart.style.top = heartTop + 'px';
  heart.style.opacity = heartProgress < 0.95 ? 1 : Math.max(0, 1 - (heartProgress - 0.95) / 0.05);
}

window.addEventListener('scroll', updateHeartPosition, { passive: true });
window.addEventListener('resize', updateHeartPosition);

// Initial position
updateHeartPosition();
