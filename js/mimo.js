// MiMo-style interactive effects for Leo's homepage
(function () {
  'use strict';

  // ========== Generate text pattern rows ==========
  function generatePattern(container, text, count, rows) {
    if (!container) return;
    for (let r = 0; r < rows; r++) {
      const row = document.createElement('div');
      row.className = r % 2 === 0 ? 'mimo-pattern-row' : 'mimo-pattern-row-inverted';
      // Use the correct class based on parent
      if (container.id === 'textPatternInverted') {
        row.className = 'mimo-pattern-row-inverted';
      } else {
        row.className = 'mimo-pattern-row';
      }
      for (let i = 0; i < count; i++) {
        const span = document.createElement('span');
        span.className = 'mimo-pattern-text';
        span.textContent = text;
        row.appendChild(span);
      }
      container.appendChild(row);
    }
  }

  const tp = document.getElementById('textPattern');
  const tpi = document.getElementById('textPatternInverted');
  generatePattern(tp, 'L E O', 20, 12);
  generatePattern(tpi, 'L E O', 20, 12);

  // ========== 3D Flip Card ==========
  const flipInner = document.getElementById('flipInner');
  const crackZone = document.getElementById('crackZone');
  const backClickZone = document.getElementById('backClickZone');
  let isFlipped = false;

  if (crackZone) {
    crackZone.addEventListener('click', function () {
      if (!isFlipped) {
        flipInner.style.transform = 'rotateX(180deg)';
        isFlipped = true;
      }
    });
  }

  if (backClickZone) {
    backClickZone.addEventListener('click', function () {
      if (isFlipped) {
        flipInner.style.transform = 'rotateX(0deg)';
        isFlipped = false;
      }
    });
  }

  // ========== Mouse-follow spotlight (clip-path) ==========
  const altLayer = document.getElementById('altLayer');
  const heroSection = document.querySelector('.mimo-flip-front');

  if (altLayer && heroSection) {
    heroSection.addEventListener('mousemove', function (e) {
      if (isFlipped) return;
      const rect = heroSection.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      altLayer.style.clipPath = 'circle(120px at ' + x + 'px ' + y + 'px)';
    });

    heroSection.addEventListener('mouseleave', function () {
      altLayer.style.clipPath = 'circle(0px at -300px -300px)';
    });

    // Touch support
    heroSection.addEventListener('touchmove', function (e) {
      if (isFlipped) return;
      const touch = e.touches[0];
      const rect = heroSection.getBoundingClientRect();
      const x = touch.clientX - rect.left;
      const y = touch.clientY - rect.top;
      altLayer.style.clipPath = 'circle(120px at ' + x + 'px ' + y + 'px)';
    });

    heroSection.addEventListener('touchend', function () {
      altLayer.style.clipPath = 'circle(0px at -300px -300px)';
    });
  }

  // ========== Scroll-triggered fade-in ==========
  const observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
      }
    });
  }, { threshold: 0.1 });

  document.querySelectorAll('.mimo-section, .mimo-showcase').forEach(function (el) {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
    observer.observe(el);
  });

})();
