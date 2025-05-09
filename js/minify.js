/**
 * CSS and JavaScript Minification Script for Filoxenia Moments
 * This script handles minification of CSS and JavaScript files
 */

/**
 * Minify CSS by removing whitespace, comments, and unnecessary characters
 * @param {string} css - CSS content to minify
 * @returns {string} Minified CSS
 */
function minifyCSS(css) {
  return css
    // Remove comments
    .replace(/\/\*[\s\S]*?\*\//g, '')
    // Remove whitespace around rules
    .replace(/\s+/g, ' ')
    // Remove whitespace around selectors
    .replace(/\s*([{}:;,])\s*/g, '$1')
    // Remove semicolons before closing braces
    .replace(/;}/g, '}')
    // Remove leading/trailing whitespace
    .trim();
}

/**
 * Minify JavaScript by removing whitespace, comments, and unnecessary characters
 * @param {string} js - JavaScript content to minify
 * @returns {string} Minified JavaScript
 */
function minifyJS(js) {
  // This is a very basic minification that removes comments and whitespace
  // For production, use a proper minifier like Terser or UglifyJS
  return js
    // Remove single-line comments
    .replace(/\/\/.*$/gm, '')
    // Remove multi-line comments
    .replace(/\/\*[\s\S]*?\*\//g, '')
    // Remove leading/trailing whitespace
    .replace(/^\s+|\s+$/gm, '')
    // Remove extra whitespace
    .replace(/\s+/g, ' ')
    // Remove whitespace around operators and punctuation
    .replace(/\s*([=:+\-*/%,;{}()[\]])\s*/g, '$1');
}

/**
 * Create minified versions of all CSS files
 */
function minifyAllCSS() {
  const cssFiles = [
    'critical.css',
    'main.css',
    'contact.css',
    'portfolio.css',
    'social.css',
    'booking.css'
  ];
  
  cssFiles.forEach(file => {
    // In a real implementation, this would read the file, minify it, and write it back
    console.log(`Minifying css/${file} to css/${file.replace('.css', '.min.css')}`);
    
    /*
    // Example of what the implementation would look like:
    const css = readFile(`css/${file}`);
    const minifiedCSS = minifyCSS(css);
    writeFile(`css/${file.replace('.css', '.min.css')}`, minifiedCSS);
    */
  });
}

/**
 * Create minified versions of all JavaScript files
 */
function minifyAllJS() {
  const jsFiles = [
    'main.js',
    'social.js',
    'contact.js',
    'booking.js',
    'portfolio.js',
    'image-optimize.js'
  ];
  
  jsFiles.forEach(file => {
    // In a real implementation, this would read the file, minify it, and write it back
    console.log(`Minifying js/${file} to js/${file.replace('.js', '.min.js')}`);
    
    /*
    // Example of what the implementation would look like:
    const js = readFile(`js/${file}`);
    const minifiedJS = minifyJS(js);
    writeFile(`js/${file.replace('.js', '.min.js')}`, minifiedJS);
    */
  });
}

/**
 * Update HTML files to use minified assets
 */
function updateHTMLFiles() {
  const htmlFiles = [
    'index.html',
    'contact.html',
    'portfolio.html',
    'booking.html'
  ];
  
  htmlFiles.forEach(file => {
    // In a real implementation, this would read the HTML file, update references, and write it back
    console.log(`Updating ${file} to use minified assets`);
    
    /*
    // Example of what the implementation would look like:
    let html = readFile(file);
    
    // Update CSS references
    html = html.replace(/(href=["'])css\/([^"']+)\.css(["'])/g, '$1css/$2.min.css$3');
    
    // Update JS references
    html = html.replace(/(src=["'])js\/([^"']+)\.js(["'])/g, '$1js/$2.min.js$3');
    
    writeFile(file, html);
    */
  });
}

// In a real implementation, these functions would be called automatically
// during a build process or when the file is run

// Example:
// minifyAllCSS();
// minifyAllJS();
// updateHTMLFiles(); 