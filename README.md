# Webflow Script Router System

A modular script management system for Webflow sites with hot reload development and automatic environment detection.

## Features

- 🔥 **Hot reload development** - See changes instantly without republishing Webflow
- 🎯 **Smart environment detection** - Automatically uses local dev server on staging, production CDN on live site
- 📦 **Modular scripts** - Organize scripts by feature or page
- 🚀 **GitHub Pages deployment** - Free, reliable hosting with automatic deployment
- ⚡ **Minimal Webflow code** - Just a few lines in site settings, one line per page
- 🎯 **Body scripts only** - Optimized for JavaScript functionality (put critical CSS in Webflow)

## Quick Start

### 1. Setup Your Repository

```bash
# Clone this repo as a template
git clone https://github.com/julianmemberstack/webflow-vibe-scripts.git
cd webflow-vibe-scripts

# Install dependencies
npm install

# Start development server
npm run dev
```

### 2. Update Router Configuration

The router is already configured for this repository:

```javascript
return isDev 
  ? 'http://localhost:3000/src' 
  : 'https://julianmemberstack.github.io/webflow-vibe-scripts/dist';
```

### 3. Add to Webflow Site Settings

In **Site Settings > Custom Code > Head Code**, add:

```html
<script>
(function() {
  const isDev = location.hostname.includes('.webflow.io');
  const baseUrl = isDev 
    ? 'http://localhost:3000/src' 
    : 'https://julianmemberstack.github.io/webflow-vibe-scripts/dist';
  
  // Scripts that load on EVERY page
  window.globalScripts = ['animations', 'forms'];
  
  // Load the router
  const script = document.createElement('script');
  script.src = baseUrl + '/router.js';
  document.head.appendChild(script);
})();
</script>
```

### 4. Add Page-Specific Scripts

In any page's custom code section, add:

```html
<!-- Load one script -->
<script>window.pageScript = 'home';</script>

<!-- Load multiple scripts -->
<script>window.pageScripts = ['slider', 'testimonials'];</script>
```

## Project Structure

```
webflow-vibe-scripts/
├── src/
│   ├── router.js          # Main router (don't modify unless needed)
│   ├── scripts/           # Global/shared scripts
│   │   ├── alert.js       # Test alert (shows after 5 seconds)
│   │   └── [your-script].js
│   └── pages/            # Page-specific scripts
│       ├── home.js
│       ├── about.js
│       └── [page-name].js
├── dist/                 # Production build (auto-generated)
├── package.json
└── vite.config.js
```

## Development Workflow

1. **Start the dev server:**
   ```bash
   npm run dev
   ```

2. **Open your Webflow staging site** (*.webflow.io)
   - Scripts will automatically load from localhost:3000
   - Changes appear instantly when you save files

3. **Make your changes:**
   - Edit existing scripts in `src/scripts/` or `src/pages/`
   - Create new scripts as needed
   - No need to copy/paste or republish Webflow!

4. **Deploy to production:**
   ```bash
   git add .
   git commit -m "Update scripts"
   git push origin main
   ```
   - GitHub Actions automatically builds and deploys to GitHub Pages
   - Production site loads from GitHub Pages CDN

## Script Examples

### Global Script (loads on every page)
```javascript
// src/scripts/tracking.js
console.log('Tracking script loaded');

(function() {
  // Your tracking code here
  window.Tracking = {
    event: (name, data) => {
      console.log('Event:', name, data);
      // Send to analytics service
    }
  };
})();
```

### Page Script (loads on specific pages)
```javascript
// src/pages/contact.js
console.log('Contact page script loaded');

(function() {
  const form = document.querySelector('#contact-form');
  if (form) {
    form.addEventListener('submit', (e) => {
      // Handle form submission
    });
  }
})();
```

## Environment Detection

The router automatically detects the environment:

- **Development** (*.webflow.io): Loads from `http://localhost:3000`
- **Production** (your domain): Loads from GitHub Pages

You can also check the environment in your scripts:

```javascript
if (window.ScriptRouter.environment === 'dev') {
  console.log('Development mode');
} else {
  console.log('Production mode');
}
```

## GitHub Pages Setup

1. Go to your repository Settings > Pages
2. Set Source to "GitHub Actions"
3. The workflow will run automatically on push to main

## Advanced Features

### Loading Scripts Dynamically

```javascript
// Load another script from within your script
window.ScriptRouter.loadScript('scripts/lazy-feature', 'body')
  .then(() => {
    console.log('Lazy feature loaded');
  });
```

### Loading Styles

```javascript
// Load CSS files
window.ScriptRouter.loadStyle('styles/custom')
  .then(() => {
    console.log('Styles loaded');
  });
```

### Script Load Events

```javascript
// Wait for all scripts to load
window.addEventListener('scriptsLoaded', (e) => {
  console.log('All scripts loaded', e.detail);
  // Initialize features that depend on multiple scripts
});
```

## Troubleshooting

### Scripts not loading on staging?
- Make sure dev server is running: `npm run dev`
- Check browser console for CORS errors
- Verify the URL in router.js matches your GitHub username

### Scripts not loading on production?
- Check GitHub Actions completed successfully
- Verify GitHub Pages is enabled and deployed
- Update the production URL in router.js

### Changes not appearing?
- Hard refresh your browser (Cmd+Shift+R / Ctrl+Shift+F5)
- Clear Webflow's asset cache if needed
- Check browser console for errors

## Best Practices

1. **Keep scripts modular** - One feature per file
2. **Use IIFE pattern** - Avoid global scope pollution
3. **Check element existence** - Scripts may load before DOM
4. **Use data attributes** - For configuration and feature flags
5. **Console log sparingly** - Remove debug logs for production

## License

MIT