document.querySelectorAll('.case-nav a').forEach((link) => {
  link.addEventListener('click', () => {
    const target = document.querySelector(link.getAttribute('href'));
    if (target) target.classList.add('just-navigated');
  });
});

const caseMediaFigures = [...document.querySelectorAll('.case-page .media-figure')]
  .filter((figure) => figure.querySelector('.project-image'));
const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

if (caseMediaFigures.length && 'IntersectionObserver' in window && !reduceMotion) {
  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add('is-visible');
      observer.unobserve(entry.target);
    });
  }, {
    threshold: 0.08,
    rootMargin: '0px 0px -4% 0px'
  });

  caseMediaFigures.forEach((figure) => {
    figure.classList.add('reveal-on-scroll');
    revealObserver.observe(figure);
  });
}

document.querySelectorAll('.desktop-wireframe').forEach((frame) => {
  const video = frame.querySelector('video');
  if (!video) return;

  const showControls = () => { video.controls = true; };
  const hideControls = () => {
    if (!frame.matches(':focus-within')) video.controls = false;
  };

  frame.addEventListener('pointerenter', showControls);
  frame.addEventListener('pointerleave', (event) => {
    if (event.pointerType !== 'touch') hideControls();
  });
  frame.addEventListener('focusin', showControls);
  frame.addEventListener('focusout', () => requestAnimationFrame(() => {
    if (!frame.matches(':hover')) hideControls();
  }));

  video.play().catch(showControls);
});
