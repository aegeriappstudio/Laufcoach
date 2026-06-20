/*
 * Laufcoach – Datenmodell
 * --------------------------------------------------------------------------
 * Alle Inhalte des Coaches (Profil, Zonen, Trainingsplan, Trainings-Log)
 * stehen in dieser Datei. Nach jedem Lauf wird hier unten ein neuer Eintrag
 * im `log` ergänzt – dann aktualisiert sich die App automatisch.
 * --------------------------------------------------------------------------
 */
window.COACH = {
  /* ----------------------------------------------------------------------
   * ATHLET:IN & ZIEL
   * -------------------------------------------------------------------- */
  athlete: {
    name: "Dani",
    age: 39,
    ageGroup: "30–39",
    hrMax: 181, // entspricht den Pulszonen deiner Galaxy Watch (Zone 5: 163–181) und max. Puls (220−39≈181)
    startDate: "2026-06-20",
  },

  race: {
    name: "26. Ägeriseelauf",
    date: "2026-07-24T19:00:00+02:00",
    distanceKm: 14.1,
    location: "Oberägeri (ZG)",
    profile: "Flach, Strasse & aufbereiteter Kies, rund um den Ägerisee, verkehrsfrei",
    aidStationsKm: [3.5, 5.5, 7.0, 11.5],
    goal: "Run/Walk · Ziel unter 1:40 h",
    goalTime: "< 1:40 h",
  },

  /* ----------------------------------------------------------------------
   * AUSGANGSLAGE – aus dem 12-Minuten-Lauftest (20.06.2026)
   * -------------------------------------------------------------------- */
  baseline: {
    test: "12-Minuten-Lauftest (Cooper)",
    distanceKm: 1.94,
    pace: "6:10 /km",
    avgHr: 157,
    maxHr: 178,
    vo2max: 32.9,
    vo2maxRating: "Schlecht (Alter 30–39)",
    vo2maxTrend: [36.5, 34.2, 32.1, 32.9],
    cadence: 145,
    groundContactMs: 193,
    verticalCm: 10.2,
    highlights: [
      "Über die Hälfte der Zeit in Puls-Zone 5 gelaufen → klares Signal: locker laufen lernen.",
      "Schrittfrequenz 145 spm ist niedrig → Ziel 165–170 (kürzere, schnellere Schritte).",
      "Bodenkontaktzeit & vertikale Bewegung «verbessern» → Kraft/Stabi und Steigerungen helfen.",
      "VO₂max-Trend zuletzt wieder leicht steigend (32,1 → 32,9) – guter Startpunkt.",
    ],
  },

  /* ----------------------------------------------------------------------
   * PULSZONEN (HRmax 181 – identisch zu deiner Watch)
   * -------------------------------------------------------------------- */
  hrZones: [
    { z: "Z1", name: "Erholung",        range: "90–108",  color: "#f1c40f", use: "Gehen / Warm-up" },
    { z: "Z2", name: "Locker (GA)",     range: "109–126", color: "#f39c12", use: "Sehr lockere Läufe" },
    { z: "Z3", name: "Aerob",           range: "127–144", color: "#2ecc71", use: "Lockere Dauerläufe – hier solltest du am meisten Zeit verbringen" },
    { z: "Z4", name: "Schwelle",        range: "145–162", color: "#e67e22", use: "Zügig / Tempo-Abschnitte" },
    { z: "Z5", name: "Maximum",         range: "163–181", color: "#e74c3c", use: "Nur kurze, harte Spitzen" },
  ],
  hrTip: "Faustregel für deine lockeren Läufe: Puls möglichst unter ~150 halten und der «Sprechtest» muss klappen – du solltest in ganzen Sätzen reden können. Lieber gehen als zu schnell laufen.",

  /* ----------------------------------------------------------------------
   * TEMPOZONEN (abgeleitet aus dem Test-Tempo 6:10 /km)
   * -------------------------------------------------------------------- */
  paceZones: [
    { name: "Long / Locker",      pace: "7:15–8:00 /km", note: "Grundlage – fühlt sich fast zu langsam an" },
    { name: "Zügiger Dauerlauf",  pace: "6:40–7:05 /km", note: "Kontrolliert, leicht angestrengt" },
    { name: "Renntempo (Ziel)",   pace: "6:55–7:05 /km", note: "Schnitt für unter 1:40 h (inkl. kurzer Gehpausen)" },
    { name: "Schwelle / Tempo",   pace: "6:10–6:35 /km", note: "Comfortably hard, nur kurze Blöcke" },
    { name: "Steigerungen",       pace: "5:45–6:05 /km", note: "15–20 s flott, locker, nicht sprinten" },
  ],

  /* ----------------------------------------------------------------------
   * RUN/WALK-PROGRESSION
   * -------------------------------------------------------------------- */
  runWalk: {
    idea: "Du läufst feste Intervalle und gehst dazwischen aktiv. Die Gehpause kommt VOR der Erschöpfung – das hält den Puls unten und schont die Beine. Über die Wochen wird der Lauf-Anteil länger.",
    progression: [
      { week: 1, interval: "Laufen 2' / Gehen 1'" },
      { week: 2, interval: "Laufen 3' / Gehen 1'" },
      { week: 3, interval: "Laufen 4' / Gehen 1'" },
      { week: 4, interval: "Laufen 5' / Gehen 1'" },
      { week: 5, interval: "Renntag: Laufen 4–5' / Gehen 1' (was sich gut anfühlt)" },
    ],
  },

  /* ----------------------------------------------------------------------
   * TRAININGSPLAN – 5 Wochen, flexibel (Session-Menü statt fixe Tage)
   * Priorität 1 = die lange Einheit ist nicht verhandelbar.
   * -------------------------------------------------------------------- */
  weeks: [
    {
      n: 1,
      from: "2026-06-20",
      to: "2026-06-28",
      title: "Basis & Bremsen",
      focus: "Locker laufen lernen + Run/Walk etablieren. Ziel: 2–3 Einheiten.",
      sessions: [
        { prio: 1, type: "long",  title: "Lange Einheit", detail: "ca. 4 km / ~40 min · Laufen 2' / Gehen 1' · sehr locker (Sprechtest!)" },
        { prio: 2, type: "easy",  title: "Lockerer Lauf", detail: "30 min · Laufen 2' / Gehen 1' · Puls unter 150 halten" },
        { prio: 3, type: "form",  title: "Lauf + Steigerungen", detail: "30 min locker + 4× 15 s zügig (Fokus: schnelle, kurze Schritte ~170 spm)" },
        { prio: 4, type: "cross", title: "Kraft & Mobility (optional)", detail: "20 min · Core, Waden, Hüfte, Einbeinstand – gegen Bodenkontaktzeit & Vertikalbewegung" },
      ],
    },
    {
      n: 2,
      from: "2026-06-29",
      to: "2026-07-05",
      title: "Umfang aufbauen",
      focus: "Mehr Zeit auf den Beinen, Lauf-Anteil steigern. Ziel: 3 Einheiten.",
      sessions: [
        { prio: 1, type: "long",  title: "Lange Einheit", detail: "ca. 6 km / ~55 min · Laufen 3' / Gehen 1' · locker" },
        { prio: 2, type: "easy",  title: "Lockerer Lauf", detail: "35 min · Laufen 3' / Gehen 1'" },
        { prio: 3, type: "tempo", title: "Tempo-Spiel", detail: "35 min: nach Einlaufen 5× (3 min zügig ~6:50 / 1 min Gehen) · Cadence hochhalten" },
        { prio: 4, type: "cross", title: "Kraft & Mobility (optional)", detail: "20 min Stabi/Core" },
      ],
    },
    {
      n: 3,
      from: "2026-07-06",
      to: "2026-07-12",
      title: "Spezifisch werden",
      focus: "Längere Läufe + erste Schwellen-Reize. Ziel: 3 Einheiten.",
      sessions: [
        { prio: 1, type: "long",  title: "Lange Einheit", detail: "ca. 8–9 km / ~75 min · Laufen 4' / Gehen 1' · locker, Verpflegung testen" },
        { prio: 2, type: "easy",  title: "Lockerer Lauf", detail: "40 min · Laufen 4' / Gehen 1'" },
        { prio: 3, type: "tempo", title: "Schwellen-Blöcke", detail: "40 min: 3× 6 min @ ~6:25 /km (durchlaufen) mit 2 min Gehen dazwischen" },
        { prio: 4, type: "cross", title: "Kraft & Mobility (optional)", detail: "20 min" },
      ],
    },
    {
      n: 4,
      from: "2026-07-13",
      to: "2026-07-19",
      title: "Peak – Generalprobe",
      focus: "Höchster Umfang. Die lange Einheit ist die Hauptprobe. Ziel: 3 Einheiten.",
      sessions: [
        { prio: 1, type: "long",  title: "Lange Einheit (Generalprobe)", detail: "ca. 11–12 km / ~1:45 h · Laufen 5' / Gehen 1' · Renn-Setup testen (Schuhe, Verpflegung, Startzeit 19 Uhr nachstellen)" },
        { prio: 2, type: "tempo", title: "Renntempo-Gefühl", detail: "40–45 min: 4× (6 min @ Renntempo ~7:00 / 1 min Gehen) – so fühlt sich unter 1:40 an" },
        { prio: 3, type: "easy",  title: "Lockerer Lauf", detail: "35 min · Laufen 5' / Gehen 1'" },
        { prio: 4, type: "cross", title: "Mobility leicht (optional)", detail: "15 min, locker halten" },
      ],
    },
    {
      n: 5,
      from: "2026-07-20",
      to: "2026-07-24",
      title: "Taper & Renntag 🏁",
      focus: "Erholen, frisch werden, Beine wachhalten. Wenig Umfang, volle Spannung.",
      sessions: [
        { prio: 2, type: "easy",  title: "Mo/Di – Locker + Steigerungen", detail: "30 min locker + 4× 15 s flott · danach 1–2 Ruhetage" },
        { prio: 3, type: "easy",  title: "Do – Beine wecken (optional)", detail: "20 min sehr locker · oder komplett ruhen" },
        { prio: 1, type: "race",  title: "Fr 24.07., 19:00 – ÄGERISEELAUF 14,1 km", detail: "Ziel < 1:40 h (Schnitt ~7:00/km). Run/Walk 4–5' / 1' · die ersten 3 km bewusst langsam (>7:10) · ab km 7 Tempo halten oder leicht steigern · an den Verpflegungen (km 3,5/5,5/7,0/11,5) kurz gehen & trinken." },
      ],
    },
  ],

  /* ----------------------------------------------------------------------
   * COACH-NOTIZEN – auf deine Daten zugeschnitten
   * -------------------------------------------------------------------- */
  notes: [
    { icon: "🐢", title: "Langsamer als du denkst", text: "Dein Test zeigt: du läufst zu hart. 80 % deiner Läufe sollen so locker sein, dass du reden kannst. Das baut die Ausdauer (und den VO₂max) am besten auf." },
    { icon: "👟", title: "Schrittfrequenz hoch", text: "Ziel 165–170 spm statt 145. Stell dir vor, du läufst über heisse Kohlen: kürzere, schnellere, leise Schritte. Eine Metronom-App auf 170 bpm hilft beim Üben." },
    { icon: "💪", title: "Kraft macht effizient", text: "Bodenkontaktzeit und vertikale Bewegung verbessern sich durch Wadenheben, Ausfallschritte, Core und die kurzen Steigerungen. 2× pro Woche 15–20 min reichen." },
    { icon: "🥤", title: "Renn-Logistik üben", text: "Der Lauf startet um 19:00 – also abends. Teste in Woche 3–4 dieselbe Tageszeit, dasselbe Essen davor und das Trinken an den Verpflegungsstellen." },
  ],

  /* ----------------------------------------------------------------------
   * TRAININGS-LOG
   * Neue Einträge oben anfügen. Felder: date, type, title, distanceKm,
   * durationMin, avgPace, avgHr, maxHr, cadence, note.
   * type: "test" | "long" | "easy" | "tempo" | "race" | "cross"
   * -------------------------------------------------------------------- */
  log: [
    {
      date: "2026-06-20",
      type: "test",
      title: "12-Minuten-Lauftest",
      distanceKm: 1.94,
      durationMin: 12,
      avgPace: "6:10 /km",
      avgHr: 157,
      maxHr: 178,
      cadence: 145,
      note: "Ausgangstest. VO₂max 32,9. Sehr hart gelaufen – ab jetzt lockerer.",
    },
  ],
};
