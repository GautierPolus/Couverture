/**
 * Le Couvreur au Chat - Main JavaScript
 * Interactivité, gestion des formulaires et consentement cookies
 */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Mise à jour de l'année courante dans le footer
  const yearElements = document.querySelectorAll('.current-year');
  const currentYear = new Date().getFullYear();
  yearElements.forEach(el => {
    el.textContent = currentYear;
  });

  // 2. Effet au défilement pour la barre de navigation
  const navbar = document.querySelector('.custom-navbar');
  if (navbar) {
    const handleScroll = () => {
      if (window.scrollY > 30) {
        navbar.classList.add('scrolled');
      } else {
        navbar.classList.remove('scrolled');
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
  }

  // 3. Gestionnaire de bandeau Cookies
  const cookieBanner = document.getElementById('cookieBanner');
  const acceptCookiesBtn = document.getElementById('acceptCookies');
  const declineCookiesBtn = document.getElementById('declineCookies');

  if (cookieBanner) {
    const cookieConsent = localStorage.getItem('couvreur_cookie_consent');
    if (!cookieConsent) {
      setTimeout(() => {
        cookieBanner.classList.add('show');
      }, 900);
    }

    if (acceptCookiesBtn) {
      acceptCookiesBtn.addEventListener('click', () => {
        localStorage.setItem('couvreur_cookie_consent', 'accepted');
        cookieBanner.classList.remove('show');
      });
    }

    if (declineCookiesBtn) {
      declineCookiesBtn.addEventListener('click', () => {
        localStorage.setItem('couvreur_cookie_consent', 'declined');
        cookieBanner.classList.remove('show');
      });
    }
  }

  // 4. Fonction utilitaire pour afficher des notifications toasts
  window.showToast = function(message, title = 'Succès !') {
    let toast = document.getElementById('siteToast');
    if (!toast) {
      toast = document.createElement('div');
      toast.id = 'siteToast';
      toast.className = 'custom-toast';
      document.body.appendChild(toast);
    }

    toast.innerHTML = `
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#22c55e" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
        <polyline points="22 4 12 14.01 9 11.01"></polyline>
      </svg>
      <div>
        <strong style="display:block; font-size: 0.95rem;">${title}</strong>
        <span style="font-size: 0.88rem; color: #cbd5e1;">${message}</span>
      </div>
    `;

    toast.classList.add('show');
    setTimeout(() => {
      toast.classList.remove('show');
    }, 4500);
  };

  // 5. Gestionnaire du formulaire de devis (devis.html)
  const devisForm = document.getElementById('devisForm');
  if (devisForm) {
    devisForm.addEventListener('submit', (e) => {
      e.preventDefault();
      
      const submitBtn = devisForm.querySelector('button[type="submit"]');
      const originalText = submitBtn.innerHTML;
      submitBtn.disabled = true;
      submitBtn.innerHTML = `
        <span class="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
        Envoi de votre demande...
      `;

      setTimeout(() => {
        submitBtn.disabled = false;
        submitBtn.innerHTML = originalText;
        showToast("Votre demande de devis a bien été transmise. Nous vous recontactons sous 48h.", "Demande reçue !");
        devisForm.reset();
      }, 900);
    });
  }

  // 6. Gestionnaire du formulaire de contact (contact.html)
  const contactForm = document.getElementById('contactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      
      const submitBtn = contactForm.querySelector('button[type="submit"]');
      const originalText = submitBtn.innerHTML;
      submitBtn.disabled = true;
      submitBtn.innerHTML = `
        <span class="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
        Envoi en cours...
      `;

      setTimeout(() => {
        submitBtn.disabled = false;
        submitBtn.innerHTML = originalText;
        showToast("Merci pour votre message ! Notre équipe vous répondra dans les plus brefs délais.", "Message envoyé !");
        contactForm.reset();
      }, 800);
    });
  }
});
