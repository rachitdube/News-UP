// DOM Elements
const inputBox = document.getElementById('hero-field');
const searchBtn = document.getElementById('searchbtn');
const languageSelect = document.getElementById('language-select');
const countrySelect = document.getElementById('country-select');
const categorySelect = document.getElementById('category-select');
const stateSelect = document.getElementById('state-select');
const articlesGrid = document.getElementById('articles-grid');
const loadingDiv = document.getElementById('loading');
const errorDiv = document.getElementById('error-message');




// Build API URL with filters
function buildApiUrl(keyword) {
    const api_key = 'pub_437242489f236aed819a675c35e0c0c5a452f';
    const baseUrl = 'https://newsdata.io/api/1/news';
    
    let url = `${baseUrl}?apikey=${api_key}`;
    
    // Add keyword if provided
    if (keyword && keyword.trim()) {
        url += `&q=${encodeURIComponent(keyword.trim())}`;
    }
    
    // Add state filter to keyword if selected
    const selectedState = stateSelect.value;
    if (selectedState) {
        const stateKeyword = keyword ? `${keyword} ${selectedState}` : selectedState;
        url = url.replace(/&q=[^&]*/, `&q=${encodeURIComponent(stateKeyword)}`);
        if (!keyword) {
            url += `&q=${encodeURIComponent(selectedState)}`;
        }
    }
    
    // Add language filter
    const selectedLanguage = languageSelect.value;
    if (selectedLanguage) {
        url += `&language=${selectedLanguage}`;
    }
    
    // Add country filter
    const selectedCountry = countrySelect.value;
    if (selectedCountry) {
        url += `&country=${selectedCountry}`;
    }
    
    // Add category filter
    const selectedCategory = categorySelect.value;
    if (selectedCategory) {
        url += `&category=${selectedCategory}`;
    }
    
    return url;
}

// Create article card HTML
function createArticleCard(article, index) {
    const defaultImage = 'https://via.placeholder.com/400x200/e5e7eb/6b7280?text=No+Image';
    const imageUrl = article.image_url || defaultImage;
    const title = article.title || 'No title available';
    const description = article.description || 'No description available';
    const source = article.source_id || 'Unknown source';
    const pubDate = article.pubDate ? new Date(article.pubDate).toLocaleDateString() : 'Unknown date';
    const link = article.link || '#';
    
    return `
        <div class="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
            <img src="${imageUrl}" alt="${title}" class="w-full h-48 object-cover" 
                 onerror="this.src='${defaultImage}'">
            <div class="p-4">
                <h3 class="font-bold text-lg mb-2 line-clamp-2 text-gray-900">${title}</h3>
                <p class="text-gray-600 text-sm mb-3 line-clamp-3">${description}</p>
                <div class="flex justify-between items-center text-xs text-gray-500 mb-3">
                    <span class="bg-red-100 text-red-800 px-2 py-1 rounded">${source}</span>
                    <span>${pubDate}</span>
                </div>
                <a href="${link}" target="_blank" rel="noopener noreferrer" 
                   class="inline-block bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition-colors duration-200 text-sm">
                    Read More
                </a>
            </div>
        </div>
    `;
}

// Display articles
function displayArticles(articles) {
    if (!articles || articles.length === 0) {
        articlesGrid.innerHTML = `
            <div class="col-span-full text-center py-8">
                <p class="text-gray-600 text-lg">No articles found. Try adjusting your search criteria.</p>
            </div>
        `;
        return;
    }
    
    const articlesHtml = articles.slice(0, 12).map((article, index) => 
        createArticleCard(article, index)
    ).join('');
    
    articlesGrid.innerHTML = articlesHtml;
}

// Show/hide loading state
function setLoading(isLoading) {
    if (isLoading) {
        loadingDiv.classList.remove('hidden');
        errorDiv.classList.add('hidden');
        articlesGrid.innerHTML = '';
    } else {
        loadingDiv.classList.add('hidden');
    }
}

// Show error message
function showError(message) {
    errorDiv.classList.remove('hidden');
    errorDiv.querySelector('p').textContent = message;
    loadingDiv.classList.add('hidden');
}

// Main search function
async function searchNews(keyword) {
    try {
        setLoading(true);
        
        const url = buildApiUrl(keyword);
        console.log('API URL:', url);
        
        const response = await fetch(url);
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const newsData = await response.json();
        console.log('News data:', newsData);
        
        if (newsData.status === 'error') {
            throw new Error(newsData.message || 'API returned an error');
        }
        
        setLoading(false);
        displayArticles(newsData.results);
        
    } catch (error) {
        console.error('Error fetching news:', error);
        setLoading(false);
        showError('Failed to load news. Please check your internet connection and try again.');
    }
}

// Load default news on page load
async function loadDefaultNews() {
    await searchNews('india'); // Load some default news
}


// Event listeners
searchBtn.addEventListener('click', () => {
    searchNews(inputBox.value);
});

// Search on Enter key press
inputBox.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        searchNews(inputBox.value);
    }
});

// Search when filters change
languageSelect.addEventListener('change', () => {
    searchNews(inputBox.value);
});

countrySelect.addEventListener('change', () => {
    searchNews(inputBox.value);
});

categorySelect.addEventListener('change', () => {
    searchNews(inputBox.value);
});

stateSelect.addEventListener('change', () => {
    searchNews(inputBox.value);
});

// Load default news when page loads
document.addEventListener('DOMContentLoaded', () => {
    loadDefaultNews();
});
