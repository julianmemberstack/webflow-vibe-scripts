// Animations Script - Test Alert
console.log('Animations script loaded');

(function() {
  'use strict';
  
  // Show alert after 5 seconds to confirm it's working
  setTimeout(() => {
    alert('🎉 Scripts are working! This alert came from animations.js after 5 seconds.');
    console.log('Alert shown - scripts are working correctly!');
  }, 5000);
  
  console.log('Alert will show in 5 seconds...');
})();