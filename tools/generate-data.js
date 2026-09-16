/**
 * One-off generator for js/data.js — run: node tools/generate-data.js
 * Major markets have richer hand-tuned content; others use regional templates.
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

const AFRICA = [
  "Algeria", "Angola", "Benin", "Botswana", "Burkina Faso", "Burundi", "Cabo Verde",
  "Cameroon", "Central African Republic", "Chad", "Comoros", "Congo", "Côte d'Ivoire",
  "Democratic Republic of the Congo", "Djibouti", "Egypt", "Equatorial Guinea", "Eritrea",
  "Eswatini", "Ethiopia", "Gabon", "Gambia", "Ghana", "Guinea", "Guinea-Bissau", "Kenya",
  "Lesotho", "Liberia", "Libya", "Madagascar", "Malawi", "Mali", "Mauritania", "Mauritius",
  "Morocco", "Mozambique", "Namibia", "Niger", "Nigeria", "Rwanda", "Sao Tome and Principe",
  "Senegal", "Seychelles", "Sierra Leone", "Somalia", "South Africa", "South Sudan", "Sudan",
  "Tanzania", "Togo", "Tunisia", "Uganda", "Zambia", "Zimbabwe",
];

const META = {
  Algeria: { currency: "DZD", regulator: "CNRC (Centre National du Registre de Commerce)" },
  Angola: { currency: "AOA", regulator: "Guiché Único da Empresa / Conservatória" },
  Benin: { currency: "XOF", regulator: "APIEx / RCCM" },
  Botswana: { currency: "BWP", regulator: "CIPA (Companies and Intellectual Property Authority)" },
  "Burkina Faso": { currency: "XOF", regulator: "CEFORE / RCCM" },
  Burundi: { currency: "BIF", regulator: "API / Commercial Registry" },
  "Cabo Verde": { currency: "CVE", regulator: "Casa do Cidadão / Commercial Registry" },
  Cameroon: { currency: "XAF", regulator: "RCCM / Guichet Unique" },
  "Central African Republic": { currency: "XAF", regulator: "RCCM / Guichet Unique" },
  Chad: { currency: "XAF", regulator: "ANIE / RCCM" },
  Comoros: { currency: "KMF", regulator: "Commercial Registry" },
  Congo: { currency: "XAF", regulator: "ACPCE / RCCM" },
  "Côte d'Ivoire": { currency: "XOF", regulator: "CEPICI / RCCM" },
  "Democratic Republic of the Congo": { currency: "CDF", regulator: "Guichet Unique de Création d'Entreprise / RCCM" },
  Djibouti: { currency: "DJF", regulator: "ANPI / Commercial Registry" },
  Egypt: { currency: "EGP", regulator: "GAFI / Commercial Registry" },
  "Equatorial Guinea": { currency: "XAF", regulator: "Commercial Registry" },
  Eritrea: { currency: "ERN", regulator: "Ministry of Trade and Industry" },
  Eswatini: { currency: "SZL", regulator: "Registrar of Companies" },
  Ethiopia: { currency: "ETB", regulator: "Ministry of Trade and Regional Integration / Documents Authentication" },
  Gabon: { currency: "XAF", regulator: "ANPI-Gabon / RCCM" },
  Gambia: { currency: "GMD", regulator: "Registrar of Companies" },
  Ghana: { currency: "GHS", regulator: "ORC (Office of the Registrar of Companies)" },
  Guinea: { currency: "GNF", regulator: "APIP / RCCM" },
  "Guinea-Bissau": { currency: "XOF", regulator: "Centro de Formalização de Empresas / RCCM" },
  Kenya: { currency: "KES", regulator: "BRS (Business Registration Service)" },
  Lesotho: { currency: "LSL", regulator: "OBFC / Registrar of Companies" },
  Liberia: { currency: "LRD", regulator: "Liberia Business Registry" },
  Libya: { currency: "LYD", regulator: "Commercial Registry / Ministry of Economy" },
  Madagascar: { currency: "MGA", regulator: "EDBM / Commercial Registry" },
  Malawi: { currency: "MWK", regulator: "Registrar General" },
  Mali: { currency: "XOF", regulator: "API-Mali / RCCM" },
  Mauritania: { currency: "MRU", regulator: "Guichet Unique / Commercial Registry" },
  Mauritius: { currency: "MUR", regulator: "Corporate and Business Registration Department (CBRD)" },
  Morocco: { currency: "MAD", regulator: "OMPIC / Commercial Court Registry" },
  Mozambique: { currency: "MZN", regulator: "BAU / Conservatória do Registo Comercial" },
  Namibia: { currency: "NAD", regulator: "BIPA (Business and Intellectual Property Authority)" },
  Niger: { currency: "XOF", regulator: "Maison de l'Entreprise / RCCM" },
  Nigeria: { currency: "NGN", regulator: "CAC (Corporate Affairs Commission)" },
  Rwanda: { currency: "RWF", regulator: "RDB (Rwanda Development Board)" },
  "Sao Tome and Principe": { currency: "STN", regulator: "Guiché Único / Commercial Registry" },
  Senegal: { currency: "XOF", regulator: "APIX / RCCM" },
  Seychelles: { currency: "SCR", regulator: "Registrar General / FSA (for IBCs)" },
  "Sierra Leone": { currency: "SLE", regulator: "Corporate Affairs Commission" },
  Somalia: { currency: "SOS", regulator: "Ministry of Commerce / regional registries" },
  "South Africa": { currency: "ZAR", regulator: "CIPC (Companies and Intellectual Property Commission)" },
  "South Sudan": { currency: "SSP", regulator: "Ministry of Trade / Business Registry" },
  Sudan: { currency: "SDG", regulator: "Commercial Registry" },
  Tanzania: { currency: "TZS", regulator: "BRELA (Business Registrations and Licensing Agency)" },
  Togo: { currency: "XOF", regulator: "CFE / RCCM" },
  Tunisia: { currency: "TND", regulator: "RNE (Registre National des Entreprises)" },
  Uganda: { currency: "UGX", regulator: "URSB (Uganda Registration Services Bureau)" },
  Zambia: { currency: "ZMW", regulator: "PACRA (Patents and Companies Registration Agency)" },
  Zimbabwe: { currency: "USD", regulator: "Companies and Intellectual Property Office (CIPO/CR)" },
  Canada: { currency: "CAD", regulator: "Corporations Canada (federal) / provincial registries" },
  "United States": { currency: "USD", regulator: "State Secretary of State / LLC & corp registries" },
};

/** Hand-tuned rich entries for major markets */
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
        type: "Private Company Limited by Shares",
        localName: "Ltd",
        requirements: [
          "Company name reservation (ORC)",
          "Regulations (constitution) of the company",
          "At least 1 director (local residency rules apply in practice)",
          "Company secretary (may be optional for small companies — confirm current Act)",
          "Registered office in Ghana",
          "Particulars and IDs of directors/shareholders (Ghana Card / passport)",
          "Beneficial ownership disclosure",
        ],
        costs: [
          { item: "Name search / reservation", amount: "≈ GHS 50–200", note: "Confirm ORC schedule" },
          { item: "Incorporation filing", amount: "≈ GHS 300–1,500+", note: "Depends on capital / form" },
          { item: "Professional fees", amount: "≈ GHS 1,500–8,000", note: "Market rates" },
        ],
        timeline: "Often 3–14 business days",
      },
      {
        type: "Sole Proprietorship / Business Name",
        localName: "Enterprise",
        requirements: [
          "Business name",
          "Proprietor ID and address",
          "Nature of business",
        ],
        costs: [
          { item: "ORC registration", amount: "≈ GHS 100–500", note: "Draft" },
          { item: "Professional fees", amount: "≈ GHS 500–2,000", note: "Optional" },
        ],
        timeline: "A few days",
      },
      {
        type: "Company Limited by Guarantee",
        localName: "Ltd/Gte",
        requirements: [
          "Non-share capital guarantee structure",
          "Objects / constitution",
          "Directors and guarantors particulars",
        ],
        costs: [
          { item: "Filing + professional", amount: "≈ GHS 2,000–10,000", note: "Approximate" },
        ],
        timeline: "1–3 weeks typical",
      },
    ],
    notes: "Draft — after ORC: TIN with GRA, possible VAT/SSNIT registrations depending on activity.",
  },

  Kenya: {
    entities: [
      {
        type: "Private Limited Company",
        localName: "Ltd",
        requirements: [
          "Name search / reservation on eCitizen / BRS",
          "Memorandum & Articles (or model articles)",
          "At least 1 director and 1 shareholder (can be same person)",
          "Registered office in Kenya",
          "IDs / KRA PINs for directors and shareholders",
          "Statement of nominal capital",
          "Beneficial ownership information",
        ],
        costs: [
          { item: "Name reservation", amount: "≈ KES 100–1,000", note: "Confirm eCitizen" },
          { item: "Incorporation fee", amount: "≈ KES 10,000–40,000", note: "May scale with capital" },
          { item: "Professional fees", amount: "≈ KES 15,000–80,000", note: "Market rates" },
        ],
        timeline: "Often 1–7 business days online",
      },
      {
        type: "Sole Proprietorship",
        localName: "Business name",
        requirements: [
          "Business name reservation",
          "Proprietor ID and KRA PIN",
          "Nature of business and address",
        ],
        costs: [
          { item: "Registration", amount: "≈ KES 1,000–5,000", note: "Draft" },
        ],
        timeline: "A few days",
      },
      {
        type: "Foreign Branch / Company",
        localName: "Branch of foreign company",
        requirements: [
          "Certified constitutional documents of parent",
          "Local representative",
          "Registered office in Kenya",
          "BRS foreign company registration forms",
        ],
        costs: [
          { item: "Filing + legal", amount: "≈ KES 50,000–200,000+", note: "Depends on complexity" },
        ],
        timeline: "2–6 weeks typical",
      },
    ],
    notes: "Draft — post-incorporation: KRA obligations, county business permits, NSSF/NHIF for employees.",
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

  Rwanda: {
    entities: [
      {
        type: "Private Limited Company",
        localName: "Ltd",
        requirements: [
          "Online application via RDB business registration portal",
          "Company name",
          "Directors and shareholders details",
          "Share capital information",
          "Registered address in Rwanda",
          "IDs / passports",
        ],
        costs: [
          { item: "RDB registration", amount: "Often low / promotional fees", note: "Confirm current RDB tariff — Rwanda is known for fast online setup" },
          { item: "Professional fees", amount: "≈ RWF 50,000–300,000", note: "If using an agent" },
        ],
        timeline: "Often same day to 2 business days online",
      },
      {
        type: "Domestic Company / Enterprise",
        localName: "Other local forms",
        requirements: [
          "Choose form suited to activity (confirm on RDB)",
          "Identity and address particulars",
        ],
        costs: [
          { item: "Registration", amount: "Confirm RDB", note: "Draft" },
        ],
        timeline: "Usually quick online",
      },
    ],
    notes: "Draft — RDB one-stop shop also helps with tax numbers; verify current fee holidays.",
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

function ohadaCompany(currency) {
  return [
    {
      type: "Société à Responsabilité Limitée",
      localName: "SARL (private limited equivalent)",
      requirements: [
        "Company name and objects",
        "Statutes (articles) under OHADA Uniform Act",
        "At least 1 shareholder (confirm local practice)",
        "Manager (gérant) particulars",
        "Registered office in the country",
        "Deposit of share capital in a local bank (rules vary)",
        "RCCM registration via Guichet Unique / CFE where available",
        "Notarisation of statutes often required",
      ],
      costs: [
        { item: "RCCM / guichet unique fees", amount: `≈ 25,000–150,000 ${currency}`, note: "Wide variance by country" },
        { item: "Notary / legal fees", amount: `≈ 100,000–500,000 ${currency}`, note: "Often the larger cost" },
        { item: "Capital deposit", amount: "Per statutes", note: "Minimum capital rules eased in many OHADA states — confirm locally" },
      ],
      timeline: "Often 3–21 business days if file is complete",
    },
    {
      type: "Société Anonyme",
      localName: "SA (public limited equivalent)",
      requirements: [
        "Higher governance (board) requirements",
        "Statutes and capital suited to SA form",
        "RCCM registration",
        "Notary involvement typical",
      ],
      costs: [
        { item: "Legal + registry package", amount: "Higher than SARL", note: "Use local counsel" },
      ],
      timeline: "Several weeks",
    },
    {
      type: "Entreprise Individuelle",
      localName: "Sole trader / business name",
      requirements: [
        "Trader registration / RCCM as applicable",
        "National ID and address",
        "Tax identification after registration",
      ],
      costs: [
        { item: "Registration", amount: `≈ 10,000–75,000 ${currency}`, note: "Draft" },
      ],
      timeline: "A few days to 2 weeks",
    },
  ];
}

function commonLawAfrica(currency, privateLabel = "Private Limited Company") {
  return [
    {
      type: privateLabel,
      localName: "Ltd / Pty-style company",
      requirements: [
        "Name reservation with companies registry",
        "Constitution / memorandum & articles",
        "Director(s) and shareholder particulars + IDs",
        "Registered office in-country",
        "Statement of share capital",
        "Beneficial ownership disclosure where required",
      ],
      costs: [
        { item: "Registry filing", amount: `Approx. low–moderate official fees in ${currency}`, note: "Confirm current tariff" },
        { item: "Professional / agent fees", amount: "Often several times the official fee", note: "Market rates" },
      ],
      timeline: "Several days to 3 weeks typical",
    },
    {
      type: "Business Name / Sole Proprietorship",
      localName: "Enterprise",
      requirements: [
        "Business name approval",
        "Proprietor ID and address",
        "Nature of business",
      ],
      costs: [
        { item: "Registration", amount: `Lower than company filing (${currency})`, note: "Draft" },
      ],
      timeline: "A few days",
    },
  ];
}

function lusophone(currency) {
  return [
    {
      type: "Sociedade por Quotas",
      localName: "Lda (private limited equivalent)",
      requirements: [
        "Company name certificate",
        "Pacto social (articles)",
        "Quota holders and managers IDs",
        "Registered seat in-country",
        "Commercial registry / one-stop shop filing",
        "NIF / tax number after or during setup",
      ],
      costs: [
        { item: "Registry / one-stop fees", amount: `Moderate official fees (${currency})`, note: "Confirm locally" },
        { item: "Lawyer / notary", amount: "Often the main cost", note: "Market rates" },
      ],
      timeline: "1–4 weeks typical",
    },
    {
      type: "Empresário em Nome Individual",
      localName: "Sole trader",
      requirements: [
        "Individual trader registration",
        "ID and address",
        "Tax registration",
      ],
      costs: [
        { item: "Registration", amount: `Lower than Lda (${currency})`, note: "Draft" },
      ],
      timeline: "Days to 2 weeks",
    },
  ];
}

function northAfrica(currency, privateName) {
  return [
    {
      type: privateName,
      localName: "Private limited equivalent",
      requirements: [
        "Name clearance",
        "Articles / statutes (often Arabic + French)",
        "Managers / partners IDs",
        "Registered office",
        "Commercial registry filing",
        "Tax and social registrations after incorporation",
      ],
      costs: [
        { item: "Registry + stamp duties", amount: `Varies (${currency})`, note: "Confirm current schedule" },
        { item: "Legal / notary", amount: "Often significant", note: "Market rates" },
      ],
      timeline: "1–4 weeks",
    },
    {
      type: "Sole Proprietorship",
      localName: "Personne physique / auto-entrepreneur where available",
      requirements: [
        "Trader / auto-entrepreneur registration if applicable",
        "National ID and tax file",
      ],
      costs: [
        { item: "Registration", amount: `Usually lower (${currency})`, note: "Draft" },
      ],
      timeline: "Days to a few weeks",
    },
  ];
}

/** Regional template picker */
function entitiesFor(name, currency) {
  if (RICH[name]) return RICH[name].entities;

  const ohada = new Set([
    "Benin", "Burkina Faso", "Cameroon", "Central African Republic", "Chad", "Comoros",
    "Congo", "Côte d'Ivoire", "Democratic Republic of the Congo", "Equatorial Guinea",
    "Gabon", "Guinea", "Guinea-Bissau", "Mali", "Niger", "Senegal", "Togo",
  ]);
  const lusophoneSet = new Set(["Angola", "Mozambique", "Cabo Verde", "Sao Tome and Principe"]);
  const north = {
    Algeria: "Société à Responsabilité Limitée (SARL)",
    Morocco: "Société à Responsabilité Limitée (SARL)",
    Tunisia: "Société à Responsabilité Limitée (SARL)",
    Libya: "Limited Liability Company",
    Egypt: null,
    Mauritania: "Société à Responsabilité Limitée (SARL)",
  };

  if (ohada.has(name)) return ohadaCompany(currency);
  if (lusophoneSet.has(name)) return lusophone(currency);
  if (north[name]) return northAfrica(currency, north[name]);

  // Common-law / hybrid African defaults
  if (name === "Mauritius") {
    return [
      {
        type: "Private Company Limited by Shares",
        localName: "Ltd",
        requirements: [
          "Name approval via CBRD",
          "Constitution",
          "At least 1 director and 1 shareholder",
          "Registered office in Mauritius",
          "File incorporation documents with CBRD",
        ],
        costs: [
          { item: "CBRD fees", amount: "≈ MUR 3,000–10,000+", note: "Confirm schedule; Global Business licenses extra" },
          { item: "Professional fees", amount: "≈ MUR 10,000–50,000+", note: "Higher for GBC structures" },
        ],
        timeline: "Often 2–10 business days",
      },
      {
        type: "Global Business Company",
        localName: "GBC (licensed)",
        requirements: [
          "FSC licensing considerations",
          "Local management / substance expectations",
          "CBRD + FSC filings",
        ],
        costs: [
          { item: "Licence + agent annual", amount: "USD thousands / year typical", note: "Verify with management company" },
        ],
        timeline: "Weeks",
      },
    ];
  }

  if (name === "Botswana") {
    return commonLawAfrica(currency, "Private Company Limited by Shares").map((e, i) =>
      i === 0
        ? {
            ...e,
            localName: "Pty Ltd style",
            costs: [
              { item: "CIPA filing", amount: "≈ BWP 300–1,200", note: "Confirm CIPA" },
              { item: "Professional fees", amount: "≈ BWP 1,500–8,000", note: "Market" },
            ],
          }
        : e
    );
  }

  if (name === "Namibia") {
    return [
      {
        type: "Private Company",
        localName: "Pty Ltd",
        requirements: [
          "Name reservation with BIPA",
          "MOI / incorporation documents",
          "Director and shareholder details",
          "Registered address in Namibia",
        ],
        costs: [
          { item: "BIPA fees", amount: "≈ NAD 100–500", note: "Confirm BIPA" },
          { item: "Professional fees", amount: "≈ NAD 2,000–10,000", note: "Market" },
        ],
        timeline: "Days to 2 weeks",
      },
      ...commonLawAfrica(currency).slice(1),
    ];
  }

  if (name === "Eswatini" || name === "Lesotho") {
    return commonLawAfrica(currency, "Private Company");
  }

  if (name === "Ethiopia") {
    return [
      {
        type: "Private Limited Company",
        localName: "PLC",
        requirements: [
          "Trade name and documents authenticated as required",
          "Memorandum & articles",
          "Minimum capital rules (investment law — verify current thresholds)",
          "Managers / shareholders IDs",
          "Commercial registration and business licence",
        ],
        costs: [
          { item: "Registration / licence", amount: "≈ ETB thousands–tens of thousands", note: "Varies by capital & sector" },
          { item: "Legal fees", amount: "Significant", note: "Use local counsel" },
        ],
        timeline: "Often 2–6 weeks",
      },
      {
        type: "Sole Proprietorship",
        localName: "Business person",
        requirements: ["ID", "Business licence via relevant bureau", "Tax registration"],
        costs: [{ item: "Licence fees", amount: "Lower than PLC", note: "Draft" }],
        timeline: "1–3 weeks",
      },
    ];
  }

  if (name === "Tanzania") {
    return [
      {
        type: "Private Limited Company",
        localName: "Ltd",
        requirements: [
          "Name clearance via BRELA",
          "Memorandum & Articles",
          "Directors / shareholders + IDs",
          "Registered office in Tanzania",
          "Taxpayer ID (TIN) process alongside or after",
        ],
        costs: [
          { item: "BRELA filing", amount: "≈ TZS 50,000–300,000+", note: "Confirm BRELA" },
          { item: "Professional fees", amount: "≈ TZS 200,000–1,000,000", note: "Market" },
        ],
        timeline: "About 1–3 weeks",
      },
      ...commonLawAfrica(currency).slice(1),
    ];
  }

  if (name === "Uganda") {
    return [
      {
        type: "Private Limited Company",
        localName: "Ltd",
        requirements: [
          "Name reservation on URSB portal",
          "Memorandum & Articles",
          "At least 1 director / shareholder particulars",
          "Registered address in Uganda",
          "Forms and ID copies",
        ],
        costs: [
          { item: "URSB fees", amount: "≈ UGX 50,000–250,000+", note: "Confirm schedule; stamp duty on capital may apply" },
          { item: "Professional fees", amount: "≈ UGX 200,000–1,500,000", note: "Market" },
        ],
        timeline: "Several days to 2 weeks",
      },
      ...commonLawAfrica(currency).slice(1),
    ];
  }

  if (name === "Zambia") {
    return [
      {
        type: "Private Limited Company",
        localName: "Ltd",
        requirements: [
          "Name clearance via PACRA",
          "Incorporation forms and articles",
          "Directors / shareholders IDs",
          "Registered office in Zambia",
        ],
        costs: [
          { item: "PACRA fees", amount: "≈ ZMW 300–2,000+", note: "May relate to capital" },
          { item: "Professional fees", amount: "≈ ZMW 1,500–8,000", note: "Market" },
        ],
        timeline: "About 1–2 weeks",
      },
      ...commonLawAfrica(currency).slice(1),
    ];
  }

  if (name === "Zimbabwe") {
    return [
      {
        type: "Private Limited Company",
        localName: "Private company",
        requirements: [
          "Name search with companies office",
          "Memorandum & Articles",
          "Directors / shareholders details",
          "Registered office",
        ],
        costs: [
          { item: "Registry fees", amount: "Often quoted in USD", note: "Confirm CIPO current tariffs" },
          { item: "Professional fees", amount: "USD 100–500+", note: "Market" },
        ],
        timeline: "1–3 weeks",
      },
      ...commonLawAfrica(currency).slice(1),
    ];
  }

  if (name === "Malawi" || name === "Gambia" || name === "Sierra Leone" || name === "Liberia") {
    return commonLawAfrica(currency);
  }

  if (name === "Seychelles") {
    return [
      {
        type: "International Business Company",
        localName: "IBC",
        requirements: [
          "Registered agent in Seychelles",
          "Memorandum & Articles",
          "Director / shareholder particulars (privacy rules evolving — confirm)",
          "FSA / Registrar filings via agent",
        ],
        costs: [
          { item: "Incorporation via agent", amount: "≈ USD 500–1,500 year 1", note: "Includes agent; confirm" },
          { item: "Annual renewal", amount: "≈ USD 400–1,000+", note: "Agent + gov fees" },
        ],
        timeline: "1–5 business days typical via agent",
      },
      {
        type: "Domestic Company",
        localName: "Local company",
        requirements: [
          "Registrar General filings",
          "Local substance / tax considerations",
        ],
        costs: [
          { item: "Filing + professional", amount: "SCR / USD varies", note: "Draft" },
        ],
        timeline: "Days to weeks",
      },
    ];
  }

  // Fallback for remaining African states
  return commonLawAfrica(currency);
}

function buildCountry(name, region) {
  const meta = META[name];
  if (!meta) throw new Error(`Missing META for ${name}`);
  const rich = RICH[name];
  return {
    slug: slugify(name),
    name,
    region,
    currency: meta.currency,
    regulator: meta.regulator,
    entities: entitiesFor(name, meta.currency),
    notes:
      rich?.notes ||
      `Draft — verify with ${meta.regulator} and local counsel. Fees and document lists change.`,
  };
}

const countries = [
  ...AFRICA.map((n) => buildCountry(n, "Africa")),
  buildCountry("Canada", "North America"),
  buildCountry("United States", "North America"),
];

if (countries.length !== 56) {
  console.error("Expected 56 countries, got", countries.length);
  process.exit(1);
}

const out = `/** Auto-shaped draft data — edit freely; verify before relying on fees. */\nwindow.COUNTRIES = ${JSON.stringify(countries, null, 2)};\n`;

const dest = path.join(__dirname, "..", "js", "data.js");
fs.writeFileSync(dest, out, "utf8");
console.log("Wrote", dest, "with", countries.length, "countries");
