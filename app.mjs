import { getCountdown } from './countdown.mjs';

const $ = (id) => document.getElementById(id);
const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
const announcer = $('announcer');
let preview = false;
let wasFinished = false;
let celebrationVisible = false;
let soundEnabled = false;
let audioContext;
let lastProgress = -1;
let shareTrigger;

const drawing = (body) => `<svg viewBox="0 0 430 290" xmlns="http://www.w3.org/2000/svg"><g stroke="#24231F" stroke-width="3.5" stroke-linecap="round" stroke-linejoin="round">${body}</g></svg>`;
const memes = [
  {
    title: 'Cuando le dicen a Adrián: «Una última reunión».',
    caption: 'Michael Scott expresa lo que todos estamos pensando. NO. POR FAVOR. NO.',
    image: './assets/michael-no.png',
    staticImage: './assets/michael-no.png',
    background: '#E8ECCC',
    art: drawing(`<path d="M49 242h327"/><path d="M112 240v-67h187v67" fill="#F7F3E9"/><path d="M100 173h213v11H100z" fill="#F25B32"/><path d="m174 123 12 48h74l11-48Z" fill="#D9EF73"/><path d="M217 144h9"/><path d="M135 171v-20h-18v14q0 6 10 6" fill="#F7F3E9"/><path d="M118 139q-7-9 1-15m12 15q-7-9 1-15" fill="none"/><path d="M212 121V96c0-16 26-16 26 0v25" fill="#F7F3E9"/><path d="M208 121h35"/><path d="M221 101v2m10-2v2m-11 9q5 4 10 0"/><path d="M302 54c27-28 59-3 48 19-6 13-17 19-19 33-14-9-25-14-30-28-17 1-18-21 1-24Z" fill="#F7F3E9" stroke-dasharray="6 6"/><path d="m318 64 5 4m10-9 5 4m-17 15q10 5 15-7" fill="none"/><path d="M270 101c16-1 22-7 26-18" stroke-dasharray="4 7" fill="none"/><path d="m80 68 5-10 5 10 10 5-10 5-5 10-5-10-10-5Z" fill="#F25B32"/><path d="m353 182 5-10 5 10 10 5-10 5-5 10-5-10-10-5Z" fill="#D9EF73"/><rect x="68" y="205" width="89" height="25" rx="3" fill="#F7F3E9" transform="rotate(-8 112 218)"/><text x="111" y="222" font-family="Arial,sans-serif" font-size="10" text-anchor="middle" stroke="none" fill="#24231F" font-weight="800" transform="rotate(-8 112 218)">CONECTANDO…</text>`),
  },
  {
    title: '«¿Tienes cinco minutitos?» Yo, a cuatro de ser libre:',
    caption: 'Stanley no necesita decir nada. Esa mirada ya presentó su renuncia.',
    image: './assets/stanley.gif',
    staticImage: './assets/stanley-still.gif',
    background: '#F5D7C7',
    art: drawing(`<path d="M60 242h310"/><path d="m155 206-27 35h124l-26-35" fill="#D9EF73"/><rect x="99" y="62" width="232" height="147" rx="10" fill="#24231F"/><rect x="110" y="73" width="210" height="119" rx="3" fill="#F7F3E9"/><path d="M160 113q55-39 110 0m-95 16q40-27 80 0m-64 17q24-15 48 0" fill="none"/><circle cx="215" cy="164" r="4" fill="#24231F"/><path d="m169 85 93 93" stroke="#F25B32" stroke-width="9"/><path d="M77 93 61 83m17-5-4-16m276 69 17-4m-21 21 15 9"/><rect x="249" y="218" width="122" height="32" rx="3" fill="#D9EF73" transform="rotate(-8 310 234)"/><text x="310" y="239" font-family="Arial,sans-serif" font-size="11" font-weight="800" text-anchor="middle" stroke="none" fill="#24231F" transform="rotate(-8 310 234)">SIN CONEXIÓN :)</text>`),
  },
  {
    title: 'Cuando por fin entregas el último pendiente.',
    caption: 'Un aplauso para Adrián. Y otro para el botón de cerrar sesión.',
    image: './assets/michael-clapping.gif',
    staticImage: './assets/michael-clapping-still.gif',
    background: '#E8E5DC',
    art: drawing(`<path d="m102 113 107-69 116 69v116H102Z" fill="#D9EF73"/><path d="M128 153V66h168v107" fill="#F7F3E9"/><path d="M152 90h74m-74 15h116m-116 15h92" fill="none"/><path d="M102 114 213 184 325 114v116H102Z" fill="#F25B32"/><path d="m102 230 79-66m144 66-78-66"/><path d="M174 138q12-8 24 0m23 0q12-8 24 0m-45 18q10 10 21 0" fill="none"/><path d="m338 61 5-13 6 13 13 6-13 5-6 13-5-13-13-5Z" fill="#D9EF73"/><path d="m80 166-17 5m20 10-11 11m271-7 18 4"/><path d="m61 78 19 7-7 19-10-11-14-3Z" fill="#F7F3E9"/><path d="m64 93-5 15"/>`),
  },
  {
    title: 'Adrián a las 18:30. Cualquier parecido es pura libertad.',
    caption: 'Se activa el modo Cafe Disco. Recursos Humanos ya no tiene jurisdicción.',
    image: './assets/michael-dance.gif',
    staticImage: './assets/michael-dance-still.gif',
    background: '#E6EACC',
    art: drawing(`<path d="M90 246h256"/><path d="M165 76h100v59c0 73-100 73-100 0Z" fill="#F7F3E9"/><path d="M169 113h92v22c0 66-92 66-92 0Z" fill="#F25B32"/><path d="M215 191v44m-29 9h58l-29-9Z" fill="#F7F3E9"/><path d="M165 87h-22c-33 0-23 67 32 67m90-67h22c33 0 23 67-32 67" fill="none"/><path d="M198 129v5m33-5v5m-29 14q13 13 26 0" fill="none"/><path d="m114 56 7-15 6 15 15 6-15 6-6 15-7-15-15-6Z" fill="#F25B32"/><path d="m310 143 6-14 6 14 14 6-14 6-6 14-6-14-14-6Z" fill="#F7F3E9"/><path d="m283 47 9 11m18 3 12-4M94 199l-12 9m25 1-2 16"/><path d="m319 206 11 10-5 15m-196-83-8 11" stroke="#F25B32"/><path d="m79 123 6 6m233-33 7 6" stroke="#24231F" stroke-width="7"/>`),
  },
];

let memeIndex = 0;
let memeHovered = false;
let memeFocused = false;
let memeTimeout;
let gifsPaused = motionQuery.matches;
function announce(message) { announcer.textContent = message; }
function renderMeme(manual = false) {
  const meme = memes[memeIndex];
  const image = new Image();
  image.alt = '';
  image.className = 'meme-image';
  image.src = gifsPaused ? meme.staticImage : meme.image;
  image.addEventListener('error', () => { $('meme-visual').innerHTML = meme.art; }, { once: true });
  $('meme-visual').replaceChildren(image);
  $('meme-visual').style.background = meme.background;
  $('meme-title').textContent = meme.title;
  $('meme-caption').textContent = meme.caption;
  $('meme-count').textContent = `${String(memeIndex + 1).padStart(2, '0')} / 04`;
  if (manual) announce(`Meme ${memeIndex + 1} de ${memes.length}. ${meme.title} ${meme.caption}`);
}
function updateGifButton() {
  $('gif-toggle').setAttribute('aria-pressed', String(gifsPaused));
  $('gif-toggle').textContent = gifsPaused ? 'Reproducir GIFs' : 'Pausar GIFs';
}
$('gif-toggle').addEventListener('click', () => {
  gifsPaused = !gifsPaused;
  updateGifButton();
  renderMeme();
  announce(gifsPaused ? 'GIFs en pausa. Se muestran imágenes estáticas.' : 'GIFs activados.');
});
function scheduleMeme() {
  window.clearTimeout(memeTimeout);
  if (memeHovered || memeFocused || document.hidden || motionQuery.matches) return;
  memeTimeout = window.setTimeout(() => {
    memeIndex = (memeIndex + 1) % memes.length;
    renderMeme();
    scheduleMeme();
  }, 9000);
}
function changeMeme(direction) {
  memeIndex = (memeIndex + direction + memes.length) % memes.length;
  renderMeme(true);
  scheduleMeme();
}
$('meme-previous').addEventListener('click', () => changeMeme(-1));
$('meme-next').addEventListener('click', () => changeMeme(1));
$('meme-section').addEventListener('mouseenter', () => { memeHovered = true; scheduleMeme(); });
$('meme-section').addEventListener('mouseleave', () => { memeHovered = false; scheduleMeme(); });
$('meme-section').addEventListener('focusin', () => { memeFocused = true; scheduleMeme(); });
$('meme-section').addEventListener('focusout', (event) => {
  if (!$('meme-section').contains(event.relatedTarget)) { memeFocused = false; scheduleMeme(); }
});

let confettiFrame;
function stopConfetti() {
  cancelAnimationFrame(confettiFrame);
  const canvas = $('confetti');
  canvas.getContext('2d')?.clearRect(0, 0, canvas.width, canvas.height);
}
function confetti() {
  stopConfetti();
  if (motionQuery.matches || document.hidden) return;
  const canvas = $('confetti');
  const context = canvas.getContext('2d');
  if (!context) return;
  const width = window.innerWidth;
  const height = window.innerHeight;
  const ratio = Math.min(window.devicePixelRatio || 1, 2);
  canvas.width = width * ratio;
  canvas.height = height * ratio;
  context.scale(ratio, ratio);
  const colors = ['#F25B32', '#D9EF73', '#24231F', '#F8B75E'];
  const particles = Array.from({ length: width < 600 ? 65 : 115 }, () => ({
    x: Math.random() * width, y: -30 - Math.random() * height * .6,
    speed: 110 + Math.random() * 170, drift: Math.random() * 100 - 50,
    size: 5 + Math.random() * 6, angle: Math.random() * Math.PI,
    color: colors[Math.floor(Math.random() * colors.length)],
  }));
  const start = performance.now();
  let last = start;
  function frame(now) {
    const elapsed = now - start;
    const delta = Math.min((now - last) / 1000, .05);
    last = now;
    context.clearRect(0, 0, width, height);
    context.globalAlpha = Math.min(1, (4200 - elapsed) / 700);
    for (const p of particles) {
      p.x += p.drift * delta; p.y += p.speed * delta; p.angle += delta * 2;
      context.save(); context.translate(p.x, p.y); context.rotate(p.angle);
      context.fillStyle = p.color; context.fillRect(-p.size / 2, -p.size / 2, p.size, p.size * .55); context.restore();
    }
    if (elapsed < 4200) confettiFrame = requestAnimationFrame(frame);
    else { context.clearRect(0, 0, width, height); context.globalAlpha = 1; }
  }
  confettiFrame = requestAnimationFrame(frame);
}

async function playSound() {
  if (!soundEnabled) return;
  try {
    const AudioContextClass = window.AudioContext || window.webkitAudioContext;
    if (!AudioContextClass) throw new Error('Audio unavailable');
    audioContext ||= new AudioContextClass();
    await audioContext.resume();
    const start = audioContext.currentTime;
    [523.25, 659.25, 783.99, 1046.5].forEach((frequency, i) => {
      const oscillator = audioContext.createOscillator();
      const gain = audioContext.createGain();
      oscillator.type = 'sine'; oscillator.frequency.value = frequency;
      oscillator.connect(gain); gain.connect(audioContext.destination);
      const at = start + i * .12;
      gain.gain.setValueAtTime(0, at);
      gain.gain.linearRampToValueAtTime(.08, at + .02);
      gain.gain.exponentialRampToValueAtTime(.001, at + .45);
      oscillator.start(at); oscillator.stop(at + .5);
    });
  } catch {
    soundEnabled = false;
    updateSoundButton();
    announce('El sonido no está disponible en este navegador. La celebración sigue.');
  }
}
function updateSoundButton() {
  $('sound-button').setAttribute('aria-pressed', String(soundEnabled));
  $('sound-button').innerHTML = `${soundEnabled ? 'Desactivar sonido' : 'Activar sonido'} <span aria-hidden="true">♫</span>`;
}
$('sound-button').addEventListener('click', () => {
  soundEnabled = !soundEnabled;
  updateSoundButton();
  if (soundEnabled) void playSound();
  else void audioContext?.suspend();
});
$('replay-button').addEventListener('click', () => { confetti(); void playSound(); announce('¡Otra ronda! Se celebra la libertad.'); });

function showCelebration(show, justExpired = false) {
  if (celebrationVisible === show) return;
  celebrationVisible = show;
  document.body.classList.toggle('is-celebrating', show);
  $('countdown-section').hidden = show;
  $('progress-section').hidden = show;
  $('celebration-section').hidden = !show;
  $('preview-section').hidden = show;
  if (show) {
    $('hero-heading').innerHTML = '¡ERES<br>LIBRE!';
    $('hero-eyebrow').textContent = 'ADRIÁN, MISIÓN CUMPLIDA.';
    $('hero-copy').textContent = 'Adrián, se acabó el «para ayer». Empieza el «¿y ahora qué quiero hacer?».';
    if (justExpired || preview) { confetti(); if (soundEnabled) void playSound(); }
    announce(preview ? 'Vista previa de la celebración. ¡Eres libre! Puedes volver al contador real.' : '¡Eres libre! La cuenta regresiva terminó. Se cerró la sesión, se abrió la vida.');
  } else {
    $('hero-heading').innerHTML = 'Tu próxima<br> reunión:<br> <span>ser libre.</span><svg class="title-spark" viewBox="0 0 80 80" aria-hidden="true"><path d="M40 3v74M3 40h74M14 14l52 52M14 66l52-52"/></svg>';
    $('hero-eyebrow').textContent = 'ADRIÁN, LA RECTA FINAL.';
    $('hero-copy').innerHTML = 'Adrián, ya casi puedes decir «lo vemos el lunes»<br class="desktop-break"> y no volver a verlo nunca más.';
    stopConfetti();
  }
}
function updateCountdown() {
  const countdown = getCountdown();
  for (const unit of ['days', 'hours', 'minutes', 'seconds']) $(unit).textContent = String(countdown[unit]).padStart(2, '0');
  const percent = Math.round(countdown.progress * 100);
  if (percent !== lastProgress) {
    $('progress-fill').style.width = `${percent}%`;
    document.querySelector('.progress-track').setAttribute('aria-valuenow', String(percent));
    lastProgress = percent;
  }
  // Once the deadline has passed, a later clock correction must not reopen the countdown.
  const justExpired = countdown.finished && !wasFinished;
  wasFinished ||= countdown.finished;
  showCelebration(preview || wasFinished, justExpired);
}
$('preview-button').addEventListener('click', () => {
  preview = true;
  $('preview-banner').hidden = false;
  updateCountdown();
  $('back-button').focus({ preventScroll: true });
  $('preview-banner').scrollIntoView({ behavior: motionQuery.matches ? 'instant' : 'smooth', block: 'start' });
});
$('back-button').addEventListener('click', () => {
  preview = false;
  $('preview-banner').hidden = true;
  updateCountdown();
  if (wasFinished) {
    $('replay-button').focus();
    announce('La cuenta regresiva real ya terminó. ¡Ahora sí eres libre!');
  } else {
    $('preview-button').focus();
    announce('De vuelta al contador real. La libertad sigue en camino.');
  }
});

async function share(event) {
  shareTrigger = event.currentTarget;
  const url = new URL(window.location.href);
  url.hash = ''; url.search = '';
  const label = document.querySelector('label[for="share-link"]');
  if (['localhost', '127.0.0.1', '::1', '[::1]'].includes(url.hostname) || url.protocol === 'file:') {
    const message = 'Esta es una vista local. Para compartirla con el grupo, primero hay que publicarla.';
    label.textContent = message;
    $('share-link').value = url.href;
    $('share-fallback').hidden = false;
    $('share-link').focus();
    $('share-link').select();
    announce(message);
    return;
  }
  label.textContent = 'Copia este enlace y recluta a la barra:';
  const shareData = { title: 'Operación Libertad — Adrián', text: 'La próxima reunión de Adrián: ser libre. Acompáñanos en la cuenta regresiva.', url: url.href };
  if (navigator.share) {
    try { await navigator.share(shareData); return; }
    catch (error) { if (error.name === 'AbortError') return; }
  }
  try {
    if (!navigator.clipboard?.writeText) throw new Error('Clipboard unavailable');
    await navigator.clipboard.writeText(url.href);
    announce('Enlace copiado. ¡Que se sume la barra!');
    const label = shareTrigger.querySelector('span');
    label.textContent = '¡Copiado!';
    window.setTimeout(() => { label.textContent = 'Compartir'; }, 2500);
  } catch {
    $('share-link').value = url.href;
    $('share-fallback').hidden = false;
    $('share-link').focus();
    $('share-link').select();
    announce('Selecciona y copia el enlace para compartir la cuenta regresiva.');
  }
}
document.querySelectorAll('.share-button').forEach((button) => button.addEventListener('click', share));
$('close-share').addEventListener('click', () => { $('share-fallback').hidden = true; shareTrigger?.focus(); });
document.addEventListener('visibilitychange', () => { updateCountdown(); scheduleMeme(); if (document.hidden) stopConfetti(); });
motionQuery.addEventListener('change', () => {
  scheduleMeme();
  gifsPaused = motionQuery.matches;
  updateGifButton(); renderMeme();
  if (motionQuery.matches) stopConfetti();
});
updateGifButton();
renderMeme();
scheduleMeme();
updateCountdown();
window.setInterval(updateCountdown, 1000);
