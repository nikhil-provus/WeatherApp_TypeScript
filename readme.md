

---

# 🌤 Full Stack Weather App (React + TypeScript + Node)

A modern full-stack weather application built with:

* **Frontend:** React (Create React App) + TypeScript
* **Backend:** Node.js + Express
* **Charts:** Recharts
* **Styling:** TailwindCSS

This app provides real-time weather data, hourly forecasts, interactive charts, and recently visited cities.

---

# 🚀 Features

## 🔎 Smart City Search

* Autocomplete suggestions
* Enter key support
* Click to select city
* API-powered search

## 🌡 Current Weather

* Temperature display
* Celsius / Fahrenheit toggle
* Weather condition & icon
* Local time display (timezone-aware)

## 📊 Interactive Hourly Forecast

* 24-hour temperature chart
* Smooth gradient area graph
* Current hour indicator
* Hover + touch interaction
* Scrollable hourly quick selection

## 🏙 Recently Visited Cities

* Temperature preview
* Quick reload on click

## ⏱ Accurate Time Handling

* Uses city timezone offset
* Automatically detects current hour in forecast

---

# 🛠 Tech Stack

## Frontend (Client)

* React (Create React App)
* TypeScript
* Recharts
* TailwindCSS

## Backend (Server)

* Node.js
* Express
* Axios (for weather API calls)
* Environment variables for API security

---

# 📂 Project Structure

```bash
weather-app/
│
├── client/          # React Frontend (CRA + TypeScript)
│   ├── src/
│   ├── public/
│   └── package.json
│
├── server/          # Node + Express Backend
│   ├── routes/
│   ├── controllers/
│   ├── server.ts
│   └── package.json
│
└── README.md
```

---

# ⚙️ Installation & Setup

## 1️⃣ Clone the Repository

```bash
git clone https://github.com/YOUR_USERNAME/WeatherApp_TypeScript.git
cd WeatherApp_TypeScript
```

---

## 2️⃣ Setup Server

```bash
cd server
npm install
```

Create a `.env` file inside the `server` folder:

```
WEATHER_API_KEY=your_api_key_here
PORT=5000
```

Start the backend:

```bash
npm run dev
```

Server runs on:

```
http://localhost:5000
```

---

## 3️⃣ Setup Client (Create React App)

```bash
cd client
npm install
npm start
```

Client runs on:

```
http://localhost:3000
```

---

# 🔄 How It Works (Architecture)

### 🔹 Step 1 – User Searches City

Frontend sends request to:

```
GET /weather?city=Delhi
```

### 🔹 Step 2 – Backend Calls Weather API

Server:

* Uses secret API key
* Fetches weather data
* Processes response
* Sends cleaned data to frontend

### 🔹 Step 3 – Frontend Displays:

* Current weather
* Hourly forecast
* Interactive chart
* Local time

---

# 🧠 Key Concepts Demonstrated

* Controlled Components
* React Hooks (`useState`, `useEffect`, `useRef`)
* Strong TypeScript typing
* Chart interaction state syncing
* Timezone-based time calculation
* Parent ↔ Child communication
* REST API integration
* Environment variable handling
* Full-stack architecture separation

---

# 🌍 Future Improvements

* Dark mode
* Debounced search
* Save unit preference
* Deployment (Render / Railway / Vercel)

---


# 👨‍💻 Author

Rishi Jain

---

