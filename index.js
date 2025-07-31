#!/usr/bin/env node
import { program } from 'commander';
import inquirer from 'inquirer';
import fs from 'fs-extra';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';
import { execSync } from 'child_process';

// Define __dirname equivalent for ESM
const __dirname = dirname(fileURLToPath(import.meta.url));

program
  .version('1.0.0')
  .description('CLI to scaffold MERN stack backend templates')
  .arguments('[projectName]')
  .action(async (projectName = 'backend') => {
    const targetDir = resolve(process.cwd(), projectName);

    // Check if directory exists
    if (fs.existsSync(targetDir)) {
      console.error(`Error: Directory ${projectName} already exists. Please choose a different name.`);
      process.exit(1);
    }

    // Prompt for template and options
    const answers = await inquirer.prompt([
      {
        type: 'list',
        name: 'template',
        message: 'Choose a template for your MERN backend:',
        choices: [
          'Minimal Backend',
          'REST API',
          'Authentication',
          'TypeScript',
          'Full-Featured Starter',
        ],
      },
      {
        type: 'confirm',
        name: 'useTypeScript',
        message: 'Use TypeScript? (Only applies to non-TypeScript templates)',
        default: false,
        when: (ans) => ans.template !== 'TypeScript',
      },
      {
        type: 'confirm',
        name: 'installDeps',
        message: 'Install dependencies automatically?',
        default: true,
      },
    ]);

    const { template, useTypeScript, installDeps } = answers;
    const templateDir = resolve(__dirname, 'templates', template.toLowerCase().replace(/\s+/g, '-'));

    try {
      // Copy template files
      await fs.copy(templateDir, targetDir);

      // Update package.json with project name
      const pkgPath = resolve(targetDir, 'package.json');
      const pkg = await fs.readJson(pkgPath);
      pkg.name = projectName;
      await fs.writeJson(pkgPath, pkg, { spaces: 2 });

      // Handle TypeScript conversion if selected
      if (useTypeScript && template !== 'TypeScript') {
        await convertToTypeScript(targetDir);
      }

      // Install dependencies if requested
      if (installDeps) {
        console.log('Installing dependencies...');
        execSync('npm install', { cwd: targetDir, stdio: 'inherit' });
      }

      // Display success message with instructions
      console.log(`
🎉 MERN backend "${projectName}" created successfully using the ${template} template!

To get started:
  cd ${projectName}
  ${installDeps ? '' : 'npm install\n  '}npm start

Next steps:
  1. Update .env with your MongoDB URI
  2. Explore the ${template} structure in the README.md
`);
    } catch (err) {
      console.error('Error creating project:', err.message);
      process.exit(1);
    }
  });

async function convertToTypeScript(targetDir) {
  // Rename .js files to .ts
  const files = await fs.readdir(targetDir, { recursive: true });
  for (const file of files) {
    if (file.endsWith('.js')) {
      const newFile = file.replace('.js', '.ts');
      await fs.rename(resolve(targetDir, file), resolve(targetDir, newFile));
    }
  }

  // Update package.json with TypeScript dependencies
  const pkgPath = resolve(targetDir, 'package.json');
  const pkg = await fs.readJson(pkgPath);
  pkg.devDependencies = {
    ...pkg.devDependencies,
    typescript: '^5.0.0',
    '@types/node': '^20.0.0',
    '@types/express': '^4.17.0',
  };
  pkg.scripts = {
    ...pkg.scripts,
    build: 'tsc',
    dev: 'tsc --watch & nodemon dist/index.js',
    start: 'node dist/index.js',
  };
  pkg.main = 'dist/index.js';
  await fs.writeJson(pkgPath, pkg, { spaces: 2 });

  // Add tsconfig.json
  const tsconfig = {
    compilerOptions: {
      target: 'es6',
      module: 'commonjs',
      strict: true,
      esModuleInterop: true,
      skipLibCheck: true,
      outDir: './dist',
      rootDir: './src',
    },
  };
  await fs.writeJson(resolve(targetDir, 'tsconfig.json'), tsconfig, { spaces: 2 });
}

program.parse(process.argv);