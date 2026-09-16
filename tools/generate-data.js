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
  Angola: { currency: "AOA", regulator: "Guiché Único da Empresa (GUE) / Registo Comercial" },
  Egypt: { currency: "EGP", regulator: "GAFI / Commercial Registry" },
  "Equatorial Guinea": { currency: "XAF", regulator: "Commercial Registry / OHADA RCCM" },
  Ghana: { currency: "GHS", regulator: "ORC (Office of the Registrar of Companies)" },
  Kenya: { currency: "KES", regulator: "BRS (Business Registration Service)" },
  Madagascar: { currency: "MGA", regulator: "EDBM / Commercial Registry" },
  Namibia: { currency: "NAD", regulator: "BIPA / NamRA / SSC" },
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
        type: "Private Company (Pty) Ltd — Standard",
        localName: "Pty Ltd (standard MOI)",
        requirements: [
          "Name reservation via CIPC (typically included in set-up)",
          "Private company registration with standard Memorandum of Incorporation (MOI)",
          "Beneficial ownership filing",
          "Income tax registration assistance with SARS",
          "Key documents issued on completion: Certificate of Incorporation; Registration Certificate; MOI; Income Tax Reference Number; Beneficial Ownership Confirmation",
        ],
        costs: [
          {
            item: "Name Reservation",
            amount: "Gov R50 · Legal R500",
            note: "Turnaround 1–3 business days (Olari Legal)",
          },
          {
            item: "Pty Ltd Registration — Standard MOI",
            amount: "Gov R125–R175 · Legal R2,500",
            note: "Turnaround 1–5 business days",
          },
          {
            item: "Beneficial Ownership Filing",
            amount: "Gov No Fee · Legal R1,000",
            note: "Turnaround 1–2 business days",
          },
          {
            item: "Income Tax Registration Assistance",
            amount: "Gov No Fee · Legal R500",
            note: "Turnaround 1–3 business days",
          },
          {
            item: "Start-Up Package",
            amount: "ZAR 3,500",
            note: "Includes name reservation, Pty registration, income tax assistance, BO filing, digital corporate records pack · 3–7 business days",
          },
          {
            item: "VAT Registration (optional)",
            amount: "Gov No Fee · Legal R2,000",
            note: "5–21 business days",
          },
          {
            item: "PAYE Registration (optional)",
            amount: "Gov No Fee · Legal R1,500",
            note: "3–14 business days",
          },
          {
            item: "UIF Registration (optional)",
            amount: "Gov No Fee · Legal R1,500",
            note: "3–14 business days",
          },
          {
            item: "Compensation Fund Registration (optional)",
            amount: "Gov No Fee · Legal R1,500",
            note: "7–30 business days",
          },
          {
            item: "Import/Export Code Registration (optional)",
            amount: "Gov No Fee · Legal R2,500",
            note: "5–14 business days",
          },
          {
            item: "B-BBEE Affidavit Preparation (optional)",
            amount: "Gov No Fee · Legal R750",
            note: "1–2 business days",
          },
        ],
        timeline: "Standard Pty registration 1–5 business days; Start-Up Package 3–7 business days",
      },
      {
        type: "Private Company (Pty) Ltd — Foreign Shareholder",
        localName: "Pty Ltd (foreign-owned / foreign shareholder)",
        requirements: [
          "Foreign shareholder / foreign-owned private company registration",
          "Name reservation and beneficial ownership filing",
          "Income tax registration assistance",
          "Import/export registration where required",
          "Costs and timelines may vary with notarisation, apostille, and sector-specific permits or licences",
          "Key documents on completion: Certificate of Incorporation; Registration Certificate; MOI; Income Tax Reference Number; Beneficial Ownership Confirmation",
        ],
        costs: [
          {
            item: "Name Reservation",
            amount: "Gov R50 · Legal R500",
            note: "1–3 business days",
          },
          {
            item: "Pty Ltd Registration — Foreign Shareholder",
            amount: "Gov R125–R175 · Legal R3,500",
            note: "Turnaround 3–7 business days",
          },
          {
            item: "Beneficial Ownership Filing",
            amount: "Gov No Fee · Legal R1,000",
            note: "1–2 business days",
          },
          {
            item: "Income Tax Registration Assistance",
            amount: "Gov No Fee · Legal R500",
            note: "1–3 business days",
          },
          {
            item: "Foreign Investor Package",
            amount: "ZAR 15,000",
            note: "Foreign-owned company registration, income tax assistance, BO filing, import/export where required, one-hour structuring consultation · 7–20 business days",
          },
          {
            item: "Apostille Arrangement",
            amount: "Legal R2,500 + disbursements",
            note: "5–15 business days",
          },
          {
            item: "DIRCO Authentication",
            amount: "Legal R2,500 + disbursements",
            note: "5–15 business days",
          },
          {
            item: "Notarial Certification / Copies",
            amount: "R850 per document",
            note: "Certification 1–3 days; copies same day–2 days",
          },
          {
            item: "Foreign Use Corporate Document Pack",
            amount: "Legal R5,000",
            note: "5–10 business days",
          },
        ],
        timeline: "Foreign shareholder registration 3–7 business days; Foreign Investor Package 7–20 business days",
      },
      {
        type: "Non-Profit Company",
        localName: "NPC",
        requirements: [
          "Name reservation",
          "NPC registration with CIPC",
          "Constitution drafting (standalone or via package)",
          "Income tax registration assistance",
          "Key documents on completion: NPC Registration Certificate; Incorporation Documents; Constitution; Income Tax Reference Number",
        ],
        costs: [
          {
            item: "Name Reservation",
            amount: "Gov R50 · Legal R500",
            note: "1–3 business days",
          },
          {
            item: "NPC Registration",
            amount: "Gov R50 · Legal R3,000",
            note: "Turnaround 5–15 business days",
          },
          {
            item: "Constitution for NPC (standalone)",
            amount: "Legal R5,000",
            note: "5–10 business days",
          },
          {
            item: "Non-Profit Organisation Package",
            amount: "ZAR 7,500",
            note: "Name reservation, NPC registration, constitution drafting, income tax assistance · 10–20 business days",
          },
        ],
        timeline: "NPC registration 5–15 business days; NPO Package 10–20 business days",
      },
      {
        type: "External Company",
        localName: "Foreign branch registration",
        requirements: [
          "External company (foreign branch) registration with CIPC",
          "Registered South African branch details",
          "Tax registration documentation as applicable",
          "Key documents on completion: Registration Certificate as External Company; Registered SA Branch Details; Tax Registration Documentation",
        ],
        costs: [
          {
            item: "External Company Registration",
            amount: "Gov Variable · Legal R8,500",
            note: "Turnaround 10–20 business days",
          },
          {
            item: "Income Tax Registration Assistance",
            amount: "Gov No Fee · Legal R500",
            note: "1–3 business days",
          },
          {
            item: "VAT / PAYE / UIF / other regulatory (as needed)",
            amount: "See Pty Ltd optional tax schedule",
            note: "Quoted separately based on operating model",
          },
        ],
        timeline: "10–20 business days for external company registration",
      },
    ],
    notes:
      "Verified from Olari Legal South Africa business set-up overview for Corporate Set Up Ltd. All fees exclusive of VAT unless otherwise stated. Government fees, courier, translation, apostille disbursements, embassy/legalisation, and other third-party charges billed separately where applicable. Turnaround times are estimates and may vary by entity type, notarisation/apostille needs, sector licences, completeness of information, and CIPC/SARS processing.",
  },

  Egypt: {
    entities: [
      {
        type: "Sole Proprietorship",
        localName: "Individual establishment",
        requirements: [
          "Assigning the name of the company (Non-Confusion Certificate)",
          "Depositing 100% of the company's capital in a bank recognised by the Egyptian Central Bank (at least EGP 1,000)",
          "Valid proof of identity of the proprietor: National ID Card (Egyptian nationals) or Passport (foreign nationals)",
          "Commercial Register Extract legalised by the Egyptian Embassy or Consulate if a foreign company (legal person)",
          "Power of Attorney from the proprietor issued by its country's Notary Public and legalised by the Egyptian Embassy or Consulate",
          "Lease agreement of the company's headquarters",
          "Prior approval of the competent authority, where required by law for the proposed business activity",
          "Approval of the Board of Directors of the relevant Public Free Zone, where establishment is under the Free Zone system",
        ],
        costs: [
          {
            item: "Minimum capital deposit",
            amount: "At least EGP 1,000 (100% deposited)",
            note: "CBE-recognised bank",
          },
          {
            item: "Governmental fees (incorporation, tax card, permits)",
            amount: "Varies",
            note: "Decided once full company/activity information is known",
          },
        ],
        timeline: "Varies by activity and approvals; confirm with counsel for this form",
      },
      {
        type: "General Partnership / Limited Partnership",
        localName: "Partnership entities",
        requirements: [
          "Power of Attorney executed by all partners, expressly authorizing incorporation, legalised by the Egyptian Embassy or Consulate in the partner's country",
          "Valid proof of identity for all partners: National ID Card (Egyptian) or Passport (foreign)",
          "Approval of the competent authority where specific activities require prior approval",
          "Approval of the Board of Directors of the relevant Free Zone, where established in a Free Zone",
          "Official extract from the Register of Accountants and Auditors for the company's auditor",
          "Lease agreement of the company's headquarters",
        ],
        costs: [
          {
            item: "Governmental fees (incorporation, tax card, permits)",
            amount: "Varies",
            note: "Based on company type and subject — confirm when full info available",
          },
        ],
        timeline: "Varies by activity and approvals",
      },
      {
        type: "Limited Liability Company",
        localName: "LLC (L.L.C.)",
        requirements: [
          "Full documentary checklist not fully listed in the provided guide extract — confirm with GAFI / counsel",
          "Requirements may vary depending on proposed business activity and competent authorities",
          "Prior approvals and Free Zone approvals may apply where required by activity",
        ],
        costs: [
          {
            item: "Incorporation (standard)",
            amount: "Governmental fees vary",
            note: "Approx. 14 days from submitting documents (JSC / LLC per guide)",
          },
          {
            item: "VIP incorporation acceleration",
            amount: "EGP 10,000",
            note: "May hasten process to around 7 days",
          },
          {
            item: "Tax card",
            amount: "Fees vary",
            note: "Approx. 7 days from submitting Commercial Register, lease/purchase of HQ (and branches)",
          },
          {
            item: "Company permits / licences",
            amount: "Varies by subject",
            note: "May take from 1 month to 1 year",
          },
        ],
        timeline: "Incorporation ≈ 14 days (≈ 7 days with VIP EGP 10,000); tax card ≈ 7 days; permits 1 month–1 year",
      },
      {
        type: "Joint Stock Company",
        localName: "JSC",
        requirements: [
          "Power of Attorney from all founders or shareholders, together with valid proof of identity (copy)",
          "Official extract from the Register of Accountants and Auditors for the company's auditor",
          "Security clearance application forms for foreign nationals",
          "Approval of the competent authority, together with the valuation report for any in-kind contributions",
          "Approval of the Free Zone Authority or the Council of Ministers, as applicable, depending on the type of free zone",
          "Depositing 10% of the company's capital with a minimum capital amount of EGP 250,000 at a CBE-recognised bank; after 3 months from incorporation increase paid amount to 25% of capital; deposit 100% of capital within 5 years from incorporation",
          "After incorporation: register before Misr for Central Clearing, Depository and Registry (MCDR); shareholders obtain codes from certified Depository",
        ],
        costs: [
          {
            item: "Minimum capital",
            amount: "EGP 250,000 minimum",
            note: "Pay in 10% at incorporation; 25% within 3 months; 100% within 5 years",
          },
          {
            item: "Incorporation (standard)",
            amount: "Governmental fees vary",
            note: "Approx. 14 days from submitting documents",
          },
          {
            item: "VIP incorporation acceleration",
            amount: "EGP 10,000",
            note: "May hasten process to around 7 days",
          },
          {
            item: "Tax card",
            amount: "Fees vary",
            note: "Approx. 7 days from required documents",
          },
          {
            item: "Coding of shareholders",
            amount: "Fees vary",
            note: "Approx. 10 days",
          },
          {
            item: "MCDR company registration",
            amount: "Fees vary",
            note: "Approximately 2 months",
          },
          {
            item: "Company permits / licences",
            amount: "Varies by subject",
            note: "May take from 1 month to 1 year",
          },
        ],
        timeline:
          "Incorporation ≈ 14 days (≈ 7 with VIP); tax card ≈ 7 days; shareholder coding ≈ 10 days; MCDR ≈ 2 months; permits 1 month–1 year",
      },
      {
        type: "Foreign Branch",
        localName: "Branch of foreign company",
        requirements: [
          "Articles of Association and Commercial Register of the foreign company, legalised by the Egyptian Embassy or Consulate in the foreign company's country",
          "Security clearance application forms for foreign nationals",
          "Written request for GAFI signed by the foreign company's representative",
          "Passport or ID of the Branch's manager",
          "Power of Attorney from the foreign company's representative",
          "The Branch's lease agreement",
          "Acknowledgment from the foreign company for the incorporation of the Branch",
          "Bank certificate submitted to GAFI evidencing a transfer of EGP 5,000 in USD paid from outside Egypt",
        ],
        costs: [
          {
            item: "Inbound transfer evidenced to GAFI",
            amount: "EGP 5,000 in USD (from outside Egypt)",
            note: "Bank certificate required",
          },
          {
            item: "Governmental fees",
            amount: "Varies",
            note: "Confirm once full branch/activity information is known",
          },
        ],
        timeline: "Incorporation process may take approximately 5 days from submitting the required documents",
      },
    ],
    notes:
      "Verified from Egypt incorporation guidance. Requirements may vary depending on the nature of the proposed business activity and competent regulatory authorities. Governmental fees for incorporation, tax card, permits and licences vary by company type and subject and are confirmed once all company information is available. VIP EGP 10,000 available to accelerate JSC/LLC incorporation to around 7 days.",
  },

  Angola: {
    entities: [
      {
        type: "Sociedade Unipessoal por Quotas",
        localName: "Single-member quota company",
        requirements: [
          "Natural person: Bilhete de Identidade or valid passport; NIF (for foreigners when applicable); phone; email",
          "If incorporator is a legal person: updated Commercial Registry certificate; NIF; minutes/resolution authorizing incorporation; power of attorney if represented by mandatário",
          "Procedure: initial legal consultation → define form → draft Contrato de Sociedade → collect/verify documents → submit to Guiché Único da Empresa (GUE) → Registo Comercial → Certidão Comercial → legal publication if required → sector licensing if required",
          "Public deed before Serviços Notariais when the law requires",
          "No mandatory minimum share capital; value freely set; realization may be deferred until end of first economic year",
        ],
        costs: [
          {
            item: "GUE constituição (Lda. / quota company schedule)",
            amount: "11.000,00 Kz",
            note: "Official GUE table — same band as Sociedade por Quotas unless counsel distinguishes",
          },
          {
            item: "If public deed required — notarial emolument + total",
            amount: "Emolumento 3.250,00 Kz · Total 14.250,00 Kz",
            note: "Per Lda. escritura pública schedule in memorandum",
          },
          {
            item: "Lawyer / consultant professional fees",
            amount: "Quoted separately",
            note: "Office services: consultation, company formation, Contrato de Sociedade, GUE and notary accompaniment",
          },
        ],
        timeline: "3–7 business days when documentation is complete and no extra requirements",
      },
      {
        type: "Sociedade por Quotas",
        localName: "Lda.",
        requirements: [
          "Natural person: Bilhete de Identidade or valid passport; NIF (for foreigners when applicable); phone; email",
          "If incorporator is a legal person: updated Commercial Registry certificate; NIF; minutes/resolution authorizing incorporation; power of attorney if represented by mandatário",
          "Elaboration of Contrato de Sociedade; submission to Guiché Único da Empresa (GUE)",
          "Registo Comercial; emission of Certidão Comercial; legal publication when required",
          "Public deed before Serviços Notariais when the law requires",
          "No mandatory minimum share capital; freely fixed by sócios; realization may be deferred until end of first economic year",
        ],
        costs: [
          {
            item: "GUE constituição de Sociedade por Quotas (Lda.)",
            amount: "11.000,00 Kz",
            note: "Official GUE table currently in force (memorandum)",
          },
          {
            item: "Constituição por escritura pública (when required)",
            amount: "Emolumento notarial 3.250,00 Kz · Total 14.250,00 Kz",
            note: "GUE fee plus notarial emolument",
          },
          {
            item: "Lawyer / consultant professional fees",
            amount: "Quoted separately",
            note: "Not included in official GUE table",
          },
        ],
        timeline: "3–7 business days when documentation is complete; may vary with complexity and sector licensing",
      },
      {
        type: "Sociedade Anónima",
        localName: "S.A.",
        requirements: [
          "Natural person: Bilhete de Identidade or valid passport; NIF (for foreigners when applicable); phone; email",
          "If incorporator is a legal person: updated Commercial Registry certificate; NIF; minutes/resolution authorizing incorporation; power of attorney if represented by mandatário",
          "Contrato de Sociedade / statutes suited to S.A.; submission via GUE; Registo Comercial; Certidão Comercial",
          "Public deed before Serviços Notariais when the law requires",
          "Minimum share capital: equivalent in Kwanzas of USD 20,000.00 at the applicable exchange rate",
        ],
        costs: [
          {
            item: "GUE constituição de Sociedade Anónima",
            amount: "41.000,00 Kz",
            note: "Official GUE table currently in force (memorandum)",
          },
          {
            item: "Constituição por escritura pública (when required)",
            amount: "Emolumento notarial 13.250,00 Kz · Total 54.250,00 Kz",
            note: "GUE fee plus notarial emolument",
          },
          {
            item: "Minimum capital",
            amount: "USD 20,000 equivalent in Kz",
            note: "Calculated at applicable exchange rate",
          },
          {
            item: "Lawyer / consultant professional fees",
            amount: "Quoted separately",
            note: "Not included in official GUE table",
          },
        ],
        timeline: "3–7 business days when documentation is complete; may vary with complexity and sector licensing",
      },
      {
        type: "Empresário / Comerciante em Nome Individual",
        localName: "Sole trader",
        requirements: [
          "Bilhete de Identidade or valid passport",
          "NIF (for foreigners when applicable)",
          "Phone number and email",
          "Submission to Guiché Único da Empresa (GUE); Registo Comercial as applicable",
          "Sector licensing if the activity requires it",
        ],
        costs: [
          {
            item: "GUE Comerciante em Nome Individual",
            amount: "21.380,00 Kz",
            note: "Official GUE table currently in force (memorandum)",
          },
          {
            item: "Lawyer / consultant professional fees",
            amount: "Quoted separately",
            note: "Not included in official GUE table",
          },
        ],
        timeline: "3–7 business days when documentation is complete; may vary with complexity and sector licensing",
      },
    ],
    notes:
      "Verified from Memorando Jurídico Informativo — Constituição de Empresas na República de Angola (Dr. Edvânio Figueira Salvador, Luanda, 07/07/2026). Framework: Lei das Sociedades Comerciais, Código Comercial, Regime Jurídico do GUE, Registo Comercial, notarial and tax legislation. Process centralized at GUE (in-person or electronic for certain acts). Official costs only — lawyer fees quoted separately. After incorporation: AGT tax obligations; INSS when applicable; sector licences; accounting; internal contracts; periodic tax compliance.",
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
        type: "Private Company (Pty Ltd)",
        localName: "Pty Ltd — 1+ shareholders/directors; limited liability",
        requirements: [
          "Best for: foreign investors, entities raising capital or tendering",
          "Name reservation (Form CM5)",
          "CM2 — Memorandum of Association (notarised, ×3)",
          "CM22 — Notice of Registered Address",
          "CM29 — List of Directors/Auditors/Officers",
          "CM31 — Auditor's Consent to Act",
          "CM44A/CM44C (Articles/Signatories) & BO1 (Beneficial Ownership)",
          "CM46/CM47 — Certificate to Commence / Capital Adequacy (after registration number issued)",
          "Notarisation of founding documents (private notary)",
          "Post-registration: NamRA TIN; VAT if turnover > N$500,000; SSC if employing; municipal/sector trading licence if premises-based/regulated",
        ],
        costs: [
          { item: "Name reservation (CM5)", amount: "N$75 / US$4.55", note: "1–3 days" },
          { item: "CM2 — Memorandum of Association", amount: "N$150 / US$9.10", note: "Part of 5–15 day registration bundle" },
          { item: "CM22 — Notice of Registered Address", amount: "N$20 / US$1.21", note: "Part of 5–15 days" },
          { item: "CM29 — List of Directors/Auditors/Officers", amount: "N$20 / US$1.21", note: "Part of 5–15 days" },
          { item: "CM31 — Auditor's Consent to Act", amount: "N$20 / US$1.21", note: "Part of 5–15 days" },
          { item: "CM44A/CM44C & BO1", amount: "No separate BIPA fee", note: "Part of 5–15 days" },
          { item: "CM46/CM47 — Certificate to Commence / Capital Adequacy", amount: "Nominal — confirm at lodgement", note: "Few days after registration number issued" },
          { item: "Notarisation of founding documents", amount: "N$50–N$200 per doc / US$3.03–$12.12", note: "Same day; private notary cost" },
          { item: "NamRA TIN registration", amount: "No fee / US$0", note: "3–5 days" },
          { item: "NamRA VAT (if turnover > N$500,000)", amount: "No fee / US$0", note: "With TIN" },
          { item: "SSC employer & employee registration", amount: "No fee / US$0", note: "1–2 days" },
          { item: "Municipal/sector trading licence", amount: "N$200–N$1,000+ / US$12.12–$60.60+", note: "5–15 days where required" },
        ],
        timeline: "End-to-end ≈ 3–5 weeks",
      },
      {
        type: "Public Company (Ltd)",
        localName: "Ltd — 7+ shareholders; min 2 directors; limited liability",
        requirements: [
          "Best for: larger enterprises raising capital from the public, planning a listing, or requiring audited public disclosure",
          "Same core CM forms as Pty Ltd (CM2, CM22, CM29, CM31, CM44A/CM44C, BO1, CM46/CM47) plus name reservation",
          "Prospectus registration with BIPA only if shares will actually be offered to the public (not merely registered as a public company in form)",
          "Audited annual financial statements filing with the Registrar",
          "Post-registration: NamRA TIN; VAT if applicable; SSC if employing; trading licence if required",
        ],
        costs: [
          { item: "Name reservation", amount: "N$75 / US$4.55", note: "1–3 days (CM5 / equivalent)" },
          { item: "CM2 — Memorandum of Association", amount: "N$150 / US$9.10", note: "Part of 5–15 days" },
          { item: "CM22 / CM29 / CM31", amount: "N$20 / US$1.21 each", note: "Part of 5–15 days" },
          { item: "CM44A/CM44C & BO1", amount: "No separate BIPA fee", note: "Part of 5–15 days" },
          { item: "CM46/CM47", amount: "Nominal — confirm at lodgement", note: "Few days after reg. number issued" },
          { item: "Notarisation", amount: "N$50–N$200 per doc / US$3.03–$12.12", note: "Same day" },
          { item: "Prospectus registration with BIPA", amount: "Confirm if offering shares to public", note: "Only when shares actually offered to the public" },
          { item: "NamRA TIN / VAT / SSC / trading licence", amount: "As for Pty Ltd (TIN/VAT/SSC no fee)", note: "See Pty Ltd post-registration schedule" },
        ],
        timeline: "End-to-end ≈ 3–5 weeks",
      },
      {
        type: "Close Corporation (CC)",
        localName: "CC — 1–10 members; limited liability; no shares",
        requirements: [
          "Best for: small/medium local businesses; simpler admin",
          "Name reservation (CC equivalent of CM5)",
          "CC1 — Founding Statement",
          "BO1 Beneficial Ownership (no separate BIPA fee)",
          "Notarisation of founding documents where required",
          "Post-registration: NamRA TIN; VAT if applicable; SSC if employing; trading licence if required",
        ],
        costs: [
          { item: "Name reservation (CC equivalent)", amount: "N$75 / US$4.55", note: "1–3 days" },
          { item: "CC1 — Founding Statement", amount: "Confirm at lodgement (lower than Pty bundle)", note: "5–10 days" },
          { item: "BO1 Beneficial Ownership", amount: "No separate BIPA fee", note: "Part of registration" },
          { item: "Notarisation", amount: "N$50–N$200 per doc / US$3.03–$12.12", note: "Same day" },
          { item: "NamRA TIN registration", amount: "No fee / US$0", note: "3–5 days" },
          { item: "SSC / VAT / trading licence", amount: "As applicable (TIN/VAT/SSC no fee)", note: "Trading licence N$200–N$1,000+ if required" },
        ],
        timeline: "End-to-end ≈ 2–4 weeks",
      },
      {
        type: "Sole Proprietorship",
        localName: "1 individual — unlimited liability",
        requirements: [
          "Best for: freelancers, consultants, very small traders",
          "Business name registration with BIPA",
          "NamRA TIN; VAT if turnover > N$500,000",
          "SSC if employing staff",
          "Municipal/sector trading licence for premises-based or regulated trades",
        ],
        costs: [
          { item: "Business name registration", amount: "Confirm at lodgement (lowest-cost item)", note: "Few days" },
          { item: "NamRA TIN registration", amount: "No fee / US$0", note: "3–5 days" },
          { item: "NamRA VAT (if turnover > N$500,000)", amount: "No fee / US$0", note: "With TIN" },
          { item: "SSC employer & employee registration", amount: "No fee / US$0", note: "1–2 days" },
          { item: "Municipal/sector trading licence", amount: "N$200–N$1,000+ / US$12.12–$60.60+", note: "5–15 days where required" },
        ],
        timeline: "End-to-end ≈ 1–2 weeks",
      },
      {
        type: "External Company (Branch)",
        localName: "Branch of foreign company — liability sits with parent",
        requirements: [
          "Best for: foreign companies wanting a local branch, not a new Namibian entity",
          "External company registration bundle with BIPA (CM46 equivalent)",
          "Apostille / legalisation of home-country documents (often the longest step)",
          "Post-registration: NamRA TIN; VAT/SSC/trading licence as applicable",
        ],
        costs: [
          { item: "External company registration bundle", amount: "Confirm at lodgement", note: "Part of 3–6 weeks registration phase" },
          { item: "Apostille / legalisation of home-country documents", amount: "Set by home country — not a Namibian fee", note: "Varies; often the bottleneck" },
          { item: "NamRA TIN registration", amount: "No fee / US$0", note: "3–5 days" },
          { item: "SSC / VAT / trading licence", amount: "As applicable", note: "See shared post-registration schedule" },
        ],
        timeline: "End-to-end ≈ 5–9 weeks (apostille turnaround usually the bottleneck)",
      },
    ],
    notes:
      "Verified from Republic of Namibia Business Registration Guide for Corporate Set Up Ltd (fees current as of July 2026). Authorities: BIPA (companies, CCs, business names, external companies); NamRA (TIN, income tax, VAT, PAYE); SSC (employer/employee funds); Ministry of Industrialisation & Trade / Municipality (trading licences & SME certificates). Indicative FX N$16.5 = US$1. Excludes professional/agent fees, courier and bank charges. Verify against BIPA/NamRA/SSC before binding client quotes.",
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
