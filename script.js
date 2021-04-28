const decimalsAllowed = 3;

function operate(operator, a, b) {
    let num;
    switch (operator) {
        case 'add': 
            num = a + b;
            break;
        case 'subtract':
            num = a - b;
            break;
        case 'multiply':
            num = a * b;
            break;
        case 'divide':
            num = a / b;
            break;
    };
    num = Math.round(num * (10 ** decimalsAllowed)) / (10 ** decimalsAllowed);
    return num;
};

const display = document.querySelector('#display');
const numbers = Array.prototype.slice.call(document.querySelectorAll('#numbers-div > button'));
const operations = Array.prototype.slice.call(document.querySelectorAll('#operations-div > button'));
const displayArray = [];
const operateObj = {
    a: null,
    operator: null,
    b: null,
}
let currentDisplay;

numbers.forEach(item => {
    item.addEventListener('click', e => {
        if (operateObj.operator == null){
            operateObj.a = null;
        };
        if (e.target.value === '.' && displayArray.includes('.')) {
            return; 
        };
        displayArray.push(e.target.value);
        currentDisplay = Number(displayArray.join(''));
        display.innerHTML = currentDisplay;
    });
});

operations.forEach(item => {
    item.addEventListener('click', e => {
        if (operateObj.a == null) {
            displayArray.splice(0, displayArray.length);
            operateObj.a = currentDisplay;
            operateObj.operator = e.target.id;
            currentDisplay = e.target.innerHTML;
            display.innerHTML = currentDisplay;
        } else if (operateObj.operator == null) {
            operateObj.operator = e.target.id;
            currentDisplay = e.target.innerHTML;
            display.innerHTML = currentDisplay;
        } else if (operateObj.b == null) {
            displayArray.splice(0, displayArray.length);
            operateObj.b = currentDisplay;
            currentDisplay = operate(operateObj.operator, operateObj.a, operateObj.b);
            display.innerHTML = currentDisplay;
            operateObj.a = currentDisplay;
            operateObj.operator = e.target.id;
            operateObj.b = null;
        }
        if (operateObj.operator == 'equals') {
            operateObj.operator = null;
        };
    });
});