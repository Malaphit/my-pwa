import { useState } from "react";
import { SIZE_TABLE } from "./sizeTable";
import { findSizeByLength, calculateDeviations, getRecommendation } from "./sizeLogic";

export default function SizeCalculator() {
  const [measurements, setMeasurements] = useState({ length: "", punches: "", rise: "", diagonal: "" });
  const [result, setResult] = useState(null);
  const [sandalMode, setSandalMode] = useState(false);

  const handleChange = (e) => {
    setMeasurements({ ...measurements, [e.target.name]: parseInt(e.target.value, 10) || 0 });
  };

  const handleSubmit = () => {
    const size = findSizeByLength(measurements.length, sandalMode);
    if (!size) return setResult({ error: "Не найден подходящий размер." });

    const deviation = calculateDeviations(size, measurements);
    const recommendation = getRecommendation(deviation, size);

    setResult({ size, deviation, recommendation });
  };

  return (
    <div className="p-4 rounded-xl bg-white shadow">
      <h2 className="text-xl mb-4">Подбор размера</h2>
      <div className="grid grid-cols-2 gap-2">
        {["length", "punches", "rise", "diagonal"].map((key) => (
          <input
            key={key}
            type="number"
            name={key}
            placeholder={key}
            value={measurements[key]}
            onChange={handleChange}
            className="p-2 border rounded"
          />
        ))}
        <label className="col-span-2 flex items-center gap-2">
          <input type="checkbox" checked={sandalMode} onChange={(e) => setSandalMode(e.target.checked)} />
          Режим сандалий
        </label>
        <button className="col-span-2 bg-blue-500 text-white p-2 rounded" onClick={handleSubmit}>
          Подобрать размер
        </button>
      </div>

      {result && (
        <div className="mt-4">
          {result.error ? (
            <p className="text-red-500">{result.error}</p>
          ) : (
            <>
              <p>Рекомендуемый размер: <b>{result.size}</b></p>
              <ul className="list-disc list-inside text-sm text-gray-700">
                {result.recommendation.map((line, i) => (
                  <li key={i}>{line}</li>
                ))}
              </ul>
            </>
          )}
        </div>
      )}
    </div>
  );
}
