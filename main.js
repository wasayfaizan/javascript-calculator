document.addEventListener('DOMContentLoaded', function () {
    const input = document.getElementById('input');
    let currentInput = '0';
    let operator = null;
    let firstOperand = null;

    function updateInput(value) {
        if (currentInput === '0') {
            currentInput = value;
        } else {
            currentInput += value;
        }
        input.textContent = currentInput;
    }

    function handleOperator(op) {
        if (firstOperand === null) {
            firstOperand = parseFloat(currentInput);
        } else if (operator) {
            firstOperand = calculate(firstOperand, parseFloat(currentInput), operator);
        }
        operator = op;
        currentInput = '0';
    }

    function calculate(a, b, op) {
        switch (op) {
            case '+':
                return a + b;
            case '-':
                return a - b;
            case '×':
                return a * b;
            case '÷':
                return a / b;
            default:
                return b;
        }
    }

    function handleEquals() {
        if (operator && firstOperand !== null) {
            currentInput = calculate(firstOperand, parseFloat(currentInput), operator).toString();
            input.textContent = currentInput;
            firstOperand = null;
            operator = null;
        }
    }

    function handleClear() {
        currentInput = '0';
        firstOperand = null;
        operator = null;
        input.textContent = currentInput;
    }


    document.querySelectorAll('.numbers button').forEach(button => {
        button.addEventListener('click', function () {
            updateInput(button.textContent);
        });
    });

    document.querySelectorAll('.symbols button').forEach(button => {
        button.addEventListener('click', function () {
            handleOperator(button.textContent);
        });
    });

    document.querySelector('.equals button').addEventListener('click', handleEquals);

    // Separate event listener for the clear button
    document.querySelector('.clear').addEventListener('click', function () {
        handleClear();
    });
});
