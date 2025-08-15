// Import Supabase from the ESM CDN
import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm'

// Get Supabase credentials from config
const SUPABASE_URL = process.env.SUPABASE_URL;
const SUPABASE_ANON_KEY = process.env.SUPABASE_ANON_KEY;

if (!SUPABASE_URL || !SUPABASE_ANON_KEY) {
    console.error('Supabase credentials are not properly configured');
}

// Initialize Supabase client
const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// DOM Elements
const searchInput = document.getElementById('search-input')
const searchButton = document.getElementById('search-button')
const searchResults = document.getElementById('search-results')

// Anonymous tracking helpers (privacy-respecting)
const CLIENT_ID_KEY = 'fm_client_id'
const SESSION_ID_KEY = 'fm_session_id'

function generateId() {
    if (window.crypto && crypto.randomUUID) return crypto.randomUUID()
    return `${Date.now()}-${Math.random().toString(16).slice(2)}`
}

function getOrCreateId(storage, key) {
    try {
        let value = storage.getItem(key)
        if (!value) {
            value = generateId()
            storage.setItem(key, value)
        }
        return value
    } catch (_) {
        return generateId()
    }
}

function getDeviceType() {
    const ua = navigator.userAgent.toLowerCase()
    if (/ipad|tablet/.test(ua)) return 'tablet'
    if (/mobi|android|iphone|ipod/.test(ua)) return 'mobile'
    return 'desktop'
}

function getTimezone() {
    try {
        return Intl.DateTimeFormat().resolvedOptions().timeZone || null
    } catch (_) {
        return null
    }
}

function parseUtmParams() {
    const params = new URLSearchParams(window.location.search)
    return {
        utm_source: params.get('utm_source'),
        utm_medium: params.get('utm_medium'),
        utm_campaign: params.get('utm_campaign'),
        utm_term: params.get('utm_term'),
        utm_content: params.get('utm_content')
    }
}

function getPreferredLanguage() {
    try {
        return localStorage.getItem('language') || (navigator.language || 'en').slice(0, 2)
    } catch (_) {
        return 'en'
    }
}

// Search functionality
async function performSearch(query) {
    if (!query.trim()) return

    try {
        // Build analytics payload (no PII)
        const clientId = getOrCreateId(localStorage, CLIENT_ID_KEY)
        const sessionId = getOrCreateId(sessionStorage, SESSION_ID_KEY)
        const utm = parseUtmParams()
        const payload = {
            query: query.trim(),
            query_normalized: query.trim().toLowerCase(),
            language: getPreferredLanguage(),
            url: window.location.href,
            path: window.location.pathname,
            referrer: document.referrer || null,
            device_type: getDeviceType(),
            user_agent: navigator.userAgent || null,
            timezone: getTimezone(),
            client_id: clientId,
            session_id: sessionId,
            utm_source: utm.utm_source,
            utm_medium: utm.utm_medium,
            utm_campaign: utm.utm_campaign,
            utm_term: utm.utm_term,
            utm_content: utm.utm_content,
            created_at: new Date().toISOString()
        }

        // Save search query to Supabase
        const { data, error } = await supabase
            .from('search_queries')
            .insert([payload])

        if (error) throw error

        // Perform local search in website content
        const searchableContent = [
            // Wedding Services
            { title: 'Weddings', url: 'services.html', description: 'Creating unforgettable wedding experiences tailored to your unique love story.' },
            { title: 'Elegant Garden Wedding', url: 'portfolio.html', description: 'A beautiful outdoor wedding with a rustic theme.' },
            { title: 'Beachfront Wedding', url: 'portfolio.html', description: 'A relaxed and scenic wedding by the sea.' },
            { title: 'Luxury Destination Wedding', url: 'portfolio.html', description: 'A lavish wedding at a tropical resort.' },
            { title: 'Traditional Greek Wedding', url: 'portfolio.html', description: 'A traditional and elegant Greek wedding ceremony.' },
            { title: 'Modern Wedding', url: 'portfolio.html', description: 'A modern and stylish wedding with a contemporary design.' },
            { title: 'Vintage Wedding', url: 'portfolio.html', description: 'A vintage-inspired wedding with a classic and elegant look.' },
            { title: 'Bohemian Wedding', url: 'portfolio.html', description: 'A bohemian-inspired wedding with a relaxed and free-spirited vibe.' },
            { title: 'Vintage Wedding', url: 'portfolio.html', description: 'A vintage-inspired wedding with a classic and elegant look.' },
            { title: 'Vintage Wedding', url: 'portfolio.html', description: 'A vintage-inspired wedding with a classic and elegant look.' },
            
            // Engagement Events
            { title: 'Engagement Party', url: 'portfolio.html', description: 'A fun and memorable engagement celebration.' },
            
            // Religious Events
            { title: 'Orthodox Baptism', url: 'portfolio.html', description: 'A traditional and spiritual Orthodox baptism ceremony.' },
            
            // Corporate Events
            { title: 'Corporate Events', url: 'services.html', description: 'Planning seamless and sophisticated corporate events that leave a lasting impression.' },
            { title: 'Tech Conference', url: 'portfolio.html', description: 'A cutting-edge tech conference with industry leaders.' },
            { title: 'Corporate Gala', url: 'portfolio.html', description: 'A sophisticated corporate event with a modern design.' },
            
            // Private Events
            { title: 'Parties', url: 'portfolio.html', description: 'Designing memorable private parties that reflect your personal style.' },
            { title: 'Anniversary Dinner', url: 'portfolio.html', description: 'A romantic dinner for a special anniversary.' },
            { title: 'Birthday Celebration', url: 'portfolio.html', description: 'A cozy and personalized birthday party.' }
        ]

        // Filter content based on search query
        const results = searchableContent.filter(item => {
            const searchText = `${item.title} ${item.description}`.toLowerCase()
            return searchText.includes(query.toLowerCase())
        })

        displayResults(results)
    } catch (error) {
        console.error('Search error:', error)
    }
}

// Display search results
function displayResults(results) {
    if (!results.length) {
        searchResults.innerHTML = `
            <div class="p-4 text-center text-gray-500">
                No results found
            </div>
        `
        searchResults.classList.remove('hidden')
        return
    }

    const resultsHtml = results.map(result => `
        <a href="${result.url}" class="block p-4 hover:bg-gray-50 transition-colors duration-200">
            <h3 class="text-lg font-medium text-[#caa810] mb-1">${result.title}</h3>
            <p class="text-gray-600">${result.description}</p>
        </a>
    `).join('')

    searchResults.innerHTML = resultsHtml
    searchResults.classList.remove('hidden')
}

// Event listeners
searchButton.addEventListener('click', () => {
    performSearch(searchInput.value)
})

searchInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        performSearch(searchInput.value)
    }
})

// Close search results when clicking outside
document.addEventListener('click', (e) => {
    if (!searchResults.contains(e.target) && !searchInput.contains(e.target)) {
        searchResults.classList.add('hidden')
    }
})

// Add search translations
const searchTranslations = {
    en: {
        search_placeholder: "Search for services, events, or ideas...",
        search_placeholder_mobile: "Search...",
        search_button: "Search"
    },
    de: {
        search_placeholder: "Suchen Sie nach Dienstleistungen, Events oder Ideen...",
        search_placeholder_mobile: "Suchen...",
        search_button: "Suchen"
    },
    el: {
        search_placeholder: "Αναζήτηση υπηρεσιών, εκδηλώσεων ή ιδεών...",
        search_placeholder_mobile: "Αναζήτηση...",
        search_button: "Αναζήτηση"
    }
}

// Add search translations to the global translations object
if (typeof translations !== 'undefined') {
    Object.keys(searchTranslations).forEach(lang => {
        translations[lang] = { ...translations[lang], ...searchTranslations[lang] }
    })
}
