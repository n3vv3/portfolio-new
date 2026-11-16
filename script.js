document.querySelectorAll('.ui-toggle').forEach((button) => {
  button.addEventListener('click', () => {
    const enabled = document.body.classList.toggle('show-layout');
    document.querySelectorAll('.ui-toggle').forEach((toggle) => {
      toggle.setAttribute('aria-pressed', String(enabled));
      toggle.textContent = enabled ? 'Hide UI' : 'Show UI';
    });
  });
});

document.querySelectorAll('.case-nav a').forEach((link) => {
  link.addEventListener('click', () => {
    const target = document.querySelector(link.getAttribute('href'));
    if (target) target.classList.add('just-navigated');
  });
});

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
