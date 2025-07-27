// let currentValue = '';
// let operator = '';
// let result = null;
// let memory = 0;

class Command {
  execute() {}
}

class Calculator {
  constructor() {
    this.currentValue = '';
    this.operator = '';
    this.result = null;
    this.memory = 0;
    this.value = '0';
  }

  addValue(value) {
    // добавить валидацию на корректность ввода
    if (this.value === '0') this.value = '';

    this.value += value;
  }

  clearHistory() {
    this.currentValue = '';
    this.operator = '';
    this.result = null;
    this.value = '0';
  }

  handleOperator(op) {
    if (this.value === '') return;

    if (this.operator && /[+\-*/]/.test(this.value)) {
      this.calculate();
    }

    if (!/[+\-*/]$/.test(this.value)) {
      this.value += op;
      this.operator = op;
    } else {
      this.value = this.value.slice(0, -1) + op;
      this.operator = op;
    }
  }

  getWipe() {
    this.value = this.value.slice(0, -1) || '0';
  }

  calculate() {
    if (!this.operator && (this.value.includes('^') || this.value.includes('√'))) {
      const result = this.findPowerSign(this.value);
      this.value = result.toString();
      return;
    }
    if (!this.operator) return;

    const parts = this.value.split(this.operator);

    if (parts.length !== 2 || parts[1] === '') return;

    const left = this.findPowerSign(parts[0]);
    const right = this.findPowerSign(parts[1]);

    // const left = Number(parts[0]);
    // const right = Number(parts[1]);

    let result;

    switch (this.operator) {
      case '+':
        result = left + right;
        break;
      case '-':
        result = left - right;
        break;
      case '*':
        result = left * right;
        break;
      case '/':
        result = right !== 0 ? left / right : 'Error';
        break;
      case '':
      default:
        result = 'Error';
    }

    this.value = result.toString();
    this.operator = '';
  }

  findPowerSign(data) {
    if (data.includes('√')) {
      const [rootDegree, value] = data.split('√');

      const degree = rootDegree === '' ? 2 : Number(rootDegree);
      const number = Number(value);

      if (isNaN(degree) || isNaN(number) || value === '') {
        return undefined;
      }

      return Math.pow(number, 1 / degree);
    }

    if (data.includes('^')) {
      const [base, exponent] = data.split('^');
      const baseNum = Number(base);
      const exponentNum = Number(exponent);

      if (isNaN(baseNum) || isNaN(exponentNum) || exponent === '') {
        return undefined;
      }

      return Math.pow(baseNum, exponentNum);
    }

    const num = Number(data);
    return isNaN(num) ? undefined : num;
  }

  getPercent() {
    if (!this.value) return;

    if (this.operator && this.value.includes(this.operator)) {
      const parts = this.value.split(this.operator);

      if (parts.length === 2 && parts[1] !== '') {
        const percent = Number(parts[1]) / 100;
        parts[1] = percent.toString();
        this.value = parts.join(this.operator);
      }
    } else {
      const percent = Number(this.value) / 100;
      this.value = percent.toString();
    }
    this.calculate();
  }

  getInverse() {
    if (!this.value) return;

    if (this.operator && this.value.includes(this.operator)) {
      const parts = this.value.split(this.operator);

      if (parts.length === 2 && parts[1] !== '') {
        const inverse = Math.pow(Number(parts[1]), -1);
        parts[1] = inverse.toString();
        this.value = parts.join(this.operator);
      }
    } else {
      const inverse = Math.pow(Number(this.value), -1);
      this.value = inverse.toString();
    }
    this.calculate();
  }
  getFactorial() {
    if (!this.value) return;

    if (this.operator && this.value.includes(this.operator)) {
      const parts = this.value.split(this.operator);

      if (parts.length === 2 && parts[1] !== '') {
        const factorialValue = this.factorial(parts[1]);
        this.value = parts[0] + factorialValue;
        parts[1] = factorialValue.toString();
        this.value = parts.join(this.operator);
      }
    } else {
      const factorialValue = this.factorial(this.value);
      this.value = factorialValue.toString();
    }
    this.calculate();
  }
  factorial(n) {
    return n ? n * this.factorial(n - 1) : 1;
  }

  getSquare() {
    if (!this.value) return;

    if (this.operator && this.value.includes(this.operator)) {
      const parts = this.value.split(this.operator);

      if (parts.length === 2 && parts[1] !== '') {
        const square = Math.pow(Number(parts[1]), 2);
        parts[1] = square.toString();
        this.value = parts.join(this.operator);
      }
    } else {
      const square = Math.pow(Number(this.value), 2);
      this.value = square.toString();
    }
    this.calculate();
  }

  getCube() {
    if (!this.value) return;

    if (this.operator && this.value.includes(this.operator)) {
      const parts = this.value.split(this.operator);

      if (parts.length === 2 && parts[1] !== '') {
        const cube = Math.pow(Number(parts[1]), 3);
        parts[1] = cube.toString();
        this.value = parts.join(this.operator);
      }
    } else {
      const cube = Math.pow(Number(this.value), 3);
      this.value = cube.toString();
    }
    this.calculate();
  }

  getTenPower() {
    if (!this.value) return;

    if (this.operator && this.value.includes(this.operator)) {
      const parts = this.value.split(this.operator);

      if (parts.length === 2 && parts[1] !== '') {
        const cube = Math.pow(10, Number(parts[1]));
        parts[1] = cube.toString();
        this.value = parts.join(this.operator);
      }
    } else {
      const cube = Math.pow(10, Number(this.value));
      this.value = cube.toString();
    }
    this.calculate();
  }

  getRoot(n) {
    if (!this.value) return;

    if (this.operator && this.value.includes(this.operator)) {
      const parts = this.value.split(this.operator);

      if (parts.length === 2 && parts[1] !== '') {
        const square = Math.pow(Number(parts[1]), 1 / n);
        parts[1] = square.toString();
        this.value = parts.join(this.operator);
      }
    } else {
      const square = Math.pow(Number(this.value), 1 / n);
      this.value = square.toString();
    }
    this.calculate();
  }

  addSign(sign) {
    if (!this.value) return;

    this.value += sign;
  }

  getOppositeSign() {
    if (!this.value) return;

    if (this.operator && this.value.includes(this.operator)) {
      const parts = this.value.split(this.operator);

      if (parts.length === 2 && parts[1] !== '') {
        if (this.operator === '+') {
          operator = '-';
        } else if ((this.operator = '-')) {
          operator = '+';
        }
        this.value = parts.join(this.operator);
      }
    } else {
      const operand = Number(this.value) * -1;
      this.value = operand.toString();
    }
  }

  memoryAdd() {
    if (!this.value) return;

    this.calculate();

    this.memory += Number(this.value);
  }

  memoryWipe() {
    if (!this.value) return;

    this.calculate();

    this.memory -= Number(this.value);
  }

  memoryClear() {
    this.memory = 0;
  }

  memoryRead() {
    if (this.memory == null) return;

    if (this.value === '0') {
      this.value = '';
    }

    this.value += this.memory.toString();
  }
}

class AddValueCommand extends Command {
  constructor(calculator, value) {
    super();
    this.calculator = calculator;
    this.value = value;
  }

  execute() {
    this.calculator.addValue(this.value);
  }
}

class ClearHistoryCommand extends Command {
  constructor(calculator) {
    super();
    this.calculator = calculator;
  }

  execute() {
    this.calculator.clearHistory();
  }
}

class HandleOperatorCommand extends Command {
  constructor(calculator, operator) {
    super();
    this.calculator = calculator;
    this.operator = operator;
  }

  execute() {
    this.calculator.handleOperator(this.operator, this.operator);
  }
}
class GetWipeCommand extends Command {
  constructor(calculator) {
    super();
    this.calculator = calculator;
  }

  execute() {
    this.calculator.getWipe();
  }
}

class CalculateCommand extends Command {
  constructor(calculator) {
    super();
    this.calculator = calculator;
  }

  execute() {
    this.calculator.calculate();
  }
}

class FindPowerSignCommand extends Command {
  constructor(calculator, data) {
    super();
    this.calculator = calculator;
    this.data = data;
  }

  execute() {
    return this.calculator.findPowerSign(this.data);
  }
}

class GetPercentCommand extends Command {
  constructor(calculator) {
    super();
    this.calculator = calculator;
  }

  execute() {
    this.calculator.getPercent();
  }
}

class GetInverseCommand extends Command {
  constructor(calculator) {
    super();
    this.calculator = calculator;
  }

  execute() {
    this.calculator.getInverse();
  }
}

class GetFactorialCommand extends Command {
  constructor(calculator) {
    super();
    this.calculator = calculator;
  }

  execute() {
    this.calculator.getFactorial();
  }
}

class GetCubeCommand extends Command {
  constructor(calculator) {
    super();
    this.calculator = calculator;
  }

  execute() {
    this.calculator.getCube();
  }
}

class GetRootCommand extends Command {
  constructor(calculator, n) {
    super();
    this.calculator = calculator;
    this.n = n;
  }

  execute() {
    this.calculator.getRoot(this.n);
  }
}

class GetOppositeSignCommand extends Command {
  constructor(calculator) {
    super();
    this.calculator = calculator;
  }

  execute() {
    this.calculator.getOppositeSign();
  }
}

class GetSquareCommand extends Command {
  constructor(calculator) {
    super();
    this.calculator = calculator;
  }

  execute() {
    this.calculator.getSquare();
  }
}

class TenPowerCommand extends Command {
  constructor(calculator) {
    super();
    this.calculator = calculator;
  }

  execute() {
    this.calculator.getTenPower();
  }
}

class AddSignCommand extends Command {
  constructor(calculator, sign) {
    super();
    this.calculator = calculator;
    this.sign = sign;
  }

  execute() {
    this.calculator.addSign(this.sign);
  }
}

class MemoryAddCommand extends Command {
  constructor(calculator) {
    super();
    this.calculator = calculator;
  }

  execute() {
    this.calculator.memoryAdd();
  }
}

class MemoryClearCommand extends Command {
  constructor(calculator) {
    super();
    this.calculator = calculator;
  }

  execute() {
    this.calculator.memoryClear();
  }
}

class MemoryReadCommand extends Command {
  constructor(calculator) {
    super();
    this.calculator = calculator;
  }

  execute() {
    this.calculator.memoryRead();
  }
}

class MemoryWipeCommand extends Command {
  constructor(calculator) {
    super();
    this.calculator = calculator;
  }

  execute() {
    this.calculator.memoryWipe();
  }
}

function addValue(value) {
  const command = new AddValueCommand(calculator, value);
  command.execute();
  input.value = calculator.value;
  //   // добавить валидацию на корректность ввода
  //   if (input.value === '0') input.value = '';

  //   input.value += value;
}

function handleOperator(op) {
  if (input.value === '') return;

  const command = new HandleOperatorCommand(calculator, op);
  command.execute();
  input.value = calculator.value;

  //   if (operator && /[+\-*/]/.test(input.value)) {
  //     calculate();
  //   }

  //   if (!/[+\-*/]$/.test(input.value)) {
  //     input.value += op;
  //     operator = op;
  //   } else {
  //     input.value = input.value.slice(0, -1) + op;
  //     operator = op;
  //   }
}

function clearHistory() {
  const command = new ClearHistoryCommand(calculator);
  command.execute();
  input.value = calculator.value;
  //   let currentValue = '';
  //   let operator = '';
  //   let result = null;
  //   input.value = '0';
}

function getWipe() {
  const command = new GetWipeCommand(calculator);
  command.execute();
  input.value = calculator.value;
  //   if (this.value === '') return;
  //   let data = this.value.split('');
  //   data.pop();
  //   if (data.length === 0) {
  //     this.value = '0';
  //   } else {
  //     this.value = data.join('');
  //   }
}

function calculate() {
  const command = new CalculateCommand(calculator);
  command.execute();
  input.value = calculator.value;
  //   if (!operator && (this.value.includes('^') || this.value.includes('√'))) {
  //     const result = findPowerSign(this.value);
  //     this.value = result.toString();
  //     return;
  //   }
  //   if (!operator) return;

  //   const parts = this.value.split(operator);

  //   if (parts.length !== 2 || parts[1] === '') return;

  //   const left = findPowerSign(parts[0]);
  //   const right = findPowerSign(parts[1]);

  //   switch (operator) {
  //     case '+':
  //       result = left + right;
  //       break;
  //     case '-':
  //       result = left - right;
  //       break;
  //     case '*':
  //       result = left * right;
  //       break;
  //     case '/':
  //       result = right !== 0 ? left / right : 'Error';
  //       break;
  //     case '':
  //     default:
  //       result = 'Error';
  //   }

  //   this.value = result.toString();
  //   operator = '';
}

function findPowerSign() {
  const command = new FindPowerSignCommand(calculator);
  command.execute();
  input.value = calculator.value;
  //   if (data.includes('√')) {
  //     const [rootDegree, value] = data.split('√');
  //     const degree = rootDegree === '' ? 2 : Number(rootDegree);
  //     return Math.pow(Number(value), 1 / degree);
  //   }

  //   if (data.includes('^')) {
  //     const [base, exponent] = data.split('^');
  //     return Math.pow(Number(base), Number(exponent));
  //   }

  //   return Number(data);
}

function getPercent() {
  const command = new GetPercentCommand(calculator);
  command.execute();
  input.value = calculator.value;
  //   if (!this.value) return;

  //   if (operator && this.value.includes(operator)) {
  //     const parts = this.value.split(operator);

  //     if (parts.length === 2 && parts[1] !== '') {
  //       const percent = Number(parts[1]) / 100;
  //       parts[1] = percent.toString();
  //       this.value = parts.join(operator);
  //     }
  //   } else {
  //     const percent = Number(this.value) / 100;
  //     this.value = percent.toString();
  //   }
  //   calculate();
}

function getInverse() {
  const command = new GetInverseCommand(calculator);
  command.execute();
  input.value = calculator.value;
  //   if (!this.value) return;

  //   if (operator && this.value.includes(operator)) {
  //     const parts = this.value.split(operator);

  //     if (parts.length === 2 && parts[1] !== '') {
  //       const inverse = Math.pow(Number(parts[1]), -1);
  //       parts[1] = inverse.toString();
  //       this.value = parts.join(operator);
  //     }
  //   } else {
  //     const inverse = Math.pow(Number(this.value), -1);
  //     this.value = inverse.toString();
  //   }
  //   calculate();
}
function getFactorial() {
  const command = new GetFactorialCommand(calculator);
  command.execute();
  input.value = calculator.value;
  //   if (!this.value) return;

  //   if (operator && this.value.includes(operator)) {
  //     const parts = this.value.split(operator);

  //     if (parts.length === 2 && parts[1] !== '') {
  //       const factorialValue = factorial(parts[1]);
  //       this.value = parts[0] + factorialValue;
  //       parts[1] = factorialValue.toString();
  //       this.value = parts.join(operator);
  //     }
  //   } else {
  //     const factorialValue = factorial(this.value);
  //     this.value = factorialValue.toString();
  //   }
  //   calculate();
}
// function factorial(n) {
//   return n ? n * factorial(n - 1) : 1;
// }

function getSquare() {
  const command = new GetSquareCommand(calculator);
  command.execute();
  input.value = calculator.value;
  //   if (!this.value) return;

  //   if (operator && this.value.includes(operator)) {
  //     const parts = this.value.split(operator);

  //     if (parts.length === 2 && parts[1] !== '') {
  //       const square = Math.pow(Number(parts[1]), 2);
  //       parts[1] = square.toString();
  //       this.value = parts.join(operator);
  //     }
  //   } else {
  //     const square = Math.pow(Number(this.value), 2);
  //     this.value = square.toString();
  //   }
  //   calculate();
}

function getCube() {
  const command = new GetCubeCommand(calculator);
  command.execute();
  input.value = calculator.value;
  //   if (!this.value) return;

  //   if (operator && this.value.includes(operator)) {
  //     const parts = this.value.split(operator);

  //     if (parts.length === 2 && parts[1] !== '') {
  //       const cube = Math.pow(Number(parts[1]), 3);
  //       parts[1] = cube.toString();
  //       this.value = parts.join(operator);
  //     }
  //   } else {
  //     const cube = Math.pow(Number(this.value), 3);
  //     this.value = cube.toString();
  //   }
  //   calculate();
}


function getRoot(n) {
  const command = new GetRootCommand(calculator, n);
  command.execute();
  input.value = calculator.value;
}

function getTenPower() {
  const command = new TenPowerCommand(calculator);
  command.execute();
  input.value = calculator.value;
  //   if (!this.value) return;

  //   if (operator && this.value.includes(operator)) {
  //     const parts = this.value.split(operator);

  //     if (parts.length === 2 && parts[1] !== '') {
  //       const cube = Math.pow(10, Number(parts[1]));
  //       parts[1] = cube.toString();
  //       this.value = parts.join(operator);
  //     }
  //   } else {
  //     const cube = Math.pow(10, Number(this.value));
  //     this.value = cube.toString();
  //   }
  //   calculate();
}

function addSign(sign) {
  const command = new AddSignCommand(calculator, sign);
  command.execute();
  input.value = calculator.value;
  //   if (!this.value) return;

  //   this.value += sign;
}

function getOppositeSign() {
  const command = new GetOppositeSignCommand(calculator);
  command.execute();
  input.value = calculator.value;
  //   if (!this.value) return;
  //   if (operator && this.value.includes(operator)) {
  //     const parts = this.value.split(operator);
  //     if (parts.length === 2 && parts[1] !== '') {
  //       if (operator === '+') {
  //         operator = '-';
  //       } else if ((operator = '-')) {
  //         operator = '+';
  //       }
  //       this.value = parts.join(operator);
  //     }
  //   } else {
  //     const operand = Number(this.value) * -1;
  //     this.value = operand.toString();
  //   }
}

function memoryAdd() {
  const command = new MemoryAddCommand(calculator);
  command.execute();
  input.value = calculator.value;
  //   if (!this.value) return;

  //   calculate();

  //   memory += Number(this.value);
}

function memoryWipe() {
  const command = new MemoryWipeCommand(calculator);
  command.execute();
  input.value = calculator.value;
  //   if (!this.value) return;

  //   calculate();

  //   memory -= Number(this.value);
}

function memoryClear() {
  const command = new MemoryClearCommand(calculator);
  command.execute();
  input.value = calculator.value;
  // memory = 0;
}

function memoryRead() {
  const command = new MemoryReadCommand(calculator);
  command.execute();
  input.value = calculator.value;
  //   if (memory == null) return;
  //   if (this.value === '0') {
  //     this.value = '';
  //   }
  //   this.value += memory.toString();
}

let input = document.querySelector('input');
const calculator = new Calculator(input);

//ввод чисел
[
  'zero',
  'one',
  'two',
  'three',
  'four',
  'five',
  'six',
  'seven',
  'eight',
  'nine',
].forEach((id, i) => {
  document
    .getElementById(id)
    .addEventListener('click', () => addValue(i.toString()));
});

document.getElementById('comma').addEventListener('click', () => addValue('.'));

// математические знаки
document
  .getElementById('plus')
  .addEventListener('click', () => handleOperator('+'));
document
  .getElementById('minus')
  .addEventListener('click', () => handleOperator('-'));
document
  .getElementById('multiplication')
  .addEventListener('click', () => handleOperator('*'));
document
  .getElementById('division')
  .addEventListener('click', () => handleOperator('/'));

document.getElementById('equals').addEventListener('click', () => calculate());

//специфические операции
document
  .getElementById('percent')
  .addEventListener('click', () => getPercent());
document
  .getElementById('inverse')
  .addEventListener('click', () => getInverse());
document
  .getElementById('factorial')
  .addEventListener('click', () => getFactorial());
document
  .getElementById('operator')
  .addEventListener('click', () => getOppositeSign());

//степени
document.getElementById('square').addEventListener('click', () => getSquare());
document.getElementById('cube').addEventListener('click', () => getCube());
document
  .getElementById('tenPower')
  .addEventListener('click', () => getTenPower());
document.getElementById('power').addEventListener('click', () => addSign('^'));

//корни
document.getElementById('cubeRoot').addEventListener('click', () => getRoot(3));
document
  .getElementById('squareRoot')
  .addEventListener('click', () => getRoot(2));
document.getElementById('root').addEventListener('click', () => addSign('√'));

//работа с историей
document
  .getElementById('ac')
  .addEventListener('click', () => clearHistory(calculator));
document.getElementById('wipe').addEventListener('click', () => getWipe());

//работа с памятью
document
  .getElementById('memoryAdd')
  .addEventListener('click', () => memoryAdd());
document
  .getElementById('memoryWipe')
  .addEventListener('click', () => memoryWipe());
document
  .getElementById('memoryClear')
  .addEventListener('click', () => memoryClear());
document
  .getElementById('memoryRead')
  .addEventListener('click', () => memoryRead());
