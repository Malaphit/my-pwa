import React, { useEffect, useState } from "react";
import "./styles/History.css";

const FIELD_LABELS = {
  length: "Длина",
  punches: "Пучки",
  rise: "Подъём",
  diagonal: "Косой проход",
};

export default function History() {
  const [history, setHistory] = useState([]);

  useEffect(() => {
    const saved = localStorage.getItem("sizeHistory");
    if (saved) {
      setHistory(JSON.parse(saved));
    }
  }, []);

  const clearHistory = () => {
    localStorage.removeItem("sizeHistory");
    setHistory([]);
  };

  return (
    <div className="history-container">
      <h2 className="history-title">История расчётов</h2>
      {history.length === 0 ? (
        <p className="history-empty">История пуста</p>
      ) : (
        <>
          <ul className="history-list">
            {history.map((entry, index) => (
              <li key={index} className="history-entry">
                <div className="entry-date">{entry.date}</div>

                {entry.fullName && (
                  <div className="entry-name">ФИО: {entry.fullName}</div>
                )}

                <div className="entry-size">Размер: {entry.size}</div>

                <div className="entry-inputs">
                  {Object.entries(entry.inputs).map(([k, v]) => (
                    <span key={k}>{FIELD_LABELS[k]}: {v}мм</span>
                  ))}
                </div>

                <div className="entry-notes">
                  {entry.notes.map((t, i) => (
                    <div key={i}>• {t}</div>
                  ))}
                </div>
              </li>
            ))}
          </ul>
          <div className="history-actions">
            <button onClick={clearHistory} className="clear-btn">
              Очистить историю
            </button>
          </div>
        </>
      )}
    </div>
  );
}
