// About Page Script
console.log('About page script loaded');

(function() {
  'use strict';
  
  // Team member cards interaction
  const initTeamCards = () => {
    const teamCards = document.querySelectorAll('.team-card');
    
    teamCards.forEach(card => {
      card.addEventListener('mouseenter', () => {
        card.style.transform = 'translateY(-10px)';
        card.style.boxShadow = '0 10px 30px rgba(0,0,0,0.15)';
      });
      
      card.addEventListener('mouseleave', () => {
        card.style.transform = 'translateY(0)';
        card.style.boxShadow = '0 2px 10px rgba(0,0,0,0.1)';
      });
      
      // Add smooth transition
      card.style.transition = 'transform 0.3s ease, box-shadow 0.3s ease';
    });
  };

  // Timeline animation
  const initTimeline = () => {
    const timelineItems = document.querySelectorAll('.timeline-item');
    
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateX(0)';
          }, index * 100);
          observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.2
    });
    
    timelineItems.forEach((item, index) => {
      item.style.opacity = '0';
      item.style.transform = index % 2 === 0 ? 'translateX(-50px)' : 'translateX(50px)';
      item.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
      observer.observe(item);
    });
  };

  // Stats counter animation
  const initStatsCounter = () => {
    const stats = document.querySelectorAll('.stat-number');
    
    const animateValue = (element, start, end, duration) => {
      let startTimestamp = null;
      const step = (timestamp) => {
        if (!startTimestamp) startTimestamp = timestamp;
        const progress = Math.min((timestamp - startTimestamp) / duration, 1);
        element.textContent = Math.floor(progress * (end - start) + start).toLocaleString();
        if (progress < 1) {
          window.requestAnimationFrame(step);
        }
      };
      window.requestAnimationFrame(step);
    };
    
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const element = entry.target;
          const endValue = parseInt(element.dataset.value || element.textContent);
          animateValue(element, 0, endValue, 2000);
          observer.unobserve(element);
        }
      });
    }, {
      threshold: 0.5
    });
    
    stats.forEach(stat => observer.observe(stat));
  };

  // Mission statement parallax
  const initParallax = () => {
    const parallaxElements = document.querySelectorAll('[data-parallax]');
    
    if (parallaxElements.length === 0) return;
    
    window.addEventListener('scroll', () => {
      const scrolled = window.pageYOffset;
      
      parallaxElements.forEach(element => {
        const speed = element.dataset.parallax || 0.5;
        const yPos = -(scrolled * speed);
        element.style.transform = `translateY(${yPos}px)`;
      });
    });
  };

  // Initialize everything
  const init = () => {
    console.log('Initializing about page features');
    initTeamCards();
    initTimeline();
    initStatsCounter();
    initParallax();
  };

  // Wait for DOM ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();