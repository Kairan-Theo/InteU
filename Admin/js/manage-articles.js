// Sample article data
let articlesData = [
    {
        id: 1,
        title: "Top 10 Skills Every Intern Should Develop",
        category: "career",
        author: "Sarah Johnson",
        status: "published",
        views: 2450,
        publishedDate: "2024-01-15",
        excerpt: "Essential skills that will make you stand out as an intern and boost your career prospects.",
        content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua...",
        featuredImage: "https://via.placeholder.com/400x200",
        readingTime: 8,
        tags: ["career", "skills", "internship", "development"],
        featured: true,
        metaDescription: "Discover the top 10 essential skills every intern should develop to succeed in their career."
    },
    {
        id: 2,
        title: "How to Ace Your Virtual Interview",
        category: "tips",
        author: "Mike Chen",
        status: "published",
        views: 1890,
        publishedDate: "2024-01-12",
        excerpt: "Complete guide to succeeding in virtual interviews with practical tips and best practices.",
        content: "Virtual interviews have become the norm. Here's how to prepare and excel in them...",
        featuredImage: "https://via.placeholder.com/400x200",
        readingTime: 6,
        tags: ["interview", "virtual", "tips", "career"],
        featured: false,
        metaDescription: "Master virtual interviews with our comprehensive guide and practical tips."
    },
    {
        id: 3,
        title: "The Future of Remote Work in Tech",
        category: "technology",
        author: "Alex Rodriguez",
        status: "draft",
        views: 0,
        publishedDate: null,
        excerpt: "Exploring how remote work is reshaping the technology industry and what it means for future professionals.",
        content: "Remote work has fundamentally changed how we approach technology careers...",
        featuredImage: "https://via.placeholder.com/400x200",
        readingTime: 12,
        tags: ["remote work", "technology", "future", "career"],
        featured: false,
        metaDescription: "Explore the future of remote work in the technology industry."
    },
    {
        id: 4,
        title: "Building Your Professional Network",
        category: "career",
        author: "Emily Davis",
        status: "published",
        views: 3200,
        publishedDate: "2024-01-10",
        excerpt: "Strategies for building meaningful professional relationships that advance your career.",
        content: "Networking is crucial for career success. Here's how to do it effectively...",
        featuredImage: "https://via.placeholder.com/400x200",
        readingTime: 10,
        tags: ["networking", "career", "professional", "relationships"],
        featured: true,
        metaDescription: "Learn effective strategies for building your professional network."
    },
    {
        id: 5,
        title: "Understanding Industry Trends in 2024",
        category: "industry",
        author: "David Kim",
        status: "published",
        views: 1650,
        publishedDate: "2024-01-08",
        excerpt: "Key industry trends that will shape the job market and career opportunities in 2024.",
        content: "2024 brings new challenges and opportunities across various industries...",
        featuredImage: "https://via.placeholder.com/400x200",
        readingTime: 15,
        tags: ["trends", "industry", "2024", "career"],
        featured: false,
        metaDescription: "Stay ahead with key industry trends shaping 2024's job market."
    }
];

let currentPage = 1;
const itemsPerPage = 10;
let filteredArticles = [...articlesData];
let editingArticleId = null;

// Initialize the page
document.addEventListener('DOMContentLoaded', function() {
    loadArticles();
    setupEventListeners();
    updateStats();
});

// Setup event listeners
function setupEventListeners() {
    // Search functionality
    document.getElementById('article-search').addEventListener('input', function() {
        filterArticles();
    });

    // Filter functionality
    document.getElementById('status-filter').addEventListener('change', filterArticles);
    document.getElementById('category-filter').addEventListener('change', filterArticles);
    document.getElementById('author-filter').addEventListener('change', filterArticles);
    document.getElementById('date-filter').addEventListener('change', filterArticles);

    // Pagination
    document.getElementById('prev-page').addEventListener('click', () => {
        if (currentPage > 1) {
            currentPage--;
            loadArticles();
        }
    });

    document.getElementById('next-page').addEventListener('click', () => {
        const totalPages = Math.ceil(filteredArticles.length / itemsPerPage);
        if (currentPage < totalPages) {
            currentPage++;
            loadArticles();
        }
    });

    // Select all checkbox
    document.getElementById('select-all').addEventListener('change', function() {
        const checkboxes = document.querySelectorAll('#articles-tbody input[type="checkbox"]');
        checkboxes.forEach(checkbox => {
            checkbox.checked = this.checked;
        });
    });

    // Form submission
    document.getElementById('article-form').addEventListener('submit', function(e) {
        e.preventDefault();
        saveArticle();
    });
}

// Load and display articles
function loadArticles() {
    const tbody = document.getElementById('articles-tbody');
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const articlesToShow = filteredArticles.slice(startIndex, endIndex);

    tbody.innerHTML = '';

    articlesToShow.forEach(article => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td><input type="checkbox" value="${article.id}"></td>
            <td>${article.id}</td>
            <td>
                <div class="article-info">
                    <div class="article-title">${article.title}</div>
                    <div class="article-excerpt">${article.excerpt.substring(0, 80)}...</div>
                    ${article.featured ? '<span class="badge badge-warning">Featured</span>' : ''}
                </div>
            </td>
            <td><span class="badge badge-info">${article.category}</span></td>
            <td>${article.author}</td>
            <td><span class="badge badge-${getStatusColor(article.status)}">${article.status}</span></td>
            <td>${article.views.toLocaleString()}</td>
            <td>${article.publishedDate ? new Date(article.publishedDate).toLocaleDateString() : 'Not published'}</td>
            <td>
                <div class="action-buttons">
                    <button class="btn btn-sm btn-info" onclick="viewArticle(${article.id})" title="View">
                        <i class="fas fa-eye"></i>
                    </button>
                    <button class="btn btn-sm btn-primary" onclick="editArticle(${article.id})" title="Edit">
                        <i class="fas fa-edit"></i>
                    </button>
                    ${article.status === 'draft' ? 
                        `<button class="btn btn-sm btn-success" onclick="publishArticle(${article.id})" title="Publish">
                            <i class="fas fa-check"></i>
                        </button>` : 
                        `<button class="btn btn-sm btn-warning" onclick="archiveArticle(${article.id})" title="Archive">
                            <i class="fas fa-archive"></i>
                        </button>`
                    }
                    <button class="btn btn-sm btn-danger" onclick="deleteArticle(${article.id})" title="Delete">
                        <i class="fas fa-trash"></i>
                    </button>
                </div>
            </td>
        `;
        tbody.appendChild(row);
    });

    updatePagination();
}

// Filter articles based on search and filters
function filterArticles() {
    const searchTerm = document.getElementById('article-search').value.toLowerCase();
    const statusFilter = document.getElementById('status-filter').value;
    const categoryFilter = document.getElementById('category-filter').value;
    const authorFilter = document.getElementById('author-filter').value;
    const dateFilter = document.getElementById('date-filter').value;

    filteredArticles = articlesData.filter(article => {
        const matchesSearch = article.title.toLowerCase().includes(searchTerm) ||
                            article.excerpt.toLowerCase().includes(searchTerm) ||
                            article.author.toLowerCase().includes(searchTerm);
        const matchesStatus = !statusFilter || article.status === statusFilter;
        const matchesCategory = !categoryFilter || article.category === categoryFilter;
        const matchesAuthor = !authorFilter || article.author.toLowerCase().includes(authorFilter.toLowerCase());
        const matchesDate = !dateFilter || article.publishedDate === dateFilter;

        return matchesSearch && matchesStatus && matchesCategory && matchesAuthor && matchesDate;
    });

    currentPage = 1;
    loadArticles();
}

// Update pagination
function updatePagination() {
    const totalPages = Math.ceil(filteredArticles.length / itemsPerPage);
    document.getElementById('current-page').textContent = currentPage;
    document.getElementById('total-pages').textContent = totalPages;
    
    document.getElementById('prev-page').disabled = currentPage === 1;
    document.getElementById('next-page').disabled = currentPage === totalPages;
}

// Update statistics
function updateStats() {
    const totalArticles = articlesData.length;
    const publishedArticles = articlesData.filter(a => a.status === 'published').length;
    const draftArticles = articlesData.filter(a => a.status === 'draft').length;
    const totalViews = articlesData.reduce((sum, a) => sum + a.views, 0);

    document.getElementById('total-articles').textContent = totalArticles;
    document.getElementById('published-articles').textContent = publishedArticles;
    document.getElementById('draft-articles').textContent = draftArticles;
    document.getElementById('total-views').textContent = totalViews.toLocaleString();
}

// Get status color for badges
function getStatusColor(status) {
    switch(status) {
        case 'published': return 'success';
        case 'draft': return 'warning';
        case 'archived': return 'secondary';
        default: return 'primary';
    }
}

// Open add article modal
function openAddArticleModal() {
    editingArticleId = null;
    document.getElementById('modal-title').textContent = 'Add New Article';
    document.getElementById('article-form').reset();
    document.getElementById('article-modal').style.display = 'flex';
}

// Close article modal
function closeArticleModal() {
    document.getElementById('article-modal').style.display = 'none';
    editingArticleId = null;
}

// View article details
function viewArticle(id) {
    const article = articlesData.find(a => a.id === id);
    if (!article) return;

    const detailsContent = document.getElementById('article-details-content');
    detailsContent.innerHTML = `
        <div class="article-details">
            <div class="detail-section">
                <h4>${article.title}</h4>
                <div class="article-meta">
                    <span class="badge badge-${getStatusColor(article.status)}">${article.status}</span>
                    <span class="badge badge-info">${article.category}</span>
                    ${article.featured ? '<span class="badge badge-warning">Featured</span>' : ''}
                </div>
            </div>
            
            <div class="detail-section">
                <strong>Author:</strong> ${article.author}<br>
                <strong>Reading Time:</strong> ${article.readingTime} minutes<br>
                <strong>Views:</strong> ${article.views.toLocaleString()}<br>
                <strong>Published:</strong> ${article.publishedDate ? new Date(article.publishedDate).toLocaleDateString() : 'Not published'}
            </div>

            <div class="detail-section">
                <strong>Excerpt:</strong>
                <p>${article.excerpt}</p>
            </div>

            <div class="detail-section">
                <strong>Content:</strong>
                <div class="article-content">${article.content}</div>
            </div>

            <div class="detail-section">
                <strong>Tags:</strong> ${article.tags.map(tag => `<span class="tag">${tag}</span>`).join(' ')}
            </div>

            ${article.featuredImage ? `
                <div class="detail-section">
                    <strong>Featured Image:</strong><br>
                    <img src="${article.featuredImage}" alt="Featured Image" style="max-width: 300px; height: auto;">
                </div>
            ` : ''}

            ${article.metaDescription ? `
                <div class="detail-section">
                    <strong>Meta Description:</strong>
                    <p>${article.metaDescription}</p>
                </div>
            ` : ''}
        </div>
    `;

    document.getElementById('article-details-modal').style.display = 'flex';
}

// Close article details modal
function closeArticleDetailsModal() {
    document.getElementById('article-details-modal').style.display = 'none';
}

// Edit article
function editArticle(id) {
    const article = articlesData.find(a => a.id === id);
    if (!article) return;

    editingArticleId = id;
    document.getElementById('modal-title').textContent = 'Edit Article';
    
    // Populate form fields
    document.getElementById('article-title').value = article.title;
    document.getElementById('article-category').value = article.category;
    document.getElementById('article-author').value = article.author;
    document.getElementById('article-reading-time').value = article.readingTime;
    document.getElementById('article-excerpt').value = article.excerpt;
    document.getElementById('article-content').value = article.content;
    document.getElementById('article-featured-image').value = article.featuredImage || '';
    document.getElementById('article-status').value = article.status;
    document.getElementById('article-tags').value = article.tags.join(', ');
    document.getElementById('article-featured').checked = article.featured;
    document.getElementById('article-meta-description').value = article.metaDescription || '';

    document.getElementById('article-modal').style.display = 'flex';
}

// Save article (add or edit)
function saveArticle() {
    const formData = new FormData(document.getElementById('article-form'));
    const articleData = {
        title: formData.get('title'),
        category: formData.get('category'),
        author: formData.get('author'),
        readingTime: parseInt(formData.get('readingTime')),
        excerpt: formData.get('excerpt'),
        content: formData.get('content'),
        featuredImage: formData.get('featuredImage'),
        status: formData.get('status'),
        tags: formData.get('tags').split(',').map(tag => tag.trim()).filter(tag => tag),
        featured: formData.has('featured'),
        metaDescription: formData.get('metaDescription')
    };

    if (editingArticleId) {
        // Edit existing article
        const index = articlesData.findIndex(a => a.id === editingArticleId);
        if (index !== -1) {
            articlesData[index] = { ...articlesData[index], ...articleData };
            if (articleData.status === 'published' && !articlesData[index].publishedDate) {
                articlesData[index].publishedDate = new Date().toISOString().split('T')[0];
            }
        }
    } else {
        // Add new article
        const newArticle = {
            id: Math.max(...articlesData.map(a => a.id)) + 1,
            views: 0,
            publishedDate: articleData.status === 'published' ? new Date().toISOString().split('T')[0] : null,
            ...articleData
        };
        articlesData.push(newArticle);
    }

    closeArticleModal();
    filterArticles();
    updateStats();
    showNotification(editingArticleId ? 'Article updated successfully!' : 'Article added successfully!', 'success');
}

// Publish article
function publishArticle(id) {
    const article = articlesData.find(a => a.id === id);
    if (article) {
        article.status = 'published';
        if (!article.publishedDate) {
            article.publishedDate = new Date().toISOString().split('T')[0];
        }
        loadArticles();
        updateStats();
        showNotification('Article published successfully!', 'success');
    }
}

// Archive article
function archiveArticle(id) {
    if (confirm('Are you sure you want to archive this article?')) {
        const article = articlesData.find(a => a.id === id);
        if (article) {
            article.status = 'archived';
            loadArticles();
            updateStats();
            showNotification('Article archived successfully!', 'info');
        }
    }
}

// Delete article
function deleteArticle(id) {
    if (confirm('Are you sure you want to delete this article? This action cannot be undone.')) {
        const index = articlesData.findIndex(a => a.id === id);
        if (index !== -1) {
            articlesData.splice(index, 1);
            filterArticles();
            updateStats();
            showNotification('Article deleted successfully!', 'success');
        }
    }
}

// Functions for article details modal actions
function editArticleFromDetails() {
    const modal = document.getElementById('article-details-modal');
    const articleId = parseInt(modal.dataset.articleId);
    closeArticleDetailsModal();
    editArticle(articleId);
}

function publishArticleFromDetails() {
    const modal = document.getElementById('article-details-modal');
    const articleId = parseInt(modal.dataset.articleId);
    publishArticle(articleId);
    closeArticleDetailsModal();
}

function archiveArticleFromDetails() {
    const modal = document.getElementById('article-details-modal');
    const articleId = parseInt(modal.dataset.articleId);
    archiveArticle(articleId);
    closeArticleDetailsModal();
}

// Apply bulk actions
function applyBulkAction() {
    const action = document.getElementById('bulk-action').value;
    const selectedCheckboxes = document.querySelectorAll('#articles-tbody input[type="checkbox"]:checked');
    const selectedIds = Array.from(selectedCheckboxes).map(cb => parseInt(cb.value));

    if (selectedIds.length === 0) {
        showNotification('Please select articles to perform bulk action.', 'warning');
        return;
    }

    if (!action) {
        showNotification('Please select a bulk action.', 'warning');
        return;
    }

    let confirmMessage = '';
    switch(action) {
        case 'publish':
            confirmMessage = `Are you sure you want to publish ${selectedIds.length} selected articles?`;
            break;
        case 'draft':
            confirmMessage = `Are you sure you want to move ${selectedIds.length} selected articles to draft?`;
            break;
        case 'archive':
            confirmMessage = `Are you sure you want to archive ${selectedIds.length} selected articles?`;
            break;
        case 'delete':
            confirmMessage = `Are you sure you want to delete ${selectedIds.length} selected articles? This action cannot be undone.`;
            break;
    }

    if (confirm(confirmMessage)) {
        selectedIds.forEach(id => {
            const article = articlesData.find(a => a.id === id);
            if (article) {
                switch(action) {
                    case 'publish':
                        article.status = 'published';
                        if (!article.publishedDate) {
                            article.publishedDate = new Date().toISOString().split('T')[0];
                        }
                        break;
                    case 'draft':
                        article.status = 'draft';
                        break;
                    case 'archive':
                        article.status = 'archived';
                        break;
                    case 'delete':
                        const index = articlesData.findIndex(a => a.id === id);
                        if (index !== -1) {
                            articlesData.splice(index, 1);
                        }
                        break;
                }
            }
        });

        filterArticles();
        updateStats();
        document.getElementById('select-all').checked = false;
        document.getElementById('bulk-action').value = '';
        showNotification(`Bulk action completed successfully!`, 'success');
    }
}

// Show notification
function showNotification(message, type = 'info') {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <i class="fas fa-${type === 'success' ? 'check-circle' : type === 'warning' ? 'exclamation-triangle' : 'info-circle'}"></i>
        <span>${message}</span>
        <button onclick="this.parentElement.remove()">&times;</button>
    `;

    // Add to page
    document.body.appendChild(notification);

    // Auto remove after 5 seconds
    setTimeout(() => {
        if (notification.parentElement) {
            notification.remove();
        }
    }, 5000);
}