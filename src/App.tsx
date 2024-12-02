import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import CalculatorPage from "./pages/CalculatorPage";
import SupportPage from "./pages/SupportPage";

const App: React.FC = () => {
  return (
    <Router>
      <div className="container">
        <Routes>
          <Route path="/" element={<CalculatorPage />} />
          <Route path="/support" element={<SupportPage />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
