# 🏃 Laufcoach – Ägeriseelauf 2026

Ein persönlicher Lauf-Coach als kleine Web-App, der dich vom **12-Minuten-Lauftest (20.06.2026)** bis zum **Ägeriseelauf am 24.07.2026 (14,1 km, Run/Walk)** begleitet.

## Was die App zeigt

- **Countdown & Fortschrittsbalken** bis zum Renntag
- **Diese Woche** – die aktuell anstehenden Einheiten (automatisch nach Datum)
- **Ausgangslage** aus deinem Lauftest (Tempo, VO₂max, Puls, Schrittfrequenz)
- **Puls- & Tempozonen** (passend zu deiner Galaxy-Watch, HRmax 181)
- **Run/Walk-Progression** Woche für Woche
- **5-Wochen-Plan** (flexibel, da unregelmässiges Training – die *lange* Einheit ist je Woche das Wichtigste)
- **Coach-Tipps** auf deine Schwachpunkte zugeschnitten (zu hart gelaufen, niedrige Frequenz, Technik)
- **Trainings-Log** mit Statistik (Gesamt-km, längster Lauf, Einheiten)

## Öffnen

Einfach `index.html` im Browser öffnen – auf dem Handy oder am Rechner. Kein Build, keine Installation, keine Internetverbindung nötig.

> Tipp fürs Handy: Im Browser „Zum Startbildschirm hinzufügen", dann startet der Coach wie eine App.

## Nach jedem Lauf

Du schickst die Auswertung deiner Samsung-Uhr – die Werte werden als neuer Eintrag in `data/coach.js` unter `log` ergänzt (neueste oben). Beispiel:

```js
{
  date: "2026-06-23",
  type: "easy",          // test | long | easy | tempo | race | cross
  title: "Lockerer Lauf",
  distanceKm: 4.2,
  durationMin: 38,
  avgPace: "7:20 /km",
  avgHr: 148,
  maxHr: 162,
  cadence: 158,
  note: "Hat sich locker angefühlt."
}
```

Danach Seite neu laden – Statistik und Plan aktualisieren sich automatisch.

## Dateien

| Datei | Inhalt |
|-------|--------|
| `index.html` | Struktur der Seite |
| `styles.css` | Design (dunkel, mobil-optimiert) |
| `app.js` | Rendering-Logik (Vanilla JS) |
| `data/coach.js` | **Alle Inhalte**: Profil, Zonen, Plan, Log |

---

*Kein medizinischer Rat. Bei Schmerzen oder Beschwerden pausieren und ggf. ärztlich abklären.*
