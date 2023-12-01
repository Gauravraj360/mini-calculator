
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
            const result=customEval(expression);
            expression=result.toString();
            displayResult.value=result.toString();
        }
        if(button.id==='clear'){
            expression="";
            display.value="";
            displayResult.value="";
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
        const result=customEval(expression);
        expression=result.toString();
        displayResult.value=result.toString();
    }
    else if(e.key==='c'){
        expression="";
        display.value=expression;
        displayResult.value="";
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

function customEval(expression) {
    const operator="+-*/";
    const operators = /[+\-*/]/;
    const regex= new RegExp(`(${operators.source})`)
    const splitString= expression.split(regex);
    const tokens=splitString;
    
    let result = 0;
    let currentOperator = '+';

    if (!tokens) return NaN; // Handling invalid input

    tokens.forEach(token => {
        if (operator.includes(token)) {
            currentOperator = token;
        } else {
            const number = parseFloat(token);
            if (!isNaN(number)) {
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

    return result;
}
