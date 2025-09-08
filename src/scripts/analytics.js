// Analytics Script Example
console.log('Analytics script loaded');

// Example: Track page views
(function() {
  'use strict';
  
  // Simple page view tracking
  const trackPageView = () => {
    const pageData = {
      url: window.location.href,
      title: document.title,
      timestamp: new Date().toISOString(),
      referrer: document.referrer
    };
    
    console.log('Page View:', pageData);
    
    // Here you would send to your analytics service
    // Example: Google Analytics, Mixpanel, etc.
  };

  // Track initial page view
  trackPageView();

  // Track navigation (for SPAs)
  let lastUrl = location.href;
  new MutationObserver(() => {
    const url = location.href;
    if (url !== lastUrl) {
      lastUrl = url;
      trackPageView();
    }
  }).observe(document, { subtree: true, childList: true });

  // Expose to global scope if needed
  window.Analytics = {
    trackPageView,
    trackEvent: (eventName, data) => {
      console.log('Event:', eventName, data);
      // Send to analytics service
    }
  };
})();