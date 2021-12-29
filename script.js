let num1, num2, activeOperator;
let displayingResult = false;
let operatorJustSet = false;

const calculatorDisplay = document.querySelector('.calc-display div');
const numberButtons = Array.from(document.querySelectorAll('.number-button'));
const operatorButtons = Array.from(document.querySelectorAll('.operator-button'));
const minusButton = document.querySelector('.minus-button');
const dotButton = document.querySelector('.dot-button');
const clearButton = document.querySelector('.clear-button');
const deleteButton = document.querySelector('.delete-button');
const equalsButton = document.querySelector('.equals-button');

operatorButtons.pop(minusButton);

numberButtons.forEach( (button) => button.addEventListener('click', function() {appendNumberToDisplay(this.textContent);}) );
operatorButtons.forEach( (button) => button.addEventListener('click', function() {setOperator(this.getAttribute('data-operator'));}) );
dotButton.addEventListener('click', addDotToDisplay);
clearButton.addEventListener('click', clearDisplay);
deleteButton.addEventListener('click', backspaceDisplay);
equalsButton.addEventListener('click', evaluateResult);
minusButton.addEventListener('click', minusButtonClick);

window.addEventListener('keydown', handleKeyPress);

const add = function(a, b) {
    return a + b;
}

const subtract = function(a, b) {
    return a - b;
}

const multiply = function(a, b) {
    return a * b;
}

const divide = function(a, b) {
    return a / b;
}

const operate = function(a, b, op) {
    if (op === '+') {
        return add(a, b);
    } else if (op === '-') {
        return subtract(a, b);
    } else if (op === '×') {
        return multiply(a, b);
    } else if (op === '÷') {
        if (b === 0) return 'Math Error!';
        return divide(a, b);
    }
}

function appendNumberToDisplay(number) {
    displayText = calculatorDisplay.textContent;
    if (displayingResult || operatorJustSet) {
        displayText = number;
        displayingResult = false;
        operatorJustSet = false;
    } else {
        displayText += number;
    }

    if (activeOperator) {
        num2 = Number(displayText);
    } else {
        num1 = Number(displayText);
    }
    calculatorDisplay.textContent = displayText;
}

function addDotToDisplay() {
    displayText = calculatorDisplay.textContent;
    if (!displayText || displayText.includes('.')) return;
    calculatorDisplay.textContent += '.';
    displayingResult = false;
    operatorJustSet = false;
}

function clearDisplay() {
    calculatorDisplay.textContent = '';
    activeOperator = null;
    num1 = null;
    num2 = null;
}

function backspaceDisplay() {
    displayText = calculatorDisplay.textContent;
    calculatorDisplay.textContent = displayText.slice(0, displayText.length-1);
}

function setOperator(operator) {
    if (num2) evaluateResult();
    displayText = calculatorDisplay.textContent;
    if (!displayText || isNaN(Number(displayText))) return;
    activeOperator = document.querySelector(`[data-operator='${operator}']`);
    operatorJustSet = true;
}

function evaluateResult() {
    displayText = calculatorDisplay.textContent;
    if (!activeOperator || !displayText) return;
    result = operate(num1, num2, activeOperator.textContent);
    displayingResult = true;
    activeOperator = null;
    num1 = typeof(result) == 'string' ? null : result;
    num2 = null;
    calculatorDisplay.textContent = result;
}

function minusButtonClick() {
    displayText = calculatorDisplay.textContent;
    if (!displayText || operatorJustSet) {
        appendNumberToDisplay('-');
    } else setOperator('-');
}

function handleKeyPress(e) {
    key = e.key;
    if ('1234567890'.includes(key)) {
        appendNumberToDisplay(key);
    } else if ('*/+'.includes(key)) {
        setOperator(key);
    } else if (key === '-') {
        minusButtonClick();
    } else if (key === 'Backspace') {
        backspaceDisplay();
    } else if (key === 'Escape') {
        clearDisplay();
    } else if (key === '=' || key === 'Enter') {
        evaluateResult();
    } else if (key === '.') {
        addDotToDisplay();
    }
}