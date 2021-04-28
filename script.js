function operate(operator, a, b) {
    let num;
    switch (operator) {
        case 'add': 
            num = a + b;
            break;
        case 'subtract':
            num = a + b;
            break;
        case 'multiply':
            num = a * b;
            break;
        case 'divide':
            num = a / b;
            break;
    };
    num = Math.round(num * 1000) / 1000;
    return num;
};

const display = document.querySelector('#display');
const numbers = Array.prototype.slice.call(document.querySelectorAll('#numbers-div > button'));
const displayArray = [];
let currentDisplay;

numbers.forEach(item => {
    item.addEventListener('click', e => {
        if (e.target.value === '.' && displayArray.includes('.')) {
           return; 
        };
        displayArray.push(e.target.value);
        currentDisplay = displayArray.join('');
        display.innerHTML = currentDisplay;
    });
});

