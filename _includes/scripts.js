// Allows the navbar burger menu to be populated
document.addEventListener('DOMContentLoaded', () => {

    // Get all "navbar-burger" elements
    const $navbarBurgers = Array.prototype.slice.call(document.querySelectorAll('.navbar-burger'), 0);

    // Add a click event on each of them
    $navbarBurgers.forEach(el => {
        const target = el.dataset.target;
        const $target = document.getElementById(target);
        if (!$target) {
            return;
        }

        const setMenuState = (isOpen) => {
            el.classList.toggle('is-active', isOpen);
            $target.classList.toggle('is-active', isOpen);
            el.setAttribute('aria-expanded', String(isOpen));
        };

        const toggleMenu = () => {
            const isOpen = !el.classList.contains('is-active');
            setMenuState(isOpen);
        };

        el.addEventListener('click', toggleMenu);

        // Close the menu after selecting an item on mobile.
        const links = $target.querySelectorAll('a.navbar-item');
        links.forEach((link) => {
            link.addEventListener('click', () => {
                setMenuState(false);
            });
        });

        // Support closing the menu with Escape for keyboard users.
        document.addEventListener('keydown', (event) => {
            if (event.key === 'Escape') {
                setMenuState(false);
            }
        });
    });

    const newsletterModal = document.getElementById('newsletter-modal');
    const newsletterTriggers = Array.prototype.slice.call(document.querySelectorAll('[data-newsletter-modal-open]'), 0);

    if (newsletterModal && newsletterTriggers.length > 0) {
        const newsletterClosers = Array.prototype.slice.call(newsletterModal.querySelectorAll('[data-newsletter-modal-close]'), 0);
        let lastNewsletterTrigger = null;

        const openNewsletterModal = (trigger) => {
            lastNewsletterTrigger = trigger || null;
            newsletterModal.classList.add('is-active');
            newsletterModal.setAttribute('aria-hidden', 'false');
            document.body.classList.add('is-clipped');

            const closeButton = newsletterModal.querySelector('.delete') || newsletterModal.querySelector('.button');
            if (closeButton) {
                closeButton.focus();
            }
        };

        const closeNewsletterModal = () => {
            newsletterModal.classList.remove('is-active');
            newsletterModal.setAttribute('aria-hidden', 'true');
            document.body.classList.remove('is-clipped');

            if (lastNewsletterTrigger) {
                lastNewsletterTrigger.focus();
            }
        };

        newsletterTriggers.forEach((trigger) => {
            trigger.addEventListener('click', (event) => {
                event.preventDefault();
                openNewsletterModal(trigger);
            });
        });

        newsletterClosers.forEach((closeControl) => {
            closeControl.addEventListener('click', (event) => {
                event.preventDefault();
                closeNewsletterModal();
            });
        });

        document.addEventListener('keydown', (event) => {
            if (event.key === 'Escape' && newsletterModal.classList.contains('is-active')) {
                closeNewsletterModal();
            }
        });
    }

    const contactModal = document.getElementById('contact-modal');
    const contactTriggers = Array.prototype.slice.call(document.querySelectorAll('[data-contact-modal-open]'), 0);

    if (contactModal && contactTriggers.length > 0) {
        const contactClosers = Array.prototype.slice.call(contactModal.querySelectorAll('[data-contact-modal-close]'), 0);
        let lastContactTrigger = null;

        const openContactModal = (trigger) => {
            lastContactTrigger = trigger || null;
            contactModal.classList.add('is-active');
            contactModal.setAttribute('aria-hidden', 'false');
            document.body.classList.add('is-clipped');

            const closeButton = contactModal.querySelector('.delete') || contactModal.querySelector('.button');
            if (closeButton) {
                closeButton.focus();
            }
        };

        const closeContactModal = () => {
            contactModal.classList.remove('is-active');
            contactModal.setAttribute('aria-hidden', 'true');

            if (!newsletterModal || !newsletterModal.classList.contains('is-active')) {
                document.body.classList.remove('is-clipped');
            }

            if (lastContactTrigger) {
                lastContactTrigger.focus();
            }
        };

        contactTriggers.forEach((trigger) => {
            trigger.addEventListener('click', (event) => {
                event.preventDefault();
                openContactModal(trigger);
            });
        });

        contactClosers.forEach((closeControl) => {
            closeControl.addEventListener('click', (event) => {
                event.preventDefault();
                closeContactModal();
            });
        });

        document.addEventListener('keydown', (event) => {
            if (event.key === 'Escape' && contactModal.classList.contains('is-active')) {
                closeContactModal();
            }
        });
    }

});