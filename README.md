# Webflow Script Router System

Stop copy-pasting code to Webflow. Write JavaScript locally, see changes instantly, and deploy automatically.

## ✨ What This Does

- 🔥 **Hot reload development** - Edit locally, see changes instantly on staging
- 🚀 **Automatic deployment** - Push to GitHub, live in 2 minutes
- 📝 **Real code editor** - Use VS Code instead of Webflow's tiny box
- 🎯 **Smart routing** - Load scripts globally or per-page
- 💾 **Version control** - All your code in GitHub

## 📁 Project Structure

```
webflow-vibe-scripts/
├── src/
│   ├── router.js          # Main router (don't modify)
│   └── scripts/           # ALL your scripts go here
│       ├── alert.js       # Test alert (shows after 5 seconds)
│       └── [your-script].js
├── dist/                  # Production build (auto-generated)
├── package.json
└── vite.config.js
```

**Note:** No pages/ folder! All scripts go in `src/scripts/`. You control where they load using Webflow settings.

## 🚀 Quick Start

### 1. Clone & Install

```bash
git clone https://github.com/julianmemberstack/webflow-vibe-scripts.git
cd webflow-vibe-scripts
npm install
```

### 2. Add to Webflow Site Settings

**Site Settings → Custom Code → Head Code:**

```html
<script>
(function() {
  const isDev = location.hostname.includes('.webflow.io');
  const baseUrl = isDev 
    ? 'http://localhost:3000/src' 
    : 'https://julianmemberstack.github.io/webflow-vibe-scripts/dist';
  
  // Scripts that load on EVERY page
  window.globalScripts = ['alert'];  // Add your global scripts here
  
  // Load the router
  const script = document.createElement('script');
  script.src = baseUrl + '/router.js';
  document.head.appendChild(script);
})();
</script>
```

### 3. Start Development

```bash
npm run dev
```

### 4. Test It

1. Publish your Webflow site to staging
2. Open your `.webflow.io` site
3. After 5 seconds, you'll see an alert confirming it works!

## 📝 How to Use

### Add a Global Script (loads on every page)

1. **Create the script:** `src/scripts/tracking.js`
2. **Update Webflow site settings:**
   ```javascript
   window.globalScripts = ['alert', 'tracking'];
   ```
3. **Publish Webflow** (required when changing script lists)

### Add a Page-Specific Script

1. **Create the script:** `src/scripts/homepage-hero.js`
2. **In that page's settings → Custom Code → Before </body>:**
   ```html
   <!-- Single script -->
   <script>window.pageScript = 'homepage-hero';</script>
   
   <!-- Multiple scripts -->
   <script>window.pageScripts = ['slider', 'testimonials'];</script>
   ```
3. **Publish Webflow**

### Edit Existing Scripts

1. Edit any file in `src/scripts/`
2. Save the file
3. Refresh your browser - changes appear instantly!
4. **No Webflow publish needed!**

## 🔄 Development Workflow

### Daily Development

```bash
# Start dev server (keep running)
npm run dev

# Edit your scripts
# Save files
# Refresh browser - instant updates!
```

### Deploy to Production

```bash
git add .
git commit -m "Update scripts"
git push
```

Wait ~2 minutes → Changes are live on your production site!

## 🎯 Examples

### Example 1: Add Analytics to All Pages

```javascript
// src/scripts/analytics.js
console.log('Analytics loaded');

// Track page views
if (typeof gtag !== 'undefined') {
  gtag('event', 'page_view', {
    page_path: window.location.pathname
  });
}
```

Update site settings:
```javascript
window.globalScripts = ['alert', 'analytics'];
```

### Example 2: Add Form Validation to Contact Page

```javascript
// src/scripts/contact-form.js
const form = document.querySelector('#contact-form');
if (form) {
  form.addEventListener('submit', (e) => {
    // Your validation logic
  });
}
```

On contact page:
```html
<script>window.pageScript = 'contact-form';</script>
```

### Example 3: Multiple Scripts on Product Pages

Create scripts:
- `src/scripts/product-gallery.js`
- `src/scripts/product-reviews.js`
- `src/scripts/add-to-cart.js`

On product template:
```html
<script>
window.pageScripts = ['product-gallery', 'product-reviews', 'add-to-cart'];
</script>
```

## ⚙️ GitHub Pages Setup (One Time)

1. Go to: https://github.com/julianmemberstack/webflow-vibe-scripts/settings/pages
2. Under "Build and deployment"
3. Source: Select **GitHub Actions**
4. Click Save

That's it! Now every push to `main` auto-deploys.

## 🐛 Troubleshooting

### Scripts not loading?

**Check these in order:**

1. **Is dev server running?** (`npm run dev`)
2. **Console errors?** Open browser DevTools
3. **Script names match exactly?** `alert` not `Alert` or `alert.js`
4. **Did you publish Webflow** after adding script tags?

### Expected Console Output

When working correctly, you'll see:
```
Script Router initialized
Base URL: http://localhost:3000/src
Environment: Development
Alert script loaded
Alert will show in 5 seconds...
Loaded: scripts/alert
All scripts loaded successfully
```

### Changes not appearing?

- **Hard refresh:** Cmd+Shift+R (Mac) or Ctrl+F5 (Windows)
- **Check dev server** didn't crash
- **Verify file saved** in VS Code

### Production not working?

1. Check GitHub Actions: https://github.com/julianmemberstack/webflow-vibe-scripts/actions
2. Verify GitHub Pages is enabled (see setup above)
3. Test the URL directly: https://julianmemberstack.github.io/webflow-vibe-scripts/dist/router.js

## 📚 Key Concepts

### When to Publish Webflow

**NEED to publish:**
- Adding/removing scripts from lists
- Adding script tags to new pages
- Changing Webflow elements or styles

**DON'T need to publish:**
- Editing JavaScript code
- Fixing bugs in scripts
- Adding console.logs
- Tweaking functionality

### Global vs Page Scripts

- **Global scripts** = Load everywhere (analytics, tracking, navigation)
- **Page scripts** = Load on specific pages (homepage hero, contact form)

### Critical CSS Warning

Put critical CSS directly in Webflow! This system is for JavaScript only. Loading CSS via scripts causes flash of unstyled content.

## 🎉 Benefits

✅ **No more copy-paste** - Edit locally, changes appear instantly  
✅ **Real debugging** - Use browser DevTools with real files  
✅ **Version control** - Every change tracked in Git  
✅ **Team friendly** - Multiple people can work on scripts  
✅ **Fast iteration** - Test changes in seconds, not minutes  

## 📄 License

MIT - Use this however you want!# Force rebuild
