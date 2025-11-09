const hambtn = document.getElementById('hambtn');
    const sidemenu = document.getElementById('sidemenu');
    const menuClose = document.getElementById('menuClose');
    const backdrop = document.getElementById('backdrop');
    const menuLinks = document.querySelectorAll('.menu-link');
    const desktopLinks = document.querySelectorAll('.toplinks a');
    document.getElementById('yearFooter').textContent = new Date().getFullYear();
    document.getElementById('yearSmall').textContent = new Date().getFullYear();

    function openMenu(){
      sidemenu.classList.add('open');
      sidemenu.setAttribute('aria-hidden','false');
      hambtn.setAttribute('aria-expanded','true');
      backdrop.classList.add('show');
      backdrop.setAttribute('aria-hidden','false');
 
      const first = sidemenu.querySelector('.menu-link');
      if(first) first.focus();
    }

    function closeMenu(){
      sidemenu.classList.remove('open');
      sidemenu.setAttribute('aria-hidden','true');
      hambtn.setAttribute('aria-expanded','false');
      backdrop.classList.remove('show');
      backdrop.setAttribute('aria-hidden','true');
      hambtn.focus();
    }

    hambtn && hambtn.addEventListener('click', openMenu);
    menuClose && menuClose.addEventListener('click', closeMenu);
    backdrop && backdrop.addEventListener('click', closeMenu);

    menuLinks.forEach(a => {
      a.addEventListener('click', (e) => {
        // If anchor points to in-page anchor, let browser scroll; if external, it opens in new tab (we used target/_blank)
        closeMenu();
        // small delay to allow smooth scroll to anchor on mobile
        // (no setTimeout required — scroll-behavior handles it)
      });
    });

    // Desktop links: if they are in-page anchors, we want same smooth scroll behaviour (native handled)
    desktopLinks.forEach(a=>{
      a.addEventListener('click', ()=> {
        // no menu to close on desktop, but keep consistent
      });
    });

    // close on Escape key
    document.addEventListener('keydown', (e) => {
      if(e.key === 'Escape' && sidemenu.classList.contains('open')){
        closeMenu();
      }
    });

    // Optional: close menu when focus leaves it (for mobile accessibility)
    sidemenu.addEventListener('focusout', (ev) => {
      // if the new focused element is outside sidemenu, close after tiny delay
      setTimeout(()=> {
        if(!sidemenu.contains(document.activeElement) && sidemenu.classList.contains('open')){
          // keep menu open if focus moves to backdrop (click)
          if(document.activeElement !== backdrop) closeMenu();
        }
      }, 120);
    });

    // Enhance anchor click behavior: for in-page links, ensure we don't open a new tab accidentally
    document.querySelectorAll('a[href^="#"]').forEach(a=>{
      a.addEventListener('click', (e) => {
        // let native smooth scroll happen (CSS scroll-behavior)
        // close sidemenu if open
        if(sidemenu.classList.contains('open')) closeMenu();
      });
    });

    // Accessibility: prevent body scroll when menu open (simple)
    const observer = new MutationObserver(()=>{
      if(sidemenu.classList.contains('open')){
        document.documentElement.style.overflow = 'hidden';
      } else {
        document.documentElement.style.overflow = '';
      }
    });
    observer.observe(sidemenu, { attributes: true, attributeFilter: ['class'] });