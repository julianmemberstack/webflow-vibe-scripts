// Webflow Script Router
// This is the main router that handles loading all scripts

(function() {
  'use strict';
  
  // Get base URL from window or detect environment
  const getBaseUrl = () => {
    if (window.SCRIPT_BASE_URL) {
      return window.SCRIPT_BASE_URL;
    }
    const isDev = location.hostname.includes('.webflow.io');
    return isDev 
      ? 'http://localhost:3000/src' 
      : 'https://julianmemberstack.github.io/webflow-vibe-scripts/dist';
  };

  const baseUrl = getBaseUrl();
  
  // Script loader utility - always loads in body for better performance
  const loadScript = (scriptPath) => {
    return new Promise((resolve, reject) => {
      // Check if script already loaded
      const existingScript = document.querySelector(`script[data-script-id="${scriptPath}"]`);
      if (existingScript) {
        console.log(`Script already loaded: ${scriptPath}`);
        resolve();
        return;
      }

      const script = document.createElement('script');
      script.src = `${baseUrl}/${scriptPath}.js`;
      script.dataset.scriptId = scriptPath;
      script.async = true;
      
      script.onload = () => {
        console.log(`Loaded: ${scriptPath}`);
        resolve();
      };
      
      script.onerror = () => {
        console.error(`Failed to load: ${scriptPath}`);
        reject(new Error(`Failed to load script: ${scriptPath}`));
      };
      
      // Always append to body for better performance
      document.body.appendChild(script);
    });
  };

  // Load CSS utility
  const loadStyle = (stylePath) => {
    return new Promise((resolve, reject) => {
      // Check if style already loaded
      const existingStyle = document.querySelector(`link[data-style-id="${stylePath}"]`);
      if (existingStyle) {
        console.log(`Style already loaded: ${stylePath}`);
        resolve();
        return;
      }

      const link = document.createElement('link');
      link.rel = 'stylesheet';
      link.href = `${baseUrl}/${stylePath}.css`;
      link.dataset.styleId = stylePath;
      
      link.onload = () => {
        console.log(`Loaded style: ${stylePath}`);
        resolve();
      };
      
      link.onerror = () => {
        console.error(`Failed to load style: ${stylePath}`);
        reject(new Error(`Failed to load style: ${stylePath}`));
      };
      
      document.head.appendChild(link);
    });
  };

  // Main initialization
  const init = async () => {
    console.log('Script Router initialized');
    console.log('Base URL:', baseUrl);
    console.log('Environment:', location.hostname.includes('.webflow.io') ? 'Development' : 'Production');

    try {
      // Load global scripts (these load on every page)
      if (window.globalScripts && window.globalScripts.length > 0) {
        console.log('Loading global scripts:', window.globalScripts);
        for (const script of window.globalScripts) {
          await loadScript(`scripts/${script}`);
        }
      }

      // Load page-specific scripts (from same scripts folder)
      // Simple format: window.pageScript = 'home'
      if (window.pageScript) {
        console.log('Loading page script:', window.pageScript);
        await loadScript(`scripts/${window.pageScript}`);
      }

      // Multiple scripts format: window.pageScripts = ['script1', 'script2']
      if (window.pageScripts && Array.isArray(window.pageScripts)) {
        console.log('Loading page scripts:', window.pageScripts);
        for (const script of window.pageScripts) {
          await loadScript(`scripts/${script}`);
        }
      }

      // Load page styles if defined
      if (window.pageStyles) {
        const styles = Array.isArray(window.pageStyles) ? window.pageStyles : [window.pageStyles];
        for (const style of styles) {
          await loadStyle(`styles/${style}`);
        }
      }

      console.log('All scripts loaded successfully');
      
      // Dispatch custom event when all scripts are loaded
      window.dispatchEvent(new CustomEvent('scriptsLoaded', { 
        detail: { baseUrl, environment: location.hostname.includes('.webflow.io') ? 'dev' : 'prod' }
      }));
      
    } catch (error) {
      console.error('Script Router Error:', error);
    }
  };

  // Expose utilities globally for use in loaded scripts
  window.ScriptRouter = {
    loadScript,
    loadStyle,
    baseUrl,
    environment: location.hostname.includes('.webflow.io') ? 'dev' : 'prod'
  };

  // Initialize when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();