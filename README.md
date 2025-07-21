# 🧠 SurvAI — AI-Powered Survey Response Summarizer


SurvAI leverages Artificial Intelligence (AI) to analyze and visualize user survey responses. It extracts emotions and key insights and also answers you questions from uploaded .CSV/.XLS/.XLSX files. Particulary built for Researchers, Marketers, Analysts, and Students seeking to decode large volumes of qualitative feedback/summary in seconds.


---


## 📂 Table of Contents

- [🚀 Features](#-features)
- [🛠 Tech Stack](#-tech-stack)
- [📦 Project Structure](#-project-structure)
- [⚙️ Getting Started](#-getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Running Locally](#running-locally)
- [📸 Screenshots](#-screenshots)
- [🤝 Contributing](#-contributing)
- [🪪 License](#-license)
- [📬 Contact](#-contact)


---


## 🚀 Features

- 📤 Upload .csv/.xls/.xlsx based survey responses file.
- 🧠 AI-driven **Emotional Analysis** & **Full Summary Generation**.
- 📊 Visual reports with **Pie Charts**.
- 🖨 Export results as **PDF** reports.
- 💾 No Database used — hence **SurvAI** Lightweight and Super fast.

---

## 🛠 Tech Stack

**Frontend**  
- React.js  
- Tailwind CSS  
- Recharts (for **Data** Visualization)  
- jsPDF & html2canvas (for **PDF** export)

**Backend**  
- Node.js  
- Express.js  
- Gemini API (for AI-driven analysis)  
- dotenv & cors

---

## 📦 Project Structure

📂 SurvAI/
│
├── 📂 survAI-frontEnd/                # Frontend: React + Vite
│   ├── 📂 node_modules/
│   ├── 📂 public/
│   │   └── 📄 WebLogo.png
│   ├── 📂 src/
│   │   ├── 📂 api/
│   │   │   └── 📄 survaiApi.js
│   │   ├── 📂 assets/
│   │   │   ├── 📂 reqImgs/            # All images used in UI
│   │   │   └── 📄 Logo.png
│   │   ├── 📂 components/
│   │   │   ├── 📂 AboutUsPageComponents/
│   │   │   │   ├── 📄 AboutUsHero.jsx
│   │   │   │   ├── 📄 CoreValues.jsx
│   │   │   │   ├── 📄 MissionVision.jsx
│   │   │   │   └── 📄 OurTeam.jsx
│   │   │   ├── 📂 FeaturePageComponents/
│   │   │   │   └── 📄 FileUpload.jsx
│   │   │   └── 📂 HomePageComponents/
│   │   │       ├── 📄 AboutSection.jsx
│   │   │       ├── 📄 BlogsSection.jsx
│   │   │       ├── 📄 CTASection.jsx
│   │   │       ├── 📄 FeatureSection.jsx
│   │   │       ├── 📄 Footer.jsx
│   │   │       ├── 📄 HeroSection.jsx
│   │   │       ├── 📄 Navbar.jsx
│   │   │       └── 📄 UseCasesSection.jsx
│   │   ├── 📂 pages/
│   │   │   ├── 📄 AboutUsPage.jsx
│   │   │   ├── 📄 BlogsPage.jsx
│   │   │   ├── 📄 FeaturePage.jsx
│   │   │   └── 📄 HomePage.jsx
│   │   ├── 📄 App.jsx
│   │   ├── 📄 index.css
│   │   └── 📄 main.jsx
│   ├── 📄 eslint.config.js
│   ├── 📄 index.html
│   ├── 📄 package-lock.json
│   ├── 📄 package.json
│   └── 📄 vite.config.js
│
└── 📂 survAI-backEnd/                # Backend: Node.js + Express
    ├── 📂 node_modules/
    ├── 📂 routers/
    │   ├── 📄 CustomRoute.js         # Route for custom analysis
    │   └── 📄 SummaryRoute.js        # Route for summary generation
    ├── 📂 uploads/                   # Uploaded user files
    ├── 📂 utils/
    │   ├── 📄 csvParser.js           # CSV parsing logic
    │   └── 📄 xlsxParser.js          # XLSX parsing logic
    ├── 📄 .env                       # Contains backend PORT and API key
    ├── 📄 package-lock.json
    ├── 📄 package.json
    └── 📄 server.js                  # Main entry point for backend server

---
