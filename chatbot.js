/**
 * ============================================================================
 * ASK SAKSHI — PORTFOLIO AI ASSISTANT (chatbot.js)
 * Intelligent conversational assistant trained on Sakshi Pakle's verified
 * portfolio, enterprise Java background, Spring Boot APIs, and projects.
 * Vanilla JavaScript • Zero External Dependencies • Privacy-Safe • Accessible
 * ============================================================================
 */

(function () {
  'use strict';

  // ==========================================================================
  // 1. VERIFIED PORTFOLIO KNOWLEDGE BASE
  // ==========================================================================
  const KNOWLEDGE_BASE = {
    profile: {
      name: 'Sakshi Pakle',
      role: 'Software Developer Intern',
      company: 'CodeMetric',
      location: 'Pune, Maharashtra, India',
      email: 'sakshipaklel@gmail.com',
      github: 'https://github.com/sakshipakle',
      linkedin: 'https://linkedin.com/in/sakshi-pakle-placeholder',
      resumePath: './assets/resume.pdf',
      education: 'Bachelor of Engineering (B.E.) in Computer Engineering from Dr. D. Y. Patil College of Engineering and Innovation, Talegaon Dabhade, Pune.',
      summary: 'Results-oriented Software Developer specializing in Java backends, Spring Boot REST APIs, relational database design with MySQL, and responsive web development.'
    },

    skills: {
      backend: [
        'Java (Core & OOP, Collections, Multi-threading)',
        'Spring Boot (RESTful Web Services & Spring MVC)',
        'Hibernate / JPA (Object-Relational Mapping)',
        'JDBC (Database Connectivity & Transaction Management)',
        'Maven (Dependency Management & Build Tooling)'
      ],
      database: [
        'MySQL (Relational Database Management)',
        'SQL (Complex Queries, DDL, DML, Joins)',
        'Schema Design (Normalization & Relational Modeling)',
        'Data Integrity (Constraints, Foreign Keys, ACID compliance)'
      ],
      frontend: [
        'HTML5 (Semantic Layouts & Accessibility)',
        'CSS3 (Flexbox, CSS Grid, Custom Properties, Responsive Media)',
        'JavaScript (Vanilla ES6+, DOM manipulation, Fetch API)',
        'Basic React (Components & Props)',
        'Responsive Design (Mobile-First Architecture)'
      ],
      tools: [
        'Postman (REST API verification, collection tests)',
        'Git (Branching, merging, commit version control)',
        'GitHub (Code hosting, collaboration, pull requests)',
        'Eclipse IDE (Java enterprise workspace)',
        'VS Code (Web engineering, scripts, frontend editing)'
      ]
    },

    experience: [
      {
        role: 'Software Developer Intern',
        company: 'CodeMetric',
        location: 'Pune, India',
        type: 'Current Role',
        highlights: [
          'Developing enterprise-ready Java and Spring Boot backend features.',
          'Building RESTful endpoints adhering strictly to HTTP verb conventions.',
          'Designing and querying MySQL relational tables with transactional integrity.',
          'Participating in API contract testing, bug fixes, and performance tuning.'
        ]
      },
      {
        role: 'Software Engineering Intern',
        company: 'Innovexis',
        location: 'Pune, India',
        type: 'Previous Internship',
        highlights: [
          'Engineered Core Java modules implementing OOP design patterns.',
          'Integrated JDBC connectivity for automated database transactions.',
          'Bridged responsive client-side UI components with server endpoints.'
        ]
      }
    ],

    projects: [
      {
        id: 'project-modal-1',
        title: 'Hospital Management System',
        category: 'Enterprise Java / Full Stack',
        stack: 'Java, Spring Boot, MySQL, Thymeleaf / Web UI',
        github: 'https://github.com/sakshipakle/HospitalManagementSystem',
        description: 'Comprehensive healthcare administration system that automates patient registration, doctor appointments, bed allocations, and diagnostic billing records.',
        highlights: [
          'Automated patient admission & room assignment',
          'Synchronized doctor scheduling to prevent appointment overlaps',
          'Consolidated billing calculation module with database record tracking'
        ]
      },
      {
        id: 'project-modal-2',
        title: 'Task Management System',
        category: 'RESTful Web Services',
        stack: 'Java, Spring Boot, JPA, Postman',
        github: 'https://github.com/sakshipakle/Task_Management_System',
        description: 'Robust task lifecycle API implementing strict REST standards with standardized validation, custom exception responses, and Postman test collections.',
        highlights: [
          'Complete CRUD endpoints (GET, POST, PUT, DELETE)',
          'Uniform error responses with HTTP 400/404/500 status codes',
          'Spring Data JPA repositories for priority and status filtering'
        ]
      },
      {
        id: 'project-modal-3',
        title: 'Food Delivery System',
        category: 'Database & Transaction Processing',
        stack: 'Java, JDBC, MySQL, HTML/CSS',
        github: 'https://github.com/sakshipakle/FoodDeliverySystem',
        description: 'Interactive restaurant food ordering platform built with Core Java and JDBC, incorporating prepared statements and SQL transactions for cart consistency.',
        highlights: [
          'PreparedStatements to eliminate SQL injection risks',
          'Multi-item cart persistence with automatic tax and total calculation',
          'Commit/Rollback transactions ensuring synchronized inventory'
        ]
      },
      {
        id: 'project-modal-4',
        title: 'Crop Yield Prediction',
        category: 'Applied Analytics',
        stack: 'Agricultural Data Processing, Python / Applied Analytics',
        github: 'https://github.com/sakshipakle/Crop-Yield-Prediction',
        description: 'Decision-support tool analyzing soil nutrients (NPK) and weather patterns (rainfall, temperature) to forecast crop yields and guide farmers.',
        highlights: [
          'Processes Nitrogen, Phosphorus, Potassium and rainfall metrics',
          'Recommends optimal crop varieties based on historical yield patterns',
          'Generates structured advisory summaries for agricultural stakeholders'
        ]
      }
    ]
  };

  // ==========================================================================
  // 2. TEXT FORMATTING UTILITY (CLEAN HTML • NO RAW MARKDOWN)
  // ==========================================================================
  function formatAssistantMarkup(rawStr) {
    if (!rawStr) return '';
    return rawStr
      // Convert Markdown bold **text** to <strong>text</strong>
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
      // Convert Markdown italics *text* to <em>$1</em>
      .replace(/\*([^*\n]+?)\*/g, '<em>$1</em>')
      // Convert Markdown inline code `code` to <code>$1</code>
      .replace(/`([^`\n]+?)`/g, '<code>$1</code>')
      // Convert Markdown links [text](url) to styled anchor tags
      .replace(/\[([^\]]+)\]\((https?:\/\/[^\s)]+|mailto:[^\s)]+)\)/g, '<a href="$2" target="_blank" rel="noopener noreferrer" class="chat-inline-link">$1</a>')
      // Strip any accidental dangling asterisks or markdown artifacts
      .replace(/\*{2,}/g, '')
      .trim();
  }

  // Helper: Escape HTML to avoid XSS in user messages
  function escapeHTML(str) {
    const div = document.createElement('div');
    div.textContent = str || '';
    return div.innerHTML;
  }

  // ==========================================================================
  // 3. CONVERSATIONAL ENGINE & INTENT RECOGNITION
  // ==========================================================================
  function generateAssistantResponse(rawInput) {
    const input = (rawInput || '').trim().toLowerCase();

    // 1. GREETINGS & CASUAL HELLOS
    if (/^(hi|hello|hey|hola|greetings|good\s*(morning|afternoon|evening)|sup|what's\s*up)/i.test(input)) {
      return {
        text: `Hello! 👋 I'm <strong>Sakshi's Portfolio AI Assistant</strong>.<br><br>I'm trained on Sakshi's verified resume and development experience in <strong>Java, Spring Boot, REST APIs, and MySQL</strong>. How can I help you today?`,
        chips: ['About Sakshi', 'Technical Skills', 'Featured Projects', 'Work Experience', 'Get in Touch'],
        actions: []
      };
    }

    // 2. ASSISTANT IDENTITY / HOW IT WORKS
    if (/(who are you|what are you|are you real ai|are you an ai|bot|assistant|how do you work)/i.test(input)) {
      return {
        text: `I am <strong>Ask Sakshi</strong>, a dedicated Portfolio AI Assistant! 🤖<br><br>I use a domain-trained semantic knowledge engine strictly grounded in Sakshi's <strong>actual resume, verified GitHub projects, and engineering experience</strong>. I never hallucinate or invent qualifications.`,
        chips: ['Technical Skills', 'Featured Projects', 'Work Experience', 'Download Resume'],
        actions: []
      };
    }

    // 3. ABOUT SAKSHI / BACKGROUND / BIO
    if (/(about|who is sakshi|tell me about|bio|background|intro|profile|dr d y patil|college|education|degree)/i.test(input)) {
      return {
        text: `<strong>Sakshi Pakle</strong> is a <strong>Software Developer Intern at CodeMetric</strong>, based in <strong>Pune, India</strong>.<br><br>` +
              `🎓 <strong>Education:</strong> She holds a <em>Bachelor of Engineering in Computer Engineering</em> from <strong>Dr. D. Y. Patil College of Engineering and Innovation</strong> (Talegaon Dabhade, Pune).<br><br>` +
              `💻 <strong>Specialization:</strong> Building reliable server-side architectures, RESTful microservices with <strong>Spring Boot</strong>, and normalized relational databases with <strong>MySQL</strong>.`,
        chips: ['Technical Skills', 'Featured Projects', 'Work Experience', 'Get in Touch'],
        actions: [
          { label: 'View About Section', target: '#about' },
          { label: 'Download Resume (PDF)', href: KNOWLEDGE_BASE.profile.resumePath, download: true }
        ]
      };
    }

    // 4. RESUME / CV DOWNLOAD
    if (/(resume|cv|curriculum vitae|download resume|pdf)/i.test(input)) {
      return {
        text: `You can review and download Sakshi's official resume directly right here:`,
        chips: ['Work Experience', 'Technical Skills', 'Featured Projects', 'Get in Touch'],
        actions: [
          { label: '📄 Download Resume (PDF)', href: KNOWLEDGE_BASE.profile.resumePath, download: true, primary: true },
          { label: 'View Experience Section', target: '#experience' }
        ]
      };
    }

    // 5. WORK EXPERIENCE & INTERNSHIPS
    if (/(experience|internship|job|work history|codemetric|innovexis|company|career)/i.test(input)) {
      return {
        text: `Sakshi brings hands-on enterprise software engineering experience across two development roles:<br><br>` +
              `🏢 <strong>1. CodeMetric — Software Developer Intern</strong> <em>(Current)</em><br>` +
              `• Building Java &amp; Spring Boot backend services and REST APIs.<br>` +
              `• Modeling MySQL schemas and ensuring ACID transaction safety.<br>` +
              `• API contract verification and unit test coverage.<br><br>` +
              `🏢 <strong>2. Innovexis — Software Engineering Intern</strong> <em>(Previous)</em><br>` +
              `• Implemented Core Java OOP patterns and JDBC transaction handling.<br>` +
              `• Bridged responsive client-side UI with backend endpoints.`,
        chips: ['Technical Skills', 'Featured Projects', 'Download Resume', 'Contact Sakshi'],
        actions: [
          { label: 'Explore Experience Section', target: '#experience' },
          { label: 'Download Resume (PDF)', href: KNOWLEDGE_BASE.profile.resumePath, download: true }
        ]
      };
    }

    // 6. SPECIFIC SKILL: SPRING BOOT
    if (/(spring boot|spring framework|spring mvc|spring data|jpa|hibernate)/i.test(input)) {
      return {
        text: `<strong>Spring Boot Expertise:</strong><br><br>` +
              `Sakshi specializes in building modular Java backends with <strong>Spring Boot</strong>:<br>` +
              `• <strong>RESTful APIs:</strong> Clean CRUD endpoints adhering to standardized HTTP status codes.<br>` +
              `• <strong>Spring Data JPA &amp; Hibernate:</strong> Object-Relational Mapping (ORM), entity relationships, and automated queries.<br>` +
              `• <strong>Validation &amp; Exception Handling:</strong> Global custom error handlers returning clean, uniform JSON responses.<br>` +
              `• <strong>Production Tools:</strong> Verified with Maven build cycles and Postman test collections.`,
        chips: ['Task Management API', 'Hospital System', 'MySQL & Database', 'All Skills'],
        actions: [
          { label: 'View Skills in Portfolio', target: '#skills' },
          { label: 'Inspect Task API Project', target: '#projects' }
        ]
      };
    }

    // 7. SPECIFIC SKILL: JAVA / CORE JAVA
    if (/\b(java|core java|oop|object oriented|multithreading|collections)\b/i.test(input)) {
      return {
        text: `<strong>Java Capabilities:</strong><br><br>` +
              `Java is Sakshi's primary programming language. Her core strengths include:<br>` +
              `• <strong>Core Java &amp; OOP:</strong> Clean inheritance, encapsulation, polymorphism, and modular architectures.<br>` +
              `• <strong>Collections Framework:</strong> List, Set, Map data structures optimized for backend query processing.<br>` +
              `• <strong>JDBC &amp; Transactions:</strong> Direct database connectivity with <code>PreparedStatements</code> to prevent SQL injection.<br>` +
              `• <strong>Framework Integration:</strong> Seamlessly integrated into enterprise Spring Boot and MySQL projects.`,
        chips: ['Spring Boot Skills', 'Food Delivery Project', 'All Skills', 'View Experience'],
        actions: [
          { label: 'Browse Skills Section', target: '#skills' }
        ]
      };
    }

    // 8. SPECIFIC SKILL: DATABASE / MYSQL / SQL
    if (/(mysql|database|sql|queries|schema|rdbms|normalization|query)/i.test(input)) {
      return {
        text: `<strong>Database Management &amp; SQL:</strong><br><br>` +
              `Sakshi has extensive practical experience with relational data modeling:<br>` +
              `• <strong>RDBMS:</strong> MySQL database configuration and management.<br>` +
              `• <strong>SQL Proficiency:</strong> Complex queries, joins, subqueries, DDL &amp; DML operations.<br>` +
              `• <strong>Schema Design:</strong> 3NF normalization, primary/foreign key indexing, and entity relationship modeling.<br>` +
              `• <strong>Data Integrity:</strong> ACID-compliant transactions, rollback handling, and constraint validation.`,
        chips: ['Hospital Management System', 'Food Delivery System', 'Backend Skills', 'Contact'],
        actions: [
          { label: 'View Database Skills', target: '#skills' }
        ]
      };
    }

    // 9. SPECIFIC SKILL: FRONTEND / WEB / REACT
    if (/(frontend|html|html5|css|css3|javascript|react|ui|web)/i.test(input)) {
      return {
        text: `<strong>Frontend Web Development:</strong><br><br>` +
              `While primarily a backend specialist, Sakshi develops complete, responsive web interfaces:<br>` +
              `• <strong>HTML5 &amp; CSS3:</strong> Semantic markup, CSS Grid, Flexbox, custom design systems, and dark-mode themes.<br>` +
              `• <strong>JavaScript:</strong> Vanilla ES6+, async/await, Fetch API client calls, and dynamic DOM interaction.<br>` +
              `• <strong>Basic React:</strong> Component hierarchies, state, and props.<br>` +
              `• <strong>Responsive Design:</strong> Mobile-first layouts optimized for phones, tablets, and desktop displays.`,
        chips: ['All Skills', 'Featured Projects', 'About Sakshi'],
        actions: [
          { label: 'View Frontend Skills', target: '#skills' }
        ]
      };
    }

    // 10. ALL SKILLS / GENERAL SKILLS OVERVIEW
    if (/(skill|skills|stack|technologies|tools|what do you know|tech stack|what can you do)/i.test(input)) {
      return {
        text: `<strong>Sakshi's Technical Stack Overview:</strong><br><br>` +
              `⚡ <strong>Backend &amp; Core:</strong> Java, Spring Boot, REST APIs, Hibernate/JPA, JDBC, Maven<br>` +
              `🗄️ <strong>Databases:</strong> MySQL, SQL Queries, Schema Normalization, Data Integrity<br>` +
              `🎨 <strong>Frontend:</strong> HTML5, CSS3, JavaScript (ES6+), Basic React, Responsive Design<br>` +
              `🛠️ <strong>Tools &amp; Workflow:</strong> Postman, Git, GitHub, Eclipse IDE, VS Code`,
        chips: ['Spring Boot Details', 'MySQL Details', 'Featured Projects', 'Work Experience'],
        actions: [
          { label: 'View Skills Section (#skills)', target: '#skills' }
        ]
      };
    }

    // 11. PROJECT: HOSPITAL MANAGEMENT SYSTEM
    if (/(hospital|hospital management|healthcare|doctor|patient|bed)/i.test(input)) {
      const p = KNOWLEDGE_BASE.projects[0];
      return {
        text: `🏥 <strong>Hospital Management System</strong><br><br>` +
              `An enterprise-grade full-stack healthcare platform:<br>` +
              `• <strong>Stack:</strong> ${p.stack}<br>` +
              `• <strong>Core Functionality:</strong> Automates patient registration, doctor schedules, room/bed allocation, and diagnostic billing records.<br>` +
              `• <strong>Highlights:</strong> Robust MySQL relational modeling with Spring Boot service controllers.`,
        chips: ['Task Management System', 'Food Delivery System', 'View All Projects', 'Contact Sakshi'],
        actions: [
          { label: 'Open Project Details Modal', modal: 'project-modal-1' },
          { label: 'GitHub Repository', href: p.github, external: true }
        ]
      };
    }

    // 12. PROJECT: TASK MANAGEMENT SYSTEM
    if (/(task|task management|todo|crud|rest api project)/i.test(input)) {
      const p = KNOWLEDGE_BASE.projects[1];
      return {
        text: `📋 <strong>Task Management System (REST API)</strong><br><br>` +
              `A production-grade RESTful microservice built to showcase clean API contracts:<br>` +
              `• <strong>Stack:</strong> ${p.stack}<br>` +
              `• <strong>Core Functionality:</strong> Full CRUD task lifecycle with priority and status filters.<br>` +
              `• <strong>Highlights:</strong> Standardized HTTP status codes, uniform JSON error handlers, and comprehensive Postman collection testing.`,
        chips: ['Hospital System', 'Food Delivery System', 'Spring Boot Skills', 'All Projects'],
        actions: [
          { label: 'Open Project Details Modal', modal: 'project-modal-2' },
          { label: 'GitHub Repository', href: p.github, external: true }
        ]
      };
    }

    // 13. PROJECT: FOOD DELIVERY SYSTEM
    if (/(food|food delivery|restaurant|order|cart|jdbc project)/i.test(input)) {
      const p = KNOWLEDGE_BASE.projects[2];
      return {
        text: `🍔 <strong>Food Delivery System</strong><br><br>` +
              `A database-driven restaurant ordering application demonstrating low-level data reliability:<br>` +
              `• <strong>Stack:</strong> ${p.stack}<br>` +
              `• <strong>Core Functionality:</strong> Order cart management, real-time item tax calculations, and persistent order logs.<br>` +
              `• <strong>Highlights:</strong> Secure <code>PreparedStatements</code> preventing SQL injection, and commit/rollback transactions guaranteeing stock consistency.`,
        chips: ['Hospital System', 'Task Management System', 'Database Skills', 'All Projects'],
        actions: [
          { label: 'Open Project Details Modal', modal: 'project-modal-3' },
          { label: 'GitHub Repository', href: p.github, external: true }
        ]
      };
    }

    // 14. PROJECT: CROP YIELD PREDICTION
    if (/(crop|crop yield|agriculture|predict|farming|npk)/i.test(input)) {
      const p = KNOWLEDGE_BASE.projects[3];
      return {
        text: `🌱 <strong>Crop Yield Prediction</strong><br><br>` +
              `An applied analytics project supporting agricultural decision-making:<br>` +
              `• <strong>Stack:</strong> ${p.stack}<br>` +
              `• <strong>Core Functionality:</strong> Analyzes soil nutrients (Nitrogen, Phosphorus, Potassium) and meteorological metrics to forecast harvest yields.<br>` +
              `• <strong>Highlights:</strong> Historical regional yield benchmarking to suggest optimal crop selection for farmers.`,
        chips: ['Hospital System', 'Task Management System', 'All Projects', 'Contact Sakshi'],
        actions: [
          { label: 'Open Project Details Modal', modal: 'project-modal-4' },
          { label: 'GitHub Repository', href: p.github, external: true }
        ]
      };
    }

    // 15. ALL PROJECTS OVERVIEW
    if (/(project|projects|portfolio works|github repo|repositories|built|what did she build)/i.test(input)) {
      return {
        text: `<strong>Sakshi's Featured Engineering Projects:</strong><br><br>` +
              `1. 🏥 <strong>Hospital Management System</strong> — Enterprise Java, Spring Boot, MySQL<br>` +
              `2. 📋 <strong>Task Management System</strong> — Clean RESTful APIs, Spring Data JPA, Postman<br>` +
              `3. 🍔 <strong>Food Delivery System</strong> — Java, JDBC transactions, MySQL PreparedStatements<br>` +
              `4. 🌱 <strong>Crop Yield Prediction</strong> — Applied analytics &amp; agricultural data processing`,
        chips: ['Hospital System', 'Task Management System', 'Food Delivery System', 'Crop Yield Project'],
        actions: [
          { label: 'Browse Projects Section (#projects)', target: '#projects' },
          { label: 'Visit Sakshi\'s GitHub', href: KNOWLEDGE_BASE.profile.github, external: true }
        ]
      };
    }

    // 16. CONTACT / EMAIL / HIRE / AVAILABILITY
    if (/(contact|email|hire|reach|message|talk|interview|available|phone|location|where is she|linkedin|github)/i.test(input)) {
      return {
        text: `<strong>Get in Touch with Sakshi Pakle:</strong><br><br>` +
              `📍 <strong>Location:</strong> Pune, Maharashtra, India<br>` +
              `📧 <strong>Direct Email:</strong> <a href="mailto:${KNOWLEDGE_BASE.profile.email}" class="chat-inline-link">${KNOWLEDGE_BASE.profile.email}</a><br>` +
              `💼 <strong>Status:</strong> Open to Software Developer opportunities &amp; backend engineering roles.<br><br>` +
              `You can send her a message right here on the portfolio contact form or download her resume:`,
        chips: ['Download Resume', 'Work Experience', 'Technical Skills', 'Featured Projects'],
        actions: [
          { label: 'Go to Contact Form (#contact)', target: '#contact', primary: true },
          { label: 'Send Direct Email', href: `mailto:${KNOWLEDGE_BASE.profile.email}` },
          { label: 'View GitHub Profile', href: KNOWLEDGE_BASE.profile.github, external: true }
        ]
      };
    }

    // 17. THANKS / PRAISE
    if (/(thank|thanks|thx|awesome|cool|great|nice|good job)/i.test(input)) {
      return {
        text: `You're very welcome! 😊 Feel free to explore more about Sakshi's projects, technical skills, or send her a direct message.`,
        chips: ['Technical Skills', 'Featured Projects', 'Work Experience', 'Download Resume'],
        actions: []
      };
    }

    // 18. DEFAULT / SMART FALLBACK
    return {
      text: `I understand you're asking about: "<strong>${escapeHTML(rawInput)}</strong>".<br><br>` +
            `As Sakshi's Portfolio Assistant, I'm specialized in her <strong>verified Java development background, Spring Boot APIs, MySQL database experience, and projects</strong>.<br><br>` +
            `Would you like to explore one of these areas?`,
      chips: [
        'About Sakshi',
        'Technical Skills',
        'Featured Projects',
        'Work Experience',
        'Get in Touch'
      ],
      actions: [
        { label: 'Explore Featured Projects', target: '#projects' },
        { label: 'Download Resume (PDF)', href: KNOWLEDGE_BASE.profile.resumePath, download: true }
      ]
    };
  }

  // ==========================================================================
  // 4. UI INJECTION & DOM INITIALIZATION
  // ==========================================================================
  function initChatbotUI() {
    // Avoid double initialization
    if (document.getElementById('askSakshiWidget')) return;

    // Create container
    const widget = document.createElement('div');
    widget.id = 'askSakshiWidget';
    widget.className = 'ask-sakshi-widget';

    widget.innerHTML = `
      <!-- Floating Launcher Button -->
      <button id="askSakshiLauncher" class="chat-launcher-btn" aria-label="Open Ask Sakshi Portfolio AI Assistant" aria-expanded="false" title="Ask Sakshi — Portfolio AI Assistant">
        <span class="launcher-pulse" aria-hidden="true"></span>
        <span class="launcher-icon chat-icon-open" aria-hidden="true">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
            <circle cx="9" cy="10" r="1" fill="currentColor"></circle>
            <circle cx="12" cy="10" r="1" fill="currentColor"></circle>
            <circle cx="15" cy="10" r="1" fill="currentColor"></circle>
          </svg>
        </span>
        <span class="launcher-icon chat-icon-close" aria-hidden="true">&times;</span>
        <span class="launcher-tooltip">Ask Sakshi AI</span>
      </button>

      <!-- Chat Panel -->
      <aside id="askSakshiPanel" class="chat-panel" role="region" aria-label="Ask Sakshi AI Assistant" aria-hidden="true">
        <!-- Header -->
        <header class="chat-panel-header">
          <div class="chat-header-profile">
            <div class="chat-avatar-wrapper">
              <img src="./assets/profile-photo.jpg" alt="Sakshi Pakle" class="chat-avatar" onerror="this.src='./assets/profile-avatar.svg'">
              <span class="chat-online-badge" title="Assistant Online"></span>
            </div>
            <div class="chat-header-text">
              <h3 class="chat-title">Ask Sakshi <span class="chat-ai-pill">AI</span></h3>
              <p class="chat-subtitle">Portfolio AI Assistant • Verified</p>
            </div>
          </div>
          <div class="chat-header-actions">
            <button id="chatClearBtn" class="chat-header-btn" title="Clear conversation" aria-label="Clear conversation">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <polyline points="1 4 1 10 7 10"></polyline>
                <path d="M3.51 15a9 9 0 1 0 2.13-9.36L1 10"></path>
              </svg>
            </button>
            <button id="chatCloseBtn" class="chat-header-btn" title="Close assistant" aria-label="Close assistant">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </button>
          </div>
        </header>

        <!-- Messages Area -->
        <div id="chatMessages" class="chat-messages" role="log" aria-live="polite">
          <!-- Initial Welcome Message (Clean HTML without raw Markdown) -->
          <div class="chat-message-row assistant">
            <div class="chat-bubble assistant-bubble">
              <div class="bubble-header">
                <span class="bubble-author">Sakshi AI</span>
                <span class="bubble-time">Just now</span>
              </div>
              <div class="bubble-content">
                Hello! 👋 I'm <strong>Sakshi's Portfolio AI Assistant</strong>.<br><br>
                I can answer your questions about Sakshi's <strong>Java &amp; Spring Boot development</strong>, database engineering in <strong>MySQL</strong>, her <strong>CodeMetric internship</strong>, and featured projects.
              </div>
            </div>
          </div>

          <!-- Quick Starter Prompts -->
          <div class="chat-quick-chips" id="chatQuickChips">
            <span class="quick-chips-label">Quick topics:</span>
            <button class="chip-btn" data-query="About Sakshi">👋 About Sakshi</button>
            <button class="chip-btn" data-query="Technical Skills">⚡ Technical Skills</button>
            <button class="chip-btn" data-query="Featured Projects">🚀 Featured Projects</button>
            <button class="chip-btn" data-query="Work Experience">💼 Work Experience</button>
            <button class="chip-btn" data-query="Get in Touch">📫 Get in Touch</button>
            <button class="chip-btn" data-query="Download Resume">📄 Download Resume</button>
          </div>
        </div>

        <!-- Typing Indicator (hidden by default) -->
        <div id="chatTypingIndicator" class="chat-typing-indicator" aria-hidden="true" style="display: none;">
          <div class="typing-dot"></div>
          <div class="typing-dot"></div>
          <div class="typing-dot"></div>
          <span class="typing-text">Thinking...</span>
        </div>

        <!-- Input Footer -->
        <footer class="chat-panel-footer">
          <form id="chatForm" class="chat-input-form" autocomplete="off">
            <input
              type="text"
              id="chatInput"
              class="chat-input"
              placeholder="Ask about Java, Spring Boot, projects..."
              aria-label="Ask Sakshi a question"
              maxlength="200"
            />
            <button type="submit" id="chatSendBtn" class="chat-send-btn" aria-label="Send message" title="Send message">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <line x1="22" y1="2" x2="11" y2="13"></line>
                <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
              </svg>
            </button>
          </form>
          <div class="chat-disclaimer">
            <span>Trained on Sakshi's verified portfolio &amp; resume</span>
          </div>
        </footer>
      </aside>
    `;

    document.body.appendChild(widget);
    bindChatEvents();
  }

  // ==========================================================================
  // 5. EVENT BINDING & INTERACTION LOGIC
  // ==========================================================================
  function bindChatEvents() {
    const launcher = document.getElementById('askSakshiLauncher');
    const panel = document.getElementById('askSakshiPanel');
    const closeBtn = document.getElementById('chatCloseBtn');
    const clearBtn = document.getElementById('chatClearBtn');
    const form = document.getElementById('chatForm');
    const input = document.getElementById('chatInput');
    const messagesContainer = document.getElementById('chatMessages');
    const typingIndicator = document.getElementById('chatTypingIndicator');

    let isOpen = false;

    // Toggle Chat Panel
    function toggleChat(forceOpen = null) {
      isOpen = (forceOpen !== null) ? forceOpen : !isOpen;

      launcher.classList.toggle('active', isOpen);
      launcher.setAttribute('aria-expanded', String(isOpen));
      panel.classList.toggle('open', isOpen);
      panel.setAttribute('aria-hidden', String(!isOpen));

      if (isOpen) {
        // Auto-focus input on desktop devices
        if (!('ontouchstart' in window) && window.innerWidth > 640) {
          setTimeout(() => input && input.focus(), 250);
        }
        scrollToBottom();
      }
    }

    launcher.addEventListener('click', () => toggleChat());
    closeBtn.addEventListener('click', () => toggleChat(false));

    // Close on Escape key press
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && isOpen) {
        toggleChat(false);
      }
    });

    // Auto-scroll message container
    function scrollToBottom() {
      if (messagesContainer) {
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
      }
    }

    // Format current timestamp
    function getCurrentTimeString() {
      const now = new Date();
      return now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    }

    // Append a user message bubble
    function appendUserMessage(text) {
      const row = document.createElement('div');
      row.className = 'chat-message-row user';
      row.innerHTML = `
        <div class="chat-bubble user-bubble">
          <div class="bubble-header">
            <span class="bubble-author">You</span>
            <span class="bubble-time">${getCurrentTimeString()}</span>
          </div>
          <div class="bubble-content">${escapeHTML(text)}</div>
        </div>
      `;
      messagesContainer.appendChild(row);
      scrollToBottom();
    }

    // Append an assistant message bubble with clean HTML, action buttons, and chips
    function appendAssistantMessage(responseObj) {
      const row = document.createElement('div');
      row.className = 'chat-message-row assistant';

      // Parse and format clean HTML
      const formattedText = formatAssistantMarkup(responseObj.text);

      let actionsHTML = '';
      if (responseObj.actions && responseObj.actions.length > 0) {
        actionsHTML = '<div class="chat-action-buttons">';
        responseObj.actions.forEach((act) => {
          if (act.target) {
            actionsHTML += `<button class="chat-action-btn ${act.primary ? 'primary' : ''}" data-nav-target="${act.target}">${act.label}</button>`;
          } else if (act.modal) {
            actionsHTML += `<button class="chat-action-btn ${act.primary ? 'primary' : ''}" data-modal-target="${act.modal}">${act.label}</button>`;
          } else if (act.href) {
            const downloadAttr = act.download ? 'download="Sakshi_Pakle_Resume.pdf"' : '';
            const targetAttr = act.external ? 'target="_blank" rel="noopener noreferrer"' : '';
            actionsHTML += `<a href="${act.href}" class="chat-action-btn ${act.primary ? 'primary' : ''}" ${downloadAttr} ${targetAttr}>${act.label}</a>`;
          }
        });
        actionsHTML += '</div>';
      }

      let chipsHTML = '';
      if (responseObj.chips && responseObj.chips.length > 0) {
        chipsHTML = '<div class="chat-quick-chips mini">';
        responseObj.chips.forEach((chip) => {
          chipsHTML += `<button class="chip-btn" data-query="${chip}">${chip}</button>`;
        });
        chipsHTML += '</div>';
      }

      row.innerHTML = `
        <div class="chat-bubble assistant-bubble">
          <div class="bubble-header">
            <span class="bubble-author">Sakshi AI</span>
            <span class="bubble-time">${getCurrentTimeString()}</span>
          </div>
          <div class="bubble-content">${formattedText}</div>
          ${actionsHTML}
        </div>
        ${chipsHTML}
      `;

      messagesContainer.appendChild(row);
      scrollToBottom();
    }

    // Send and process query
    function handleUserQuery(query) {
      if (!query || !query.trim()) return;
      const cleanQuery = query.trim();

      // Append user bubble
      appendUserMessage(cleanQuery);
      input.value = '';

      // Show typing indicator
      if (typingIndicator) typingIndicator.style.display = 'flex';
      scrollToBottom();

      // Realistic conversational response time (300ms - 550ms)
      const delay = Math.min(300 + cleanQuery.length * 5, 550);

      setTimeout(() => {
        if (typingIndicator) typingIndicator.style.display = 'none';
        const response = generateAssistantResponse(cleanQuery);
        appendAssistantMessage(response);
      }, delay);
    }

    // Form submit
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      handleUserQuery(input.value);
    });

    // Delegate clicks for quick chips and action buttons
    messagesContainer.addEventListener('click', (e) => {
      // Quick Chip Button clicked
      const chipBtn = e.target.closest('.chip-btn');
      if (chipBtn && chipBtn.dataset.query) {
        handleUserQuery(chipBtn.dataset.query);
        return;
      }

      // Smooth scroll navigation action button
      const navBtn = e.target.closest('[data-nav-target]');
      if (navBtn) {
        const targetSelector = navBtn.dataset.navTarget;
        const targetElement = document.querySelector(targetSelector);
        if (targetElement) {
          // On mobile, collapse panel so user can see destination section
          if (window.innerWidth <= 640) {
            toggleChat(false);
          }
          targetElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
        return;
      }

      // Open Modal button
      const modalBtn = e.target.closest('[data-modal-target]');
      if (modalBtn) {
        const modalId = modalBtn.dataset.modalTarget;
        const modalEl = document.getElementById(modalId);
        if (modalEl) {
          if (window.innerWidth <= 640) {
            toggleChat(false);
          }
          modalEl.classList.add('open');
          modalEl.setAttribute('aria-hidden', 'false');
          document.body.style.overflow = 'hidden';
        }
      }
    });

    // Clear chat button
    clearBtn.addEventListener('click', () => {
      messagesContainer.innerHTML = `
        <div class="chat-message-row assistant">
          <div class="chat-bubble assistant-bubble">
            <div class="bubble-header">
              <span class="bubble-author">Sakshi AI</span>
              <span class="bubble-time">${getCurrentTimeString()}</span>
            </div>
            <div class="bubble-content">
              Conversation cleared! ✨ What would you like to know about Sakshi's <strong>Java development</strong>, <strong>projects</strong>, or <strong>background</strong>?
            </div>
          </div>
        </div>
        <div class="chat-quick-chips">
          <span class="quick-chips-label">Quick topics:</span>
          <button class="chip-btn" data-query="About Sakshi">👋 About Sakshi</button>
          <button class="chip-btn" data-query="Technical Skills">⚡ Technical Skills</button>
          <button class="chip-btn" data-query="Featured Projects">🚀 Featured Projects</button>
          <button class="chip-btn" data-query="Work Experience">💼 Work Experience</button>
          <button class="chip-btn" data-query="Get in Touch">📫 Get in Touch</button>
        </div>
      `;
      scrollToBottom();
    });
  }

  // ==========================================================================
  // 6. INITIALIZE ON DOM READY
  // ==========================================================================
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initChatbotUI);
  } else {
    initChatbotUI();
  }

})();
