// Manage Companies JavaScript
document.addEventListener('DOMContentLoaded', function() {
    initializeCompaniesPage();
});

let currentCompanies = [];
let currentPage = 1;
const companiesPerPage = 10;
let selectedCompanyId = null;

// Initialize companies page
function initializeCompaniesPage() {
    loadCompanies();
    setupEventListeners();
    setupFilters();
    updateStats();
}

// Load companies data
function loadCompanies() {
    // Simulate API call - replace with actual API endpoint
    currentCompanies = [
        {
            id: 1,
            name: 'Tech Solutions Inc.',
            email: 'contact@techsolutions.com',
            industry: 'technology',
            size: 'medium',
            status: 'approved',
            registrationDate: '2024-01-10',
            phone: '+1234567890',
            website: 'https://techsolutions.com',
            address: '123 Tech Street, Silicon Valley, CA',
            description: 'Leading technology solutions provider',
            contact: 'John Smith',
            internships: 5
        },
        {
            id: 2,
            name: 'FinanceFirst Corp',
            email: 'hr@financefirst.com',
            industry: 'finance',
            size: 'large',
            status: 'pending',
            registrationDate: '2024-01-15',
            phone: '+1234567891',
            website: 'https://financefirst.com',
            address: '456 Wall Street, New York, NY',
            description: 'Premier financial services company',
            contact: 'Sarah Johnson',
            internships: 0
        },
        {
            id: 3,
            name: 'HealthCare Plus',
            email: 'careers@healthcareplus.com',
            industry: 'healthcare',
            size: 'medium',
            status: 'approved',
            registrationDate: '2024-01-12',
            phone: '+1234567892',
            website: 'https://healthcareplus.com',
            address: '789 Medical Center Dr, Boston, MA',
            description: 'Innovative healthcare solutions',
            contact: 'Dr. Michael Brown',
            internships: 3
        },
        {
            id: 4,
            name: 'EduTech Innovations',
            email: 'info@edutech.com',
            industry: 'education',
            size: 'startup',
            status: 'pending',
            registrationDate: '2024-01-18',
            phone: '+1234567893',
            website: 'https://edutech.com',
            address: '321 Education Blvd, Austin, TX',
            description: 'Educational technology startup',
            contact: 'Lisa Davis',
            internships: 0
        },
        {
            id: 5,
            name: 'Manufacturing Pro',
            email: 'hr@manufacturingpro.com',
            industry: 'manufacturing',
            size: 'large',
            status: 'rejected',
            registrationDate: '2024-01-08',
            phone: '+1234567894',
            website: 'https://manufacturingpro.com',
            address: '654 Industrial Way, Detroit, MI',
            description: 'Industrial manufacturing company',
            contact: 'Robert Wilson',
            internships: 0
        }
    ];
    
    renderCompanies();
    updatePagination();
}

// Update statistics
function updateStats() {
    const totalCompanies = currentCompanies.length;
    const pendingCompanies = currentCompanies.filter(c => c.status === 'pending').length;
    const approvedCompanies = currentCompanies.filter(c => c.status === 'approved').length;
    const activeInternships = currentCompanies.reduce((sum, c) => sum + c.internships, 0);
    
    document.getElementById('total-companies').textContent = totalCompanies;
    document.getElementById('pending-companies').textContent = pendingCompanies;
    document.getElementById('approved-companies').textContent = approvedCompanies;
    document.getElementById('active-internships').textContent = activeInternships;
}

// Render companies table
function renderCompanies() {
    const tbody = document.getElementById('companies-tbody');
    const startIndex = (currentPage - 1) * companiesPerPage;
    const endIndex = startIndex + companiesPerPage;
    const companiesToShow = currentCompanies.slice(startIndex, endIndex);
    
    tbody.innerHTML = companiesToShow.map(company => `
        <tr>
            <td><input type="checkbox" class="company-checkbox" value="${company.id}"></td>
            <td>#${company.id}</td>
            <td>
                <div class="company-info">
                    <div class="company-logo">
                        <i class="fas fa-building"></i>
                    </div>
                    <div>
                        <strong>${company.name}</strong>
                        <br><small>${company.email}</small>
                    </div>
                </div>
            </td>
            <td><span class="industry-badge industry-${company.industry}">${company.industry}</span></td>
            <td><span class="size-badge size-${company.size}">${getSizeLabel(company.size)}</span></td>
            <td><span class="status-badge status-${company.status}">${company.status}</span></td>
            <td>${formatDate(company.registrationDate)}</td>
            <td>
                <span class="internship-count">${company.internships}</span>
            </td>
            <td>
                <div class="action-buttons">
                    <button class="btn-icon" onclick="viewCompany(${company.id})" title="View Details">
                        <i class="fas fa-eye"></i>
                    </button>
                    <button class="btn-icon" onclick="editCompany(${company.id})" title="Edit Company">
                        <i class="fas fa-edit"></i>
                    </button>
                    ${company.status === 'pending' ? `
                        <button class="btn-icon btn-success" onclick="approveCompany(${company.id})" title="Approve">
                            <i class="fas fa-check"></i>
                        </button>
                        <button class="btn-icon btn-danger" onclick="rejectCompany(${company.id})" title="Reject">
                            <i class="fas fa-times"></i>
                        </button>
                    ` : `
                        <button class="btn-icon ${company.status === 'suspended' ? 'btn-success' : 'btn-warning'}" 
                                onclick="toggleCompanyStatus(${company.id})" 
                                title="${company.status === 'suspended' ? 'Activate' : 'Suspend'} Company">
                            <i class="fas fa-${company.status === 'suspended' ? 'check' : 'ban'}"></i>
                        </button>
                    `}
                </div>
            </td>
        </tr>
    `).join('');
}

// Setup event listeners
function setupEventListeners() {
    // Search functionality
    document.getElementById('company-search').addEventListener('input', function() {
        const query = this.value.toLowerCase();
        filterCompanies(query);
    });
    
    // Select all checkbox
    document.getElementById('select-all').addEventListener('change', function() {
        const checkboxes = document.querySelectorAll('.company-checkbox');
        checkboxes.forEach(checkbox => {
            checkbox.checked = this.checked;
        });
    });
    
    // Pagination
    document.getElementById('prev-page').addEventListener('click', function() {
        if (currentPage > 1) {
            currentPage--;
            renderCompanies();
            updatePagination();
        }
    });
    
    document.getElementById('next-page').addEventListener('click', function() {
        const totalPages = Math.ceil(currentCompanies.length / companiesPerPage);
        if (currentPage < totalPages) {
            currentPage++;
            renderCompanies();
            updatePagination();
        }
    });
    
    // Company form submission
    document.getElementById('company-form').addEventListener('submit', function(e) {
        e.preventDefault();
        saveCompany();
    });
}

// Setup filters
function setupFilters() {
    const statusFilter = document.getElementById('status-filter');
    const industryFilter = document.getElementById('industry-filter');
    const sizeFilter = document.getElementById('size-filter');
    
    [statusFilter, industryFilter, sizeFilter].forEach(filter => {
        filter.addEventListener('change', applyFilters);
    });
}

// Apply filters
function applyFilters() {
    const statusFilter = document.getElementById('status-filter').value;
    const industryFilter = document.getElementById('industry-filter').value;
    const sizeFilter = document.getElementById('size-filter').value;
    
    let filteredCompanies = [...currentCompanies];
    
    if (statusFilter) {
        filteredCompanies = filteredCompanies.filter(company => company.status === statusFilter);
    }
    
    if (industryFilter) {
        filteredCompanies = filteredCompanies.filter(company => company.industry === industryFilter);
    }
    
    if (sizeFilter) {
        filteredCompanies = filteredCompanies.filter(company => company.size === sizeFilter);
    }
    
    // Update display with filtered companies
    renderFilteredCompanies(filteredCompanies);
}

// Render filtered companies
function renderFilteredCompanies(companies) {
    const tbody = document.getElementById('companies-tbody');
    tbody.innerHTML = companies.map(company => `
        <tr>
            <td><input type="checkbox" class="company-checkbox" value="${company.id}"></td>
            <td>#${company.id}</td>
            <td>
                <div class="company-info">
                    <div class="company-logo">
                        <i class="fas fa-building"></i>
                    </div>
                    <div>
                        <strong>${company.name}</strong>
                        <br><small>${company.email}</small>
                    </div>
                </div>
            </td>
            <td><span class="industry-badge industry-${company.industry}">${company.industry}</span></td>
            <td><span class="size-badge size-${company.size}">${getSizeLabel(company.size)}</span></td>
            <td><span class="status-badge status-${company.status}">${company.status}</span></td>
            <td>${formatDate(company.registrationDate)}</td>
            <td>
                <span class="internship-count">${company.internships}</span>
            </td>
            <td>
                <div class="action-buttons">
                    <button class="btn-icon" onclick="viewCompany(${company.id})" title="View Details">
                        <i class="fas fa-eye"></i>
                    </button>
                    <button class="btn-icon" onclick="editCompany(${company.id})" title="Edit Company">
                        <i class="fas fa-edit"></i>
                    </button>
                    ${company.status === 'pending' ? `
                        <button class="btn-icon btn-success" onclick="approveCompany(${company.id})" title="Approve">
                            <i class="fas fa-check"></i>
                        </button>
                        <button class="btn-icon btn-danger" onclick="rejectCompany(${company.id})" title="Reject">
                            <i class="fas fa-times"></i>
                        </button>
                    ` : `
                        <button class="btn-icon ${company.status === 'suspended' ? 'btn-success' : 'btn-warning'}" 
                                onclick="toggleCompanyStatus(${company.id})" 
                                title="${company.status === 'suspended' ? 'Activate' : 'Suspend'} Company">
                            <i class="fas fa-${company.status === 'suspended' ? 'check' : 'ban'}"></i>
                        </button>
                    `}
                </div>
            </td>
        </tr>
    `).join('');
}

// Filter companies by search query
function filterCompanies(query) {
    if (!query) {
        renderCompanies();
        return;
    }
    
    const filteredCompanies = currentCompanies.filter(company => 
        company.name.toLowerCase().includes(query) ||
        company.email.toLowerCase().includes(query) ||
        company.industry.toLowerCase().includes(query) ||
        company.contact.toLowerCase().includes(query)
    );
    
    renderFilteredCompanies(filteredCompanies);
}

// Update pagination
function updatePagination() {
    const totalPages = Math.ceil(currentCompanies.length / companiesPerPage);
    document.getElementById('current-page').textContent = currentPage;
    document.getElementById('total-pages').textContent = totalPages;
    
    document.getElementById('prev-page').disabled = currentPage === 1;
    document.getElementById('next-page').disabled = currentPage === totalPages;
}

// Open add company modal
function openAddCompanyModal() {
    document.getElementById('modal-title').textContent = 'Add New Company';
    document.getElementById('company-form').reset();
    document.getElementById('company-modal').style.display = 'block';
}

// Close company modal
function closeCompanyModal() {
    document.getElementById('company-modal').style.display = 'none';
}

// View company details
function viewCompany(companyId) {
    const company = currentCompanies.find(c => c.id === companyId);
    if (!company) return;
    
    selectedCompanyId = companyId;
    
    const detailsContent = document.getElementById('company-details-content');
    detailsContent.innerHTML = `
        <div class="company-details">
            <div class="detail-section">
                <h4>Basic Information</h4>
                <div class="detail-grid">
                    <div class="detail-row">
                        <label>Company ID:</label>
                        <span>#${company.id}</span>
                    </div>
                    <div class="detail-row">
                        <label>Company Name:</label>
                        <span>${company.name}</span>
                    </div>
                    <div class="detail-row">
                        <label>Email:</label>
                        <span>${company.email}</span>
                    </div>
                    <div class="detail-row">
                        <label>Phone:</label>
                        <span>${company.phone}</span>
                    </div>
                    <div class="detail-row">
                        <label>Website:</label>
                        <span><a href="${company.website}" target="_blank">${company.website}</a></span>
                    </div>
                    <div class="detail-row">
                        <label>Contact Person:</label>
                        <span>${company.contact}</span>
                    </div>
                </div>
            </div>
            
            <div class="detail-section">
                <h4>Company Details</h4>
                <div class="detail-grid">
                    <div class="detail-row">
                        <label>Industry:</label>
                        <span class="industry-badge industry-${company.industry}">${company.industry}</span>
                    </div>
                    <div class="detail-row">
                        <label>Company Size:</label>
                        <span class="size-badge size-${company.size}">${getSizeLabel(company.size)}</span>
                    </div>
                    <div class="detail-row">
                        <label>Status:</label>
                        <span class="status-badge status-${company.status}">${company.status}</span>
                    </div>
                    <div class="detail-row">
                        <label>Registration Date:</label>
                        <span>${formatDate(company.registrationDate)}</span>
                    </div>
                    <div class="detail-row">
                        <label>Active Internships:</label>
                        <span>${company.internships}</span>
                    </div>
                </div>
            </div>
            
            <div class="detail-section">
                <h4>Address</h4>
                <p>${company.address}</p>
            </div>
            
            <div class="detail-section">
                <h4>Description</h4>
                <p>${company.description}</p>
            </div>
        </div>
    `;
    
    document.getElementById('company-details-modal').style.display = 'block';
}

// Close company details modal
function closeCompanyDetailsModal() {
    document.getElementById('company-details-modal').style.display = 'none';
    selectedCompanyId = null;
}

// Edit company
function editCompany(companyId) {
    const company = currentCompanies.find(c => c.id === companyId);
    if (!company) return;
    
    document.getElementById('modal-title').textContent = 'Edit Company';
    document.getElementById('company-name').value = company.name;
    document.getElementById('company-email').value = company.email;
    document.getElementById('company-industry').value = company.industry;
    document.getElementById('company-size').value = company.size;
    document.getElementById('company-phone').value = company.phone;
    document.getElementById('company-website').value = company.website;
    document.getElementById('company-address').value = company.address;
    document.getElementById('company-description').value = company.description;
    document.getElementById('company-status').value = company.status;
    document.getElementById('company-contact').value = company.contact;
    
    // Store company ID for update
    document.getElementById('company-form').dataset.companyId = companyId;
    
    document.getElementById('company-modal').style.display = 'block';
}

// Save company (add or update)
function saveCompany() {
    const form = document.getElementById('company-form');
    const formData = new FormData(form);
    const companyId = form.dataset.companyId;
    
    const companyData = {
        name: formData.get('name'),
        email: formData.get('email'),
        industry: formData.get('industry'),
        size: formData.get('size'),
        phone: formData.get('phone'),
        website: formData.get('website'),
        address: formData.get('address'),
        description: formData.get('description'),
        status: formData.get('status'),
        contact: formData.get('contact'),
        notes: formData.get('notes')
    };
    
    if (companyId) {
        // Update existing company
        const companyIndex = currentCompanies.findIndex(c => c.id === parseInt(companyId));
        if (companyIndex !== -1) {
            currentCompanies[companyIndex] = { ...currentCompanies[companyIndex], ...companyData };
            window.AdminDashboard.showToast('Company updated successfully', 'success');
        }
    } else {
        // Add new company
        const newCompany = {
            id: Math.max(...currentCompanies.map(c => c.id)) + 1,
            ...companyData,
            registrationDate: new Date().toISOString().split('T')[0],
            internships: 0
        };
        currentCompanies.push(newCompany);
        window.AdminDashboard.showToast('Company added successfully', 'success');
    }
    
    renderCompanies();
    updateStats();
    closeCompanyModal();
    form.reset();
    delete form.dataset.companyId;
}

// Approve company
function approveCompany(companyId) {
    window.AdminDashboard.confirmAction(
        'Are you sure you want to approve this company?',
        () => {
            const company = currentCompanies.find(c => c.id === companyId);
            if (company) {
                company.status = 'approved';
                renderCompanies();
                updateStats();
                window.AdminDashboard.showToast('Company approved successfully', 'success');
            }
        }
    );
}

// Reject company
function rejectCompany(companyId) {
    window.AdminDashboard.confirmAction(
        'Are you sure you want to reject this company?',
        () => {
            const company = currentCompanies.find(c => c.id === companyId);
            if (company) {
                company.status = 'rejected';
                renderCompanies();
                updateStats();
                window.AdminDashboard.showToast('Company rejected', 'warning');
            }
        }
    );
}

// Approve company from details modal
function approveCompanyFromDetails() {
    if (selectedCompanyId) {
        approveCompany(selectedCompanyId);
        closeCompanyDetailsModal();
    }
}

// Reject company from details modal
function rejectCompanyFromDetails() {
    if (selectedCompanyId) {
        rejectCompany(selectedCompanyId);
        closeCompanyDetailsModal();
    }
}

// Toggle company status
function toggleCompanyStatus(companyId) {
    const company = currentCompanies.find(c => c.id === companyId);
    if (!company) return;
    
    const newStatus = company.status === 'suspended' ? 'approved' : 'suspended';
    const action = newStatus === 'suspended' ? 'suspend' : 'activate';
    
    window.AdminDashboard.confirmAction(
        `Are you sure you want to ${action} this company?`,
        () => {
            company.status = newStatus;
            renderCompanies();
            updateStats();
            window.AdminDashboard.showToast(`Company ${action}d successfully`, 'success');
        }
    );
}

// Apply bulk actions
function applyBulkAction() {
    const action = document.getElementById('bulk-action').value;
    const selectedCompanies = Array.from(document.querySelectorAll('.company-checkbox:checked'))
        .map(checkbox => parseInt(checkbox.value));
    
    if (!action || selectedCompanies.length === 0) {
        window.AdminDashboard.showToast('Please select an action and companies', 'warning');
        return;
    }
    
    window.AdminDashboard.confirmAction(
        `Are you sure you want to ${action} ${selectedCompanies.length} company(ies)?`,
        () => {
            selectedCompanies.forEach(companyId => {
                const company = currentCompanies.find(c => c.id === companyId);
                if (company) {
                    switch(action) {
                        case 'approve':
                            company.status = 'approved';
                            break;
                        case 'reject':
                            company.status = 'rejected';
                            break;
                        case 'suspend':
                            company.status = 'suspended';
                            break;
                    }
                }
            });
            
            renderCompanies();
            updateStats();
            document.getElementById('select-all').checked = false;
            window.AdminDashboard.showToast(`Bulk ${action} completed successfully`, 'success');
        }
    );
}

// Utility functions
function getSizeLabel(size) {
    const labels = {
        startup: 'Startup (1-10)',
        small: 'Small (11-50)',
        medium: 'Medium (51-200)',
        large: 'Large (200+)'
    };
    return labels[size] || size;
}

function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
    });
}