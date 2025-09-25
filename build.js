const esbuild = require('esbuild');
const fs = require('fs');
const path = require('path');

const isProduction = process.env.ELEVENTY_ENV === 'production';

async function buildAssets() {
    if (!isProduction) {
        console.log('Skipping asset minification in development mode');
        return;
    }

    console.log('Building and minifying assets...');

    // Ensure output directory exists
    if (!fs.existsSync('_site/_css')) {
        fs.mkdirSync('_site/_css', { recursive: true });
    }

    if (!fs.existsSync('_site/_js')) {
        fs.mkdirSync('_site/_js', { recursive: true });
    }

    // Build and minify CSS
    try {
        const cssInput = 'src/_css/custom.css';
        const cssOutput = '_site/_css/custom.min.css';

        await esbuild.build({
            entryPoints: [cssInput],
            outfile: cssOutput,
            minify: true,
            loader: { '.css': 'css' }
        });

        console.log('✓ CSS minified');
    } catch (error) {
        console.error('CSS build error:', error);
    }

    // Build and minify JS
    try {
        const jsInput = '_includes/scripts.js';
        const jsOutput = '_site/_js/scripts.min.js';

        await esbuild.build({
            entryPoints: [jsInput],
            outfile: jsOutput,
            minify: true,
            target: 'es2017'
        });

        console.log('✓ JS minified');
    } catch (error) {
        console.error('JS build error:', error);
    }
}

if (require.main === module) {
    buildAssets();
}

module.exports = { buildAssets };