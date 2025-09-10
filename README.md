# Task-1

A front-end React project providing a spreadsheet-like table interface with a customizable toolbar, user interactions, and reusable UI components.

---

## Table of Contents

- [Project Structure](#project-structure)
- [Technologies Used](#technologies-used)
- [Getting Started](#getting-started)
- [Available Scripts](#available-scripts)
- [Folder Overview](#folder-overview)
- [Contributing](#contributing)
- [License](#license)

---

## Project Structure

task-1/
├─ .git/
├─ node_modules/
├─ public/
├─ src/
│ ├─ assets/
│ ├─ components/
│ │ ├─ general/
│ │ │ └─ table/
│ │ │ ├─ Table.tsx
│ │ │ ├─ TableSheetSelect.tsx
│ │ │ └─ TableToolbar.tsx
│ │ └─ toolbar/
│ │ ├─ BreadCrumbs.tsx
│ │ ├─ NotificationDropdown.tsx
│ │ ├─ SearchingInput.tsx
│ │ └─ Toolbar.tsx
│ │ └─ UserAvatar.tsx
│ │ └─ ui/
│ │ ├─ alert-dialog.tsx
│ │ ├─ avatar.tsx
│ │ ├─ badge.tsx
│ │ ├─ breadcrumb.tsx
│ │ ├─ button.tsx
│ │ ├─ dropdown-menu.tsx
│ │ ├─ input.tsx
│ │ └─ scroll-area.tsx
│ ├─ lib/
│ │ └─ utils.ts # Utility functions like cn()
│ ├─ App.tsx
│ ├─ main.tsx
│ ├─ index.css
│ ├─ tsconfig.json
│ └─ vite-env.d.ts
├─ index.html
├─ .gitignore
├─ package.json
├─ package-lock.json
├─ README.md
└─ tsconfig.json

---

## Technologies Used

- **React** – Front-end UI library
- **TypeScript** – Strongly typed JavaScript
- **Vite** – Build tool for fast development
- **Tailwind CSS** – Utility-first CSS framework (assumed usage)
- **Lucide Icons** – Icon library for UI components

---

## Getting Started

1. **Clone the repository**

```bash
git clone https://github.com/sayyedfaisal06/spreadsheet-clone.git
```

2. **Install dependencies**

```bash
npm install
```

3. **Run the development server**

```bash
npm run dev

```
