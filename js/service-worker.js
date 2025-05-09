const CACHE_NAME = 'filoxenia-moments-v1';

// Cache groups with different strategies
const CACHE_GROUPS = {
  static: {
    name: `${CACHE_NAME}-static`,
    assets: [
      '/',
      '/index.html',
      '/contact.html',
      '/portfolio.html',
      '/booking.html',
      '/css/critical.css',
      '/css/main.css',
      '/css/reset.css',
      '/css/social.css',
      '/css/contact.css',
      '/css/portfolio.css',
      '/css/booking.css',
      '/js/main.js',
      '/js/social.js',
      '/js/contact.js',
      '/js/portfolio.js',
      '/js/booking.js',
      '/js/image-optimize.js',
      '/assets/images/favicon.ico',
      '/filoxenia-moments.jpg'
    ],
    strategy: 'cache-first',
    maxAge: 30 * 24 * 60 * 60 // 30 days in seconds
  },
  images: {
    name: `${CACHE_NAME}-images`,
    pattern: /\.(jpg|jpeg|png|gif|svg|webp)$/,
    strategy: 'cache-first',
    maxAge: 7 * 24 * 60 * 60 // 7 days in seconds
  },
  api: {
    name: `${CACHE_NAME}-api`,
    pattern: /\/api\//,
    strategy: 'network-first',
    maxAge: 60 * 60 // 1 hour in seconds
  }
};

// Install event - cache assets
self.addEventListener('install', (event) => {
  event.waitUntil(
    Promise.all(
      Object.values(CACHE_GROUPS)
        .filter(group => group.assets)
        .map(group => 
          caches.open(group.name)
            .then(cache => {
              console.log(`Caching group: ${group.name}`);
              return cache.addAll(group.assets);
            })
        )
    ).then(() => self.skipWaiting())
  );
});

// Activate event - clean up old caches
self.addEventListener('activate', (event) => {
  // Get all cache group names
  const cacheGroupNames = Object.values(CACHE_GROUPS).map(group => group.name);
  
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          // Delete any caches that don't match our current group names
          if (!cacheGroupNames.includes(cacheName)) {
            console.log(`Deleting old cache: ${cacheName}`);
            return caches.delete(cacheName);
          }
        })
      );
    }).then(() => self.clients.claim())
  );
});

// Helper function to determine cache group for a request
function getCacheGroup(request) {
  const url = new URL(request.url);
  
  // Check if this is one of our static assets
  for (const group of Object.values(CACHE_GROUPS)) {
    if (group.assets && group.assets.includes(url.pathname)) {
      return group;
    }
    
    if (group.pattern && group.pattern.test(url.href)) {
      return group;
    }
  }
  
  // Default to static group
  return CACHE_GROUPS.static;
}

// Helper to check if a cached response is expired
function isCacheExpired(response, maxAge) {
  if (!response || !response.headers || !response.headers.get('date')) {
    return true;
  }
  
  const dateHeader = response.headers.get('date');
  const cachedTime = new Date(dateHeader).getTime();
  const now = Date.now();
  
  return (now - cachedTime) > maxAge * 1000;
}

// Fetch event - serve from cache or network based on strategy
self.addEventListener('fetch', (event) => {
  const cacheGroup = getCacheGroup(event.request);
  
  switch (cacheGroup.strategy) {
    case 'cache-first':
      event.respondWith(cacheFirstStrategy(event, cacheGroup));
      break;
    case 'network-first':
      event.respondWith(networkFirstStrategy(event, cacheGroup));
      break;
    default:
      event.respondWith(cacheFirstStrategy(event, cacheGroup));
  }
});

// Cache-first strategy: Try cache, then network, then fall back
function cacheFirstStrategy(event, cacheGroup) {
  return caches.open(cacheGroup.name)
    .then(cache => {
      return cache.match(event.request)
        .then(response => {
          // If found in cache and not expired, return it
          if (response && !isCacheExpired(response, cacheGroup.maxAge)) {
            return response;
          }
          
          // Otherwise fetch from network
          return fetchAndCache(event.request, cache, cacheGroup);
        });
    })
    .catch(() => {
      // Fallback for offline requests
      if (event.request.url.match(/\.(jpg|jpeg|png|gif|svg|webp)$/)) {
        return caches.match('/assets/images/offline-placeholder.svg');
      }
      
      return new Response('Network error', { status: 503, statusText: 'Service Unavailable' });
    });
}

// Network-first strategy: Try network, then cache
function networkFirstStrategy(event, cacheGroup) {
  return caches.open(cacheGroup.name)
    .then(cache => {
      return fetch(event.request)
        .then(response => {
          // Cache the response
          cache.put(event.request, response.clone());
          return response;
        })
        .catch(() => {
          // If network fails, try the cache
          return cache.match(event.request);
        });
    })
    .catch(() => {
      return new Response('Network error', { status: 503, statusText: 'Service Unavailable' });
    });
}

// Fetch from network and cache the response
function fetchAndCache(request, cache, cacheGroup) {
  return fetch(request)
    .then(response => {
      // Check if we got a valid response
      if (!response || response.status !== 200 || response.type !== 'basic') {
        return response;
      }
      
      // Add Cache-Control header based on maxAge
      const headers = new Headers(response.headers);
      headers.append('Cache-Control', `max-age=${cacheGroup.maxAge}`);
      
      // Create a new response with the updated headers
      const responseWithHeaders = new Response(response.body, {
        status: response.status,
        statusText: response.statusText,
        headers: headers
      });
      
      // Clone and cache the response
      cache.put(request, responseWithHeaders.clone());
      
      return responseWithHeaders;
    });
} 