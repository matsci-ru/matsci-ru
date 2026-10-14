const S = window.SITE, P = document.body.dataset.page, $ = (s, r = document) => r.querySelector(s);
const fmt = d => d ? new Date(d + "T00:00").toLocaleDateString("en-GB", {day: "numeric", month: "short", year: "numeric"}) : "";
const today = new Date().toISOString().slice(0, 10);
const PAGES = [["index", "Home"], ["about", "About"], ["events", "Events"], ["blog", "News & Blog"], ["team", "Team"], ["join", "Join & Contact"]];

/* ---------- live data from Google Sheets (optional) ---------- */
const csv = t => { const r = []; let row = [], c = "", q = 0;
  for (let i = 0; i < t.length; i++) { const h = t[i];
    if (q) { if (h == '"' && t[i + 1] == '"') { c += '"'; i++; } else if (h == '"') q = 0; else c += h; }
    else if (h == '"') q = 1; else if (h == ",") { row.push(c); c = ""; }
    else if (h == "\n") { row.push(c); r.push(row); row = []; c = ""; } else if (h != "\r") c += h; }
  row.push(c); r.push(row); const k = r.shift().map(x => x.trim().toLowerCase());
  return r.filter(x => x.some(Boolean)).map(x => Object.fromEntries(k.map((n, i) => [n, (x[i] || "").trim()]))); };
async function live() { const L = S.live || {};
  try {
    if (L.events) S.events = csv(await (await fetch(L.events)).text());
    if (L.blog) S.blog = csv(await (await fetch(L.blog)).text()).map(p => ({...p, body: (p.body || "").split("||").map(s => s.trim())}));
  } catch (e) { console.warn("Live sheet unavailable, using data.js", e); } }

/* ---------- shared layout ---------- */
function layout() {
  const here = location.pathname.split("/").pop().replace(".html", "") || "index";
  $("#top").innerHTML = (S.notice && S.notice.text ? `<div class="notice"><a href="${S.notice.link}">${S.notice.text}</a></div>` : "") +
    `<nav><div class="wrap"><a class="brand" href="index.html"><img src="img/logo.png" alt=""><b>${S.name}</b></a><button id="mb" aria-expanded="false">Menu</button>
    <ul id="mn">${PAGES.map(p => `<li><a href="${p[0]}.html" class="${p[0] == here ? "on" : ""}">${p[1]}</a></li>`).join("")}</ul><a class="btn m sm" href="events.html">Register</a></div></nav>`;
  $("#mb").onclick = e => { const o = $("#mn").classList.toggle("open"); e.target.setAttribute("aria-expanded", o); };
  $("#bot").innerHTML = `<footer><div class="wrap"><div><h4>${S.name}</h4><p>${S.tagline}.<br>${S.address}</p></div>
    <div><h4>Pages</h4>${PAGES.map(p => `<a href="${p[0]}.html">${p[1]}</a>`).join("")}</div>
    <div><h4>Connect</h4><a href="mailto:${S.email}">${S.email}</a><a href="${S.facebook}" target="_blank" rel="noopener">Facebook</a><a href="${S.linkedin}" target="_blank" rel="noopener">LinkedIn</a></div></div>
    <div class="c">&copy; ${new Date().getFullYear()} ${S.name}, Department of Materials Science and Engineering, University of Rajshahi</div></footer>
    <dialog id="dlg"><div class="in"><button class="x" aria-label="Close" onclick="dlg.close()">&times;</button><div id="db"></div></div></dialog>`;
  document.title = (document.body.dataset.title ? document.body.dataset.title + " | " : "") + S.name;
}

/* ---------- building blocks ---------- */
const hdr = (t, s) => `<div class="band"><div class="wrap"><h1>${t}</h1><p>${s}</p></div></div>`;
const sec = (cls, inner) => `<section class="s ${cls}"><div class="wrap">${inner}</div></section>`;
const evs = () => S.events.map((e, i) => ({...e, i}));
const upc = () => evs().filter(e => e.date >= today).sort((a, b) => a.date.localeCompare(b.date));
const pst = () => evs().filter(e => e.date < today).sort((a, b) => b.date.localeCompare(a.date));
const evCard = e => { const up = e.date >= today, d = new Date(e.date + "T00:00");
  const btn = !up ? "" : e.form ? `<button class="btn m" data-reg="${e.i}">Register</button>` : `<button class="btn" disabled>Opens soon</button>`;
  return `<article class="ev ${up ? "" : "past"}"><div class="dt"><b>${d.getDate()}</b><span>${d.toLocaleString("en-GB", {month: "short"})} ${d.getFullYear()}</span></div>
  <div><h3>${e.title}</h3><p class="meta">${e.place || ""}</p><p>${e.desc || ""}</p></div><div class="ea">${btn}</div></article>`; };
const posts = () => S.blog.map((p, i) => ({...p, i})).sort((a, b) => b.date.localeCompare(a.date));
const postCard = p => `<a class="card" href="blog.html#p${p.i}"><small>${p.tag} | ${fmt(p.date)}</small><h3>${p.title}</h3><p>${p.summary}</p></a>`;
const tier = t => /^(President|General Secretary)$/.test(t[2]) ? 0 : /Vice President/.test(t[2]) ? 1 : /Assistant General/.test(t[2]) ? 2 : 3;
const pc = t => `<figure class="pc"><img src="${t[0]}" alt="${t[1]}, ${t[2]}" loading="lazy"></figure>`;
const fc = f => `<figure class="fc"><img src="${f[0]}" alt="${f[1]}"><figcaption><b>${f[1]}</b><span>${f[2]}</span></figcaption></figure>`;
const lead = () => S.team.filter(t => tier(t) == 0).sort((a, b) => a[2] == "President" ? -1 : 1);
const ctaBand = `<div class="cta"><div class="wrap"><h2>Be part of MatSci Club</h2><a class="btn m" href="join.html">Join the club</a></div></div>`;

/* ---------- pages ---------- */
const R = {
  index: () => `<header class="hero"><canvas id="lat" aria-hidden="true"></canvas><div class="wrap"><span class="est">Est. ${S.founded} | University of Rajshahi</span>
    <h1>${S.name}</h1><h2>${S.tagline}</h2><p>${S.intro}</p><a class="btn m" href="events.html">Upcoming events</a><a class="btn g" href="join.html">Become a member</a></div></header>`
    + sec("wh", `<h2 class="t">Who we are</h2><p class="sub">${S.about[0]}</p><a class="more" href="about.html">More about the club</a>
      <div class="grid">${S.programs.map(p => `<div class="card"><h3>${p[0]}</h3><p>${p[1]}</p></div>`).join("")}</div>`)
    + sec("", `<h2 class="t">Upcoming events</h2>${upc().slice(0, 3).map(evCard).join("") || `<p class="sub">No events scheduled right now. Follow us on Facebook for announcements.</p>`}<a class="more" href="events.html">All events and registration</a>`)
    + sec("dk", `<h2 class="t" style="text-align:center">Club leadership</h2><div class="lead2" style="margin-top:26px">${lead().map(pc).join("")}</div><p style="text-align:center"><a class="more" style="color:var(--gold)" href="team.html">Meet the full team</a></p>`)
    + sec("", `<h2 class="t">Latest news</h2><div class="grid">${posts().slice(0, 3).map(postCard).join("")}</div><a class="more" href="blog.html">All news and articles</a>`) + ctaBand,

  about: () => hdr("About the club", "Science learning, research and community for students of Materials Science and Engineering.")
    + sec("", `<div class="two"><div><h2 class="t">Our story</h2>${S.about.map(p => `<p>${p}</p>`).join("")}</div><div><h2 class="t">Who can join</h2><p>${S.membership}</p><a class="btn" href="join.html">How to join</a></div></div>`)
    + sec("wh", `<h2 class="t">What we do</h2><div class="grid">${S.programs.map(p => `<div class="card"><h3>${p[0]}</h3><p>${p[1]}</p></div>`).join("")}</div>`)
    + sec("", `<h2 class="t" style="text-align:center">Our founders</h2><div class="fnd" style="margin-top:28px">${S.founders.map(fc).join("")}</div>`) + ctaBand,

  events: () => hdr("Events and registration", "Register online for our upcoming programs. Past events are listed below.")
    + sec("", `<h2 class="t">Upcoming</h2>${upc().map(evCard).join("") || `<p class="sub">No upcoming events right now. Check back soon or follow us on Facebook.</p>`}
      ${pst().length ? `<h2 class="t" style="margin-top:56px">Past events</h2>${pst().map(evCard).join("")}` : ""}`)
    + (S.gallery.length ? sec("wh", `<h2 class="t">Gallery</h2><div class="gal">${S.gallery.map(g => `<img src="${g[0]}" alt="${g[1] || "MatSci Club event"}" loading="lazy">`).join("")}</div>`) : ""),

  blog: () => {
    const m = /^#p(\d+)$/.exec(location.hash), p = m && S.blog[+m[1]];
    if (p) return hdr("News and blog", "Stories, announcements and articles from MatSci Club.")
      + sec("", `<article class="art"><small style="color:var(--blue);font-weight:600">${p.tag} | ${fmt(p.date)} | ${p.author}</small><h1>${p.title}</h1>${p.body.map(x => `<p>${x}</p>`).join("")}<a class="more" href="blog.html">Back to all posts</a></article>`);
    const tags = ["All", ...new Set(S.blog.map(b => b.tag))];
    return hdr("News and blog", "Stories, announcements and articles from MatSci Club.")
      + sec("", `<div class="chips" id="chips">${tags.map(t => `<button aria-pressed="${t == "All"}" data-t="${t}">${t}</button>`).join("")}<input type="search" id="q" placeholder="Search" aria-label="Search posts"></div><div class="grid" id="pl"></div>`);
  },

  team: () => hdr("Our team", "The MatSci Club committee for 2026-27, and the people who started it.")
    + sec("", `<div class="h3" style="margin-top:0">Leadership</div><div class="lead2">${lead().map(pc).join("")}</div>
      <div class="h3">Vice Presidents</div><div class="g3">${S.team.filter(t => tier(t) == 1).map(pc).join("")}</div>
      <div class="h3">Assistant General Secretaries</div><div class="g3">${S.team.filter(t => tier(t) == 2).map(pc).join("")}</div>
      <div class="h3">Functional committee</div><div class="g3">${S.team.filter(t => tier(t) == 3).map(pc).join("")}</div>`)
    + sec("wh", `<h2 class="t" style="text-align:center">Founders</h2><div class="fnd" style="margin-top:28px">${S.founders.map(fc).join("")}</div>`),

  join: () => hdr("Join and contact", "Become a member, or get in touch with the committee.")
    + sec("", `<h2 class="t">How to join</h2><p class="sub">${S.membership}</p>
      <div class="steps"><div><h3>Apply</h3><p>${S.joinForm ? "Fill in the membership form." : "Email us your name, batch and roll number."}</p></div><div><h3>Meet the committee</h3><p>Submit your application to the President or General Secretary.</p></div><div><h3>Come to a monthly meeting</h3><p>Join the monthly meeting and start taking part in programs.</p></div></div>
      <p style="margin-top:26px">${S.joinForm ? `<a class="btn" href="${S.joinForm}" target="_blank" rel="noopener">Open membership form</a>` : `<a class="btn" href="mailto:${S.email}?subject=Membership%20request">Email to apply</a>`}</p>`)
    + sec("wh", `<h2 class="t">Questions</h2>${S.faq.map(f => `<details><summary>${f[0]}</summary><p>${f[1]}</p></details>`).join("")}`)
    + sec("", `<div class="two"><div><h2 class="t">Contact us</h2><p>${S.address}</p><p><a href="mailto:${S.email}">${S.email}</a></p>
      <p><a class="btn sm" href="${S.facebook}" target="_blank" rel="noopener">Facebook</a> <a class="btn sm" href="${S.linkedin}" target="_blank" rel="noopener">LinkedIn</a> <a class="btn sm m" href="https://www.google.com/maps/search/?api=1&query=University+of+Rajshahi+Materials+Science+and+Engineering" target="_blank" rel="noopener">Map</a></p></div>
      <form id="cf"><input id="cn" placeholder="Your name" required aria-label="Your name"><textarea id="cm" rows="4" placeholder="Your message" required aria-label="Your message"></textarea><button class="btn" type="submit">Send by email</button></form></div>`)
};

/* ---------- page behaviour ---------- */
function after() {
  if (!window._c) { window._c = 1; document.addEventListener("click", ev => { const b = ev.target.closest("[data-reg]"); if (!b) return;
    const e = S.events[b.dataset.reg], u = e.form + (e.form.includes("?") ? "&" : "?") + "embedded=true";
    $("#db").innerHTML = `<h3>Register: ${e.title}</h3><iframe src="${u}" title="Registration form" loading="lazy"></iframe><p><a href="${e.form}" target="_blank" rel="noopener">Open the form in a new tab</a> if it does not load.</p>`; dlg.showModal(); }); }
  if (P == "blog" && $("#pl")) { let tag = "All";
    const draw = () => { const q = $("#q").value.toLowerCase(), m = posts().filter(p => (tag == "All" || p.tag == tag) && (p.title + p.summary).toLowerCase().includes(q));
      $("#pl").innerHTML = m.map(postCard).join("") || `<p class="sub">No posts found.</p>`; };
    $("#chips").onclick = e => { if (!e.target.dataset.t) return; tag = e.target.dataset.t; document.querySelectorAll("#chips button").forEach(b => b.setAttribute("aria-pressed", b.dataset.t == tag)); draw(); };
    $("#q").oninput = draw; draw(); }
  if (P == "join" && $("#cf")) $("#cf").onsubmit = e => { e.preventDefault(); location.href = `mailto:${S.email}?subject=${encodeURIComponent("Message from " + $("#cn").value)}&body=${encodeURIComponent($("#cm").value)}`; };
  if ($("#lat")) lattice();
}
function lattice() {
  const c = $("#lat"), x = c.getContext("2d"), still = matchMedia("(prefers-reduced-motion:reduce)").matches; let W, H, A = [], m = {x: -999, y: -999};
  const build = () => { W = c.width = c.offsetWidth; H = c.height = c.offsetHeight; A = []; const s = W < 700 ? 44 : 56;
    for (let j = 0, r = 0; j < H + s; j += s * .87, r++) for (let i = (r % 2) * s / 2; i < W + s; i += s) A.push({hx: i, hy: j, x: i, y: j}); };
  const draw = () => { x.clearRect(0, 0, W, H);
    for (const a of A) { const dx = a.x - m.x, dy = a.y - m.y, d = Math.hypot(dx, dy); if (d < 130 && d > 0) { const f = (130 - d) / 130 * 6; a.x += dx / d * f; a.y += dy / d * f; } a.x += (a.hx - a.x) * .08; a.y += (a.hy - a.y) * .08; }
    x.strokeStyle = "rgba(110,160,200,.25)"; const L = W < 700 ? 48 : 60;
    for (const a of A) for (const b of A) if ((b.hx > a.hx || b.hy > a.hy) && Math.hypot(a.hx - b.hx, a.hy - b.hy) < L) { x.beginPath(); x.moveTo(a.x, a.y); x.lineTo(b.x, b.y); x.stroke(); }
    for (const a of A) { const hot = Math.hypot(a.x - m.x, a.y - m.y) < 130; x.fillStyle = hot ? "#f2cf63" : "#4f8fc4"; x.beginPath(); x.arc(a.x, a.y, hot ? 4 : 3, 0, 6.3); x.fill(); }
    if (!still) requestAnimationFrame(draw); };
  addEventListener("pointermove", e => { const r = c.getBoundingClientRect(); m.x = e.clientX - r.left; m.y = e.clientY - r.top; });
  addEventListener("resize", () => { build(); if (still) draw(); }); build(); draw();
}
/* If an image file is missing (e.g. the img folder was not uploaded), show a neat placeholder instead of a broken icon */
document.addEventListener("error", e => { const i = e.target; if (i.tagName != "IMG" || i.dataset.f) return; i.dataset.f = 1;
  const d = document.createElement("div"); d.className = "ph"; d.textContent = i.alt || "Photo"; d.style.aspectRatio = i.closest(".fc") ? "4/5" : "1"; i.replaceWith(d);
  console.warn("Image not found:", i.getAttribute("src"), "- check that the img folder is uploaded next to index.html"); }, true);
(async () => { await live(); layout(); $("#app").innerHTML = R[P](); after();
  addEventListener("hashchange", () => { if (P == "blog") { $("#app").innerHTML = R.blog(); after(); scrollTo(0, 0); } }); })();
