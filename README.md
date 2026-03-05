# 2026 US-Iran Conflict — Global Intelligence Dashboard

Impartial multi-source analysis of the 2026 US-Iran conflict from **20+ source groups** across the geopolitical spectrum.

**No single narrative privileged. All contested facts flagged.**

## Live Demo

🌍 **[View Dashboard →](https://YOUR_USERNAME.github.io/iran-conflict-dashboard/)**

## Features

### 📊 Global Analysis Dashboard (12 Tabs)
- **Casualties** — All parties tracked (Iran, US, Israel, Lebanon, GCC, Pakistan)
- **Military Operations** — US/Israeli strikes vs. Iranian retaliation
- **GCC Crisis** — All 6 Gulf states struck; desalination vulnerability
- **Hormuz Cascade** — What happens if the strait stays closed (day-by-day timeline)
- **Water/Desalination Crisis** — The GCC's existential vulnerability (90% Kuwait, 99% Qatar dependency)
- **Global Markets** — Oil, gold, equities, VIX, crypto, bonds, currencies
- **International Response** — China, Russia, UN, UK, France, Turkey, GCC, Amnesty
- **Legal & Domestic** — Constitutional debate, War Powers, congressional votes
- **Humanitarian Crisis** — 912+ killed, Minab school, hospitals damaged
- **Probabilities** — Full probability models for 4 risk categories (27 scenarios)
- **Sources** — 20+ source groups with bias assessment

### 🚢 Hormuz Vessel Tracker
- **Global Fishing Watch API** integration (free, non-commercial)
- Live AIS vessel presence data
- Traffic collapse visualization (400→18 daily transits)
- Stranded vessel clusters (150+ ships)
- AIS anomaly timeline (dark fleet, GPS spoofing, insurance withdrawal)
- Flag state analysis
- SAR satellite detection of "dark" vessels

## Data Sources

Al Jazeera • CNN • CNBC • Bloomberg • Critical Threats (AEI/ISW) • House of Commons Library • UN/IAEA/WHO/UNESCO • Brookings • CSIS • Chatham House • Amnesty International • HRA Iran • Chinese Foreign Ministry • Russian Foreign Ministry • Gulf Insider • Middle East Institute • Middle East Forum • EIA • Kpler • Nomura • JPMorgan • IMF • Global Fishing Watch • CloudSEK • SpecialEurasia • The Intercept • Wikipedia

## Deploy to GitHub Pages (FREE)

### Option 1: Automatic (Recommended)

1. **Create a new GitHub repository:**
   ```
   Go to github.com → New Repository → Name it "iran-conflict-dashboard"
   ```

2. **Push this code:**
   ```bash
   cd iran-conflict-site
   git init
   git add .
   git commit -m "Initial commit — Iran conflict dashboard"
   git branch -M main
   git remote add origin https://github.com/YOUR_USERNAME/iran-conflict-dashboard.git
   git push -u origin main
   ```

3. **Enable GitHub Pages:**
   ```
   Repository → Settings → Pages → Source: "GitHub Actions"
   ```

4. **Done!** GitHub Actions will automatically build and deploy.
   Your site will be live at: `https://YOUR_USERNAME.github.io/iran-conflict-dashboard/`

### Option 2: Manual Build

```bash
npm install
npm run build
# Upload contents of dist/ folder to any static host
```

## Global Fishing Watch API

The Hormuz Tracker includes optional live API access:

1. Register at [globalfishingwatch.org](https://globalfishingwatch.org/our-apis/tokens) (free)
2. Get your API token
3. Paste it in the tracker's API panel
4. Query live vessel presence, search vessels, detect AIS anomalies

**Note:** GFW APIs are free for non-commercial use. Data has ~96 hour delay.

## Tech Stack

- React 18 + Vite
- Recharts (charts)
- Global Fishing Watch API (vessel tracking)
- GitHub Pages (hosting)
- No backend required — fully static

## Methodology

This dashboard deliberately includes sources from opposing perspectives:
- **US Government:** CENTCOM, White House, State Department
- **US Critics:** The Intercept, Brookings, ACLU
- **Iranian State:** IRNA, Press TV, Red Crescent
- **Iranian Opposition:** NCRI, MEK, HRA
- **China/Russia:** Official foreign ministry positions
- **European:** UK House of Commons, ECFR, France/Germany
- **Multilateral:** UN, IAEA, WHO, UNESCO, Amnesty International
- **Financial:** JPMorgan, Goldman Sachs, Nomura, IMF, EIA
- **Independent:** CTP-ISW, CSIS, Chatham House, ICG

All contested claims are identified. Fog of war caveats applied throughout.

## License

This analysis is provided for educational and informational purposes. Data sourced from publicly available outlets credited in the Sources tab.

---

*Updated March 4, 2026 | Day 4 of Active Conflict*
