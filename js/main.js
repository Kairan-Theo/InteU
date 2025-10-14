

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
     'nav.sections': 'Sections',
     'nav.admin': 'Admin',
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
     'footer.privacyPolicy': 'Privacy Policy',
     'footer.pdpaNotice': 'PDPA Notice',
     'footer.copy': 'Trusted internships for global learners.',
     // Contact Us Modal
     'contact.title': 'Contact Us',
     'contact.name': 'Name',
     'contact.email': 'Email',
     'contact.subject': 'Subject',
     'contact.message': 'Message',
     'contact.send': 'Send Message',
     'contact.cancel': 'Cancel',
     // FAQ Modal
     'faq.title': 'Frequently Asked Questions',
     'faq.q1': 'How do I apply for an internship?',
     'faq.a1': 'Browse our companies page, find an internship that matches your interests, and click "Apply Now" to submit your application.',
     'faq.q2': 'What documents do I need to apply?',
     'faq.a2': 'You\'ll need your resume/CV, a cover letter, and any relevant academic transcripts or certificates.',
     'faq.q3': 'How long does the application process take?',
     'faq.a3': 'Most companies respond within 1-2 weeks. You can track your application status in your profile dashboard.',
     'faq.q4': 'Are these internships paid?',
     'faq.a4': 'Compensation varies by company and position. Check the internship details for specific information about stipends or benefits.',
     'faq.q5': 'Can international students apply?',
     'faq.a5': 'Yes! Many of our partner companies welcome international students. Make sure to check visa requirements for your specific situation.',
     'faq.close': 'Close',
     // Privacy Policy Modal
     'privacy.title': 'Privacy Policy',
     'privacy.collection': 'Information We Collect',
     'privacy.collectionText': 'We collect information you provide directly to us, such as when you create an account, apply for internships, or contact us for support.',
     'privacy.usage': 'How We Use Your Information',
     'privacy.usageText': 'We use your information to provide our services, process applications, communicate with you, and improve our platform.',
     'privacy.sharing': 'Information Sharing',
     'privacy.sharingText': 'We share your application information with companies you apply to. We do not sell your personal information to third parties.',
     'privacy.security': 'Data Security',
     'privacy.securityText': 'We implement appropriate security measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction.',
     'privacy.close': 'Close',
     // PDPA Notice Modal
     'pdpa.title': 'PDPA Notice',
     'pdpa.purpose': 'Purpose of Data Collection',
     'pdpa.purposeText': 'We collect and process your personal data in accordance with Thailand\'s Personal Data Protection Act (PDPA) for the purpose of providing internship matching services.',
     'pdpa.rights': 'Your Rights',
     'pdpa.right1': 'Right to access your personal data',
     'pdpa.right2': 'Right to rectify inaccurate data',
     'pdpa.right3': 'Right to erase your data',
     'pdpa.right4': 'Right to restrict processing',
     'pdpa.right5': 'Right to data portability',
     'pdpa.contact': 'Contact for Data Protection',
     'pdpa.contactText': 'For any questions regarding your personal data or to exercise your rights, please contact our Data Protection Officer at privacy@inteu.com',
     'pdpa.close': 'Close',
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
     // Course modal translations
     'course.details': 'Course Details',
     'course.cancel': 'Cancel',
     'course.enroll': 'Enroll Now',
     'course.whatYouLearn': 'What You\'ll Learn',
     'course.practical': 'Practical skills for real-world application',
     'course.industry': 'Industry best practices and standards',
     'course.hands': 'Hands-on exercises and projects',
     // Enrollment modal translations
     'enrollment.title': 'Course Enrollment',
     'enrollment.name': 'Full Name',
     'enrollment.email': 'Email Address',
     'enrollment.phone': 'Phone Number',
     'enrollment.motivation': 'Why are you interested in this course?',
     'enrollment.cancel': 'Cancel',
     'enrollment.submit': 'Submit Enrollment',
     // Enrollment confirmation translations
     'enrollmentConfirmation.title': 'Enrollment Successful!',
     'enrollmentConfirmation.message': 'You have successfully enrolled in the course. Check your email for further instructions.',
     'enrollmentConfirmation.course': 'Course',
     'enrollmentConfirmation.duration': 'Duration',
     'enrollmentConfirmation.ok': 'Ok',
     // Admin dashboard translations
     'admin.title': 'Dashboard',
     'admin.subtitle': 'Manage applications and course enrollments',
     'admin.totalApplications': 'Total Applications',
     'admin.totalEnrollments': 'Course Enrollments',
     'admin.pendingApplications': 'Pending Applications',
     'admin.activeEnrollments': 'Active Enrollments',
     'admin.applicationsTab': 'Internship Applications',
     'admin.enrollmentsTab': 'Course Enrollments',
     'admin.applicationsTitle': 'Internship Applications',
     'admin.enrollmentsTitle': 'Course Enrollments',
     'admin.allStatuses': 'All Statuses',
     'admin.pending': 'Pending',
     'admin.accepted': 'Accepted',
     'admin.rejected': 'Rejected',
     'admin.active': 'Active',
     'admin.completed': 'Completed',
     'admin.dropped': 'Dropped',
     'admin.searchApplications': 'Search applications...',
     'admin.searchEnrollments': 'Search enrollments...',
     'admin.applicant': 'Applicant',
     'admin.position': 'Position',
     'admin.company': 'Company',
     'admin.appliedDate': 'Applied Date',
     'admin.status': 'Status',
     'admin.actions': 'Actions',
     'admin.student': 'Student',
     'admin.course': 'Course',
     'admin.category': 'Category',
     'admin.enrolledDate': 'Enrolled Date',
     'admin.progress': 'Progress',
     'admin.applicationDetails': 'Application Details',
     'admin.enrollmentDetails': 'Enrollment Details',
     'admin.applicantInfo': 'Applicant Information',
     'admin.studentInfo': 'Student Information',
     'admin.positionInfo': 'Position Information',
     'admin.courseInfo': 'Course Information',
     'admin.name': 'Name',
     'admin.email': 'Email',
     'admin.phone': 'Phone',
     'admin.university': 'University',
     'admin.major': 'Major',
     'admin.duration': 'Duration',
     'admin.coverLetter': 'Cover Letter',
     'admin.motivation': 'Motivation',
     'admin.close': 'Close',
     'admin.updateStatus': 'Update Status'
   },
   th: {
     'nav.home': 'หน้าหลัก',
     'nav.companies': 'บริษัท',
     'nav.articles': 'บทความ',
     'nav.sections': 'ส่วนต่างๆ',
     'nav.admin': 'ผู้ดูแลระบบ',
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
     'footer.privacyPolicy': 'นโยบายความเป็นส่วนตัว',
     'footer.pdpaNotice': 'ประกาศ PDPA',
     'footer.copy': 'ฝึกงานที่เชื่อถือได้ สำหรับผู้เรียนทั่วโลก',
     // Contact Us Modal
     'contact.title': 'ติดต่อเรา',
     'contact.name': 'ชื่อ',
     'contact.email': 'อีเมล',
     'contact.subject': 'หัวข้อ',
     'contact.message': 'ข้อความ',
     'contact.send': 'ส่งข้อความ',
     'contact.cancel': 'ยกเลิก',
     // FAQ Modal
     'faq.title': 'คำถามที่พบบ่อย',
     'faq.q1': 'ฉันจะสมัครฝึกงานได้อย่างไร?',
     'faq.a1': 'เรียกดูหน้าบริษัทของเรา หาตำแหน่งฝึกงานที่ตรงกับความสนใจของคุณ และคลิก "สมัครเลย" เพื่อส่งใบสมัครของคุณ',
     'faq.q2': 'ฉันต้องใช้เอกสารอะไรในการสมัคร?',
     'faq.a2': 'คุณจะต้องมีเรซูเม่/CV จดหมายแนะนำตัว และใบแสดงผลการเรียนหรือใบรับรองที่เกี่ยวข้อง',
     'faq.q3': 'กระบวนการสมัครใช้เวลานานเท่าไหร่?',
     'faq.a3': 'บริษัทส่วนใหญ่จะตอบกลับภายใน 1-2 สัปดาห์ คุณสามารถติดตามสถานะการสมัครของคุณในแดชบอร์ดโปรไฟล์',
     'faq.q4': 'ตำแหน่งฝึกงานเหล่านี้ได้รับค่าตอบแทนหรือไม่?',
     'faq.a4': 'ค่าตอบแทนแตกต่างกันไปตามบริษัทและตำแหน่ง ตรวจสอบรายละเอียดการฝึกงานสำหรับข้อมูลเฉพาะเกี่ยวกับเงินช่วยเหลือหรือสวัสดิการ',
     'faq.q5': 'นักเรียนต่างชาติสามารถสมัครได้หรือไม่?',
     'faq.a5': 'ได้! บริษัทพันธมิตรหลายแห่งของเรายินดีต้อนรับนักเรียนต่างชาติ ตรวจสอบข้อกำหนดวีซ่าสำหรับสถานการณ์เฉพาะของคุณ',
     'faq.close': 'ปิด',
     // Privacy Policy Modal
     'privacy.title': 'นโยบายความเป็นส่วนตัว',
     'privacy.collection': 'ข้อมูลที่เราเก็บรวบรวม',
     'privacy.collectionText': 'เราเก็บรวบรวมข้อมูลที่คุณให้กับเราโดยตรง เช่น เมื่อคุณสร้างบัญชี สมัครฝึกงาน หรือติดต่อเราเพื่อขอความช่วยเหลือ',
     'privacy.usage': 'วิธีที่เราใช้ข้อมูลของคุณ',
     'privacy.usageText': 'เราใช้ข้อมูลของคุณเพื่อให้บริการ ดำเนินการสมัครงาน ติดต่อสื่อสารกับคุณ และปรับปรุงแพลตฟอร์มของเรา',
     'privacy.sharing': 'การแบ่งปันข้อมูล',
     'privacy.sharingText': 'เราแบ่งปันข้อมูลการสมัครของคุณกับบริษัทที่คุณสมัคร เราไม่ขายข้อมูลส่วนบุคคลของคุณให้กับบุคคลที่สาม',
     'privacy.security': 'ความปลอดภัยของข้อมูล',
     'privacy.securityText': 'เราใช้มาตรการรักษาความปลอดภัยที่เหมาะสมเพื่อปกป้องข้อมูลส่วนบุคคลของคุณจากการเข้าถึง การเปลี่ยนแปลง การเปิดเผย หรือการทำลายโดยไม่ได้รับอนุญาต',
     'privacy.close': 'ปิด',
     // PDPA Notice Modal
     'pdpa.title': 'ประกาศ PDPA',
     'pdpa.purpose': 'วัตถุประสงค์ของการเก็บรวบรวมข้อมูล',
     'pdpa.purposeText': 'เราเก็บรวบรวมและประมวลผลข้อมูลส่วนบุคคลของคุณตามพระราชบัญญัติคุ้มครองข้อมูลส่วนบุคคล (PDPA) ของประเทศไทย เพื่อวัตถุประสงค์ในการให้บริการจับคู่ฝึกงาน',
     'pdpa.rights': 'สิทธิของคุณ',
     'pdpa.right1': 'สิทธิในการเข้าถึงข้อมูลส่วนบุคคลของคุณ',
     'pdpa.right2': 'สิทธิในการแก้ไขข้อมูลที่ไม่ถูกต้อง',
     'pdpa.right3': 'สิทธิในการลบข้อมูลของคุณ',
     'pdpa.right4': 'สิทธิในการจำกัดการประมวลผล',
     'pdpa.right5': 'สิทธิในการพกพาข้อมูล',
     'pdpa.contact': 'ติดต่อเพื่อการคุ้มครองข้อมูล',
     'pdpa.contactText': 'หากมีคำถามเกี่ยวกับข้อมูลส่วนบุคคลของคุณหรือต้องการใช้สิทธิของคุณ โปรดติดต่อเจ้าหน้าที่คุ้มครองข้อมูลของเราที่ privacy@inteu.com',
     'pdpa.close': 'ปิด',
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
     // Course modal translations
     'course.details': 'รายละเอียดคอร์ส',
     'course.cancel': 'ยกเลิก',
     'course.enroll': 'ลงทะเบียนเลย',
     'course.whatYouLearn': 'สิ่งที่คุณจะได้เรียนรู้',
     'course.practical': 'ทักษะปฏิบัติสำหรับการใช้งานจริง',
     'course.industry': 'แนวปฏิบัติที่ดีและมาตรฐานอุตสาหกรรม',
     'course.hands': 'แบบฝึกหัดและโครงการปฏิบัติ',
     // Enrollment modal translations
     'enrollment.title': 'ลงทะเบียนคอร์ส',
     'enrollment.name': 'ชื่อ-นามสกุล',
     'enrollment.email': 'อีเมล',
     'enrollment.phone': 'เบอร์โทรศัพท์',
     'enrollment.motivation': 'เหตุผลที่สนใจคอร์สนี้?',
     'enrollment.cancel': 'ยกเลิก',
     'enrollment.submit': 'ส่งการลงทะเบียน',
     // Enrollment confirmation translations
     'enrollmentConfirmation.title': 'ลงทะเบียนสำเร็จ!',
     'enrollmentConfirmation.message': 'คุณได้ลงทะเบียนคอร์สเรียบร้อยแล้ว ตรวจสอบอีเมลของคุณสำหรับคำแนะนำเพิ่มเติม',
     'enrollmentConfirmation.course': 'คอร์ส',
     'enrollmentConfirmation.duration': 'ระยะเวลา',
     'enrollmentConfirmation.ok': 'ตกลง',
     // Admin dashboard translations
     'admin.title': 'แดชบอร์ด',
     'admin.subtitle': 'จัดการใบสมัครและการลงทะเบียนคอร์ส',
     'admin.totalApplications': 'ใบสมัครทั้งหมด',
     'admin.totalEnrollments': 'การลงทะเบียนคอร์ส',
     'admin.pendingApplications': 'ใบสมัครที่รอดำเนินการ',
     'admin.activeEnrollments': 'การลงทะเบียนที่ใช้งานอยู่',
     'admin.applicationsTab': 'ใบสมัครฝึกงาน',
     'admin.enrollmentsTab': 'การลงทะเบียนคอร์ส',
     'admin.applicationsTitle': 'ใบสมัครฝึกงาน',
     'admin.enrollmentsTitle': 'การลงทะเบียนคอร์ส',
     'admin.allStatuses': 'สถานะทั้งหมด',
     'admin.pending': 'รอดำเนินการ',
     'admin.accepted': 'ได้รับการยอมรับ',
     'admin.rejected': 'ถูกปฏิเสธ',
     'admin.active': 'ใช้งานอยู่',
     'admin.completed': 'เสร็จสิ้น',
     'admin.dropped': 'ถอนตัว',
     'admin.searchApplications': 'ค้นหาใบสมัคร...',
     'admin.searchEnrollments': 'ค้นหาการลงทะเบียน...',
     'admin.applicant': 'ผู้สมัคร',
     'admin.position': 'ตำแหน่ง',
     'admin.company': 'บริษัท',
     'admin.appliedDate': 'วันที่สมัคร',
     'admin.status': 'สถานะ',
     'admin.actions': 'การดำเนินการ',
     'admin.student': 'นักเรียน',
     'admin.course': 'คอร์ส',
     'admin.category': 'หมวดหมู่',
     'admin.enrolledDate': 'วันที่ลงทะเบียน',
     'admin.progress': 'ความคืบหน้า',
     'admin.applicationDetails': 'รายละเอียดใบสมัคร',
     'admin.enrollmentDetails': 'รายละเอียดการลงทะเบียน',
     'admin.applicantInfo': 'ข้อมูลผู้สมัคร',
     'admin.studentInfo': 'ข้อมูลนักเรียน',
     'admin.positionInfo': 'ข้อมูลตำแหน่ง',
     'admin.courseInfo': 'ข้อมูลคอร์ส',
     'admin.name': 'ชื่อ',
     'admin.email': 'อีเมล',
     'admin.phone': 'โทรศัพท์',
     'admin.university': 'มหาวิทยาลัย',
     'admin.major': 'สาขาวิชา',
     'admin.duration': 'ระยะเวลา',
     'admin.coverLetter': 'จดหมายสมัครงาน',
     'admin.motivation': 'แรงจูงใจ',
     'admin.close': 'ปิด',
     'admin.updateStatus': 'อัปเดตสถานะ'
   }
 };


 const DATA = buildData();


 document.addEventListener('DOMContentLoaded', () => {
  initTheme();
  initLanguage();
  wireHeaderActions();
  wireFooterActions();
  const page = document.body.dataset.page;
  if (page === 'home') initHomePage();
  if (page === 'companies') initCompaniesPage();
  if (page === 'articles') initArticlesPage();
  if (page === 'login') initLoginPage();
  if (page === 'register') initRegisterPage();
  if (page === 'profile') initProfilePage();
  if (page === 'sections') initAdminPage();
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

 function wireFooterActions(){
   // Contact Us popup
   const contactUsLink = document.getElementById('contactUsLink');
   if (contactUsLink) {
     contactUsLink.addEventListener('click', (e) => {
       e.preventDefault();
       document.getElementById('contactUsModal').showModal();
     });
   }

   // FAQ popup
   const faqLink = document.getElementById('faqLink');
   if (faqLink) {
     faqLink.addEventListener('click', (e) => {
       e.preventDefault();
       document.getElementById('faqModal').showModal();
     });
   }

   // Privacy Policy popup
   const privacyPolicyLink = document.getElementById('privacyPolicyLink');
   if (privacyPolicyLink) {
     privacyPolicyLink.addEventListener('click', (e) => {
       e.preventDefault();
       document.getElementById('privacyPolicyModal').showModal();
     });
   }

   // PDPA Notice popup
   const pdpaNoticeLink = document.getElementById('pdpaNoticeLink');
   if (pdpaNoticeLink) {
     pdpaNoticeLink.addEventListener('click', (e) => {
       e.preventDefault();
       document.getElementById('pdpaNoticeModal').showModal();
     });
   }

   // Contact form submission
   const contactForm = document.getElementById('contactForm');
   if (contactForm) {
     contactForm.addEventListener('submit', (e) => {
       e.preventDefault();
       const formData = new FormData(contactForm);
       const data = {
         name: formData.get('name'),
         email: formData.get('email'),
         subject: formData.get('subject'),
         message: formData.get('message')
       };
       
       // Simulate form submission
       Toast.show('success', 'Message sent successfully! We\'ll get back to you soon.');
       contactForm.reset();
       document.getElementById('contactUsModal').close();
     });
   }
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
       
       // Set specific user information for dropdown
       const userName = 'Jennie Kim';
       const userEmail = 'jennie@gmail.com';
       
       const dd = document.createElement('div');
       dd.className = 'menu';
       dd.innerHTML = `
         <div class="user-info">
           <div class="user-avatar">
             <img src="images/user.png" alt="User Avatar" />
           </div>
           <div class="user-details">
             <div class="user-name">${userName}</div>
             <div class="user-email">${userEmail}</div>
           </div>
         </div>
         <div class="menu-divider"></div>
         <a href="profile.html" class="menu-item" data-i18n="nav.profile">
           <span class="menu-icon"><img src="images/user (1).png" alt="Profile" /></span>
           ${dict['nav.profile']||'Profile'}
         </a>
         <button type="button" class="menu-item" data-action="logout" data-i18n="nav.logout">
           <span class="menu-icon"><img src="images/power-off.png" alt="Logout" /></span>
           ${dict['nav.logout']||'Logout'}
         </button>
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
       // Update labels if language switches and refresh user info
       const userName = STATE.user.name || 'User';
       const userEmail = STATE.user.email || 'user@example.com';
       const formattedName = userName.replace(/\s+/g, '-').toLowerCase();
       
       const userNameEl = menu.querySelector('.user-name');
       const userEmailEl = menu.querySelector('.user-email');
       if (userNameEl) userNameEl.textContent = `@${formattedName}`;
       if (userEmailEl) userEmailEl.textContent = userEmail;
       
       menu.querySelector('[data-i18n="nav.profile"]').innerHTML = `<span class="menu-icon">👤</span>${dict['nav.profile'] || 'Profile'}`;
       menu.querySelector('[data-i18n="nav.logout"]').innerHTML = `<span class="menu-icon">🚪</span>${dict['nav.logout'] || 'Logout'}`;
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
   btn.addEventListener('click', () => { openCourseModal(a); });
   actions.appendChild(btn);
   card.appendChild(title);
   card.appendChild(meta);
   card.appendChild(desc);
   card.appendChild(actions);
   return card;
 }

 // Course Modal Functions
 function openCourseModal(course) {
   const dlg = document.getElementById('courseModal');
   if (!dlg) return;

   // Populate course details
   document.getElementById('courseModalTitle').textContent = course.title;
   document.getElementById('courseCategory').textContent = course.category;
   document.getElementById('courseDuration').textContent = course.duration;
   document.getElementById('courseDescription').textContent = course.description;

   // Store course data for enrollment
   dlg.courseData = course;

   // Wire up modal functionality
   wireModal(dlg);

   // Set up enroll button
   const enrollBtn = document.getElementById('enrollCourseBtn');
   enrollBtn.onclick = () => {
     dlg.close();
     openEnrollmentModal(course);
   };

   // Set up cancel button
   const cancelBtn = dlg.querySelector('[data-close]');
   if (cancelBtn) {
     cancelBtn.onclick = () => dlg.close();
   }

   dlg.showModal();
 }

 function openEnrollmentModal(course) {
   const dlg = document.getElementById('enrollmentModal');
   if (!dlg) return;

   // Store course data
   dlg.courseData = course;

   // Wire up modal functionality
   wireModal(dlg);

   // Set up form submission
   const submitBtn = document.getElementById('submitEnrollmentBtn');
   submitBtn.onclick = () => {
     const form = document.getElementById('enrollmentForm');
     const formData = new FormData(form);
     
     // Basic validation
     const name = formData.get('studentName');
     const email = formData.get('studentEmail');
     
     if (!name || !email) {
       Toast.show('warn', 'Please fill in required fields');
       return;
     }

     // Close enrollment modal and show confirmation
     dlg.close();
     showEnrollmentConfirmation(course);
   };

   // Set up cancel button
   const cancelBtn = dlg.querySelector('[data-close]');
   if (cancelBtn) {
     cancelBtn.onclick = () => dlg.close();
   }

   dlg.showModal();
 }

 function showEnrollmentConfirmation(course) {
   const dlg = document.getElementById('enrollmentConfirmationModal');
   if (!dlg) return;

   // Populate confirmation details
   document.getElementById('confirmedCourseName').textContent = course.title;
   document.getElementById('confirmedCourseDuration').textContent = course.duration;

   dlg.showModal();
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
   if (emailEl) emailEl.textContent = 'jennie@gmail.com';
   if (nameEl) nameEl.textContent = 'Jennie Kim';
   if (roleEl) roleEl.textContent = 'Student';
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

 // Admin Dashboard Functionality
 const ADMIN_DATA = {
   applications: [
     {
       id: 'app001',
       applicantName: 'John Smith',
       applicantEmail: 'john.smith@email.com',
       applicantPhone: '+66 81 234 5678',
       applicantUniversity: 'Chulalongkorn University',
       applicantMajor: 'Computer Science',
       position: 'Software Developer Intern',
       company: 'TechCorp Thailand',
       appliedDate: '2024-01-15',
       status: 'pending',
       coverLetter: 'I am passionate about software development and eager to contribute to your team. My experience with React and Node.js makes me a strong candidate for this position.'
     },
     {
       id: 'app002',
       applicantName: 'Sarah Johnson',
       applicantEmail: 'sarah.j@email.com',
       applicantPhone: '+66 82 345 6789',
       applicantUniversity: 'Mahidol University',
       applicantMajor: 'Digital Marketing',
       position: 'Marketing Intern',
       company: 'Digital Solutions Co.',
       appliedDate: '2024-01-12',
       status: 'accepted',
       coverLetter: 'With my background in digital marketing and social media management, I am excited to bring fresh ideas to your marketing team.'
     },
     {
       id: 'app003',
       applicantName: 'Michael Chen',
       applicantEmail: 'michael.chen@email.com',
       applicantPhone: '+66 83 456 7890',
       applicantUniversity: 'Thammasat University',
       applicantMajor: 'Business Administration',
       position: 'Business Analyst Intern',
       company: 'Global Consulting',
       appliedDate: '2024-01-10',
       status: 'rejected',
       coverLetter: 'My analytical skills and business acumen would be valuable assets to your consulting team. I have experience with data analysis and strategic planning.'
     },
     {
       id: 'app004',
       applicantName: 'Emma Wilson',
       applicantEmail: 'emma.wilson@email.com',
       applicantPhone: '+66 84 567 8901',
       applicantUniversity: 'King Mongkut\'s University',
       applicantMajor: 'Graphic Design',
       position: 'UI/UX Designer Intern',
       company: 'Creative Agency',
       appliedDate: '2024-01-08',
       status: 'pending',
       coverLetter: 'As a creative individual with a passion for user experience design, I am excited to contribute to your design team and learn from industry professionals.'
     },
     {
       id: 'app005',
       applicantName: 'David Lee',
       applicantEmail: 'david.lee@email.com',
       applicantPhone: '+66 85 678 9012',
       applicantUniversity: 'Kasetsart University',
       applicantMajor: 'Data Science',
       position: 'Data Analyst Intern',
       company: 'Analytics Pro',
       appliedDate: '2024-01-05',
       status: 'accepted',
       coverLetter: 'With strong skills in Python, R, and machine learning, I am eager to apply my knowledge to real-world data challenges at your company.'
     }
   ],
   enrollments: [
     {
       id: 'enr001',
       studentName: 'Alice Brown',
       studentEmail: 'alice.brown@email.com',
       studentPhone: '+66 86 789 0123',
       courseName: 'Advanced JavaScript Development',
       courseCategory: 'Programming',
       courseDuration: '8 weeks',
       enrolledDate: '2024-01-20',
       progress: 75,
       status: 'active',
       motivation: 'I want to advance my JavaScript skills to become a full-stack developer and work on more complex projects.'
     },
     {
       id: 'enr002',
       studentName: 'Robert Taylor',
       studentEmail: 'robert.taylor@email.com',
       studentPhone: '+66 87 890 1234',
       courseName: 'Digital Marketing Fundamentals',
       courseCategory: 'Marketing',
       courseDuration: '6 weeks',
       enrolledDate: '2024-01-18',
       progress: 100,
       status: 'completed',
       motivation: 'I need to understand digital marketing strategies to help grow my startup and reach more customers online.'
     },
     {
       id: 'enr003',
       studentName: 'Lisa Garcia',
       studentEmail: 'lisa.garcia@email.com',
       studentPhone: '+66 88 901 2345',
       courseName: 'Data Science with Python',
       courseCategory: 'Data Science',
       courseDuration: '12 weeks',
       enrolledDate: '2024-01-15',
       progress: 45,
       status: 'active',
       motivation: 'Data science is the future, and I want to transition my career from traditional analytics to machine learning and AI.'
     },
     {
       id: 'enr004',
       studentName: 'James Martinez',
       studentEmail: 'james.martinez@email.com',
       studentPhone: '+66 89 012 3456',
       courseName: 'UI/UX Design Principles',
       courseCategory: 'Design',
       courseDuration: '10 weeks',
       enrolledDate: '2024-01-12',
       progress: 20,
       status: 'dropped',
       motivation: 'I wanted to learn design principles to improve my web development skills, but found the course too challenging.'
     },
     {
       id: 'enr005',
       studentName: 'Maria Rodriguez',
       studentEmail: 'maria.rodriguez@email.com',
       studentPhone: '+66 90 123 4567',
       courseName: 'Project Management Essentials',
       courseCategory: 'Business',
       courseDuration: '8 weeks',
       enrolledDate: '2024-01-10',
       progress: 90,
       status: 'active',
       motivation: 'As a team lead, I need formal project management training to better organize and deliver projects on time.'
     },
     {
       id: 'enr006',
       studentName: 'Kevin Wong',
       studentEmail: 'kevin.wong@email.com',
       studentPhone: '+66 91 234 5678',
       courseName: 'Cybersecurity Fundamentals',
       courseCategory: 'Security',
       courseDuration: '6 weeks',
       enrolledDate: '2024-01-08',
       progress: 100,
       status: 'completed',
       motivation: 'With increasing cyber threats, I want to understand security principles to protect my company\'s digital assets.'
     }
   ]
 };

 function initAdminPage() {
   if (document.body.dataset.page !== 'admin') return;

   // Initialize tab functionality
   const tabButtons = document.querySelectorAll('.tab-btn');
   const tabContents = document.querySelectorAll('.tab-content');

   tabButtons.forEach(btn => {
     btn.addEventListener('click', () => {
       const targetTab = btn.dataset.tab;
       
       // Update active tab button
       tabButtons.forEach(b => b.classList.remove('active'));
       btn.classList.add('active');
       
       // Update active tab content
       tabContents.forEach(content => {
         content.classList.remove('active');
         if (content.id === targetTab + 'Tab') {
           content.classList.add('active');
         }
       });
     });
   });

   // Initialize filters
   const applicationStatusFilter = document.getElementById('applicationStatusFilter');
   const applicationSearch = document.getElementById('applicationSearch');
   const enrollmentStatusFilter = document.getElementById('enrollmentStatusFilter');
   const enrollmentSearch = document.getElementById('enrollmentSearch');

   if (applicationStatusFilter) {
     applicationStatusFilter.addEventListener('change', filterApplications);
   }
   if (applicationSearch) {
     applicationSearch.addEventListener('input', filterApplications);
   }
   if (enrollmentStatusFilter) {
     enrollmentStatusFilter.addEventListener('change', filterEnrollments);
   }
   if (enrollmentSearch) {
     enrollmentSearch.addEventListener('input', filterEnrollments);
   }

   // Initialize modal functionality
   initAdminModals();

   // Load initial data
   updateDashboardStats();
   renderApplicationsTable();
   renderEnrollmentsTable();
 }

 function updateDashboardStats() {
   const totalApplications = ADMIN_DATA.applications.length;
   const totalEnrollments = ADMIN_DATA.enrollments.length;
   const pendingApplications = ADMIN_DATA.applications.filter(app => app.status === 'pending').length;
   const activeEnrollments = ADMIN_DATA.enrollments.filter(enr => enr.status === 'active').length;

   setText('totalApplications', totalApplications);
   setText('totalEnrollments', totalEnrollments);
   setText('pendingApplications', pendingApplications);
   setText('activeEnrollments', activeEnrollments);
 }

 function renderApplicationsTable(filteredData = null) {
   const tbody = document.getElementById('applicationsTableBody');
   if (!tbody) return;

   const applications = filteredData || ADMIN_DATA.applications;
   tbody.innerHTML = '';

   applications.forEach(app => {
       const row = el('tr');
       row.innerHTML = `
       <td>${app.applicantName}</td>
       <td>${app.position}</td>
       <td>${app.company}</td>
       <td>${formatDate(app.appliedDate)}</td>
       <td><span class="status-badge ${app.status}">${app.status}</span></td>
       <td>
         <button class="action-btn" onclick="viewApplicationDetails('${app.id}')">View</button>
         <button class="action-btn" onclick="updateApplicationStatus('${app.id}')">Update</button>
       </td>
     `;
     tbody.appendChild(row);
   });
 }

 function renderEnrollmentsTable(filteredData = null) {
   const tbody = document.getElementById('enrollmentsTableBody');
   if (!tbody) return;

   const enrollments = filteredData || ADMIN_DATA.enrollments;
   tbody.innerHTML = '';

   enrollments.forEach(enrollment => {
       const row = el('tr');
       row.innerHTML = `
       <td>${enrollment.studentName}</td>
       <td>${enrollment.courseName}</td>
       <td>${enrollment.courseCategory}</td>
       <td>${formatDate(enrollment.enrolledDate)}</td>
       <td>
         <div class="progress-bar">
           <div class="progress-fill" style="width: ${enrollment.progress}%"></div>
         </div>
         ${enrollment.progress}%
       </td>
       <td><span class="status-badge ${enrollment.status}">${enrollment.status}</span></td>
       <td>
         <button class="action-btn" onclick="viewEnrollmentDetails('${enrollment.id}')">View</button>
         <button class="action-btn" onclick="updateEnrollmentStatus('${enrollment.id}')">Update</button>
       </td>
     `;
     tbody.appendChild(row);
   });
 }

 function filterApplications() {
   const statusFilter = document.getElementById('applicationStatusFilter')?.value || 'all';
   const searchTerm = document.getElementById('applicationSearch')?.value.toLowerCase() || '';

   let filtered = ADMIN_DATA.applications;

   if (statusFilter !== 'all') {
     filtered = filtered.filter(app => app.status === statusFilter);
   }

   if (searchTerm) {
     filtered = filtered.filter(app => 
       app.applicantName.toLowerCase().includes(searchTerm) ||
       app.position.toLowerCase().includes(searchTerm) ||
       app.company.toLowerCase().includes(searchTerm)
     );
   }

   renderApplicationsTable(filtered);
 }

 function filterEnrollments() {
   const statusFilter = document.getElementById('enrollmentStatusFilter')?.value || 'all';
   const searchTerm = document.getElementById('enrollmentSearch')?.value.toLowerCase() || '';

   let filtered = ADMIN_DATA.enrollments;

   if (statusFilter !== 'all') {
     filtered = filtered.filter(enr => enr.status === statusFilter);
   }

   if (searchTerm) {
     filtered = filtered.filter(enr => 
       enr.studentName.toLowerCase().includes(searchTerm) ||
       enr.courseName.toLowerCase().includes(searchTerm) ||
       enr.courseCategory.toLowerCase().includes(searchTerm)
     );
   }

   renderEnrollmentsTable(filtered);
 }

 function viewApplicationDetails(appId) {
   const app = ADMIN_DATA.applications.find(a => a.id === appId);
   if (!app) return;

   setText('detailApplicantName', app.applicantName);
   setText('detailApplicantEmail', app.applicantEmail);
   setText('detailApplicantPhone', app.applicantPhone);
   setText('detailApplicantUniversity', app.applicantUniversity);
   setText('detailApplicantMajor', app.applicantMajor);
   setText('detailPosition', app.position);
   setText('detailCompany', app.company);
   setText('detailAppliedDate', formatDate(app.appliedDate));
   setText('detailCoverLetter', app.coverLetter);

   const modal = document.getElementById('applicationDetailsModal');
   if (modal) {
     modal.showModal();
   }
 }

 function viewEnrollmentDetails(enrId) {
   const enr = ADMIN_DATA.enrollments.find(e => e.id === enrId);
   if (!enr) return;

   setText('detailStudentName', enr.studentName);
   setText('detailStudentEmail', enr.studentEmail);
   setText('detailStudentPhone', enr.studentPhone);
   setText('detailCourseName', enr.courseName);
   setText('detailCourseCategory', enr.courseCategory);
   setText('detailCourseDuration', enr.courseDuration);
   setText('detailEnrolledDate', formatDate(enr.enrolledDate));
   setText('detailMotivation', enr.motivation);

   const modal = document.getElementById('enrollmentDetailsModal');
   if (modal) {
     modal.showModal();
   }
 }

 function updateApplicationStatus(appId) {
   const app = ADMIN_DATA.applications.find(a => a.id === appId);
   if (!app) return;

   const newStatus = prompt(`Update status for ${app.applicantName}:\n\nCurrent: ${app.status}\n\nEnter new status (pending/accepted/rejected):`, app.status);
   
   if (newStatus && ['pending', 'accepted', 'rejected'].includes(newStatus.toLowerCase())) {
     app.status = newStatus.toLowerCase();
     updateDashboardStats();
     filterApplications(); // Refresh the table with current filters
     Toast.show('success', `Application status updated to ${newStatus}`);
   }
 }

 function updateEnrollmentStatus(enrId) {
   const enr = ADMIN_DATA.enrollments.find(e => e.id === enrId);
   if (!enr) return;

   const newStatus = prompt(`Update status for ${enr.studentName}:\n\nCurrent: ${enr.status}\n\nEnter new status (active/completed/dropped):`, enr.status);
   
   if (newStatus && ['active', 'completed', 'dropped'].includes(newStatus.toLowerCase())) {
     enr.status = newStatus.toLowerCase();
     updateDashboardStats();
     filterEnrollments(); // Refresh the table with current filters
     Toast.show('success', `Enrollment status updated to ${newStatus}`);
   }
 }

 function initAdminModals() {
   const modals = document.querySelectorAll('.modal');
   modals.forEach(modal => {
     const closeButtons = modal.querySelectorAll('[data-close]');
     closeButtons.forEach(btn => {
       btn.addEventListener('click', () => {
         modal.close();
       });
     });

     // Close on backdrop click
     modal.addEventListener('click', (e) => {
       if (e.target === modal) {
         modal.close();
       }
     });
   });
 }

 function formatDate(dateString) {
   const date = new Date(dateString);
   return date.toLocaleDateString('en-US', {
     year: 'numeric',
     month: 'short',
     day: 'numeric'
   });
 }

 // Make functions globally available for onclick handlers
 window.viewApplicationDetails = viewApplicationDetails;
 window.viewEnrollmentDetails = viewEnrollmentDetails;
 window.updateApplicationStatus = updateApplicationStatus;
 window.updateEnrollmentStatus = updateEnrollmentStatus;

})();



