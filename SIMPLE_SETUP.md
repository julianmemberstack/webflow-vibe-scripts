# 🚀 Simple Setup Guide

## What This Does
- Write JavaScript in VS Code instead of Webflow
- See changes instantly without publishing 
- Keep all code in GitHub

## Initial Setup (One Time)

### 1. Add to Webflow Site Settings → Custom Code → Head
```html
<script>
(function() {
  const isDev = location.hostname.includes('.webflow.io');
  const baseUrl = isDev 
    ? 'http://localhost:3000/src' 
    : 'https://julianmemberstack.github.io/webflow-vibe-scripts/dist';
  
  // Scripts that load on EVERY page
  window.globalScripts = ['alert'];  // Just the test alert for now
  
  // Load the router
  const script = document.createElement('script');
  script.src = baseUrl + '/router.js';
  document.head.appendChild(script);
})();
</script>
```

### 2. Publish Webflow once

---

## 📝 How to Load Scripts

### Load Scripts on ALL Pages
Edit the site settings code:
```javascript
window.globalScripts = ['alert', 'tracking', 'analytics'];
```

### Load Scripts on SPECIFIC Pages Only
In that page's settings → Custom Code → Before </body>:
```html
<!-- One script -->
<script>window.pageScript = 'home-hero';</script>

<!-- Multiple scripts -->
<script>window.pageScripts = ['slider', 'testimonials'];</script>
```

**All scripts go in the same `src/scripts/` folder!**

---

## 🔄 Daily Workflow

### Start Working
```bash
npm run dev
```
Keep this running.

### Create a New Script
1. Create `src/scripts/my-feature.js`
2. Add to Webflow (either global or page-specific)
3. Publish Webflow

### Edit Existing Scripts
1. Edit the file
2. Save
3. Refresh browser (no Webflow publish needed!)

---

## 📂 Simple Structure

```
src/
└── scripts/       # ALL your scripts go here
    ├── alert.js   # Test alert
    ├── tracking.js
    ├── slider.js
    ├── forms.js
    └── whatever.js
```

That's it! One folder for all scripts.

---

## 🎯 Examples

### Example: Add tracking to all pages
1. Create `src/scripts/tracking.js`
2. Update site settings: `window.globalScripts = ['alert', 'tracking'];`
3. Publish Webflow

### Example: Add slider to homepage only
1. Create `src/scripts/slider.js`
2. In homepage settings add: `<script>window.pageScript = 'slider';</script>`
3. Publish Webflow

### Example: Multiple scripts on product pages
1. Create scripts: `gallery.js`, `reviews.js`, `cart.js`
2. In product page template add: `<script>window.pageScripts = ['gallery', 'reviews', 'cart'];</script>`
3. Publish Webflow

---

## ❓ Quick Answers

**When to publish Webflow?**
- When adding/removing scripts from lists
- When adding script tags to new pages
- NOT when editing JavaScript code

**Why use global vs page scripts?**
- Global = loads everywhere (analytics, tracking)
- Page = loads on specific pages (homepage hero, contact form)

**Script not loading?**
1. Check `npm run dev` is running
2. Check script name matches exactly
3. Did you publish Webflow after adding?
4. Check browser console for errors