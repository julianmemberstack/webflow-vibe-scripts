# Create Webflow Scripts - Stop Copy-Pasting Code to Webflow!

Write JavaScript locally, see changes instantly, deploy automatically. No more tiny code boxes in Webflow!

[![npm version](https://img.shields.io/npm/v/create-webflow-scripts.svg)](https://www.npmjs.com/package/create-webflow-scripts)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

## 🚀 Installation

Create your own Webflow scripts project in seconds:

```bash
npx create-webflow-scripts my-project
cd my-project
npm run dev
```

That's it! The interactive setup will guide you through personalizing everything for YOUR project.

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
  
  // Scripts that load on EVERY page
  window.globalScripts = ['alert'];
  
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

### Page-Specific Script
```javascript
// src/scripts/contact-form.js
console.log('Contact form validation loaded');
```

In that page's settings:
```html
<script>window.pageScript = 'contact-form';</script>
```

### Multiple Scripts on One Page
```html
<script>
window.pageScripts = ['slider', 'testimonials', 'animations'];
</script>
```

## 🎓 Step-by-Step Setup Guide

### 1. Create Your Project
```bash
npx create-webflow-scripts my-awesome-site
cd my-awesome-site
```

### 2. Answer the Setup Questions
- GitHub username (e.g., "johndoe")
- Repository name (e.g., "my-awesome-site")
- Webflow staging domain (e.g., "awesome.webflow.io")
- Production domain (optional)
- Use GitHub Pages? (recommended: yes)

### 3. Add to Webflow
1. Copy the generated embed code from `webflow-embed-code.html`
2. Go to Webflow → Site Settings → Custom Code → Head
3. Paste the code
4. Publish your Webflow site

### 4. Start Developing
```bash
npm run dev
```

Open your `.webflow.io` site and check the console - you should see your scripts loading!

### 5. Deploy to Production
```bash
git init
git add .
git commit -m "Initial setup"
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO.git
git push -u origin main
```

Then in GitHub:
1. Go to Settings → Pages
2. Source: GitHub Actions
3. Save

Every push to `main` now auto-deploys to production!

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
Basic Git knowledge helps, but the setup guide includes all commands you need.

### Can I add CSS too?
This tool is for JavaScript only. Keep CSS in Webflow's designer for best performance.

## 🤝 Contributing

Found a bug? Have an idea? Contributions welcome!

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Open a Pull Request

## 📄 License

MIT - Use this however you want!

## 🆘 Support

- **Issues:** [GitHub Issues](https://github.com/julianmemberstack/webflow-vibe-scripts/issues)
- **Discussions:** [GitHub Discussions](https://github.com/julianmemberstack/webflow-vibe-scripts/discussions)

---

Created with ❤️ for the Webflow community by [@julianmemberstack](https://github.com/julianmemberstack)