const fs = require('fs');
const path = require('path');

const distDir = 'dist';
const assetsDir = path.join(distDir, 'assets');

const files = fs.readdirSync(assetsDir);
const cssFile = files.find(f => f.endsWith('.css'));
const jsFile = files.find(f => f.endsWith('.js'));

let html = fs.readFileSync(path.join(distDir, 'index.html'), 'utf8');
const css = fs.readFileSync(path.join(assetsDir, cssFile), 'utf8');
const js = fs.readFileSync(path.join(assetsDir, jsFile), 'utf8');

// Replace CSS
html = html.replace(/<link rel="stylesheet".*?>/, `<style>${css}</style>`);
// Replace JS
html = html.replace(/<script type="module".*?><\/script>/, `<script type="module">${js}</script>`);

fs.writeFileSync('Standalone_Platform.html', html);
console.log('Standalone_Platform.html created successfully.');
