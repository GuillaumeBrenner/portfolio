document.getElementById('year').textContent = new Date().getFullYear();

/* ---------- i18n ---------- */
const i18nEls = Array.from(document.querySelectorAll('[data-en]'));
i18nEls.forEach(el => { el.dataset.fr = el.innerHTML; });

const titleEl = document.querySelector('title');
titleEl.dataset.fr = titleEl.textContent;

const btnFr = document.getElementById('btnFr');
const btnEn = document.getElementById('btnEn');

function setLang(lang){
  const key = lang === 'en' ? 'en' : 'fr';
  i18nEls.forEach(el => { el.innerHTML = el.dataset[key]; });
  titleEl.textContent = lang === 'en' ? titleEl.dataset.en : titleEl.dataset.fr;
  document.documentElement.lang = lang;

  const isEn = lang === 'en';
  btnEn.classList.toggle('active', isEn);
  btnFr.classList.toggle('active', !isEn);
  btnEn.setAttribute('aria-pressed', isEn);
  btnFr.setAttribute('aria-pressed', !isEn);
  document.getElementById('toTop').setAttribute('aria-label', isEn ? 'Back to top' : 'Retour en haut');
}

btnFr.addEventListener('click', () => setLang('fr'));
btnEn.addEventListener('click', () => setLang('en'));

/* ---------- Menu mobile ---------- */
const menuBtn = document.getElementById('menuBtn');
const navLinks = document.getElementById('navLinks');
const menuLabel = () => document.documentElement.lang === 'en'
  ? { open:'close', closed:'menu' } : { open:'fermer', closed:'menu' };
menuBtn.addEventListener('click', () => {
  const open = navLinks.classList.toggle('open');
  menuBtn.setAttribute('aria-expanded', open);
  menuBtn.textContent = open ? menuLabel().open : menuLabel().closed;
});
navLinks.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
  navLinks.classList.remove('open');
  menuBtn.setAttribute('aria-expanded', 'false');
  menuBtn.textContent = menuLabel().closed;
}));

/* ---------- Bordure header au scroll + bouton retour en haut ---------- */
const header = document.getElementById('header');
const toTop = document.getElementById('toTop');
const onScroll = () => {
  header.classList.toggle('scrolled', window.scrollY > 8);
  toTop.classList.toggle('show', window.scrollY > 400);
};
onScroll();
window.addEventListener('scroll', onScroll, { passive:true });

toTop.addEventListener('click', () => {
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  window.scrollTo({ top:0, behavior: reduce ? 'auto' : 'smooth' });
});

/* ---------- Révélation au scroll ---------- */
const io = new IntersectionObserver((entries) => {
  entries.forEach(e => { if (e.isIntersecting){ e.target.classList.add('in'); io.unobserve(e.target); } });
}, { threshold:0.12 });
document.querySelectorAll('.reveal').forEach(el => io.observe(el));

/* ---------- Carrousels projets ---------- */
document.querySelectorAll('[data-carousel]').forEach(function(car){
  var track = car.querySelector('.carousel-track');
  var slides = Array.prototype.slice.call(track.children);
  if (slides.length <= 1) { var a=car.querySelectorAll('.carousel-arrow'); a.forEach(function(b){b.style.display='none';}); }
  var dotsWrap = car.querySelector('.carousel-dots');
  var prev = car.querySelector('.carousel-arrow.prev');
  var next = car.querySelector('.carousel-arrow.next');
  var index = 0;

  slides.forEach(function(_, i){
    var d = document.createElement('button');
    d.type = 'button';
    d.setAttribute('aria-label', 'Image ' + (i+1));
    d.addEventListener('click', function(){ go(i); });
    dotsWrap.appendChild(d);
  });
  var dots = Array.prototype.slice.call(dotsWrap.children);

  function update(){
    track.style.transform = 'translateX(' + (-index*100) + '%)';
    dots.forEach(function(d, i){ d.classList.toggle('active', i === index); });
  }
  function go(i){ index = (i + slides.length) % slides.length; update(); }

  if (prev) prev.addEventListener('click', function(){ go(index-1); });
  if (next) next.addEventListener('click', function(){ go(index+1); });

  // Glissement tactile / souris
  var x0 = null;
  car.addEventListener('pointerdown', function(e){ x0 = e.clientX; });
  car.addEventListener('pointerup', function(e){
    if (x0 === null) return;
    var dx = e.clientX - x0; x0 = null;
    if (Math.abs(dx) > 40) go(index + (dx < 0 ? 1 : -1));
  });

  // Clavier
  car.setAttribute('tabindex', '0');
  car.addEventListener('keydown', function(e){
    if (e.key === 'ArrowLeft')  go(index-1);
    if (e.key === 'ArrowRight') go(index+1);
  });

  update();
});
