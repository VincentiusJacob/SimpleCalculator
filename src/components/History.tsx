import React, { useEffect, useState } from "react";
import "../styles/History.css";

const History: React.FC = () => {
  const [history, setHistory] = useState<string[]>([]);

  const updateHistory = () => {
    const historyEquations = JSON.parse(
      localStorage.getItem("History") || "[]"
    );
    setHistory(historyEquations);
  };

  useEffect(() => {
    updateHistory();

    const handleCustomEvent = (event: Event) => {
      const customEvent = event as CustomEvent<string[]>;
      setHistory(customEvent.detail);
    };

    window.addEventListener("historyUpdate", handleCustomEvent);

    return () => {
      window.removeEventListener("historyUpdate", handleCustomEvent);
    };
  }, []);

  return (
    <div className="history-container">
      {history.length > 0 ? (
        <ul className="history-list">
          {history.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>
      ) : (
        <div></div>
      )}
    </div>
  );
};

export default History;
