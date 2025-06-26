import React, { createContext, useContext, useState } from 'react';

type Language = 'en' | 'ro';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const translations = {
  en: {
    /* ---------- General ---------- */
    title: "Intelligent Workflow Automation Solutions",
    subtitle: "Optimize your operations with intelligent workflow automation",
    cta: "Begin Your Automation Journey",
    workflows: "Interactive Automation Demonstrations",
    workflowDescription:
      "Select any workflow below to discover how automation saves time, reduces costs, and eliminates manual errors.",
    playDemo: "Run Demo",
    resetDemo: "Restart Demo",
    running: "In Progress…",
    nodeExecuting: "Executing…",
    nodeCompleted: "Completed",
    whyItMatters: "Business Impact",
    demoInput: "Input",
    demoOutput: "Output",
    startFlow: "Launch Workflow",
    viewDetails: "View Details",

    /* ---------- Industry Examples ---------- */
    industryTitle: "Automation Examples by Industry",
    industryDescription: "See how different professionals use workflow automation to streamline their daily workflows. Hover over nodes to see what each step does.",
    
    marketingTitle: "Digital Marketing Manager",
    marketingSubtitle: "Manager de Marketing Digital",
    marketingDescription: "Automatically qualify leads, enrich data, and alert your team when high-value prospects arrive.",
    
    ecommerceTitle: "E-commerce Store Owner", 
    ecommerceSubtitle: "Proprietar de Magazin Online",
    ecommerceDescription: "Monitor inventory levels and automatically reorder stock when thresholds are reached.",
    
    recruitingTitle: "Recruiter",
    recruitingSubtitle: "Recrutor", 
    recruitingDescription: "Parse candidate profiles, score them automatically, and send personalized outreach emails.",

    integrationsTitle: "Connect with 400+ Services",
    integrationsSubtitle: "Popular integrations include:",
    manyMore: "Many more",
    customIntegrations: "Custom integrations available: REST APIs, GraphQL, Webhooks, Databases, Enterprise systems, and more",

    /* ---------- Contact page ---------- */
    contactTitle: "Launch Your Automation Strategy",
    contactSubtitle:
      "Ready to elevate your organization with intelligent automation? Let's discuss your goals.",
    contactName: "Full Name",
    contactEmail: "Email Address",
    contactPhone: "Phone Number",
    contactCompany: "Company Name",
    contactMessage: "Tell us about your automation objectives",
    contactSubmit: "Send Message",
    contactInfo: "Contact Details",
    contactPhoneNumber: "+1 (555) 123-4567",
    contactEmailAddress: "hello@bitladssoftware.com",
    contactHours: "Business Hours: Monday-Friday, 9:00 AM-6:00 PM EST",
    backToHome: "Return to Home",

    /* ---------- Contact page automation benefits ---------- */
    whyChooseTitle: "Why Choose Workflow Automation?",
    benefit1: "Save 10+ hours per week on repetitive tasks",
    benefit2: "Reduce human errors by 95%",
    benefit3: "24/7 automated workflows",
    benefit4: "Custom solutions for your business",

    /* ---------- Workflow titles & summaries ---------- */
    workflow1Title: "Daily Product Intelligence & SEO Enhancement",
    workflow1Description:
      "Automatically analyze competitors and optimize your product listings",
    workflow1BusinessValue:
      "Save more than 4 hours per day on competitor research and SEO copywriting",

    workflow2Title: "Instant Invoice Automation",
    workflow2Description:
      "Convert accepted quotes into professional invoices automatically",
    workflow2BusinessValue:
      "Eliminate over 2 hours of manual invoice creation and accelerate payments",

    workflow3Title: "Intelligent Help Assistant",
    workflow3Description:
      "AI-powered bot that delivers instant answers using your company knowledge base",
    workflow3BusinessValue:
      "Reduce support tickets by up to 60% and provide real-time guidance to your team",

    /* ---------- Workflow 1 nodes ---------- */
    w1n1Title: "Scheduled Trigger",
    w1n1Description: "Executes every day at 3:00 AM",
    w1n1BusinessDescription:
      "A daily alarm for your business-automatically starts the process during off-peak hours",
    w1n1Input: "Timer configured for 03:00 daily",
    w1n1Output: "Workflow initiated ✓",
    w1n1WhyItMatters:
      "Runs when site traffic is minimal, ensuring zero customer impact and removing the need for manual starts.",

    w1n2Title: "Fetch Product List",
    w1n2Description: "Retrieves products from an Excel spreadsheet",
    w1n2BusinessDescription:
      "Opens and reads your product sheet automatically-no manual work required",
    w1n2Input:
      'Excel file: "products.xlsx" (columns: SKU, Product Name, Current Description)',
    w1n2Output:
      "25 products identified for SEO enhancement:\n• ABC-123: Wireless Earbuds\n• DEF-456: Bluetooth Speaker\n• GHI-789: Phone Case",
    w1n2WhyItMatters:
      "Your team can keep using Excel as usual; the workflow syncs effortlessly in the background.",

    w1n3Title: "Scrape Competitor Data",
    w1n3Description: "Collects competitor pricing and descriptions",
    w1n3BusinessDescription:
      "An automated assistant that visits competitor sites and records key details",
    w1n3Input: "Visit competitor.com for each product SKU",
    w1n3Output:
      'Competitor insights captured:\n• Price: $39.99 (ours $35.99)\n• Description: "Premium wireless earbuds with 8-hour battery"\n• Features: Bluetooth 5.2, Noise Cancellation',
    w1n3WhyItMatters:
      "Provides real-time visibility into competitor positioning-work that previously required hours of manual effort.",

    w1n4Title: "AI Copywriter",
    w1n4Description: "Produces SEO-ready descriptions and highlights feature gaps",
    w1n4BusinessDescription:
      "Delivers professional, search-optimized copy in seconds and pinpoints competitive weaknesses",
    w1n4Input:
      'Product info + competitor data + instruction: "Write SEO-optimized description and identify gaps"',
    w1n4Output:
      'New SEO description: "Experience premium wireless sound with our Bluetooth 5.0 earbuds. Crystal-clear audio and 5-hour battery life make them ideal for workouts, commuting, and daily use. Advanced noise-isolation technology included."\n\nCompetitive gap detected: "Competitor offers 8-hour battery vs. our 5-hour battery"',
    w1n4WhyItMatters:
      "Boosts your search rankings and reveals where your products need enhancement-without hiring external copywriters.",

    w1n5Title: "Team Notification",
    w1n5Description: "Sends a summary to your Slack channel",
    w1n5BusinessDescription:
      "Delivers an automated daily report directly to the marketing channel",
    w1n5Input: "Summary of updates and competitor insights",
    w1n5Output:
      "Slack message sent to #marketing:\n\"🔍 Daily Product Update Completed\n✅ 25 products analyzed\n📝 SEO descriptions ready\n⚠️ Key insight: Competitors offer longer battery life\n📊 Full report available in Excel\"",
    w1n5WhyItMatters:
      "Keeps stakeholders informed instantly, eliminating the need to compile separate reports.",

    /* ---------- Workflow 2 nodes ---------- */
    w2n1Title: "Quote Acceptance Trigger",
    w2n1Description: "Fires when a customer accepts a quote",
    w2n1BusinessDescription:
      "Notifies the system the moment a client says \"yes\"-no manual monitoring required",
    w2n1Input: 'Customer "Acme Corp" accepted Quote #2044 for $1,520',
    w2n1Output:
      "Quote accepted ✓\nCustomer: Acme Corp\nAmount: $1,520\nQuote ID: 2044",
    w2n1WhyItMatters:
      "Invoice processing begins instantly, preventing delays and missed billings.",

    w2n2Title: "Prepare Invoice Data",
    w2n2Description: "Structures all required invoice information",
    w2n2BusinessDescription:
      "Auto-populates an invoice template with customer and payment details",
    w2n2Input: "Quote data + current date + invoice number generator",
    w2n2Output:
      "Invoice ready:\n• Invoice #: INV-2044\n• Date: June 25 2025\n• Customer: Acme Corp\n• Amount: $1,520\n• Due: July 25 2025",
    w2n2WhyItMatters:
      "Ensures consistency and accuracy-no more manual data entry errors.",

    w2n3Title: "Generate PDF Invoice",
    w2n3Description: "Creates a branded PDF invoice automatically",
    w2n3BusinessDescription:
      "Design-quality invoices generated without lifting a finger",
    w2n3Input: "Invoice template + customer data + company branding",
    w2n3Output:
      "Professional PDF created:\n• Branding applied ✓\n• Customer details ✓\n• Itemized charges ✓\n• Payment terms ✓\n• File: INV-2044.pdf",
    w2n3WhyItMatters:
      "Delivers consistent, polished invoices every time.",

    w2n4Title: "Send Invoice Email",
    w2n4Description: "Emails the invoice to the customer automatically",
    w2n4BusinessDescription:
      "Acts as a virtual assistant-sending a professional email complete with attachment",
    w2n4Input: "Customer email + PDF invoice + email template",
    w2n4Output:
      'Email dispatched ✓\nTo: accounting@acmecorp.com\nSubject: "Invoice INV-2044 – Payment Due July 25"\nAttachment: INV-2044.pdf',
    w2n4WhyItMatters:
      "Faster invoicing accelerates cash flow and projects professionalism.",

    w2n5Title: "Record in Ledger",
    w2n5Description: "Logs the invoice to your Excel tracker",
    w2n5BusinessDescription:
      "Automatically updates your accounting sheet-no manual bookkeeping",
    w2n5Input: "Invoice details",
    w2n5Output:
      "Added to Invoices.xlsx:\nRow 247: INV-2044 | Jun 25 2025 | Acme Corp | $1,520 | Sent | Due Jul 25\n\nTotals updated:\n• Outstanding: $12,450\n• Invoiced this month: $28,900",
    w2n5WhyItMatters:
      "Provides up-to-date financial visibility without data entry overhead.",

    /* ---------- Workflow 3 nodes ---------- */
    w3n1Title: "Team Question Trigger",
    w3n1Description: "Captures a question via the /ask-bot command",
    w3n1BusinessDescription:
      "Lets team members ask questions without disrupting colleagues",
    w3n1Input:
      'Alex types: "/ask-bot How do I process a customer refund?"',
    w3n1Output:
      "Question received ✓\nUser: @alex\nQuestion: \"How do I process a customer refund?\"\nChannel: #customer-support",
    w3n1WhyItMatters:
      "Employees get immediate assistance while conversations stay organized.",

    w3n2Title: "Search Knowledge Base",
    w3n2Description: "Finds relevant content across company documents",
    w3n2BusinessDescription:
      "Instantly combs through manuals, guides, and policies to locate the right answer",
    w3n2Input: 'Search for "refund process"',
    w3n2Output:
      "Results found:\n• Refund Policy (Section 4)\n• Customer Service Playbook (Page 12)\n• Billing Guide (Chapter 3)",
    w3n2WhyItMatters:
      "Reduces lookup time and ensures answers are sourced from approved material.",

    w3n3Title: "AI Answer Generator",
    w3n3Description: "Produces a clear, step-by-step response with citations",
    w3n3BusinessDescription:
      "Summarizes complex policies into concise guidance",
    w3n3Input: "Knowledge base articles + refund question",
    w3n3Output:
      "**How to process a customer refund:**\n1. Verify order details\n2. Confirm eligibility (within 30 days)\n3. Use Admin > Orders > Refund\n4. Notify customer via email\n\n*Sources: Refund Policy §4, Customer Service Playbook*",
    w3n3WhyItMatters:
      "Provides authoritative, actionable information with transparent sourcing.",

    w3n4Title: "Deliver Private Answer",
    w3n4Description: "Sends the answer privately to the requester",
    w3n4BusinessDescription:
      "Keeps channels uncluttered while ensuring the user gets help",
    w3n4Input: "Formatted answer with citations",
    w3n4Output:
      'Direct message sent to @alex:\n"[Answer details]"\nSources included',
    w3n4WhyItMatters:
      "Personalized support without channel noise.",

    w3n5Title: "Usage Analytics",
    w3n5Description: "Logs every Q&A interaction for continuous improvement",
    w3n5BusinessDescription:
      "Builds a knowledge graph of common questions to refine documentation",
    w3n5Input: "Question metadata and statistics",
    w3n5Output:
      "Recorded in Q&A-Tracking.xlsx:\n• Date: Jun 25 2025\n• User: @alex\n• Response time: 3.2 s\n• Satisfaction: Pending\n\nMonthly stats refreshed: 93% success rate",
    w3n5WhyItMatters:
      "Identifies knowledge gaps and quantifies time saved across the organization."
  },

  ro: {
    /* ---------- General ---------- */
    title: "Soluții Inteligente de Automatizare a Fluxurilor de Lucru",
    subtitle:
      "Optimizează-ți operațiunile prin automatizarea inteligentă a fluxurilor de lucru",
    cta: "Începe Transformarea",
    workflows: "Demonstrații Interactive de Automatizare",
    workflowDescription:
      "Selectează un flux pentru a descoperi cum automatizarea reduce costurile și economisește timp.",
    playDemo: "Rulează Demo",
    resetDemo: "Repornește Demo",
    running: "În derulare…",
    nodeExecuting: "Se execută…",
    nodeCompleted: "Finalizat",
    whyItMatters: "Impact asupra afacerii",
    demoInput: "Intrare",
    demoOutput: "Rezultat",
    startFlow: "Pornește Fluxul",
    viewDetails: "Vezi Detalii",

    /* ---------- Industry Examples ---------- */
    industryTitle: "Exemple de Automatizare pe Industrii",
    industryDescription: "Vezi cum diferiți profesioniști folosesc automatizarea fluxurilor de lucru pentru a-și eficientiza activitățile zilnice. Treci cu mouse-ul peste noduri pentru a vedea ce face fiecare pas.",
    
    marketingTitle: "Manager de Marketing Digital",
    marketingSubtitle: "Digital Marketing Manager",
    marketingDescription: "Califică automat lead-urile, îmbogățește datele și alertează echipa când sosesc prospecți de valoare mare.",
    
    ecommerceTitle: "Proprietar de Magazin Online",
    ecommerceSubtitle: "E-commerce Store Owner", 
    ecommerceDescription: "Monitorizează nivelurile de stoc și recomandă automat produse când se ating pragurile.",
    
    recruitingTitle: "Recrutor",
    recruitingSubtitle: "Recruiter",
    recruitingDescription: "Analizează profilurile candidaților, le punctează automat și trimite email-uri personalizate de contact.",

    integrationsTitle: "Conectează-te cu peste 400 de Servicii",
    integrationsSubtitle: "Integrările populare includ:",
    manyMore: "Multe altele",
    customIntegrations: "Integrări personalizate disponibile: API-uri REST, GraphQL, Webhook-uri, Baze de date, Sisteme enterprise și multe altele",

    /* ---------- Contact page ---------- */
    contactTitle: "Lansează-ți Strategia de Automatizare",
    contactSubtitle:
      "Ești pregătit să îți duci organizația la nivelul următor cu automatizare inteligentă? Hai să discutăm obiectivele tale.",
    contactName: "Nume complet",
    contactEmail: "Adresă de email",
    contactPhone: "Număr de telefon",
    contactCompany: "Nume companie",
    contactMessage: "Spune-ne care sunt obiectivele tale de automatizare",
    contactSubmit: "Trimite mesajul",
    contactInfo: "Date de contact",
    contactPhoneNumber: "+40 (21) 123-4567",
    contactEmailAddress: "salut@bitladssoftware.com",
    contactHours: "Program: Luni-Vineri, 09:00-18:00 EET",
    backToHome: "Înapoi la Pagina Principală",

    /* ---------- Contact page automation benefits ---------- */
    whyChooseTitle: "De ce să alegi Automatizarea Fluxurilor de Lucru?",
    benefit1: "Economisește peste 10 ore pe săptămână la sarcini repetitive",
    benefit2: "Reduce erorile umane cu 95%",
    benefit3: "Fluxuri de lucru automatizate 24/7",
    benefit4: "Soluții personalizate pentru afacerea ta",

    /* ---------- Workflow titles & summaries ---------- */
    workflow1Title: "Inteligență Zilnică de Produs & Optimizare SEO",
    workflow1Description:
      "Analizează automat concurența și optimizează listele de produse",
    workflow1BusinessValue:
      "Economisește peste 4 ore pe zi la cercetarea concurenței și redactarea SEO",

    workflow2Title: "Automatizare Instantanee a Facturilor",
    workflow2Description:
      "Transformă ofertele acceptate în facturi profesionale în mod automat",
    workflow2BusinessValue:
      "Elimină peste 2 ore de creare manuală a facturilor și grăbește încasările",

    workflow3Title: "Asistent Inteligent de Ajutor",
    workflow3Description:
      "Bot AI care oferă răspunsuri instant folosind baza de cunoștințe a companiei",
    workflow3BusinessValue:
      "Reduce tichetele de suport cu până la 60% și oferă ghidaj în timp real echipei",

    /* ---------- Workflow 1 nodes ---------- */
    w1n1Title: "Declanșator Programat",
    w1n1Description: "Rulează zilnic la ora 03:00",
    w1n1BusinessDescription:
      "O alarmă zilnică pentru afacerea ta-pornește procesul în afara orelor de vârf",
    w1n1Input: "Temporizator setat pentru 03:00 în fiecare zi",
    w1n1Output: "Flux pornit ✓",
    w1n1WhyItMatters:
      "Rulează când traficul este minim, eliminând impactul asupra clienților și necesitatea intervenției manuale.",

    w1n2Title: "Preia Lista de Produse",
    w1n2Description: "Citește produsele dintr-un fișier Excel",
    w1n2BusinessDescription:
      "Deschide și citește automat foaia de calcul-fără muncă manuală",
    w1n2Input:
      'Fișier Excel: "products.xlsx" (coloane: SKU, Nume Produs, Descriere Curentă)',
    w1n2Output:
      "25 de produse identificate pentru optimizare SEO:\n• ABC-123: Căști wireless\n• DEF-456: Boxă Bluetooth\n• GHI-789: Husă telefon",
    w1n2WhyItMatters:
      "Echipa poate continua să folosească Excel; fluxul sincronizează datele în fundal.",

    w1n3Title: "Colectează Date despre Concurență",
    w1n3Description: "Adună prețuri și descrieri de pe site-urile concurenților",
    w1n3BusinessDescription:
      "Un asistent automat care vizitează site-urile concurente și înregistrează detalii esențiale",
    w1n3Input: "Vizitează competitor.com pentru fiecare SKU",
    w1n3Output:
      'Informații concurență:\n• Preț: 39,99 $ (noi 35,99 $)\n• Descriere: "Căști wireless premium cu baterie de 8 ore"\n• Caracteristici: Bluetooth 5.2, Anulare zgomot',
    w1n3WhyItMatters:
      "Oferă vizibilitate în timp real asupra poziționării competiției-muncă ce necesita înainte ore întregi.",

    w1n4Title: "Copywriter AI",
    w1n4Description: "Generează descrieri SEO și evidențiază lacunele",
    w1n4BusinessDescription:
      "Oferă text optimizat pentru căutare în câteva secunde și indică punctele slabe față de concurență",
    w1n4Input:
      'Info produs + date concurență + instrucțiune: "Scrie descriere SEO și identifică lacune"',
    w1n4Output:
      'Descriere SEO nouă: "Experimentează sunet wireless premium cu căștile noastre Bluetooth 5.0. Audio clar și baterie de 5 ore-ideale pentru antrenamente, navetă și utilizare zilnică. Tehnologie avansată de izolare a zgomotului."\n\nLacună identificată: "Concurentul oferă baterie de 8 ore vs 5 ore"',
    w1n4WhyItMatters:
      "Îmbunătățește poziționarea în motoarele de căutare și arată unde este nevoie de perfecționare-fără copywriter extern.",

    w1n5Title: "Notificare Echipă",
    w1n5Description: "Trimite un rezumat pe canalul Slack",
    w1n5BusinessDescription:
      "Livrează automat raportul zilnic direct în canalul de marketing",
    w1n5Input: "Rezumat actualizări și informații concurențiale",
    w1n5Output:
      "Mesaj Slack trimis în #marketing:\n\"🔍 Actualizare zilnică produs finalizată\n✅ 25 de produse analizate\n📝 Descrieri SEO gata\n⚠️ Concurenții oferă baterie mai lungă\n📊 Raport complet disponibil în Excel\"",
    w1n5WhyItMatters:
      "Menține instant toți factorii de decizie informați, fără rapoarte suplimentare.",

    /* ---------- Workflow 2 nodes ---------- */
    w2n1Title: "Declanșator Acceptare Ofertă",
    w2n1Description: "Se activează când clientul acceptă o ofertă",
    w2n1BusinessDescription:
      "Anunță sistemul în momentul în care clientul spune „da\"-fără monitorizare manuală",
    w2n1Input: 'Clientul "Acme Corp" a acceptat Oferta #2044 de 1.520 $',
    w2n1Output:
      "Ofertă acceptată ✓\nClient: Acme Corp\nSumă: 1.520 $\nID Ofertă: 2044",
    w2n1WhyItMatters:
      "Procesul de facturare începe instantaneu, prevenind întârzierile și facturile ratate.",

    w2n2Title: "Pregătește Date Factură",
    w2n2Description: "Structează toate informațiile necesare facturii",
    w2n2BusinessDescription:
      "Completează automat șablonul de factură cu datele clientului și de plată",
    w2n2Input: "Date ofertă + data curentă + generator număr factură",
    w2n2Output:
      "Factură pregătită:\n• Nr.: INV-2044\n• Data: 25 iun 2025\n• Client: Acme Corp\n• Sumă: 1.520 $\n• Scadență: 25 iul 2025",
    w2n2WhyItMatters:
      "Asigură coerență și acuratețe-fără erori de introducere manuală.",

    w2n3Title: "Generează Factură PDF",
    w2n3Description: "Creează automat factura PDF cu brandul companiei",
    w2n3BusinessDescription:
      "Facturi de calitate profesională, fără efort suplimentar",
    w2n3Input: "Șablon factură + date client + branding companie",
    w2n3Output:
      "PDF profesional creat:\n• Branding aplicat ✓\n• Detalii client ✓\n• Costuri detaliate ✓\n• Termeni plată ✓\n• Fișier: INV-2044.pdf",
    w2n3WhyItMatters:
      "Toate facturile arată impecabil și uniform.",

    w2n4Title: "Trimite Email cu Factura",
    w2n4Description: "Trimite automat factura către client",
    w2n4BusinessDescription:
      "Acționează ca un asistent virtual-email profesional cu atașament",
    w2n4Input: "Email client + PDF factură + șablon email",
    w2n4Output:
      'Email trimis ✓\nCătre: accounting@acmecorp.com\nSubiect: "Factura INV-2044 – Scadență 25 iulie"\nAtașament: INV-2044.pdf',
    w2n4WhyItMatters:
      "Facturare rapidă = încasări mai rapide și imagine profesională.",

    w2n5Title: "Înregistrează în Registru",
    w2n5Description: "Notează factura în registrul Excel",
    w2n5BusinessDescription:
      "Actualizează automat foaia de contabilitate-fără muncă manuală",
    w2n5Input: "Detalii factură",
    w2n5Output:
      "Adăugat în Invoices.xlsx:\nRând 247: INV-2044 | 25 iun 2025 | Acme Corp | 1.520 $ | Trimisa | Scadentă 25 iul\n\nTotaluri actualizate:\n• Restanțe: 12.450 $\n• Facturat luna aceasta: 28.900 $",
    w2n5WhyItMatters:
      "Vizibilitate financiară în timp real, fără efort suplimentar.",

    /* ---------- Workflow 3 nodes ---------- */
    w3n1Title: "Declanșator Întrebare Echipă",
    w3n1Description: "Preia o întrebare prin comanda /ask-bot",
    w3n1BusinessDescription:
      "Permite echipei să pună întrebări fără a întrerupe colegii",
    w3n1Input:
      'Alex tastează: "/ask-bot Cum procesez o rambursare pentru client?"',
    w3n1Output:
      "Întrebare primită ✓\nUtilizator: @alex\nÎntrebare: \"Cum procesez o rambursare pentru client?\"\nCanal: #customer-support",
    w3n1WhyItMatters:
      "Angajații primesc ajutor imediat, iar conversațiile rămân organizate.",

    w3n2Title: "Căutare în Baza de Cunoștințe",
    w3n2Description: "Găsește informații relevante în documentele companiei",
    w3n2BusinessDescription:
      "Parcurge instant manuale, ghiduri și politici pentru a localiza răspunsul corect",
    w3n2Input: 'Caută "proces rambursare"',
    w3n2Output:
      "Rezultate găsite:\n• Politica de Rambursare (Secțiunea 4)\n• Manual Serviciu Clienți (Pagina 12)\n• Ghid Facturare (Capitolul 3)",
    w3n2WhyItMatters:
      "Reduce timpul de căutare și garantează răspunsuri bazate pe materiale aprobate.",

    w3n3Title: "Generator Răspuns AI",
    w3n3Description: "Furnizează un răspuns clar, pas-cu-pas, cu surse",
    w3n3BusinessDescription:
      "Rezumă politici complexe în ghidaj concis",
    w3n3Input: "Articole bază cunoștințe + întrebare rambursare",
    w3n3Output:
      "**Cum se procesează o rambursare:**\n1. Verifică detaliile comenzii\n2. Confirmă eligibilitatea (30 zile)\n3. Admin > Comenzi > Rambursare\n4. Notifică clientul prin email\n\n*Surse: Politica Rambursare §4, Manual Serviciu Clienți*",
    w3n3WhyItMatters:
      "Oferă informații oficiale, ușor de pus în practică, cu surse transparente.",

    w3n4Title: "Trimite Răspuns Privat",
    w3n4Description:
      "Expediază răspunsul în privat persoanei care a întrebat",
    w3n4BusinessDescription:
      "Menține canalele curate și asigură suport personalizat",
    w3n4Input: "Răspuns formatat cu surse",
    w3n4Output:
      'Mesaj privat trimis către @alex:\n"[Detalii răspuns]"\nSurse incluse',
    w3n4WhyItMatters:
      "Sprijin individual fără a încărca discuțiile publice.",

    w3n5Title: "Analitice de Utilizare",
    w3n5Description:
      "Înregistrează fiecare interacțiune Q&A pentru îmbunătățire continuă",
    w3n5BusinessDescription:
      "Creează o bază de cunoștințe despre întrebările frecvente pentru a rafina documentația",
    w3n5Input: "Metadate întrebare și statistici",
    w3n5Output:
      "Înregistrat în Q&A-Tracking.xlsx:\n• Data: 25 iun 2025\n• Utilizator: @alex\n• Timp răspuns: 3,2 s\n• Satisfacție: În așteptare\n\nStatistici lunare actualizate: 93% răspunsuri de succes",
    w3n5WhyItMatters:
      "Identifică lacunele de cunoștințe și cuantifică timpul economisit în organizație."
  }
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguage] = useState<Language>('en');

  const t = (key: string): string => {
    return translations[language][key as keyof typeof translations['en']] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}