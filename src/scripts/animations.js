// Animations Script
console.log('Animations script loaded');

(function() {
  'use strict';
  
  // Fade in elements on scroll
  const observeElements = () => {
    const elements = document.querySelectorAll('[data-animate]');
    
    if (!elements.length) return;
    
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const element = entry.target;
          const animation = element.dataset.animate || 'fade-in';
          
          element.style.opacity = '0';
          element.style.transform = 'translateY(20px)';
          element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
          
          // Trigger reflow
          element.offsetHeight;
          
          element.style.opacity = '1';
          element.style.transform = 'translateY(0)';
          
          observer.unobserve(element);
        }
      });
    }, {
      threshold: 0.1,
      rootMargin: '50px'
    });
    
    elements.forEach(el => observer.observe(el));
  };

  // Smooth scroll for anchor links
  const initSmoothScroll = () => {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
          target.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
          });
        }
      });
    });
  };

  // Initialize animations
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
      observeElements();
      initSmoothScroll();
    });
  } else {
    observeElements();
    initSmoothScroll();
  }

  // Expose animation utilities
  window.Animations = {
    fadeIn: (element, duration = 600) => {
      element.style.opacity = '0';
      element.style.transition = `opacity ${duration}ms ease`;
      element.offsetHeight; // Trigger reflow
      element.style.opacity = '1';
    },
    slideIn: (element, direction = 'up', duration = 600) => {
      const transforms = {
        up: 'translateY(20px)',
        down: 'translateY(-20px)',
        left: 'translateX(20px)',
        right: 'translateX(-20px)'
      };
      element.style.opacity = '0';
      element.style.transform = transforms[direction];
      element.style.transition = `opacity ${duration}ms ease, transform ${duration}ms ease`;
      element.offsetHeight; // Trigger reflow
      element.style.opacity = '1';
      element.style.transform = 'translate(0)';
    }
  };
})();