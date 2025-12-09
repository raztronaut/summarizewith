const esbuild = require('esbuild');
const fs = require('fs');
const path = require('path');

const isWatch = process.argv.includes('--watch');

// Shared build options
const sharedOptions = {
  entryPoints: ['src/index.ts'],
  bundle: true,
  minify: true,
  sourcemap: true,
  target: ['es2020'],
  loader: {
    '.svg': 'text',
  },
};

// Build IIFE for script tag usage
const iifeOptions = {
  ...sharedOptions,
  outfile: 'dist/summarize-widget.iife.js',
  format: 'iife',
  globalName: 'SummarizeWidget',
  footer: {
    js: '// Expose init directly on the global for convenience\nif(typeof window!=="undefined"){window.SummarizeWidget=SummarizeWidget.SummarizeWidget||SummarizeWidget;}'
  }
};

// Build ESM for bundler usage
const esmOptions = {
  ...sharedOptions,
  outfile: 'dist/summarize-widget.esm.js',
  format: 'esm',
};

// Generate TypeScript declarations
async function generateTypes() {
  const { execSync } = require('child_process');
  try {
    execSync('npx tsc', {
      stdio: 'inherit'
    });
    console.log('✓ TypeScript declarations generated');
  } catch (e) {
    console.warn('⚠ TypeScript declarations generation failed (non-critical)');
  }
}

async function build() {
  // Ensure dist directory exists
  if (!fs.existsSync('dist')) {
    fs.mkdirSync('dist');
  }

  if (isWatch) {
    // Watch mode
    const iifeCtx = await esbuild.context(iifeOptions);
    const esmCtx = await esbuild.context(esmOptions);
    
    await Promise.all([
      iifeCtx.watch(),
      esmCtx.watch()
    ]);
    
    console.log('👀 Watching for changes...');
  } else {
    // Production build
    await Promise.all([
      esbuild.build(iifeOptions),
      esbuild.build(esmOptions)
    ]);
    
    console.log('✓ IIFE build complete: dist/summarize-widget.iife.js');
    console.log('✓ ESM build complete: dist/summarize-widget.esm.js');
    
    await generateTypes();
    
    console.log('\n✅ Build complete!');
  }
}

build().catch((e) => {
  console.error(e);
  process.exit(1);
});

