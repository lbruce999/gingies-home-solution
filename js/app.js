(() => {
    const yearEl = document.getElementById('year');
    if (yearEl) yearEl.textContent = String(new Date().getFullYear());

    // Mobile nav toggle
    const navToggle = document.getElementById('navToggle');
    const navMenu = document.getElementById('navMenu');

    function closeNav() {
        if (!navMenu || !navToggle) return;
        navMenu.classList.remove('is-open');
        navToggle.setAttribute('aria-expanded', 'false');
    }

    function toggleNav() {
        if (!navMenu || !navToggle) return;
        const isOpen = navMenu.classList.toggle('is-open');
        navToggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    }

    if (navToggle && navMenu) {
        navToggle.addEventListener('click', toggleNav);

        // Close nav after clicking a link
        navMenu.addEventListener('click', (e) => {
            const target = e.target;
            if (target && target.tagName === 'A') closeNav();
        });

        // Close on Escape
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') closeNav();
        });

        // Close when clicking outside
        document.addEventListener('click', (e) => {
            if (!navMenu.classList.contains('is-open')) return;
            const t = e.target;
            if (!t) return;
            const clickedInsideMenu = navMenu.contains(t) || navToggle.contains(t);
            if (!clickedInsideMenu) closeNav();
        });
    }

    // Quote modal
    const modal = document.getElementById('quoteModal');
    const openButtons = [
        'quoteOpenBtn',
        'quoteOpenBtn2',
        'quoteOpenBtn3',
        'quoteOpenBtn4',
    ]
        .map((id) => document.getElementById(id))
        .filter(Boolean);

    function openModal() {
        if (!modal) return;
        modal.classList.add('is-open');
        modal.setAttribute('aria-hidden', 'false');
        document.body.style.overflow = 'hidden';
    }

    function closeModal() {
        if (!modal) return;
        modal.classList.remove('is-open');
        modal.setAttribute('aria-hidden', 'true');
        document.body.style.overflow = '';
    }

    openButtons.forEach((btn) => btn.addEventListener('click', openModal));

    if (modal) {
        modal.addEventListener('click', (e) => {
            const t = e.target;
            if (!t) return;
            if (t.dataset && t.dataset.close === 'true') closeModal();
        });

        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && modal.classList.contains('is-open')) closeModal();
        });
    }

    // Mock form handlers (prevent submit)
    const contactForm = document.getElementById('contactForm');
    const quoteForm = document.getElementById('quoteForm');

    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            alert("Mockup only — this form isn't wired yet.");
            contactForm.reset();
        });
    }

    if (quoteForm) {
        quoteForm.addEventListener('submit', (e) => {
            e.preventDefault();
            alert("Quote request saved (mock). We'll wire this up later.");
            quoteForm.reset();
            closeModal();
        });
    }
})();