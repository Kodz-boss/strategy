/* global COUNTRIES */

function slugify(name) {
  return name
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

function getCountries() {
  return Array.isArray(window.COUNTRIES) ? window.COUNTRIES : [];
}

function findCountry(slug) {
  const key = (slug || "").toLowerCase();
  return getCountries().find((c) => c.slug === key) || null;
}

function escapeHtml(str) {
  return String(str ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function renderCountryCard(country) {
  const entityHint = country.entities?.[0]?.type
    ? `${country.entities.length} entity type${country.entities.length === 1 ? "" : "s"}`
    : "No entities yet";
  return `
    <a class="country-card" href="country.html?c=${encodeURIComponent(country.slug)}">
      <h2>${escapeHtml(country.name)}</h2>
      <p class="meta">${escapeHtml(country.regulator || "Registrar")} · ${escapeHtml(entityHint)}</p>
      <span class="tag">${escapeHtml(country.region)}</span>
    </a>
  `;
}

function renderEntity(entity) {
  const reqs = (entity.requirements || [])
    .map((r) => `<li>${escapeHtml(r)}</li>`)
    .join("");
  const costs = (entity.costs || [])
    .map(
      (c) => `
      <tr>
        <td>${escapeHtml(c.item)}</td>
        <td class="amount">${escapeHtml(c.amount)}</td>
        <td>${escapeHtml(c.note || "—")}</td>
      </tr>`
    )
    .join("");

  return `
    <section class="entity">
      <h2>${escapeHtml(entity.type)}</h2>
      ${entity.localName ? `<p class="local-name">Also known as: ${escapeHtml(entity.localName)}</p>` : ""}
      <h3>Requirements</h3>
      <ul>${reqs || "<li>None listed yet</li>"}</ul>
      <h3>Approximate costs</h3>
      <table class="cost-table">
        <thead>
          <tr><th>Item</th><th>Amount</th><th>Note</th></tr>
        </thead>
        <tbody>${costs || `<tr><td colspan="3">No cost notes yet</td></tr>`}</tbody>
      </table>
      ${entity.timeline ? `<p class="timeline"><strong>Typical timeline:</strong> ${escapeHtml(entity.timeline)}</p>` : ""}
    </section>
  `;
}

function renderCountryDetail(country) {
  document.title = `${country.name} · Requirements`;
  const entities = (country.entities || []).map(renderEntity).join("");
  return `
    <header class="detail-header">
      <p class="eyebrow">${escapeHtml(country.region)}</p>
      <h1>${escapeHtml(country.name)}</h1>
      <p class="detail-meta">
        <span>Regulator: <strong>${escapeHtml(country.regulator || "—")}</strong></span>
        <span>Currency: <strong>${escapeHtml(country.currency || "—")}</strong></span>
      </p>
    </header>
    <div class="disclaimer" role="note">
      <strong>Draft estimates.</strong> Verify fees and document lists with ${escapeHtml(country.regulator || "the local registrar")} or counsel before acting.
    </div>
    ${entities}
    ${country.notes ? `<aside class="country-notes">${escapeHtml(country.notes)}</aside>` : ""}
  `;
}

function initIndex() {
  const grid = document.getElementById("country-grid");
  const empty = document.getElementById("empty-state");
  const search = document.getElementById("search");
  const countEl = document.getElementById("result-count");
  const letterWrap = document.getElementById("letter-filters");
  const regionButtons = document.querySelectorAll(".region-toggles .chip");

  let activeLetter = "all";
  let activeRegion = "all";

  const countries = getCountries().slice().sort((a, b) => a.name.localeCompare(b.name));

  const letters = [...new Set(countries.map((c) => c.name[0].toUpperCase()))].sort();
  letterWrap.innerHTML =
    `<button type="button" class="letter-btn active" data-letter="all">All</button>` +
    letters
      .map((l) => `<button type="button" class="letter-btn" data-letter="${l}">${l}</button>`)
      .join("");

  function applyFilters() {
    const q = (search.value || "").trim().toLowerCase();
    const filtered = countries.filter((c) => {
      if (activeRegion !== "all" && c.region !== activeRegion) return false;
      if (activeLetter !== "all" && c.name[0].toUpperCase() !== activeLetter) return false;
      if (!q) return true;
      const hay = [
        c.name,
        c.regulator,
        c.currency,
        ...(c.entities || []).flatMap((e) => [e.type, e.localName, ...(e.requirements || [])]),
      ]
        .filter(Boolean)
        .join(" ")
        .toLowerCase();
      return hay.includes(q);
    });

    grid.innerHTML = filtered.map(renderCountryCard).join("");
    empty.hidden = filtered.length > 0;
    countEl.textContent = `${filtered.length} of ${countries.length} countries`;
  }

  letterWrap.addEventListener("click", (e) => {
    const btn = e.target.closest(".letter-btn");
    if (!btn) return;
    activeLetter = btn.dataset.letter;
    letterWrap.querySelectorAll(".letter-btn").forEach((b) => b.classList.toggle("active", b === btn));
    applyFilters();
  });

  regionButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      activeRegion = btn.dataset.region;
      regionButtons.forEach((b) => b.classList.toggle("active", b === btn));
      applyFilters();
    });
  });

  search.addEventListener("input", applyFilters);
  applyFilters();
}

function initCountry() {
  const root = document.getElementById("country-root");
  const params = new URLSearchParams(window.location.search);
  const slug = params.get("c") || params.get("slug") || "";
  const country = findCountry(slug);

  if (!country) {
    root.innerHTML = `
      <div class="not-found">
        <h1>Country not found</h1>
        <p class="lede">No entry for “${escapeHtml(slug || "(missing)")}”. <a href="index.html">Back to the list</a>.</p>
      </div>
    `;
    return;
  }

  root.innerHTML = renderCountryDetail(country);
}

window.slugify = slugify;
window.initIndex = initIndex;
window.initCountry = initCountry;
