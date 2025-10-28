// Manage Users JavaScript
document.addEventListener('DOMContentLoaded', function() {
    initializeUsersPage();
});

let currentUsers = [];
let currentPage = 1;
const usersPerPage = 10;

// Initialize users page
function initializeUsersPage() {
    loadUsers();
    setupEventListeners();
    setupFilters();
}

// Load users data
function loadUsers() {
    // Simulate API call - replace with actual API endpoint
    currentUsers = [
        {
            id: 1,
            name: 'John Doe',
            email: 'john.doe@email.com',
            role: 'applicant',
            status: 'active',
            registrationDate: '2024-01-15',
            lastLogin: '2024-01-20',
            phone: '+1234567890',
            location: 'New York, NY'
        },
        {
            id: 2,
            name: 'Jane Smith',
            email: 'jane.smith@company.com',
            role: 'company',
            status: 'active',
            registrationDate: '2024-01-10',
            lastLogin: '2024-01-19',
            phone: '+1234567891',
            location: 'Los Angeles, CA'
        },
        {
            id: 3,
            name: 'Mike Johnson',
            email: 'mike.johnson@email.com',
            role: 'applicant',
            status: 'suspended',
            registrationDate: '2024-01-12',
            lastLogin: '2024-01-18',
            phone: '+1234567892',
            location: 'Chicago, IL'
        },
        {
            id: 4,
            name: 'Sarah Wilson',
            email: 'sarah.wilson@email.com',
            role: 'applicant',
            status: 'pending',
            registrationDate: '2024-01-18',
            lastLogin: 'Never',
            phone: '+1234567893',
            location: 'Houston, TX'
        },
        {
            id: 5,
            name: 'Admin User',
            email: 'admin@system.com',
            role: 'admin',
            status: 'active',
            registrationDate: '2024-01-01',
            lastLogin: '2024-01-20',
            phone: '+1234567894',
            location: 'System'
        }
    ];
    
    renderUsers();
    updatePagination();
}

// Render users table
function renderUsers() {
    const tbody = document.getElementById('users-tbody');
    const startIndex = (currentPage - 1) * usersPerPage;
    const endIndex = startIndex + usersPerPage;
    const usersToShow = currentUsers.slice(startIndex, endIndex);
    
    tbody.innerHTML = usersToShow.map(user => `
        <tr>
            <td><input type="checkbox" class="user-checkbox" value="${user.id}"></td>
            <td>#${user.id}</td>
            <td>
                <div class="user-info">
                    <img src="https://via.placeholder.com/32" alt="${user.name}" class="user-avatar">
                    <span>${user.name}</span>
                </div>
            </td>
            <td>${user.email}</td>
            <td><span class="role-badge role-${user.role}">${user.role}</span></td>
            <td><span class="status-badge status-${user.status}">${user.status}</span></td>
            <td>${formatDate(user.registrationDate)}</td>
            <td>${user.lastLogin === 'Never' ? 'Never' : formatDate(user.lastLogin)}</td>
            <td>
                <div class="action-buttons">
                    <button class="btn-icon" onclick="viewUser(${user.id})" title="View Details">
                        <i class="fas fa-eye"></i>
                    </button>
                    <button class="btn-icon" onclick="editUser(${user.id})" title="Edit User">
                        <i class="fas fa-edit"></i>
                    </button>
                    <button class="btn-icon ${user.status === 'suspended' ? 'btn-success' : 'btn-warning'}" 
                            onclick="toggleUserStatus(${user.id})" 
                            title="${user.status === 'suspended' ? 'Activate' : 'Suspend'} User">
                        <i class="fas fa-${user.status === 'suspended' ? 'check' : 'ban'}"></i>
                    </button>
                    <button class="btn-icon btn-danger" onclick="deleteUser(${user.id})" title="Delete User">
                        <i class="fas fa-trash"></i>
                    </button>
                </div>
            </td>
        </tr>
    `).join('');
}

// Setup event listeners
function setupEventListeners() {
    // Search functionality
    document.getElementById('user-search').addEventListener('input', function() {
        const query = this.value.toLowerCase();
        filterUsers(query);
    });
    
    // Select all checkbox
    document.getElementById('select-all').addEventListener('change', function() {
        const checkboxes = document.querySelectorAll('.user-checkbox');
        checkboxes.forEach(checkbox => {
            checkbox.checked = this.checked;
        });
    });
    
    // Pagination
    document.getElementById('prev-page').addEventListener('click', function() {
        if (currentPage > 1) {
            currentPage--;
            renderUsers();
            updatePagination();
        }
    });
    
    document.getElementById('next-page').addEventListener('click', function() {
        const totalPages = Math.ceil(currentUsers.length / usersPerPage);
        if (currentPage < totalPages) {
            currentPage++;
            renderUsers();
            updatePagination();
        }
    });
    
    // User form submission
    document.getElementById('user-form').addEventListener('submit', function(e) {
        e.preventDefault();
        saveUser();
    });
}

// Setup filters
function setupFilters() {
    const statusFilter = document.getElementById('status-filter');
    const roleFilter = document.getElementById('role-filter');
    const dateFilter = document.getElementById('date-filter');
    
    [statusFilter, roleFilter, dateFilter].forEach(filter => {
        filter.addEventListener('change', applyFilters);
    });
}

// Apply filters
function applyFilters() {
    const statusFilter = document.getElementById('status-filter').value;
    const roleFilter = document.getElementById('role-filter').value;
    const dateFilter = document.getElementById('date-filter').value;
    
    let filteredUsers = [...currentUsers];
    
    if (statusFilter) {
        filteredUsers = filteredUsers.filter(user => user.status === statusFilter);
    }
    
    if (roleFilter) {
        filteredUsers = filteredUsers.filter(user => user.role === roleFilter);
    }
    
    if (dateFilter) {
        filteredUsers = filteredUsers.filter(user => user.registrationDate === dateFilter);
    }
    
    // Update display with filtered users
    const tbody = document.getElementById('users-tbody');
    tbody.innerHTML = filteredUsers.map(user => `
        <tr>
            <td><input type="checkbox" class="user-checkbox" value="${user.id}"></td>
            <td>#${user.id}</td>
            <td>
                <div class="user-info">
                    <img src="https://via.placeholder.com/32" alt="${user.name}" class="user-avatar">
                    <span>${user.name}</span>
                </div>
            </td>
            <td>${user.email}</td>
            <td><span class="role-badge role-${user.role}">${user.role}</span></td>
            <td><span class="status-badge status-${user.status}">${user.status}</span></td>
            <td>${formatDate(user.registrationDate)}</td>
            <td>${user.lastLogin === 'Never' ? 'Never' : formatDate(user.lastLogin)}</td>
            <td>
                <div class="action-buttons">
                    <button class="btn-icon" onclick="viewUser(${user.id})" title="View Details">
                        <i class="fas fa-eye"></i>
                    </button>
                    <button class="btn-icon" onclick="editUser(${user.id})" title="Edit User">
                        <i class="fas fa-edit"></i>
                    </button>
                    <button class="btn-icon ${user.status === 'suspended' ? 'btn-success' : 'btn-warning'}" 
                            onclick="toggleUserStatus(${user.id})" 
                            title="${user.status === 'suspended' ? 'Activate' : 'Suspend'} User">
                        <i class="fas fa-${user.status === 'suspended' ? 'check' : 'ban'}"></i>
                    </button>
                    <button class="btn-icon btn-danger" onclick="deleteUser(${user.id})" title="Delete User">
                        <i class="fas fa-trash"></i>
                    </button>
                </div>
            </td>
        </tr>
    `).join('');
}

// Filter users by search query
function filterUsers(query) {
    if (!query) {
        renderUsers();
        return;
    }
    
    const filteredUsers = currentUsers.filter(user => 
        user.name.toLowerCase().includes(query) ||
        user.email.toLowerCase().includes(query) ||
        user.role.toLowerCase().includes(query)
    );
    
    const tbody = document.getElementById('users-tbody');
    tbody.innerHTML = filteredUsers.map(user => `
        <tr>
            <td><input type="checkbox" class="user-checkbox" value="${user.id}"></td>
            <td>#${user.id}</td>
            <td>
                <div class="user-info">
                    <img src="https://via.placeholder.com/32" alt="${user.name}" class="user-avatar">
                    <span>${user.name}</span>
                </div>
            </td>
            <td>${user.email}</td>
            <td><span class="role-badge role-${user.role}">${user.role}</span></td>
            <td><span class="status-badge status-${user.status}">${user.status}</span></td>
            <td>${formatDate(user.registrationDate)}</td>
            <td>${user.lastLogin === 'Never' ? 'Never' : formatDate(user.lastLogin)}</td>
            <td>
                <div class="action-buttons">
                    <button class="btn-icon" onclick="viewUser(${user.id})" title="View Details">
                        <i class="fas fa-eye"></i>
                    </button>
                    <button class="btn-icon" onclick="editUser(${user.id})" title="Edit User">
                        <i class="fas fa-edit"></i>
                    </button>
                    <button class="btn-icon ${user.status === 'suspended' ? 'btn-success' : 'btn-warning'}" 
                            onclick="toggleUserStatus(${user.id})" 
                            title="${user.status === 'suspended' ? 'Activate' : 'Suspend'} User">
                        <i class="fas fa-${user.status === 'suspended' ? 'check' : 'ban'}"></i>
                    </button>
                    <button class="btn-icon btn-danger" onclick="deleteUser(${user.id})" title="Delete User">
                        <i class="fas fa-trash"></i>
                    </button>
                </div>
            </td>
        </tr>
    `).join('');
}

// Update pagination
function updatePagination() {
    const totalPages = Math.ceil(currentUsers.length / usersPerPage);
    document.getElementById('current-page').textContent = currentPage;
    document.getElementById('total-pages').textContent = totalPages;
    
    document.getElementById('prev-page').disabled = currentPage === 1;
    document.getElementById('next-page').disabled = currentPage === totalPages;
}

// Open add user modal
function openAddUserModal() {
    document.getElementById('modal-title').textContent = 'Add New User';
    document.getElementById('user-form').reset();
    document.getElementById('user-modal').style.display = 'block';
}

// Close user modal
function closeUserModal() {
    document.getElementById('user-modal').style.display = 'none';
}

// View user details
function viewUser(userId) {
    const user = currentUsers.find(u => u.id === userId);
    if (!user) return;
    
    const detailsContent = document.getElementById('user-details-content');
    detailsContent.innerHTML = `
        <div class="user-details">
            <div class="detail-row">
                <label>User ID:</label>
                <span>#${user.id}</span>
            </div>
            <div class="detail-row">
                <label>Full Name:</label>
                <span>${user.name}</span>
            </div>
            <div class="detail-row">
                <label>Email:</label>
                <span>${user.email}</span>
            </div>
            <div class="detail-row">
                <label>Phone:</label>
                <span>${user.phone}</span>
            </div>
            <div class="detail-row">
                <label>Location:</label>
                <span>${user.location}</span>
            </div>
            <div class="detail-row">
                <label>Role:</label>
                <span class="role-badge role-${user.role}">${user.role}</span>
            </div>
            <div class="detail-row">
                <label>Status:</label>
                <span class="status-badge status-${user.status}">${user.status}</span>
            </div>
            <div class="detail-row">
                <label>Registration Date:</label>
                <span>${formatDate(user.registrationDate)}</span>
            </div>
            <div class="detail-row">
                <label>Last Login:</label>
                <span>${user.lastLogin === 'Never' ? 'Never' : formatDate(user.lastLogin)}</span>
            </div>
        </div>
    `;
    
    document.getElementById('user-details-modal').style.display = 'block';
}

// Close user details modal
function closeUserDetailsModal() {
    document.getElementById('user-details-modal').style.display = 'none';
}

// Edit user
function editUser(userId) {
    const user = currentUsers.find(u => u.id === userId);
    if (!user) return;
    
    document.getElementById('modal-title').textContent = 'Edit User';
    document.getElementById('user-name').value = user.name;
    document.getElementById('user-email').value = user.email;
    document.getElementById('user-role').value = user.role;
    document.getElementById('user-status').value = user.status;
    document.getElementById('user-phone').value = user.phone;
    document.getElementById('user-location').value = user.location;
    
    // Store user ID for update
    document.getElementById('user-form').dataset.userId = userId;
    
    document.getElementById('user-modal').style.display = 'block';
}

// Save user (add or update)
function saveUser() {
    const form = document.getElementById('user-form');
    const formData = new FormData(form);
    const userId = form.dataset.userId;
    
    const userData = {
        name: formData.get('name'),
        email: formData.get('email'),
        role: formData.get('role'),
        status: formData.get('status'),
        phone: formData.get('phone'),
        location: formData.get('location'),
        notes: formData.get('notes')
    };
    
    if (userId) {
        // Update existing user
        const userIndex = currentUsers.findIndex(u => u.id === parseInt(userId));
        if (userIndex !== -1) {
            currentUsers[userIndex] = { ...currentUsers[userIndex], ...userData };
            window.AdminDashboard.showToast('User updated successfully', 'success');
        }
    } else {
        // Add new user
        const newUser = {
            id: Math.max(...currentUsers.map(u => u.id)) + 1,
            ...userData,
            registrationDate: new Date().toISOString().split('T')[0],
            lastLogin: 'Never'
        };
        currentUsers.push(newUser);
        window.AdminDashboard.showToast('User added successfully', 'success');
    }
    
    renderUsers();
    closeUserModal();
    form.reset();
    delete form.dataset.userId;
}

// Toggle user status
function toggleUserStatus(userId) {
    const user = currentUsers.find(u => u.id === userId);
    if (!user) return;
    
    const newStatus = user.status === 'suspended' ? 'active' : 'suspended';
    const action = newStatus === 'suspended' ? 'suspend' : 'activate';
    
    window.AdminDashboard.confirmAction(
        `Are you sure you want to ${action} this user?`,
        () => {
            user.status = newStatus;
            renderUsers();
            window.AdminDashboard.showToast(`User ${action}d successfully`, 'success');
        }
    );
}

// Delete user
function deleteUser(userId) {
    window.AdminDashboard.confirmAction(
        'Are you sure you want to delete this user? This action cannot be undone.',
        () => {
            const userIndex = currentUsers.findIndex(u => u.id === userId);
            if (userIndex !== -1) {
                currentUsers.splice(userIndex, 1);
                renderUsers();
                updatePagination();
                window.AdminDashboard.showToast('User deleted successfully', 'success');
            }
        }
    );
}

// Apply bulk actions
function applyBulkAction() {
    const action = document.getElementById('bulk-action').value;
    const selectedUsers = Array.from(document.querySelectorAll('.user-checkbox:checked'))
        .map(checkbox => parseInt(checkbox.value));
    
    if (!action || selectedUsers.length === 0) {
        window.AdminDashboard.showToast('Please select an action and users', 'warning');
        return;
    }
    
    window.AdminDashboard.confirmAction(
        `Are you sure you want to ${action} ${selectedUsers.length} user(s)?`,
        () => {
            selectedUsers.forEach(userId => {
                const user = currentUsers.find(u => u.id === userId);
                if (user) {
                    switch(action) {
                        case 'activate':
                            user.status = 'active';
                            break;
                        case 'suspend':
                            user.status = 'suspended';
                            break;
                        case 'delete':
                            const userIndex = currentUsers.findIndex(u => u.id === userId);
                            if (userIndex !== -1) {
                                currentUsers.splice(userIndex, 1);
                            }
                            break;
                    }
                }
            });
            
            renderUsers();
            updatePagination();
            document.getElementById('select-all').checked = false;
            window.AdminDashboard.showToast(`Bulk ${action} completed successfully`, 'success');
        }
    );
}

// Utility function to format dates
function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
    });
}