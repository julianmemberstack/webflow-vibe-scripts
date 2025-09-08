# Webflow Setup Instructions

## Step 1: Site-Wide Router Setup

Add this code to **Site Settings → Custom Code → Head Code**:

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

## Step 2: Page-Specific Scripts

Add these to individual page settings or in an HTML Embed on the page:

### Option A: One Script
```html
<script>window.pageScript = 'home';</script>
```

### Option B: Multiple Scripts
```html
<script>window.pageScripts = ['slider', 'gallery'];</script>
```

**⚠️ Important:** Put critical CSS and head scripts directly in Webflow's Custom Code! This system is optimized for JavaScript functionality that can load after the page renders.

## Step 3: Testing Your Setup

1. **For Development:**
   - Run `npm run dev` in your terminal
   - Open your staging site (yoursite.webflow.io)
   - Open browser DevTools console
   - You should see "Script Router initialized" and "Environment: Development"

2. **For Production:**
   - Push your code to GitHub
   - Wait for GitHub Actions to complete (~2 minutes)
   - Visit your live site
   - Check console for "Environment: Production"

## Common Patterns

### Load Different Scripts Based on Page Path

```html
<script>
// In site-wide head code, after ScriptConfig
const path = window.location.pathname;
if (path === '/') {
  window.pageScript = 'home';
} else if (path.startsWith('/blog')) {
  window.pageScript = 'blog';
} else if (path.startsWith('/shop')) {
  window.pageScripts = {
    head: ['shop-critical'],
    body: ['shop-cart', 'shop-filters']
  };
}
</script>
```

### Conditional Script Loading

```html
<script>
// Load scripts based on user type or feature flags
const isLoggedIn = document.cookie.includes('user_session');
if (isLoggedIn) {
  window.pageScripts = {
    body: ['user-dashboard', 'user-settings']
  };
}
</script>
```

### Data Attributes for Script Configuration

```html
<!-- Add to any element -->
<div data-animate="fade-in" data-delay="200">Content</div>
<form data-enhance data-autosave>...</form>
<div class="testimonial" data-autoplay="5000">...</div>
```

## Script Naming Conventions

- **Global scripts** (`src/scripts/`): Feature-based names
  - `analytics.js` - Analytics tracking
  - `forms.js` - Form enhancements
  - `modals.js` - Modal functionality
  - `navigation.js` - Navigation enhancements

- **Page scripts** (`src/pages/`): Page or template names
  - `home.js` - Homepage specific
  - `product.js` - Product page template
  - `checkout.js` - Checkout flow
  - `blog-post.js` - Blog post template

## Debugging Tips

### Check if Scripts are Loading

```javascript
// Add to browser console
console.log('Router loaded:', !!window.ScriptRouter);
console.log('Environment:', window.ScriptRouter?.environment);
console.log('Base URL:', window.ScriptRouter?.baseUrl);
```

### Monitor Script Loading

```javascript
// Add to site-wide code
window.addEventListener('scriptsLoaded', (e) => {
  console.log('✅ All scripts loaded', e.detail);
});
```

### Force Reload Scripts (Development)

```javascript
// Run in console to reload all scripts
location.reload(true);
```

## Performance Tips

1. **Use `head` placement sparingly** - Only for critical scripts
2. **Lazy load heavy features** - Load on interaction/scroll
3. **Combine related functionality** - Reduce number of scripts
4. **Remove console.logs in production** - Keep them in dev only

## Webflow Publishing

**Important:** You do NOT need to republish Webflow every time you change scripts!

- **Development**: Changes appear instantly on staging site
- **Production**: Changes appear after GitHub push (~2 minutes)

Only republish Webflow when you:
- Change the site-wide router code
- Add/remove page-specific script tags
- Modify Webflow elements/styles