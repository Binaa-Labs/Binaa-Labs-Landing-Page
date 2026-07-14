// English dictionary — defines the Dict shape (ar.ts must match it exactly).
// Stage 2 copy diet: one headline + one supporting line per section; facts
// live in chips, meta rows and artifact fragments, not sentences.
//
// Frame-interior strings (hero frame, case-panel posters) are product
// schematics: a browser chrome is an LTR artifact, so they stay Latin in
// BOTH locales (STAGE2-DESIGN §3/§6). ar.ts reuses these objects verbatim.

export const en = {
  nav: {
    brandName: "Binaa Labs",
    brandSub: "Software Studio",
    links: {
      theGap: "The Gap",
      whatWeBuild: "What We Build",
      selectedWork: "Selected Work",
      howWeWork: "How We Work",
    },
    cta: "Free Analysis",
  },
  splash: {
    title: "Binaa Labs",
    arabicName: "بناء لابس",
    slogan: "Where your software gets built",
    skip: "Skip →",
  },
  ui: {
    skipToContent: "Skip to content",
    aria: {
      home: "Binaa Labs home",
      language: "Language",
      toggleTheme: "Toggle color theme",
      toggleMenu: "Toggle menu",
      backToTop: "Back to top",
    },
  },
  hero: {
    badgeLocation: "Dubai, UAE · Built for the Gulf",
    headline:
      "Run Your Business Online — Not Out of a WhatsApp Group and a Spreadsheet",
    highlights: ["WhatsApp Group", "Spreadsheet"],
    subtext:
      "We move your operation fully online and automate the busywork — custom-built, launched fast, yours to keep.",
    ctaPrimary: "Book Your Free Analysis →",
    ctaSecondary: "See What We’ve Built",
    proof: [
      { value: "100%", label: "Code and ownership stays yours" },
      { value: "AR + EN", label: "Bilingual, built for the Gulf" },
      { value: "2 wks", label: "To a demo and clear plan" },
      { value: "24h", label: "Response, direct from the builders" },
    ],
    // product schematic — Latin/LTR in both locales
    frame: {
      url: "app.wazen.fit",
      nav: ["Dashboard", "Clients", "Plans", "Check-ins", "Messages"],
      title: "Coach Dashboard",
      period: "This week",
      tiles: [
        { value: "128", label: "Active clients" },
        { value: "96%", label: "Check-in rate" },
        { value: "24", label: "Plans updated" },
      ],
      rows: [
        { name: "Ahmad K. — Cut phase · wk 6", status: "Checked in", muted: false },
        { name: "Omar S. — Strength · wk 3", status: "Checked in", muted: false },
        { name: "Khalid M. — Onboarding", status: "Plan due", muted: true },
      ],
    },
  },
  theGap: {
    label: "The Software Studio Trap",
    headline: "Anyone Can Say ‘We’ll Automate It.’ Few Can Actually Build It.",
    subtext:
      "A WhatsApp bot and a no-code patch are not a system. Everything below is the difference.",
    spineLabel: "The Gap",
    usual: {
      title: "The Usual Option",
      tag: "What you get elsewhere",
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
    studio: {
      title: "Binaa Labs",
      tag: "The Studio Model",
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
    label: "What We Build",
    headline: "Picture It Already Working",
    subtext: "Four everyday operations — rebuilt as software that runs itself.",
    // Scenarios are illustrations of capability, never claims of delivered
    // clients (D1). The only delivery claims on the page are in Selected Work.
    cards: [
      {
        headline: "A clinic that books itself",
        build:
          "A booking system your patients use directly — appointments, reminders and records in one place.",
        from: "phone tag and a paper calendar",
        to: "slots that book, confirm and remind on their own",
      },
      {
        headline: "A warehouse that knows every part it holds",
        build:
          "An inventory system tracking every part, price and location in real time.",
        from: "a storeroom only one person understands",
        to: "live stock every device can see",
      },
      {
        headline: "Reports that write themselves",
        build:
          "Automation that pulls your numbers and assembles the report the moment it is due.",
        from: "a night of copy-paste every month",
        to: "it is already in your inbox",
      },
      {
        headline: "Ten tools that finally talk",
        build:
          "Integration wiring your CRM, accounting and payments into one connected flow.",
        from: "ten disconnected tools",
        to: "one connected operation",
      },
    ],
  },
  selectedWork: {
    label: "Selected Work",
    headline: "Real Work, Shipped and Running",
    subtext: "Two products, live and in daily use — one of them our own.",
    meta: { role: "Role", stack: "Stack", status: "Status" },
    loopChip: "Silent loop",
    wazen: {
      badge: "Binaa Labs Product",
      name: "Wazen وازن",
      cat: "Coaching SaaS",
      description:
        "Our own coaching platform — the WhatsApp-and-spreadsheets grind, replaced. Clients, plans, check-ins and progress analytics in one place.",
      role: "Product · Design · Build",
      stack: "React · Node.js · PostgreSQL",
      status: "Live",
      link: "wazen.fit",
      linkLabel: "Visit wazen.fit",
    },
    almani: {
      badge: "Live in Saudi Arabia",
      name: "Almani Motors",
      cat: "Auto Parts E-Commerce",
      description:
        "A Saudi spare-parts warehouse, moved online — new parts sold like any store, used parts with their own negotiable-price flow.",
      role: "Design · Build · Launch",
      stack: "Next.js",
      status: "Live (no public link)",
    },
    // case-frame schematics — Latin/LTR in both locales
    wazenFrame: {
      url: "app.wazen.fit",
      brand: "Wazen",
      nav: ["Dashboard", "Clients", "Plans", "Check-ins", "Templates", "Messages"],
      title: "Coach Dashboard",
      period: "Week 24 · Jun",
      kpis: [
        { value: "128", label: "Active clients" },
        { value: "96%", label: "Check-in rate" },
        { value: "24", label: "Plans updated" },
      ],
      chartCap: "Check-ins this week",
      chartVal: "112 / 128",
      chartBars: [52, 68, 44, 80, 96, 61, 38],
      chartAxis: ["M", "T", "W", "T", "F", "S", "S"],
      tableHead: ["Client", "Plan", "Status"],
      tableRows: [
        { a: "Ahmad K.", b: "Cut · wk 6", status: "Checked in", muted: false },
        { a: "Omar S.", b: "Strength · wk 3", status: "Checked in", muted: false },
        { a: "Khalid M.", b: "Onboarding", status: "Plan due", muted: true },
      ],
    },
    almaniFrame: {
      url: "almani-motors — placeholder",
      brand: "Almani",
      nav: ["Catalog", "Used parts", "Offers", "Orders", "Inventory"],
      title: "Parts catalog",
      period: "1,240 listings",
      filters: [
        { label: "All brands", on: true },
        { label: "Model", on: false },
        { label: "Year", on: false },
        { label: "New", on: true },
        { label: "Used", on: false },
      ],
      parts: [
        { name: "Brake disc — front", price: "SAR 320", pill: "New", muted: false },
        { name: "Alternator — 12V", price: "Make offer", pill: "Used", muted: true },
        { name: "Oil filter — set of 4", price: "SAR 95", pill: "New", muted: false },
      ],
      tableHead: ["Recent offer", "Listing", "State"],
      tableRows: [
        { a: "SAR 480", b: "Gearbox — used", status: "Countered", muted: false },
        { a: "SAR 210", b: "Headlamp — used", status: "Pending", muted: true },
      ],
    },
  },
  howWeWork: {
    label: "How We Work & What You Get",
    headline: "From First Call to Code That’s Yours",
    subtext:
      "Three steps, one fixed price — and at each one, something real lands in your hands.",
    youReceive: "You receive",
    steps: [
      {
        num: "01",
        title: "Free analysis",
        line: "We map your operation, show you a visual demo, and put one fixed price on the table.",
      },
      {
        num: "02",
        title: "You watch it build",
        line: "Click through a working link as we go, with a direct line to the people writing the code.",
      },
      {
        num: "03",
        title: "Launch and own it",
        line: "We deploy, hand over the repository, and stay on for twelve months of support.",
      },
    ],
    // artifact fragments — deliberately generic (your-app, your-company):
    // no invented client names anywhere (D1)
    quoteDoc: {
      title: "Fixed-Price Proposal",
      version: "v1",
      rows: [
        { item: "Discovery & system map", included: "included" },
        { item: "Build — 5 modules, AR + EN", included: "included" },
        { item: "Launch & 12-mo support", included: "included" },
      ],
      totalLabel: "Total",
      totalValue: "One fixed price",
    },
    demo: {
      url: "preview.binaalabs.dev/your-app",
      live: "Live",
      meta1: "Build 0.6 · Booking module",
      meta2: "Updated 2h ago",
    },
    repo: {
      name: "your-company/platform",
      owner: "Yours",
      rows: ["Source + history", "Infra & DNS accounts", "Docs & runbook"],
      done: "transferred ✓",
    },
    deliverablesHead: "Everything included in the build",
    deliverables: [
      {
        num: "01",
        title: "A clear plan before any code",
        line: "Every screen, database and connection mapped into a blueprint you approve first.",
      },
      {
        num: "02",
        title: "Arabic-first design, done right",
        line: "Bilingual interfaces built right-to-left from the first wireframe — not translated at the end.",
      },
      {
        num: "03",
        title: "The full build, done properly",
        line: "Clean, documented front-end and back-end, tested on real devices.",
      },
      {
        num: "04",
        title: "Connected to the tools you use",
        line: "Payment gateways, CRM, accounting and ERP, talking to each other from day one.",
      },
      {
        num: "05",
        title: "Support after launch",
        line: "Hosting, backups, fixes and a direct line to us for twelve months.",
      },
    ],
    disciplinesLabel: "Disciplines",
    disciplines: "Web apps · Mobile apps · Process automation · System integration",
    proposal: {
      label: "Fixed Price Proposal",
      title: "The Complete Build",
      intro:
        "Everything in the list, for one price — scoped to your project, agreed up front.",
      checks: [
        "Scoped to your exact needs",
        "One price, no hourly surprises",
        "You own 100% of the code",
        "Backed by our delivery guarantee",
      ],
      freeLabel: "Free first step — no cost",
      freeText:
        "We map your system and show you a visual demo of your new setup, free, before you commit to anything.",
      cta: "Book Your Free Analysis →",
    },
  },
  guarantee: {
    label: "Our Guarantee",
    headline: "You Approve Every Step — Before You Pay for It",
    arabicSubline: "اعتمد قبل أن تدفع",
    body: "You never pay for work you have not seen. We show you a visual demo of every stage, and only bill that milestone once you approve it.",
    secondary:
      "If the free analysis shows you nothing worth building, you walk away owing nothing.",
    terms: ["See it first", "Approve it", "Then we build"],
    signName: "Naser Shadid",
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
  faq: {
    label: "Common Questions",
    headline: "Before You Ask",
    subtext: "The questions every serious client asks us — answered straight.",
    items: [
      {
        q: "Who owns the code when the project is done?",
        a: "You do — 100%, from handover. Source, repositories, infrastructure accounts and documentation all transfer to you. No license fee, no lock-in.",
      },
      {
        q: "What does the process actually look like?",
        a: "Three steps: a free analysis with a visual demo, a build you watch through a working link, then launch with 12 months of support. You approve each stage before it is billed.",
      },
      {
        q: "How does the fixed price work?",
        a: "We scope the whole build up front and commit to one price. Overruns are our cost, not yours. Changes beyond that scope are quoted before any work starts.",
      },
      {
        q: "Is Arabic really first-class, or translated at the end?",
        a: "First-class. We design right-to-left from the first wireframe — layouts, forms and payment flows built bilingual from day one. This site itself runs full RTL.",
      },
      {
        q: "What happens after launch?",
        a: "Twelve months included: hosting, backups, fixes and a direct line to the people who built it. After that, stay on a plan or take it in-house — it is your code either way.",
      },
      {
        q: "Do you build native apps or web apps?",
        a: "Whichever your problem actually needs — and we will tell you honestly. A fast web app or PWA beats native for many operations; native earns its cost for deep device integration or app-store presence.",
      },
      {
        q: "What do you build with?",
        a: "Modern, boring-on-purpose tools: React, React Native, Node.js, PostgreSQL, Next.js — proven stacks any competent team can maintain after handover, not exotic tech that locks you to us.",
      },
    ],
  },
  contact: {
    label: "Free Analysis",
    headline: "Get Your Free System Analysis",
    steps: [
      "Tell us how your business runs today.",
      "We map it and show you a visual demo.",
      "You get a plan and a fixed price.",
    ],
    form: {
      cap: "Book your call",
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
      submitting: "Sending…",
      sentTitle: "Request received",
      sentText:
        "We’ll be in touch within 24 hours to set up your free analysis.",
      sendAnother: "Send another →",
      failTitle: "Couldn’t send.",
      failText: "Nothing was lost — your message is still below.",
      failRetry: "Try again",
      failEmailPrefix: "Or email us directly at",
      errRequired: "Please fill in the required fields.",
      errEmail: "Please enter a valid email.",
      receiptCap: "What happens next",
      receiptChips: ["24h response", "Free analysis", "No commitment"],
    },
  },
  footer: {
    logoSubtext: "بناء لابس",
    links: {
      theGap: "The Gap",
      whatWeBuild: "What We Build",
      selectedWork: "Selected Work",
      howWeWork: "How We Work",
      guarantee: "Our Guarantee",
      contact: "Contact",
      privacy: "Privacy Policy",
    },
    product: "Wazen وازن — wazen.fit",
    location: "Dubai, UAE · DET Licensed",
    copyright: "© 2026 Binaa Labs. All rights reserved.",
    bottomNote: "Built by Binaa Labs",
  },
};

export type Dict = typeof en;
