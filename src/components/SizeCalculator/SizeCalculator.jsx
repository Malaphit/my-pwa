import React, { useState, useEffect } from "react";
import "../styles/SizeCalculator.css";
import {
  SIZE_KEYS,
  findSizeByLength,
  calculateDeviations,
  getRecommendation,
  getMatchColor,
} from "./sizeLogic";

const FIELD_LABELS = {
  length: "Длина",
  punches: "Пучки",
  rise: "Подъём",
  diagonal: "Косой проход",
};

export default function SizeCalculator() {
  const initial = { length: "", punches: "", rise: "", diagonal: "" };
  const [m, setM] = useState(initial);
  const [sandal, setSandal] = useState(false);
  const [currSize, setCurrSize] = useState(null);
  const [dev, setDev] = useState(null);
  const [notes, setNotes] = useState([]);
  const [history, setHistory] = useState([]);

  useEffect(() => {
    const saved = localStorage.getItem("sizeHistory");
    if (saved) {
      setHistory(JSON.parse(saved));
    }
  }, []);

  const handleChange = (e) => {
    setM({ ...m, [e.target.name]: +e.target.value });
  };

  const choose = (size) => {
    setCurrSize(size);
    const d = calculateDeviations(size, m);
    setDev(d);
    const recs = getRecommendation(d);
    setNotes(recs);

    const entry = {
      date: new Date().toLocaleString(),
      inputs: m,
      sandal,
      size,
      deviations: d,
      notes: recs,
    };

    const updatedHistory = [entry, ...history].slice(0, 100);
    setHistory(updatedHistory);
    localStorage.setItem("sizeHistory", JSON.stringify(updatedHistory));
  };

  const calc = () => {
    const sz = findSizeByLength(m.length, sandal);
    sz && choose(sz);
  };

  const step = (dir) => {
    if (currSize == null) return;
    const idx = SIZE_KEYS.indexOf(currSize);
    const ni = idx + dir;
    if (ni >= 0 && ni < SIZE_KEYS.length) choose(SIZE_KEYS[ni]);
  };

  return (
    <div className="size-calc-container">
      <h1 className="size-calc-title">Калькулятор размера обуви</h1>

      {Object.keys(FIELD_LABELS).map((key) => (
        <div key={key} className="size-calc-row">
          <label htmlFor={key} className="size-calc-label">
            {FIELD_LABELS[key]} (мм):
          </label>
          <input
            type="number"
            name={key}
            id={key}
            value={m[key]}
            onChange={handleChange}
            className="size-calc-input"
          />
        </div>
      ))}

      <label className="size-calc-checkbox-label">
        <input
          type="checkbox"
          checked={sandal}
          onChange={() => setSandal(!sandal)}
          className="size-calc-checkbox"
        />
        <span>Сандалии (запас 4–8 мм)</span>
      </label>

      <div className="size-calc-button-group">
        <button onClick={calc} className="size-calc-button">
          Подобрать размер
        </button>
        <button onClick={() => step(-1)} disabled={!currSize} className="size-calc-step">
          –
        </button>
        <button onClick={() => step(+1)} disabled={!currSize} className="size-calc-step">
          +
        </button>
      </div>

      {currSize != null && dev && (
        <div className={`size-result ${getMatchColor(dev)}`}>
          <h2 className="size-result-title">Размер: {currSize}</h2>
          <ul className="size-result-list">
            {Object.entries(dev).map(([k, v]) => (
              <li key={k}>
                <span className="size-result-label">{FIELD_LABELS[k]}</span>: {v} мм
              </li>
            ))}
          </ul>
          <div className="size-result-notes">
            {notes.map((t, i) => (
              <p key={i}>{t}</p>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
