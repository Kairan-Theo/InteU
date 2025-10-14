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
      'apply.submit': 'Confirm Application',
    },
    th: {
      'nav.home': 'หน้าหลัก',
      'nav.companies': 'บริษัท',
      'nav.articles': 'บทความ',
      'nav.login': 'เข้าสู่ระบบ',
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
      'apply.submit': 'ยืนยันการสมัคร',
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
  });

  function buildData(){
    const companies = [
      { id: 'c1', name: 'TechFusion Co.', logo: 'https://via.placeholder.com/64', description: 'AI and cloud services', verified: true, positions: ['Frontend Intern', 'Data Intern'] },
      { id: 'c2', name: 'DesignHub Studio', logo: 'https://via.placeholder.com/64', description: 'Digital product design', verified: true, positions: ['UX Research Intern', 'UI Design Intern'] },
      { id: 'c3', name: 'MarketMinds Ltd.', logo: 'https://via.placeholder.com/64', description: 'Marketing analytics', verified: true, positions: ['Growth Intern', 'Content Intern'] },
      { id: 'c4', name: 'FinNext', logo: 'https://via.placeholder.com/64', description: 'Fintech solutions', verified: false, positions: ['Finance Analyst Intern'] },
      { id: 'c5', name: 'SeaView Resorts', logo: 'https://via.placeholder.com/64', description: 'Hospitality & leisure', verified: true, positions: ['Operations Intern'] },
    ];
    const internships = [
      { id: 'i1', companyId: 'c1', companyName: 'TechFusion Co.', position: 'Frontend Intern', location: 'Bangkok', industry: 'Technology', language: 'English', duration: '3 months', verified: true, nationalityRequirement: 'Any' },
      { id: 'i2', companyId: 'c1', companyName: 'TechFusion Co.', position: 'Data Intern', location: 'Bangkok', industry: 'Technology', language: 'English', duration: '4 months', verified: true, nationalityRequirement: 'International' },
      { id: 'i3', companyId: 'c2', companyName: 'DesignHub Studio', position: 'UI Design Intern', location: 'Chiang Mai', industry: 'Design', language: 'Thai', duration: '3 months', verified: true, nationalityRequirement: 'Thai' },
      { id: 'i4', companyId: 'c2', companyName: 'DesignHub Studio', position: 'UX Research Intern', location: 'Bangkok', industry: 'Design', language: 'English', duration: '3 months', verified: true, nationalityRequirement: 'Any' },
      { id: 'i5', companyId: 'c3', companyName: 'MarketMinds Ltd.', position: 'Content Intern', location: 'Bangkok', industry: 'Marketing', language: 'English', duration: '2 months', verified: true, nationalityRequirement: 'Any' },
      { id: 'i6', companyId: 'c4', companyName: 'FinNext', position: 'Finance Analyst Intern', location: 'Bangkok', industry: 'Finance', language: 'Thai', duration: '3 months', verified: false, nationalityRequirement: 'Thai' },
      { id: 'i7', companyId: 'c5', companyName: 'SeaView Resorts', position: 'Operations Intern', location: 'Phuket', industry: 'Marketing', language: 'English', duration: '3 months', verified: true, nationalityRequirement: 'Any' },
      { id: 'i8', companyId: 'c3', companyName: 'MarketMinds Ltd.', position: 'Growth Intern', location: 'Bangkok', industry: 'Marketing', language: 'Thai', duration: '4 months', verified: true, nationalityRequirement: 'Thai' },
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
      if (dict[key]) el.textContent = dict[key];
    });
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
    const summary = document.getElementById('applySummary');
    if (!dlg) return;
    summary.textContent = `${it.position} at ${it.companyName} (${it.location})`;
    dlg.showModal();
    const form = document.getElementById('applyForm');
    form.onsubmit = (e) => {
      e.preventDefault();
      addApplication({ id: it.id, status: 'pending', ts: Date.now(), companyId: it.companyId, position: it.position });
      Toast.show('success', 'Application submitted ✅');
      dlg.close();
      updateStatusSummary();
    };
  }

  function updateStatusSummary(){
    const apps = getJSON('applications') || [];
    const counts = { pending: 0, accepted: 0, rejected: 0 };
    apps.forEach(a => { if (counts[a.status] !== undefined) counts[a.status]++; });
    setText('statusPending', counts.pending);
    setText('statusAccepted', counts.accepted);
    setText('statusRejected', counts.rejected);
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
      const res = DATA.companies.filter(c => (c.verified) && (`${c.name} ${c.description}`.toLowerCase().includes(k)));
      render(res);
      SearchUtils.saveSearch({ keyword: kwEl.value, location: '', industry: '', language: '', nationality: '' });
      SearchUtils.renderChips(chipsEl, SearchUtils.getRecentSearches(), (p) => {
        kwEl.value = p.keyword || '';
        const res2 = DATA.companies.filter(c => (`${c.name} ${c.description}`.toLowerCase().includes(SearchUtils.normalize(kwEl.value))));
        render(res2);
      });
    });
    SearchUtils.renderChips(chipsEl, SearchUtils.getRecentSearches(), (p) => {
      kwEl.value = p.keyword || '';
      const res2 = DATA.companies.filter(c => (`${c.name} ${c.description}`.toLowerCase().includes(SearchUtils.normalize(kwEl.value))));
      render(res2);
    });

    wireModal('companyModal');
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

  function openCompanyModal(c){
    const dlg = document.getElementById('companyModal');
    const title = document.getElementById('companyModalTitle');
    const body = document.getElementById('companyModalBody');
    title.textContent = c.name;
    body.innerHTML = `<p class="meta">${c.description}</p><h4>Open Positions</h4><ul>${c.positions.map(p => `<li>${p}</li>`).join('')}</ul>`;
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

})();