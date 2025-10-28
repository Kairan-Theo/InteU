// Chart instances
let userChart, applicationChart, companyChart, categoryChart;

// Sample data for reports
const reportsData = {
    userRegistrations: {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
        data: [45, 52, 48, 61, 55, 67, 73, 69, 78, 82, 89, 95]
    },
    applicationStatus: {
        labels: ['Pending', 'Approved', 'Rejected', 'In Review'],
        data: [35, 45, 15, 25],
        colors: ['#ffc107', '#28a745', '#dc3545', '#17a2b8']
    },
    companyActivity: {
        labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
        data: [12, 19, 15, 22]
    },
    internshipCategories: {
        labels: ['Technology', 'Marketing', 'Finance', 'Design', 'Sales', 'HR'],
        data: [35, 25, 20, 15, 10, 8],
        colors: ['#007bff', '#28a745', '#ffc107', '#dc3545', '#6f42c1', '#fd7e14']
    },
    topCompanies: [
        { name: 'TechCorp Inc.', internships: 25, applications: 450, successRate: '78%' },
        { name: 'Digital Solutions', internships: 18, applications: 320, successRate: '72%' },
        { name: 'Innovation Labs', internships: 22, applications: 380, successRate: '69%' },
        { name: 'StartupXYZ', internships: 15, applications: 280, successRate: '65%' },
        { name: 'Global Systems', internships: 20, applications: 350, successRate: '63%' }
    ],
    popularInternships: [
        { position: 'Software Developer Intern', company: 'TechCorp Inc.', applications: 89, views: 1250 },
        { position: 'Marketing Intern', company: 'Digital Solutions', applications: 67, views: 980 },
        { position: 'Data Analyst Intern', company: 'Innovation Labs', applications: 78, views: 1100 },
        { position: 'UI/UX Designer Intern', company: 'StartupXYZ', applications: 56, views: 890 },
        { position: 'Business Analyst Intern', company: 'Global Systems', applications: 45, views: 750 }
    ]
};

// Initialize the page
document.addEventListener('DOMContentLoaded', function() {
    initializeCharts();
    loadReportData();
    setupEventListeners();
});

// Setup event listeners
function setupEventListeners() {
    // Date range selector
    document.getElementById('date-range').addEventListener('change', function() {
        if (this.value === 'custom') {
            openDateRangeModal();
        } else {
            updateReportsForDateRange(this.value);
        }
    });
}

// Initialize all charts
function initializeCharts() {
    initUserChart();
    initApplicationChart();
    initCompanyChart();
    initCategoryChart();
}

// Initialize user registration chart
function initUserChart() {
    const ctx = document.getElementById('userChart').getContext('2d');
    userChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: reportsData.userRegistrations.labels,
            datasets: [{
                label: 'User Registrations',
                data: reportsData.userRegistrations.data,
                borderColor: '#007bff',
                backgroundColor: 'rgba(0, 123, 255, 0.1)',
                borderWidth: 2,
                fill: true,
                tension: 0.4
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    display: false
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    grid: {
                        color: 'rgba(0, 0, 0, 0.1)'
                    }
                },
                x: {
                    grid: {
                        color: 'rgba(0, 0, 0, 0.1)'
                    }
                }
            }
        }
    });
}

// Initialize application status chart
function initApplicationChart() {
    const ctx = document.getElementById('applicationChart').getContext('2d');
    applicationChart = new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: reportsData.applicationStatus.labels,
            datasets: [{
                data: reportsData.applicationStatus.data,
                backgroundColor: reportsData.applicationStatus.colors,
                borderWidth: 2,
                borderColor: '#fff'
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'bottom',
                    labels: {
                        padding: 20,
                        usePointStyle: true
                    }
                }
            }
        }
    });
}

// Initialize company activity chart
function initCompanyChart() {
    const ctx = document.getElementById('companyChart').getContext('2d');
    companyChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: reportsData.companyActivity.labels,
            datasets: [{
                label: 'Active Companies',
                data: reportsData.companyActivity.data,
                backgroundColor: '#28a745',
                borderColor: '#28a745',
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    display: false
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    grid: {
                        color: 'rgba(0, 0, 0, 0.1)'
                    }
                },
                x: {
                    grid: {
                        color: 'rgba(0, 0, 0, 0.1)'
                    }
                }
            }
        }
    });
}

// Initialize category chart
function initCategoryChart() {
    const ctx = document.getElementById('categoryChart').getContext('2d');
    categoryChart = new Chart(ctx, {
        type: 'pie',
        data: {
            labels: reportsData.internshipCategories.labels,
            datasets: [{
                data: reportsData.internshipCategories.data,
                backgroundColor: reportsData.internshipCategories.colors,
                borderWidth: 2,
                borderColor: '#fff'
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'bottom',
                    labels: {
                        padding: 15,
                        usePointStyle: true
                    }
                }
            }
        }
    });
}

// Load report data into tables
function loadReportData() {
    loadTopCompanies();
    loadPopularInternships();
}

// Load top companies data
function loadTopCompanies() {
    const tbody = document.getElementById('top-companies-tbody');
    tbody.innerHTML = '';

    reportsData.topCompanies.forEach(company => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${company.name}</td>
            <td>${company.internships}</td>
            <td>${company.applications}</td>
            <td><span class="badge badge-success">${company.successRate}</span></td>
        `;
        tbody.appendChild(row);
    });
}

// Load popular internships data
function loadPopularInternships() {
    const tbody = document.getElementById('popular-internships-tbody');
    tbody.innerHTML = '';

    reportsData.popularInternships.forEach(internship => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${internship.position}</td>
            <td>${internship.company}</td>
            <td>${internship.applications}</td>
            <td>${internship.views.toLocaleString()}</td>
        `;
        tbody.appendChild(row);
    });
}

// Change chart type
function changeChartType(chartId, type) {
    if (chartId === 'userChart') {
        userChart.destroy();
        const ctx = document.getElementById('userChart').getContext('2d');
        userChart = new Chart(ctx, {
            type: type,
            data: {
                labels: reportsData.userRegistrations.labels,
                datasets: [{
                    label: 'User Registrations',
                    data: reportsData.userRegistrations.data,
                    borderColor: '#007bff',
                    backgroundColor: type === 'line' ? 'rgba(0, 123, 255, 0.1)' : '#007bff',
                    borderWidth: 2,
                    fill: type === 'line',
                    tension: type === 'line' ? 0.4 : 0
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        display: false
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        grid: {
                            color: 'rgba(0, 0, 0, 0.1)'
                        }
                    },
                    x: {
                        grid: {
                            color: 'rgba(0, 0, 0, 0.1)'
                        }
                    }
                }
            }
        });
    }
}

// Update reports for date range
function updateReportsForDateRange(days) {
    // Simulate data update based on date range
    console.log(`Updating reports for last ${days} days`);
    
    // Update stats
    const multiplier = days === '7' ? 0.3 : days === '30' ? 1 : days === '90' ? 2.5 : 4;
    document.getElementById('total-users').textContent = Math.round(1247 * multiplier);
    document.getElementById('total-companies').textContent = Math.round(89 * multiplier);
    document.getElementById('total-internships').textContent = Math.round(342 * multiplier);
    document.getElementById('total-applications').textContent = Math.round(2156 * multiplier);

    // Update charts with new data (simulated)
    const newData = reportsData.userRegistrations.data.map(val => Math.round(val * multiplier));
    userChart.data.datasets[0].data = newData;
    userChart.update();

    showNotification(`Reports updated for last ${days} days`, 'success');
}

// Refresh reports
function refreshReports() {
    showNotification('Refreshing reports...', 'info');
    
    // Simulate API call delay
    setTimeout(() => {
        loadReportData();
        initializeCharts();
        showNotification('Reports refreshed successfully!', 'success');
    }, 1500);
}

// Export functions
function exportReport() {
    showNotification('Generating comprehensive report...', 'info');
    setTimeout(() => {
        showNotification('Report exported successfully!', 'success');
    }, 2000);
}

function exportTopCompanies() {
    const csvContent = generateCSV(reportsData.topCompanies, ['name', 'internships', 'applications', 'successRate']);
    downloadCSV(csvContent, 'top-companies.csv');
}

function exportPopularInternships() {
    const csvContent = generateCSV(reportsData.popularInternships, ['position', 'company', 'applications', 'views']);
    downloadCSV(csvContent, 'popular-internships.csv');
}

function exportUserActivity() {
    const activityData = [
        { metric: 'Daily Active Users', value: '456' },
        { metric: 'Weekly Active Users', value: '1,234' },
        { metric: 'Monthly Active Users', value: '3,456' },
        { metric: 'Average Session Duration', value: '12m 34s' },
        { metric: 'Bounce Rate', value: '23.5%' },
        { metric: 'Page Views per Session', value: '4.2' }
    ];
    const csvContent = generateCSV(activityData, ['metric', 'value']);
    downloadCSV(csvContent, 'user-activity.csv');
}

function exportSystemPerformance() {
    const performanceData = [
        { metric: 'Server Uptime', value: '99.9%', status: 'Excellent' },
        { metric: 'Average Response Time', value: '245ms', status: 'Good' },
        { metric: 'Error Rate', value: '0.02%', status: 'Excellent' },
        { metric: 'Database Performance', value: '98.5%', status: 'Good' }
    ];
    const csvContent = generateCSV(performanceData, ['metric', 'value', 'status']);
    downloadCSV(csvContent, 'system-performance.csv');
}

function exportCSV() {
    showNotification('Generating CSV export...', 'info');
    setTimeout(() => {
        // Combine all data for comprehensive CSV
        const allData = {
            'Top Companies': reportsData.topCompanies,
            'Popular Internships': reportsData.popularInternships
        };
        
        let csvContent = '';
        Object.keys(allData).forEach(section => {
            csvContent += `\n${section}\n`;
            csvContent += generateCSV(allData[section], Object.keys(allData[section][0]));
            csvContent += '\n';
        });
        
        downloadCSV(csvContent, 'comprehensive-report.csv');
        showNotification('CSV exported successfully!', 'success');
    }, 1500);
}

function exportPDF() {
    showNotification('Generating PDF report...', 'info');
    setTimeout(() => {
        showNotification('PDF report generated successfully!', 'success');
    }, 3000);
}

function exportExcel() {
    showNotification('Generating Excel export...', 'info');
    setTimeout(() => {
        showNotification('Excel file exported successfully!', 'success');
    }, 2500);
}

// Utility functions
function generateCSV(data, headers) {
    const csvHeaders = headers.join(',');
    const csvRows = data.map(row => 
        headers.map(header => {
            const value = row[header];
            return typeof value === 'string' && value.includes(',') ? `"${value}"` : value;
        }).join(',')
    );
    return csvHeaders + '\n' + csvRows.join('\n');
}

function downloadCSV(csvContent, filename) {
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    if (link.download !== undefined) {
        const url = URL.createObjectURL(blob);
        link.setAttribute('href', url);
        link.setAttribute('download', filename);
        link.style.visibility = 'hidden';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    }
}

// Date range modal functions
function openDateRangeModal() {
    document.getElementById('date-range-modal').style.display = 'flex';
}

function closeDateRangeModal() {
    document.getElementById('date-range-modal').style.display = 'none';
    document.getElementById('date-range').value = '30'; // Reset to default
}

function applyCustomDateRange() {
    const startDate = document.getElementById('start-date').value;
    const endDate = document.getElementById('end-date').value;
    
    if (!startDate || !endDate) {
        showNotification('Please select both start and end dates', 'warning');
        return;
    }
    
    if (new Date(startDate) > new Date(endDate)) {
        showNotification('Start date cannot be after end date', 'warning');
        return;
    }
    
    closeDateRangeModal();
    showNotification(`Reports updated for custom date range: ${startDate} to ${endDate}`, 'success');
    
    // Update reports with custom date range (simulated)
    updateReportsForDateRange('custom');
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