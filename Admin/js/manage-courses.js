// Manage Courses JavaScript
let courses = [];
let filteredCourses = [];
let currentPage = 1;
let itemsPerPage = 10;
let selectedCourseId = null;



// Sample course data
const sampleCourses = [
    {
        id: 'CRS001',
        title: 'Complete JavaScript Bootcamp',
        category: 'programming',
        level: 'beginner',
        duration: 40,
        price: 99.99,
        instructor: 'John Smith',
        description: 'Learn JavaScript from scratch with hands-on projects and real-world examples.',
        objectives: ['Master JavaScript fundamentals', 'Build interactive web applications', 'Understand ES6+ features', 'Work with APIs and async programming'],
        prerequisites: 'Basic HTML and CSS knowledge',
        thumbnail: 'https://via.placeholder.com/300x200?text=JavaScript+Course',
        status: 'published',
        tags: ['javascript', 'web development', 'programming'],
        enrollments: 245,
        createdDate: '2024-01-10',
        lastUpdated: '2024-01-15'
    },
    {
        id: 'CRS002',
        title: 'UI/UX Design Fundamentals',
        category: 'design',
        level: 'beginner',
        duration: 25,
        price: 79.99,
        instructor: 'Sarah Johnson',
        description: 'Master the principles of user interface and user experience design.',
        objectives: ['Understand design principles', 'Create user personas', 'Design wireframes and prototypes', 'Conduct usability testing'],
        prerequisites: 'No prior experience required',
        thumbnail: 'https://via.placeholder.com/300x200?text=UI/UX+Design',
        status: 'published',
        tags: ['ui', 'ux', 'design', 'figma'],
        enrollments: 189,
        createdDate: '2024-01-08',
        lastUpdated: '2024-01-12'
    },
    {
        id: 'CRS003',
        title: 'Digital Marketing Strategy',
        category: 'marketing',
        level: 'intermediate',
        duration: 30,
        price: 129.99,
        instructor: 'Mike Davis',
        description: 'Comprehensive guide to digital marketing strategies and implementation.',
        objectives: ['Develop marketing strategies', 'Master social media marketing', 'Understand SEO and SEM', 'Analyze marketing metrics'],
        prerequisites: 'Basic marketing knowledge helpful',
        thumbnail: 'https://via.placeholder.com/300x200?text=Digital+Marketing',
        status: 'draft',
        tags: ['marketing', 'seo', 'social media', 'analytics'],
        enrollments: 0,
        createdDate: '2024-01-20',
        lastUpdated: '2024-01-22'
    },
    {
        id: 'CRS004',
        title: 'Data Science with Python',
        category: 'data-science',
        level: 'advanced',
        duration: 60,
        price: 199.99,
        instructor: 'Dr. Emily Chen',
        description: 'Advanced data science techniques using Python and machine learning.',
        objectives: ['Master Python for data science', 'Implement machine learning algorithms', 'Work with big data', 'Create data visualizations'],
        prerequisites: 'Python programming experience required',
        thumbnail: 'https://via.placeholder.com/300x200?text=Data+Science',
        status: 'published',
        tags: ['python', 'data science', 'machine learning', 'analytics'],
        enrollments: 156,
        createdDate: '2024-01-05',
        lastUpdated: '2024-01-18'
    },
    {
        id: 'CRS005',
        title: 'Business Strategy Essentials',
        category: 'business',
        level: 'intermediate',
        duration: 35,
        price: 149.99,
        instructor: 'Robert Wilson',
        description: 'Learn essential business strategy concepts and frameworks.',
        objectives: ['Understand strategic planning', 'Analyze competitive landscapes', 'Develop business models', 'Make strategic decisions'],
        prerequisites: 'Basic business knowledge',
        thumbnail: 'https://via.placeholder.com/300x200?text=Business+Strategy',
        status: 'archived',
        tags: ['business', 'strategy', 'management', 'planning'],
        enrollments: 98,
        createdDate: '2023-12-15',
        lastUpdated: '2024-01-01'
    }
];

// Initialize page
document.addEventListener('DOMContentLoaded', function() {
    courses = [...sampleCourses];
    filteredCourses = [...courses];
    
    loadCourses();
    setupEventListeners();
    updateStats();
});

// Setup event listeners
function setupEventListeners() {
    // Search functionality
    document.getElementById('course-search').addEventListener('input', handleSearch);
    
    // Filter functionality
    document.getElementById('status-filter').addEventListener('change', applyFilters);
    document.getElementById('category-filter').addEventListener('change', applyFilters);
    document.getElementById('level-filter').addEventListener('change', applyFilters);
    document.getElementById('date-filter').addEventListener('change', applyFilters);
    
    // Pagination
    document.getElementById('prev-page').addEventListener('click', () => changePage(-1));
    document.getElementById('next-page').addEventListener('click', () => changePage(1));
    
    // Select all checkbox
    document.getElementById('select-all').addEventListener('change', toggleSelectAll);
    
    // Form submission
    document.getElementById('course-form').addEventListener('submit', handleCourseSubmit);
}

// Load courses into table
function loadCourses() {
    const tbody = document.getElementById('courses-tbody');
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const pageCourses = filteredCourses.slice(startIndex, endIndex);
    
    tbody.innerHTML = '';
    
    pageCourses.forEach(course => {
        const row = createCourseRow(course);
        tbody.appendChild(row);
    });
    
    updatePagination();
}

// Create course table row
function createCourseRow(course) {
    const row = document.createElement('tr');
    
    const statusClass = getStatusClass(course.status);
    const levelClass = getLevelClass(course.level);
    
    row.innerHTML = `
        <td><input type="checkbox" class="row-checkbox" value="${course.id}"></td>
        <td>${course.id}</td>
        <td>
            <div class="course-info">
                <div class="course-details">
                    <strong>${course.title}</strong>
                </div>
            </div>
        </td>
        <td><span class="badge badge-info">${course.category}</span></td>
        <td><span class="badge badge-${levelClass}">${course.level}</span></td>
        <td>${course.duration}h</td>
        <td><span class="badge badge-${statusClass}">${course.status}</span></td>
        <td>${course.enrollments}</td>
        <td>${formatDate(course.createdDate)}</td>
        <td>
            <div class="action-buttons">
                <button class="btn btn-sm btn-primary" onclick="editCourse('${course.id}')" title="Edit">
                    <i class="fas fa-edit"></i>
                </button>
                <button class="btn btn-sm btn-danger" onclick="deleteCourse('${course.id}')" title="Delete">
                    <i class="fas fa-trash"></i>
                </button>
            </div>
        </td>
    `;
    
    return row;
}

// Get status class for styling
function getStatusClass(status) {
    const statusClasses = {
        'published': 'success',
        'draft': 'warning',
        'archived': 'secondary'
    };
    return statusClasses[status] || 'secondary';
}

// Get level class for styling
function getLevelClass(level) {
    const levelClasses = {
        'beginner': 'success',
        'intermediate': 'warning',
        'advanced': 'danger'
    };
    return levelClasses[level] || 'secondary';
}

// Handle search
function handleSearch(e) {
    const searchTerm = e.target.value.toLowerCase();
    
    filteredCourses = courses.filter(course => 
        course.title.toLowerCase().includes(searchTerm) ||
        course.instructor.toLowerCase().includes(searchTerm) ||
        course.category.toLowerCase().includes(searchTerm) ||
        course.tags.some(tag => tag.toLowerCase().includes(searchTerm)) ||
        course.id.toLowerCase().includes(searchTerm)
    );
    
    currentPage = 1;
    loadCourses();
}

// Apply filters
function applyFilters() {
    const statusFilter = document.getElementById('status-filter').value;
    const categoryFilter = document.getElementById('category-filter').value;
    const levelFilter = document.getElementById('level-filter').value;
    const dateFilter = document.getElementById('date-filter').value;
    
    filteredCourses = courses.filter(course => {
        let matches = true;
        
        if (statusFilter && course.status !== statusFilter) {
            matches = false;
        }
        
        if (categoryFilter && course.category !== categoryFilter) {
            matches = false;
        }
        
        if (levelFilter && course.level !== levelFilter) {
            matches = false;
        }
        
        if (dateFilter && course.createdDate !== dateFilter) {
            matches = false;
        }
        
        return matches;
    });
    
    currentPage = 1;
    loadCourses();
}

// Pagination functions
function changePage(direction) {
    const totalPages = Math.ceil(filteredCourses.length / itemsPerPage);
    const newPage = currentPage + direction;
    
    if (newPage >= 1 && newPage <= totalPages) {
        currentPage = newPage;
        loadCourses();
    }
}

function updatePagination() {
    const totalPages = Math.ceil(filteredCourses.length / itemsPerPage);
    document.getElementById('current-page').textContent = currentPage;
    document.getElementById('total-pages').textContent = totalPages;
    
    document.getElementById('prev-page').disabled = currentPage === 1;
    document.getElementById('next-page').disabled = currentPage === totalPages;
}

// Select all functionality
function toggleSelectAll() {
    const selectAll = document.getElementById('select-all');
    const checkboxes = document.querySelectorAll('.row-checkbox');
    
    checkboxes.forEach(checkbox => {
        checkbox.checked = selectAll.checked;
    });
}

// Modal functions
function openAddCourseModal() {
    document.getElementById('modal-title').textContent = 'Add New Course';
    document.getElementById('course-form').reset();
    selectedCourseId = null;
    document.getElementById('course-modal').style.display = 'block';
}

function closeCourseModal() {
    document.getElementById('course-modal').style.display = 'none';
    selectedCourseId = null;
}

function closeCourseDetailsModal() {
    document.getElementById('course-details-modal').style.display = 'none';
}

// CRUD operations
function viewCourse(id) {
    const course = courses.find(c => c.id === id);
    if (!course) return;
    
    const detailsContent = document.getElementById('course-details-content');
    detailsContent.innerHTML = `
        <div class="course-details">
            <div class="detail-section">
                <div class="course-header">
                    <img src="${course.thumbnail}" alt="${course.title}" class="course-image">
                    <div class="course-meta">
                        <h4>${course.title}</h4>
                        <p class="instructor">by ${course.instructor}</p>
                        <div class="course-badges">
                            <span class="badge badge-${getStatusClass(course.status)}">${course.status}</span>
                            <span class="badge badge-${getLevelClass(course.level)}">${course.level}</span>
                            <span class="badge badge-info">${course.category}</span>
                        </div>
                    </div>
                </div>
            </div>
            
            <div class="detail-section">
                <h4>Course Information</h4>
                <div class="detail-grid">
                    <div class="detail-item">
                        <label>Course ID:</label>
                        <span>${course.id}</span>
                    </div>
                    <div class="detail-item">
                        <label>Duration:</label>
                        <span>${course.duration} hours</span>
                    </div>
                    <div class="detail-item">
                        <label>Price:</label>
                        <span>$${course.price}</span>
                    </div>
                    <div class="detail-item">
                        <label>Enrollments:</label>
                        <span>${course.enrollments}</span>
                    </div>
                    <div class="detail-item">
                        <label>Created:</label>
                        <span>${formatDate(course.createdDate)}</span>
                    </div>
                    <div class="detail-item">
                        <label>Last Updated:</label>
                        <span>${formatDate(course.lastUpdated)}</span>
                    </div>
                </div>
            </div>
            
            <div class="detail-section">
                <h4>Description</h4>
                <p>${course.description}</p>
            </div>
            
            <div class="detail-section">
                <h4>Learning Objectives</h4>
                <ul>
                    ${course.objectives.map(obj => `<li>${obj}</li>`).join('')}
                </ul>
            </div>
            
            <div class="detail-section">
                <h4>Prerequisites</h4>
                <p>${course.prerequisites}</p>
            </div>
            
            <div class="detail-section">
                <h4>Tags</h4>
                <div class="tags">
                    ${course.tags.map(tag => `<span class="tag">${tag}</span>`).join('')}
                </div>
            </div>
        </div>
    `;
    
    selectedCourseId = id;
    document.getElementById('course-details-modal').style.display = 'block';
}

function editCourse(id) {
    const course = courses.find(c => c.id === id);
    if (!course) return;
    
    document.getElementById('modal-title').textContent = 'Edit Course';
    selectedCourseId = id;
    
    // Populate form fields
    document.getElementById('course-title').value = course.title;
    document.getElementById('course-category').value = course.category;
    document.getElementById('course-level').value = course.level;
    document.getElementById('course-duration').value = course.duration;
    document.getElementById('course-price').value = course.price;
    document.getElementById('course-instructor').value = course.instructor;
    document.getElementById('course-description').value = course.description;
    document.getElementById('course-objectives').value = course.objectives.join('\n');
    document.getElementById('course-prerequisites').value = course.prerequisites;
    document.getElementById('course-thumbnail').value = course.thumbnail;
    document.getElementById('course-status').value = course.status;
    document.getElementById('course-tags').value = course.tags.join(', ');
    
    document.getElementById('course-modal').style.display = 'block';
}

function publishCourse(id) {
    if (confirm('Are you sure you want to publish this course?')) {
        const course = courses.find(c => c.id === id);
        if (course) {
            course.status = 'published';
            course.lastUpdated = new Date().toISOString().split('T')[0];
            loadCourses();
            updateStats();
            showNotification('Course published successfully!', 'success');
        }
    }
}

function archiveCourse(id) {
    if (confirm('Are you sure you want to archive this course?')) {
        const course = courses.find(c => c.id === id);
        if (course) {
            course.status = 'archived';
            course.lastUpdated = new Date().toISOString().split('T')[0];
            loadCourses();
            updateStats();
            showNotification('Course archived successfully!', 'info');
        }
    }
}

function deleteCourse(id) {
    if (confirm('Are you sure you want to delete this course? This action cannot be undone.')) {
        const index = courses.findIndex(c => c.id === id);
        if (index !== -1) {
            courses.splice(index, 1);
            applyFilters();
            updateStats();
            showNotification('Course deleted successfully!', 'success');
        }
    }
}

// Form submission handler
function handleCourseSubmit(e) {
    e.preventDefault();
    
    const formData = new FormData(e.target);
    const courseData = Object.fromEntries(formData.entries());
    
    // Process objectives and tags
    const objectives = courseData.objectives.split('\n').filter(obj => obj.trim());
    const tags = courseData.tags.split(',').map(tag => tag.trim()).filter(tag => tag);
    
    if (selectedCourseId) {
        // Update existing course
        const course = courses.find(c => c.id === selectedCourseId);
        if (course) {
            Object.assign(course, {
                title: courseData.title,
                category: courseData.category,
                level: courseData.level,
                duration: parseInt(courseData.duration),
                price: parseFloat(courseData.price) || 0,
                instructor: courseData.instructor,
                description: courseData.description,
                objectives: objectives,
                prerequisites: courseData.prerequisites,
                thumbnail: courseData.thumbnail || 'https://via.placeholder.com/300x200?text=Course',
                status: courseData.status,
                tags: tags,
                lastUpdated: new Date().toISOString().split('T')[0]
            });
            showNotification('Course updated successfully!', 'success');
        }
    } else {
        // Add new course
        const newCourse = {
            id: 'CRS' + String(courses.length + 1).padStart(3, '0'),
            title: courseData.title,
            category: courseData.category,
            level: courseData.level,
            duration: parseInt(courseData.duration),
            price: parseFloat(courseData.price) || 0,
            instructor: courseData.instructor,
            description: courseData.description,
            objectives: objectives,
            prerequisites: courseData.prerequisites,
            thumbnail: courseData.thumbnail || 'https://via.placeholder.com/300x200?text=Course',
            status: courseData.status,
            tags: tags,
            enrollments: 0,
            createdDate: new Date().toISOString().split('T')[0],
            lastUpdated: new Date().toISOString().split('T')[0]
        };
        
        courses.push(newCourse);
        showNotification('Course added successfully!', 'success');
    }
    
    closeCourseModal();
    applyFilters();
    updateStats();
}

// Bulk actions
function applyBulkAction() {
    const action = document.getElementById('bulk-action').value;
    const selectedIds = Array.from(document.querySelectorAll('.row-checkbox:checked')).map(cb => cb.value);
    
    if (!action || selectedIds.length === 0) {
        showNotification('Please select an action and at least one course.', 'warning');
        return;
    }
    
    if (confirm(`Are you sure you want to ${action} ${selectedIds.length} course(s)?`)) {
        selectedIds.forEach(id => {
            const course = courses.find(c => c.id === id);
            if (course) {
                switch (action) {
                    case 'publish':
                        course.status = 'published';
                        break;
                    case 'draft':
                        course.status = 'draft';
                        break;
                    case 'archive':
                        course.status = 'archived';
                        break;
                    case 'delete':
                        const index = courses.findIndex(c => c.id === id);
                        if (index !== -1) {
                            courses.splice(index, 1);
                        }
                        break;
                }
                if (action !== 'delete') {
                    course.lastUpdated = new Date().toISOString().split('T')[0];
                }
            }
        });
        
        document.getElementById('bulk-action').value = '';
        document.getElementById('select-all').checked = false;
        applyFilters();
        updateStats();
        showNotification(`Bulk action completed for ${selectedIds.length} course(s)!`, 'success');
    }
}

// Modal action functions
function editCourseFromDetails() {
    if (selectedCourseId) {
        closeCourseDetailsModal();
        editCourse(selectedCourseId);
    }
}

function publishCourseFromDetails() {
    if (selectedCourseId) {
        publishCourse(selectedCourseId);
        closeCourseDetailsModal();
    }
}

function archiveCourseFromDetails() {
    if (selectedCourseId) {
        archiveCourse(selectedCourseId);
        closeCourseDetailsModal();
    }
}

// Update statistics
function updateStats() {
    const totalCourses = courses.length;
    const publishedCourses = courses.filter(c => c.status === 'published').length;
    const draftCourses = courses.filter(c => c.status === 'draft').length;
    const totalEnrollments = courses.reduce((sum, course) => sum + course.enrollments, 0);
    
    document.getElementById('total-courses').textContent = totalCourses;
    document.getElementById('published-courses').textContent = publishedCourses;
    document.getElementById('draft-courses').textContent = draftCourses;
    document.getElementById('total-enrollments').textContent = totalEnrollments.toLocaleString();
}

// Utility functions
function formatDate(dateString) {
    if (!dateString) return 'Not set';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
    });
}

function showNotification(message, type = 'info') {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <i class="fas fa-${type === 'success' ? 'check-circle' : type === 'warning' ? 'exclamation-triangle' : type === 'danger' ? 'times-circle' : 'info-circle'}"></i>
        <span>${message}</span>
        <button class="notification-close" onclick="this.parentElement.remove()">&times;</button>
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


/* ===============================
   CREATE COURSE POPUP LOGIC
================================*/
document.addEventListener('DOMContentLoaded', () => {
    // Elements for the popup
    const createBtn = document.getElementById('create-course-btn');
    const popup = document.getElementById('create-course-popup');
    const closeBtn = document.getElementById('close-popup-btn');
    const form = document.getElementById('create-course-form');

    // Check if elements exist before binding (avoid console errors)
    if (createBtn && popup && closeBtn && form) {
        
        // Show popup when clicking "Create New Course" button
        createBtn.addEventListener('click', () => {
            popup.style.display = 'flex';
        });

        // Close popup when clicking Cancel
        closeBtn.addEventListener('click', () => {
            popup.style.display = 'none';
        });

        // Submit popup form
        form.addEventListener('submit', (e) => {
            e.preventDefault();

            const title = document.getElementById('course-title').value.trim();
            const category = document.getElementById('course-category').value;
            const level = document.getElementById('course-level').value;
            const duration = parseInt(document.getElementById('course-duration').value);

            // Create a new course object
            const newCourse = {
                id: 'CRS' + String(courses.length + 1).padStart(3, '0'),
                title,
                category,
                level,
                duration,
                price: 0,
                instructor: 'Unknown',
                description: '',
                objectives: [],
                prerequisites: '',
                thumbnail: 'https://via.placeholder.com/300x200?text=Course',
                status: 'draft',
                tags: [],
                enrollments: 0,
                createdDate: new Date().toISOString().split('T')[0],
                lastUpdated: new Date().toISOString().split('T')[0]
            };

            courses.push(newCourse);
            applyFilters();
            updateStats();
            showNotification(`New course "${title}" created successfully!`, 'success');

            popup.style.display = 'none';
            form.reset();
        });

        // Close popup when clicking outside the form
        window.addEventListener('click', (e) => {
            if (e.target === popup) {
                popup.style.display = 'none';
            }
        });
    }
});
