# Country Requirements Knowledge Base

Personal HTML/CSS/JS notes for company setup across **54 African countries + Canada + United States** (same coverage as the auth-service location catalog).

## Open the site

- Double-click `index.html`, or
- From this folder: `npx --yes serve .` then open the printed URL

Country pages: `country.html?c=nigeria` (slug = lowercase name, accents stripped).

## Correct an entry

1. Open [`js/data.js`](js/data.js).
2. Find the country object (`slug`, `name`, `entities`, …).
3. Edit `requirements`, `costs`, `timeline`, or `notes`.
4. Save and refresh the browser.

### Cost object shape

```js
{ item: "CAC filing (approx)", amount: "≈ ₦10,000–₦50,000", note: "confirm on portal" }
```

### Entity object shape

```js
{
  type: "Private Limited Company",
  localName: "Ltd",
  requirements: ["..."],
  costs: [ /* as above */ ],
  timeline: "1–10 business days"
}
```

## Regenerate draft data (optional)

If you want to rebuild the draft file from templates (this **overwrites** `js/data.js`):

```bash
node tools/generate-data.js
```

Prefer editing `js/data.js` directly once you start verifying fees.

## Disclaimer

All figures and document lists are **draft estimates** for personal reference — not legal or tax advice. Verify with the local registrar or counsel.
