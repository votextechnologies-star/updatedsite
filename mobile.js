/* Ballark Labs: hamburger menu (auto-builds from your existing header links) */
(function () {
  'use strict';

  var root = document.documentElement;

  function isOpen() { return root.classList.contains('bl-menu-open'); }

  function setOpen(open) {
    root.classList.toggle('bl-menu-open', open);
    var btn = document.querySelector('.bl-burger');
    var menu = document.getElementById('bl-menu');
    if (btn) {
      btn.setAttribute('aria-expanded', open ? 'true' : 'false');
      btn.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
    }
    if (menu) menu.setAttribute('aria-hidden', open ? 'false' : 'true');
  }

  function build() {
    var header = document.querySelector('.bl-header');
    if (!header) return;
    var right = header.querySelector('.bl-header-right');
    if (!right) return;

    // Burger button
    if (!right.querySelector('.bl-burger')) {
      var btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'bl-burger';
      btn.setAttribute('aria-label', 'Open menu');
      btn.setAttribute('aria-expanded', 'false');
      btn.setAttribute('aria-controls', 'bl-menu');
      btn.innerHTML = '<span></span><span></span><span></span>';
      right.appendChild(btn);
    }

    // Menu panel (rebuilt from the current page's links)
    var old = document.getElementById('bl-menu');
    if (old) old.remove();

    var links = header.querySelectorAll('.bl-nav a');
    var cta = header.querySelector('.bl-header-right > a.button');

    var menu = document.createElement('div');
    menu.id = 'bl-menu';
    menu.className = 'bl-menu';
    menu.setAttribute('aria-hidden', 'true');

    var nav = document.createElement('nav');
    nav.className = 'bl-menu__links';
    nav.setAttribute('aria-label', 'Mobile');

    Array.prototype.forEach.call(links, function (a, i) {
      var l = document.createElement('a');
      l.className = 'bl-menu__link';
      l.href = a.getAttribute('href');
      l.style.setProperty('--i', i);
      if (a.getAttribute('aria-current')) l.setAttribute('aria-current', a.getAttribute('aria-current'));
      var n = document.createElement('span');
      n.className = 'bl-menu__n';
      n.textContent = ('0' + (i + 1)).slice(-2);
      l.appendChild(n);
      l.appendChild(document.createTextNode(a.textContent.trim()));
      nav.appendChild(l);
    });

    var foot = document.createElement('div');
    foot.className = 'bl-menu__foot';

    var c = document.createElement('a');
    c.className = 'bl-menu__cta';
    c.href = cta ? cta.getAttribute('href') : '#contact';
    c.textContent = 'Start a project';

    var mail = document.createElement('a');
    mail.className = 'bl-menu__mail';
    mail.href = 'mailto:hello@ballarklabs.com';
    mail.textContent = 'hello@ballarklabs.com';

    foot.appendChild(c);
    foot.appendChild(mail);
    menu.appendChild(nav);
    menu.appendChild(foot);
    document.body.appendChild(menu);

    setOpen(false);
  }

  // Home hero on phones: the text block hangs below the first screen,
  // so reserve exactly its height as space under the hero.
  function syncHero() {
    var hb = document.querySelector('section.hero:not(.services-hero) > .bl-herobottom');
    if (!hb) return;
    var hero = hb.parentElement;
    var phone = window.matchMedia('(max-width: 700px)').matches;
    hero.style.marginBottom = phone ? hb.offsetHeight + 'px' : '';
  }
  function watchHero() {
    syncHero();
    var hb = document.querySelector('section.hero:not(.services-hero) > .bl-herobottom');
    if (hb && 'ResizeObserver' in window) new ResizeObserver(syncHero).observe(hb);
    if (document.fonts && document.fonts.ready) document.fonts.ready.then(syncHero);
  }

  // One-time global listeners
  if (!window.__blMenuBooted) {
    window.__blMenuBooted = true;

    document.addEventListener('click', function (e) {
      var t = e.target;
      if (!t || !t.closest) return;
      if (t.closest('.bl-burger')) { setOpen(!isOpen()); return; }
      if (t.closest('.bl-menu a')) setOpen(false); // close first, then the link scrolls
    });

    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && isOpen()) {
        setOpen(false);
        var b = document.querySelector('.bl-burger');
        if (b) b.focus();
      }
    });

    window.addEventListener('resize', function () {
      if (window.innerWidth > 900 && isOpen()) setOpen(false);
      syncHero();
    });

    // Astro view transitions
    document.addEventListener('astro:before-swap', function () { root.classList.remove('bl-menu-open'); });
    document.addEventListener('astro:page-load', function () { build(); watchHero(); });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function () { build(); watchHero(); });
  } else {
    build();
    watchHero();
  }
})();