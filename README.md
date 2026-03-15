# Mosaic Webapp

A lightweight score-tracking helper for the **Mosaic / Civilization-style board game** built with **React + TypeScript + Vite**.

This app lets you record and track influence across regions (Hispania, Galia, Italia, Grecia, Asiria, Egipto, Numidia), including:
- Location scoring (cities, port cities, agricultural towns, industrial towns, and wonders)
- Unit scoring (infantry, cavalry, siege, and extra units)
- Per-region influence totals and global totals
- Persistent state via localStorage (so you can refresh without losing progress)

> ⚠️ The **Civilization Pillars** and **Victory Points** views are currently placeholder stubs.

---

## 🚀 Getting Started

### 1) Install

```bash
npm install
```

### 2) Start development server

```bash
npm run dev
```

Open http://localhost:5173 in your browser.

### 3) Build for production

```bash
npm run build
```

### 4) Preview production build

```bash
npm run preview
```

---

## 🧭 App Structure

- `src/App.tsx` - top-level routes / layout
- `src/store/regionsStore.tsx` - main state store (Zustand + localStorage persistence)
- `src/views/InfluenceView/InfluenceView.tsx` - UI for region scoring

### Routes
- `/` or `/influence` → Influence scoring view
- `/civilization-pillars` → Placeholder view for civilization pillar scoring
- `/victory-points` → Placeholder view for victory points

---

## 🧠 How the scoring works (current implementation)

- Each region tracks counts for locations + units
- Location score changes affect influence (cities/port cities/wonders count double)
- Unit counts directly contribute to influence (extra units do not add to totals)
- Totals are collected across all regions for quick reference

The store is persisted to `localStorage` under the key `regions-storage`.

---

## 🧩 Tech Stack

- React 19
- TypeScript 5
- Vite
- MUI (Material UI)
- Zustand (state + persistence)
- Sass (for styling)

---

## ✅ Next improvements (ideas)

- Implement a full scoring view for **Civilization Pillars**
- Implement a full scoring view for **Victory Points**
- Add better navigation (active route highlighting)

---

## 📝 Notes

- Click the **"Limpiar Puntuación"** button in the header to reset all values.
- The app currently uses Spanish labels for locations and units.
