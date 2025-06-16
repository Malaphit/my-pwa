import React, { useEffect, useState } from "react";

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
    <div className="max-w-xl mx-auto mt-10 p-6 bg-gray-50 shadow-lg rounded-xl space-y-4">
      <h2 className="text-xl font-bold text-center">История расчётов</h2>
      {history.length === 0 ? (
        <p className="text-center text-gray-500">История пуста</p>
      ) : (
        <>
          <ul className="space-y-3">
            {history.map((entry, index) => (
              <li key={index} className="p-4 border rounded-md bg-white">
                <div className="text-sm text-gray-500">{entry.date}</div>
                <div className="font-medium text-blue-700">Размер: {entry.size}</div>
                <div className="text-sm text-gray-700">
                  {Object.entries(entry.inputs).map(([k, v]) => (
                    <span key={k} className="mr-2">
                      {FIELD_LABELS[k]}: {v}мм
                    </span>
                  ))}
                </div>
                <div className="text-xs text-gray-500 italic">
                  {entry.notes.map((t, i) => (
                    <div key={i}>• {t}</div>
                  ))}
                </div>
              </li>
            ))}
          </ul>
          <div className="text-center">
            <button
              onClick={clearHistory}
              className="mt-4 bg-red-100 hover:bg-red-200 text-red-600 px-4 py-2 rounded-md text-sm"
            >
              Очистить историю
            </button>
          </div>
        </>
      )}
    </div>
  );
}
