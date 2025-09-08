// Test Alert Script
console.log('Alert script loaded');

(function() {
  'use strict';
  
  // Show alert after 5 seconds to confirm scripts are working
  setTimeout(() => {
    alert('🎉 Scripts are working! This alert came from alert.js after 5 seconds.');
    console.log('Alert shown - scripts are working correctly!');
  }, 5000);
  
  console.log('Alert will show in 5 seconds...');
})();