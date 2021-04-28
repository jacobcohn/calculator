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
    }
    num = Math.round(num * 1000) / 1000;
    return num;
}