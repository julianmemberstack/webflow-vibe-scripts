# 🚀 Simple Setup Guide

## What This Does
- Lets you write JavaScript in VS Code instead of Webflow
- See changes instantly without publishing Webflow
- Keep all your code in GitHub

## Initial Setup (One Time)

### 1. Add to Webflow Site Settings → Custom Code → Head
```html
<script>
(function() {
  const isDev = location.hostname.includes('.webflow.io');
  const baseUrl = isDev 
    ? 'http://localhost:3000/src' 
    : 'https://julianmemberstack.github.io/webflow-vibe-scripts/dist';
  
  // List scripts that load on EVERY page (leave empty [] if none)
  window.globalScripts = ['alert'];  // Just the test alert for now
  
  // Load the router
  const script = document.createElement('script');
  script.src = baseUrl + '/router.js';
  document.head.appendChild(script);
})();
</script>
```

### 2. That's it! Publish Webflow once.

---

## 📝 How to Add Scripts

### Add a Script to ALL Pages

1. **Edit the Webflow site settings code above:**
```javascript
// Change from:
window.globalScripts = ['alert'];

// To (adding 'tracking'):
window.globalScripts = ['alert', 'tracking'];
```

2. **Create the file:** `src/scripts/tracking.js`

3. **Publish Webflow** (required when changing script lists)

### Add a Script to ONE Page Only

1. **In that page's settings → Custom Code → Before </body>:**
```html
<!-- For one script -->
<script>window.pageScript = 'home';</script>

<!-- OR for multiple scripts -->
<script>window.pageScripts = ['hero', 'testimonials'];</script>
```

2. **Create the file(s):**
   - `src/pages/home.js`
   - `src/pages/hero.js`
   - `src/pages/testimonials.js`

3. **Publish Webflow** (required when adding page scripts)

---

## 🔄 Daily Workflow

### Start Working
```bash
npm run dev
```
Keep this running while you work.

### Edit Scripts
1. Edit any `.js` file in `src/`
2. Save the file
3. Refresh your staging site
4. See changes instantly! (No Webflow publish needed)

### Deploy to Production
```bash
git add .
git commit -m "Update scripts"
git push
```
Wait 2 minutes → Changes are live on production

---

## 📂 Where Scripts Live

```
src/
├── scripts/        # Global scripts (load on every page)
│   ├── alert.js    # Test alert (shows after 5 seconds)
│   └── [your-script].js
│
└── pages/         # Page-specific scripts
    ├── home.js
    ├── about.js
    └── contact.js
```

---

## ❓ Common Questions

### When do I need to publish Webflow?
Only when you:
- Add/remove scripts from the lists
- Change page elements/styles
- Add script tags to new pages

NOT needed when:
- Editing existing script files
- Fixing bugs in JavaScript
- Tweaking functionality

### What about critical CSS or head scripts?
Put those directly in Webflow! This system is for JavaScript functionality only.

### Script not loading?
Check:
1. Is `npm run dev` running?
2. Did you add the script name to Webflow?
3. Did you publish Webflow after adding?
4. Check browser console for errors

---

## 🎯 Quick Examples

### Example: Add popup functionality to homepage

**Step 1:** In homepage settings add:
```html
<script>window.pageScript = 'home-popup';</script>
```

**Step 2:** Create `src/pages/home-popup.js`:
```javascript
console.log('Popup script loaded');

// Show popup after 3 seconds
setTimeout(() => {
  alert('Welcome to our site!');
}, 3000);
```

**Step 3:** Publish Webflow → Done!

### Example: Add tracking to all pages

**Step 1:** Update site settings:
```javascript
window.globalScripts = ['alert', 'analytics'];
```

**Step 2:** Create `src/scripts/analytics.js`:
```javascript
console.log('Analytics loaded');

// Track page views
console.log('Page viewed:', window.location.pathname);
```

**Step 3:** Publish Webflow → Tracking on every page!

---

## 🚦 Status Check

✅ **It's working if you see in console:**
- "Script Router initialized"
- "Environment: Development" (on staging)
- "Loaded: scripts/animations"
- Your custom console.log messages

❌ **If not working:**
- Make sure `npm run dev` is running
- Hard refresh (Cmd+Shift+R)
- Check the script name matches exactly
- Verify you published Webflow after changes