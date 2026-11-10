
import { PERSON, RESULTS, REGIONAL_WINS, PHOTO, COURSES, COPY, EXPERIENCE, DIVISIONS, ABOUT_NAMES } from './content.js';
import { ACCENTS, contrast, onAccent } from './color.js';

const Q = new URLSearchParams(location.search);
const pick = (k, allowed, d) => (allowed.includes(Q.get(k)) ? Q.get(k) : d);
export const STATE = { look: 'a', record: true, accent: 'brass', flow: 'own', measure: false, phone: false, name: 'mission' };
const ABOUT = ABOUT_NAMES[STATE.name];
const KEEP = [];

const root = document.documentElement;
root.dataset.look = STATE.look;
root.dataset.accent = STATE.accent;
root.dataset.flow = STATE.flow;
if (STATE.record) root.dataset.record = 'hero';
if (STATE.measure) root.dataset.measure = '1';
if (STATE.phone) root.dataset.phone = '1';
root.style.setProperty('--accent', ACCENTS[STATE.accent].hex);
root.style.setProperty('--on-accent', onAccent(ACCENTS[STATE.accent].hex));

const esc = s => String(s).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
export function link(href, extra = {}) {
  const [path, hash] = href.split('#');
  const p = new URLSearchParams();
  for (const k of KEEP) if (Q.has(k)) p.set(k, Q.get(k));
  for (const [k, v] of Object.entries(extra)) p.set(k, v);
  const qs = p.toString();
  return path + (qs ? '?' + qs : '') + (hash ? '#' + hash : '');
}
const img = (key, cls = '') => {
  const p = PHOTO[key];
  return `<img class="${cls}" src="${p.src}" alt="${esc(p.alt)}" style="object-position:${p.pos}" decoding="async">`;
};
const courseById = id => COURSES.find(c => c.id === id) || COURSES[0];
const kicker = (n, t) => `<p class="kicker"><span class="kicker__n">${n}</span><span class="kicker__t">${esc(t)}</span></p>`;
const chev = '<svg class="chev" viewBox="0 0 24 48" aria-hidden="true"><path d="M3 2 L21 24 L3 46" fill="none" stroke="currentColor" stroke-width="1.5"/></svg>';

function signupBtn(course, session, label = 'Sign up', cls = 'btn btn--accent') {
  if (STATE.flow === 'own') {
    return `<a class="${cls}" href="${link('signup.html', { course: course.id, session: session.id })}">${label}</a>`;
  }
  const here = document.body.dataset.page === 'courses';
  if (STATE.flow === 'same' && !here) {
    return `<a class="${cls}" href="${link('courses.html#signup', { course: course.id, session: session.id })}">${label}</a>`;
  }
  return `<button class="${cls}" type="button" data-signup data-course="${course.id}" data-session="${session.id}">${label}</button>`;
}

const MENU = [
  ['courses.html', 'Courses', 'courses'],
  ['about.html', ABOUT.menu, 'about'],
];
function lockup() {
  return `<a class="lockup" href="${link('index.html')}" aria-label="Gordon Ye, home">
    <span class="lockup__small">Distinguished Master</span>
    <span class="lockup__name">Gordon Ye</span>
  </a>`;
}
function header() {
  const page = document.body.dataset.page;
  const item = (href, label, key) => `<a class="nav__a${page === key ? ' is-here' : ''}" href="${link(href)}"${page === key ? ' aria-current="page"' : ''}>${esc(label)}</a>`;
  const menu = () => MENU.map(([href, label, key]) => item(href, label, key)).join('');
  return `<header class="top">
    <div class="top__in">
      <div class="top__l">
        ${lockup()}
        <nav class="nav" aria-label="Main">${menu()}</nav>
      </div>
      <a class="btn btn--accent btn--sm top__cta" data-cta href="${link('courses.html#signup')}">Sign up</a>
      <button class="menu" type="button" aria-expanded="false" aria-controls="drawer" aria-label="Menu"><span></span><span></span></button>
    </div>
    <div class="drawer" id="drawer" hidden>
      ${menu()}
      <a class="btn btn--accent btn--wide" data-cta href="${link('courses.html#signup')}">Sign up for a class</a>
    </div>
  </header>`;
}
function footer() {
  return `<footer class="foot">
    <div class="foot__in">
      <div class="foot__col">
        <p class="foot__h">Gordon Ye</p>
        <p class="foot__p">${esc(PERSON.title)}. Practical pistol classes for every level.</p>
      </div>
      <div class="foot__col">
        <p class="foot__h">Pages</p>
        ${MENU.map(([href, label]) => `<a class="foot__a" href="${link(href)}">${esc(label)}</a>`).join('')}
      </div>
      <div class="foot__col">
        <p class="foot__h">Contact</p>
        <a class="foot__a" href="${PERSON.instagram}" target="_blank" rel="noopener">Instagram ${esc(PERSON.handle)}</a>
        <a class="foot__a" href="mailto:${PERSON.email}">${esc(PERSON.email)}</a>
        <p class="foot__p">${esc(PERSON.area)}</p>
      </div>
      <div class="foot__col">
        <p class="foot__h">Shoots with</p>
        ${PERSON.sponsors.map(s => `<p class="foot__p">${esc(s)}</p>`).join('')}
      </div>
    </div>
    <p class="foot__fine">&copy; 2026 Gordon Ye. Mock-up: words and dates are placeholders.</p>
  </footer>`;
}

function resultsList(cls = 'results') {
  return `<ol class="${cls}">
    ${RESULTS.map(r => `<li class="results__i">
      <span class="results__place">${r.place}</span>
      <span class="results__year">${r.year}</span>
      <span class="results__what">${esc(r.what)}<br><span class="results__div">${esc(r.div)}</span></span>
    </li>`).join('')}
    <li class="results__i">
      <span class="results__place">${REGIONAL_WINS}</span>
      <span class="results__year">Wins</span>
      <span class="results__what">Regional matches<br><span class="results__div">All divisions</span></span>
    </li>
  </ol>`;
}

function steps() {
  return `<section class="steps band">
    <div class="wrap">
      ${kicker('02', 'How Gordon teaches')}
      <div class="steps__row">
        ${COPY.steps.map((s, i) => `<div class="steps__i">
          <span class="steps__n">0${i + 1}</span>
          <h3 class="steps__t">${i ? chev : ''}<span class="steps__w">${esc(s.title)}</span></h3>
          <p class="steps__p">${esc(s.text)}</p>
        </div>`).join('')}
      </div>
    </div>
  </section>`;
}

function upcoming(limit = 3) {
  const rows = [];
  for (const c of COURSES) { const s = c.sessions.find(x => x.seats !== null); if (s) rows.push({ c, s }); }
  return rows.slice(0, limit);
}
function classCards(limit = 3) {
  return `<div class="cards">
    ${upcoming(limit).map(({ c, s }) => `<article class="card">
      <div class="card__media">${img(c.photo, 'card__img')}<span class="card__frame"><span class="card__label">${esc(c.short)}</span></span></div>
      <div class="card__body">
        <p class="card__date">${esc(s.date)} <span class="card__dot">&middot;</span> ${esc(s.place)}</p>
        <h3 class="card__t">${esc(c.title)}</h3>
        <p class="card__meta">${esc(c.length)} <span class="card__dot">&middot;</span> ${esc(c.level)} <span class="card__dot">&middot;</span> <span class="card__seats${s.seats <= 3 ? ' is-low' : ''}">${s.seats} seats left</span></p>
        ${signupBtn(c, s, 'Sign up')}
      </div>
    </article>`).join('')}
  </div>`;
}

function gallery() {
  const keys = ['podium', 'car', 'group', 'target', 'gear', 'walk'];
  const labels = ['Nationals 2026', 'Vehicle stage', 'Match day', 'Called shots', 'The kit', 'Stage walk'];
  return `<section class="gallery band">
    <div class="wrap">
      ${kicker('05', 'From the range')}
      <div class="tiles">
        ${keys.map((k, i) => `<a class="tile" href="${PERSON.instagram}" target="_blank" rel="noopener">${img(k, 'tile__img')}<span class="tile__frame"><span class="tile__label">${labels[i]}</span></span></a>`).join('')}
      </div>
      <a class="btn btn--ghost" href="${PERSON.instagram}" target="_blank" rel="noopener">More on Instagram</a>
    </div>
  </section>`;
}

function ctaBand() {
  return `<section class="cta band">
    ${img('range', 'cta__img')}
    <div class="wrap cta__in">
      <h2 class="cta__t" data-decode>Next class: ${esc(upcoming(1)[0].s.date)}</h2>
      <p class="cta__p">Small classes. Every shooter timed, filmed and coached.</p>
      <a class="btn btn--accent" href="${link('courses.html')}">See all courses</a>
    </div>
  </section>`;
}

function home() {
  return `
  <section class="hero">
    <div class="hero__media">${img('hero', 'hero__img')}</div>
    <div class="hero__in">
      <p class="hero__meta">${esc(PERSON.area)}</p>
      <div class="hero__text">
        <p class="hero__kicker">${esc(COPY.heroKicker)}</p>
        <h1 class="hero__h" data-decode>${esc(COPY.heroLine)}</h1>
        <p class="hero__sub">${esc(COPY.heroSub)}</p>
        ${resultsList('results hero__results')}
        <div class="hero__ctas">
          <a class="btn btn--accent" href="${link('courses.html')}">See courses</a>
          <a class="btn btn--ghost" href="${link('about.html')}">${esc(ABOUT.button)}</a>
        </div>
      </div>
    </div>
  </section>

  <section class="record record--home band">
    <div class="wrap">
      ${kicker('01', 'The record')}
      ${resultsList('results record__list')}
    </div>
  </section>

  ${steps()}

  <section class="upcoming band">
    <div class="wrap">
      ${kicker('03', 'Upcoming classes')}
      <h2 class="h2" data-decode>Training</h2>
      ${classCards(3)}
      <a class="btn btn--ghost" href="${link('courses.html')}">All courses</a>
    </div>
  </section>

  <section class="teaser band">
    <div class="wrap teaser__in">
      <div class="teaser__media">${img('podium', 'teaser__img')}</div>
      <div class="teaser__text">
        ${kicker('04', ABOUT.menu)}
        <h2 class="h2" data-decode>Who is Gordon Ye</h2>
        <p class="p">${esc(COPY.aboutShort)}</p>
        <a class="btn btn--ghost" href="${link('about.html')}">Read more</a>
      </div>
    </div>
  </section>

  ${gallery()}
  ${ctaBand()}`;
}

function about() {
  return `
  <section class="pagehead pagehead--about">
    <div class="pagehead__media">${img('podium', 'pagehead__img')}</div>
    <div class="wrap pagehead__in">
      <p class="hero__kicker">${STATE.name === 'about' ? esc(PERSON.title) : 'Gordon Ye'}</p>
      <h1 class="pagehead__h" data-decode>${STATE.name === 'about' ? 'Gordon Ye' : esc(ABOUT.menu)}</h1>
    </div>
  </section>

  <section class="mission band">
    <div class="wrap">
      ${kicker('01', 'Why Gordon teaches')}
      <h2 class="h2 h2--statement">${esc(COPY.mission.line)}</h2>
      <p class="p">${esc(COPY.mission.text)}</p>
    </div>
  </section>

  <section class="bio band">
    <div class="wrap bio__in">
      <div class="bio__text">
        ${kicker('02', 'Who he is')}
        ${COPY.bio.map(p => `<p class="p">${esc(p)}</p>`).join('')}
      </div>
      <div class="bio__media">${img('car', 'bio__img')}</div>
    </div>
  </section>

  <section class="record band">
    <div class="wrap">
      ${kicker('03', 'Results')}
      <table class="table">
        <thead><tr><th>Year</th><th>Match</th><th>Division</th><th>Place</th></tr></thead>
        <tbody>
          ${RESULTS.map(r => `<tr><td>${r.year}</td><td>${esc(r.what)}</td><td>${esc(r.div)}</td><td class="table__place">${r.place}${r.medal ? ` <span class="table__medal">${r.medal}</span>` : ''}</td></tr>`).join('')}
          <tr><td>2026</td><td>IDPA Nationals: The JP Experience side match</td><td>-</td><td class="table__place">Award</td></tr>
          <tr><td>Career</td><td>Regional match wins</td><td>-</td><td class="table__place">${REGIONAL_WINS}</td></tr>
        </tbody>
      </table>
      <p class="fine">Results from Gordon's Instagram bio and the 2026 Nationals plaque. The side-match line needs checking with him.</p>
    </div>
  </section>

  ${steps()}

  <section class="teaser band">
    <div class="wrap teaser__in">
      <div class="teaser__media">${img('gear', 'teaser__img')}</div>
      <div class="teaser__text">
        ${kicker('04', 'Shoots with')}
        <h2 class="h2">Sponsors and gear</h2>
        <p class="p">${PERSON.sponsors.map(esc).join(' and ')}. [Placeholder: the pistol, optic and holster he runs, and a line on why.]</p>
        <a class="btn btn--accent" href="${link('courses.html')}">Train with Gordon</a>
      </div>
    </div>
  </section>

  ${gallery()}`;
}

function coursesPage() {
  return `
  <section class="pagehead">
    <div class="pagehead__media">${img('group', 'pagehead__img')}</div>
    <div class="wrap pagehead__in">
      <p class="hero__kicker">Classes with Gordon Ye</p>
      <h1 class="pagehead__h" data-decode>Courses</h1>
    </div>
  </section>

  <section class="courses band">
    <div class="wrap">
      ${kicker('01', STATE.flow === 'same' ? 'Pick a course, then fill the form below' : 'Pick a course')}
      <div class="courselist">
        ${COURSES.map(c => `<article class="course" data-course-card="${c.id}">
          <div class="course__media">${img(c.photo, 'course__img')}</div>
          <div class="course__body">
            <p class="course__level">${esc(c.level)}</p>
            <h2 class="course__t">${esc(c.title)}</h2>
            <p class="course__p">${esc(c.blurb)}</p>
            <dl class="course__facts">
              <div><dt>Length</dt><dd>${esc(c.length)}</dd></div>
              <div><dt>Ammo</dt><dd>${esc(c.rounds)}</dd></div>
              <div><dt>Price</dt><dd>${esc(c.price)}</dd></div>
            </dl>
            <ul class="sessions">
              ${c.sessions.map(s => `<li class="session" data-session-row="${s.id}">
                <span class="session__date">${esc(s.date)}</span>
                <span class="session__place">${esc(s.place)}</span>
                <span class="session__seats${s.seats !== null && s.seats <= 3 ? ' is-low' : ''}">${s.seats === null ? 'Open' : s.seats + ' seats'}</span>
                ${signupBtn(c, s, c.id === 'private' ? 'Request' : 'Sign up', 'btn btn--accent btn--sm')}
              </li>`).join('')}
            </ul>
          </div>
        </article>`).join('')}
      </div>
    </div>
  </section>

  ${STATE.flow === 'same' ? `<section class="signup band" id="signup">
    <div class="wrap signup__in">
      ${kicker('02', 'Your details')}
      <h2 class="h2" data-decode>Sign up</h2>
      ${formHTML(Q.get('course'), Q.get('session'))}
    </div>
  </section>` : `<section class="signup-hint band" id="signup"><div class="wrap"><p class="p">${esc(COPY.signupNote)}</p></div></section>`}`;
}

function signupPage() {
  const c = courseById(Q.get('course'));
  return `
  <section class="event band">
    <div class="wrap event__in">
      <div class="event__media">${img(c.photo, 'event__img')}</div>
      <div class="event__text">
        <p class="chip">Taught by Gordon Ye</p>
        <h1 class="event__h">${esc(c.title)}</h1>
        <dl class="course__facts">
          <div><dt>Length</dt><dd>${esc(c.length)}</dd></div>
          <div><dt>Ammo</dt><dd>${esc(c.rounds)}</dd></div>
          <div><dt>Price</dt><dd>${esc(c.price)}</dd></div>
        </dl>
        <p class="p">${esc(c.blurb)}</p>
        <div class="event__form" id="signup">
          ${kicker('01', 'Sign up')}
          ${formHTML(c.id, Q.get('session'))}
          <a class="btn btn--ghost" href="${link('courses.html')}">Back to all courses</a>
        </div>
      </div>
    </div>
  </section>`;
}

function sessionOptions(course, sessionId) {
  return course.sessions.map(s => `<option value="${s.id}"${s.id === sessionId ? ' selected' : ''}>${esc(s.date)}${s.seats !== null ? ` (${s.seats} seats)` : ''}</option>`).join('');
}
function summary(course, sessionId) {
  const s = course.sessions.find(x => x.id === sessionId) || course.sessions[0];
  return `<span class="sum__t">${esc(course.title)}</span>
    <span class="sum__m">${esc(s.date)} &middot; ${esc(s.place)} &middot; ${esc(course.price)}</span>`;
}
function field(name, label, input, { req = true, hint = '' } = {}) {
  return `<label class="field" data-field="${name}">
    <span class="field__label">${label}${req ? ' <i class="req">*</i>' : ' <span class="opt">(optional)</span>'}</span>
    ${hint ? `<span class="field__hint">${hint}</span>` : ''}
    ${input}
    <span class="field__err" aria-live="polite"></span>
  </label>`;
}
export function formHTML(courseId, sessionId) {
  const c = courseById(courseId);
  const sid = (c.sessions.find(s => s.id === sessionId) || c.sessions[0]).id;
  return `<form class="form" novalidate>
    <p class="sum" data-summary>${summary(c, sid)}</p>
    <div class="form__grid">
      ${field('course', 'Course', `<select class="field__in" name="course">${COURSES.map(x => `<option value="${x.id}"${x.id === c.id ? ' selected' : ''}>${esc(x.title)}</option>`).join('')}</select>`)}
      ${field('session', 'Date', `<select class="field__in" name="session">${sessionOptions(c, sid)}</select>`)}
      ${field('name', 'Full name', '<input class="field__in" name="name" autocomplete="name">')}
      ${field('email', 'Email', '<input class="field__in" name="email" type="email" autocomplete="email" inputmode="email">')}
      ${field('phone', 'Phone', '<input class="field__in" name="phone" type="tel" autocomplete="tel" inputmode="tel">')}
      ${field('experience', 'Experience', `<select class="field__in" name="experience"><option value="">Choose one</option>${EXPERIENCE.map(e => `<option>${esc(e)}</option>`).join('')}</select>`)}
      ${field('division', 'What you shoot', `<select class="field__in" name="division">${DIVISIONS.map(e => `<option>${esc(e)}</option>`).join('')}</select>`, { req: false })}
      ${field('message', 'Anything Gordon should know', '<textarea class="field__in" name="message" rows="3"></textarea>', { req: false, hint: 'Goals, injuries, the gun and optic you will bring.' })}
    </div>
    <label class="check" data-field="age"><input type="checkbox" name="age"><span>I am 18 or older <i class="req">*</i></span><span class="field__err" aria-live="polite"></span></label>
    <button class="btn btn--accent btn--wide" type="submit">Send sign-up</button>
    <p class="fine">${esc(COPY.signupNote)}</p>
  </form>
  <div class="thanks" hidden tabindex="-1">
    <p class="thanks__mark" aria-hidden="true">&#10003;</p>
    <h3 class="thanks__t">You're on the list<span data-thanks-name></span>.</h3>
    <p class="p">${esc(COPY.thanks)} <span data-thanks-email></span></p>
    <p class="fine">Mock-up: nothing was sent anywhere.</p>
  </div>`;
}

function wireForm(scope) {
  const form = scope.querySelector('.form');
  if (!form || form.dataset.wired) return;
  form.dataset.wired = '1';
  const thanks = form.nextElementSibling;
  const course = form.elements.course, session = form.elements.session;
  const sum = form.querySelector('[data-summary]');
  const sync = () => {
    const c = courseById(course.value);
    sum.innerHTML = summary(c, session.value);
    markSelected(c.id, session.value);
  };
  course.addEventListener('change', () => { const c = courseById(course.value); session.innerHTML = sessionOptions(c, c.sessions[0].id); sync(); });
  session.addEventListener('change', sync);
  const setErr = (name, msg) => {
    const f = form.querySelector(`[data-field="${name}"]`);
    f.classList.toggle('is-bad', !!msg);
    f.querySelector('.field__err').textContent = msg || '';
  };
  form.addEventListener('submit', e => {
    e.preventDefault();
    const v = n => (form.elements[n].value || '').trim();
    const errs = {
      name: v('name') ? '' : 'Please enter your name.',
      email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v('email')) ? '' : 'Please enter an email Gordon can reply to.',
      phone: v('phone').replace(/\D/g, '').length >= 10 ? '' : 'Please enter a phone number with area code.',
      experience: v('experience') ? '' : 'Please choose one.',
      age: form.elements.age.checked ? '' : 'Classes are for adults only.',
    };
    for (const [k, m] of Object.entries(errs)) setErr(k, m);
    const bad = Object.keys(errs).find(k => errs[k]);
    if (bad) { form.elements[bad].focus(); return; }
    form.hidden = true;
    thanks.hidden = false;
    thanks.querySelector('[data-thanks-name]').textContent = ', ' + v('name').split(' ')[0];
    thanks.querySelector('[data-thanks-email]').textContent = '(' + v('email') + ')';
    thanks.focus();
  });
}

function markSelected(courseId, sessionId) {
  document.querySelectorAll('[data-course-card]').forEach(el => el.classList.toggle('is-picked', el.dataset.courseCard === courseId));
  document.querySelectorAll('[data-session-row]').forEach(el => el.classList.toggle('is-picked', el.dataset.sessionRow === sessionId));
}

let dlg = null;
function openDialog(courseId, sessionId) {
  if (!dlg) {
    dlg = document.createElement('dialog');
    dlg.className = 'dlg';
    document.body.appendChild(dlg);
    dlg.addEventListener('click', e => { if (e.target === dlg) dlg.close(); });
  }
  dlg.innerHTML = `<div class="dlg__in">
    <button class="dlg__x" type="button" aria-label="Close">&times;</button>
    ${kicker('', 'Sign up')}
    ${formHTML(courseId, sessionId)}
  </div>`;
  dlg.querySelector('.dlg__x').addEventListener('click', () => dlg.close());
  wrapButtonWords(dlg);
  wireForm(dlg);
  dlg.showModal();
  markSelected(courseId, sessionId);
}

const GLYPHS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789#%&*+=-';
function decode(el) {
  const final = el.textContent;
  const total = 14;
  let step = 0;
  el.setAttribute('aria-label', final);
  const t = setInterval(() => {
    step++;
    const upto = Math.floor((step / total) * final.length);
    el.textContent = [...final].map((ch, i) => (i < upto || ch === ' ' ? ch : GLYPHS[(Math.random() * GLYPHS.length) | 0])).join('');
    if (step >= total) { clearInterval(t); el.textContent = final; }
  }, 45);
}

const PAGES = { home, about, courses: coursesPage, signup: signupPage };
document.title = { home: 'Gordon Ye - Pistol training', about: `${ABOUT.menu} - Gordon Ye`, courses: 'Courses - Gordon Ye', signup: 'Sign up - Gordon Ye' }[document.body.dataset.page] || 'Gordon Ye';
document.body.innerHTML = header() + `<main class="main">${(PAGES[document.body.dataset.page] || home)()}</main>` + footer();

function wrapButtonWords(scope) {
  for (const b of scope.querySelectorAll('.btn')) {
    if (b.querySelector('.btn__t')) continue;
    const s = document.createElement('span');
    s.className = 'btn__t';
    s.append(...b.childNodes);
    b.append(s);
  }
}
wrapButtonWords(document);
document.querySelectorAll('.form').forEach(f => wireForm(f.parentElement));
document.addEventListener('click', e => {
  const b = e.target.closest('[data-signup]');
  if (!b) return;
  if (STATE.flow === 'popup') return openDialog(b.dataset.course, b.dataset.session);
  const form = document.querySelector('.signup .form');
  if (!form) return;
  form.hidden = false; form.nextElementSibling.hidden = true;
  form.elements.course.value = b.dataset.course;
  const c = courseById(b.dataset.course);
  form.elements.session.innerHTML = sessionOptions(c, b.dataset.session);
  form.querySelector('[data-summary]').innerHTML = summary(c, b.dataset.session);
  markSelected(c.id, b.dataset.session);
  document.getElementById('signup').scrollIntoView({ behavior: STATE.measure ? 'instant' : 'smooth', block: 'start' });
  setTimeout(() => form.elements.name.focus({ preventScroll: true }), STATE.measure ? 0 : 400);
});

if (STATE.flow === 'popup') {
  document.querySelectorAll('[data-cta]').forEach(a => {
    a.addEventListener('click', e => {
      e.preventDefault();
      if (!drawer.hidden) menu.click();
      const c = COURSES[0];
      openDialog(c.id, c.sessions[0].id);
    });
  });
}

if (Q.get('course')) markSelected(Q.get('course'), Q.get('session') || courseById(Q.get('course')).sessions[0].id);
if (location.hash === '#signup' && document.getElementById('signup')) {
  setTimeout(() => document.getElementById('signup').scrollIntoView({ behavior: 'instant', block: 'start' }), 0);
}

const menu = document.querySelector('.menu'), drawer = document.getElementById('drawer');
menu.addEventListener('click', () => {
  const open = menu.getAttribute('aria-expanded') !== 'true';
  menu.setAttribute('aria-expanded', String(open));
  drawer.hidden = !open;
  document.body.classList.toggle('is-menu', open);
});


const top = document.querySelector('.top');
const onScroll = () => top.classList.toggle('is-solid', scrollY > 40);
addEventListener('scroll', onScroll, { passive: true });
onScroll();

if (STATE.look === 'a' && !STATE.measure && !matchMedia('(prefers-reduced-motion: reduce)').matches) {
  document.querySelectorAll('[data-decode]').forEach(decode);
}

const OPTICAL = '.lockup__name, .lockup__small, .hero__kicker, .hero__h, .hero__sub, .hero__meta, .results__place, .results__year, .kicker__t, .h2, .p, .steps__w, .card__date, .card__t, .pagehead__h, .course__level, .course__t, .course__p, .event__h, .sum__t, .thanks__t, .table__place, .cta__t, .foot__h, .foot__p, .foot__fine, .field__label, .course__facts dt, .course__facts dd';
const octx = document.createElement('canvas').getContext('2d');
function lineEnds(el, up) {
  const rg = document.createRange(), lines = [];
  const walk = document.createTreeWalker(el, NodeFilter.SHOW_TEXT);
  for (let t = walk.nextNode(); t; t = walk.nextNode()) {
    const cs = getComputedStyle(t.parentElement);
    octx.font = `${cs.fontStyle} ${cs.fontWeight} ${cs.fontSize} ${cs.fontFamily}`;
    const ls = parseFloat(cs.letterSpacing) || 0;
    for (let i = 0; i < t.data.length; i++) {
      if (/\s/.test(t.data[i])) continue;
      rg.setStart(t, i); rg.setEnd(t, i + 1);
      const rc = rg.getClientRects()[0];
      if (!rc || !rc.width) continue;
      const m = octx.measureText(up(t.data[i]));
      let L = lines.find(l => Math.abs(l.top - rc.top) < rc.height / 2);
      if (!L) { L = { top: rc.top, first: null, last: null }; lines.push(L); }
      if (!L.first || rc.left < L.first.x) L.first = { x: rc.left, lead: -m.actualBoundingBoxLeft };
      if (!L.last || rc.right > L.last.x) L.last = { x: rc.right, tail: m.width - m.actualBoundingBoxRight + ls };
    }
  }
  return lines.sort((a, b) => a.top - b.top);
}
function optical() {
  for (const el of document.querySelectorAll(OPTICAL)) el.style.removeProperty('translate');
  for (const el of document.querySelectorAll(OPTICAL)) {
    if (!el.getClientRects().length) continue;
    const cs = getComputedStyle(el);
    const up = cs.textTransform === 'uppercase' ? s => s.toUpperCase() : s => s;
    const lines = lineEnds(el, up);
    if (!lines.length) continue;
    const al = cs.textAlign;
    const dx = al === 'right' || al === 'end' ? Math.min(...lines.map(l => l.last.tail))
      : al === 'center' ? (lines[0].last.tail - lines[0].first.lead) / 2
      : -Math.min(...lines.map(l => l.first.lead));
    if (Math.abs(dx) > 0.05) el.style.translate = `${dx.toFixed(2)}px 0`;
  }
  root.dataset.optical = '1';
}
document.fonts.ready.then(optical);
addEventListener('resize', optical);
if (STATE.look === 'a' && !STATE.measure) setTimeout(optical, 800);

