import { useState } from "react";

type CalculatorState = {
  firstNumber: string;
  operator: string;
  secondNumber: string;
  error: string;
  sequenceCount: number;
};

export const useCalculator = () => {
  const [currentstate, setCurrentState] = useState<CalculatorState>({
    firstNumber: "0",
    operator: "",
    secondNumber: "",
    error: "",
    sequenceCount: 1,
  });

  const isInputLocked = currentstate.sequenceCount >= 3;

  const handleNumberInput = (number: string) => {
    if (currentstate.error) {
      setCurrentState({ ...currentstate, error: "" });
    }

    if (isInputLocked) {
      return;
    }

    if (currentstate.operator === "") {
      setCurrentState({
        ...currentstate,
        firstNumber:
          currentstate.firstNumber === "0" && number !== "."
            ? number
            : currentstate.firstNumber + number,
      });
    } else {
      setCurrentState({
        ...currentstate,
        secondNumber:
          currentstate.secondNumber === ""
            ? number
            : currentstate.secondNumber + number,
      });
    }
  };

  const handleOperatorInput = (operator: string) => {
    if (isInputLocked || currentstate.firstNumber === "0") {
      return;
    }

    if (currentstate.operator && currentstate.secondNumber) {
      return;
    }

    setCurrentState({
      ...currentstate,
      operator: operator,
      sequenceCount: currentstate.sequenceCount + 1,
    });
  };

  const handleClear = () => {
    setCurrentState({
      firstNumber: "0",
      operator: "",
      secondNumber: "",
      error: "",
      sequenceCount: 1,
    });
  };

  const handleDelete = () => {
    if (currentstate.secondNumber) {
      setCurrentState({
        ...currentstate,
        secondNumber: currentstate.secondNumber.slice(0, -1),
      });
    } else if (currentstate.operator) {
      setCurrentState({
        ...currentstate,
        operator: "",
        sequenceCount: currentstate.sequenceCount - 1, // Decrement sequenceCount when removing operator
      });
    } else {
      setCurrentState({
        ...currentstate,
        firstNumber: currentstate.firstNumber.slice(0, -1) || "0",
      });
    }
  };

  const calculateResult = () => {
    if (
      currentstate.firstNumber &&
      currentstate.operator &&
      currentstate.secondNumber
    ) {
      try {
        const standardizedOperator =
          currentstate.operator === "X" ? "*" : currentstate.operator;

        if (
          standardizedOperator === "/" &&
          parseFloat(currentstate.secondNumber) === 0
        ) {
          setCurrentState({ ...currentstate, error: "Err" });
          return;
        }

        const expression = `${currentstate.firstNumber} ${standardizedOperator} ${currentstate.secondNumber}`;
        const result = new Function("return " + expression)();

        saveHistory(`${result}`);

        setCurrentState({
          firstNumber: result.toString(),
          operator: "",
          secondNumber: "",
          error: "",
          sequenceCount: 1,
        });
      } catch (error) {
        setCurrentState({ ...currentstate, error: "Err" });
      }
    }
  };

  const saveHistory = (result: string) => {
    const existingHistory = JSON.parse(localStorage.getItem("History") || "[]");
    existingHistory.push(result);
    localStorage.setItem("History", JSON.stringify(existingHistory));

    const event = new CustomEvent("historyUpdate", {
      detail: existingHistory,
    });

    window.dispatchEvent(event);
  };

  return {
    currentstate,
    handleNumberInput,
    handleOperatorInput,
    handleClear,
    handleDelete,
    calculateResult,
  };
};
