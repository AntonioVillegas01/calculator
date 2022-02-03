import React, {useEffect, useState} from 'react';
import CalculatorKey from "../Keys/CalculatorKey";

const Calculator = () => {
    
    const calculatorProps = [
        {value: "C", isLargeButton: true, fontWeigth:"fw-bold"},
        {value: "/", isLargeButton: false, fontWeigth:"fw-bolder"},
        {value: "*", isLargeButton: false, fontWeigth:"fw-bolder"},
        {value: 7, isLargeButton: false, fontWeigth:"fw-regular"},
        {value: 8, isLargeButton: false, fontWeigth:"fw-regular"},
        {value: 9, isLargeButton: false, fontWeigth:"fw-regular"},
        {value: "-", isLargeButton: false, fontWeigth:"fw-bolder"},
        {value: 4, isLargeButton: false, fontWeigth:"fw-regular"},
        {value: 5, isLargeButton: false, fontWeigth:"fw-regular"},
        {value: 6, isLargeButton: false, fontWeigth:"fw-regular"},
        {value: "+", isLargeButton: false, fontWeigth:"fw-bold"},
        {value: 1, isLargeButton: false, fontWeigth:"fw-regular"},
        {value: 2, isLargeButton: false, fontWeigth:"fw-regular"},
        {value: 3, isLargeButton: false, fontWeigth:"fw-regular"},
        {value: "=", isLargeButton: false, fontWeigth:"fw-regular", doubleHeight:true},
        {value: 0, isLargeButton: true, fontWeigth:"fw-regular"},
        {value: ".", isLargeButton: false, fontWeigth:"fw-regular"},
    ]


    const [prevValue, setPrevValue] = useState(null);
    const [showResult, setShowResult] = useState(false);
    const [nextValue, setNextValue] = useState("0");
    const [op, setOp] = useState(null);

    useEffect(() => {}, [op, nextValue, prevValue]);

    const CalculatorOperations = {
        "/": (firstValue, secondValue) => firstValue / secondValue,
        "*": (firstValue, secondValue) => firstValue * secondValue,
        "+": (firstValue, secondValue) => firstValue + secondValue,
        "-": (firstValue, secondValue) => firstValue - secondValue,
        "=": (firstValue, secondValue) => secondValue,
    };

    const performOperation = () => {
        let temp = CalculatorOperations[op](
            parseFloat(prevValue),
            parseFloat(nextValue)
        );
        setOp(null);
        setNextValue(String(temp));
        setPrevValue(null);
        setShowResult(true)
    };

    const handleNum = (number) => {
        setNextValue(nextValue === "0" ? String(number) : nextValue + number);
    };

    const insertDot = () => {
        if (!/\./.test(nextValue)) {
            setNextValue(nextValue + ".");
        }
    };

    const percentage = () => {
        setNextValue(parseFloat(nextValue) / 100);
        if (prevValue && nextValue === "") {
            setPrevValue(parseFloat(prevValue) / 100);
        }
    };
    const changeSign = () => {
        setNextValue(parseFloat(nextValue) * -1);
    };
    const clearData = () => {
        setNextValue("0");
        setPrevValue(0);
    };

    const handleOperation = (value) => {
        setShowResult(false)

        if (Number.isInteger(value)) {
            handleNum(parseInt(value, 10));
        } else if (value in CalculatorOperations) {
            if (op === null) {
                setOp(value);
                setPrevValue(nextValue);
                setNextValue("");
            }
            if (op) {
                setOp(value);
            }
            if (prevValue && op && nextValue) {
                performOperation();
            }
        } else if (value === "C") {
            clearData();
        } else if (value === "\xB1") {
            changeSign();
        } else if (value === ".") {
            insertDot();
        } else if (value === "%") {
            percentage();
        }
    };


    
    
    return (
        <div>

            <input id="result" type="text"
                   className="neumorphistic-borders py-4 form-control text-end col-12 mb-3"
                   placeholder={
                      op ? `${prevValue} ${op} ${nextValue} `
                          :  nextValue
                   }
                   disabled/>
            <div className="row g-3 p-2">
                {
                    calculatorProps.map((button,i) => (
                        <CalculatorKey
                            key={button.value}
                            handleOperation={handleOperation}
                            {...button}




                    />
                    ))
                }
            </div>

        </div>
    );
};

export default Calculator;