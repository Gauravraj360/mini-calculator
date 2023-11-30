
const input=document.querySelectorAll('.input');
const operations=document.querySelectorAll('.op');
const display=document.querySelector('#display');
let expression="";
input.forEach(digit => {
    digit.addEventListener('click',function(){
        expression+=digit.innerHTML;
        display.value=expression;
        if(digit.innerHTML==='='){
            const result=customEval(expression);
            expression+=result.toString();
            display.value=expression;
        }
    });
   digit.onmouseenter = function(){
    this.style.backgroundColor='lightblue';
   }
   digit.onmouseleave = function(){
    this.style.backgroundColor='#f4f4f4';
   }
});

operations.forEach(op => {
    op.addEventListener('click',function(){
        
        if(op.innerHTML==='C'){
            expression="";
        }
        else{
           expression+=op.innerHTML;
        }
        display.value=expression;
        
    });

    op.onmouseenter = function(){
        this.style.backgroundColor='lightblue';
       }
    op.onmouseleave = function(){
    this.style.backgroundColor='#f4f4f4';
    }
});

document.addEventListener('keyup', function(e){
    const operators = '+-*/=';
    const regexString = `[0-9${operators.replace('-', '\\-')}]+`;
    const regex = new RegExp(regexString, 'g');

    if(e.key==='=' || e.key==='Enter'){
        const result=customEval(expression);
        expression=result.toString();
        display.value=expression;
    }
    else if(e.key==='c'){
        expression="";
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
