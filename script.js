// makes sure it fits in the display
const decimalsAllowed = 5;
const digitsAllowed = 10;

// does the math behind the calculator
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
// stores and displays numbers as you click on them
const displayArray = [];
// stores the numbers and operations before operate function
const operateObj = {
    a: null,
    operator: null,
    b: null,
}
// helps carry data to different places
let currentDisplay;

numbers.forEach(item => {
    item.addEventListener('click', e => {
        // for if user clicked the equals button, resets operateObj.a
        if (operateObj.operator == null){
            operateObj.a = null;
        };
        // doesn't allow two decimals
        if (e.target.value === '.' && displayArray.includes('.')) {
            return; 
        };
        // puts 0 in front of decimal when user clicks decimal first
        if (e.target.value === '.' && displayArray.length === 0) {
            displayArray.push('0');
        }
        // updates displayArray and actual display
        if (displayArray.length < digitsAllowed) {
            displayArray.push(e.target.value);
            currentDisplay = displayArray.join('');
            display.innerHTML = currentDisplay;
        } else return;
    });
});

operations.forEach(item => {
    item.addEventListener('click', e => {
        // if user divides by zero or the solution is too big
        if (operateObj.a == 'Can\'t Do That!' || operateObj.a == 'Screen Too Small!') {
            clearFunction();
            return;
        }
        if (operateObj.a == null) {
            // if user clicks an operations button without inputting numbers first
            if (displayArray == []) {
                return;
            }
            // clears displayArray and updates operateObj.a
            displayArray.splice(0, displayArray.length);
            operateObj.a = currentDisplay;
            if (e.target.id !== 'equals') {
                // updates operateObj.operator and displays it
                operateObj.operator = e.target.id;
                currentDisplay = e.target.innerHTML;
                display.innerHTML = currentDisplay;
            }
        // if user switches to equals button after pressing another operations button
        } else if (e.target.id == 'equals' && operateObj.b == null && displayArray.length == 0) {
            return;
        // if user switches to another operations button before starting next number
        } else if  (operateObj.b == null && displayArray.length == 0) {
            operateObj.operator = e.target.id;
            currentDisplay = e.target.innerHTML;
            display.innerHTML = currentDisplay;
        // if operateObj is filled in except operate.b
        } else if (operateObj.b == null) {
            // updates operateObj.b and then uses operate function and displays it
            // after that, it sets up operateObj so it can be used again
            displayArray.splice(0, displayArray.length);
            operateObj.b = currentDisplay;
            currentDisplay = operate(operateObj.operator, operateObj.a, operateObj.b);
            display.innerHTML = currentDisplay;
            operateObj.a = currentDisplay;
            operateObj.operator = e.target.id;
            operateObj.b = null;
        }
        // if user clicks on equals
        if (operateObj.operator == 'equals') {
            operateObj.operator = null;
        };
        // if operateObj.a is too big to fit on screen
        // need to make it operateObj.a an array before figuring out it is too big
        if (displayArray !== []) {
            const operateObjAArray = operateObj.a.toString().split('');
            if (operateObjAArray.length > digitsAllowed && operateObjAArray[0] !== 'C') {
                currentDisplay = 'Screen Too Small!';
                display.innerHTML = currentDisplay;
                operateObj.a = currentDisplay;
            }
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
    // gets rid of last item in displayArray and displays it
    displayArray.pop();
    if (displayArray.length == 0) {
        display.innerHTML = 0;
    } else {
        currentDisplay = displayArray.join('');
        display.innerHTML = currentDisplay;
    }
});