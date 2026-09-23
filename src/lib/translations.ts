import type { Locale, Localized } from "@/lib/i18n";

const translations = {
  nav: {
    them: { en: "Home", km: "ទំព័រដើម" },
    about: { en: "About", km: "អំពីសាលា" },
    academics: { en: "Academics", km: "ការសិក្សា" },
    students: { en: "Students", km: "សិស្សានុសិស្ស" },
    teachers: { en: "Teachers", km: "លោកគ្រូ អ្នកគ្រូ" },
    news: { en: "News", km: "ព័ត៌មាន" },
    events: { en: "Events", km: "ព្រឹត្តិការណ៍" },
    gallery: { en: "Gallery", km: "វិចិត្រសាល" },
    contact: { en: "Contact", km: "ទំនាក់ទំនង" },
    results: { en: "Student Results", km: "លទ្ធផលសិក្សា" },
    more: { en: "More", km: "បន្ថែមទៀត" },
  },
  header: {
    tagline: { en: "Kampong Chhnang, Cambodia", km: "ខេត្តកំពង់ឆ្នាំង ប្រទេសកម្ពុជា" },
    search: { en: "Search", km: "ស្វែងរក" },
    searchPlaceholder: { en: "Search the school...", km: "ស្វែងរកនៅក្នុងសាលា..." },
    noResults: { en: "No results found", km: "មិនមានលទ្ធផលស្វែងរកទេ" },
    openMenu: { en: "Open menu", km: "បើកម៉ឺនុយ" },
    closeMenu: { en: "Close menu", km: "បិទម៉ឺនុយ" },
    resultsTitle: { en: "Search our website", km: "ស្វែងរកគេហទំព័ររបស់យើង" },
  },
  common: {
    readMore: { en: "Read more", km: "អានបន្ថែម" },
    learnMore: { en: "Learn more", km: "ស្វែងយល់បន្ថែម" },
    viewAll: { en: "View all", km: "មើលទាំងអស់" },
    backHome: { en: "Back to Home", km: "ត្រឡប់ទៅទំព័រដើម" },
    notFound: { en: "Page not found", km: "រកមិនឃើញទំព័រ" },
    notFoundDesc: {
      en: "The page you are looking for does not exist or has been moved.",
      km: "ទំព័រដែលអ្នកកំពុងស្វែងរកមិនមាន ឬត្រូវបានផ្លាស់ប្តូរទេ។",
    },
    demo: { en: "Demo data", km: "ទិន្នន័យសម្រាប់បង្ហាញ" },
    viewLocation: { en: "View location", km: "មើលទីតាំង" },
  },
  hero: {
    badge: {
      en: "Ministry of Education, Youth and Sport",
      km: "ក្រសួងអប់រំ យុវជន និងកីឡា",
    },
    subtitle: { en: "Welcome!", km: "សូមស្វាគមន៍!" },
    description: {
      en: "Under the management of the Kampong Tralach District Office of Education, our high school serves students of Kampong Chhnang province with quality general education.",
      km: "ក្រោមការគ្រប់គ្រងរបស់ការិយាល័យអប់រំ យុវជន និងកីឡា ស្រុកកំពង់ត្រឡាច វិទ្យាល័យរបស់យើងផ្តល់សេវាអប់រំទូទៅប្រកបដោយគុណភាពដល់សិស្សានុសិស្សក្នុងខេត្តកំពង់ឆ្នាំង។",
    },
    primaryCta: { en: "Student Results", km: "លទ្ធផលសិក្សា" },
    secondaryCta: { en: "School Services", km: "សេវាសាលារៀន" },
    scroll: { en: "Scroll", km: "រមូរ" },
  },
  stats: {
    title: { en: "Our school in numbers", km: "សាលារបស់យើងជារូបភាព" },
    students: { en: "Students", km: "សិស្សានុសិស្ស" },
    studentsHint: { en: "Grades 7–12", km: "ថ្នាក់ទី ៧–១២" },
    teachers: { en: "Teachers", km: "លោកគ្រូ អ្នកគ្រូ" },
    teachersHint: { en: "Dedicated educators", km: "គ្រូឧទ្ទិសដល់ការអប់រំ" },
    classrooms: { en: "Classrooms", km: "បន្ទប់រៀន" },
    classroomsHint: { en: "Modern learning spaces", km: "បរិការៈសម្រាប់រៀនសូត្រ" },
    location: { en: "Est. 2007", km: "បង្កើតឡើង ឆ្នាំ២០០៧" },
    locationHint: { en: "Kampong Tralach, Kampong Chhnang", km: "ស្រុកកំពង់ត្រឡាច ខេត្តកំពង់ឆ្នាំង" },
  },
  about: {
    eyebrow: { en: "ABOUT OUR SCHOOL", km: "អំពីសាលារបស់យើង" },
    title: { en: "Learning Today. Leading Tomorrow.", km: "រៀនថ្ងៃនេះ ដើម្បីដឹកនាំថ្ងៃស្អែក" },
    description: {
      en: "Hun Sen Kampong Tralach High School is a public higher secondary school serving the students of Kampong Tralach district. We combine academic excellence with strong values, preparing young people to become responsible leaders of our community and nation.",
      km: "វិទ្យាល័យ ហ៊ុន សែន កំពង់ត្រឡាច គឺជាវិទ្យាល័យសាធារណៈ ដែលផ្តល់សេវាអប់រំដល់សិស្សានុសិស្សក្នុងស្រុកកំពង់ត្រឡាច។ សាលារបស់យើងរួមបញ្ចូលគ្នានូវឧត្តមភាពសិក្សា និងតម្លៃរឹងមាំ ដោយរៀបចំយុវជនឱ្យក្លាយជាអ្នកដឹកនាំដែលមានទំនួលខុសត្រូវសម្រាប់សហគមន៍ និងប្រទេសជាតិ។",
    },
    point1: { en: "Academic Excellence", km: "ឧត្តមភាពសិក្សា" },
    point2: { en: "Skilled & Caring Teachers", km: "គ្រូបង្រៀនជំនាញ និងយកចិត្តទុកដាក់" },
    point3: { en: "Modern Learning Facilities", km: "បរិការៈសិក្សាទំនើប" },
    cta: { en: "Discover Our School", km: "ស្វែងយល់ពីសាលារបស់យើង" },
    secondaryLink: { en: "Our academic programs", km: "កម្មវិធីសិក្សារបស់យើង" },
    yearsTitle: { en: "Years of education", km: "ឆ្នាំនៃការអប់រំ" },
    graduatingTitle: { en: "Successful graduates", km: "និស្សិតបញ្ចប់ការសិក្សាជោគជ័យ" },
  },
  features: {
    eyebrow: { en: "WHY CHOOSE US", km: "ហេតុអ្វីជ្រើសរើសយើង" },
    title: { en: "An environment built for growth", km: "បរិយាកាសដែលត្រូវបានកសាងឡើងដើម្បីអភិវឌ្ឍន៍" },
    description: {
      en: "Everything we do is designed to help every student succeed — academically, socially and personally.",
      km: "អ្វីគ្រប់យ៉ាងដែលយើងធ្វើ គឺត្រូវបានរចនាឡើងដើម្បីជួយឱ្យសិស្សម្នាក់ៗជោគជ័យ ទាំងផ្នែកសិក្សា សង្គម និងផ្ទាល់ខ្លួន។",
    },
    item1Title: { en: "Quality Education", km: "ការអប់រំមានគុណភាព" },
    item1Desc: {
      en: "A strong national curriculum delivered by professional teachers in every subject.",
      km: "កម្មវិធីសិក្សាជាតិរឹងមាំ បង្រៀនដោយគ្រូជំនាញគ្រប់មុខវិជ្ជា។",
    },
    item2Title: { en: "Modern Facilities", km: "បរិការៈទំនើប" },
    item2Desc: {
      en: "Libraries, computer rooms and science laboratories to support hands-on learning.",
      km: "បណ្ណាល័យ បន្ទប់កុំព្យូទ័រ និងមន្ទីរពិសោធន៍វិទ្យាសាស្ត្រ ដើម្បីគាំទ្រការរៀនតាមបទពិសោធន៍ជាក់ស្តែង។",
    },
    item3Title: { en: "Sports & Clubs", km: "កីឡា និងក្លឹប" },
    item3Desc: {
      en: "Football, volleyball and youth clubs that help students grow beyond the classroom.",
      km: "បាល់ទាត់ បាល់ទះ និងក្លឹបយុវជន ដែលជួយសិស្សឱ្យអភិវឌ្ឍលើសពីការរៀនក្នុងថ្នាក់។",
    },
    item4Title: { en: "Safe Environment", km: "បរិយាកាសសុវត្ថិភាព" },
    item4Desc: {
      en: "A respectful and supportive school culture where every student feels valued.",
      km: "វប្បធម៌សាលាដែលមានការគោរព និងគាំទ្រគ្នាទៅវិញទៅមក ដែលសិស្សគ្រប់រូបមានអារម្មណ៍ថាខ្លួនមានតម្លៃ។",
    },
  },
  academics: {
    eyebrow: { en: "ACADEMIC PROGRAMS", km: "កម្មវិធីសិក្សា" },
    title: { en: "Explore Our Academic Programs", km: "ស្វែងយល់អំពីកម្មវិធីសិក្សារបស់យើង" },
    description: {
      en: "From Grade 7 to Grade 12, we prepare students for the national examinations and for life beyond school.",
      km: "ចាប់ពីថ្នាក់ទី ៧ ដល់ថ្នាក់ទី ១២ យើងរៀបចំសិស្សានុសិស្សសម្រាប់ការប្រឡងជាតិ និងជីវិតក្រោយការរៀន។",
    },
    grade7: { en: "Grade 7", km: "ថ្នាក់ទី ៧" },
    grade8: { en: "Grade 8", km: "ថ្នាក់ទី ៨" },
    grade9: { en: "Grade 9", km: "ថ្នាក់ទី ៩" },
    grade10: { en: "Grade 10", km: "ថ្នាក់ទី ១០" },
    grade11: { en: "Grade 11", km: "ថ្នាក់ទី ១១" },
    grade12: { en: "Grade 12", km: "ថ្នាក់ទី ១២" },
    viewProgram: { en: "View program", km: "មើលកម្មវិធី" },
  },
  results: {
    eyebrow: { en: "ACHIEVEMENTS", km: "សមិទ្ធផល" },
    title: { en: "Student Results", km: "លទ្ធផលសិក្សារបស់សិស្ស" },
    description: {
      en: "Search student results securely by academic year, evaluation period, student ID and date of birth.",
      km: "ស្វែងរកលទ្ធផលសិក្សារបស់សិស្ស ដោយសុវត្ថិភាពខ្ពស់ តាមឆ្នាំសិក្សា ការវាយតម្លៃ អត្តលេខសិស្ស និងថ្ងៃខែឆ្នាំកំណើត។",
    },
    systemName: {
      en: "Student Result Search System (High Security)",
      km: "ប្រព័ន្ធស្វែងរកលទ្ធផលសិក្សាសិស្ស (សុវត្ថិភាពខ្ពស់)",
    },
    academicYear: { en: "Academic Year", km: "ឆ្នាំសិក្សា" },
    evaluation: { en: "Evaluation", km: "ការវាយតម្លៃ" },
    grade: { en: "Grade", km: "ថ្នាក់" },
    className: { en: "Class", km: "ថ្នាក់រៀន" },
    search: { en: "Search", km: "ស្វែងរក" },
    searchStudent: { en: "Student ID (e.g. 4240000012)", km: "អត្តលេខសិស្ស (ឧ. 4240000012)" },
    dob: { en: "Date of Birth", km: "ថ្ងៃខែឆ្នាំកំណើត" },
    dobDay: { en: "Day", km: "ថ្ងៃ" },
    dobMonth: { en: "Month", km: "ខែ" },
    dobYear: { en: "Year", km: "ឆ្នាំ" },
    captcha: { en: "Verification", km: "ផ្ទៀងផ្ទាត់" },
    captchaAnswer: { en: "Type your answer here...", km: "វាយចម្លើយទីនេះ..." },
    studentName: { en: "Student Name", km: "ឈ្មោះសិស្ស" },
    mathematics: { en: "Mathematics", km: "គណិតវិទ្យា" },
    khmer: { en: "Khmer", km: "ភាសាខ្មែរ" },
    english: { en: "English", km: "ភាសាអង់គ្លេស" },
    science: { en: "Science", km: "វិទ្យាសាស្ត្រ" },
    average: { en: "Average", km: "មធ្យមភាគ" },
    noResults: { en: "No students match your search.", km: "មិនមានសិស្សដែលត្រូវនឹងការស្វែងរកទេ។" },
    demoNotice: {
      en: "This is a static preview of the official result search system. Results are published by the school office each month.",
      km: "នេះជាការបង្ហាញពីប្រព័ន្ធស្វែងរកលទ្ធផលផ្លូវការ។ លទ្ធផលត្រូវបានផ្សព្វផ្សាយដោយការិយាល័យសាលារៀងរាល់ខែ។",
    },
  },
  news: {
    eyebrow: { en: "NEWSROOM", km: "ផ្នែកព័ត៌មាន" },
    title: { en: "Latest News", km: "ព័ត៌មានថ្មីៗ" },
    description: {
      en: "Stay up to date with the latest happenings at our school.",
      km: "តាមដានព័ត៌មានថ្មីៗនៅក្នុងសាលារបស់យើង។",
    },
    featured: { en: "Featured story", km: "អត្ថបទសំខាន់" },
    allNews: { en: "All news", km: "ព័ត៌មានទាំងអស់" },
    moreNews: { en: "More news", km: "ព័ត៌មានបន្ថែម" },
    backToNews: { en: "Back to News", km: "ត្រឡប់ទៅព័ត៌មាន" },
    empty: { en: "No news articles found.", km: "គ្មានអត្ថបទព័ត៌មានទេ។" },
  },
  events: {
    eyebrow: { en: "CALENDAR", km: "ប្រតិទិន" },
    title: { en: "Upcoming Events", km: "ព្រឹត្តិការណ៍នាពេលខាងមុខ" },
    description: {
      en: "Join us at our school events throughout the year.",
      km: "សូមចូលរួមជាមួយយើងនៅក្នុងព្រឹត្តិការណ៍របស់សាលាពេញមួយឆ្នាំសិក្សា។",
    },
    date: { en: "Date", km: "កាលបរិច្ឆេទ" },
    time: { en: "Time", km: "ម៉ោង" },
    locationLabel: { en: "Location", km: "ទីតាំង" },
    allEvents: { en: "All events", km: "ព្រឹត្តិការណ៍ទាំងអស់" },
    backToEvents: { en: "Back to Events", km: "ត្រឡប់ទៅព្រឹត្តិការណ៍" },
  },
  teachers: {
    eyebrow: { en: "OUR TEAM", km: "ក្រុមការងារ" },
    title: { en: "Meet Our Teachers", km: "ស្គាល់លោកគ្រូ អ្នកគ្រូរបស់យើង" },
    description: {
      en: "A team of committed educators who guide and inspire our students every day.",
      km: "ក្រុមគ្រូបង្រៀនដែលលះបង់ និងណែនាំសិស្សានុសិស្សរបស់យើង ក៏ដូចជាបំផុសគំនិតរៀងរាល់ថ្ងៃ។",
    },
    subject: { en: "Subject", km: "មុខវិជ្ជា" },
    position: { en: "Position", km: "តួនាទី" },
    allTeachers: { en: "All teachers", km: "គ្រូទាំងអស់" },
    director: { en: "School Director", km: "នាយកសាលា" },
    viceDirector: { en: "Vice Director", km: "នាយករង" },
  },
  studentLife: {
    eyebrow: { en: "STUDENT LIFE", km: "ជីវិតសិស្ស" },
    title: { en: "More Than a Classroom", km: "លើសពីការរៀនក្នុងថ្នាក់" },
    description: {
      en: "Our students grow through sports, clubs, culture and leadership.",
      km: "សិស្សានុសិស្សរបស់យើងលូតលាស់តាមរយៈកីឡា ក្លឹប វប្បធម៌ និងភាពជាអ្នកដឹកនាំ។",
    },
    sports: { en: "Sports", km: "កីឡា" },
    clubs: { en: "Clubs", km: "ក្លឹប" },
    cultural: { en: "Cultural Activities", km: "សកម្មភាពវប្បធម៌" },
    academic: { en: "Academic Activities", km: "សកម្មភាពសិក្សា" },
    community: { en: "Community Activities", km: "សកម្មភាពសហគមន៍" },
    leadership: { en: "Leadership", km: "ភាពជាអ្នកដឹកនាំ" },
  },
  gallery: {
    eyebrow: { en: "GALLERY", km: "វិចិត្រសាល" },
    title: { en: "Life at Hun Sen Kampong Tralach", km: "ជីវិតនៅវិទ្យាល័យ ហ៊ុន សែន កំពង់ត្រឡាច" },
    description: {
      en: "A look inside our classrooms, campus and community.",
      km: "ទស្សនារូបភាពក្នុងថ្នាក់រៀន បរិវេណសាលា និងសហគមន៍។",
    },
    all: { en: "All", km: "ទាំងអស់" },
    campus: { en: "Campus", km: "បរិវេណសាលា" },
    students: { en: "Students", km: "សិស្សានុសិស្ស" },
    events: { en: "Events", km: "ព្រឹត្តិការណ៍" },
    sports: { en: "Sports", km: "កីឡា" },
    activities: { en: "Activities", km: "សកម្មភាព" },
    close: { en: "Close", km: "បិទ" },
    prev: { en: "Previous", km: "មុន" },
    next: { en: "Next", km: "បន្ទាប់" },
    of: { en: "of", km: "ក្នុងចំណោម" },
    empty: { en: "No photos in this category yet.", km: "មិនទាន់មានរូបថតក្នុងប្រភេទនេះទេ។" },
  },
  campus: {
    eyebrow: { en: "OUR CAMPUS", km: "បរិវេណសាលារបស់យើង" },
    title: { en: "Our School", km: "សាលារបស់យើង" },
    description: {
      en: "Purpose-built facilities that give our students the best chance to learn and grow.",
      km: "បរិការៈដែលត្រូវបានកសាងឡើងដើម្បីផ្តល់ឱកាសល្អបំផុតដល់សិស្សានុសិស្សក្នុងការរៀនសូត្រ និងអភិវឌ្ឍខ្លួន។",
    },
    classrooms: { en: "Classrooms", km: "បន្ទប់រៀន" },
    library: { en: "Library", km: "បណ្ណាល័យ" },
    computerRoom: { en: "Computer Room", km: "បន្ទប់កុំព្យូទ័រ" },
    scienceFacilities: { en: "Science Facilities", km: "បន្ទប់ពិសោធន៍វិទ្យាសាស្ត្រ" },
    sportsArea: { en: "Sports Area", km: "ទីលានកីឡា" },
    studentAreas: { en: "Student Areas", km: "តំបន់សិស្សានុសិស្ស" },
  },
  location: {
    eyebrow: { en: "LOCATION", km: "ទីតាំង" },
    title: { en: "Find Our School", km: "ស្វែងរកទីតាំងសាលា" },
    description: {
      en: "We are located in the heart of Kampong Tralach district, easy to reach for families across the province.",
      km: "យើងមានទីតាំងស្ថិតនៅកណ្តាលស្រុកកំពង់ត្រឡាច ងាយស្រួលទៅដល់សម្រាប់ក្រុមគ្រួសារទូទាំងខេត្ត។",
    },
    district: { en: "Kampong Tralach District", km: "ស្រុកកំពង់ត្រឡាច" },
    province: { en: "Kampong Chhnang Province", km: "ខេត្តកំពង់ឆ្នាំង" },
    country: { en: "Cambodia", km: "ប្រទេសកម្ពុជា" },
    openMaps: { en: "Open in Google Maps", km: "បើកក្នុង Google Maps" },
    getDirections: { en: "Get directions", km: "ទទួលបានទិសដៅ" },
  },
  contact: {
    eyebrow: { en: "CONTACT", km: "ទំនាក់ទំនង" },
    title: { en: "Get in Touch", km: "ទំនាក់ទំនងមកកាន់យើង" },
    description: {
      en: "Have a question? Send us a message and our team will get back to you.",
      km: "មានសំណួរមែនទេ? សូមផ្ញើសារមកកាន់យើង ហើយក្រុមការងារនឹងឆ្លើយតបទៅអ្នកវិញ។",
    },
    name: { en: "Name", km: "ឈ្មោះ" },
    namePlaceholder: { en: "Your full name", km: "ឈ្មោះពេញរបស់អ្នក" },
    email: { en: "Email", km: "អ៊ីមែល" },
    emailPlaceholder: { en: "you@example.com", km: "you@example.com" },
    phone: { en: "Phone", km: "លេខទូរស័ព្ទ" },
    phonePlaceholder: { en: "+855 00 000 000", km: "+855 00 000 000" },
    message: { en: "Message", km: "សារ" },
    messagePlaceholder: { en: "Write your message here...", km: "សូមសរសេរសាររបស់អ្នកនៅទីនេះ..." },
    send: { en: "Send Message", km: "ផ្ញើសារ" },
    successTitle: { en: "Message received", km: "បានទទួលសារ" },
    successDesc: {
      en: "Thank you for contacting us. Our office will reach out to you soon.",
      km: "សូមអរគុណដែលបានទាក់ទងមកយើង។ ការិយាល័យសាលានឹងឆ្លើយតបមកអ្នកឆាប់ៗ។",
    },
    sendAnother: { en: "Send another message", km: "ផ្ញើសារម្តងទៀត" },
    emailUs: { en: "Email us", km: "អ៊ីមែលមកយើង" },
    callUs: { en: "Call us", km: "ទូរស័ព្ទមកយើង" },
    visitUs: { en: "Visit us", km: "មកទស្សនា" },
    pmToSchool: { en: "School office hours", km: "ម៉ោងការិយាល័យសាលា" },
    officeHours: {
      en: "Mon – Sat: 7:00–11:00 AM & 1:00–5:00 PM",
      km: "ចន្ទ – សៅរ៍៖ ០៧:០០ – ១១:០០ និង ១៣:០០ – ១៧:០០",
    },
  },
  cta: {
    title: { en: "Ready to be part of our school?", km: "រួចរាល់ដើម្បីក្លាយជាផ្នែកមួយនៃសាលារបស់យើង?" },
    description: {
      en: "Enrollment for the new academic year is open. Contact our office to learn how to join.",
      km: "ការចុះឈ្មោះចូលរៀនសម្រាប់ឆ្នាំសិក្សាថ្មី បានបើកហើយ។ សូមទាក់ទងការិយាល័យសាលាដើម្បីស្វែងយល់ពីរបៀបចូលរៀន។",
    },
    primaryCta: { en: "Contact Our Office", km: "ទាក់ទងការិយាល័យសាលា" },
    secondaryCta: { en: "Explore Academics", km: "ស្វែងយល់ពីការសិក្សា" },
  },
  footer: {
    aboutText: {
      en: "A public high school in Kampong Tralach district, Kampong Chhnang province, committed to academic excellence and the development of future leaders.",
      km: "វិទ្យាល័យសាធារណៈ ស្ថិតនៅស្រុកកំពង់ត្រឡាច ខេត្តកំពង់ឆ្នាំង ប្តេជ្ញាចិត្តចំពោះឧត្តមភាពសិក្សា និងការអភិវឌ្ឍអ្នកដឹកនាំអនាគត។",
    },
    explore: { en: "Explore", km: "ស្វែងយល់" },
    resources: { en: "Resources", km: "ធនធាន" },
    contactCol: { en: "Contact", km: "ទំនាក់ទំនង" },
    management: { en: "School Leadership", km: "គណៈគ្រប់គ្រងសាលា" },
    hoursTitle: { en: "Office Hours", km: "ម៉ោងធ្វើការ" },
    daysShort: { en: "Open:", km: "បើក៖" },
    morning: { en: "Morning", km: "ព្រឹក" },
    afternoon: { en: "Afternoon", km: "រសៀល" },
    results: { en: "Student Results", km: "លទ្ធផលសិក្សា" },
    downloads: { en: "Downloads", km: "ឯកសារទាញយក" },
    bac2: { en: "Baccalaureate Standards", km: "ស្តង់ដារបាក់ឌុប" },
    facebook: { en: "Facebook", km: "ហ្វេសប៊ុក" },
    youtube: { en: "YouTube", km: "យូធូប" },
    telegram: { en: "Telegram", km: "តេឡេក្រាម" },
    rights: {
      en: "All rights reserved.",
      km: "រក្សាសិទ្ធិគ្រប់យ៉ាង។",
    },
    credits: {
      en: "Prepared by Ear Sokchan.",
      km: "រៀបចំដោយ អៀ សុខចាន់។",
    },
    motto: {
      en: "Building Knowledge. Inspiring the Future.",
      km: "កសាងចំណេះដឹង បំផុសគំនិតសម្រាប់អនាគត",
    },
  },
  pages: {
    aboutTitle: { en: "About Our School", km: "អំពីសាលារបស់យើង" },
    academicsTitle: { en: "Academic Programs", km: "កម្មវិធីសិក្សា" },
    studentsTitle: { en: "Student Life", km: "ជីវិតសិស្ស" },
    teachersTitle: { en: "Our Teachers", km: "លោកគ្រូ អ្នកគ្រូរបស់យើង" },
    newsTitle: { en: "News", km: "ព័ត៌មាន" },
    eventsTitle: { en: "Events", km: "ព្រឹត្តិការណ៍" },
    galleryTitle: { en: "Gallery", km: "វិចិត្រសាល" },
    contactTitle: { en: "Contact", km: "ទំនាក់ទំនង" },
    resultsTitle: { en: "Student Results", km: "លទ្ធផលសិក្សា" },
    breadcrumbHome: { en: "Home", km: "ទំព័រដើម" },
  },
} as const;

type NestedLocalized = {
  [key: string]: Localized | NestedLocalized;
};

function resolvePath(obj: NestedLocalized, path: string): Localized | null {
  const parts = path.split(".");
  let current: NestedLocalized | Localized = obj;
  for (const part of parts) {
    if (typeof current === "object" && part in current) {
      current = (current as NestedLocalized)[part];
    } else {
      return null;
    }
  }
  if (current && typeof current === "object" && "en" in current && "km" in current) {
    return current as Localized;
  }
  return null;
}

function buildT(locale: Locale) {
  return (key: string): string => {
    const item = resolvePath(translations as unknown as NestedLocalized, key);
    return item ? item[locale] : key;
  };
}

export type TFunction = ReturnType<typeof buildT>;

export function getTranslations(locale: Locale) {
  const t = buildT(locale);
  return {
    t,
    nav: translations.nav,
    pick: <L extends Localized>(value: L) => value[locale],
  };
}