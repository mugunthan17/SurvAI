# 🧠 SurvAI — AI-Powered Survey Response Summarizer


SurvAI leverages Artificial Intelligence (AI) to analyze and visualize user survey responses. It extracts emotions and key insights and also answers you questions from uploaded .CSV/.XLS/.XLSX files. Particulary built for Researchers, Marketers, Analysts, and Students seeking to decode large volumes of qualitative feedback/summary in seconds.


---


## 📂 Table of Contents

- [🚀 Features](#-features)
- [🛠 Tech Stack](#-tech-stack)
- [📦 Project Structure](#-project-structure)
- [⚙️ Getting Started](#getting-started)
  - [Prerequisites](#-prerequisites)
  - [Installation](#-installation--setup)
  - [Running Locally](#-running-locally)
- [📸 Screenshots](#-screenshots)
- [🤝 Meet the Contributions](#-contributions)

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

📂SurvAI
  - 📂survAI-frontEnd
    - 📂node_modules
    - 📂public
        - 📄 WebLogo.png
    - 📂src
        - 📂api
            - 📄survaiApi.js
        - 📂assets
            - 📂reqImgs (Which has the all the required Images for the Pages)
                - 📄Logo.png
        - 📂components
            - 📂AboutUsPageComponents
                - 📄AboutUsHero.jsx
                - 📄CoreValues.jsx
                - 📄MissionVision.jsx
                - 📄OurTeam.jsx
            - 📂FeaturePageComponents
                - 📄FileUpload.jsx
            - 📂HomePageComponents
                - 📄AboutSection.jsx
                - 📄BlogsSection.jsx
                - 📄CTASection.jsx
                - 📄FeatureSection.jsx
                - 📄Footer.jsx
                - 📄HeroSection.jsx
                - 📄Navbar.jsx
                - 📄UseCasesSection.jsx
        - 📂pages
            - 📄AboutUsPage.jsx
            - 📄BlogsPage.jsx
            - 📄FeaturePage.jsx
            - 📄HomePage.jsx
        - 📄App.jsx
        - 📄index.css
        - 📄main.jsx
      - 📄eslint.config.js
      - 📄index.html
      - 📄package-lock.json
      - 📄package.json
      - 📄vite.config.js

  - 📂survAI-backEnd
      - 📂node_modules
      - 📂routers
          - 📄CustomRoute.js
          - 📄SummaryRoute.js
      - 📂uploads
      - 📂utils
          - 📄csvParser.js
          - 📄xlsxParser.js
      - 📄.env file (which have the backend **Port Number** and **API Key**)
      - 📄package-lock.json
      - 📄package.json
      - 📄server.js


---

## Getting Started

Follow the steps below to set up and run SurvAI on your local machine.

---

### ✅ Prerequisites

Ensure the following are installed on your system:

- [Node.js](https://nodejs.org/) 
- [npm](https://www.npmjs.com/)
- [Git](https://git-scm.com/)

---

### 📦 Installation & Setup

### 1. **Clone the repository**

```bash
git clone https://github.com/mugunthan17/survai.git
cd SurvAI
```
### 2. **Install Frontend dependencies**
```bash
cd survAI-frontEnd
npm install
```
### 3. **Install Backend dependencies**
```bash
cd ..
cd survAI-backEnd
npm install
```
### 4. **Setup Environment Variables**
```bash
PORT=3000
OPENAI_API_KEY=your_openai_api_key_here
```

### ✅ Running Locally

### **Open two terminals to run both the frontend and backend**
### **Start Frontend**
```bash
cd ..
cd survAI-frontEnd
npm run dev
```
The frontend will be available at:
👉 http://localhost:5173

### **Start Backnd**
```bash
cd ..
cd survAI-backEnd
node server.js
```
The backend server will start on:
👉 http://localhost:3000

### Now you're all set to use SurvAI locally! 🎉

---

### 📸 Screenshots
Photos comes here

---

### 🤝 Contributions

<p>This project is brought to you by:</p>

<p><strong>👤 Mugunthan N</strong><br>
  - 🖌️ Designer & Developer<br>
  - 🔗 <a href="https://mugunthan17.github.io/portfolio-website/" target="_blank">Portfolio</a><br>
  - 💼 <a href="https://www.linkedin.com/in/mugunthann" target="_blank">LinkedIn</a>
</p>

<p><strong>👤 Nitish B</strong><br>
  - 🧠 Developer & Collaborator<br>
  - 🔗 <a href="https://nitishb.me/" target="_blank">Portfolio</a><br>
  - 💼 <a href="https://www.linkedin.com/in/nitishb-dev/" target="_blank">LinkedIn</a>
</p>

<p><strong>👤 Sarweshwaran R S</strong><br>
  - 🧑‍💻 Developer & Collaborator<br>
  - 💼 <a href="https://www.linkedin.com/in/sarweshwaranrs/" target="_blank">LinkedIn</a>
</p>

---

We welcome feedback and contributions! Feel free to reach any one of us or fork the project to enhance something awesome.

---
### 💙 **THANK YOU SO MUCH** 💙
Thank you for your time and interest in SurvAI.  
I truly appreciate your support and hope this project proves valuable to you!
