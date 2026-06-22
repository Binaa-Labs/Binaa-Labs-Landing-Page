export type Lang = "en" | "ar";

export const en = {
  nav: {
    logoSubtext: "بناء لابس",
    brandName: "Binaa Labs",
    brandSub: "Software Solutions",
    links: {
      theGap: "The Gap",
      whatWeBuild: "What We Build",
      selectedWork: "Selected Work",
      offer: "Offer",
      guarantee: "Our Guarantee",
    },
    cta: "Free Analysis",
  },
  ui: {
    scroll: "Scroll",
    stack: "STACK",
    aria: {
      home: "Binaa Labs home",
      language: "Language",
      toggleTheme: "Toggle color theme",
      toggleMenu: "Toggle menu",
      backToTop: "Back to top",
    },
    carousel: {
      region: "Selected work carousel",
      goToProject: "Go to project",
      previous: "Previous project",
      next: "Next project",
      status: "Project {current} of {total}",
    },
  },
  hero: {
    badgeLocation: "Dubai, UAE · Built for the Gulf",
    badgeArabic: "Digital Transformation",
    headline:
      "Run Your Business Online — Not Out of a WhatsApp Group and a Spreadsheet",
    subtext:
      "Most Gulf businesses are still run by hand. We move yours fully online and automate the busywork — so your operation runs without you chasing it. Custom-built, launched fast, and yours to keep.",
    ctaPrimary: "Book Your Free Analysis →",
    ctaSecondary: "See What We've Built",
  },
  statsBar: {
    stats: [
      { value: "100%", label: "Code and ownership stays yours" },
      { value: "AR + EN", label: "Bilingual, built for the Gulf" },
      { value: "1:1", label: "Work direct with the builders" },
      { value: "2 wks", label: "To a demo and clear plan" },
    ],
  },
  theGap: {
    label: "The Software Studio Trap",
    headline: "Anyone Can Say 'We'll Automate It.' Few Can Actually Build It.",
    subtext:
      "Now that AI makes it easy to claim, everyone is an automation expert. But a WhatsApp bot and a no-code patch are not a system. We are a real software studio — proper engineering, built Arabic-first, made to hold up as you grow.",
    usualOption: {
      title: "The Usual Option",
      items: [
        {
          title: "Off-the-Shelf and No-Code Patches",
          description:
            "Stitched-together tools and bots that demo well and break the moment real work hits them",
        },
        {
          title: "Outsourced Junior Teams",
          description:
            "Your project handed to offshore shops with no real architecture behind it",
        },
        {
          title: "Endless Change Orders",
          description:
            "Vague scopes designed to trigger surprise bills for basic adjustments",
        },
        {
          title: "Arabic as an Afterthought",
          description:
            "RTL and Arabic tacked on at the end, breaking layouts and local payment flows",
        },
      ],
    },
    studioModel: {
      title: "Binaa Labs",
      badge: "The Studio Model",
      items: [
        {
          title: "A Real Software Studio",
          description:
            "Properly engineered systems built to scale and hold up for years, not a demo that falls apart",
        },
        {
          title: "Direct Senior Builders",
          description:
            "Work directly with the people writing your code. No account managers, no layers",
        },
        {
          title: "Fixed Price, No Surprises",
          description:
            "Transparent scope with zero surprise bills. We eat any cost overrun",
        },
        {
          title: "Arabic-First Architecture",
          description:
            "Native RTL and bilingual interfaces engineered from day one for the Gulf",
        },
      ],
    },
  },
  whatWeBuild: {
    label: "Four Disciplines. One Studio.",
    headline: "Everything It Takes to Put Your Business Online",
    subtext:
      "We do not do everything. We build the core systems that put your operations online, automate the repetitive work, and connect the tools you already use — so the whole thing runs as one.",
    cards: [
      {
        title: "Web Applications",
        description:
          "Custom platforms — customer portals, dashboards, booking and ordering systems — built to handle real volume, with security baked in, not bolted on.",
        tags: ["React", "Node.js", "PostgreSQL"],
      },
      {
        title: "Mobile Apps",
        description:
          "Native iOS and Android apps your customers actually want to use. Arabic-first, fast, and tuned for the way the Gulf shops and pays.",
        tags: ["React Native", "Swift", "Kotlin"],
      },
      {
        title: "Process Automation",
        description:
          "The repetitive work eating your team's day — data entry, follow-ups, reports — mapped, automated, and connected to AI assistants so it runs itself.",
        tags: ["API Integration", "AI Assistants", "Custom Tools"],
      },
      {
        title: "System Integration",
        description:
          "Your CRM, accounting, payment gateways and ERP, finally talking to each other. One connected system instead of ten disconnected tools.",
        tags: ["REST APIs", "Webhooks", "ERP & CRM"],
      },
    ],
  },
  selectedWork: {
    label: "Selected Work",
    headline: "Real Work, Shipped and Running",
    subtext: "A look at what we have built and shipped — and what is coming next.",
    projects: [
      {
        name: "Almani Motors",
        cat: "Auto Parts E-Commerce",
        badge: "Live in Saudi Arabia",
        description:
          "A Saudi spare-parts warehouse, moved online. We built the system that puts their full catalog on the web — new parts sold like any store, and used parts with their own flow for negotiable, no-fixed-price listings.",
        tags: ["Next.js"],
        link: "",
      },
      {
        name: "Wazen وازن",
        cat: "Coaching SaaS",
        badge: "Binaa Labs Product",
        description:
          "Our own coaching platform that replaces the WhatsApp-and-spreadsheets grind. Coaches manage clients, plans, check-ins, messages and progress analytics in one place — with reusable nutrition, workout and medication templates they attach and tweak per client.",
        tags: ["React", "Node.js", "PostgreSQL"],
        link: "wazen.fit",
      },
      {
        name: "More Work Landing Soon",
        cat: "In Development",
        badge: "",
        description:
          "We are heads-down building the next one. This spot is reserved for it.",
        tags: [],
        link: "",
      },
    ],
  },
  howItWorks: {
    label: "How It Works",
    headline: "Three Steps to Working Software",
    subtext:
      "No bloated process, no account managers. Here is exactly how we go from first call to launch.",
    steps: [
      {
        number: "01",
        title: "Tell Us What You're Building",
        description:
          "Book a call and tell us how your business runs today. We map your whole system, show you where it can be automated, and hand you a free analysis with a visual demo — so you see your new setup before you spend a thing.",
      },
      {
        number: "02",
        title: "Watch It Come Together",
        description:
          "You're never in the dark. You get a working link to click through as we build, plus a direct line to the people building it — so you shape it before launch, not after.",
      },
      {
        number: "03",
        title: "Launch and Own It",
        description:
          "We deploy, set up hosting and backups, hand over full ownership of the code, and stay on for 12 months of support. It's yours.",
      },
    ],
  },
  offer: {
    label: "Everything You Get",
    headline: "One Fixed Price. Everything It Takes to Launch.",
    subtext:
      "From the first plan to a year of support after launch, here is exactly what is included in your build — no add-ons, no surprise line items.",
    deliverables: [
      {
        number: "01",
        title: "A Clear Plan Before Any Code",
        description:
          "We map your whole operation — every screen, database and connection — into a blueprint you approve before we build. No surprises later.",
      },
      {
        number: "02",
        title: "Arabic-First Design, Done Right",
        description:
          "Bilingual interfaces built right-to-left from the start, with checkout and flows tuned for how the Gulf actually uses them.",
      },
      {
        number: "03",
        title: "The Full Build, Done Properly",
        description:
          "Clean, documented front-end and back-end built to your exact spec — tested across real devices, not thrown over the wall.",
      },
      {
        number: "04",
        title: "Connected to the Tools You Use",
        description:
          "Plugged into your payment gateways, CRM, accounting and ERP, so everything talks to each other from day one.",
      },
      {
        number: "05",
        title: "Support After Launch",
        description:
          "Hosting, automatic backups, fixes and a direct line to us for 12 months. You are never left stranded.",
      },
    ],
    proposal: {
      label: "Fixed Price Proposal",
      title: "The Complete Build",
      intro:
        "Everything above, for one fixed price — scoped to your project, agreed up front.",
      checks: [
        "Scoped to your exact needs",
        "One price, no hourly surprises",
        "You own 100% of the code",
        "Backed by our delivery guarantee",
      ],
      freeBox: {
        label: "Free First Step — No Cost",
        text: "Book a call and we map your whole system, show you exactly what we can automate and how we would build it — plus a visual demo so you can see how your new setup will look. Yours free, before you commit to anything.",
      },
      cta: "Book Your Free Analysis →",
    },
  },
  guarantee: {
    label: "Our Guarantee",
    headline: "You Approve Every Step — Before You Pay for It",
    arabicSubline: "اعتمد قبل أن تدفع",
    body: "You never pay for work you have not seen. Before we build any stage, we show you a visual demo of exactly what it will look like — and we only process that milestone once you approve it.",
    secondary:
      "If the demo from your free analysis does not show you something worth building, you walk away owing nothing. Once we start, we do not stop until it works the way we agreed — we fix anything in scope, free, until it is right. No surprise bills. No paying for promises. You see it, you approve it, then we build it.",
    signName: "Ahmad Shadid",
    signRole: "Founder & Product Lead",
    signOrg: "Binaa Labs · Dubai",
  },
  team: {
    label: "The Team",
    headline: "The People Who Build It",
    subtext:
      "No sales personnel or junior interns. You coordinate directly with the engineers and designers building your platform.",
    members: [
      {
        initials: "NS",
        name: "Naser Shadid",
        role: "Founder & Product Lead",
        description:
          "Plans every build, shapes the features and design, and is your direct line from first call to launch.",
      },
      {
        initials: "YB",
        name: "Yahya Bawadekji",
        role: "Lead Engineer",
        description:
          "Leads engineering across the front end, integrations and testing, keeping every build on track and solid.",
      },
      {
        initials: "AB",
        name: "Abdulmohaimin Bachir",
        role: "Backend Lead",
        description:
          "Owns the back end end-to-end: the databases, APIs and logic that keep your system running.",
      },
      {
        initials: "SM",
        name: "Suha Mirza",
        role: "Full-Stack Engineer",
        description:
          "Builds across the stack, with a focus on front-end, integrations and rigorous testing.",
      },
    ],
  },
  contact: {
    label: "Free Analysis",
    headline: "Get Your Free System Analysis",
    subtext:
      "Book a call. We will map how your business runs today, show you what we can automate, and give you a visual demo of your new system — free, before you commit to anything.",
    steps: [
      {
        title: "Tell us how your business runs",
        description: "Share how things work today and where they slow you down",
      },
      {
        title: "We analyze and show you a demo",
        description:
          "We map your system, find what to automate, and build a visual demo of how it will look",
      },
      {
        title: "You get a plan and fixed price",
        description:
          "A clear proposal, backed by our approve-before-you-pay guarantee. No commitment",
      },
    ],
    trustLine: "We respond within 24 hours. No commitment required.",
    form: {
      name: "Name",
      namePlaceholder: "Your name",
      email: "Email",
      emailPlaceholder: "you@company.com",
      company: "Company",
      companyPlaceholder: "Your company",
      phone: "Phone",
      phonePlaceholder: "Your phone number",
      project: "What are you building?",
      projectPlaceholder:
        "Tell us about your business and what you want to build or automate…",
      cta: "Book My Free Analysis →",
      calendlyLink: "Prefer to pick a time? Book directly →",
      sentTitle: "Request received",
      sentText:
        "Thanks — we'll be in touch within 24 hours to set up your free analysis.",
      sendAnother: "Send another →",
    },
  },
  footer: {
    logoSubtext: "بناء لابس",
    links: {
      theGap: "The Gap",
      whatWeBuild: "What We Build",
      selectedWork: "Selected Work",
      offer: "Offer",
      guarantee: "Our Guarantee",
      contact: "Contact",
    },
    product: "Wazen وازن — wazen.fit",
    location: "Dubai, UAE · DET Licensed",
    copyright: "© 2026 Binaa Labs. All rights reserved.",
    bottomNote: "Built by Binaa Labs",
  },
};

export type Dict = typeof en;

export const ar: Dict = {
  nav: {
    logoSubtext: "بناء لابس",
    brandName: "بناء لابس",
    brandSub: "حلول برمجية",
    links: {
      theGap: "الفجوة",
      whatWeBuild: "ما نبنيه",
      selectedWork: "أعمالنا",
      offer: "العرض",
      guarantee: "ضماننا",
    },
    cta: "تحليل مجاني",
  },
  ui: {
    scroll: "تابع",
    stack: "التقنيات",
    aria: {
      home: "العودة إلى بداية بناء لابس",
      language: "اللغة",
      toggleTheme: "تبديل نمط الألوان",
      toggleMenu: "تبديل القائمة",
      backToTop: "العودة إلى الأعلى",
    },
    carousel: {
      region: "معرض الأعمال المختارة",
      goToProject: "انتقل إلى المشروع",
      previous: "المشروع السابق",
      next: "المشروع التالي",
      status: "المشروع {current} من {total}",
    },
  },
  hero: {
    badgeLocation: "دبي، الإمارات · مصمّم للخليج",
    badgeArabic: "التحول الرقمي",
    headline: "أدِر شركتك أونلاين — لا من مجموعة واتساب وملف إكسل",
    subtext:
      "أغلب شركات الخليج لا تزال تُدار يدويًا. ننقل عملك بالكامل إلى الإنترنت ونؤتمت المهام المتكررة — ليعمل تشغيلك دون أن تطارده. مبنيّ خصيصًا لك، يُطلق بسرعة، وملكُه لك.",
    ctaPrimary: "احجز تحليلك المجاني ←",
    ctaSecondary: "شاهد ما بنيناه",
  },
  statsBar: {
    stats: [
      { value: "100%", label: "الكود والملكية الكاملة تبقى لك" },
      { value: "AR + EN", label: "ثنائي اللغة، مصمّم للخليج" },
      { value: "1:1", label: "تعمل مباشرة مع المطوّرين" },
      { value: "أسبوعان", label: "حتى عرض توضيحي وخطة واضحة" },
    ],
  },
  theGap: {
    label: "فخّ استوديوهات البرمجة",
    headline: "الجميع يقول 'سنؤتمتها'. قلّة يستطيعون بناءها فعلاً.",
    subtext:
      "الآن وقد جعل الذكاء الاصطناعي الادعاء سهلاً، صار الجميع خبير أتمتة. لكن بوت واتساب وحلاً مؤقتاً بلا كود ليسا نظاماً. نحن استوديو برمجيات حقيقي — هندسة سليمة، مبنية بالعربية أولاً، صُمّمت لتصمد مع نموّك.",
    usualOption: {
      title: "الخيار المعتاد",
      items: [
        {
          title: "حلول جاهزة وترقيعات بلا كود",
          description:
            "أدوات وبوتات مجمّعة تبدو جيدة في العرض وتنهار أول ما يبدأ العمل الحقيقي",
        },
        {
          title: "فرق مبتدئة خارجية",
          description: "مشروعك يُسلَّم لورش خارجية بلا بنية هندسية حقيقية",
        },
        {
          title: "طلبات تعديل لا تنتهي",
          description: "نطاقات غامضة مصمّمة لتوليد فواتير مفاجئة لأبسط التعديلات",
        },
        {
          title: "العربية كفكرة لاحقة",
          description:
            "تُضاف العربية وRTL في النهاية، فتنكسر الواجهات وطرق الدفع المحلية",
        },
      ],
    },
    studioModel: {
      title: "Binaa Labs",
      badge: "نموذج الاستوديو",
      items: [
        {
          title: "استوديو برمجيات حقيقي",
          description: "أنظمة مهندسة بإتقان لتتوسّع وتصمد لسنوات، لا عرض ينهار",
        },
        {
          title: "مطوّرون كبار مباشرة",
          description: "تعمل مباشرة مع من يكتب الكود. بلا مدراء حسابات ولا وسطاء",
        },
        {
          title: "سعر ثابت بلا مفاجآت",
          description: "نطاق شفّاف بلا فواتير مفاجئة. نتحمّل أي تجاوز في التكلفة",
        },
        {
          title: "بنية بالعربية أولاً",
          description: "واجهات RTL وثنائية اللغة مهندسة من اليوم الأول للخليج",
        },
      ],
    },
  },
  whatWeBuild: {
    label: "أربعة تخصصات. استوديو واحد.",
    headline: "كل ما يلزم لنقل عملك إلى الإنترنت",
    subtext:
      "لا نفعل كل شيء. نبني الأنظمة الأساسية التي تنقل عملياتك أونلاين، وتؤتمت العمل المتكرر، وتربط الأدوات التي تستخدمها — ليعمل كل شيء كوحدة واحدة.",
    cards: [
      {
        title: "تطبيقات الويب",
        description:
          "منصّات مخصّصة — بوابات عملاء ولوحات تحكم وأنظمة حجز وطلب — مبنية لتتحمّل الحجم الحقيقي، بأمان مدمج لا مُضاف.",
        tags: ["React", "Node.js", "PostgreSQL"],
      },
      {
        title: "تطبيقات الجوال",
        description:
          "تطبيقات iOS وأندرويد أصلية يحبّها عملاؤك. بالعربية أولاً، سريعة، ومضبوطة لطريقة تسوّق ودفع الخليج.",
        tags: ["React Native", "Swift", "Kotlin"],
      },
      {
        title: "أتمتة العمليات",
        description:
          "العمل المتكرر الذي يلتهم يوم فريقك — إدخال بيانات ومتابعات وتقارير — يُرسم ويُؤتمت ويُربط بمساعدي ذكاء اصطناعي ليعمل ذاتياً.",
        tags: ["API Integration", "AI Assistants", "Custom Tools"],
      },
      {
        title: "تكامل الأنظمة",
        description:
          "نظام إدارة العملاء والمحاسبة وبوابات الدفع وERP، أخيراً تتحدث مع بعضها. نظام واحد متصل بدل عشر أدوات منفصلة.",
        tags: ["REST APIs", "Webhooks", "ERP & CRM"],
      },
    ],
  },
  selectedWork: {
    label: "أعمال مختارة",
    headline: "أعمال حقيقية، مُطلقة وتعمل",
    subtext: "نظرة على ما بنيناه وأطلقناه — وما هو قادم.",
    projects: [
      {
        name: "Almani Motors",
        cat: "تجارة قطع غيار إلكترونية",
        badge: "يعمل في السعودية",
        description:
          "مستودع قطع غيار سعودي، انتقل أونلاين. بنينا النظام الذي يضع كامل كتالوجهم على الويب — قطع جديدة تُباع كأي متجر، وقطع مستعملة بمسار خاص للعروض القابلة للتفاوض بلا سعر ثابت.",
        tags: ["Next.js"],
        link: "",
      },
      {
        name: "Wazen وازن",
        cat: "منصّة تدريب SaaS",
        badge: "منتج Binaa Labs",
        description:
          "منصّتنا للتدريب التي تستبدل فوضى الواتساب والإكسل. يدير المدرّبون العملاء والخطط والمتابعات والرسائل وتحليلات التقدّم في مكان واحد — مع قوالب تغذية وتمارين وأدوية قابلة لإعادة الاستخدام يربطونها ويعدّلونها لكل عميل.",
        tags: ["React", "Node.js", "PostgreSQL"],
        link: "wazen.fit",
      },
      {
        name: "أعمال أخرى قريباً",
        cat: "قيد التطوير",
        badge: "",
        description: "نعمل بتركيز على المشروع التالي. هذا المكان محجوز له.",
        tags: [],
        link: "",
      },
    ],
  },
  howItWorks: {
    label: "كيف نعمل",
    headline: "ثلاث خطوات إلى برنامج يعمل",
    subtext:
      "بلا عمليات منتفخة ولا مدراء حسابات. هكذا ننتقل من أول مكالمة إلى الإطلاق.",
    steps: [
      {
        number: "01",
        title: "أخبرنا بما تبنيه",
        description:
          "احجز مكالمة وأخبرنا كيف يعمل عملك اليوم. نرسم نظامك كاملاً، نريك أين يمكن أتمتته، ونسلّمك تحليلاً مجانياً مع عرض توضيحي — لترى إعدادك الجديد قبل أن تدفع شيئاً.",
      },
      {
        number: "02",
        title: "شاهده يتشكّل",
        description:
          "لن تكون في الظلام أبداً. تحصل على رابط يعمل لتتصفّحه أثناء البناء، وخطّ مباشر مع من يبنيه — لتشكّله قبل الإطلاق لا بعده.",
      },
      {
        number: "03",
        title: "أطلقه وامتلكه",
        description:
          "ننشر، نجهّز الاستضافة والنسخ الاحتياطي، نسلّمك ملكية الكود كاملة، ونبقى معك ١٢ شهراً من الدعم. إنه لك.",
      },
    ],
  },
  offer: {
    label: "كل ما تحصل عليه",
    headline: "سعر ثابت واحد. كل ما يلزم للإطلاق.",
    subtext:
      "من أول خطة إلى عام من الدعم بعد الإطلاق، هذا بالضبط ما يتضمّنه مشروعك — بلا إضافات ولا بنود مفاجئة.",
    deliverables: [
      {
        number: "٠١",
        title: "خطة واضحة قبل أي كود",
        description:
          "نرسم عمليتك كاملة — كل شاشة وقاعدة بيانات واتصال — في مخطّط تعتمده قبل أن نبني. بلا مفاجآت لاحقاً.",
      },
      {
        number: "٠٢",
        title: "تصميم بالعربية أولاً، بإتقان",
        description:
          "واجهات ثنائية اللغة مبنية من اليمين لليسار من البداية، بدفع وتدفّقات مضبوطة لطريقة استخدام الخليج.",
      },
      {
        number: "٠٣",
        title: "البناء الكامل، بإتقان",
        description:
          "واجهة أمامية وخلفية نظيفة وموثّقة مبنية حسب مواصفاتك تماماً — مختبرة على أجهزة حقيقية.",
      },
      {
        number: "٠٤",
        title: "متصل بالأدوات التي تستخدمها",
        description:
          "موصول ببوابات الدفع وإدارة العملاء والمحاسبة وERP، ليتحدث كل شيء من اليوم الأول.",
      },
      {
        number: "٠٥",
        title: "دعم بعد الإطلاق",
        description:
          "استضافة ونسخ احتياطي تلقائي وإصلاحات وخط مباشر معنا ١٢ شهراً. لن تُترك وحدك أبداً.",
      },
    ],
    proposal: {
      label: "عرض بسعر ثابت",
      title: "البناء الكامل",
      intro: "كل ما سبق، بسعر ثابت واحد — محدّد لمشروعك ومتّفق عليه مسبقاً.",
      checks: [
        "محدّد حسب احتياجك تماماً",
        "سعر واحد بلا مفاجآت بالساعة",
        "تمتلك ١٠٠٪ من الكود",
        "مدعوم بضمان التسليم",
      ],
      freeBox: {
        label: "خطوة أولى مجانية — بلا تكلفة",
        text: "احجز مكالمة ونرسم نظامك كاملاً، نريك بالضبط ما يمكن أتمتته وكيف سنبنيه — مع عرض توضيحي لترى شكل إعدادك الجديد. مجاناً، قبل أن تلتزم بأي شيء.",
      },
      cta: "احجز تحليلك المجاني ←",
    },
  },
  guarantee: {
    label: "ضماننا",
    headline: "تعتمد كل خطوة — قبل أن تدفع مقابلها",
    arabicSubline: "اعتمد قبل أن تدفع",
    body: "لا تدفع أبداً مقابل عمل لم تره. قبل أن نبني أي مرحلة، نريك عرضاً توضيحياً لشكلها بالضبط — ولا نحصّل تلك المرحلة إلا بعد اعتمادك.",
    secondary:
      "إن لم يُظهر لك العرض من تحليلك المجاني شيئاً يستحق البناء، تنصرف دون أن تدين بشيء. وحين نبدأ، لا نتوقف حتى يعمل كما اتّفقنا — نصلح أي شيء ضمن النطاق، مجاناً، حتى يصبح صحيحاً. بلا فواتير مفاجئة. بلا دفع مقابل وعود. تراه، تعتمده، ثم نبنيه.",
    signName: "أحمد شديد",
    signRole: "المؤسّس وقائد المنتج",
    signOrg: "Binaa Labs · دبي",
  },
  team: {
    label: "الفريق",
    headline: "مَن يبنيه",
    subtext:
      "لا مندوبو مبيعات ولا متدرّبون مبتدئون. تنسّق مباشرة مع المهندسين والمصمّمين الذين يبنون منصّتك.",
    members: [
      {
        initials: "NS",
        name: "ناصر شديد",
        role: "المؤسّس وقائد المنتج",
        description:
          "يخطّط كل بناء، يشكّل الميزات والتصميم، وهو خطّك المباشر من أول مكالمة إلى الإطلاق.",
      },
      {
        initials: "YB",
        name: "يحيى باوادقجي",
        role: "كبير المهندسين",
        description:
          "يقود الهندسة عبر الواجهة الأمامية والتكاملات والاختبار، ويبقي كل بناء على المسار ومتيناً.",
      },
      {
        initials: "AB",
        name: "عبد المهيمن بشير",
        role: "قائد الواجهة الخلفية",
        description:
          "يملك الواجهة الخلفية بالكامل: قواعد البيانات وواجهات البرمجة والمنطق الذي يُبقي نظامك يعمل.",
      },
      {
        initials: "SM",
        name: "سهى ميرزا",
        role: "مهندسة متكاملة",
        description:
          "تبني عبر كامل الحزمة، بتركيز على الواجهة الأمامية والتكاملات والاختبار الدقيق.",
      },
    ],
  },
  contact: {
    label: "تحليل مجاني",
    headline: "احصل على تحليل مجاني لنظامك",
    subtext:
      "احجز مكالمة. سنرسم كيف يعمل عملك اليوم، نريك ما يمكن أتمتته، ونعطيك عرضاً توضيحياً لنظامك الجديد — مجاناً، قبل أن تلتزم بأي شيء.",
    steps: [
      {
        title: "أخبرنا كيف يعمل عملك",
        description: "شاركنا كيف تسير الأمور اليوم وأين تتباطأ",
      },
      {
        title: "نحلّل ونريك عرضاً",
        description: "نرسم نظامك، نجد ما نؤتمته، ونبني عرضاً توضيحياً لشكله",
      },
      {
        title: "تحصل على خطة وسعر ثابت",
        description: "عرض واضح، مدعوم بضمان الاعتماد قبل الدفع. بلا التزام",
      },
    ],
    trustLine: "نردّ خلال ٢٤ ساعة. لا التزام مطلوب.",
    form: {
      name: "الاسم",
      namePlaceholder: "اسمك",
      email: "البريد الإلكتروني",
      emailPlaceholder: "you@company.com",
      company: "الشركة",
      companyPlaceholder: "اسم شركتك",
      phone: "الهاتف",
      phonePlaceholder: "رقم هاتفك",
      project: "ماذا تبني؟",
      projectPlaceholder: "أخبرنا عن عملك وما تريد بناءه أو أتمتته…",
      cta: "احجز تحليلي المجاني ←",
      calendlyLink: "تفضّل اختيار وقت؟ احجز مباشرة ←",
      sentTitle: "تمّ استلام طلبك",
      sentText: "شكراً — سنتواصل معك خلال ٢٤ ساعة لترتيب تحليلك المجاني.",
      sendAnother: "أرسل طلباً آخر ←",
    },
  },
  footer: {
    logoSubtext: "بناء لابس",
    links: {
      theGap: "الفجوة",
      whatWeBuild: "ما نبنيه",
      selectedWork: "أعمالنا",
      offer: "العرض",
      guarantee: "ضماننا",
      contact: "تواصل",
    },
    product: "Wazen وازن — wazen.fit",
    location: "دبي، الإمارات · مرخّص من دائرة الاقتصاد",
    copyright: "© ٢٠٢٦ Binaa Labs. جميع الحقوق محفوظة.",
    bottomNote: "بُني بواسطة Binaa Labs",
  },
};

export const dictionaries: Record<Lang, Dict> = { en, ar };
