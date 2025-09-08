// Home Page Script
console.log('Home page script loaded');

(function() {
  'use strict';
  
  // Hero section animations
  const initHero = () => {
    const heroTitle = document.querySelector('.hero-title');
    const heroSubtitle = document.querySelector('.hero-subtitle');
    const heroCTA = document.querySelector('.hero-cta');
    
    if (heroTitle && window.Animations) {
      window.Animations.fadeIn(heroTitle, 800);
    }
    
    if (heroSubtitle && window.Animations) {
      setTimeout(() => {
        window.Animations.slideIn(heroSubtitle, 'up', 600);
      }, 300);
    }
    
    if (heroCTA && window.Animations) {
      setTimeout(() => {
        window.Animations.slideIn(heroCTA, 'up', 600);
      }, 600);
    }
  };

  // Testimonial carousel
  const initTestimonials = () => {
    const testimonials = document.querySelectorAll('.testimonial');
    if (testimonials.length <= 1) return;
    
    let currentIndex = 0;
    
    const showTestimonial = (index) => {
      testimonials.forEach((t, i) => {
        t.style.display = i === index ? 'block' : 'none';
        if (i === index && window.Animations) {
          window.Animations.fadeIn(t, 400);
        }
      });
    };
    
    // Auto-advance every 5 seconds
    setInterval(() => {
      currentIndex = (currentIndex + 1) % testimonials.length;
      showTestimonial(currentIndex);
    }, 5000);
    
    // Initialize first testimonial
    showTestimonial(0);
  };

  // Newsletter signup
  const initNewsletter = () => {
    const newsletterForm = document.querySelector('#newsletter-form');
    if (!newsletterForm) return;
    
    newsletterForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      
      const email = newsletterForm.querySelector('input[type="email"]').value;
      const button = newsletterForm.querySelector('button[type="submit"]');
      
      // Show loading state
      button.textContent = 'Subscribing...';
      button.disabled = true;
      
      // Simulate API call
      setTimeout(() => {
        // Success message
        const successMsg = document.createElement('div');
        successMsg.className = 'success-message';
        successMsg.textContent = 'Thanks for subscribing!';
        successMsg.style.color = '#22c55e';
        successMsg.style.marginTop = '1rem';
        newsletterForm.appendChild(successMsg);
        
        // Reset form
        newsletterForm.reset();
        button.textContent = 'Subscribe';
        button.disabled = false;
        
        // Remove success message after 3 seconds
        setTimeout(() => {
          successMsg.remove();
        }, 3000);
      }, 1000);
    });
  };

  // Track home page specific events
  const trackHomeEvents = () => {
    // Track CTA clicks
    document.querySelectorAll('.cta-button').forEach(button => {
      button.addEventListener('click', () => {
        if (window.Analytics) {
          window.Analytics.trackEvent('CTA Click', {
            buttonText: button.textContent,
            location: button.dataset.location || 'unknown'
          });
        }
      });
    });
    
    // Track video plays
    const videos = document.querySelectorAll('video');
    videos.forEach(video => {
      video.addEventListener('play', () => {
        if (window.Analytics) {
          window.Analytics.trackEvent('Video Play', {
            videoSrc: video.src,
            videoDuration: video.duration
          });
        }
      });
    });
  };

  // Initialize everything
  const init = () => {
    console.log('Initializing home page features');
    initHero();
    initTestimonials();
    initNewsletter();
    trackHomeEvents();
  };

  // Wait for scripts to be loaded
  if (window.scriptsLoaded) {
    init();
  } else {
    window.addEventListener('scriptsLoaded', init);
  }
})();