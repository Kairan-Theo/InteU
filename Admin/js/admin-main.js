// Admin Dashboard Main JavaScript
document.addEventListener('DOMContentLoaded', function() {
    // Add a small delay to ensure all elements are rendered
    setTimeout(() => {
        // Initialize dashboard
        initializeDashboard();
        initializeCharts();
        setupEventListeners();
    }, 100);
});

// Dashboard initialization
function initializeDashboard() {
    // Load dashboard stats
    loadDashboardStats();
    
    // Load recent activities
    loadRecentActivities();
    
    // Update time display
    updateCurrentTime();
    setInterval(updateCurrentTime, 1000);
}

// Load dashboard statistics
function loadDashboardStats() {
    try {
        // Sample data - in real app, this would come from API
        const stats = {
            totalUsers: 250,
            activeCompanies: 40,
            totalInternships: 75,
            totalApplications: 342
        };
        
        // Update stat cards using the existing HTML structure
        const statCards = document.querySelectorAll('.stat-card');
        console.log('Found stat cards:', statCards.length);
        
        if (statCards.length >= 4) {
            const h3Elements = [
                statCards[0].querySelector('.stat-content h3'),
                statCards[1].querySelector('.stat-content h3'),
                statCards[2].querySelector('.stat-content h3'),
                statCards[3].querySelector('.stat-content h3')
            ];
            
            console.log('H3 elements found:', h3Elements.map(el => el !== null));
            
            if (h3Elements.every(el => el !== null)) {
                h3Elements[0].textContent = stats.totalUsers;
                h3Elements[1].textContent = stats.activeCompanies;
                h3Elements[2].textContent = stats.totalInternships;
                h3Elements[3].textContent = stats.totalApplications;
                console.log('Stats updated successfully');
            } else {
                console.warn('Some h3 elements not found');
            }
        } else {
            console.warn('Not enough stat cards found:', statCards.length);
        }
    } catch (error) {
        console.error('Error loading dashboard stats:', error);
    }
}

// Initialize charts
function initializeCharts() {
    // User Registration Chart
    const userCtx = document.getElementById('userChart');
    if (userCtx) {
        new Chart(userCtx, {
            type: 'line',
            data: {
                labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
                datasets: [{
                    label: 'User Registrations',
                    data: [12, 19, 3, 5, 2, 3],
                    borderColor: '#4f46e5',
                    backgroundColor: 'rgba(79, 70, 229, 0.1)',
                    tension: 0.4
                }]
            },
            options: {
                responsive: true,
                plugins: {
                    legend: {
                        display: false
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true
                    }
                }
            }
        });
    }
    
    // Company Distribution Chart
    const companyCtx = document.getElementById('companyChart');
    if (companyCtx) {
        new Chart(companyCtx, {
            type: 'doughnut',
            data: {
                labels: ['Tech', 'Finance', 'Healthcare', 'Education', 'Others'],
                datasets: [{
                    data: [30, 20, 15, 10, 25],
                    backgroundColor: [
                        '#4f46e5',
                        '#06b6d4',
                        '#10b981',
                        '#f59e0b',
                        '#ef4444'
                    ]
                }]
            },
            options: {
                responsive: true,
                plugins: {
                    legend: {
                        position: 'bottom'
                    }
                }
            }
        });
    }
}

// Load recent activities
function loadRecentActivities() {
    const activities = [
        { type: 'user', message: 'New user registered: John Doe', time: '2 minutes ago' },
        { type: 'company', message: 'Company approved: Tech Solutions Inc.', time: '15 minutes ago' },
        { type: 'internship', message: 'New internship posted: Software Developer', time: '1 hour ago' },
        { type: 'admin', message: 'Admin settings updated', time: '2 hours ago' }
    ];
    
    const activityList = document.getElementById('activity-list');
    if (activityList) {
        activityList.innerHTML = activities.map(activity => `
            <div class="activity-item">
                <div class="activity-icon ${activity.type}">
                    ${getActivityIcon(activity.type)}
                </div>
                <div class="activity-content">
                    <p>${activity.message}</p>
                    <span class="activity-time">${activity.time}</span>
                </div>
            </div>
        `).join('');
    }
}

// Get activity icon based on type
function getActivityIcon(type) {
    const icons = {
        user: '<i class="fas fa-user"></i>',
        company: '<i class="fas fa-building"></i>',
        internship: '<i class="fas fa-briefcase"></i>',
        admin: '<i class="fas fa-cog"></i>'
    };
    return icons[type] || '<i class="fas fa-info"></i>';
}

// Update current time
function updateCurrentTime() {
    const now = new Date();
    const timeString = now.toLocaleString();
    const timeElement = document.getElementById('current-time');
    if (timeElement) {
        timeElement.textContent = timeString;
    }
}

// Setup event listeners
function setupEventListeners() {
    // Mobile menu toggle
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const sidebar = document.querySelector('.sidebar');
    
    if (mobileMenuBtn && sidebar) {
        mobileMenuBtn.addEventListener('click', function() {
            sidebar.classList.toggle('active');
        });
    }
    
    // Quick action buttons
    setupQuickActions();
    
    // Search functionality
    setupSearch();
    
    // Notification handling
    setupNotifications();
}

// Setup quick action buttons
function setupQuickActions() {
    const quickActions = document.querySelectorAll('.quick-action');
    quickActions.forEach(action => {
        action.addEventListener('click', function() {
            const actionType = this.dataset.action;
            handleQuickAction(actionType);
        });
    });
}

// Handle quick actions
function handleQuickAction(actionType) {
    switch(actionType) {
        case 'add-user':
            window.location.href = 'manage-users.html?action=add';
            break;
        case 'approve-company':
            window.location.href = 'manage-companies.html?filter=pending';
            break;
        case 'review-internship':
            window.location.href = 'manage-internships.html?filter=pending';
            break;
        case 'view-reports':
            window.location.href = 'reports.html';
            break;
        default:
            console.log('Unknown action:', actionType);
    }
}

// Setup search functionality
function setupSearch() {
    const searchInput = document.getElementById('global-search');
    if (searchInput) {
        searchInput.addEventListener('input', function() {
            const query = this.value.toLowerCase();
            // Implement global search functionality
            performGlobalSearch(query);
        });
    }
}

// Perform global search
function performGlobalSearch(query) {
    if (query.length < 2) return;
    
    // Simulate search results
    console.log('Searching for:', query);
    // Implement actual search logic here
}

// Setup notifications
function setupNotifications() {
    // Check for new notifications
    checkNotifications();
    
    // Setup notification click handlers
    const notificationBell = document.getElementById('notification-bell');
    if (notificationBell) {
        notificationBell.addEventListener('click', function() {
            toggleNotificationPanel();
        });
    }
}

// Check for notifications
function checkNotifications() {
    // Simulate notification check
    const notificationCount = 5; // Replace with actual API call
    const badge = document.getElementById('notification-badge');
    if (badge && notificationCount > 0) {
        badge.textContent = notificationCount;
        badge.style.display = 'block';
    }
}

// Toggle notification panel
function toggleNotificationPanel() {
    const panel = document.getElementById('notification-panel');
    if (panel) {
        panel.classList.toggle('active');
    }
}

// Utility functions
function showToast(message, type = 'info') {
    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;
    toast.textContent = message;
    
    document.body.appendChild(toast);
    
    setTimeout(() => {
        toast.classList.add('show');
    }, 100);
    
    setTimeout(() => {
        toast.classList.remove('show');
        setTimeout(() => {
            document.body.removeChild(toast);
        }, 300);
    }, 3000);
}

function confirmAction(message, callback) {
    if (confirm(message)) {
        callback();
    }
}

// Export functions for use in other files
window.AdminDashboard = {
    showToast,
    confirmAction,
    loadDashboardStats,
    updateCurrentTime
};