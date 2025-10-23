# Sprint Retrospective Report

## Sprint Information
- **Sprint Name / Number:** Sprint 1 – InteU  
- **Sprint Duration:**  
- **Date of Retrospective:**  
- **Team Members Present:** Min Thuta Naing, Khin Kyawt Shin, Thiri Swe Zin, Shwin Pyone Thu, Phue Phue Soe Lwin, Soe Yu Yu Kyaw, Htoo Pyae Shan, Htet Yunn Shwe Yi  

---

## 1. What Worked Well
- **Clear task responsibilities:** Each member could understand the roles and tasks they are assigned for, and completed in time.  
- **Finished features for Sprint 1:** Register and Login Pages, Home, Companies, Articles and Sections pages for student user role.  
- **Daily stand up:** The group meets up every day for a short period of time (15 minutes) to keep track of all the progress and identify challenges.  

---

## 2. What Needs Improvement
- **API/Backend Integration Pace:**  
  While the frontend was rapidly developed using AI, the corresponding backend API endpoints (for fetching live data on the Companies and Articles pages) were not fully finalized or integrated. This required the use of temporary mock data, which delays the full end-to-end testing required for proof of reliability.  

- **Inconsistent Unit/Integration Testing:**  
  The focus on feature completion led to insufficient time allocated for developing unit tests and formal integration tests. This gap in test coverage is a risk, particularly as the project enters Phase 2, which emphasizes quality and the need to prove software reliability.  

- **Version Control & Code Review Discipline:**  
  Occasional merge conflicts were encountered late in the sprint due to a lack of a formal, mandatory Pull Request (PR) review process. Merging code without peer review increased the risk of introducing minor bugs or design inconsistencies (as noted in the AI tool reflection).  

---

## 3. Effectiveness of AI Tools

### How AI Tools Were Used
During Sprint 1, **Trae AI** and **ChatGPT** were utilized to generate the student-side frontend of the InteU web application. The AI tools were prompted to produce HTML and CSS code for key interface components, including the Home page, User Profile, and Company List pages. The development team provided structured prompts to guide the layout, design, and content structure.

### Benefits Observed
Using AI significantly accelerated the frontend development process. It reduced manual coding time, allowing the team to focus more on layout adjustments and feature integration. The AI-generated output provided visually appealing and functional interfaces that met the initial design goals. Overall, the tool enhanced productivity and delivered satisfactory results within a short time frame.

### Limitations or Issues
Despite its advantages, a few inconsistencies were observed in the AI-generated code. Some buttons and color schemes did not align perfectly with the desired design standards, requiring manual adjustments. These issues were minor but highlighted the need for post-generation review and refinement to ensure uniformity across all UI components.

### Suggestions for Next Sprint
For the next sprint, which will focus on developing the admin and company-side frontends, the team plans to:
- Refine AI prompts to produce more consistent results.  
- Conduct a more thorough flow review.  
- Implement manual code adjustments after generation to maintain design coherence and usability across all interfaces.  

---

## 4. Git Workflow & Collaboration

### Branching Strategy Used
The team used a main branch named **main** as the primary stable line of development. Individual features and fixes were developed on dedicated feature branches named descriptively. Once ready, those branches were merged into an integration or staging branch and ultimately merged into main after verification.

### Collaboration Challenges
- Occasional merge conflicts due to overlapping commits.  
- Lack of consistent PR reviews before merging.  

### Improvements for Next Sprint
- Enforce a mandatory PR review policy before merging.  
- Encourage small, frequent commits to minimize conflicts.  
- Improve communication and documentation of integration changes.  

---

## 5. Action Items for Next Sprint

| Issue / Area | Action Item | Owner | Due Date |
|---------------|-------------|--------|-----------|
| "Admin Registration" story was blocked because the requirements for the "special admin key" were unclear. | For all future stories, Acceptance Criteria (AC) must be written before the sprint starts. | Project Manager - Thiri Swe Zin | 28th October |
| "Password Rules" story was much more complex than we estimated. It spilled over and wasn't finished. | The team will hold a 1-hour "Technical Refinement" session before the next planning meeting to break down complex stories into smaller tasks. | CEO - Min Thuta Naing | 4th November |
| The "Total Users" count on the dashboard works, but it's very slow. We didn't have time to fix it. | Create a new technical debt story, addressing the dashboard user count issue, and add it to the next sprint. | Project Manager - Thiri Swe Zin | 11th November |

---
