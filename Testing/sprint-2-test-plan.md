# Sprint 2 Test Case Plan

**Sprint:** 2  
**Project Name:** InteU  
**Date Created:** 23 October 2025  
**Prepared by:** InteU Group  

---

## Purpose
This document defines the testing approach for Sprint 2 to ensure all newly implemented and updated features on both the **Company (Employer)** and **Admin** sides meet functional and quality standards.  
It will guide testing efforts and serve as evidence during the Sprint 2 Demo.

---

## Features Covered

### Company Side (Employer Portal)
1. Company Registration Form  
2. Company Dashboard  
3. List a New Internship  
4. Manage Internships  
5. View Applicants  
6. Messages / Chat (optional)  
7. Company Profile & Settings  

### Admin Side (System Management)
1. Admin Dashboard  
2. Manage Users  
3. Manage Companies  
4. Manage Internships  
5. Reports / Analytics  
6. Admin Registration & Site Settings  
7. Add Articles and Courses  
8. Manage Courses  

---

## Test Environment

| Category | Details |
|-----------|----------|
| **Platform** | Web App / API |
| **Environment** | Development / Staging |
| **Tools Used** | Postman, Jest, Selenium, Cypress, Manual Testing |
| **Browsers Tested** | Chrome, Safari |
| **Test Data** | Sample company profiles, mock applicants, internship listings, and admin credentials. |

---

## Test Scenarios & Cases

### 1. Company Registration Form

| Test Case ID | Scenario | Steps | Expected Result | Status |
|---------------|-----------|--------|------------------|--------|
| CREG-01 | Register with valid data | 1. Open company registration form. <br> 2. Fill in all required fields. <br> 3. Submit. | Registration successful, confirmation email sent. | ☐ Not Run |
| CREG-02 | Missing required fields | 1. Submit form with missing email or password. | Error message shown: “Please fill in all required fields.” | ☐ Not Run |
| CREG-03 | Invalid email format | 1. Enter invalid email format (e.g., test@com). <br> 2. Submit. | Error “Invalid email address” displayed. | ☐ Not Run |

---

### 2. Company Dashboard

| Test Case ID | Scenario | Steps | Expected Result | Status |
|---------------|-----------|--------|------------------|--------|
| CDASH-01 | View dashboard overview | 1. Login as company. <br> 2. Navigate to dashboard. | Displays total internships, applicants, and messages summary. | ☐ Not Run |
| CDASH-02 | No data state | 1. Login with a new account with no internships. | Dashboard shows 0 counts and “No data yet.” | ☐ Not Run |

---

### 3. List a New Internship

| Test Case ID | Scenario | Steps | Expected Result | Status |
|---------------|-----------|--------|------------------|--------|
| CINT-01 | Create a valid internship | 1. Go to “List New Internship.” <br> 2. Fill all fields and submit. | Internship successfully added and appears in Manage Internships. | ☐ Not Run |
| CINT-02 | Missing required fields | 1. Leave title or description empty. <br> 2. Submit. | Error “Title and Description are required.” | ☐ Not Run |
| CINT-03 | Invalid date range | 1. Set deadline before current date. <br> 2. Submit. | Error “Deadline must be a future date.” | ☐ Not Run |

---

### 4. Manage Internships

| Test Case ID | Scenario | Steps | Expected Result | Status |
|---------------|-----------|--------|------------------|--------|
| CMAN-01 | View internship list | 1. Login as company. <br> 2. Go to Manage Internships. | All created internships are displayed with status tags. | ☐ Not Run |
| CMAN-02 | Edit internship | 1. Click “Edit” on a posting. <br> 2. Modify details. <br> 3. Save. | Changes successfully updated. | ☐ Not Run |
| CMAN-03 | Delete internship | 1. Click “Delete.” <br> 2. Confirm. | Internship removed from list. | ☐ Not Run |

---

### 5. View Applicants

| Test Case ID | Scenario | Steps | Expected Result | Status |
|---------------|-----------|--------|------------------|--------|
| CAPP-01 | View all applicants | 1. Open a posted internship. <br> 2. Click “View Applicants.” | Displays list of applicants with their info and status. | ☐ Not Run |
| CAPP-02 | Change applicant status | 1. Click “Accept” or “Reject.” | Applicant’s status updates and reflected in UI. | ☐ Not Run |

---

### 6. Messages / Chat

| Test Case ID | Scenario | Steps | Expected Result | Status |
|---------------|-----------|--------|------------------|--------|
| CMSG-01 | Send message | 1. Open chat window with applicant. <br> 2. Type message and send. | Message appears in chat history. | ☐ Not Run |
| CMSG-02 | Receive message | 1. Applicant sends a message. <br> 2. Refresh company inbox. | New message notification appears. | ☐ Not Run |

---

### 7. Company Profile / Settings

| Test Case ID | Scenario | Steps | Expected Result | Status |
|---------------|-----------|--------|------------------|--------|
| CPROF-01 | Update profile | 1. Go to profile settings. <br> 2. Edit company name, logo, etc. <br> 3. Save changes. | Profile updated successfully. | ☐ Not Run |
| CPROF-02 | Change password | 1. Go to “Change Password.” <br> 2. Enter old and new passwords. <br> 3. Save. | Password successfully changed. | ☐ Not Run |

---

## Test Summary (to be completed after execution)

| Metric | Count |
|--------|--------|
| **Total Test Cases** |   |
| **Passed** |   |
| **Failed** |   |
| **Blocked** |   |
| **Re-Tested** |   |

**Notes / Findings:**  
_(To be filled in after testing phase.)_

---

**End of Document**
