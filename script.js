(() => {
  const body = document.body;
  const openBtn = document.getElementById('openBtn');
  const replayBtn = document.getElementById('replayBtn');
  const petalsEl = document.getElementById('petals');

  let opened = false;
  let doneTimer = null;

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
  function bloom() {
    if (opened) return;
    opened = true;
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
