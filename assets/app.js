// ============================================================
// app.js — renders every page from the content/*.js files.
// You should never need to edit this to update content.
// ============================================================
(function () {
  const S = window.SITE || {};
  const esc = (s) => String(s == null ? "" : s)
    .replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

  const PAGES = [
    ["index.html", "About"],
    ["research.html", "Research"],
    ["experience.html", "Experience"],
    ["writing.html", "Writing"],
    ["reading.html", "Reading"],
    ["community.html", "Community"]
  ];

  // ---------- shared chrome ----------
  function renderNav(active) {
    const links = PAGES.map(([href, label]) =>
      `<a class="nav-link${label === active ? " active" : ""}" href="${href}">${label}</a>`
    ).join("");
    return `<nav class="nav"><div class="nav-inner">
      <a class="wordmark" href="index.html">
        <span class="monogram">${esc(S.monogram)}</span>
        <span class="wordmark-name">${esc(S.name)}</span>
      </a>
      <div class="nav-links">${links}
        <a class="btn small" href="${esc(S.calendarUrl)}" target="_blank" rel="noopener">Book a time</a>
      </div>
    </div></nav>`;
  }

  function renderFooter() {
    return `<footer class="footer"><div class="footer-inner">
      <div style="display:flex; align-items:center; gap:12px;">
        <span class="monogram small">${esc(S.monogram)}</span>
        <span style="font-size:15px; font-weight:500;">${esc(S.name)}</span>
      </div>
      <div class="meta">${esc(S.domain)} · © ${new Date().getFullYear()} · built with intent</div>
    </div></footer>`;
  }

  const thumbBg = (t) => {
    if (t === "stone") return "background:var(--stone);";
    if (t === "mist") return "background:var(--mist); border-bottom:1px solid var(--border);";
    if (t === "ivory") return "background:var(--ivory); border-bottom:1px solid var(--border);";
    return `background:var(--stone);`;
  };
  const thumbEl = (t, h) => {
    if (t && /\.(png|jpe?g|webp|svg|gif)$/i.test(t))
      return `<div style="height:${h}px; overflow:hidden;"><img src="${esc(t)}" alt="" style="width:100%; height:100%; object-fit:cover;"></div>`;
    return `<div style="height:${h}px; ${thumbBg(t)}"></div>`;
  };
  const linksRow = (links) => (links && links.length)
    ? `<div class="links-row" style="margin-top:16px;">${links.map(l =>
        `<a href="${esc(l.url)}" target="_blank" rel="noopener">${esc(l.label)} →</a>`).join("")}</div>`
    : "";

  // ---------- ABOUT ----------
  function renderAbout(el) {
    const A = window.ABOUT;
    const dotColor = { accent: "var(--accent)", mark: "var(--mark)", ink: "var(--ink)" };
    const socials = (S.socials || []).map(s =>
      `<a href="${esc(s.url)}" target="_blank" rel="noopener" style="color:var(--text-secondary);">${esc(s.label)}</a>`).join("");

    el.innerHTML = `
    <div class="wrap hero" style="display:flex; gap:64px; align-items:center; padding-top:92px; padding-bottom:76px;">
      <div style="flex:1.55;">
        <div class="eyebrow" style="margin-bottom:22px;">${esc(S.role)}</div>
        <h1 style="font-size:54px; line-height:1.08; font-weight:500; letter-spacing:-0.01em; margin:0;">${esc(S.name)}</h1>
        <div style="font-size:24px; line-height:1.4; font-style:italic; color:var(--accent); margin-top:14px;">${esc(A.mission)}</div>
        <div style="font-size:17px; line-height:1.7; color:var(--text-secondary); margin-top:20px; max-width:540px;">${esc(A.lead)}</div>
        <div style="display:flex; align-items:center; gap:16px; margin-top:32px;">
          <a class="btn" href="research.html">Read the work</a>
          <a class="btn ghost" href="#contact">Book a conversation</a>
        </div>
      </div>
      <div style="flex:1; display:flex; justify-content:center;">
        <div style="width:290px; height:350px; border:1px solid var(--border); background:var(--mist); overflow:hidden;">
          <img src="${esc(A.portrait)}" alt="Portrait of ${esc(S.name)}"
               style="width:100%; height:100%; object-fit:cover;"
               onerror="this.outerHTML='&lt;div style=&quot;width:100%;height:100%;display:flex;align-items:center;justify-content:center;font-family:var(--font-mono);font-size:11px;color:var(--text-muted);&quot;&gt;portrait — add assets/portrait.jpg&lt;/div&gt;'">
        </div>
      </div>
    </div>

    <div style="border-top:1px solid var(--border); background:var(--surface-card);">
      <div class="wrap" style="padding-top:76px; padding-bottom:84px;">
        <div class="eyebrow" style="margin-bottom:20px;">What I stand for</div>
        <div style="font-size:38px; line-height:1.25; font-weight:500; max-width:900px;">
          ${A.values.map(v => esc(v.name)).join(' <span style="color:var(--mark); font-weight:400;">/</span> ')}
        </div>
        <div class="grid-3" style="display:grid; grid-template-columns:repeat(3,1fr); gap:40px; margin-top:44px;">
          ${A.values.map(v => `
          <div>
            <div style="width:9px; height:9px; background:${dotColor[v.dot] || "var(--accent)"}; margin-bottom:16px;"></div>
            <div style="font-size:20px; font-weight:500; margin-bottom:10px;">${esc(v.name)}</div>
            <div style="font-size:15px; line-height:1.8; color:var(--text-secondary);">${esc(v.text)}</div>
          </div>`).join("")}
        </div>
      </div>
    </div>

    <div class="wrap two-col" style="display:flex; gap:64px; align-items:flex-start; padding-top:80px; padding-bottom:80px;">
      <div style="flex:1.55;">
        <div class="eyebrow">About me</div>
        <div style="font-size:28px; font-weight:500; margin-bottom:22px;">${esc(A.bioTitle)}</div>
        ${A.bio.map((p, i) => `<div style="font-size:${i === 0 ? 17 : 15}px; line-height:${i === 0 ? 1.7 : 1.8}; color:${i === 0 ? "var(--text-primary)" : "var(--text-secondary)"}; margin-top:${i === 0 ? 0 : 18}px;">${esc(p)}</div>`).join("")}
      </div>
      <div style="flex:1; border-left:1px solid var(--border); padding-left:40px;">
        ${A.glance.map(g => `
        <div style="margin-bottom:26px;">
          <div class="eyebrow" style="font-size:11px; margin-bottom:8px;">${esc(g.label)}</div>
          <div style="font-size:15px; line-height:1.6;">${esc(g.text)}</div>
        </div>`).join("")}
      </div>
    </div>

    <div id="contact" style="border-top:1px solid var(--border); background:var(--surface-card); scroll-margin-top:72px;">
      <div class="wrap" style="padding-top:76px; padding-bottom:76px;">
        <div style="font-size:38px; font-weight:500; margin-bottom:8px;">Let's talk.</div>
        <div style="font-size:17px; line-height:1.7; color:var(--text-secondary); max-width:520px; margin-bottom:44px;">Whether you're a collaborator, a funder, or just curious — I'd genuinely like to hear from you.</div>
        <div class="grid-2" style="display:grid; grid-template-columns:1fr 1fr; gap:32px;">
          <div style="border:1px solid var(--border); padding:34px 36px; background:var(--bg-page);">
            <div class="eyebrow" style="font-size:11px; margin-bottom:14px;">Set up a meeting</div>
            <div style="font-size:20px; font-weight:500; margin-bottom:10px;">Book a conversation</div>
            <div style="font-size:13px; line-height:1.7; color:var(--text-secondary); margin-bottom:24px;">Grab 30 minutes on my calendar. Short intros welcome; no agenda required.</div>
            <a class="btn" href="${esc(S.calendarUrl)}" target="_blank" rel="noopener">Open calendar →</a>
          </div>
          <div style="border:1px solid var(--border); padding:34px 36px; background:var(--bg-page);">
            <div class="eyebrow" style="font-size:11px; margin-bottom:14px;">Leave a note</div>
            <div style="font-size:20px; font-weight:500; margin-bottom:10px;">Quick feedback</div>
            <textarea id="fb-text" placeholder="Say something honest…" style="height:84px; resize:vertical;"></textarea>
            <button class="btn" id="fb-send" style="margin-top:14px; padding:12px 22px;">Send</button>
            <div class="meta" style="margin-top:12px;">opens your mail app — a backend can replace this later</div>
          </div>
        </div>
        <div style="display:flex; flex-wrap:wrap; gap:30px; margin-top:36px; font-family:var(--font-sans); font-size:13px;">
          <a href="mailto:${esc(S.email)}">${esc(S.email)}</a>${socials}
        </div>
      </div>
    </div>`;

    const btn = el.querySelector("#fb-send");
    btn.addEventListener("click", () => {
      const t = el.querySelector("#fb-text").value.trim();
      if (!t) return;
      location.href = `mailto:${S.email}?subject=${encodeURIComponent("Note from " + S.domain)}&body=${encodeURIComponent(t)}`;
    });
  }

  // ---------- RESEARCH ----------
  function renderResearch(el) {
    const R = window.RESEARCH || [];
    const areas = ["All", ...new Set(R.map(r => r.area))];
    let current = "All";

    function chips() {
      return areas.map(a =>
        `<button data-area="${esc(a)}" class="chip" style="font-family:var(--font-sans); font-size:11px; letter-spacing:0.04em; border:none; cursor:pointer; padding:6px 13px; ${a === current
          ? "color:var(--text-on-accent); background:var(--accent);"
          : "color:var(--accent); background:var(--accent-tint);"}">${esc(a)}</button>`).join("");
    }
    function metaRows(r, inline) {
      return `<div class="meta" style="display:flex; ${inline ? "gap:24px;" : "flex-direction:column; gap:6px;"} margin-top:18px;">
        <span><span class="k">venue</span> — ${esc(r.venue)}</span>
        <span><span class="k">with</span> — ${esc(r.advisor)}</span>
      </div>`;
    }
    function featuredCard(r) {
      return `<div class="card" style="display:flex; margin-bottom:32px;">
        <div style="width:380px; flex-shrink:0; ${thumbBg(r.thumb)}"></div>
        <div style="padding:36px 40px; flex:1;">
          <div style="display:flex; gap:10px; margin-bottom:16px;">
            <span class="tag">${esc(r.area)}</span><span class="tag sage">Featured</span>
          </div>
          <div style="font-size:26px; line-height:1.25; font-weight:500;">${esc(r.title)}</div>
          <div style="font-size:15px; line-height:1.8; color:var(--text-secondary); margin-top:12px; max-width:520px;">${esc(r.description)}</div>
          ${metaRows(r, true)}${linksRow(r.links)}
        </div>
      </div>`;
    }
    function gridCard(r) {
      return `<div class="card">
        ${thumbEl(r.thumb, 170)}
        <div style="padding:26px 28px 30px;">
          <span class="tag${r.area === "Governance" ? " neutral" : ""}">${esc(r.area)}</span>
          <div style="font-size:20px; line-height:1.3; font-weight:500; margin-top:14px;">${esc(r.title)}</div>
          <div style="font-size:13px; line-height:1.7; color:var(--text-secondary); margin-top:10px;">${esc(r.description)}</div>
          ${metaRows(r, false)}${linksRow(r.links)}
        </div>
      </div>`;
    }
    function draw() {
      const rows = R.filter(r => current === "All" || r.area === current);
      const feat = rows.filter(r => r.featured);
      const rest = rows.filter(r => !r.featured);
      el.innerHTML = `
      <div class="wrap page-head">
        <div class="eyebrow">Research</div>
        <h1 class="page-title" style="margin:0;">Work I'd defend line by line.</h1>
        <div class="page-lead">Papers and projects across interpretability, alignment, and governance — with the code, the venue, and the people I did them with.</div>
        <div id="chips" style="display:flex; flex-wrap:wrap; gap:12px; margin-top:28px;">${chips()}</div>
      </div>
      <div class="wrap" style="padding-bottom:60px;">
        ${feat.map(featuredCard).join("")}
        <div class="grid-2" style="display:grid; grid-template-columns:1fr 1fr; gap:28px;">${rest.map(gridCard).join("")}</div>
      </div>`;
      el.querySelectorAll(".chip").forEach(c =>
        c.addEventListener("click", () => { current = c.dataset.area; draw(); }));
    }
    draw();
  }

  // ---------- EXPERIENCE ----------
  function renderExperience(el) {
    const E = window.EXPERIENCE || [];
    el.innerHTML = `
    <div class="wrap page-head">
      <div class="eyebrow">Experience</div>
      <h1 class="page-title" style="margin:0;">Where I've worked, and what I left better.</h1>
      <div class="page-lead">Roles, teams, and the concrete things I accomplished with each.</div>
    </div>
    <div class="wrap" style="padding-bottom:60px;">
      ${E.map(x => `
      <div class="two-col" style="display:flex; gap:40px; padding:40px 0; border-top:1px solid var(--border); align-items:flex-start;">
        <div style="width:84px; height:84px; flex-shrink:0; border:1px solid var(--border); background:var(--paper); display:flex; align-items:center; justify-content:center; overflow:hidden;">
          ${x.logo ? `<img src="${esc(x.logo)}" alt="${esc(x.org)} logo" style="width:100%; height:100%; object-fit:contain;">`
                   : `<span class="meta">logo</span>`}
        </div>
        <div style="flex:1;">
          <div style="display:flex; flex-wrap:wrap; align-items:baseline; justify-content:space-between; gap:8px;">
            <div style="font-size:24px; font-weight:500;">${esc(x.org)} <span style="font-size:17px; font-weight:400; color:var(--text-secondary); font-style:italic;">— ${esc(x.role)}</span></div>
            <div class="meta">${esc(x.dates)}</div>
          </div>
          <div style="display:flex; flex-direction:column; gap:10px; margin-top:18px;">
            ${x.bullets.map(b => `
            <div style="display:flex; gap:12px; align-items:baseline;">
              <span style="width:7px; height:7px; background:var(--mark); flex-shrink:0; position:relative; top:-2px;"></span>
              <span style="font-size:15px; line-height:1.7; color:var(--text-secondary);">${esc(b)}</span>
            </div>`).join("")}
          </div>
          ${linksRow(x.links)}
        </div>
      </div>`).join("")}
    </div>`;
  }

  // ---------- WRITING ----------
  function renderWriting(el) {
    const W = (window.WRITING || []).slice()
      .sort((a, b) => b.date.localeCompare(a.date));
    const fmt = (d) => {
      const dt = new Date(d + "T00:00:00");
      return dt.toLocaleDateString("en-US", { month: "short", day: "2-digit" });
    };
    const byYear = {};
    W.forEach(w => { const y = w.date.slice(0, 4); (byYear[y] = byYear[y] || []).push(w); });
    const years = Object.keys(byYear).sort((a, b) => b - a);

    el.innerHTML = `
    <div class="wrap page-head" style="max-width:840px;">
      <div class="eyebrow">Writing</div>
      <h1 class="page-title" style="margin:0;">Essays &amp; notes.</h1>
      <div class="page-lead">Informal, honest, and written to be understood. The reasoning matters as much as the result.</div>
    </div>
    <div class="wrap" style="max-width:840px; padding-bottom:40px;">
      ${years.map(y => `
        <div class="meta" style="margin:32px 0 8px;">${y}</div>
        ${byYear[y].map(w => `
        <a href="${esc(w.url)}" style="display:flex; gap:28px; align-items:baseline; padding:24px 0; border-top:1px solid var(--rule); color:var(--text-primary);">
          <span class="meta" style="width:80px; flex-shrink:0;">${fmt(w.date)}</span>
          <span style="flex:1;">
            <span style="font-size:22px; font-weight:500;">${esc(w.title)}</span>
            <span style="display:block; font-size:13px; line-height:1.7; color:var(--text-secondary); margin-top:6px;">${esc(w.dek)}</span>
          </span>
          <span class="meta" style="flex-shrink:0;">${esc(w.minutes)} min</span>
        </a>`).join("")}`).join("")}
      <div style="border-top:1px solid var(--rule);"></div>
      <div style="margin-top:44px; border:1px dashed var(--grey-200); padding:32px 36px;">
        <span style="font-size:15px; line-height:1.7; color:var(--text-secondary); font-style:italic;">More soon — I write when I have something worth your time.</span>
      </div>
    </div>`;
  }

  // ---------- READING ----------
  function renderReading(el) {
    const R = window.READING || [];
    const reading = R.filter(r => r.status === "reading");
    const shelf = R.filter(r => r.status !== "reading");
    const statusTag = (s) => s === "finished"
      ? `<span class="tag sage">Finished</span>` : `<span class="tag clay">Put down</span>`;
    const coverBg = (c) => c === "mist" ? "background:var(--mist); border:1px solid var(--border);" : "background:var(--stone);";
    const coverEl = (r) => (r.cover && /\.(png|jpe?g|webp|svg|gif)$/i.test(r.cover))
      ? `<img src="${esc(r.cover)}" alt="" style="width:92px; height:132px; object-fit:cover; flex-shrink:0;">`
      : `<div style="width:92px; height:132px; flex-shrink:0; ${coverBg(r.cover)}"></div>`;

    el.innerHTML = `
    <div class="wrap page-head">
      <div class="eyebrow">Reading</div>
      <h1 class="page-title" style="margin:0;">What I'm consuming, and what I think of it.</h1>
      <div class="page-lead">Books, papers, and long-form things — with honest takes. If you think something would make me better, <a href="#recommend">recommend it</a>.</div>
    </div>

    <div class="wrap" style="padding-bottom:56px;">
      <div class="eyebrow" style="color:var(--text-secondary); margin-bottom:22px;">Currently reading</div>
      <div class="grid-2" style="display:grid; grid-template-columns:1fr 1fr; gap:28px;">
        ${reading.map(r => `
        <div class="card" style="padding:28px 30px; display:flex; gap:26px;">
          ${coverEl(r)}
          <div style="flex:1;">
            <span class="tag amber">Reading</span>
            <div style="font-size:20px; font-weight:500; margin-top:12px; line-height:1.3;">${esc(r.title)}</div>
            <div class="meta" style="margin-top:5px;">${esc(r.author)} · ${esc(r.kind)}</div>
            <div style="font-size:13px; line-height:1.7; color:var(--text-secondary); margin-top:12px; font-style:italic;">"${esc(r.take)}"</div>
          </div>
        </div>`).join("")}
      </div>
    </div>

    <div class="wrap" style="padding-bottom:64px;">
      <div class="eyebrow" style="color:var(--text-secondary); margin-bottom:8px;">The shelf</div>
      ${shelf.map(r => `
      <div style="display:flex; gap:28px; align-items:baseline; padding:24px 0; border-top:1px solid var(--rule);">
        <span class="meta" style="width:80px; flex-shrink:0;">${esc(r.date)}</span>
        <span style="flex:1;">
          <span style="font-size:20px; font-weight:500;">${esc(r.title)}</span>
          <span class="meta" style="margin-left:12px;">${esc(r.author)} · ${esc(r.kind)}</span>
          <span style="display:block; font-size:13px; line-height:1.7; color:var(--text-secondary); margin-top:6px;">${esc(r.take)}</span>
        </span>
        <span style="flex-shrink:0;">${statusTag(r.status)}</span>
      </div>`).join("")}
      <div style="border-top:1px solid var(--rule);"></div>
    </div>

    <div id="recommend" style="border-top:1px solid var(--border); background:var(--surface-card); scroll-margin-top:72px;">
      <div class="wrap two-col" style="display:flex; gap:64px; align-items:flex-start; padding-top:64px; padding-bottom:72px;">
        <div style="flex:1;">
          <div class="eyebrow" style="margin-bottom:14px;">For my betterment</div>
          <div style="font-size:28px; font-weight:500;">Recommend me something.</div>
          <div style="font-size:15px; line-height:1.8; color:var(--text-secondary); margin-top:14px; max-width:440px;">A book, a paper, an essay, a lecture — anything you think I should consume. Tell me why, and I'll tell you what I thought.</div>
        </div>
        <div style="flex:1; border:1px solid var(--border); background:var(--bg-page); padding:32px 34px;">
          <input type="text" id="rec-title" placeholder="Title / link" style="margin-bottom:12px;">
          <textarea id="rec-why" placeholder="Why should I read it?" style="height:76px; resize:vertical;"></textarea>
          <button class="btn" id="rec-send" style="margin-top:14px; padding:12px 22px;">Recommend</button>
          <div class="meta" style="margin-top:12px;">opens your mail app — a backend can replace this later</div>
        </div>
      </div>
    </div>`;

    el.querySelector("#rec-send").addEventListener("click", () => {
      const t = el.querySelector("#rec-title").value.trim();
      const w = el.querySelector("#rec-why").value.trim();
      if (!t && !w) return;
      location.href = `mailto:${S.email}?subject=${encodeURIComponent("Reading recommendation: " + t)}&body=${encodeURIComponent(w)}`;
    });
  }

  // ---------- COMMUNITY ----------
  function renderCommunity(el) {
    const C = window.COMMUNITY || [];
    const typeTag = (t) => {
      const cls = t === "Town Hall" ? "sage" : t === "Panelist" ? "amber" : t === "Lecture" ? "" : "neutral";
      return `<span class="tag ${cls}" style="width:104px; text-align:center; flex-shrink:0; text-transform:uppercase; letter-spacing:0.08em;">${esc(t)}</span>`;
    };
    el.innerHTML = `
    <div class="wrap page-head" style="max-width:960px;">
      <div class="eyebrow">Community</div>
      <h1 class="page-title" style="margin:0;">The work is only half the job.</h1>
      <div class="page-lead">Lectures, panels, town halls, and hosting — the ways I've tried to give the community around me more than I took.</div>
    </div>
    <div class="wrap" style="max-width:960px; padding-bottom:60px;">
      ${C.map((c, i) => `
      <div style="display:flex; gap:32px; padding:30px 0; border-top:1px solid ${i === 0 ? "var(--border)" : "var(--rule)"}; align-items:baseline;">
        <span class="meta" style="width:64px; flex-shrink:0;">${esc(c.year)}</span>
        ${typeTag(c.type)}
        <span style="flex:1;">
          <span style="font-size:21px; font-weight:500;">${esc(c.title)}</span>
          <span class="meta" style="display:block; margin-top:5px;">${esc(c.venue)}</span>
          <span style="display:block; font-size:13px; line-height:1.7; color:var(--text-secondary); margin-top:8px;">${esc(c.text)}</span>
        </span>
        ${c.link ? `<a href="${esc(c.link.url)}" target="_blank" rel="noopener" style="font-family:var(--font-sans); font-size:12px; flex-shrink:0;">${esc(c.link.label)} →</a>` : ""}
      </div>`).join("")}
      <div style="border-bottom:1px solid var(--border);"></div>
    </div>`;
  }

  // ---------- boot ----------
  const RENDERERS = {
    about: renderAbout, research: renderResearch, experience: renderExperience,
    writing: renderWriting, reading: renderReading, community: renderCommunity
  };
  document.addEventListener("DOMContentLoaded", () => {
    const page = document.body.dataset.page;
    const label = { about: "About", research: "Research", experience: "Experience", writing: "Writing", reading: "Reading", community: "Community" }[page];
    document.getElementById("nav").outerHTML = renderNav(label);
    document.getElementById("footer").outerHTML = renderFooter();
    const main = document.getElementById("main");
    (RENDERERS[page] || (() => {}))(main);
    document.title = `${label} · ${S.name}`;
  });
})();
