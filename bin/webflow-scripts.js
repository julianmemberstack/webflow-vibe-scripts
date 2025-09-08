#!/usr/bin/env node

import { program } from 'commander';
import inquirer from 'inquirer';
import chalk from 'chalk';
import fs from 'fs-extra';
import path from 'path';
import { fileURLToPath } from 'url';
import { execSync } from 'child_process';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load package.json for version
const packageJson = JSON.parse(fs.readFileSync(path.join(__dirname, '../package.json'), 'utf8'));

// Check if running via npx create-webflow-scripts
// This can happen in two ways:
// 1. Script path includes 'create-webflow-scripts' 
// 2. Called with a non-command argument (likely a project name)
const scriptPath = process.argv[1];
const isNpxCreate = scriptPath.includes('create-webflow-scripts');

// Also check if first argument is not a known command
const knownCommands = ['init', 'new', 'embed', 'test', '--help', '-h', '--version', '-V'];
const firstArg = process.argv[2];
const isLikelyProjectName = firstArg && !knownCommands.includes(firstArg) && !firstArg.startsWith('-');

// If it looks like a project name and we're in an npx context, treat it as create mode
const shouldRunCreate = isNpxCreate || isLikelyProjectName;

async function createProject(projectName) {
  const targetDir = projectName ? path.resolve(projectName) : process.cwd();
  const projectDirName = path.basename(targetDir);
  
  // Check if directory exists and is not empty
  if (projectName && fs.existsSync(targetDir)) {
    const files = fs.readdirSync(targetDir);
    if (files.length > 0) {
      console.log(chalk.red(`\n❌ Directory "${projectName}" already exists and is not empty!`));
      process.exit(1);
    }
  }

  console.log(chalk.blue('\n🚀 Welcome to Webflow Scripts!\n'));
  console.log('This tool will set up a development environment for your Webflow scripts.\n');

  // Collect user information
  const answers = await inquirer.prompt([
    {
      type: 'input',
      name: 'githubUsername',
      message: 'What is your GitHub username?',
      validate: input => input.length > 0 || 'Please enter your GitHub username'
    },
    {
      type: 'input',
      name: 'repoName',
      message: 'What will be your GitHub repository name?',
      default: projectDirName,
      validate: input => input.length > 0 || 'Please enter a repository name'
    },
    {
      type: 'input',
      name: 'webflowDomain',
      message: 'What is your Webflow staging domain? (e.g., your-site.webflow.io)',
      validate: input => {
        if (!input) return 'Please enter your Webflow domain';
        if (!input.includes('.webflow.io')) {
          return 'Domain should end with .webflow.io';
        }
        return true;
      }
    },
    {
      type: 'input',
      name: 'customDomain',
      message: 'What is your production domain? (optional, press Enter to skip)',
      default: ''
    },
    {
      type: 'confirm',
      name: 'useGitHubPages',
      message: 'Do you want to use GitHub Pages for hosting?',
      default: true
    }
  ]);

  console.log(chalk.green('\n✅ Creating your project...\n'));

  // Create project directory if needed
  if (projectName) {
    fs.ensureDirSync(targetDir);
    process.chdir(targetDir);
    console.log(chalk.gray(`✓ Created directory: ${projectName}`));
  }

  // Initialize package.json for the user's project
  const userPackageJson = {
    name: answers.repoName,
    version: '1.0.0',
    description: 'Webflow scripts with hot reload development',
    type: 'module',
    scripts: {
      'dev': 'vite',
      'build': 'vite build',
      'preview': 'vite preview',
      'deploy': 'npm run build && git add dist && git commit -m "Deploy build" && git push',
      'new-script': 'webflow-scripts new',
      'embed-code': 'webflow-scripts embed',
      'test-connection': 'webflow-scripts test'
    },
    devDependencies: {
      'vite': '^5.0.0'
    }
  };

  fs.writeJsonSync('./package.json', userPackageJson, { spaces: 2 });
  console.log(chalk.gray('✓ Created package.json'));

  // Save configuration
  const config = {
    githubUsername: answers.githubUsername,
    repoName: answers.repoName,
    webflowDomain: answers.webflowDomain,
    customDomain: answers.customDomain,
    useGitHubPages: answers.useGitHubPages,
    setupDate: new Date().toISOString()
  };

  fs.writeJsonSync('.webflow-scripts.json', config, { spaces: 2 });
  console.log(chalk.gray('✓ Created configuration file'));

  // Copy template files
  const templatesDir = path.join(__dirname, '../templates');
  
  // Copy source files
  console.log(chalk.gray('✓ Copying template files...'));
  fs.copySync(path.join(templatesDir, 'src'), './src');
  
  // Copy and customize router.js
  let routerContent = fs.readFileSync(path.join(templatesDir, 'src/router.js'), 'utf8');
  const githubPagesUrl = `https://${answers.githubUsername}.github.io/${answers.repoName}`;
  routerContent = routerContent.replace('{{GITHUB_PAGES_URL}}', githubPagesUrl);
  fs.writeFileSync('./src/router.js', routerContent);

  // Copy GitHub workflow if using GitHub Pages
  if (answers.useGitHubPages) {
    fs.copySync(path.join(templatesDir, '.github'), './.github');
    console.log(chalk.gray('✓ Created GitHub Actions workflow'));
  }

  // Copy vite.config.js
  fs.copySync(path.join(templatesDir, 'vite.config.js'), './vite.config.js');
  console.log(chalk.gray('✓ Created Vite configuration'));

  // Generate custom README for this project
  const customReadme = `# ${answers.repoName} - Webflow Scripts

This project was created with [create-webflow-scripts](https://www.npmjs.com/package/create-webflow-scripts).

## 🚀 Your Project Setup

- **GitHub Username:** ${answers.githubUsername}
- **Repository:** ${answers.repoName}
- **Webflow Domain:** ${answers.webflowDomain}
${answers.customDomain ? `- **Production Domain:** ${answers.customDomain}` : ''}
${answers.useGitHubPages ? `- **GitHub Pages URL:** https://${answers.githubUsername}.github.io/${answers.repoName}` : ''}

## 📋 Webflow Embed Code

Copy this code to your Webflow Site Settings → Custom Code → Head:

\`\`\`html
<script>
(function() {
  const isDev = location.hostname.includes('.webflow.io');
  const baseUrl = isDev 
    ? 'http://localhost:3000/src' 
    : '${githubPagesUrl}';
  
  // Scripts that load on EVERY page
  window.globalScripts = ['alert'];  // Add your global scripts here
  
  // Load the router
  const script = document.createElement('script');
  script.src = baseUrl + '/router.js';
  document.head.appendChild(script);
})();
</script>
\`\`\`

## 🛠 Development

### Start Development Server
\`\`\`bash
npm run dev
\`\`\`

### Create New Script
\`\`\`bash
npm run new-script my-script-name
\`\`\`

### Build for Production
\`\`\`bash
npm run build
\`\`\`

## 📁 Project Structure

\`\`\`
${answers.repoName}/
├── src/
│   ├── router.js          # Script router (don't modify)
│   └── scripts/           # Your scripts go here
│       └── alert.js       # Example script
├── dist/                  # Production build (auto-generated)
├── .github/
│   └── workflows/
│       └── deploy.yml     # GitHub Pages deployment
└── package.json
\`\`\`

## 🚢 Deploy to GitHub Pages

1. **Initialize Git:**
   \`\`\`bash
   git init
   git add .
   git commit -m "Initial setup"
   \`\`\`

2. **Create GitHub Repository:**
   - Go to https://github.com/new
   - Name it: **${answers.repoName}**
   - Don't initialize with README
   - Create repository

3. **Push to GitHub:**
   \`\`\`bash
   git remote add origin https://github.com/${answers.githubUsername}/${answers.repoName}.git
   git push -u origin main
   \`\`\`

4. **Enable GitHub Pages:**
   - Go to https://github.com/${answers.githubUsername}/${answers.repoName}/settings/pages
   - Under "Source", select **GitHub Actions**
   - Save

5. **Deploy:**
   Every push to main will auto-deploy!

## 📝 Adding Scripts

### Global Script (loads on every page)
1. Create: \`src/scripts/my-script.js\`
2. Update embed code: \`window.globalScripts = ['my-script'];\`
3. Publish Webflow

### Page-Specific Script
1. Create: \`src/scripts/contact-form.js\`
2. In page settings add:
   \`\`\`html
   <script>window.pageScript = 'contact-form';</script>
   \`\`\`
3. Publish Webflow

## 🆘 Troubleshooting

- **Scripts not loading?** Check browser console (F12)
- **Dev server running?** Should see "VITE ready" in terminal
- **Published Webflow?** Required after adding embed code
- **Hard refresh:** Cmd+Shift+R (Mac) or Ctrl+F5 (Windows)

## 📚 Learn More

- [Full Documentation](https://github.com/julianmemberstack/webflow-vibe-scripts)
- [Report Issues](https://github.com/julianmemberstack/webflow-vibe-scripts/issues)
`;

  fs.writeFileSync('./README.md', customReadme);
  console.log(chalk.gray('✓ Created custom README'));

  // Generate embed code file
  const embedCode = `<!-- Copy this to Webflow Site Settings → Custom Code → Head -->
<script>
(function() {
  // UNCOMMENT the next line to force PRODUCTION mode (test before going live!)
  // window.SCRIPT_BASE_URL = '${githubPagesUrl}/dist';
  
  const isDev = location.hostname.includes('.webflow.io');
  const baseUrl = window.SCRIPT_BASE_URL || (isDev 
    ? 'http://localhost:3000/src' 
    : '${githubPagesUrl}/dist');
  
  // Scripts that load on EVERY page
  window.globalScripts = ['alert'];  // Add your global scripts here
  
  // Load the router
  const script = document.createElement('script');
  script.src = baseUrl + '/router.js';
  document.head.appendChild(script);
})();
</script>`;

  fs.writeFileSync('./webflow-embed-code.html', embedCode);
  console.log(chalk.gray('✓ Created webflow-embed-code.html'));

  // Install dependencies
  console.log(chalk.blue('\n📦 Installing dependencies...\n'));
  try {
    execSync('npm install', { stdio: 'inherit' });
    console.log(chalk.green('\n✅ Dependencies installed!'));
  } catch (error) {
    console.log(chalk.yellow('\n⚠️  Please run "npm install" manually'));
  }

  // Final instructions
  console.log(chalk.green('\n🎉 Project created successfully!\n'));
  
  if (projectName) {
    console.log(chalk.cyan(`cd ${projectName}`));
  }
  
  console.log(chalk.cyan('npm run dev') + chalk.gray(' - Start development server'));
  console.log();
  console.log(chalk.blue('📋 Next Steps:\n'));
  console.log('1. Copy the embed code from ' + chalk.yellow('webflow-embed-code.html'));
  console.log('2. Paste it in Webflow Site Settings → Custom Code → Head');
  console.log('3. Publish your Webflow site');
  console.log('4. Run ' + chalk.cyan('npm run dev') + ' to start developing');
  console.log();
  console.log(chalk.gray('Check README.md for detailed instructions specific to your project!'));
}

// Handle when called directly via npx create-webflow-scripts or with a project name
if (shouldRunCreate) {
  const projectName = process.argv[2];
  if (!projectName) {
    console.log(chalk.red('\n❌ Please specify a project name:'));
    console.log(chalk.cyan('  npx create-webflow-scripts my-project\n'));
    process.exit(1);
  }
  createProject(projectName).then(() => {
    process.exit(0);
  }).catch(err => {
    console.error(chalk.red('Error creating project:'), err);
    process.exit(1);
  });
} else {
  // Normal CLI commands
  program
    .name('webflow-scripts')
    .description('Easy script management for Webflow sites')
    .version(packageJson.version);

  program
    .command('init')
    .description('Initialize Webflow Scripts in current directory')
    .action(() => createProject());

  program
    .command('new <scriptName>')
  .description('Create a new script from template')
  .action(async (scriptName) => {
    const scriptPath = `./src/scripts/${scriptName}.js`;
    
    if (fs.existsSync(scriptPath)) {
      console.log(chalk.red(`Script "${scriptName}" already exists!`));
      process.exit(1);
    }

    const template = `// ${scriptName} Script
// This script loads on pages where you include it

console.log('${scriptName} script loaded');

// Add your code here
// You can access DOM elements, add event listeners, etc.

// Example:
// document.addEventListener('DOMContentLoaded', () => {
//   console.log('DOM ready in ${scriptName}');
// });
`;

    fs.ensureDirSync('./src/scripts');
    fs.writeFileSync(scriptPath, template);
    
    console.log(chalk.green(`✅ Created new script: ${scriptPath}`));
    console.log(chalk.gray('\nTo use this script:'));
    console.log(chalk.gray('- Global: Add "' + scriptName + '" to window.globalScripts in Webflow'));
    console.log(chalk.gray('- Page-specific: Add <script>window.pageScript = "' + scriptName + '";</script> to page settings'));
  });

  program
    .command('embed')
    .description('Generate Webflow embed code')
  .action(() => {
    if (!fs.existsSync('.webflow-scripts.json')) {
      console.log(chalk.red('Project not initialized! Run "webflow-scripts init" first.'));
      process.exit(1);
    }

    const config = fs.readJsonSync('.webflow-scripts.json');
    const githubPagesUrl = `https://${config.githubUsername}.github.io/${config.repoName}`;

    const embedCode = `<script>
(function() {
  // UNCOMMENT the next line to force PRODUCTION mode (test before going live!)
  // window.SCRIPT_BASE_URL = '${githubPagesUrl}/dist';
  
  const isDev = location.hostname.includes('.webflow.io');
  const baseUrl = window.SCRIPT_BASE_URL || (isDev 
    ? 'http://localhost:3000/src' 
    : '${githubPagesUrl}/dist');
  
  // Scripts that load on EVERY page
  window.globalScripts = ['alert'];  // Add your global scripts here
  
  // Load the router
  const script = document.createElement('script');
  script.src = baseUrl + '/router.js';
  document.head.appendChild(script);
})();
</script>`;

    console.log(chalk.blue('📋 Copy this code to your Webflow Site Settings → Custom Code → Head:\n'));
    console.log(chalk.yellow(embedCode));
    
    fs.writeFileSync('./webflow-embed-code.html', embedCode);
    console.log(chalk.gray('\n✓ Embed code saved to webflow-embed-code.html'));
  });

  program
    .command('test')
    .description('Test connection to your Webflow site')
  .action(async () => {
    if (!fs.existsSync('.webflow-scripts.json')) {
      console.log(chalk.red('Project not initialized! Run "webflow-scripts init" first.'));
      process.exit(1);
    }

    const config = fs.readJsonSync('.webflow-scripts.json');
    
    console.log(chalk.blue('\n🔍 Testing configuration...\n'));
    console.log(chalk.gray('GitHub Username: ') + config.githubUsername);
    console.log(chalk.gray('Repository: ') + config.repoName);
    console.log(chalk.gray('Webflow Domain: ') + config.webflowDomain);
    
    if (config.useGitHubPages) {
      const githubPagesUrl = `https://${config.githubUsername}.github.io/${config.repoName}`;
      console.log(chalk.gray('GitHub Pages URL: ') + githubPagesUrl);
    }

    console.log(chalk.green('\n✅ Configuration looks good!'));
    console.log(chalk.gray('\nMake sure to:'));
    console.log('1. Run ' + chalk.cyan('npm run dev') + ' to start the development server');
    console.log('2. Add the embed code to your Webflow site settings');
    console.log('3. Publish your Webflow site');
  });

  program.parse();
}