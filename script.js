(() => {
  const body = document.body;
  const openBtn = document.getElementById('openBtn');
  const replayBtn = document.getElementById('replayBtn');
  const starsEl = document.getElementById('stars');
  const petalsEl = document.getElementById('petals');
  const flowers = document.querySelectorAll('.flower');

  let opened = false;
  let doneTimer = null;

  /* --- starfield --- */
  const stars = document.createDocumentFragment();
  for (let i = 0; i < 150; i += 1) {
    const star = document.createElement('span');
    const size = Math.random() < 0.82 ? 1 + Math.random() * 1.4 : 2 + Math.random() * 1.8;
    star.style.left = `${Math.random() * 100}%`;
    star.style.top = `${Math.random() * 56}%`;
    star.style.width = `${size}px`;
    star.style.height = `${size}px`;
    star.style.animationDuration = `${2.4 + Math.random() * 4.6}s`;
    star.style.animationDelay = `${-Math.random() * 6}s`;
    if (size > 2.6) star.classList.add('bright');
    if (i % 21 === 0) star.classList.add('flare');
    stars.appendChild(star);
  }
  starsEl.appendChild(stars);

  /* --- drifting rose petals --- */
  const petalFrag = document.createDocumentFragment();
  for (let i = 0; i < 14; i += 1) {
    const petal = document.createElement('span');
    const scale = 0.55 + Math.random() * 0.8;
    petal.style.left = `${4 + Math.random() * 92}%`;
    petal.style.transform = `scale(${scale})`;
    petal.style.setProperty('--dur', `${10 + Math.random() * 8}s`);
    petal.style.setProperty('--delay', `${3 + Math.random() * 8}s`);
    petal.style.setProperty('--drift', `${-50 + Math.random() * 100}px`);
    petal.style.setProperty('--spin', `${120 + Math.random() * 420}deg`);
    petalFrag.appendChild(petal);
  }
  petalsEl.appendChild(petalFrag);

  /* --- open / replay --- */
  function restartFlowers() {
    flowers.forEach((flower) => {
      flower.style.animation = 'none';
    });
    void openBtn.offsetWidth;
    flowers.forEach((flower) => {
      flower.style.animation = '';
    });
  }

  function bloom() {
    if (opened) return;
    opened = true;
    restartFlowers();
    body.classList.add('opened');
    openBtn.setAttribute('aria-expanded', 'true');
    openBtn.setAttribute('aria-label', 'Flowers opened');
    clearTimeout(doneTimer);
    doneTimer = setTimeout(() => body.classList.add('done'), 4400);
  }

  function reset() {
    clearTimeout(doneTimer);
    opened = false;
    body.classList.remove('opened', 'done', 'instant');
    openBtn.setAttribute('aria-expanded', 'false');
    openBtn.setAttribute('aria-label', 'Tap to open the flowers');
    // let the browser settle the closed state before replaying the animation
    requestAnimationFrame(() => {
      requestAnimationFrame(bloom);
    });
  }

  openBtn.addEventListener('click', bloom);
  replayBtn.addEventListener('click', reset);

  /* --- optional auto states for previewing / reduced motion --- */
  const params = new URLSearchParams(window.location.search);
  if (params.has('instant')) {
    body.classList.add('instant', 'opened', 'done');
    opened = true;
  } else if (params.has('auto')) {
    setTimeout(bloom, 450);
  }
})();
