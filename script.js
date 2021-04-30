const decimalsAllowed = 5;
const digitsAllowed = 10;

function operate(operator, a, b) {
    let num;
    let modifiedA = Number(a);
    let modifiedB = Number(b);
    switch (operator) {
        case 'add': 
            num = modifiedA + modifiedB;
            break;
        case 'subtract':
            num = modifiedA - modifiedB;
            break;
        case 'multiply':
            num = modifiedA * modifiedB;
            break;
        case 'divide':
            if (modifiedB === 0) {
                return 'Can\'t Do That!';
            }
            num = modifiedA / modifiedB;
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
        if (e.target.value === '.' && displayArray.length === 0) {
            displayArray.push('0');
        }
        if (displayArray.length < digitsAllowed) {
            displayArray.push(e.target.value);
            currentDisplay = displayArray.join('');
            display.innerHTML = currentDisplay;
        } else return;
    });
});

operations.forEach(item => {
    item.addEventListener('click', e => {
        if (operateObj.a == 'Can\'t Do That!' || operateObj.a == 'Screen Too Small!') {
            clearFunction();
            return;
        }
        if (operateObj.a == null) {
            displayArray.splice(0, displayArray.length);
            operateObj.a = currentDisplay;
            if (displayArray == []) {
                return;
            }
            if (e.target.id !== 'equals') {
                operateObj.operator = e.target.id;
                currentDisplay = e.target.innerHTML;
                display.innerHTML = currentDisplay;
            }
        } else if (e.target.id == 'equals' && operateObj.b == null && displayArray.length == 0) {
            return;
        } else if (operateObj.operator == null || (operateObj.b == null && displayArray.length == 0)) {
            operateObj.operator = e.target.id;
            currentDisplay = e.target.innerHTML;
            display.innerHTML = currentDisplay;
        } else if (operateObj.b == null && displayArray.length > 0) {
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
        // need to make it operateObj.a an array before figuring out it is too big
        const operateObjAArray = operateObj.a.toString().split('');
        if (operateObjAArray.length > digitsAllowed && operateObjAArray[0] !== 'C') {
            currentDisplay = 'Screen Too Small!';
            display.innerHTML = currentDisplay;
            operateObj.a = currentDisplay;
        }
    });
});

const clearBtn = document.querySelector('#clear-button');

clearBtn.addEventListener('click', () => {
    clearFunction();
});

function clearFunction() {
    displayArray.splice(0, displayArray.length);
    operateObj.a = null;
    operateObj.operator = null;
    operateObj.b = null;
    display.innerHTML = 0;
}

const backBtn = document.querySelector('#back-button');

backBtn.addEventListener('click', () => {
    if (operateObj.operator && displayArray == null) {
        return;
    }
    displayArray.pop();
    if (displayArray.length == 0) {
        display.innerHTML = 0;
    } else {
        currentDisplay = Number(displayArray.join(''));
        display.innerHTML = currentDisplay;
    }
});