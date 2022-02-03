import React from 'react';

const CalculatorKey = ({value, isLargeButton, fontWeigth, doubleHeight, handleOperation}) => {

    return (
        <>
            <div className={isLargeButton ? "col-6" : "col-3"}
                 style={{
                     height:doubleHeight && '60px',
                 }}
            >
                <a href="#"
                    onClick={()=> handleOperation(value)}
                   type="button"
                   className={`w-100 h-100 py-2 neumorphistic-borders  ${fontWeigth}`}

                >
                    {value}{" "}
                </a>
            </div>
        </>
    );
};

export default CalculatorKey;