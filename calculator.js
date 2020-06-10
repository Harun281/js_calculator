

class myCalculator {
     constructor(prevOperandText,currentOperandText){
          this.prevOperandText = prevOperandText;
          this.currentOperandText = currentOperandText;
          this.clear();
     }
     clear(){
          this.prevOperand = '';
          this.currentOperand = '';
          this.operation = undefined;
     }

     delete(){
          this.currentOperand = this.currentOperand.toString().slice(0,-1);
     }

     append(num){
          if(num === '.' && this.currentOperand.includes('.')) return;
          this.currentOperand = this.currentOperand.toString() + num.toString();
     }

     chooseOperation(operation){
          if(this.currentOperand === '')return;
          if(this.prevOperand !== ''){
               this.computation();
          }
          this.operation = operation;
          this.prevOperand = this.currentOperand;
          this.currentOperand = '';

     }

     computation(){
          let result;
          const prev = parseFloat(this.prevOperand);
          const current = parseFloat(this.currentOperand);
          if (isNaN(prev) || isNaN(current)) return;
          
          switch(this.operation){
               case '+':
                    result = prev + current;
                    break;
               case '-':
                    result = prev - current;
                    break;
               case '/':
                    result = prev / current;
                    break;
               case '*':
                    result = prev * current;
                    break;
               default:
                    return;
          }
          
          this.currentOperand = result;
          this.prevOperand = '';
          this.operation = undefined;

     }
     getDisplay(number){
          const stringNumber = number.toString();
          const integerDigits = parseFloat(stringNumber.split('.')[0]);
          const decimalDigits = stringNumber.split('.')[1];
          let integerDisplay;
          if (isNaN(integerDigits)) {
               integerDisplay = '';
          } else {
               integerDisplay = integerDigits.toLocaleString('en', { maximumFractionDigits: 0 });
          }
          if (decimalDigits != null) {
               return `${integerDisplay}.${decimalDigits}`;
          } else {
               return integerDisplay;
          }
          
     }

     updateDisplay(){
          this.currentOperandText.innerText = this.getDisplay(this.currentOperand);
        if (this.operation != null) {
          this.prevOperandText.innerText =
            `${this.getDisplay(this.prevOperand)} ${this.operation}`;
        } else {
          this.prevOperandText.innerText = '';
        }
     }
}

const clearAll = document.querySelector('[data-clear]');
const operation = document.querySelectorAll('[data-operation]');
const calculate = document.querySelector('[data-calculate]');
const del = document.querySelector('[data-del]');
const number = document.querySelectorAll('[data-number]');
const prevOperandText = document.querySelector('[data-previous]');
const currentOperandText = document.querySelector('[data-current]');

const calculator = new myCalculator(prevOperandText,currentOperandText);



number.forEach(button => {
     button.addEventListener('click',() => {
          calculator.append(button.innerText);
          calculator.updateDisplay();
     });
});

operation.forEach(button => {
     button.addEventListener('click',() => {
          calculator.chooseOperation(button.innerText);
          calculator.updateDisplay();
     });
});

calculate.addEventListener('click',() => {
     calculator.computation();
     calculator.updateDisplay();
});

del.addEventListener('click',() => {
     calculator.delete();
     calculator.updateDisplay();
});

clearAll.addEventListener('click',() => {
     calculator.clear();
     calculator.updateDisplay();
});


