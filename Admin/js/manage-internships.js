// Manage Internships JavaScript
let internships = [];
let filteredInternships = [];
let currentPage = 1;
let itemsPerPage = 10;
let selectedInternshipId = null;

// Sample internship data
const sampleInternships = [
    {
        id: 'INT001',
        title: 'Software Development Intern',
        company: 'TechCorp Solutions',
        companyId: 'COMP001',
        type: 'full-time',
        duration: 6,
        location: 'San Francisco, CA',
        salary: '$2000/month',
        description: 'Join our development team to work on cutting-edge web applications...',
        requirements: 'Computer Science student, JavaScript knowledge, Git experience',
        status: 'active',
        postedDate: '2024-01-15',
        deadline: '2024-02-15',
        applications: 25,
        notes: ''
    },
    {
        id: 'INT002',
        title: 'Marketing Intern',
        company: 'Creative Agency',
        companyId: 'COMP002',
        type: 'part-time',
        duration: 3,
        location: 'New York, NY',
        salary: '$1500/month',
        description: 'Support our marketing campaigns and social media initiatives...',
        requirements: 'Marketing or Communications student, Social media experience',
        status: 'pending',
        postedDate: '2024-01-20',
        deadline: '2024-02-20',
        applications: 12,
        notes: 'Pending review for content approval'
    },
    {
        id: 'INT003',
        title: 'Data Analysis Intern',
        company: 'DataTech Inc',
        companyId: 'COMP003',
        type: 'remote',
        duration: 4,
        location: 'Remote',
        salary: '$1800/month',
        description: 'Analyze large datasets and create meaningful insights...',
        requirements: 'Statistics or Data Science background, Python/R knowledge',
        status: 'flagged',
        postedDate: '2024-01-10',
        deadline: '2024-02-10',
        applications: 8,
        notes: 'Flagged for misleading salary information'
    },
    {
        id: 'INT004',
        title: 'UX Design Intern',
        company: 'Design Studio',
        companyId: 'COMP004',
        type: 'on-site',
        duration: 5,
        location: 'Los Angeles, CA',
        salary: '$2200/month',
        description: 'Work with our design team on user experience projects...',
        requirements: 'Design student, Figma/Sketch experience, Portfolio required',
        status: 'active',
        postedDate: '2024-01-18',
        deadline: '2024-02-18',
        applications: 18,
        notes: ''
    },
    {
        id: 'INT005',
        title: 'Finance Intern',
        company: 'Financial Services Corp',
        companyId: 'COMP005',
        type: 'full-time',
        duration: 6,
        location: 'Chicago, IL',
        salary: '$2500/month',
        description: 'Support financial analysis and reporting activities...',
        requirements: 'Finance or Accounting student, Excel proficiency',
        status: 'expired',
        postedDate: '2023-12-15',
        deadline: '2024-01-15',
        applications: 35,
        notes: 'Position deadline has passed'
    }
];

// Sample companies for dropdown
const companies = [
    { id: 'COMP001', name: 'TechCorp Solutions' },
    { id: 'COMP002', name: 'Creative Agency' },
    { id: 'COMP003', name: 'DataTech Inc' },
    { id: 'COMP004', name: 'Design Studio' },
    { id: 'COMP005', name: 'Financial Services Corp' }
];

// Initialize page
document.addEventListener('DOMContentLoaded', function() {
    internships = [...sampleInternships];
    filteredInternships = [...internships];
    
    loadInternships();
    setupEventListeners();
    loadCompaniesDropdown();
    updateStats();
});

// Setup event listeners
function setupEventListeners() {
    // Search functionality
    document.getElementById('internship-search').addEventListener('input', handleSearch);
    
    // Filter functionality
    document.getElementById('status-filter').addEventListener('change', applyFilters);
    document.getElementById('type-filter').addEventListener('change', applyFilters);
    document.getElementById('duration-filter').addEventListener('change', applyFilters);
    document.getElementById('date-filter').addEventListener('change', applyFilters);
    
    // Pagination
    document.getElementById('prev-page').addEventListener('click', () => changePage(-1));
    document.getElementById('next-page').addEventListener('click', () => changePage(1));
    
    // Select all checkbox
    document.getElementById('select-all').addEventListener('change', toggleSelectAll);
    
    // Form submission
    document.getElementById('internship-form').addEventListener('submit', handleInternshipSubmit);
    document.getElementById('flag-reason-form').addEventListener('submit', handleFlagSubmit);
}

// Load internships into table
function loadInternships() {
    const tbody = document.getElementById('internships-tbody');
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const pageInternships = filteredInternships.slice(startIndex, endIndex);
    
    tbody.innerHTML = '';
    
    pageInternships.forEach(internship => {
        const row = createInternshipRow(internship);
        tbody.appendChild(row);
    });
    
    updatePagination();
}

// Create internship table row
function createInternshipRow(internship) {
    const row = document.createElement('tr');
    
    const statusClass = getStatusClass(internship.status);
    const typeClass = getTypeClass(internship.type);
    
    row.innerHTML = `
        <td><input type="checkbox" class="row-checkbox" value="${internship.id}"></td>
        <td>${internship.id}</td>
        <td>
            <div class="internship-title">
                <strong>${internship.title}</strong>
                ${internship.notes ? `<i class="fas fa-sticky-note" title="${internship.notes}"></i>` : ''}
            </div>
        </td>
        <td>${internship.company}</td>
        <td><span class="badge badge-${typeClass}">${internship.type}</span></td>
        <td>${internship.duration} months</td>
        <td><span class="badge badge-${statusClass}">${internship.status}</span></td>
        <td>${formatDate(internship.postedDate)}</td>
        <td>${internship.applications}</td>
        <td>
            <div class="action-buttons">
                <button class="btn btn-sm btn-info" onclick="viewInternship('${internship.id}')" title="View Details">
                    <i class="fas fa-eye"></i>
                </button>
                <button class="btn btn-sm btn-primary" onclick="editInternship('${internship.id}')" title="Edit">
                    <i class="fas fa-edit"></i>
                </button>
                <button class="btn btn-sm btn-warning" onclick="flagInternship('${internship.id}')" title="Flag">
                    <i class="fas fa-flag"></i>
                </button>
                <button class="btn btn-sm btn-success" onclick="approveInternship('${internship.id}')" title="Approve">
                    <i class="fas fa-check"></i>
                </button>
                <button class="btn btn-sm btn-danger" onclick="deleteInternship('${internship.id}')" title="Delete">
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
        'active': 'success',
        'pending': 'warning',
        'flagged': 'danger',
        'expired': 'secondary',
        'closed': 'dark'
    };
    return statusClasses[status] || 'secondary';
}

// Get type class for styling
function getTypeClass(type) {
    const typeClasses = {
        'full-time': 'primary',
        'part-time': 'info',
        'remote': 'success',
        'on-site': 'warning'
    };
    return typeClasses[type] || 'secondary';
}

// Handle search
function handleSearch(e) {
    const searchTerm = e.target.value.toLowerCase();
    
    filteredInternships = internships.filter(internship => 
        internship.title.toLowerCase().includes(searchTerm) ||
        internship.company.toLowerCase().includes(searchTerm) ||
        internship.location.toLowerCase().includes(searchTerm) ||
        internship.id.toLowerCase().includes(searchTerm)
    );
    
    currentPage = 1;
    loadInternships();
}

// Apply filters
function applyFilters() {
    const statusFilter = document.getElementById('status-filter').value;
    const typeFilter = document.getElementById('type-filter').value;
    const durationFilter = document.getElementById('duration-filter').value;
    const dateFilter = document.getElementById('date-filter').value;
    
    filteredInternships = internships.filter(internship => {
        let matches = true;
        
        if (statusFilter && internship.status !== statusFilter) {
            matches = false;
        }
        
        if (typeFilter && internship.type !== typeFilter) {
            matches = false;
        }
        
        if (durationFilter) {
            const duration = internship.duration;
            switch (durationFilter) {
                case '1-3':
                    matches = matches && duration >= 1 && duration <= 3;
                    break;
                case '3-6':
                    matches = matches && duration > 3 && duration <= 6;
                    break;
                case '6-12':
                    matches = matches && duration > 6 && duration <= 12;
                    break;
                case '12+':
                    matches = matches && duration > 12;
                    break;
            }
        }
        
        if (dateFilter && internship.postedDate !== dateFilter) {
            matches = false;
        }
        
        return matches;
    });
    
    currentPage = 1;
    loadInternships();
}

// Pagination functions
function changePage(direction) {
    const totalPages = Math.ceil(filteredInternships.length / itemsPerPage);
    const newPage = currentPage + direction;
    
    if (newPage >= 1 && newPage <= totalPages) {
        currentPage = newPage;
        loadInternships();
    }
}

function updatePagination() {
    const totalPages = Math.ceil(filteredInternships.length / itemsPerPage);
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
function openAddInternshipModal() {
    document.getElementById('modal-title').textContent = 'Add New Internship';
    document.getElementById('internship-form').reset();
    selectedInternshipId = null;
    document.getElementById('internship-modal').style.display = 'block';
}

function closeInternshipModal() {
    document.getElementById('internship-modal').style.display = 'none';
    selectedInternshipId = null;
}

function closeInternshipDetailsModal() {
    document.getElementById('internship-details-modal').style.display = 'none';
}

function closeFlagReasonModal() {
    document.getElementById('flag-reason-modal').style.display = 'none';
}

// CRUD operations
function viewInternship(id) {
    const internship = internships.find(i => i.id === id);
    if (!internship) return;
    
    const detailsContent = document.getElementById('internship-details-content');
    detailsContent.innerHTML = `
        <div class="internship-details">
            <div class="detail-section">
                <h4>Basic Information</h4>
                <div class="detail-grid">
                    <div class="detail-item">
                        <label>ID:</label>
                        <span>${internship.id}</span>
                    </div>
                    <div class="detail-item">
                        <label>Title:</label>
                        <span>${internship.title}</span>
                    </div>
                    <div class="detail-item">
                        <label>Company:</label>
                        <span>${internship.company}</span>
                    </div>
                    <div class="detail-item">
                        <label>Type:</label>
                        <span class="badge badge-${getTypeClass(internship.type)}">${internship.type}</span>
                    </div>
                    <div class="detail-item">
                        <label>Duration:</label>
                        <span>${internship.duration} months</span>
                    </div>
                    <div class="detail-item">
                        <label>Location:</label>
                        <span>${internship.location}</span>
                    </div>
                    <div class="detail-item">
                        <label>Salary:</label>
                        <span>${internship.salary || 'Not specified'}</span>
                    </div>
                    <div class="detail-item">
                        <label>Status:</label>
                        <span class="badge badge-${getStatusClass(internship.status)}">${internship.status}</span>
                    </div>
                </div>
            </div>
            
            <div class="detail-section">
                <h4>Description</h4>
                <p>${internship.description}</p>
            </div>
            
            <div class="detail-section">
                <h4>Requirements</h4>
                <p>${internship.requirements}</p>
            </div>
            
            <div class="detail-section">
                <h4>Timeline</h4>
                <div class="detail-grid">
                    <div class="detail-item">
                        <label>Posted Date:</label>
                        <span>${formatDate(internship.postedDate)}</span>
                    </div>
                    <div class="detail-item">
                        <label>Application Deadline:</label>
                        <span>${formatDate(internship.deadline)}</span>
                    </div>
                    <div class="detail-item">
                        <label>Applications Received:</label>
                        <span>${internship.applications}</span>
                    </div>
                </div>
            </div>
            
            ${internship.notes ? `
            <div class="detail-section">
                <h4>Admin Notes</h4>
                <p>${internship.notes}</p>
            </div>
            ` : ''}
        </div>
    `;
    
    selectedInternshipId = id;
    document.getElementById('internship-details-modal').style.display = 'block';
}

function editInternship(id) {
    const internship = internships.find(i => i.id === id);
    if (!internship) return;
    
    document.getElementById('modal-title').textContent = 'Edit Internship';
    selectedInternshipId = id;
    
    // Populate form fields
    document.getElementById('internship-title').value = internship.title;
    document.getElementById('internship-company').value = internship.companyId;
    document.getElementById('internship-type').value = internship.type;
    document.getElementById('internship-duration').value = internship.duration;
    document.getElementById('internship-location').value = internship.location;
    document.getElementById('internship-salary').value = internship.salary || '';
    document.getElementById('internship-description').value = internship.description;
    document.getElementById('internship-requirements').value = internship.requirements;
    document.getElementById('internship-status').value = internship.status;
    document.getElementById('internship-deadline').value = internship.deadline;
    document.getElementById('internship-notes').value = internship.notes || '';
    
    document.getElementById('internship-modal').style.display = 'block';
}

function flagInternship(id) {
    selectedInternshipId = id;
    document.getElementById('flag-reason-form').reset();
    document.getElementById('flag-reason-modal').style.display = 'block';
}

function approveInternship(id) {
    if (confirm('Are you sure you want to approve this internship?')) {
        const internship = internships.find(i => i.id === id);
        if (internship) {
            internship.status = 'active';
            loadInternships();
            updateStats();
            showNotification('Internship approved successfully!', 'success');
        }
    }
}

function deleteInternship(id) {
    if (confirm('Are you sure you want to delete this internship? This action cannot be undone.')) {
        const index = internships.findIndex(i => i.id === id);
        if (index !== -1) {
            internships.splice(index, 1);
            applyFilters();
            updateStats();
            showNotification('Internship deleted successfully!', 'success');
        }
    }
}

// Form submission handlers
function handleInternshipSubmit(e) {
    e.preventDefault();
    
    const formData = new FormData(e.target);
    const internshipData = Object.fromEntries(formData.entries());
    
    // Find company name
    const company = companies.find(c => c.id === internshipData.company);
    
    if (selectedInternshipId) {
        // Update existing internship
        const internship = internships.find(i => i.id === selectedInternshipId);
        if (internship) {
            Object.assign(internship, {
                title: internshipData.title,
                company: company ? company.name : '',
                companyId: internshipData.company,
                type: internshipData.type,
                duration: parseInt(internshipData.duration),
                location: internshipData.location,
                salary: internshipData.salary,
                description: internshipData.description,
                requirements: internshipData.requirements,
                status: internshipData.status,
                deadline: internshipData.deadline,
                notes: internshipData.notes
            });
            showNotification('Internship updated successfully!', 'success');
        }
    } else {
        // Add new internship
        const newInternship = {
            id: 'INT' + String(internships.length + 1).padStart(3, '0'),
            title: internshipData.title,
            company: company ? company.name : '',
            companyId: internshipData.company,
            type: internshipData.type,
            duration: parseInt(internshipData.duration),
            location: internshipData.location,
            salary: internshipData.salary,
            description: internshipData.description,
            requirements: internshipData.requirements,
            status: internshipData.status,
            postedDate: new Date().toISOString().split('T')[0],
            deadline: internshipData.deadline,
            applications: 0,
            notes: internshipData.notes
        };
        
        internships.push(newInternship);
        showNotification('Internship added successfully!', 'success');
    }
    
    closeInternshipModal();
    applyFilters();
    updateStats();
}

function handleFlagSubmit(e) {
    e.preventDefault();
    
    const formData = new FormData(e.target);
    const reason = formData.get('reason');
    const notes = formData.get('notes');
    
    const internship = internships.find(i => i.id === selectedInternshipId);
    if (internship) {
        internship.status = 'flagged';
        internship.notes = `Flagged: ${reason}${notes ? ` - ${notes}` : ''}`;
        
        loadInternships();
        updateStats();
        showNotification('Internship flagged successfully!', 'warning');
    }
    
    closeFlagReasonModal();
}

// Bulk actions
function applyBulkAction() {
    const action = document.getElementById('bulk-action').value;
    const selectedIds = Array.from(document.querySelectorAll('.row-checkbox:checked')).map(cb => cb.value);
    
    if (!action || selectedIds.length === 0) {
        showNotification('Please select an action and at least one internship.', 'warning');
        return;
    }
    
    if (confirm(`Are you sure you want to ${action} ${selectedIds.length} internship(s)?`)) {
        selectedIds.forEach(id => {
            const internship = internships.find(i => i.id === id);
            if (internship) {
                switch (action) {
                    case 'approve':
                        internship.status = 'active';
                        break;
                    case 'flag':
                        internship.status = 'flagged';
                        internship.notes = 'Bulk flagged by admin';
                        break;
                    case 'expire':
                        internship.status = 'expired';
                        break;
                    case 'delete':
                        const index = internships.findIndex(i => i.id === id);
                        if (index !== -1) {
                            internships.splice(index, 1);
                        }
                        break;
                }
            }
        });
        
        document.getElementById('bulk-action').value = '';
        document.getElementById('select-all').checked = false;
        applyFilters();
        updateStats();
        showNotification(`Bulk action completed for ${selectedIds.length} internship(s)!`, 'success');
    }
}

// Modal action functions
function approveInternshipFromDetails() {
    if (selectedInternshipId) {
        approveInternship(selectedInternshipId);
        closeInternshipDetailsModal();
    }
}

function flagInternshipFromDetails() {
    if (selectedInternshipId) {
        closeInternshipDetailsModal();
        flagInternship(selectedInternshipId);
    }
}

function expireInternshipFromDetails() {
    if (selectedInternshipId && confirm('Are you sure you want to mark this internship as expired?')) {
        const internship = internships.find(i => i.id === selectedInternshipId);
        if (internship) {
            internship.status = 'expired';
            loadInternships();
            updateStats();
            showNotification('Internship marked as expired!', 'info');
        }
        closeInternshipDetailsModal();
    }
}

// Load companies dropdown
function loadCompaniesDropdown() {
    const select = document.getElementById('internship-company');
    companies.forEach(company => {
        const option = document.createElement('option');
        option.value = company.id;
        option.textContent = company.name;
        select.appendChild(option);
    });
}

// Update statistics
function updateStats() {
    const totalInternships = internships.length;
    const activeInternships = internships.filter(i => i.status === 'active').length;
    const pendingReview = internships.filter(i => i.status === 'pending').length;
    const flaggedInternships = internships.filter(i => i.status === 'flagged').length;
    
    document.getElementById('total-internships').textContent = totalInternships;
    document.getElementById('active-internships').textContent = activeInternships;
    document.getElementById('pending-review').textContent = pendingReview;
    document.getElementById('flagged-internships').textContent = flaggedInternships;
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