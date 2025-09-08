# Direct Testing Steps

## 1. Install Dependencies & Start Dev Server

```bash
npm install
npm run dev
```

Keep this terminal running. You should see:
```
VITE v5.x.x  ready in XXX ms
➜  Local:   http://localhost:3000/
```

## 2. Add to Webflow Site Settings

Go to your Webflow project → Site Settings → Custom Code → Head Code

Add this exact code:

```html
<script>
(function() {
  const isDev = location.hostname.includes('.webflow.io');
  const baseUrl = isDev 
    ? 'http://localhost:3000/src' 
    : 'https://julianmemberstack.github.io/webflow-vibe-scripts/dist';
  
  // Global scripts - these load on every page
  window.ScriptConfig = {
    global: {
      head: [],                      // Leave empty for now
      body: ['animations', 'forms']  // Test scripts
    }
  };
  
  // Load the router
  const script = document.createElement('script');
  script.src = baseUrl + '/router.js';
  document.head.appendChild(script);
})();
</script>
```

## 3. Add Test Script to Homepage

In Webflow Designer:
1. Go to your Homepage
2. Go to Page Settings (gear icon)
3. Custom Code → Before </body> tag
4. Add:

```html
<script>window.pageScript = 'home';</script>
```

## 4. Publish to Staging & Test

1. **Publish to Staging** (yoursite.webflow.io)
2. **Open your staging site** in a new tab
3. **Open DevTools Console** (F12 or Cmd+Option+I)
4. **You should see:**
   - "Script Router initialized"
   - "Base URL: http://localhost:3000/src"
   - "Environment: Development"
   - "Animations script loaded"
   - "Forms script loaded"
   - "Home page script loaded"

## 5. Test Hot Reload

1. **Edit** `/src/pages/home.js`
2. **Change** line 2 from:
   ```javascript
   console.log('Home page script loaded');
   ```
   To:
   ```javascript
   console.log('🔥 Home page script loaded - HOT RELOAD WORKS!');
   ```
3. **Save the file**
4. **Refresh your staging site**
5. **Check console** - you should see the new message immediately!

## 6. Test Animation Features

Add this to any element in Webflow:
- Custom attribute: `data-animate` = `fade-in`

The element should fade in when scrolled into view.

## 7. Test Form Enhancement

Add this to any form in Webflow:
- Custom attribute: `data-enhance` = `true`

The form will get email validation and loading states.

## 8. Enable GitHub Pages (One Time)

1. Go to: https://github.com/julianmemberstack/webflow-vibe-scripts/settings/pages
2. Under "Build and deployment"
3. Source: Select "GitHub Actions"
4. Save

## 9. Test Production (After GitHub Pages Setup)

1. **Wait 2-3 minutes** for GitHub Actions to complete
2. **Check deployment**: https://github.com/julianmemberstack/webflow-vibe-scripts/actions
3. **Test production URL**: https://julianmemberstack.github.io/webflow-vibe-scripts/dist/router.js
   - Should load the router file
4. **Publish to your live domain**
5. **Check console** on live site:
   - Should show "Environment: Production"
   - Scripts load from GitHub Pages

## Quick Troubleshooting

### "Script Router not found" error
- Make sure `npm run dev` is running
- Check if localhost:3000 is accessible

### Scripts not loading on staging
- Check browser console for CORS errors
- Make sure you're on `.webflow.io` domain
- Verify dev server is running

### Changes not appearing
- Hard refresh: Cmd+Shift+R (Mac) or Ctrl+F5 (Windows)
- Check that you saved the file
- Verify dev server didn't crash

### Production not working
- Check GitHub Actions completed: https://github.com/julianmemberstack/webflow-vibe-scripts/actions
- Verify GitHub Pages is enabled
- Test the direct URL: https://julianmemberstack.github.io/webflow-vibe-scripts/dist/router.js

## Success Checklist

✅ Dev server running (`npm run dev`)  
✅ Console shows "Script Router initialized"  
✅ Scripts load on staging from localhost:3000  
✅ Hot reload works (edit file → refresh → see changes)  
✅ GitHub Actions deployed successfully  
✅ Production loads from GitHub Pages  

## What You've Eliminated

❌ No more copy-pasting code to Webflow  
❌ No waiting for Webflow publish to test  
❌ No losing code changes  
❌ No manual version management  
❌ No debugging in Webflow's tiny code editor