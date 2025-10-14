

(function(){
 const STATE = {
   lang: localStorage.getItem('lang') || 'en',
   theme: localStorage.getItem('theme') || 'light',
   selectedInternship: null,
   user: getJSON('currentUser') || null,
 };


 const TRANSLATIONS = {
   en: {
     'nav.home': 'Home',
     'nav.companies': 'Companies',
     'nav.articles': 'Articles',
     'nav.login': 'Login',
     'nav.logout': 'Logout',
     'nav.profile': 'Profile',
     'profile.title': 'Profile',
     'profile.email': 'Email',
     'profile.name': 'Name',
     'profile.role': 'Role',
     'hero.title': 'Find Verified Internships That Match Your Future.',
     'hero.sub': 'Trusted opportunities from verified companies in Thailand.',
     'search.btn': 'Search',
     'loading': 'Loading results...',
     'recent.title': 'Recent searches',
     'status.title': 'Application Status',
     'status.pending': 'Pending',
     'status.accepted': 'Accepted',
     'status.rejected': 'Rejected',
     'recommended.title': 'Recommended Internships',
     'results.title': 'Internship Listings',
     'footer.help': 'Help & Support',
     'footer.contact': 'Contact us',
     'footer.faq': 'FAQ',
     'footer.privacy': 'Privacy',
     'footer.copy': 'Trusted internships for global learners.',
     'login.title': 'Login',
     'login.email': 'Email',
     'login.password': 'Password',
     'login.submit': 'Login',
     'login.forgot': 'Forgot Password?',
     'login.noaccount': 'No account?',
     'register.title': 'Register',
     'register.role': 'Role',
     'register.name': 'Full Name',
     'register.password': 'Password',
     'register.resume': 'Resume (simulated)',
     'register.transcript': 'Transcript (simulated)',
     'register.submit': 'Create Account',
     'companies.title': 'Search Companies',
     'companies.list': 'Companies',
     'articles.title': 'Articles & Short Courses',
     'articles.list': 'Learn & Grow',
     'apply.title': 'Apply for Internship',
     'apply.description': 'Job Description',
     'apply.requirements': 'Requirements',
     'apply.benefits': 'Benefits',
     'apply.duration': 'Duration',
     'apply.location': 'Location',
     'apply.industry': 'Industry',
     'apply.language': 'Language',
     'apply.cancel': 'Cancel',
     'apply.confirm': 'Confirm Application',
     'apply.submit': 'Confirm Application',
     // Submission form translations
     'submission.title': 'Application Form',
     'submission.fullname': 'Full Name',
     'submission.email': 'Email Address',
     'submission.phone': 'Phone Number',
     'submission.university': 'University',
     'submission.major': 'Major/Field of Study',
     'submission.coverletter': 'Cover Letter',
     'submission.resume': 'Resume',
     'submission.cancel': 'Cancel',
     'submission.submit': 'Submit Application',
     // Confirmation modal translations
     'confirmation.title': 'Application Submitted!',
      'confirmation.message': 'Your application has been successfully submitted. We will review it and get back to you soon.',
      'confirmation.close': 'Ok',
     // Login modal detailed descriptions
     'login.description': 'Welcome back! Sign in to access your account.',
     'login.remember': 'Remember me',
     'login.register.prompt': "Don't have an account?",
     'login.register.link': 'Sign up here',
     // Register modal detailed descriptions
     'register.description': 'Create your account to find internship opportunities.',
     'register.documents.title': 'Documents (Optional)',
     'register.terms': 'I agree to the Terms of Service and Privacy Policy',
     'register.newsletter': 'Send me updates about new opportunities',
     'register.login.prompt': 'Already have an account?',
     'register.login.link': 'Sign in here',
     // Apply modal detailed descriptions
     'apply.description.text': 'Review the job details and submit your application.',
     'apply.status.verified': 'Verified Company',
   },
   th: {
     'nav.home': 'หน้าหลัก',
     'nav.companies': 'บริษัท',
     'nav.articles': 'บทความ',
     'nav.login': 'เข้าสู่ระบบ',
     'nav.logout': 'ออกจากระบบ',
     'nav.profile': 'โปรไฟล์',
     'profile.title': 'โปรไฟล์',
     'profile.email': 'อีเมล',
     'profile.name': 'ชื่อ',
     'profile.role': 'บทบาท',
     'hero.title': 'ค้นหาฝึกงานที่ผ่านการตรวจสอบ เพื่ออนาคตของคุณ',
     'hero.sub': 'โอกาสจากบริษัทที่ได้รับการยืนยันในประเทศไทย',
     'search.btn': 'ค้นหา',
     'loading': 'กำลังโหลด...',
     'recent.title': 'ค้นหาล่าสุด',
     'status.title': 'สถานะการสมัคร',
     'status.pending': 'รอดำเนินการ',
     'status.accepted': 'ผ่านการคัดเลือก',
     'status.rejected': 'ไม่ผ่าน',
     'recommended.title': 'ตำแหน่งแนะนำ',
     'results.title': 'รายการฝึกงาน',
     'footer.help': 'ช่วยเหลือและสนับสนุน',
     'footer.contact': 'ติดต่อเรา',
     'footer.faq': 'คำถามที่พบบ่อย',
     'footer.privacy': 'ความเป็นส่วนตัว',
     'footer.copy': 'ฝึกงานที่เชื่อถือได้ สำหรับผู้เรียนทั่วโลก',
     'login.title': 'เข้าสู่ระบบ',
     'login.email': 'อีเมล',
     'login.password': 'รหัสผ่าน',
     'login.submit': 'เข้าสู่ระบบ',
     'login.forgot': 'ลืมรหัสผ่าน?',
     'login.noaccount': 'ยังไม่มีบัญชี?',
     'register.title': 'สมัครสมาชิก',
     'register.role': 'ประเภทผู้ใช้',
     'register.name': 'ชื่อ-นามสกุล',
     'register.password': 'รหัสผ่าน',
     'register.resume': 'เรซูเม่ (จำลอง)',
     'register.transcript': 'ใบแสดงผล (จำลอง)',
     'register.submit': 'สร้างบัญชี',
     'companies.title': 'ค้นหาบริษัท',
     'companies.list': 'บริษัท',
     'articles.title': 'บทความและคอร์สสั้น',
     'articles.list': 'เรียนรู้และเติบโต',
     'apply.title': 'สมัครฝึกงาน',
     'apply.description': 'รายละเอียดงาน',
     'apply.requirements': 'คุณสมบัติ',
     'apply.benefits': 'สวัสดิการ',
     'apply.duration': 'ระยะเวลา',
     'apply.location': 'สถานที่',
     'apply.industry': 'อุตสาหกรรม',
     'apply.language': 'ภาษา',
     'apply.cancel': 'ยกเลิก',
     'apply.confirm': 'ยืนยันการสมัคร',
     'apply.submit': 'ยืนยันการสมัคร',
     // Submission form translations
     'submission.title': 'แบบฟอร์มสมัครงาน',
     'submission.fullname': 'ชื่อ-นามสกุล',
     'submission.email': 'อีเมล',
     'submission.phone': 'เบอร์โทรศัพท์',
     'submission.university': 'มหาวิทยาลัย',
     'submission.major': 'สาขาวิชา',
     'submission.coverletter': 'จดหมายสมัครงาน',
     'submission.resume': 'เรซูเม่',
     'submission.cancel': 'ยกเลิก',
     'submission.submit': 'ส่งใบสมัคร',
     // Confirmation modal translations
     'confirmation.title': 'ส่งใบสมัครเรียบร้อย!',
      'confirmation.message': 'ใบสมัครของคุณได้รับการส่งเรียบร้อยแล้ว เราจะตรวจสอบและติดต่อกลับในเร็วๆ นี้',
      'confirmation.close': 'ตกลง',
     // Login modal detailed descriptions
     'login.description': 'ยินดีต้อนรับกลับมา! เข้าสู่ระบบเพื่อเข้าถึงบัญชีของคุณ',
     'login.remember': 'จดจำการเข้าสู่ระบบ',
     'login.register.prompt': 'ยังไม่มีบัญชี?',
     'login.register.link': 'สมัครสมาชิกที่นี่',
     // Register modal detailed descriptions
     'register.description': 'สร้างบัญชีของคุณเพื่อค้นหาโอกาสฝึกงาน',
     'register.documents.title': 'เอกสาร (ไม่บังคับ)',
     'register.terms': 'ฉันยอมรับข้อกำหนดการใช้บริการและนโยบายความเป็นส่วนตัว',
     'register.newsletter': 'ส่งข้อมูลอัปเดตเกี่ยวกับโอกาสใหม่ให้ฉัน',
     'register.login.prompt': 'มีบัญชีอยู่แล้ว?',
     'register.login.link': 'เข้าสู่ระบบที่นี่',
     // Apply modal detailed descriptions
     'apply.description.text': 'ตรวจสอบรายละเอียดงานและส่งใบสมัครของคุณ',
     'apply.status.verified': 'บริษัทที่ผ่านการตรวจสอบ',
   }
 };


 const DATA = buildData();


 document.addEventListener('DOMContentLoaded', () => {
   initTheme();
   initLanguage();
   wireHeaderActions();
   const page = document.body.dataset.page;
   if (page === 'home') initHomePage();
   if (page === 'companies') initCompaniesPage();
   if (page === 'articles') initArticlesPage();
   if (page === 'login') initLoginPage();
   if (page === 'register') initRegisterPage();
   if (page === 'profile') initProfilePage();
 });


 function buildData(){
   // ✨ Expanded company objects for richer modal details
   const companies = [
     {
       id: 'c1',
       name: 'TechFusion Co.',
       logo: 'images/tf.png',
       description: 'AI and cloud services',
       verified: true,
       positions: ['Frontend Intern', 'Data Intern'],
       location: 'Bangkok',
       website: 'https://techfusion.example',
       email: 'hr@techfusion.example',
       phone: '+66 2 123 4567',
       size: '200-500',
       founded: 2017,
       about: 'We build scalable AI platforms and cloud-native products used by startups and enterprises across Southeast Asia.',
     },
     {
       id: 'c2',
       name: 'DesignHub Studio',
       logo: 'images/dh.jpg',
       description: 'Digital product design',
       verified: true,
       positions: ['UX Research Intern', 'UI Design Intern'],
       location: 'Chiang Mai',
       website: 'https://designhub.example',
       email: 'join@designhub.example',
       phone: '+66 53 888 999',
       size: '50-100',
       founded: 2015,
       about: 'Boutique studio focusing on UX research and UI design for mobile and web, with clients in fintech and travel.',
     },
     {
       id: 'c3',
       name: 'MarketMinds Ltd.',
       logo: 'images/mk.png',
       description: 'Marketing analytics',
       verified: true,
       positions: ['Growth Intern', 'Content Intern'],
       location: 'Bangkok',
       website: 'https://marketminds.example',
       email: 'careers@marketminds.example',
       phone: '+66 2 987 6543',
       size: '100-200',
       founded: 2012,
       about: 'Data-driven marketing company helping brands grow through experimentation and analytics.',
     },
     {
       id: 'c4',
       name: 'FinNext',
       logo: 'images/fn.jpg',
       description: 'Fintech solutions',
       verified: false,
       positions: ['Finance Analyst Intern'],
       location: 'Bangkok',
       website: 'https://finnext.example',
       email: 'hr@finnext.example',
       phone: '+66 2 234 5678',
       size: '20-50',
       founded: 2019,
       about: 'Building next-gen finance tools for SMEs.',
     },
     {
       id: 'c5',
       name: 'SeaView Resorts',
       logo: 'images/swv.png',
       description: 'Hospitality & leisure',
       verified: true,
       positions: ['Operations Intern'],
       location: 'Phuket',
       website: 'https://seaview.example',
       email: 'talent@seaview.example',
       phone: '+66 76 222 111',
       size: '500+',
       founded: 2008,
       about: 'Leading resort group with a focus on guest experience and sustainability.',
     },
   ];


   const internships = [
     { 
       id: 'i1', companyId: 'c1', companyName: 'TechFusion Co.', position: 'Frontend Intern', location: 'Bangkok', industry: 'Technology', language: 'English', duration: '3 months', verified: true, nationalityRequirement: 'Any',
       description: 'Join our frontend team to build responsive web applications using React, TypeScript, and modern CSS frameworks. You will work on user-facing features and collaborate with designers and backend developers.',
       requirements: 'Basic knowledge of HTML, CSS, JavaScript. Familiarity with React or similar frameworks preferred. Strong problem-solving skills and attention to detail.',
       benefits: 'Mentorship from senior developers, flexible working hours, learning budget for courses, modern office in central Bangkok, team lunch every Friday.'
     },
     { 
       id: 'i2', companyId: 'c1', companyName: 'TechFusion Co.', position: 'Data Intern', location: 'Bangkok', industry: 'Technology', language: 'English', duration: '4 months', verified: true, nationalityRequirement: 'International',
       description: 'Work with our data science team to analyze large datasets, build predictive models, and create data visualizations. You will use Python, SQL, and machine learning libraries.',
       requirements: 'Knowledge of Python and SQL. Basic understanding of statistics and data analysis. Experience with pandas, numpy, or similar libraries is a plus.',
       benefits: 'Access to cloud computing resources, data science training, international team environment, visa support for international students.'
     },
     { 
       id: 'i3', companyId: 'c2', companyName: 'DesignHub Studio', position: 'UI Design Intern', location: 'Chiang Mai', industry: 'Design', language: 'Thai', duration: '3 months', verified: true, nationalityRequirement: 'Thai',
       description: 'Create beautiful and intuitive user interfaces for mobile and web applications. Work closely with UX researchers and developers to bring designs to life.',
       requirements: 'Proficiency in Figma or Sketch. Understanding of design principles and typography. Portfolio showcasing UI design work. Thai language proficiency required.',
       benefits: 'Creative workspace in Chiang Mai, design software licenses, portfolio development support, networking with design community.'
     },
     { 
       id: 'i4', companyId: 'c2', companyName: 'DesignHub Studio', position: 'UX Research Intern', location: 'Bangkok', industry: 'Design', language: 'English', duration: '3 months', verified: true, nationalityRequirement: 'Any',
       description: 'Conduct user research studies, analyze user behavior, and provide insights to improve product design. Learn various research methodologies and tools.',
       requirements: 'Interest in human psychology and user behavior. Basic knowledge of research methods. Strong communication and analytical skills.',
       benefits: 'Research tools access, UX certification support, mentorship from senior researchers, conference attendance opportunities.'
     },
     { 
       id: 'i5', companyId: 'c3', companyName: 'MarketMinds Ltd.', position: 'Content Intern', location: 'Bangkok', industry: 'Marketing', language: 'English', duration: '2 months', verified: true, nationalityRequirement: 'Any',
       description: 'Create engaging content for social media, blogs, and marketing campaigns. Learn content strategy and work with marketing analytics tools.',
       requirements: 'Excellent writing skills in English. Creativity and understanding of social media platforms. Basic knowledge of content marketing principles.',
       benefits: 'Content creation tools, social media management training, marketing analytics access, flexible remote work options.'
     },
     { 
       id: 'i6', companyId: 'c4', companyName: 'FinNext', position: 'Finance Analyst Intern', location: 'Bangkok', industry: 'Finance', language: 'Thai', duration: '3 months', verified: false, nationalityRequirement: 'Thai',
       description: 'Support financial analysis and reporting for fintech products. Learn about financial modeling, risk assessment, and regulatory compliance.',
       requirements: 'Strong analytical and mathematical skills. Knowledge of Excel and basic accounting principles. Thai language required for local regulations.',
       benefits: 'Financial modeling training, industry certifications, exposure to fintech innovations, potential full-time opportunity.'
     },
     { 
       id: 'i7', companyId: 'c5', companyName: 'SeaView Resorts', position: 'Operations Intern', location: 'Phuket', industry: 'Marketing', language: 'English', duration: '3 months', verified: true, nationalityRequirement: 'Any',
       description: 'Support daily operations of luxury resort facilities. Learn hospitality management, guest services, and operational efficiency optimization.',
       requirements: 'Customer service orientation, organizational skills, ability to work in fast-paced environment. Hospitality or tourism background preferred.',
       benefits: 'Accommodation provided, meals included, hospitality industry training, beautiful Phuket location, international work environment.'
     },
     { 
       id: 'i8', companyId: 'c3', companyName: 'MarketMinds Ltd.', position: 'Growth Intern', location: 'Bangkok', industry: 'Marketing', language: 'Thai', duration: '4 months', verified: true, nationalityRequirement: 'Thai',
       description: 'Work on growth hacking strategies, A/B testing, and user acquisition campaigns. Learn data-driven marketing and growth analytics.',
       requirements: 'Analytical mindset, basic understanding of digital marketing. Familiarity with Google Analytics or similar tools. Thai language for local market insights.',
       benefits: 'Growth marketing certification, analytics tools training, startup environment experience, performance-based bonus potential.'
     },
   ];


   const articles = [
     { id: 'a1', title: 'Resume Writing Essentials', category: 'Career', description: 'Build a standout resume for internships.', duration: '1h' },
     { id: 'a2', title: 'Intro to UX Research', category: 'Design', description: 'Learn planning and running UX studies.', duration: '2h' },
     { id: 'a3', title: 'Data Analysis 101', category: 'Technology', description: 'Basics of data wrangling and charts.', duration: '3h' },
     { id: 'a4', title: 'Marketing Funnels', category: 'Marketing', description: 'How funnels help growth teams.', duration: '1.5h' },
     { id: 'a5', title: 'Financial Modeling Basics', category: 'Finance', description: 'Understand core modeling concepts.', duration: '2h' },
     { id: 'a6', title: 'Working in Thailand', category: 'Career', description: 'Culture tips for international students.', duration: '45m' },
   ];
   return { internships, companies, articles };
 }


 function initTheme(){
   if (STATE.theme === 'dark') document.body.classList.add('dark');
   const chk = document.getElementById('dark-mode');
   if (chk) chk.checked = STATE.theme === 'dark';
 }


 function wireHeaderActions(){
   const themeBtn = document.getElementById('toggleTheme');
   if (themeBtn) themeBtn.addEventListener('click', () => {
     document.body.classList.toggle('dark');
     STATE.theme = document.body.classList.contains('dark') ? 'dark' : 'light';
     localStorage.setItem('theme', STATE.theme);
   });
   const themeChk = document.getElementById('dark-mode');
   if (themeChk) themeChk.addEventListener('change', () => {
     document.body.classList.toggle('dark', themeChk.checked);
     STATE.theme = themeChk.checked ? 'dark' : 'light';
     localStorage.setItem('theme', STATE.theme);
   });
   const langBtn = document.getElementById('toggleLang');
   if (langBtn) langBtn.addEventListener('click', () => {
     STATE.lang = STATE.lang === 'en' ? 'th' : 'en';
     localStorage.setItem('lang', STATE.lang);
     applyTranslations();
   });
 }


 function initLanguage(){
   applyTranslations();
 }


 function applyTranslations(){
   const dict = TRANSLATIONS[STATE.lang] || TRANSLATIONS.en;
   document.querySelectorAll('[data-i18n]').forEach((el) => {
     const key = el.getAttribute('data-i18n');
     let text = dict[key];
     // If logged in, replace navbar login label with logout
     if (key === 'nav.login' && STATE.user) text = dict['nav.logout'] || 'Logout';
     if (text) el.textContent = text;
   });
   // Build or toggle user menu when logged in
   setupUserMenu(dict);
 }


 function setupUserMenu(dict){
   const actions = document.querySelector('.actions');
   const navLoginLink = document.querySelector('.actions a[data-i18n="nav.login"]');
   if (!actions) return;
   let menu = actions.querySelector('.user-menu');
   if (STATE.user) {
     if (navLoginLink) navLoginLink.style.display = 'none';
     if (!menu) {
       menu = document.createElement('div');
       menu.className = 'user-menu';
       const btn = document.createElement('button');
       btn.type = 'button';
       btn.className = 'icon-btn user-menu-btn';
       btn.setAttribute('aria-label', 'User menu');
       btn.innerHTML = '<img src="images/user.png" alt="User" />';
       const dd = document.createElement('div');
       dd.className = 'menu';
       dd.innerHTML = `
         <a href="profile.html" class="menu-item" data-i18n="nav.profile">${dict['nav.profile']||'Profile'}</a>
         <button type="button" class="menu-item" data-action="logout" data-i18n="nav.logout">${dict['nav.logout']||'Logout'}</button>
       `;
       menu.appendChild(btn);
       menu.appendChild(dd);
       actions.appendChild(menu);
       btn.addEventListener('click', () => { dd.classList.toggle('open'); });
       document.addEventListener('click', (e) => {
         if (!menu.contains(e.target)) dd.classList.remove('open');
       });
       dd.querySelector('[data-action="logout"]').addEventListener('click', (e) => { e.preventDefault(); logout(); });
     } else {
       // Update labels if language switches
       menu.querySelector('[data-i18n="nav.profile"]').textContent = dict['nav.profile'] || 'Profile';
       menu.querySelector('[data-i18n="nav.logout"]').textContent = dict['nav.logout'] || 'Logout';
       menu.style.display = '';
     }
   } else {
     if (navLoginLink) navLoginLink.style.display = '';
     if (menu) menu.style.display = 'none';
   }
 }


 // Home Page
 function initHomePage(){
   const kw = document.getElementById('searchKeyword');
   const loc = document.getElementById('searchLocation');
   const ind = document.getElementById('searchIndustry');
   const lang = document.getElementById('searchLanguage');
   const nat = document.getElementById('searchNationality');
   const ver = document.getElementById('filterVerified');
   const btn = document.getElementById('searchBtn');
   const chipsEl = document.getElementById('recentSearches');


   renderRecommended();
   renderInternships(DATA.internships);
   updateStatusSummary();


   const doSearch = (payload) => {
     setTimeout(() => {
       const list = filterInternships(payload);
       renderInternships(list);
       SearchUtils.saveSearch(payload);
       SearchUtils.renderChips(chipsEl, SearchUtils.getRecentSearches(), (p) => {
         kw.value = p.keyword||''; loc.value = p.location||''; ind.value = p.industry||''; lang.value = p.language||''; nat.value = p.nationality||''; ver.checked = true;
         renderInternships(filterInternships(p));
       });
     }, 400);
   };


   btn.addEventListener('click', () => doSearch({
     keyword: kw.value,
     location: loc.value,
     industry: ind.value,
     language: lang.value,
     nationality: nat.value,
     verifiedOnly: ver.checked
   }));


   // Render recent chips initially
   SearchUtils.renderChips(chipsEl, SearchUtils.getRecentSearches(), (p) => {
     kw.value = p.keyword||''; loc.value = p.location||''; ind.value = p.industry||''; lang.value = p.language||''; nat.value = p.nationality||''; ver.checked = true;
     renderInternships(filterInternships(p));
   });


   // Modal wiring
   wireModal('loginModal');
   wireModal('registerModal');
   wireModal('applyModal');


   // Simulate periodic status updates
   simulateStatusUpdates();
 }


 function filterInternships({ keyword, location, industry, language, nationality, verifiedOnly }){
   const k = SearchUtils.normalize(keyword);
   return DATA.internships.filter((it) => {
     if (verifiedOnly && !it.verified) return false;
     if (location && it.location !== location) return false;
     if (industry && it.industry !== industry) return false;
     if (language && it.language !== language) return false;
     if (nationality && it.nationalityRequirement !== nationality) return false;
     if (k) {
       const text = `${it.position} ${it.companyName} ${it.location} ${it.industry}`.toLowerCase();
       if (!text.includes(k)) return false;
     }
     return true;
   });
 }


 function renderInternships(list){
   const el = document.getElementById('internshipList');
   const countEl = document.getElementById('resultsCount');
   if (!el) return;
   countEl && (countEl.textContent = `${list.length} results`);
   el.innerHTML = '';
   list.forEach((it) => el.appendChild(buildInternshipCard(it)));
 }


 function renderRecommended(){
   const el = document.getElementById('recommendedList');
   if (!el) return;
   const profile = getJSON('profile') || { preferredIndustry: 'Technology' };
   const list = DATA.internships.filter(it => it.industry === profile.preferredIndustry && it.verified).slice(0, 3);
   if (list.length === 0) {
     DATA.internships.filter(it => it.verified).slice(0, 3).forEach((it) => el.appendChild(buildInternshipCard(it)));
   } else {
     list.forEach((it) => el.appendChild(buildInternshipCard(it)));
   }
 }


 function buildInternshipCard(it){
   const card = el('div', { class: 'card' });
   const header = el('div', { class: 'card-row' });
   const title = el('h3', { class: 'card-title' }, `${it.position}`);
   const verified = it.verified ? el('span', { class: 'badge verified' }, 'Verified') : el('span', { class: 'badge' }, 'Posted');
   header.appendChild(title);
   header.appendChild(verified);
   const meta = el('div', { class: 'meta' }, `${it.companyName} • ${it.location} • ${it.language} • ${it.duration}`);
   const actions = el('div', { class: 'card-actions' });
   const applyBtn = el('button', { class: 'btn secondary' }, 'Apply');
   applyBtn.addEventListener('click', () => openApplyModal(it));
   actions.appendChild(applyBtn);
   card.appendChild(header);
   card.appendChild(meta);
   card.appendChild(actions);
   return card;
 }


 function openApplyModal(it){
   STATE.selectedInternship = it;
   const dlg = document.getElementById('applyModal');
   if (!dlg) return;
   
   // Populate job title and company
   const jobTitle = document.getElementById('applyJobTitle');
   const jobCompany = document.getElementById('applyJobCompany');
   if (jobTitle) jobTitle.textContent = it.position;
   if (jobCompany) jobCompany.textContent = it.companyName;
   
   // Populate job description
   const jobDescription = document.getElementById('applyJobDescription');
   if (jobDescription) jobDescription.textContent = it.description || 'No description available.';
   
   // Populate requirements
   const jobRequirements = document.getElementById('applyJobRequirements');
   if (jobRequirements) jobRequirements.textContent = it.requirements || 'No specific requirements listed.';
   
   // Populate benefits
   const jobBenefits = document.getElementById('applyJobBenefits');
   if (jobBenefits) jobBenefits.textContent = it.benefits || 'Benefits to be discussed.';
   
   // Populate job info grid
   const jobDuration = document.getElementById('applyJobDuration');
   const jobLocation = document.getElementById('applyJobLocation');
   const jobIndustry = document.getElementById('applyJobIndustry');
   const jobLanguage = document.getElementById('applyJobLanguage');
   
   if (jobDuration) jobDuration.textContent = it.duration;
   if (jobLocation) jobLocation.textContent = it.location;
   if (jobIndustry) jobIndustry.textContent = it.industry;
   if (jobLanguage) jobLanguage.textContent = it.language;
   
   dlg.showModal();
   
   // Handle cancel button
   const cancelBtn = dlg.querySelector('[data-close]');
   if (cancelBtn) {
     cancelBtn.onclick = () => {
       dlg.close();
     };
   }
   
   // Handle form submission
   const confirmBtn = document.getElementById('applyConfirmBtn');
   if (confirmBtn) {
     confirmBtn.onclick = (e) => {
       e.preventDefault();
       dlg.close(); // Close the apply modal
       openSubmissionForm(it); // Open the submission form
     };
   }
 }


 function updateStatusSummary(){
   const apps = getJSON('applications') || [];
   const counts = { pending: 0, accepted: 0, rejected: 0 };
   apps.forEach(a => { if (counts[a.status] !== undefined) counts[a.status]++; });
   setText('statusPending', counts.pending);
   setText('statusAccepted', counts.accepted);
   setText('statusRejected', counts.rejected);
 }

 function openSubmissionForm(internship) {
   const submissionModal = document.getElementById('submissionModal');
   if (!submissionModal) return;
   
   // Store the internship data for later use
   STATE.selectedInternship = internship;
   
   submissionModal.showModal();
   
   // Handle submission form submit
   const submitBtn = document.getElementById('submitApplicationBtn');
   if (submitBtn) {
     submitBtn.onclick = (e) => {
       e.preventDefault();
       handleFormSubmission();
     };
   }
   
   // Handle cancel button
   const cancelBtn = submissionModal.querySelector('[data-close]');
   if (cancelBtn) {
     cancelBtn.onclick = () => {
       submissionModal.close();
     };
   }
 }

 function handleFormSubmission() {
   const form = document.getElementById('submissionForm');
   const formData = new FormData(form);
   
   // Validate required fields
   const requiredFields = ['fullName', 'email', 'phone', 'coverLetter'];
   let isValid = true;
   
   for (const field of requiredFields) {
     const value = formData.get(field);
     if (!value || value.trim() === '') {
       isValid = false;
       break;
     }
   }
   
   if (!isValid) {
     Toast.show('warn', 'Please fill in all required fields');
     return;
   }
   
   // Simulate form submission
   const submissionData = {
     internship: STATE.selectedInternship,
     applicant: {
       fullName: formData.get('fullName'),
       email: formData.get('email'),
       phone: formData.get('phone'),
       university: formData.get('university'),
       major: formData.get('major'),
       coverLetter: formData.get('coverLetter'),
       resume: formData.get('resume')?.name || null
     },
     submittedAt: new Date().toISOString()
   };
   
   // Add to applications
   addApplication({ 
     id: STATE.selectedInternship.id, 
     status: 'pending', 
     ts: Date.now(), 
     companyId: STATE.selectedInternship.companyId, 
     position: STATE.selectedInternship.position,
     submissionData: submissionData
   });
   
   // Close submission form and show confirmation
   document.getElementById('submissionModal').close();
   showConfirmationModal();
   updateStatusSummary();
 }

 function showConfirmationModal() {
   const confirmationModal = document.getElementById('confirmationModal');
   if (!confirmationModal) return;
   
   confirmationModal.showModal();
   
   // Auto-close after 5 seconds or when user clicks close
   setTimeout(() => {
     if (confirmationModal.open) {
       confirmationModal.close();
     }
   }, 5000);
 }


 function simulateStatusUpdates(){
   setTimeout(() => {
     const apps = getJSON('applications') || [];
     let changed = false;
     apps.forEach(a => {
       if (a.status === 'pending') {
         a.status = Math.random() > 0.6 ? 'accepted' : (Math.random() > 0.5 ? 'rejected' : 'pending');
         if (a.status !== 'pending') changed = true;
       }
     });
     if (changed) {
       setJSON('applications', apps);
       updateStatusSummary();
       Toast.show('info', 'Application status updated 🔔');
     }
   }, 8000);
 }


 // Companies Page
 function initCompaniesPage(){
   const listEl = document.getElementById('companyList');
   const countEl = document.getElementById('companiesCount');
   const kwEl = document.getElementById('companyKeyword');
   const btn = document.getElementById('companySearchBtn');
   const chipsEl = document.getElementById('companyRecentSearches');


   const render = (arr) => {
     listEl.innerHTML = '';
     arr.forEach((c) => listEl.appendChild(buildCompanyCard(c)));
     countEl.textContent = `${arr.length} results`;
   };


   render(DATA.companies);


   btn.addEventListener('click', () => {
     const k = SearchUtils.normalize(kwEl.value);
     const res = DATA.companies.filter(c => (c.verified) && (`${c.name} ${c.description} ${c.location}`.toLowerCase().includes(k)));
     render(res);
     SearchUtils.saveSearch({ keyword: kwEl.value, location: '', industry: '', language: '', nationality: '' });
     SearchUtils.renderChips(chipsEl, SearchUtils.getRecentSearches(), (p) => {
       kwEl.value = p.keyword || '';
       const res2 = DATA.companies.filter(c => (`${c.name} ${c.description} ${c.location}`.toLowerCase().includes(SearchUtils.normalize(kwEl.value))));
       render(res2);
     });
   });


   SearchUtils.renderChips(chipsEl, SearchUtils.getRecentSearches(), (p) => {
     kwEl.value = p.keyword || '';
     const res2 = DATA.companies.filter(c => (`${c.name} ${c.description} ${c.location}`.toLowerCase().includes(SearchUtils.normalize(kwEl.value))));
     render(res2);
   });


   wireModal('companyModal');
   wireModal('applyModal'); // allow applying from the company popup
 }


 function buildCompanyCard(c){
   const card = el('div', { class: 'card company' });
   const img = el('img', { src: c.logo, alt: `${c.name} logo` });
   const body = el('div');
   const title = el('h3', { class: 'card-title' }, c.name);
   const badge = el('span', { class: 'badge verified' }, 'Verified');
   const desc = el('div', { class: 'meta' }, c.description);
   const actions = el('div', { class: 'card-actions' });
   const btn = el('button', { class: 'btn secondary' }, 'View Internships');
   btn.addEventListener('click', () => openCompanyModal(c));
   actions.appendChild(btn);
   const row = el('div', { class: 'card-row' }); row.appendChild(title); if (c.verified) row.appendChild(badge);
   body.appendChild(row);
   body.appendChild(desc);
   body.appendChild(actions);
   card.appendChild(img);
   card.appendChild(body);
   return card;
 }


 // ✨ Rich company modal with full info + apply buttons
 function openCompanyModal(c){
   const dlg = document.getElementById('companyModal');
   const title = document.getElementById('companyModalTitle');
   const body = document.getElementById('companyModalBody');
   if (!dlg || !body) return;


   const verifiedBadge = c.verified ? `<span class="badge verified">Verified</span>` : `<span class="badge">Unverified</span>`;
   const jobs = DATA.internships.filter(it => it.companyId === c.id);


   body.innerHTML = `
     <div class="company-detail">
       <div class="row gap">
         <img src="${c.logo}" alt="${c.name} logo" style="width:72px;height:72px;border-radius:12px;object-fit:cover" />
         <div>
           <h4 class="card-title" style="margin:0">${c.name} ${verifiedBadge}</h4>
           <div class="meta">${c.description}</div>
         </div>
       </div>


       <div class="info-grid" style="display:grid;grid-template-columns:repeat(auto-fit,minmax(180px,1fr));gap:12px;margin:16px 0;">
         <div><strong>Location</strong><div class="meta">${c.location || '-'}</div></div>
         <div><strong>Founded</strong><div class="meta">${c.founded || '-'}</div></div>
         <div><strong>Company size</strong><div class="meta">${c.size || '-'}</div></div>
         <div><strong>Website</strong><div class="meta">${c.website ? `<a href="${c.website}" target="_blank" rel="noopener">Visit site</a>` : '-'}</div></div>
         <div><strong>Email</strong><div class="meta">${c.email ? `<a href="mailto:${c.email}">${c.email}</a>` : '-'}</div></div>
         <div><strong>Phone</strong><div class="meta">${c.phone || '-'}</div></div>
       </div>


       ${c.about ? `<p style="margin:12px 0">${c.about}</p>` : ''}


       <h4 style="margin-top:16px">Open Internships</h4>
       ${jobs.length ? `
         <ul class="job-list" style="list-style:none;padding:0;margin:8px 0;display:grid;gap:8px">
           ${jobs.map(it => `
             <li class="card" style="padding:12px">
               <div class="card-row">
                 <span class="card-title" style="font-size:1rem">${it.position}</span>
                 ${it.verified ? '<span class="badge verified">Verified</span>' : '<span class="badge">Posted</span>'}
               </div>
               <div class="meta">${it.location} • ${it.language} • ${it.duration}</div>
               <div class="card-actions">
                 <button class="btn secondary" data-apply-id="${it.id}">Apply</button>
               </div>
             </li>
           `).join('')}
         </ul>
       ` : `<p class="muted">No open internships right now.</p>`}
     </div>
   `;


   // Bind Apply buttons inside the modal
   body.querySelectorAll('[data-apply-id]').forEach(btn => {
     const id = btn.getAttribute('data-apply-id');
     const it = DATA.internships.find(x => x.id === id);
     btn.addEventListener('click', () => openApplyModal(it));
   });


   title.textContent = c.name;
   dlg.showModal();
   dlg.querySelector('[data-close]').onclick = () => dlg.close();
 }


 // Articles Page
 function initArticlesPage(){
   const listEl = document.getElementById('articlesList');
   const countEl = document.getElementById('articlesCount');
   const kwEl = document.getElementById('articleKeyword');
   const btn = document.getElementById('articleSearchBtn');
   const render = (arr) => {
     listEl.innerHTML = '';
     arr.forEach(a => listEl.appendChild(buildArticleCard(a)));
     countEl.textContent = `${arr.length} items`;
   };
   render(DATA.articles);
   btn.addEventListener('click', () => {
     const k = SearchUtils.normalize(kwEl.value);
     const res = DATA.articles.filter(a => (`${a.title} ${a.category} ${a.description}`.toLowerCase().includes(k)));
     render(res);
   });
 }


 function buildArticleCard(a){
   const card = el('div', { class: 'card' });
   const title = el('h3', { class: 'card-title' }, a.title);
   const meta = el('div', { class: 'meta' }, `${a.category} • ${a.duration}`);
   const desc = el('p', {}, a.description);
   const actions = el('div', { class: 'card-actions' });
   const btn = el('button', { class: 'btn secondary' }, 'Enroll');
   btn.addEventListener('click', () => { Toast.show('success', 'Enrolled 🎓'); });
   actions.appendChild(btn);
   card.appendChild(title);
   card.appendChild(meta);
   card.appendChild(desc);
   card.appendChild(actions);
   return card;
 }


 // Login Page
 function initLoginPage(){
   const form = document.getElementById('loginPageForm');
   const email = document.getElementById('loginPageEmail');
   const pass = document.getElementById('loginPagePassword');
   const forgot = document.getElementById('loginForgot');
   form.addEventListener('submit', (e) => {
     e.preventDefault();
     if (!email.value || !pass.value) return Toast.show('warn', 'Please fill in required fields');
     setJSON('currentUser', { email: email.value });
     STATE.user = getJSON('currentUser');
     Toast.show('success', 'Logged in');
     setTimeout(() => { location.href = 'index.html'; }, 600);
   });
   forgot.addEventListener('click', (e) => { e.preventDefault(); Toast.show('info', 'Password recovery link sent ✉️'); });
 }


 // Register Page
 function initRegisterPage(){
   const form = document.getElementById('registerPageForm');
   const role = document.getElementById('registerPageRole');
   const name = document.getElementById('registerPageName');
   const email = document.getElementById('registerPageEmail');
   const pass = document.getElementById('registerPagePassword');
   form.addEventListener('submit', (e) => {
     e.preventDefault();
     if (!name.value || !email.value || !pass.value) return Toast.show('warn', 'Please fill in required fields');
     setJSON('currentUser', { role: role.value, name: name.value, email: email.value });
     setJSON('profile', { preferredIndustry: role.value === 'student' ? 'Technology' : 'Marketing' });
     Toast.show('success', 'Account created');
     setTimeout(() => { location.href = 'index.html'; }, 600);
   });
 }


 // Profile Page
 function initProfilePage(){
   const title = document.querySelector('.card-title');
   const emailEl = document.getElementById('profileEmail');
   const nameEl = document.getElementById('profileName');
   const roleEl = document.getElementById('profileRole');
   const user = getJSON('currentUser');
   const prof = getJSON('profile') || {};
   if (!user) {
     Toast.show('info', 'Please login to view profile');
     setTimeout(() => { location.href = 'login.html'; }, 800);
     return;
   }
   if (title) title.textContent = (TRANSLATIONS[STATE.lang]||TRANSLATIONS.en)['profile.title'];
   if (emailEl) emailEl.textContent = user.email || '-';
   if (nameEl) nameEl.textContent = user.name || prof.name || '-';
   if (roleEl) roleEl.textContent = user.role || prof.role || 'student';
 }


 // Helpers
 function wireModal(id){
   const dlg = document.getElementById(id);
   if (!dlg) return;
   dlg.addEventListener('click', (e) => { if (e.target.hasAttribute('data-close')) dlg.close(); });
 }


 function el(tag, attrs = {}, text){
   const node = document.createElement(tag);
   Object.entries(attrs).forEach(([k, v]) => node.setAttribute(k, v));
   if (text) node.textContent = text;
   return node;
 }


 function setText(id, text){ const el = document.getElementById(id); if (el) el.textContent = text; }
 function getJSON(key){ try { return JSON.parse(localStorage.getItem(key) || 'null'); } catch(e){ return null; } }
 function setJSON(key, val){ localStorage.setItem(key, JSON.stringify(val)); }
 function addApplication(app){
   const apps = getJSON('applications') || [];
   // Replace or add
   const idx = apps.findIndex(a => a.id === app.id);
   if (idx >= 0) apps[idx] = app; else apps.push(app);
   setJSON('applications', apps);
 }


 // Auth helpers
 function logout(){
   localStorage.removeItem('currentUser');
   STATE.user = null;
   Toast.show('info', 'Logged out');
   applyTranslations();
   setTimeout(() => { location.href = 'index.html'; }, 400);
 }

})();



