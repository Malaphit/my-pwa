import React, { useState } from "react";
import SizeCalculator from "./components/SizeCalculator/SizeCalculator";
import Guidelines from "./components/Guidelines";
import History from "./components/History";
import "./App.css";
import "./components/styles/SizeCalculator.css" 

export default function App() {
  const [tab, setTab] = useState("calculator");

  return (
    <div className="app-container">
      <main className="main-content">
        {tab === "calculator" && <SizeCalculator />}
        {tab === "guidelines" && <Guidelines />}
        {tab === "history" && <History />}
      </main>

      <nav className="bottom-nav">
        <button onClick={() => setTab("calculator")}>Калькулятор</button>
        <button onClick={() => setTab("guidelines")}>Памятка</button>
        <button onClick={() => setTab("history")}>История</button>
      </nav>
    </div>
  );
}
