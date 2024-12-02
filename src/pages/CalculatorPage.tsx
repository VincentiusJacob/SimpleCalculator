import React from "react";
import Button from "../components/Button";
import "../styles/CalculatorPage.css";
import CalculatorScreen from "../components/CalculatorScreen";
import { useCalculator } from "../hooks/useCalculator";
import { useNavigate } from "react-router-dom";

const CalculatorPage: React.FC = () => {
  const {
    currentstate,
    handleNumberInput,
    handleOperatorInput,
    handleClear,
    handleDelete,
    calculateResult,
  } = useCalculator();

  const navigate = useNavigate();

  return (
    <div className="calculator-container">
      <CalculatorScreen
        firstNumber={currentstate.firstNumber}
        operator={currentstate.operator}
        secondNumber={currentstate.secondNumber}
        error={currentstate.error}
      />
      <div className="calculator-buttons">
        {[
          "C",
          "DEL",
          "?",
          "/",
          "1",
          "2",
          "3",
          "X",
          "4",
          "5",
          "6",
          "-",
          "7",
          "8",
          "9",
          "+",
          "0",
          "=",
        ].map((label) => (
          <Button
            key={label}
            label={label}
            onClick={() => {
              if (label === "C") {
                handleClear();
              } else if (label === "DEL") {
                handleDelete();
              } else if (label === "=") {
                calculateResult();
              } else if (["+", "-", "X", "/"].includes(label)) {
                handleOperatorInput(label);
              } else if (label === "?") {
                navigate("/support");
              } else {
                handleNumberInput(label);
              }
            }}
            extraClass={
              ["+", "-", "X", "/"].includes(label)
                ? "operator"
                : label === "0"
                ? "zero"
                : label === "="
                ? "equals"
                : label === "?"
                ? "support"
                : ""
            }
          />
        ))}
      </div>
    </div>
  );
};

export default CalculatorPage;
