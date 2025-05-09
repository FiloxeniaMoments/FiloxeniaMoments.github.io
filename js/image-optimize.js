/**
 * Image Optimization Script for Filoxenia Moments
 * This script handles image resizing and compression
 */

// Image sizes to generate (in pixels)
const IMAGE_SIZES = {
  thumbnail: 300,
  medium: 600,
  large: 1200,
  hero: 1920
};

// Compression quality (0-100)
const COMPRESSION_QUALITY = 80;

// Image formats to generate
const FORMATS = ['webp', 'jpg'];

/**
 * Process all images in the specified directory
 * @param {string} directory - Directory containing images to process
 */
function processImages(directory) {
  console.log(`Processing images in ${directory}...`);
  
  // In a real implementation, this would use the FileSystem API
  // or server-side code to process the images
  
  // Example code for what each image processing operation would do:
  /*
  images.forEach(image => {
    // For each image, generate multiple sizes and formats
    Object.entries(IMAGE_SIZES).forEach(([size, width]) => {
      FORMATS.forEach(format => {
        const outputPath = `${directory}/${image.name}-${size}.${format}`;
        
        // Resize the image
        const resizedImage = resizeImage(image, width);
        
        // Compress the image
        const compressedImage = compressImage(resizedImage, COMPRESSION_QUALITY);
        
        // Save the image
        saveImage(compressedImage, outputPath);
        
        console.log(`Generated ${outputPath}`);
      });
    });
  });
  */
}

/**
 * Resize an image to the specified width while maintaining aspect ratio
 * @param {Image} image - Image to resize
 * @param {number} width - Target width in pixels
 * @returns {Image} Resized image
 */
function resizeImage(image, width) {
  // Calculate height to maintain aspect ratio
  const aspectRatio = image.width / image.height;
  const height = Math.round(width / aspectRatio);
  
  // Create a canvas for resizing
  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;
  
  // Draw the image on the canvas
  const ctx = canvas.getContext('2d');
  ctx.drawImage(image, 0, 0, width, height);
  
  // Return the resized image
  return canvas;
}

/**
 * Compress an image to the specified quality
 * @param {Canvas} canvas - Canvas containing the image to compress
 * @param {number} quality - Compression quality (0-100)
 * @returns {Blob} Compressed image
 */
function compressImage(canvas, quality) {
  // Convert quality from 0-100 to 0-1
  const q = quality / 100;
  
  // Return the compressed image
  return canvas.toBlob(blob => blob, 'image/jpeg', q);
}

/**
 * Check if a browser supports WebP format
 * @returns {Promise<boolean>} True if WebP is supported
 */
function checkWebPSupport() {
  return new Promise(resolve => {
    const webP = new Image();
    webP.onload = webP.onerror = function() {
      resolve(webP.height === 2);
    };
    webP.src = 'data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA';
  });
}

/**
 * Initialize image optimization
 */
async function init() {
  // Check WebP support
  const supportsWebP = await checkWebPSupport();
  console.log(`Browser ${supportsWebP ? 'supports' : 'does not support'} WebP format`);
  
  // Add WebP support detection to the document
  document.documentElement.classList.add(supportsWebP ? 'webp' : 'no-webp');
  
  // Add image loading handler to lazy load images
  document.addEventListener('DOMContentLoaded', () => {
    const lazyImages = document.querySelectorAll('img[data-src]');
    
    if ('IntersectionObserver' in window) {
      const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const img = entry.target;
            const src = img.getAttribute('data-src');
            
            // Choose the appropriate format based on browser support
            if (supportsWebP && src.endsWith('.jpg')) {
              img.src = src.replace('.jpg', '.webp');
            } else {
              img.src = src;
            }
            
            img.removeAttribute('data-src');
            imageObserver.unobserve(img);
          }
        });
      });
      
      lazyImages.forEach(img => {
        imageObserver.observe(img);
      });
    } else {
      // Fallback for browsers that don't support IntersectionObserver
      lazyImages.forEach(img => {
        img.src = img.getAttribute('data-src');
        img.removeAttribute('data-src');
      });
    }
  });
}

// Initialize
init(); 