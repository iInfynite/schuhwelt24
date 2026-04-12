document.addEventListener('DOMContentLoaded', () => {
    // 1. Page Loader
    const loader = document.querySelector('.loader-container');
    setTimeout(() => {
        loader.style.opacity = '0';
        setTimeout(() => {
            loader.style.display = 'none';
            // Trigger Hinglish Popup after loader
            showHinglishPopup();
        }, 500);
    }, 1500);

    // 2. Mobile Menu (Hamburger)
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    const closeMenu = document.querySelector('.close-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    hamburger.addEventListener('click', () => {
        navMenu.classList.add('active');
    });

    closeMenu.addEventListener('click', () => {
        navMenu.classList.remove('active');
    });

    // Close menu when clicking a link
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
        });
    });

    // 3. FAQ Accordion
    const faqItems = document.querySelectorAll('.faq-item');
    faqItems.forEach(item => {
        item.addEventListener('click', () => {
            // Close others
            faqItems.forEach(otherItem => {
                if (otherItem !== item) {
                    otherItem.classList.remove('active');
                }
            });
            // Toggle current
            item.classList.toggle('active');
        });
    });

    // 4. Modals (Impressum, Privacy, Terms, Return)
    const openModal = (linkId, modalId) => {
        const link = document.getElementById(linkId);
        const modal = document.getElementById(modalId);
        if (link && modal) {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                modal.classList.add('show');
            });
        }
    };

    openModal('impressum-link', 'impressum-popup');
    openModal('privacy-link', 'privacy-popup');
    openModal('terms-link', 'terms-popup');
    openModal('return-link', 'return-popup-modal');
    openModal('return-link-nav', 'return-popup-modal');

    // Close Modals
    const closeButtons = document.querySelectorAll('.close-modal');
    closeButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            const modal = btn.closest('.modal');
            modal.classList.remove('show');
        });
    });

    // Close modal on outside click
    window.addEventListener('click', (e) => {
        if (e.target.classList.contains('modal')) {
            e.target.classList.remove('show');
        }
    });

    // 5. Cookie Consent
    const cookiePopup = document.getElementById('cookie-popup');
    const acceptBtn = document.getElementById('accept-cookies');
    const rejectBtn = document.getElementById('reject-cookies');

    if (!localStorage.getItem('cookiesAccepted')) {
        setTimeout(() => {
            cookiePopup.classList.add('show');
        }, 3000);
    }

    acceptBtn.addEventListener('click', () => {
        localStorage.setItem('cookiesAccepted', 'true');
        cookiePopup.classList.remove('show');
    });

    rejectBtn.addEventListener('click', () => {
        localStorage.setItem('cookiesAccepted', 'false');
        cookiePopup.classList.remove('show');
    });

    // 6. Hinglish Translation Popup
    function showHinglishPopup() {
        const popup = document.getElementById('hinglish-popup');
        // Check if already shown? Prompt says "on first visit".
        // Using session storage to show it once per session, or local storage. 
        // Or just show it every time if it's "temporary".
        // "auto hide for a few seconds on first visit" suggests strictly first visit.
        if (!localStorage.getItem('hinglishShown')) {
            setTimeout(() => {
                popup.classList.add('show');
                // Auto hide after 7 seconds
                setTimeout(() => {
                    popup.classList.remove('show');
                    localStorage.setItem('hinglishShown', 'true');
                }, 7000);
            }, 1000);
        }
    }
});