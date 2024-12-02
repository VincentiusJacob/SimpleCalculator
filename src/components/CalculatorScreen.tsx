import React from "react";
import History from "./History";
import "../styles/CalculatorScreen.css";

interface CalculatorScreenProps {
  firstNumber: string;
  operator: string;
  secondNumber: string;
  error: string;
}

const CalculatorScreen: React.FC<CalculatorScreenProps> = ({
  firstNumber,
  operator,
  secondNumber,
  error,
}) => {
  console.log("CalculatorScreen props", {
    firstNumber,
    operator,
    secondNumber,
    error,
  });
  return (
    <div className="calculator-screen">
      <div className="history">
        <History />
      </div>
      <div className="display">
        {error ? (
          <span>{error}</span>
        ) : (
          `${firstNumber} ${operator} ${secondNumber}`
        )}
      </div>
    </div>
  );
};

export default CalculatorScreen;
