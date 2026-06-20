/* Laufcoach – Rendering-Logik (Vanilla JS, keine Abhängigkeiten) */
(function () {
  "use strict";
  const C = window.COACH;
  const $ = (id) => document.getElementById(id);
  const el = (tag, cls, html) => {
    const e = document.createElement(tag);
    if (cls) e.className = cls;
    if (html != null) e.innerHTML = html;
    return e;
  };

  const TYPE_COLORS = {
    long:  "#58a6ff",
    easy:  "#2ecc71",
    tempo: "#e67e22",
    race:  "#e74c3c",
    cross: "#9b59b6",
    form:  "#1abc9c",
    test:  "#f1c40f",
  };
  const TYPE_LABEL = {
    long: "Long", easy: "Locker", tempo: "Tempo", race: "Rennen",
    cross: "Kraft", form: "Technik", test: "Test",
  };

  const today = new Date();
  const startDate = new Date(C.athlete.startDate + "T00:00:00");
  const raceDate = new Date(C.race.date);

  function daysBetween(a, b) {
    return Math.round((b - a) / 86400000);
  }
  function fmtDate(iso) {
    const d = new Date(iso + (iso.length <= 10 ? "T00:00:00" : ""));
    return d.toLocaleDateString("de-CH", { day: "2-digit", month: "2-digit" });
  }

  /* ---------- HERO / COUNTDOWN ---------- */
  function renderHero() {
    document.querySelector(".badge").textContent = C.athlete.name + "s Laufcoach";
    $("raceName").textContent = C.race.name;
    $("goalTag").textContent = C.race.goal;
    $("raceMeta").textContent =
      `${fmtDate(C.race.date.slice(0, 10))}.2026 · 19:00 Uhr · ${C.race.distanceKm} km · ${C.race.location} · ${C.race.profile}`;

    const daysLeft = Math.max(0, daysBetween(today, raceDate));
    const weeksLeft = Math.floor(daysLeft / 7);
    const cd = $("countdown");
    cd.innerHTML = "";
    [
      { num: daysLeft, lbl: "Tage" },
      { num: weeksLeft, lbl: "Wochen" },
      { num: C.race.distanceKm, lbl: "km Ziel" },
      { num: C.race.goalTime.replace("ca. ", "").replace(" h", ""), lbl: "Zielzeit" },
    ].forEach((b) => {
      const box = el("div", "cd-box");
      box.appendChild(el("div", "num", b.num));
      box.appendChild(el("div", "lbl", b.lbl));
      cd.appendChild(box);
    });

    // Plan-Fortschritt (verstrichene Zeit Start → Rennen)
    const total = daysBetween(startDate, raceDate);
    const done = Math.min(total, Math.max(0, daysBetween(startDate, today)));
    const pct = Math.round((done / total) * 100);
    $("planProgress").style.width = pct + "%";
    $("progressLabel").textContent = `Vorbereitung: Tag ${done} von ${total} (${pct} %)`;
  }

  /* ---------- AKTUELLE WOCHE ---------- */
  function currentWeekIndex() {
    for (let i = 0; i < C.weeks.length; i++) {
      const w = C.weeks[i];
      const from = new Date(w.from + "T00:00:00");
      const to = new Date(w.to + "T23:59:59");
      if (today >= from && today <= to) return i;
    }
    if (today < new Date(C.weeks[0].from + "T00:00:00")) return 0;
    return C.weeks.length - 1;
  }

  function sessionNode(s) {
    const node = el("div", "session");
    node.appendChild(el("span", "dot", "")).style.background =
      TYPE_COLORS[s.type] || "#888";
    const body = el("div");
    const prio = s.prio === 1 ? '<span class="prio-badge">★ Wichtigste</span> ' : "";
    body.appendChild(el("div", "st", prio + s.title));
    body.appendChild(el("div", "sd", s.detail));
    node.appendChild(body);
    return node;
  }

  function renderThisWeek() {
    const w = C.weeks[currentWeekIndex()];
    const box = $("thisWeek");
    box.innerHTML = "";
    const head = el("div");
    head.appendChild(el("div", "st", `Woche ${w.n} · ${w.title}`));
    head.appendChild(el("div", "week-focus", `${fmtDate(w.from)}–${fmtDate(w.to)} · ${w.focus}`));
    box.appendChild(head);
    w.sessions
      .slice()
      .sort((a, b) => a.prio - b.prio)
      .forEach((s) => box.appendChild(sessionNode(s)));
  }

  /* ---------- BASELINE ---------- */
  function renderBaseline() {
    const b = C.baseline;
    const stats = [
      { v: b.distanceKm + " km", k: "12-Min-Test" },
      { v: b.pace, k: "Tempo" },
      { v: b.vo2max, k: "VO₂max" },
      { v: b.avgHr, k: "Ø Puls" },
      { v: b.maxHr, k: "Max Puls" },
      { v: b.cadence, k: "Frequenz spm" },
    ];
    const g = $("baselineStats");
    stats.forEach((s) => {
      const c = el("div", "stat");
      c.appendChild(el("div", "v", s.v));
      c.appendChild(el("div", "k", s.k));
      g.appendChild(c);
    });
    const ul = $("baselineHighlights");
    b.highlights.forEach((h) => ul.appendChild(el("li", null, h)));
  }

  /* ---------- ZONEN ---------- */
  function renderHrZones() {
    const box = $("hrZones");
    C.hrZones.forEach((z) => {
      const row = el("div", "zone-row");
      const tag = el("div", "zone-tag", z.z);
      tag.style.background = z.color;
      row.appendChild(tag);
      const mid = el("div");
      mid.appendChild(el("div", "zone-name", z.name));
      mid.appendChild(el("div", "zone-use", z.use));
      row.appendChild(mid);
      row.appendChild(el("div", "zone-range", z.range));
      box.appendChild(row);
    });
    $("hrTip").textContent = C.hrTip;
  }

  function renderPaceZones() {
    const box = $("paceZones");
    C.paceZones.forEach((p) => {
      const row = el("div", "pace-row");
      const left = el("div");
      left.appendChild(el("div", "pname", p.name));
      left.appendChild(el("div", "pnote", p.note));
      row.appendChild(left);
      row.appendChild(el("div", "pval", p.pace));
      box.appendChild(row);
    });
    const rw = $("runWalk");
    rw.appendChild(el("div", "idea", C.runWalk.idea));
    C.runWalk.progression.forEach((r) => {
      const row = el("div", "rw-row");
      row.appendChild(el("span", "wk", "Woche " + r.week));
      row.appendChild(el("span", null, r.interval));
      rw.appendChild(row);
    });
  }

  /* ---------- WOCHENPLAN ---------- */
  function renderWeeks() {
    const cur = currentWeekIndex();
    const box = $("weeks");
    C.weeks.forEach((w, i) => {
      const card = el("div", "week" + (i === cur ? " current open" : ""));
      const head = el("div", "week-head");
      head.appendChild(el("span", "week-num", "W" + w.n));
      const t = el("div");
      t.appendChild(el("div", "wt", w.title));
      t.appendChild(el("div", "wd", `${fmtDate(w.from)}–${fmtDate(w.to)}`));
      head.appendChild(t);
      if (i === cur) head.appendChild(el("span", "now-pill", "Jetzt"));
      head.appendChild(el("span", "chev", "›"));
      head.addEventListener("click", () => card.classList.toggle("open"));
      card.appendChild(head);

      const body = el("div", "week-body");
      body.appendChild(el("div", "week-focus", w.focus));
      w.sessions
        .slice()
        .sort((a, b) => a.prio - b.prio)
        .forEach((s) => body.appendChild(sessionNode(s)));
      card.appendChild(body);
      box.appendChild(card);
    });
  }

  /* ---------- NOTIZEN ---------- */
  function renderNotes() {
    const box = $("notes");
    C.notes.forEach((n) => {
      const node = el("div", "note");
      node.appendChild(el("div", "ic", n.icon));
      const body = el("div");
      body.appendChild(el("div", "nt", n.title));
      body.appendChild(el("div", "nx", n.text));
      node.appendChild(body);
      box.appendChild(node);
    });
  }

  /* ---------- LOG ---------- */
  function renderLog() {
    const runs = C.log.filter((l) => l.type !== "cross");
    const totalKm = runs.reduce((s, l) => s + (l.distanceKm || 0), 0);
    const longest = runs.reduce((m, l) => Math.max(m, l.distanceKm || 0), 0);
    const sessions = C.log.length;
    const totalMin = C.log.reduce((s, l) => s + (l.durationMin || 0), 0);

    const stats = [
      { v: totalKm.toFixed(1), k: "km gesamt" },
      { v: sessions, k: "Einheiten" },
      { v: longest.toFixed(1), k: "längster Lauf" },
      { v: Math.round(totalMin) + "′", k: "Zeit gesamt" },
    ];
    const g = $("logStats");
    stats.forEach((s) => {
      const c = el("div", "stat");
      c.appendChild(el("div", "v", s.v));
      c.appendChild(el("div", "k", s.k));
      g.appendChild(c);
    });

    const box = $("log");
    if (!C.log.length) {
      box.appendChild(el("div", "empty", "Noch keine Läufe eingetragen."));
      return;
    }
    C.log.forEach((l) => {
      const item = el("div", "log-item");
      const head = el("div", "log-head");
      head.appendChild(el("span", "log-date", fmtDate(l.date)));
      head.appendChild(el("span", "log-title", l.title));
      const tt = el("span", "log-type", TYPE_LABEL[l.type] || l.type);
      tt.style.background = (TYPE_COLORS[l.type] || "#888") + "33";
      tt.style.color = TYPE_COLORS[l.type] || "#aaa";
      head.appendChild(tt);
      item.appendChild(head);

      const m = el("div", "log-metrics");
      const add = (label, val) => { if (val != null && val !== "") m.appendChild(el("span", null, `${label}: <b>${val}</b>`)); };
      add("Distanz", l.distanceKm ? l.distanceKm + " km" : null);
      add("Dauer", l.durationMin ? l.durationMin + " min" : null);
      add("Tempo", l.avgPace);
      add("Ø Puls", l.avgHr);
      add("Max", l.maxHr);
      add("Frequenz", l.cadence ? l.cadence + " spm" : null);
      item.appendChild(m);
      if (l.note) item.appendChild(el("div", "log-note", "«" + l.note + "»"));
      box.appendChild(item);
    });
  }

  /* ---------- INIT ---------- */
  renderHero();
  renderThisWeek();
  renderBaseline();
  renderHrZones();
  renderPaceZones();
  renderWeeks();
  renderNotes();
  renderLog();
})();
