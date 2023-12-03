
const buttons=document.querySelectorAll('button');
const display=document.querySelector('#display');
const displayResult=document.querySelector('#result');
let expression="";
buttons.forEach(button => {
    button.addEventListener('click',function(){
        const operators = '+-*/';
        const regexString = `[0-9${operators.replace('-', '\\-')}]+`;
        const regex = new RegExp(regexString, 'g');
        
        if(button.innerHTML.match(regex)){ 
            expression+=button.innerHTML;
            display.value=expression;    
        }
        if(button.id==='equals'){
           evaluateExpression();
        }
        if(button.id==='clear'){
            clearDisplay();
        }
        if(button.id==='backspace'){
            expression=expression.slice(0,-1);
            display.value=expression;
        }
        
        
    });
    
   
});
document.addEventListener('keyup', function(e){
    const operators = '+-*/';
    const regexString = `[0-9${operators.replace('-', '\\-')}]+`;
    const regex = new RegExp(regexString, 'g');
   
    if(e.key==='=' || e.key==='Enter'){
       evaluateExpression();
    }
    else if(e.key==='c'){
        clearDisplay();
    }
    else if(e.key==='Backspace'){
        expression=expression.slice(0,-1);
        display.value=expression;
    }

    if(e.key.match(regex)){
        expression+=e.key;
        display.value=expression;     
    }
});

function evaluateExpression() {
    const result = customEval(expression);
    if (typeof result === 'string') {
        displayResult.value = result; // Show error message
    } else {
        displayResult.value = result.toString(); // Show result
    }
}
function clearDisplay() {
    expression = "";
    display.value = "";
    displayResult.value = "";
}

function customEval(expression) {
    const operator="+-*/";
    const operators = /[+\-*/]/;
    const regex= new RegExp(`(${operators.source})`)
    const splitString= expression.split(regex);
    const tokens=splitString;
    
    let result = 0;
    let currentOperator = '+';
    let consecutiveOperators=false;
    let errorMessage='';

    if (!tokens) return NaN; // Handling invalid input

    tokens.forEach(token => {
        if (operator.includes(token)) {
            currentOperator = token;
            console.log(currentOperator);
            if(consecutiveOperators===true){
                errorMessage = 'Error: Multiple consecutive operators';
            }
            consecutiveOperators=true;
        } else {
            consecutiveOperators=false;
            const number = parseFloat(token);
            if (!isNaN(number)) {
                if(currentOperator==='/' && number===0){
                    errorMessage="Warning: Division by zero";
                    console.log(displayResult.value);
                }
                
                    switch (currentOperator) {
                        case '+':
                            result += number;
                            break;
                        case '-':
                            result -= number;
                            break;
                        case '*':
                            result *= number;
                            break;
                        case '/':
                            result /= number;
                            break;
                        default:
                            break;
                    }
                
            }
        }
    });

    return errorMessage? errorMessage:result;
}
