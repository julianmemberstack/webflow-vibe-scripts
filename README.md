# Create Webflow Scripts - Stop Copy-Pasting Code to Webflow!

Write JavaScript locally, see changes instantly, deploy automatically. No more tiny code boxes in Webflow!

[![npm version](https://img.shields.io/npm/v/create-webflow-scripts.svg)](https://www.npmjs.com/package/create-webflow-scripts)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

## 🎓 Complete Setup Guide

### Step 1: Create Your Project
Open a terminal in your projects folder (e.g., `Desktop/Projects`) and run:
```bash
npx create-webflow-scripts my-awesome-site
```

Go through the setup wizard:
- Enter your GitHub username
- Enter repository name (recommend: same as folder name)
- Enter your Webflow staging domain (e.g., "awesome.webflow.io")
- Enter production domain (optional, press Enter to skip)
- Choose to use GitHub Pages (recommended: yes)

### Step 2: Install Dependencies and Start Development
Open a NEW terminal window in the newly created project folder:
```bash
cd my-awesome-site
npm install
npm run dev
```
Leave this running - it's your development server!

### Step 3: Create GitHub Repository
1. Go to [github.com/new](https://github.com/new)
2. Name it the same as your folder (e.g., "my-awesome-site")
3. DON'T initialize with README (you already have one)
4. Create repository
5. Copy the repository URL

### Step 4: Push Code to GitHub
In your project folder, run:
```bash
git init
git add .
git commit -m "Initial setup"
git remote add origin YOUR_GITHUB_REPO_URL
git push -u origin main
```

### Step 5: Enable GitHub Pages
1. Go to your repo on GitHub
2. Click Settings → Pages
3. Under "Source", select "GitHub Actions"
4. Save

Your scripts will now auto-deploy when you push to main!

### Step 6: Add to Webflow and Test
1. Copy the embed code from `webflow-embed-code.html`
2. In Webflow: Site Settings → Custom Code → Head Code
3. Paste the embed code
4. Publish your Webflow site
5. Open your `.webflow.io` site
6. Open browser console (F12)
7. You should see "Alert script loaded!" after 5 seconds

✅ **Setup Complete!** You're now ready to develop scripts with hot reload!

## 🎬 Live Demo

Want to see it in action? Check out the working demo:

- **Demo Repository:** [github.com/julianmemberstack/webflow-vibe-scripts](https://github.com/julianmemberstack/webflow-vibe-scripts)
- **Live Scripts:** [julianmemberstack.github.io/webflow-vibe-scripts](https://julianmemberstack.github.io/webflow-vibe-scripts)
- **Example Webflow Site:** *(Add your demo .webflow.io site here)*

### Demo Embed Code (This is what I use):
```html
<script>
(function() {
  // UNCOMMENT the next line to force PRODUCTION mode (test before going live!)
  // window.SCRIPT_BASE_URL = 'https://julianmemberstack.github.io/webflow-vibe-scripts/src';
  
  const isDev = location.hostname.includes('.webflow.io');
  const baseUrl = window.SCRIPT_BASE_URL || (isDev 
    ? 'http://localhost:3000/src' 
    : 'https://julianmemberstack.github.io/webflow-vibe-scripts/src');
  
  // Scripts that load on EVERY page - comment the next line out if you don't want any sitewide scripts
  window.globalScripts = ['alert'];  // Comment this entire line out if no global scripts needed
  
  // Load the router
  const script = document.createElement('script');
  script.src = baseUrl + '/router.js';
  document.head.appendChild(script);
})();
</script>
```

**Note:** When YOU run `npx create-webflow-scripts`, you'll get YOUR OWN personalized embed code with YOUR GitHub username and repo!

## 🎯 What Problems This Solves

| Problem | Solution |
|---------|----------|
| **Tiny code editor in Webflow** | Write in VS Code or any editor |
| **No way to test code** | Hot reload - see changes instantly |
| **Code gets lost/overwritten** | Everything in GitHub with version control |
| **Hard to organize scripts** | Clean file structure, one script per file |
| **Slow publish cycle** | Changes appear instantly in development |

## 📦 What You Get After Installation

When you run `npx create-webflow-scripts my-project`, you get:

1. **Personalized Project Structure:**
   ```
   my-project/
   ├── src/
   │   ├── router.js          # Script router (customized with YOUR URLs)
   │   └── scripts/           
   │       └── alert.js       # Example script
   ├── dist/                  # Production build
   ├── .github/workflows/     # GitHub Pages auto-deploy
   ├── package.json           # Your project config
   └── README.md              # Instructions with YOUR GitHub info!
   ```

2. **Custom README** with:
   - YOUR GitHub username
   - YOUR repository name
   - YOUR domains
   - YOUR personalized embed code

3. **Ready-to-use Commands:**
   - `npm run dev` - Start development
   - `npm run build` - Build for production
   - `npm run new-script` - Create new scripts
   - `npm run embed-code` - Show your embed code

## 🛠 How It Works

### Development Mode
1. Your Webflow staging site (.webflow.io) loads scripts from `localhost:3000`
2. Edit files locally → Save → Refresh browser → See changes instantly
3. No Webflow publish needed for JavaScript changes!

### Production Mode
1. Push to GitHub → GitHub Actions builds automatically
2. Scripts deployed to GitHub Pages (free hosting!)
3. Your live site loads from `https://[your-username].github.io/[your-repo]`

## 🚀 Working with Scripts

### Creating New Scripts
```bash
npm run new-script my-script-name
# or manually:
# webflow-scripts new my-script-name
```

This creates `src/scripts/my-script-name.js` with a template.

To use it:
- **Global (all pages):** Add `'my-script-name'` to `window.globalScripts` in your embed code
- **Specific page:** Add to that page's custom code:
  ```html
  <script>
    window.pageScripts = ['my-script-name'];
  </script>
  ```

### Testing Production Mode Locally
Want to test production scripts before going live? In your Webflow embed code:

1. Find this line:
   ```javascript
   // window.SCRIPT_BASE_URL = 'https://yourusername.github.io/yourrepo/src';
   ```

2. Uncomment it (remove the `//`):
   ```javascript
   window.SCRIPT_BASE_URL = 'https://yourusername.github.io/yourrepo/src';
   ```

3. Publish to Webflow and test - it will now load from GitHub Pages instead of localhost

4. **Don't forget to comment it back out** when done testing!

### Deploying Updates
After making changes to your scripts:
```bash
git add .
git commit -m "Update scripts"
git push
```

GitHub Actions will automatically build and deploy to GitHub Pages (takes ~2 minutes).

## 📝 Usage Examples

### Global Script (Loads on Every Page)
```javascript
// src/scripts/analytics.js
console.log('Analytics loaded on every page');
```

In Webflow embed code:
```javascript
window.globalScripts = ['analytics'];
```

### Page-Specific Script (Single)
```javascript
// src/scripts/confetti.js
console.log('Confetti script loaded for this page');
```

In that page's settings (Custom Code → Before </body> tag):
```html
<script>
  window.pageScripts = ['confetti'];
</script>
```

### Multiple Scripts on One Page
```javascript
// src/scripts/slider.js
console.log('Slider initialized');

// src/scripts/testimonials.js
console.log('Testimonials loaded');
```

In that page's settings:
```html
<script>
  window.pageScripts = ['slider', 'testimonials'];
</script>
```

## ❓ FAQ

### Why not just use Webflow's custom code?
- **Better editor** - Use VS Code with syntax highlighting, autocomplete, etc.
- **Version control** - Never lose code, track changes, collaborate
- **Hot reload** - See changes instantly without publishing
- **Organization** - Multiple files instead of one giant script block

### Is this free to use?
Yes! The tool is free, and GitHub Pages hosting is free too.

### Can I use this with multiple Webflow projects?
Yes! Create a separate project for each Webflow site:
```bash
npx create-webflow-scripts project-1
npx create-webflow-scripts project-2
```

### Do I need to know Git?
Basic Git knowledge helps, but the setup guide provides all commands you need!

## 🤝 Contributing

Found a bug or have a feature request? [Open an issue](https://github.com/julianmemberstack/webflow-vibe-scripts/issues)!

## 📄 License

MIT © Julian Galluzzo

---

**Built with ❤️ for the Webflow community**