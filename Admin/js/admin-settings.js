// Admin Settings JavaScript

// Sample admin data
const adminsData = [
    {
        id: 1,
        name: 'John Smith',
        email: 'john.smith@inteu.com',
        role: 'Super Admin',
        status: 'Active',
        lastLogin: '2024-01-15 09:30:00',
        avatar: '../images/john-doe.png'
    },
    {
        id: 2,
        name: 'Sarah Johnson',
        email: 'sarah.johnson@inteu.com',
        role: 'Admin',
        status: 'Active',
        lastLogin: '2024-01-15 08:15:00',
        avatar: '../images/jane-doe.png'
    },
    {
        id: 3,
        name: 'Mike Wilson',
        email: 'mike.wilson@inteu.com',
        role: 'Moderator',
        status: 'Active',
        lastLogin: '2024-01-14 16:45:00',
        avatar: '../images/john-doe.png'
    },
    {
        id: 4,
        name: 'Emma Davis',
        email: 'emma.davis@inteu.com',
        role: 'Admin',
        status: 'Inactive',
        lastLogin: '2024-01-10 14:20:00',
        avatar: '../images/jane-doe.png'
    }
];

// Initialize settings page
document.addEventListener('DOMContentLoaded', function() {
    loadAdminsData();
    setupEventListeners();
    loadSavedSettings();
});

// Setup event listeners
function setupEventListeners() {
    // Form submissions
    document.getElementById('add-admin-form').addEventListener('submit', handleAddAdmin);
    
    // File upload for backup restore
    document.getElementById('backup-file').addEventListener('change', handleBackupFileSelect);
    
    // Color inputs for theme
    const colorInputs = document.querySelectorAll('input[type="color"]');
    colorInputs.forEach(input => {
        input.addEventListener('change', updateThemePreview);
    });
}

// Settings tab management
function showSettingsTab(tabName) {
    // Hide all content sections
    const contents = document.querySelectorAll('.settings-content');
    contents.forEach(content => {
        content.style.display = 'none';
    });
    
    // Remove active class from all tabs
    const tabs = document.querySelectorAll('.settings-tab');
    tabs.forEach(tab => {
        tab.classList.remove('active');
    });
    
    // Show selected content and activate tab
    document.getElementById(tabName).style.display = 'block';
    event.target.classList.add('active');
}

// Load admins data
function loadAdminsData() {
    const tbody = document.getElementById('admins-tbody');
    tbody.innerHTML = '';
    
    adminsData.forEach(admin => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${admin.id}</td>
            <td>
                <div class="user-info">
                    <img src="${admin.avatar}" alt="${admin.name}" class="user-avatar">
                    <span>${admin.name}</span>
                </div>
            </td>
            <td>${admin.email}</td>
            <td>
                <span class="role-badge role-${admin.role.toLowerCase().replace(' ', '-')}">${admin.role}</span>
            </td>
            <td>
                <span class="status-badge status-${admin.status.toLowerCase()}">${admin.status}</span>
            </td>
            <td>${formatDateTime(admin.lastLogin)}</td>
            <td>
                <div class="action-buttons">
                    <button class="btn btn-sm btn-primary" onclick="editAdmin(${admin.id})" title="Edit">
                        <i class="fas fa-edit"></i>
                    </button>
                    <button class="btn btn-sm btn-warning" onclick="resetAdminPassword(${admin.id})" title="Reset Password">
                        <i class="fas fa-key"></i>
                    </button>
                    <button class="btn btn-sm btn-danger" onclick="deleteAdmin(${admin.id})" title="Delete">
                        <i class="fas fa-trash"></i>
                    </button>
                </div>
            </td>
        `;
        tbody.appendChild(row);
    });
}

// Admin management functions
function openAddAdminModal() {
    document.getElementById('admin-modal-title').textContent = 'Add New Admin';
    document.getElementById('add-admin-form').reset();
    document.getElementById('add-admin-modal').style.display = 'flex';
}

function closeAddAdminModal() {
    document.getElementById('add-admin-modal').style.display = 'none';
}

function handleAddAdmin(e) {
    e.preventDefault();
    
    const formData = new FormData(e.target);
    const adminData = {
        id: adminsData.length + 1,
        name: formData.get('name'),
        email: formData.get('email'),
        role: formData.get('role'),
        status: formData.get('active') ? 'Active' : 'Inactive',
        lastLogin: 'Never',
        avatar: 'https://via.placeholder.com/40'
    };
    
    // Add to data array
    adminsData.push(adminData);
    
    // Reload table
    loadAdminsData();
    
    // Close modal
    closeAddAdminModal();
    
    // Show success message
    showNotification('Admin added successfully!', 'success');
}

function editAdmin(adminId) {
    const admin = adminsData.find(a => a.id === adminId);
    if (!admin) return;
    
    // Populate form with admin data
    document.getElementById('admin-name').value = admin.name;
    document.getElementById('admin-email').value = admin.email;
    document.getElementById('admin-role').value = admin.role.toLowerCase().replace(' ', '_');
    document.getElementById('admin-active').checked = admin.status === 'Active';
    document.getElementById('admin-password').value = '';
    
    // Change modal title
    document.getElementById('admin-modal-title').textContent = 'Edit Admin';
    
    // Show modal
    document.getElementById('add-admin-modal').style.display = 'flex';
}

function resetAdminPassword(adminId) {
    if (confirm('Are you sure you want to reset this admin\'s password?')) {
        // Generate temporary password
        const tempPassword = generateTempPassword();
        
        showNotification(`Password reset successfully! Temporary password: ${tempPassword}`, 'success');
    }
}

function deleteAdmin(adminId) {
    if (confirm('Are you sure you want to delete this admin? This action cannot be undone.')) {
        const index = adminsData.findIndex(a => a.id === adminId);
        if (index > -1) {
            adminsData.splice(index, 1);
            loadAdminsData();
            showNotification('Admin deleted successfully!', 'success');
        }
    }
}

// Settings management
function saveAllSettings() {
    const settings = {
        site: getFormData('site-settings-form'),
        theme: getFormData('theme-settings-form'),
        security: getFormData('security-settings-form'),
        email: getFormData('email-settings-form'),
        backup: getFormData('backup-settings-form')
    };
    
    // Save to localStorage (in real app, this would be sent to server)
    localStorage.setItem('adminSettings', JSON.stringify(settings));
    
    showNotification('All settings saved successfully!', 'success');
}

function loadSavedSettings() {
    const savedSettings = localStorage.getItem('adminSettings');
    if (savedSettings) {
        const settings = JSON.parse(savedSettings);
        
        // Load site settings
        if (settings.site) {
            populateForm('site-settings-form', settings.site);
        }
        
        // Load theme settings
        if (settings.theme) {
            populateForm('theme-settings-form', settings.theme);
            updateThemePreview();
        }
        
        // Load other settings
        if (settings.security) populateForm('security-settings-form', settings.security);
        if (settings.email) populateForm('email-settings-form', settings.email);
        if (settings.backup) populateForm('backup-settings-form', settings.backup);
    }
}

// Email functions
function testEmailConnection() {
    const button = event.target;
    const originalText = button.innerHTML;
    
    button.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Testing...';
    button.disabled = true;
    
    // Simulate email test
    setTimeout(() => {
        button.innerHTML = originalText;
        button.disabled = false;
        showNotification('Email connection test successful!', 'success');
    }, 2000);
}

function editEmailTemplate(templateType) {
    // In a real application, this would open a rich text editor
    const templates = {
        'welcome': 'Welcome to InteU Platform! Your account has been created successfully.',
        'password-reset': 'Click the link below to reset your password.',
        'application': 'You have received a new internship application.',
        'company-approval': 'Your company registration has been approved.'
    };
    
    const currentTemplate = templates[templateType] || '';
    const newTemplate = prompt(`Edit ${templateType} template:`, currentTemplate);
    
    if (newTemplate !== null) {
        templates[templateType] = newTemplate;
        showNotification('Email template updated successfully!', 'success');
    }
}

// Backup functions
function createManualBackup() {
    const button = event.target;
    const originalText = button.innerHTML;
    
    button.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Creating...';
    button.disabled = true;
    
    // Simulate backup creation
    setTimeout(() => {
        button.innerHTML = originalText;
        button.disabled = false;
        
        // Create download link
        const timestamp = new Date().toISOString().replace(/[:.]/g, '-').slice(0, -5);
        const filename = `backup_${timestamp}.zip`;
        
        showNotification(`Backup created successfully: ${filename}`, 'success');
        
        // In a real app, this would trigger an actual download
        console.log('Backup created:', filename);
    }, 3000);
}

function handleBackupFileSelect(e) {
    const file = e.target.files[0];
    if (file) {
        if (confirm(`Are you sure you want to restore from ${file.name}? This will overwrite all current data.`)) {
            restoreFromFile(file);
        }
    }
}

function restoreFromFile(file) {
    showNotification('Backup restore initiated. This may take several minutes...', 'info');
    
    // Simulate restore process
    setTimeout(() => {
        showNotification('Backup restored successfully! Please refresh the page.', 'success');
    }, 5000);
}

function downloadBackup(filename) {
    showNotification(`Downloading ${filename}...`, 'info');
    // In a real app, this would trigger the actual download
    console.log('Downloading backup:', filename);
}

function restoreBackup(filename) {
    if (confirm(`Are you sure you want to restore from ${filename}? This will overwrite all current data.`)) {
        showNotification('Backup restore initiated...', 'info');
        
        setTimeout(() => {
            showNotification('Backup restored successfully!', 'success');
        }, 3000);
    }
}

function deleteBackup(filename) {
    if (confirm(`Are you sure you want to delete ${filename}? This action cannot be undone.`)) {
        showNotification(`Backup ${filename} deleted successfully!`, 'success');
        // In a real app, remove from backup list
    }
}

// Theme functions
function updateThemePreview() {
    const primaryColor = document.getElementById('primary-color').value;
    const secondaryColor = document.getElementById('secondary-color').value;
    const successColor = document.getElementById('success-color').value;
    const dangerColor = document.getElementById('danger-color').value;
    
    // Update CSS custom properties
    document.documentElement.style.setProperty('--primary-color', primaryColor);
    document.documentElement.style.setProperty('--secondary-color', secondaryColor);
    document.documentElement.style.setProperty('--success-color', successColor);
    document.documentElement.style.setProperty('--danger-color', dangerColor);
}

// Utility functions
function getFormData(formId) {
    const form = document.getElementById(formId);
    const formData = new FormData(form);
    const data = {};
    
    for (let [key, value] of formData.entries()) {
        data[key] = value;
    }
    
    // Handle checkboxes
    const checkboxes = form.querySelectorAll('input[type="checkbox"]');
    checkboxes.forEach(checkbox => {
        data[checkbox.name] = checkbox.checked;
    });
    
    return data;
}

function populateForm(formId, data) {
    const form = document.getElementById(formId);
    
    Object.keys(data).forEach(key => {
        const input = form.querySelector(`[name="${key}"]`);
        if (input) {
            if (input.type === 'checkbox') {
                input.checked = data[key];
            } else {
                input.value = data[key];
            }
        }
    });
}

function generateTempPassword() {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*';
    let password = '';
    for (let i = 0; i < 12; i++) {
        password += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return password;
}

function formatDateTime(dateString) {
    if (dateString === 'Never') return 'Never';
    
    const date = new Date(dateString);
    return date.toLocaleDateString() + ' ' + date.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'});
}

function showNotification(message, type = 'info') {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <i class="fas fa-${type === 'success' ? 'check-circle' : type === 'error' ? 'exclamation-circle' : 'info-circle'}"></i>
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

// Mobile menu toggle
document.getElementById('mobile-menu-btn').addEventListener('click', function() {
    document.querySelector('.sidebar').classList.toggle('sidebar-open');
});

// Close sidebar when clicking outside on mobile
document.addEventListener('click', function(e) {
    const sidebar = document.querySelector('.sidebar');
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    
    if (!sidebar.contains(e.target) && !mobileMenuBtn.contains(e.target)) {
        sidebar.classList.remove('sidebar-open');
    }
});

// Close modal when clicking outside
window.addEventListener('click', function(e) {
    const modal = document.getElementById('add-admin-modal');
    if (e.target === modal) {
        closeAddAdminModal();
    }
});