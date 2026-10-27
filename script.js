/**
 * SAKSHI PAKLE — PORTFOLIO & SERVICES SCRIPT
 * Vanilla JavaScript • 3D Interactive Depth & Parallax • Accessible
 */

(function () {
  'use strict';

  // ==========================================================================
  // CONFIGURATION SETTINGS (Easily update your personal links here)
  // ==========================================================================
  const PORTFOLIO_CONFIG = {
    developerName: 'Sakshi Pakle',
    primaryEmail: 'sakshipaklel@gmail.com',
    linkedinUrl: 'https://linkedin.com/in/sakshi-pakle-placeholder',
    githubUrl: 'https://github.com/sakshipakle',
    resumePath: './assets/resume.pdf',
    // Verified: real resume PDF exists at assets/resume.pdf
    hasResumePdfOnDisk: true
  };

  // EmailJS Configuration
  const EMAILJS_CONFIG = {
    serviceId: 'service_e3xff08',
    templateId: 'template_miipzhs',
    publicKey: 'v9D2MAcaG4vZp3NaR',
    contactEmail: 'sakshipaklel@gmail.com'
  };

  // Initialize EmailJS SDK if already loaded
  if (typeof emailjs !== 'undefined' && emailjs.init) {
    try {
      emailjs.init({ publicKey: EMAILJS_CONFIG.publicKey });
    } catch (e) {
      console.warn('EmailJS initialization warning:', e);
    }
  }

  // ==========================================================================
  // DOM ELEMENTS
  // ==========================================================================
  const header = document.getElementById('header');
  const mobileMenuBtn = document.getElementById('mobileMenuBtn');
  const mobileMenu = document.getElementById('mobileMenu');
  const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');
  const desktopNavLinks = document.querySelectorAll('.desktop-nav .nav-link');
  const sections = document.querySelectorAll('section[id], footer[id]');
  const contactForm = document.getElementById('contactForm');
  const toastElement = document.getElementById('toast');
  const currentYearSpan = document.getElementById('currentYear');
  const resumeDownloadBtns = document.querySelectorAll('.resume-download-btn');
  const projectDetailBtns = document.querySelectorAll('.project-detail-btn');
  const heroSection = document.getElementById('hero');
  const heroExploreBtn = document.getElementById('heroExploreBtn');
  const heroContactBtn = document.getElementById('heroContactBtn');

  // Check user environment preferences
  const isReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const isTouchDevice = window.matchMedia('(hover: none)').matches || ('ontouchstart' in window);

  // ==========================================================================
  // 1. FOOTER YEAR UPDATE
  // ==========================================================================
  if (currentYearSpan) {
    currentYearSpan.textContent = new Date().getFullYear();
  }

  // ==========================================================================
  // 2. TOAST NOTIFICATION UTILITY
  // ==========================================================================
  let toastTimeout;
  function showToast(message, type = 'info', duration = 4000) {
    if (!toastElement) return;

    clearTimeout(toastTimeout);
    toastElement.textContent = message;
    toastElement.className = `toast toast-${type} show`;

    toastTimeout = setTimeout(() => {
      toastElement.className = 'toast';
    }, duration);
  }

  // ==========================================================================
  // 3. MOBILE NAVIGATION DRAWER
  // ==========================================================================
  function toggleMobileMenu(forceClose = false) {
    if (!mobileMenuBtn || !mobileMenu) return;

    const isOpen = forceClose ? false : !mobileMenu.classList.contains('open');

    mobileMenuBtn.classList.toggle('active', isOpen);
    mobileMenu.classList.toggle('open', isOpen);
    mobileMenuBtn.setAttribute('aria-expanded', String(isOpen));
    mobileMenu.setAttribute('aria-hidden', String(!isOpen));

    // Prevent background scrolling when drawer is open
    document.body.style.overflow = isOpen ? 'hidden' : '';
  }

  if (mobileMenuBtn) {
    mobileMenuBtn.addEventListener('click', () => toggleMobileMenu());
  }

  // Close mobile drawer on Escape key press
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && mobileMenu && mobileMenu.classList.contains('open')) {
      toggleMobileMenu(true);
    }
  });

  // ==========================================================================
  // 4. SMOOTH SCROLLING FOR ALL INTERNAL ANCHORS (INCLUDING HERO BUTTONS)
  // ==========================================================================
  function smoothScrollToElement(targetElement) {
    if (!targetElement) return;

    // Close mobile menu if open
    if (mobileMenu && mobileMenu.classList.contains('open')) {
      toggleMobileMenu(true);
    }

    const headerHeight = header ? header.offsetHeight : 76;
    const elementPosition = targetElement.getBoundingClientRect().top;
    const currentScroll = window.pageYOffset || document.documentElement.scrollTop;
    // Align with header height + 24px clearance to prevent navbar from covering headings
    const targetOffset = elementPosition + currentScroll - headerHeight - 24;

    window.scrollTo({
      top: Math.max(0, targetOffset),
      behavior: 'smooth'
    });
  }

  function initSmoothScroll() {
    // Handle general internal anchors (nav links, footer links, etc.)
    const internalAnchors = document.querySelectorAll(
      'a[href^="#"]:not([href="#"]):not([data-close="modal"]):not(#heroExploreBtn):not(#heroContactBtn)'
    );

    internalAnchors.forEach((anchor) => {
      anchor.addEventListener('click', function (e) {
        const targetId = this.getAttribute('href');
        if (!targetId || targetId === '#') return;

        const targetElement = document.querySelector(targetId);
        if (targetElement) {
          e.preventDefault();
          smoothScrollToElement(targetElement);

          if (history.pushState) {
            history.pushState(null, null, targetId);
          }
        }
      });
    });

    // 1. Explore Projects button -> smoothly scroll to #projects
    if (heroExploreBtn) {
      heroExploreBtn.addEventListener('click', function (e) {
        const projectsSection = document.getElementById('projects');
        if (projectsSection) {
          e.preventDefault();
          smoothScrollToElement(projectsSection);
          if (history.pushState) {
            history.pushState(null, null, '#projects');
          } else {
            window.location.hash = '#projects';
          }
        }
      });
      heroExploreBtn.addEventListener('keydown', function (e) {
        if (e.key === ' ' || e.key === 'Spacebar') {
          e.preventDefault();
          this.click();
        }
      });
    }

    // 2. Get In Touch button -> smoothly scroll to #contact
    if (heroContactBtn) {
      heroContactBtn.addEventListener('click', function (e) {
        const contactSection = document.getElementById('contact');
        if (contactSection) {
          e.preventDefault();
          smoothScrollToElement(contactSection);
          if (history.pushState) {
            history.pushState(null, null, '#contact');
          } else {
            window.location.hash = '#contact';
          }
        }
      });
      heroContactBtn.addEventListener('keydown', function (e) {
        if (e.key === ' ' || e.key === 'Spacebar') {
          e.preventDefault();
          this.click();
        }
      });
    }
  }

  initSmoothScroll();

  // ==========================================================================
  // 5. STICKY HEADER & SCROLL SPY
  // ==========================================================================
  function handleScroll() {
    const scrollY = window.pageYOffset || document.documentElement.scrollTop;

    // Header elevation styling
    if (header) {
      if (scrollY > 50) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }
    }

    // Scroll spy for active section highlighting
    let currentSectionId = '';
    const scrollPosition = scrollY + 160;

    sections.forEach((section) => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      const sectionId = section.getAttribute('id');

      if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
        currentSectionId = sectionId;
      }
    });

    if (currentSectionId) {
      desktopNavLinks.forEach((link) => {
        const href = link.getAttribute('href');
        if (href === `#${currentSectionId}`) {
          link.classList.add('active');
        } else {
          link.classList.remove('active');
        }
      });

      mobileNavLinks.forEach((link) => {
        const href = link.getAttribute('href');
        if (href === `#${currentSectionId}`) {
          link.classList.add('active');
        } else {
          link.classList.remove('active');
        }
      });
    }
  }

  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll(); // Initial run on page load

  // ==========================================================================
  // 6. 3D SCROLL REVEAL ANIMATIONS (INTERSECTION OBSERVER)
  // ==========================================================================
  const revealElements = document.querySelectorAll('.reveal');

  if ('IntersectionObserver' in window) {
    const revealObserver = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('revealed');
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.12,
        rootMargin: '0px 0px -40px 0px'
      }
    );

    revealElements.forEach((el) => revealObserver.observe(el));
  } else {
    // Fallback for older browsers
    revealElements.forEach((el) => el.classList.add('revealed'));
  }

  // ==========================================================================
  // 7. 3D HERO MOUSE-RESPONSIVE PARALLAX
  // ==========================================================================
  function initHeroParallax3D() {
    if (isReducedMotion || isTouchDevice || !heroSection) return;

    const parallaxLayers = heroSection.querySelectorAll('[data-parallax-depth]');
    if (!parallaxLayers.length) return;

    let targetX = 0;
    let targetY = 0;
    let currentX = 0;
    let currentY = 0;
    let isTracking = false;
    let animationFrameId = null;

    function onMouseMove(e) {
      const rect = heroSection.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      // Normalized coordinates from -1 to 1
      targetX = (e.clientX - centerX) / (rect.width / 2);
      targetY = (e.clientY - centerY) / (rect.height / 2);

      // Clamp between -1 and 1
      targetX = Math.max(-1, Math.min(1, targetX));
      targetY = Math.max(-1, Math.min(1, targetY));

      if (!isTracking) {
        isTracking = true;
        renderParallax();
      }
    }

    function onMouseLeave() {
      targetX = 0;
      targetY = 0;
    }

    function renderParallax() {
      // Smooth linear interpolation (lerp)
      currentX += (targetX - currentX) * 0.08;
      currentY += (targetY - currentY) * 0.08;

      parallaxLayers.forEach((layer) => {
        const depth = parseFloat(layer.getAttribute('data-parallax-depth')) || 0.04;
        const moveX = currentX * depth * 140;
        const moveY = currentY * depth * 140;
        const rotateY = currentX * depth * 35;
        const rotateX = -currentY * depth * 35;

        layer.style.transform = `translate3d(${moveX.toFixed(2)}px, ${moveY.toFixed(2)}px, 0) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg)`;
      });

      // Continue animating until nearly settled
      const delta = Math.abs(targetX - currentX) + Math.abs(targetY - currentY);
      if (delta > 0.001 || targetX !== 0 || targetY !== 0) {
        animationFrameId = requestAnimationFrame(renderParallax);
      } else {
        isTracking = false;
      }
    }

    heroSection.addEventListener('mousemove', onMouseMove, { passive: true });
    heroSection.addEventListener('mouseleave', onMouseLeave);
  }

  initHeroParallax3D();

  // ==========================================================================
  // 8. INTERACTIVE 3D CARD TILT & GLARE EFFECT
  // ==========================================================================
  function initInteractiveCardTilt3D() {
    if (isReducedMotion || isTouchDevice) return;

    const tiltCards = document.querySelectorAll(
      '[data-tilt], .service-card, .project-card, .skill-category, .process-step, .pillar-card'
    );

    tiltCards.forEach((card) => {
      // Create glare overlay if absent
      let glare = card.querySelector('.card-glare');
      if (!glare) {
        glare = document.createElement('div');
        glare.className = 'card-glare';
        card.appendChild(glare);
      }

      const maxTilt = parseFloat(card.getAttribute('data-tilt-max')) || 8; // degrees

      function onCardMouseMove(e) {
        const rect = card.getBoundingClientRect();
        const cardX = e.clientX - rect.left;
        const cardY = e.clientY - rect.top;

        // Calculate offset from center (-0.5 to 0.5)
        const percentX = (cardX / rect.width) - 0.5;
        const percentY = (cardY / rect.height) - 0.5;

        const tiltX = -(percentY * maxTilt * 2).toFixed(2);
        const tiltY = (percentX * maxTilt * 2).toFixed(2);

        // Apply 3D perspective tilt
        card.style.transform = `perspective(1000px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) translateZ(8px)`;

        // Move the dynamic light reflection
        const glareX = ((percentX + 0.5) * 100).toFixed(1);
        const glareY = ((percentY + 0.5) * 100).toFixed(1);
        glare.style.background = `radial-gradient(circle at ${glareX}% ${glareY}%, rgba(0, 210, 255, 0.16) 0%, transparent 65%)`;
        glare.style.opacity = '1';
      }

      function onCardMouseLeave() {
        // Smoothly return card to flat state
        card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateZ(0)';
        glare.style.opacity = '0';
      }

      card.addEventListener('mousemove', onCardMouseMove, { passive: true });
      card.addEventListener('mouseleave', onCardMouseLeave);
    });
  }

  initInteractiveCardTilt3D();

  // ==========================================================================
  // 9. RESUME DOWNLOAD HANDLER & STATUS CHECK
  // ==========================================================================
  resumeDownloadBtns.forEach((btn) => {
    btn.setAttribute('href', PORTFOLIO_CONFIG.resumePath);
    btn.setAttribute('download', 'Sakshi_Pakle_Resume.pdf');

    btn.addEventListener('click', function (e) {
      if (!PORTFOLIO_CONFIG.hasResumePdfOnDisk) {
        e.preventDefault();
        showToast(
          'Resume file notice: Please copy your real resume PDF into the "assets/" folder as "resume.pdf" to enable direct download.',
          'warning',
          6000
        );
        return;
      }

      showToast('Downloading Sakshi Pakle\'s Resume (PDF)...', 'success', 3000);

      // If running over HTTP/HTTPS, use Blob fetch to ensure immediate file download
      if (window.fetch && window.location.protocol.startsWith('http')) {
        e.preventDefault();
        fetch(PORTFOLIO_CONFIG.resumePath)
          .then((res) => {
            if (!res.ok) throw new Error('File fetch failed');
            return res.blob();
          })
          .then((blob) => {
            const blobUrl = window.URL.createObjectURL(blob);
            const tempLink = document.createElement('a');
            tempLink.style.display = 'none';
            tempLink.href = blobUrl;
            tempLink.download = 'Sakshi_Pakle_Resume.pdf';
            document.body.appendChild(tempLink);
            tempLink.click();
            setTimeout(() => {
              document.body.removeChild(tempLink);
              window.URL.revokeObjectURL(blobUrl);
            }, 1000);
          })
          .catch((err) => {
            console.warn('Direct blob download fallback to native link:', err);
            const fallbackLink = document.createElement('a');
            fallbackLink.href = PORTFOLIO_CONFIG.resumePath;
            fallbackLink.download = 'Sakshi_Pakle_Resume.pdf';
            document.body.appendChild(fallbackLink);
            fallbackLink.click();
            document.body.removeChild(fallbackLink);
          });
      }
    });

    btn.addEventListener('keydown', function (e) {
      if (e.key === ' ' || e.key === 'Spacebar') {
        e.preventDefault();
        this.click();
      }
    });
  });



  // ==========================================================================
  // 11. PROJECT ARCHITECTURE MODALS
  // ==========================================================================
  function openModal(modalId) {
    const modal = document.getElementById(modalId);
    if (!modal) return;

    modal.classList.add('active');
    modal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';

    // Focus close button inside modal for accessibility
    const closeBtn = modal.querySelector('.modal-close');
    if (closeBtn) closeBtn.focus();
  }

  function closeModal(modal) {
    if (!modal) return;
    modal.classList.remove('active');
    modal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  projectDetailBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      const targetId = btn.getAttribute('data-target');
      if (targetId) openModal(targetId);
    });
  });

  // Close modals on clicking overlay, close buttons, or ESC key
  document.addEventListener('click', (e) => {
    if (e.target.matches('[data-close="modal"]')) {
      const activeModal = e.target.closest('.modal');
      closeModal(activeModal);
    }
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      const activeModal = document.querySelector('.modal.active');
      if (activeModal) closeModal(activeModal);
    }
  });

  // ==========================================================================
  // 12. CONTACT FORM VALIDATION & CLIENT-SIDE SUBMISSION
  // ==========================================================================
  if (contactForm) {
    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const serviceInput = document.getElementById('serviceInterest');
    const subjectInput = document.getElementById('subject');
    const messageInput = document.getElementById('message');

    const nameError = document.getElementById('nameError');
    const emailError = document.getElementById('emailError');
    const subjectError = document.getElementById('subjectError');
    const messageError = document.getElementById('messageError');

    // Email format regex
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    function clearErrors() {
      [nameError, emailError, subjectError, messageError].forEach((el) => {
        if (el) el.textContent = '';
      });
      [nameInput, emailInput, subjectInput, messageInput].forEach((el) => {
        if (el) el.classList.remove('is-invalid');
      });
    }

    // Clear error on input
    [nameInput, emailInput, subjectInput, messageInput].forEach((input) => {
      if (input) {
        input.addEventListener('input', () => {
          input.classList.remove('is-invalid');
          const errorSpan = document.getElementById(`${input.id}Error`);
          if (errorSpan) errorSpan.textContent = '';
        });
      }
    });

    const submitBtn = document.getElementById('submitBtn');
    const submitBtnOriginalHTML = submitBtn ? submitBtn.innerHTML : '<span>Send Message</span>';

    function setSendingState(isSending) {
      if (!submitBtn) return;
      if (isSending) {
        submitBtn.disabled = true;
        submitBtn.innerHTML = `
          <span class="btn-spinner" aria-hidden="true"></span>
          <span>Sending...</span>
        `;
      } else {
        submitBtn.disabled = false;
        submitBtn.innerHTML = submitBtnOriginalHTML;
      }
    }

    let isSubmitting = false;

    contactForm.addEventListener('submit', function (e) {
      e.preventDefault();
      if (isSubmitting) return;

      clearErrors();

      let isValid = true;

      // Validate Name
      const nameValue = nameInput ? nameInput.value.trim() : '';
      if (!nameValue) {
        if (nameError) nameError.textContent = 'Please enter your full name.';
        if (nameInput) nameInput.classList.add('is-invalid');
        isValid = false;
      } else if (nameValue.length < 2) {
        if (nameError) nameError.textContent = 'Name must be at least 2 characters.';
        if (nameInput) nameInput.classList.add('is-invalid');
        isValid = false;
      }

      // Validate Email
      const emailValue = emailInput ? emailInput.value.trim() : '';
      if (!emailValue) {
        if (emailError) emailError.textContent = 'Please enter your email address.';
        if (emailInput) emailInput.classList.add('is-invalid');
        isValid = false;
      } else if (!emailRegex.test(emailValue)) {
        if (emailError) emailError.textContent = 'Please enter a valid email address.';
        if (emailInput) emailInput.classList.add('is-invalid');
        isValid = false;
      }

      // Validate Subject
      const subjectValue = subjectInput ? subjectInput.value.trim() : '';
      if (!subjectValue) {
        if (subjectError) subjectError.textContent = 'Please enter a subject.';
        if (subjectInput) subjectInput.classList.add('is-invalid');
        isValid = false;
      } else if (subjectValue.length < 2) {
        if (subjectError) subjectError.textContent = 'Subject must be at least 2 characters.';
        if (subjectInput) subjectInput.classList.add('is-invalid');
        isValid = false;
      }

      // Validate Message
      const messageValue = messageInput ? messageInput.value.trim() : '';
      if (!messageValue) {
        if (messageError) messageError.textContent = 'Please enter your message.';
        if (messageInput) messageInput.classList.add('is-invalid');
        isValid = false;
      } else if (messageValue.length < 5) {
        if (messageError) messageError.textContent = 'Message must be at least 5 characters.';
        if (messageInput) messageInput.classList.add('is-invalid');
        isValid = false;
      }

      if (!isValid) {
        showToast('Please fix the errors in the form before sending.', 'warning');
        return;
      }

      // Prepare payload matching Spring Boot ContactRequestDTO
      const payload = {
        name: nameValue,
        email: emailValue,
        serviceInterest: serviceInput ? serviceInput.value : '',
        subject: subjectValue,
        message: messageValue
      };

      // Set Sending UI state: prevent duplicate submission, show spinner
      isSubmitting = true;
      setSendingState(true);

      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 12000);

      fetch('http://localhost:8080/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify(payload),
        signal: controller.signal
      })
        .then(async (response) => {
          clearTimeout(timeoutId);
          let data = null;
          try {
            data = await response.json();
          } catch (jsonErr) {
            // Non-JSON response
          }

          if (response.ok && data && data.success) {
            showToast(
              data.message || 'Thank you! Your message has been saved successfully.',
              'success',
              6000
            );
            contactForm.reset();
            clearErrors();
          } else {
            const errorMsg = (data && data.message)
              ? data.message
              : `Submission failed (HTTP ${response.status}). Please try again.`;

            // Display server-side field validation errors if available
            if (data && Array.isArray(data.errors) && data.errors.length > 0) {
              data.errors.forEach((errStr) => {
                const parts = errStr.split(':');
                if (parts.length >= 2) {
                  const fieldName = parts[0].trim();
                  const fieldMsg = parts.slice(1).join(':').trim();
                  const targetInput = document.getElementById(fieldName);
                  const targetErrorSpan = document.getElementById(`${fieldName}Error`);
                  if (targetInput) targetInput.classList.add('is-invalid');
                  if (targetErrorSpan) targetErrorSpan.textContent = fieldMsg;
                }
              });
            }

            showToast(errorMsg, 'error', 7000);
          }
        })
        .catch((error) => {
          clearTimeout(timeoutId);
          console.error('Contact API submission error:', error);
          if (error.name === 'AbortError') {
            showToast(
              'Request timed out. Please check if the Spring Boot backend is running on port 8080.',
              'error',
              8000
            );
          } else {
            showToast(
              'Unable to reach backend server (http://localhost:8080). Please ensure Spring Boot is running, or contact directly at sakshipaklel@gmail.com.',
              'error',
              8000
            );
          }
        })
        .finally(() => {
          isSubmitting = false;
          setSendingState(false);
        });
    });
  }

})();
