/**
 * Generator for js/data.js — covered markets only (14).
 * Run: node tools/generate-data.js
 */
const fs = require("fs");
const path = require("path");

function slugify(name) {
  return name
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

/** Covered African markets (12) */
const AFRICA = [
  "Angola",
  "Egypt",
  "Equatorial Guinea",
  "Ghana",
  "Kenya",
  "Madagascar",
  "Namibia",
  "Nigeria",
  "South Africa",
  "Tanzania",
  "Zambia",
  "Zimbabwe",
];

const META = {
  Angola: { currency: "AOA", regulator: "Guiché Único da Empresa / Conservatória do Registo Comercial" },
  Egypt: { currency: "EGP", regulator: "GAFI / Commercial Registry" },
  "Equatorial Guinea": { currency: "XAF", regulator: "Commercial Registry / OHADA RCCM" },
  Ghana: { currency: "GHS", regulator: "ORC (Office of the Registrar of Companies)" },
  Kenya: { currency: "KES", regulator: "BRS (Business Registration Service)" },
  Madagascar: { currency: "MGA", regulator: "EDBM / Commercial Registry" },
  Namibia: { currency: "NAD", regulator: "BIPA (Business and Intellectual Property Authority)" },
  Nigeria: { currency: "NGN", regulator: "CAC (Corporate Affairs Commission)" },
  "South Africa": { currency: "ZAR", regulator: "CIPC (Companies and Intellectual Property Commission)" },
  Tanzania: { currency: "TZS", regulator: "BRELA (Business Registrations and Licensing Agency)" },
  Zambia: { currency: "ZMW", regulator: "PACRA (Patents and Companies Registration Agency)" },
  Zimbabwe: { currency: "USD", regulator: "Companies and Intellectual Property Office (CIPO/CR)" },
  Canada: { currency: "CAD", regulator: "Corporations Canada (federal) / provincial registries" },
  "United States": { currency: "USD", regulator: "State Secretary of State / LLC & corp registries" },
};

/** Hand-tuned drafts for every covered market */
const RICH = {
  Nigeria: {
    entities: [
      {
        type: "Private Limited Company",
        localName: "Ltd",
        requirements: [
          "Proposed company name (availability check on CAC portal)",
          "Memorandum & Articles of Association",
          "At least 2 directors (1 may be foreign; local director often recommended for banking)",
          "At least 1 shareholder (can be same as director)",
          "Registered office address in Nigeria",
          "Particulars of directors/shareholders (names, addresses, ID)",
          "Statement of share capital and share allotment",
          "Means of ID for directors/shareholders (NIN, passport, etc.)",
          "TIN will be issued after incorporation (FIRS)",
        ],
        costs: [
          { item: "Name reservation", amount: "≈ ₦500–₦5,000", note: "Portal fees change; confirm on CAC" },
          { item: "CAC filing / stamp", amount: "≈ ₦10,000–₦50,000+", note: "Scales with authorised share capital" },
          { item: "Professional / agent fees", amount: "≈ ₦50,000–₦250,000", note: "Market rates vary widely" },
          { item: "Common seal / misc.", amount: "≈ ₦5,000–₦20,000", note: "Optional extras" },
        ],
        timeline: "Often 1–10 business days online if documents are complete",
      },
      {
        type: "Business Name",
        localName: "BN / Enterprise",
        requirements: [
          "Proposed business name",
          "Proprietor particulars and ID",
          "Nature of business",
          "Business address in Nigeria",
        ],
        costs: [
          { item: "CAC business name registration", amount: "≈ ₦5,000–₦15,000", note: "Draft — verify current portal fee" },
          { item: "Professional fees", amount: "≈ ₦20,000–₦80,000", note: "Optional" },
        ],
        timeline: "Often a few days online",
      },
      {
        type: "Public Limited Company",
        localName: "Plc",
        requirements: [
          "Higher capital and disclosure requirements than Ltd",
          "Minimum number of directors/shareholders per CAMA",
          "Memorandum & Articles suited to public company",
          "Often additional SEC/NSE steps if listing later",
        ],
        costs: [
          { item: "CAC / capital-related fees", amount: "Higher than Ltd", note: "Depends on share capital" },
          { item: "Professional / legal", amount: "₦500,000+", note: "Complex — use counsel" },
        ],
        timeline: "Weeks, depending on complexity",
      },
      {
        type: "Company Limited by Guarantee",
        localName: "Ltd/Gte (often NGOs)",
        requirements: [
          "Objects typically non-profit",
          "Guarantors instead of share capital",
          "CAC approval may involve additional scrutiny",
          "Constitution / articles aligned to guarantee model",
        ],
        costs: [
          { item: "CAC + professional package", amount: "≈ ₦100,000–₦400,000", note: "Very approximate" },
        ],
        timeline: "Often longer than standard Ltd",
      },
    ],
    notes: "Draft — verify current CAC portal fees and CAMA rules. Post-incorporation: TIN, SCUML (if applicable), sector licences (NUPRC, etc.).",
  },

  Ghana: {
    entities: [
      {
        type: "Wholly Foreign-Owned Company",
        localName: "Ltd (100% non-Ghanaian)",
        requirements: [
          "Passport biodata page of all shareholders and directors",
          "Residential address and contact details of shareholders and directors",
          "Proposed company name (at most three options) for availability check",
          "Description of intended business activities",
          "Shareholding structure",
          "Passport photographs of directors/shareholders",
          "Proof of address",
          "Details of authorised representative (if applicable)",
          "Registered office address in Ghana",
          "Details of at least one resident director (Ghana typically requires this — local nominee may be needed)",
          "Company Secretary appointment (typically Ghana-resident or a qualified local secretary)",
          "GIPC (Ghana Investment Promotion Centre) registration for foreign-owned entities",
          "TIN application details for each director/shareholder",
          "Confirm current GIPC minimum paid-up capital threshold for foreign-owned companies",
        ],
        costs: [
          { item: "Stated capital fee (20,000 × 0.01)", amount: "GHS 200", note: "Local quote — stated capital example" },
          { item: "Fee", amount: "GHS 585", note: "Statutory / filing" },
          { item: "Auditors letter", amount: "GHS 900", note: "Local quote" },
          { item: "Declaration (800 × 2)", amount: "GHS 1,600", note: "Local quote" },
          { item: "Forms", amount: "GHS 300", note: "Local quote" },
          { item: "TIN (80 × 2)", amount: "GHS 16", note: "As quoted — verify arithmetic / current GRA fees" },
          { item: "Premium", amount: "GHS 1,300", note: "Local quote" },
          { item: "Total statutory package", amount: "GHS 4,631", note: "As quoted locally; separate from professional fees" },
          { item: "Initial consultation fee", amount: "USD 300", note: "Payable on or before client meeting" },
          { item: "Professional legal fee (incorporation)", amount: "USD 1,500–2,000", note: "Excludes government/disbursements" },
          { item: "GIPC registration fees", amount: "At cost", note: "Where applicable; official receipts" },
          { item: "Sector-specific licences / permits", amount: "At cost", note: "Quoted separately if needed" },
        ],
        timeline: "15–20 working days, subject to complete information and regulatory approvals",
      },
      {
        type: "Mixed Ownership Company",
        localName: "Ltd (Ghanaian + foreign, e.g. Nigerian)",
        requirements: [
          "Passport biodata page of Nigerian / foreign shareholders and directors",
          "Ghana Card details of Ghanaian shareholders and directors",
          "Residential address and contact details",
          "Proposed company name (at most three options)",
          "Description of business activities",
          "Shareholding structure",
          "Passport photographs",
          "Proof of Ghanaian shareholder's stake / contribution",
          "Shareholders' agreement / structure between the parties",
          "Registered office address in Ghana",
          "May qualify for lower minimum capital than 100% foreign-owned, depending on sector — confirm with GIPC / counsel",
        ],
        costs: [
          { item: "Stated capital fee (20,000 × 0.01)", amount: "GHS 200", note: "Local quote — stated capital example" },
          { item: "Fee", amount: "GHS 585", note: "Statutory / filing" },
          { item: "Auditors letter", amount: "GHS 900", note: "Local quote" },
          { item: "Declaration (800 × 2)", amount: "GHS 1,600", note: "Local quote" },
          { item: "Forms", amount: "GHS 300", note: "Local quote" },
          { item: "TIN (80 × 2)", amount: "GHS 16", note: "As quoted — verify arithmetic / current GRA fees" },
          { item: "Premium", amount: "GHS 1,300", note: "Local quote" },
          { item: "Total statutory package", amount: "GHS 4,631", note: "As quoted locally; separate from professional fees" },
          { item: "Initial consultation fee", amount: "USD 300", note: "Payable on or before client meeting" },
          { item: "Professional legal fee (incorporation)", amount: "USD 1,300–1,800", note: "Excludes government/disbursements" },
          { item: "Applicable regulatory fees", amount: "At cost", note: "Official receipts" },
        ],
        timeline: "15–20 working days, subject to complete information and regulatory approvals",
      },
      {
        type: "Wholly Ghanaian-Owned Company",
        localName: "Ltd (100% Ghanaian)",
        requirements: [
          "Ghana Card details of shareholders and directors",
          "Residential and business addresses",
          "Proposed company name (three options)",
          "Nature of business",
          "Shareholding structure",
          "Contact details",
          "Standard incorporation only — no foreign minimum capital threshold",
          "No GIPC registration required for wholly Ghanaian-owned",
        ],
        costs: [
          { item: "Stated capital fee (20,000 × 0.01)", amount: "GHS 200", note: "Local quote — stated capital example" },
          { item: "Fee", amount: "GHS 585", note: "Statutory / filing" },
          { item: "Auditors letter", amount: "GHS 900", note: "Local quote" },
          { item: "Declaration (800 × 2)", amount: "GHS 1,600", note: "Local quote" },
          { item: "Forms", amount: "GHS 300", note: "Local quote" },
          { item: "TIN (80 × 2)", amount: "GHS 16", note: "As quoted — verify arithmetic / current GRA fees" },
          { item: "Premium", amount: "GHS 1,300", note: "Local quote" },
          { item: "Total statutory package", amount: "GHS 4,631", note: "As quoted locally; separate from professional fees" },
          { item: "Initial consultation fee", amount: "USD 300", note: "Payable on or before client meeting" },
          { item: "Professional legal fee (incorporation)", amount: "USD 1,000–1,500", note: "Excludes government/disbursements" },
          { item: "Statutory registration fees", amount: "At cost", note: "Official receipts" },
        ],
        timeline: "10–15 working days, subject to complete information and regulatory approvals",
      },
    ],
    notes:
      "Verified local notes. Professional fees exclude government filing fees, taxes, and disbursements (charged at actual cost with receipts). Consultation fees payable on or before the client meeting. Package typically covers: preliminary legal advice; name reservation; preparation and filing; liaison with ORC; procurement of certificates and statutory documents. Post-incorporation (governance, immigration, tax advisory, sector licences) quoted separately. Confirm current GIPC capital thresholds with counsel before quoting foreign-owned deals.",
  },

  Kenya: {
    entities: [
      {
        type: "Kenyan Subsidiary",
        localName: "Private Limited Company (Ltd)",
        requirements: [
          "Signed Memorandum of Association and Articles of Association",
          "At least one director who is a natural person ordinarily resident in Kenya (foreign/Nigerian client often cannot fill this alone — local nominee may be needed)",
          "At least one shareholder",
          "Registered office address in Kenya",
        ],
        costs: [
          {
            item: "Preliminary advisory (branch vs subsidiary, operating model, regulatory)",
            amount: "Professional KES 40,000 · Gov N/A",
            note: "Deliverable: Legal and Tax Advisory Memo",
          },
          {
            item: "Registration of the legal entity",
            amount: "Gov KES 10,500 · Professional KES 70,000",
            note: "Deliverable: Certificate of incorporation and CR12",
          },
          {
            item: "KRA PIN registration",
            amount: "Professional KES 20,000 · Gov N/A",
            note: "Deliverable: KRA PIN Certificate",
          },
          {
            item: "Social security + business permit",
            amount: "Gov KES 8,000 · Professional KES 60,000",
            note: "Deliverable: NSSF and SHA registration certificates; Business Permit",
          },
          {
            item: "Total government filing fees (if all lines)",
            amount: "KES 18,500",
            note: "10,500 + 8,000 from local counsel quote",
          },
          {
            item: "Total professional fees (if all lines)",
            amount: "KES 190,000",
            note: "40,000 + 70,000 + 20,000 + 60,000",
          },
          {
            item: "Combined package (if all lines)",
            amount: "KES 208,500",
            note: "Government + professional; refine once timeline/support confirmed",
          },
        ],
        timeline: "Refine with counsel once anticipated timeline and support level are confirmed",
      },
      {
        type: "Branch of Foreign Company",
        localName: "Kenya branch / foreign company registration",
        requirements: [
          "Certified copy of the current certificate of incorporation or registration of the foreign company in its country of origin (e.g. Nigeria CAC), or equivalent",
          "The company's memorandum and articles of association",
          "Information concerning the company's directors and secretary including passport or ID numbers, passport photos, residential address, and postal address",
          "Details of the company's local representative(s) in Kenya",
          "Information concerning the company's place(s) of business in Kenya",
          "The company's proposed name for conducting business in Kenya",
        ],
        costs: [
          {
            item: "Preliminary advisory (branch vs subsidiary, operating model, regulatory)",
            amount: "Professional KES 40,000 · Gov N/A",
            note: "Deliverable: Legal and Tax Advisory Memo",
          },
          {
            item: "Registration of the legal entity",
            amount: "Gov KES 10,500 · Professional KES 70,000",
            note: "Deliverable: Certificate of incorporation and CR12 (or branch registration equivalents as applicable)",
          },
          {
            item: "KRA PIN registration",
            amount: "Professional KES 20,000 · Gov N/A",
            note: "Deliverable: KRA PIN Certificate",
          },
          {
            item: "Social security + business permit",
            amount: "Gov KES 8,000 · Professional KES 60,000",
            note: "Deliverable: NSSF and SHA registration certificates; Business Permit",
          },
          {
            item: "Total government filing fees (if all lines)",
            amount: "KES 18,500",
            note: "From local counsel quote",
          },
          {
            item: "Total professional fees (if all lines)",
            amount: "KES 190,000",
            note: "From local counsel quote",
          },
          {
            item: "Combined package (if all lines)",
            amount: "KES 208,500",
            note: "Quote covers establishing presence; refine by structure once confirmed",
          },
        ],
        timeline: "Refine with counsel once anticipated timeline and support level are confirmed",
      },
    ],
    notes:
      "Verified local notes. A foreign company can set up in Kenya as a subsidiary or a branch — counsel advises on structure first. Professional fees are separate from government filing fees. Fee quote may be refined once timeline and level of support are clearer. Package lines already include KRA PIN, NSSF/SHA, and business permit assistance.",
  },

  "South Africa": {
    entities: [
      {
        type: "Private Company",
        localName: "Pty Ltd",
        requirements: [
          "Name reservation (optional but common) via CIPC",
          "MOI (Memorandum of Incorporation)",
          "At least 1 director",
          "Shareholders particulars",
          "Registered address in South Africa",
          "ID / passport copies; FICA-related info for banking",
        ],
        costs: [
          { item: "CIPC name reservation", amount: "≈ R50–R100", note: "Confirm CIPC" },
          { item: "Incorporation (new company)", amount: "≈ R125–R475", note: "Online fee schedule changes" },
          { item: "Professional / accountant package", amount: "≈ R1,500–R8,000", note: "Market rates" },
        ],
        timeline: "Often same day to a few days online",
      },
      {
        type: "Sole Proprietorship",
        localName: "Trading in own name",
        requirements: [
          "No separate CIPC company registration required",
          "Tax registration with SARS as needed",
          "Industry licences / municipal permits as applicable",
        ],
        costs: [
          { item: "CIPC company fee", amount: "N/A", note: "Not a company" },
          { item: "Tax / licence setup", amount: "Varies", note: "SARS + municipal" },
        ],
        timeline: "Depends on licences",
      },
      {
        type: "Non-Profit Company",
        localName: "NPC",
        requirements: [
          "MOI suited to non-profit objects",
          "Directors / incorporators",
          "CIPC NPC registration",
        ],
        costs: [
          { item: "CIPC + professional", amount: "≈ R2,000–R10,000", note: "Approximate" },
        ],
        timeline: "Days to a few weeks",
      },
    ],
    notes: "Draft — after CIPC: SARS income tax / VAT as needed, UIF, COIDA, B-BBEE if relevant.",
  },

  Egypt: {
    entities: [
      {
        type: "Limited Liability Company",
        localName: "LLC (Sharikat That Masouliyyah Mahdooda)",
        requirements: [
          "Company name clearance",
          "Articles of association (often notarised)",
          "Minimum capital rules (confirm current GAFI thresholds)",
          "Managers / partners particulars and IDs",
          "Registered address in Egypt",
          "GAFI / Commercial Registry filings",
          "Tax card and social insurance registrations follow",
        ],
        costs: [
          { item: "GAFI / registry fees", amount: "≈ EGP 1,000–10,000+", note: "Varies by capital & lawyer" },
          { item: "Legal / notary package", amount: "≈ EGP 10,000–50,000+", note: "Market rates" },
        ],
        timeline: "Often 1–4 weeks",
      },
      {
        type: "Joint Stock Company",
        localName: "JSC",
        requirements: [
          "Higher capital and governance requirements",
          "Founders agreement and articles",
          "GAFI approvals as applicable",
        ],
        costs: [
          { item: "Capital + legal setup", amount: "Higher than LLC", note: "Use local counsel" },
        ],
        timeline: "Several weeks to months",
      },
      {
        type: "Branch of Foreign Company",
        localName: "Branch",
        requirements: [
          "Parent company documents (legalised / apostilled)",
          "Local manager",
          "GAFI branch registration",
        ],
        costs: [
          { item: "Registration + legal", amount: "EGP tens of thousands+", note: "Deal-dependent" },
        ],
        timeline: "Several weeks",
      },
    ],
    notes: "Draft — investment law incentives may apply via GAFI; verify capital minima and Arabic document needs.",
  },

  Angola: {
    entities: [
      {
        type: "Sociedade por Quotas",
        localName: "Lda (private limited equivalent)",
        requirements: [
          "Company name certificate from Ficheiro Central de Denominações",
          "Pacto social (articles) — often notarised",
          "Quota holders and managers with IDs / passports",
          "Registered seat (sede) in Angola",
          "Filing at Guiché Único da Empresa / Conservatória",
          "NIF (tax number) for the company and often partners",
          "Bank capital deposit evidence where required",
        ],
        costs: [
          { item: "Name certificate + registry fees", amount: "≈ AOA 50,000–250,000", note: "Confirm current Guiché Único schedule" },
          { item: "Notary / lawyer package", amount: "≈ AOA 200,000–1,000,000+", note: "Often the larger cost" },
          { item: "Professional / agent fees", amount: "USD 500–2,000 equivalent common", note: "Market rates for foreign clients" },
        ],
        timeline: "Often 1–4 weeks if documents and NIF steps are complete",
      },
      {
        type: "Sociedade Anónima",
        localName: "SA",
        requirements: [
          "Higher capital and governance than Lda",
          "Pacto social suited to SA form",
          "Board / statutory bodies as required",
          "Commercial registry filing",
        ],
        costs: [
          { item: "Legal + registry package", amount: "Higher than Lda", note: "Use local counsel" },
        ],
        timeline: "Several weeks",
      },
      {
        type: "Empresário em Nome Individual",
        localName: "Sole trader",
        requirements: [
          "Individual trader registration",
          "National ID / passport and address",
          "NIF and activity licensing as applicable",
        ],
        costs: [
          { item: "Registration", amount: "Lower than Lda", note: "Draft — confirm Guiché Único" },
        ],
        timeline: "Days to 2 weeks",
      },
    ],
    notes: "Draft — Portuguese documentation is standard. Foreign investment may need additional AIPEX / sector steps — verify locally.",
  },

  "Equatorial Guinea": {
    entities: [
      {
        type: "Société à Responsabilité Limitée",
        localName: "SARL (private limited / OHADA)",
        requirements: [
          "Company name and corporate objects",
          "Statutes under OHADA Uniform Act on Commercial Companies",
          "Shareholder(s) and gérant (manager) particulars",
          "Registered office in Equatorial Guinea",
          "Notarisation of statutes (typical)",
          "RCCM registration via Commercial Registry / one-stop where available",
          "Tax identification after incorporation",
          "Spanish and/or French filings — confirm local practice (bilingual environment)",
        ],
        costs: [
          { item: "RCCM / registry fees", amount: "≈ XAF 50,000–200,000", note: "Wide variance — confirm locally" },
          { item: "Notary / legal fees", amount: "≈ XAF 200,000–800,000+", note: "Often the main cost" },
          { item: "Capital deposit", amount: "Per statutes", note: "OHADA minimum capital rules eased — confirm current practice" },
        ],
        timeline: "Often 2–4 weeks if notarisation and registry slots align",
      },
      {
        type: "Société Anonyme",
        localName: "SA",
        requirements: [
          "Board / higher governance under OHADA",
          "Statutes and capital suited to SA",
          "RCCM registration and notary involvement",
        ],
        costs: [
          { item: "Legal + registry package", amount: "Higher than SARL", note: "Use local counsel" },
        ],
        timeline: "Several weeks",
      },
      {
        type: "Entreprise Individuelle",
        localName: "Sole trader",
        requirements: [
          "Trader registration / RCCM as applicable",
          "National ID and address",
          "Tax file after registration",
        ],
        costs: [
          { item: "Registration", amount: "≈ XAF 25,000–100,000", note: "Draft" },
        ],
        timeline: "1–3 weeks",
      },
    ],
    notes: "Draft — OHADA applies. Oil/gas and foreign investment often need extra ministry / ANIP-style steps — verify before quoting clients.",
  },

  Namibia: {
    entities: [
      {
        type: "Private Company",
        localName: "Pty Ltd",
        requirements: [
          "Name reservation with BIPA",
          "Memorandum of Incorporation / incorporation documents",
          "At least 1 director",
          "Shareholder particulars",
          "Registered address in Namibia",
          "ID / passport copies for directors and shareholders",
        ],
        costs: [
          { item: "BIPA name reservation", amount: "≈ NAD 50–150", note: "Confirm BIPA tariff" },
          { item: "Incorporation filing", amount: "≈ NAD 100–500", note: "Confirm current schedule" },
          { item: "Professional / agent fees", amount: "≈ NAD 2,000–10,000", note: "Market rates" },
        ],
        timeline: "Often a few days to 2 weeks",
      },
      {
        type: "Close Corporation",
        localName: "CC (legacy — confirm if still registrable)",
        requirements: [
          "Historically popular small-business form",
          "Confirm with BIPA whether new CCs are still accepted",
          "Members and founding statement if still available",
        ],
        costs: [
          { item: "Filing + professional", amount: "Similar band to Pty Ltd", note: "Verify availability first" },
        ],
        timeline: "Days to 2 weeks if still offered",
      },
      {
        type: "Sole Proprietorship",
        localName: "Trading in own name",
        requirements: [
          "No separate Pty registration required",
          "Tax registration with Inland Revenue as needed",
          "Municipal / sector licences as applicable",
        ],
        costs: [
          { item: "Company registry fee", amount: "N/A", note: "Not a company" },
          { item: "Licence / tax setup", amount: "Varies", note: "Municipal + tax" },
        ],
        timeline: "Depends on licences",
      },
    ],
    notes: "Draft — after BIPA: tax registration, possible SSC, and sector licences. Aligns closely with South African-style practice.",
  },

  Tanzania: {
    entities: [
      {
        type: "Private Limited Company",
        localName: "Ltd",
        requirements: [
          "Name clearance via BRELA online portal",
          "Memorandum & Articles of Association",
          "Directors and shareholders particulars + IDs / passports",
          "Registered office in Tanzania (Mainland vs Zanzibar — separate regimes)",
          "Statement of share capital",
          "Taxpayer Identification Number (TIN) process with TRA",
        ],
        costs: [
          { item: "BRELA name search / filing", amount: "≈ TZS 50,000–300,000+", note: "Confirm BRELA fee schedule" },
          { item: "Professional / legal fees", amount: "≈ TZS 200,000–1,500,000", note: "Market rates" },
          { item: "Stamp duty on capital (if applicable)", amount: "Varies", note: "Confirm current rules" },
        ],
        timeline: "About 1–3 weeks on Mainland when file is complete",
      },
      {
        type: "Business Name / Sole Proprietorship",
        localName: "Enterprise",
        requirements: [
          "Business name registration with BRELA",
          "Proprietor ID and address",
          "Nature of business",
          "TIN with TRA",
        ],
        costs: [
          { item: "BRELA business name fee", amount: "≈ TZS 20,000–100,000", note: "Draft" },
          { item: "Professional fees", amount: "≈ TZS 100,000–500,000", note: "Optional" },
        ],
        timeline: "Several days to 2 weeks",
      },
      {
        type: "Branch of Foreign Company",
        localName: "Foreign company registration",
        requirements: [
          "Certified parent company documents",
          "Local representative in Tanzania",
          "BRELA foreign company forms",
          "Registered office in Tanzania",
        ],
        costs: [
          { item: "Filing + legal", amount: "≈ TZS 500,000–2,000,000+", note: "Complexity-driven" },
        ],
        timeline: "2–6 weeks typical",
      },
    ],
    notes: "Draft — Mainland BRELA vs Zanzibar BPRA are different. Post-incorporation: TRA TIN, business licence, sector permits (e.g. mining, tourism).",
  },

  Zambia: {
    entities: [
      {
        type: "Private Limited Company",
        localName: "Ltd",
        requirements: [
          "Name clearance via PACRA",
          "Incorporation forms and articles / constitution",
          "At least 1 director and shareholders (confirm Companies Act minima)",
          "Registered office in Zambia",
          "ID / passport copies and residential addresses",
          "Beneficial ownership disclosure where required",
        ],
        costs: [
          { item: "PACRA name search", amount: "≈ ZMW 50–200", note: "Confirm PACRA" },
          { item: "Incorporation fees", amount: "≈ ZMW 300–2,000+", note: "May relate to share capital" },
          { item: "Professional fees", amount: "≈ ZMW 1,500–10,000", note: "Market rates" },
        ],
        timeline: "About 1–2 weeks typical",
      },
      {
        type: "Business Name",
        localName: "Sole trader / enterprise",
        requirements: [
          "Business name application at PACRA",
          "Proprietor particulars and ID",
          "Nature of business and address",
        ],
        costs: [
          { item: "PACRA business name fee", amount: "≈ ZMW 100–500", note: "Draft" },
          { item: "Professional fees", amount: "≈ ZMW 500–3,000", note: "Optional" },
        ],
        timeline: "A few days to 1 week",
      },
      {
        type: "Public Limited Company",
        localName: "Plc",
        requirements: [
          "Higher disclosure and capital expectations than private Ltd",
          "PACRA public company filings",
          "Additional regulatory steps if listing later",
        ],
        costs: [
          { item: "PACRA + professional", amount: "Higher than private Ltd", note: "Use counsel" },
        ],
        timeline: "Several weeks",
      },
    ],
    notes: "Draft — after PACRA: ZRA taxpayer registration, NAPSA/NHIMA for employees, sector licences as needed.",
  },

  Zimbabwe: {
    entities: [
      {
        type: "Private Limited Company",
        localName: "Private company",
        requirements: [
          "Name search with Companies and Intellectual Property Office",
          "Memorandum & Articles of Association",
          "Directors and shareholders particulars",
          "Registered office in Zimbabwe",
          "ID / passport copies",
          "Forms prescribed under Companies and Other Business Entities Act",
        ],
        costs: [
          { item: "Name search / reservation", amount: "Often USD-denominated", note: "Confirm CIPO tariff (fees frequently quoted in USD)" },
          { item: "Incorporation filing", amount: "≈ USD 50–200+", note: "Draft — verify current schedule" },
          { item: "Professional / legal fees", amount: "≈ USD 150–600+", note: "Market rates" },
        ],
        timeline: "Often 1–3 weeks",
      },
      {
        type: "Private Business Corporation",
        localName: "PBC",
        requirements: [
          "Simpler small-business vehicle under local law",
          "Members and founding documents as prescribed",
          "Registered office particulars",
        ],
        costs: [
          { item: "Registry + professional", amount: "Often lower than private company", note: "Confirm CIPO" },
        ],
        timeline: "About 1–2 weeks",
      },
      {
        type: "Public Limited Company",
        localName: "Public company",
        requirements: [
          "Higher capital / disclosure requirements",
          "CIPO public company filings",
          "Possible ZSE steps if listing later",
        ],
        costs: [
          { item: "Filing + legal", amount: "Higher than private company", note: "Use counsel" },
        ],
        timeline: "Several weeks",
      },
    ],
    notes: "Draft — fees and FX practice change often; many practitioners quote in USD. Post-incorporation: ZIMRA tax, NSSA, sector licences.",
  },

  Madagascar: {
    entities: [
      {
        type: "Société à Responsabilité Limitée",
        localName: "SARL",
        requirements: [
          "Company name clearance",
          "Statutes (statuts) — French commonly used",
          "Associés (shareholders) and gérant particulars + IDs",
          "Registered office (siège social) in Madagascar",
          "Filing via EDBM one-stop shop / Commercial Registry",
          "Tax identification (NIF) and statistical registration follow",
          "Capital deposit evidence where required",
        ],
        costs: [
          { item: "EDBM / registry package", amount: "≈ MGA 200,000–1,000,000+", note: "Confirm EDBM current schedule" },
          { item: "Notary / lawyer fees", amount: "≈ MGA 500,000–2,500,000+", note: "Market rates; often the larger cost" },
          { item: "Professional / agent (foreign clients)", amount: "USD 400–1,500 equivalent common", note: "Draft" },
        ],
        timeline: "Often 2–4 weeks through EDBM when complete",
      },
      {
        type: "Société Anonyme",
        localName: "SA",
        requirements: [
          "Higher capital and board requirements than SARL",
          "Statutes suited to SA form",
          "EDBM / registry filings",
        ],
        costs: [
          { item: "Legal + registry", amount: "Higher than SARL", note: "Use local counsel" },
        ],
        timeline: "Several weeks",
      },
      {
        type: "Entreprise Individuelle",
        localName: "Sole trader",
        requirements: [
          "Individual trader / professional registration",
          "National ID and address",
          "Tax and statistical numbers",
        ],
        costs: [
          { item: "Registration", amount: "Lower than SARL", note: "Draft — confirm EDBM" },
        ],
        timeline: "1–3 weeks",
      },
    ],
    notes: "Draft — EDBM is the usual one-stop entry point. Free-zone / large investment projects may use different tracks — verify.",
  },

  Canada: {
    entities: [
      {
        type: "Federal Corporation",
        localName: "Canada Business Corporations Act (CBCA)",
        requirements: [
          "NUANS name search (or numbered company)",
          "Articles of Incorporation",
          "At least 1 director (25% Canadian resident rule may apply — confirm current CBCA)",
          "Registered office in Canada",
          "Individuals with significant control (ISC) register",
        ],
        costs: [
          { item: "Corporations Canada filing", amount: "≈ CAD 200 (online) / 250+ paper", note: "Confirm current fees" },
          { item: "NUANS search", amount: "≈ CAD 20–50", note: "If named corp" },
          { item: "Legal / registered agent extras", amount: "≈ CAD 300–1,500+", note: "Optional packages" },
        ],
        timeline: "Often same day online",
      },
      {
        type: "Provincial / Territorial Corporation",
        localName: "e.g. Ontario, BC, Alberta corp",
        requirements: [
          "Articles under provincial statute",
          "Name search rules vary by province",
          "Director / address requirements per province",
          "Extra-provincial registration if operating in other provinces",
        ],
        costs: [
          { item: "Provincial filing", amount: "≈ CAD 100–400", note: "Varies by province" },
          { item: "Professional fees", amount: "≈ CAD 300–2,000", note: "Market rates" },
        ],
        timeline: "Same day to a few days",
      },
      {
        type: "Sole Proprietorship",
        localName: "Business name registration",
        requirements: [
          "May register trade name with province if not using legal name",
          "Business number / CRA tax accounts as needed",
        ],
        costs: [
          { item: "Provincial name registration", amount: "≈ CAD 0–100+", note: "Province-specific" },
        ],
        timeline: "Same day to a week",
      },
    ],
    notes: "Draft — federal vs provincial choice depends on brand and where you operate. CRA business number after incorporation.",
  },

  "United States": {
    entities: [
      {
        type: "Limited Liability Company",
        localName: "LLC (state-level)",
        requirements: [
          "Choose state of formation (e.g. Delaware, Wyoming, home state)",
          "Certificate / Articles of Organization",
          "Registered agent in the formation state",
          "Operating Agreement (strongly recommended; sometimes required)",
          "EIN from IRS",
          "State foreign qualification if operating elsewhere",
        ],
        costs: [
          { item: "State filing fee", amount: "≈ USD 50–500", note: "Varies widely by state" },
          { item: "Registered agent (annual)", amount: "≈ USD 50–300/year", note: "Required if no in-state address" },
          { item: "Annual report / franchise tax", amount: "USD 0–300+", note: "Delaware franchise tax can be higher for corps" },
          { item: "Professional formation package", amount: "≈ USD 100–1,000", note: "Optional" },
        ],
        timeline: "Same day to 2 weeks (expedites available)",
      },
      {
        type: "C-Corporation",
        localName: "C-Corp",
        requirements: [
          "Articles of Incorporation",
          "Bylaws, board, stock issuance records",
          "Registered agent",
          "EIN; possible S-corp election later (Form 2553) if eligible",
        ],
        costs: [
          { item: "State filing", amount: "≈ USD 50–300+", note: "State-dependent" },
          { item: "Legal setup", amount: "≈ USD 500–5,000+", note: "If using counsel" },
        ],
        timeline: "Days to a few weeks",
      },
      {
        type: "Sole Proprietorship / DBA",
        localName: "DBA / assumed name",
        requirements: [
          "Often county/state assumed-name filing",
          "EIN optional in some cases; needed for employees/banking preferences",
        ],
        costs: [
          { item: "DBA filing", amount: "≈ USD 10–100", note: "Local rules" },
        ],
        timeline: "Days",
      },
    ],
    notes: "Draft — US formation is state-driven. Budget for registered agent, annual reports, and possible sales-tax / foreign qualification.",
  },
};

function buildCountry(name, region) {
  const meta = META[name];
  const rich = RICH[name];
  if (!meta) throw new Error(`Missing META for ${name}`);
  if (!rich) throw new Error(`Missing RICH draft for ${name}`);
  return {
    slug: slugify(name),
    name,
    region,
    currency: meta.currency,
    regulator: meta.regulator,
    entities: rich.entities,
    notes: rich.notes,
  };
}

const countries = [
  ...AFRICA.map((n) => buildCountry(n, "Africa")),
  buildCountry("Canada", "North America"),
  buildCountry("United States", "North America"),
].sort((a, b) => a.name.localeCompare(b.name));

if (countries.length !== 14) {
  console.error("Expected 14 countries, got", countries.length);
  process.exit(1);
}

const out = `/** Covered markets only (14) — draft estimates; edit freely and verify fees. */\nwindow.COUNTRIES = ${JSON.stringify(countries, null, 2)};\n`;

const dest = path.join(__dirname, "..", "js", "data.js");
fs.writeFileSync(dest, out, "utf8");
console.log("Wrote", dest, "with", countries.length, "countries:");
console.log(countries.map((c) => c.name).join(", "));
