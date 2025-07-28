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
    try {
      if (
        !this.operator &&
        (this.value.includes('^') || this.value.includes('√'))
      ) {
        const result = this.findPowerSign(this.value);
        this.value = result.toString();
        return;
      }
      if (!this.operator) {
        throw new Error('Operator is empty');
      }

      const parts = this.value.split(this.operator);

      if (parts.length !== 2 || parts[1] === '') return;

      const left = this.findPowerSign(parts[0]);
      const right = this.findPowerSign(parts[1]);

      if (isNaN(left) || isNaN(right)) {
        throw new Error('Not valid number');
      }

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
    } catch (error) {
      console.error(error.message);
    }
  }

  findPowerSign(data) {
    try {
      if (data.includes('√')) {
        const [rootDegree, value] = data.split('√');

        const degree = rootDegree === '' ? 2 : Number(rootDegree);
        const number = Number(value);

        if (isNaN(degree) || isNaN(number) || value.trim() === '') {
          throw new Error('Invalid root expression');
        }

        return Math.pow(number, 1 / degree);
      }

      if (data.includes('^')) {
        const [base, exponent] = data.split('^');
        const baseNum = Number(base);
        const exponentNum = Number(exponent);

        if (isNaN(baseNum) || isNaN(exponentNum) || exponent.trim() === '') {
          throw new Error('Invalid power expression');
        }

        return Math.pow(baseNum, exponentNum);
      }

      const num = Number(data);
      if (isNaN(num)) {
        throw new Error('Invalid number');
      }
      return num;
    } catch (error) {
      console.error(error.message);
      return undefined;
    }
  }

  getPercent() {
    try {
      if (!this.value) {
        throw new Error('Value is empty');
      }

      if (this.operator && this.value.includes(this.operator)) {
        const parts = this.value.split(this.operator);

        if (parts.length === 2 && parts[1] !== '') {
          const number = Number(parts[1]);
          if (isNaN(number)) {
            throw new Error('Invalid number for root');
          }
          const percent = number / 100;
          parts[1] = percent.toString();
          this.value = parts.join(this.operator);
        } else {
          throw new Error('Invalid expression for percent');
        }
      } else {
        const percent = Number(this.value) / 100;
        this.value = percent.toString();
      }
      this.calculate();
    } catch (error) {
      console.error(error.message);
    }
  }

  getInverse() {
    try {
      if (!this.value) {
        throw new Error('Value is empty');
      }

      if (this.operator && this.value.includes(this.operator)) {
        const parts = this.value.split(this.operator);

        if (parts.length === 2 && parts[1] !== '') {
          const number = Number(parts[1]);
          if (isNaN(number)) {
            throw new Error('Invalid number for root');
          }
          const inverse = Math.pow(number, -1);
          if (!isFinite(inverse)) {
            throw new Error('Cannot compute inverse');
          }
          parts[1] = inverse.toString();
          this.value = parts.join(this.operator);
        } else {
          throw new Error('Invalid expression for inverse');
        }
      } else {
        const inverse = Math.pow(Number(this.value), -1);
        if (!isFinite(inverse)) {
          throw new Error('Cannot compute inverse');
        }
        this.value = inverse.toString();
      }
      this.calculate();
    } catch (error) {
      console.error(error.message);
    }
  }
  getFactorial() {
    try {
      if (!this.value) {
        throw new Error('Value is empty');
      }

      if (this.operator && this.value.includes(this.operator)) {
        const parts = this.value.split(this.operator);

        if (parts.length === 2 && parts[1] !== '') {
          const factorialValue = this.factorial(parts[1]);
          if (isNaN(factorialValue)) {
            throw new Error('Invalid number');
          }
          this.value = parts[0] + factorialValue;
          parts[1] = factorialValue.toString();
          this.value = parts.join(this.operator);
        }
      } else {
        const factorialValue = this.factorial(this.value);
        if (isNaN(factorialValue)) {
          throw new Error('Invalid number');
        }
        this.value = factorialValue.toString();
      }
      this.calculate();
    } catch (error) {
      console.error(error.message);
      return undefined;
    }
  }

  factorial(n) {
    return n ? n * this.factorial(n - 1) : 1;
  }

  getSquare() {
    try {
      if (!this.value) {
        throw new Error('Value is empty');
      }

      if (this.operator && this.value.includes(this.operator)) {
        const parts = this.value.split(this.operator);

        if (parts.length === 2 && parts[1] !== '') {
          const number = Number(parts[1]);
          if (isNaN(number)) {
            throw new Error('Invalid number for root');
          }
          const square = Math.pow(number, 2);
          if (!isFinite(square)) {
            throw new Error('Invalid number');
          }
          parts[1] = square.toString();

          this.value = parts.join(this.operator);
        }
      } else {
        const square = Math.pow(Number(this.value), 2);
        if (!isFinite(square)) {
          throw new Error('Invalid number');
        }
        this.value = square.toString();
      }
      this.calculate();
    } catch (error) {
      console.error(error.message);
      return undefined;
    }
  }

  getCube() {
    try {
      if (!this.value) {
        throw new Error('Value is empty');
      }

      if (this.operator && this.value.includes(this.operator)) {
        const parts = this.value.split(this.operator);

        if (parts.length === 2 && parts[1] !== '') {
          const number = Number(parts[1]);
          if (isNaN(number)) {
            throw new Error('Invalid number for root');
          }
          const cube = Math.pow(number, 3);
          if (!isFinite(cube)) {
            throw new Error('Invalid number');
          }
          parts[1] = cube.toString();
          this.value = parts.join(this.operator);
        }
      } else {
        const cube = Math.pow(Number(this.value), 3);
        if (!isFinite(cube)) {
          throw new Error('Invalid number');
        }
        this.value = cube.toString();
      }
      this.calculate();
    } catch (error) {
      console.error(error.message);
      return undefined;
    }
  }

  getTenPower() {
    try {
      if (!this.value) {
        throw new Error('Value is empty');
      }

      if (this.operator && this.value.includes(this.operator)) {
        const parts = this.value.split(this.operator);

        if (parts.length === 2 && parts[1] !== '') {
          const number = Number(parts[1]);
          if (isNaN(number)) {
            throw new Error('Invalid number for root');
          }
          const cube = Math.pow(10, number);
          if (!isFinite(cube)) {
            throw new Error('Invalid number');
          }
          parts[1] = cube.toString();
          this.value = parts.join(this.operator);
        }
      } else {
        const cube = Math.pow(10, Number(this.value));
        if (!isFinite(cube)) {
          throw new Error('Invalid number');
        }
        this.value = cube.toString();
      }
      this.calculate();
    } catch (error) {
      console.error(error.message);
      return undefined;
    }
  }

  getRoot(n) {
    try {
      if (!this.value) {
        throw new Error('Value is empty');
      }

      if (this.operator && this.value.includes(this.operator)) {
        const parts = this.value.split(this.operator);

        if (parts.length === 2 && parts[1] !== '') {
          const number = Number(parts[1]);
          if (isNaN(number)) {
            throw new Error('Invalid number for root');
          }
          const root = Math.pow(number, 1 / n);
          if (!isFinite(root)) {
            throw new Error('Cannot compute root for this number');
          }
          parts[1] = root.toString();
          this.value = parts.join(this.operator);
        }
      } else {
        const number = Number(this.value);
        if (isNaN(number)) {
          throw new Error('Invalid number for root');
        }
        const root = Math.pow(number, 1 / n);
        if (!isFinite(root)) {
          throw new Error('Cannot compute root for this number');
        }
        this.value = root.toString();
      }
      this.calculate();
    } catch (error) {
      console.error(error.message);
    }
  }

  addSign(sign) {
    try {
      if (!this.value) {
        throw new Error('Value is empty');
      }

      this.value += sign;
    } catch (error) {
      console.error(error.message);
    }
  }

  getOppositeSign() {
    try {
      if (!this.value) {
        throw new Error('Value is empty');
      }

      if (this.operator && this.value.includes(this.operator)) {
        const parts = this.value.split(this.operator);

        if (parts.length === 2 && parts[1] !== '') {
          let operator = this.operator;
          if (operator === '+') {
            operator = '-';
          } else if (operator === '-') {
            operator = '+';
          }
          this.value = parts.join(operator);
        }
      } else {
        const operand = Number(this.value) * -1;
        if (isNaN(operand)) {
          throw new Error('Invalid number for opposite sign');
        }
        this.value = operand.toString();
      }
    } catch (error) {
      console.error(error.message);
    }
  }

  memoryAdd() {
    try {
      if (!this.value) {
        throw new Error('Value is empty');
      }

      this.calculate();

      const numberToAdd = Number(this.value);
      if (isNaN(numberToAdd)) {
        throw new Error('Invalid number to add');
      }

      this.memory += numberToAdd;
    } catch (error) {
      console.error(error.message);
    }
  }

  memoryWipe() {
    try {
      if (!this.value) {
        throw new Error('Value is empty');
      }

      this.calculate();

      const numberToWipe = Number(this.value);
      if (isNaN(numberToWipe)) {
        throw new Error('Invalid number to wipe');
      }

      this.memory -= numberToWipe;
    } catch (error) {
      console.error(error.message);
    }
  }

  memoryClear() {
    try {
      this.memory = 0;
    } catch (error) {
      console.error('Error clearing memory: ', error.message);
    }
  }

  memoryRead() {
    try {
      if (this.memory == null) {
        throw new Error('Memory is empty');
      }

      if (this.value === '0') {
        this.value = '';
      }

      this.value += this.memory.toString();
    } catch (error) {
      console.error(error.message);
    }
  }
}

class AddValueCommand extends Command {
  constructor(calculator, value) {
    super();
    this.calculator = calculator;
    this.value = value;
  }

  execute() {
    try {
      if (this.value == null) {
        throw new Error('Value is null or undefined');
      }
      this.calculator.addValue(this.value);
    } catch (error) {
      console.error('Error executing AddValueCommand:', error.message);
    }
  }
}

class ClearHistoryCommand extends Command {
  constructor(calculator) {
    super();
    this.calculator = calculator;
  }

  execute() {
    try {
      this.calculator.clearHistory();
    } catch (error) {
      console.error('Error executing ClearHistoryCommand:', error.message);
    }
  }
}

class HandleOperatorCommand extends Command {
  constructor(calculator, operator) {
    super();
    this.calculator = calculator;
    this.operator = operator;
  }

  execute() {
    try {
      if (this.operator == null) {
        throw new Error('Operator is empty');
      }
      this.calculator.handleOperator(this.operator, this.operator);
    } catch (error) {
      console.error('Error executing HandleOperatorCommand:', error.message);
    }
  }
}
class GetWipeCommand extends Command {
  constructor(calculator) {
    super();
    this.calculator = calculator;
  }

  execute() {
    try{  this.calculator.getWipe();}
    catch(error){
console.error('Error executing GetWipeCommand:', error.message);
    }
  
  }
}

class CalculateCommand extends Command {
  constructor(calculator) {
    super();
    this.calculator = calculator;
  }

  execute() {
    try {
      this.calculator.calculate();
    } catch (error) {
      console.error('Error executing CalculateCommand:', error.message);
    }
  }
}

class FindPowerSignCommand extends Command {
  constructor(calculator, data) {
    super();
    this.calculator = calculator;
    this.data = data;
  }

  execute() {
    try {
      if (this.data == null) {
        throw new Error('Data is null or undefined');
      }
      return this.calculator.findPowerSign(this.data);
    } catch (error) {
      console.error('Error executing FindPowerSignCommand:', error.message);
    }
  }
}

class GetPercentCommand extends Command {
  constructor(calculator) {
    super();
    this.calculator = calculator;
  }

  execute() {
    try {
      this.calculator.getPercent();
    } catch (error) {
      console.error('Error executing GetPercentCommand:', error.message);
    }
  }
}

class GetInverseCommand extends Command {
  constructor(calculator) {
    super();
    this.calculator = calculator;
  }

  execute() {
    try {
      this.calculator.getInverse();
    } catch (error) {
      console.error('Error executing GetInverseCommand:', error.message);
    }
  }
}

class GetFactorialCommand extends Command {
  constructor(calculator) {
    super();
    this.calculator = calculator;
  }

  execute() {
    try {
      this.calculator.getFactorial();
    } catch (error) {
      console.error('Error executing GetFactorialCommand:', error.message);
    }
  }
}

class GetCubeCommand extends Command {
  constructor(calculator) {
    super();
    this.calculator = calculator;
  }

  execute() {
    try {
      this.calculator.getCube();
    } catch (error) {
      console.error('Error executing GetCubeCommand:', error.message);
    }
  }
}

class GetRootCommand extends Command {
  constructor(calculator, n) {
    super();
    this.calculator = calculator;
    this.n = n;
  }

  execute() {
    try {
      if (this.n == null) {
        throw new Error('Root degree (n) is null or undefined');
      }
      this.calculator.getRoot(this.n);
    } catch (error) {
      console.error('Error executing GetRootCommand:', error.message);
    }
  }
}

class GetOppositeSignCommand extends Command {
  constructor(calculator) {
    super();
    this.calculator = calculator;
  }

  execute() {
    try {
      this.calculator.getOppositeSign();
    } catch (error) {
      console.error('Error executing GetOppositeSignCommand:', error.message);
    }
  }
}

class GetSquareCommand extends Command {
  constructor(calculator) {
    super();
    this.calculator = calculator;
  }

  execute() {
    try {
      this.calculator.getSquare();
    } catch (error) {
      console.error('Error executing GetSquareCommand:', error.message);
    }
  }
}

class TenPowerCommand extends Command {
  constructor(calculator) {
    super();
    this.calculator = calculator;
  }

  execute() {
    try {
      this.calculator.getTenPower();
    } catch (error) {
      console.error('Error executing TenPowerCommand:', error.message);
    }
  }
}

class AddSignCommand extends Command {
  constructor(calculator, sign) {
    super();
    this.calculator = calculator;
    this.sign = sign;
  }

  execute() {
    try {
      if (this.sign == null) {
        throw new Error('Sign is null or undefined');
      }
      this.calculator.addSign(this.sign);
    } catch (error) {
      console.error('Error executing AddSignCommand:', error.message);
    }
  }
}

class MemoryAddCommand extends Command {
  constructor(calculator) {
    super();
    this.calculator = calculator;
  }

  execute() {
    try {
      this.calculator.memoryAdd();
    } catch (error) {
      console.error('Error executing MemoryAddCommand:', error.message);
    }
  }
}

class MemoryClearCommand extends Command {
  constructor(calculator) {
    super();
    this.calculator = calculator;
  }

  execute() {
    try {
      this.calculator.memoryClear();
    } catch (error) {
      console.error('Error executing MemoryClearCommand:', error.message);
    }
  }
}

class MemoryReadCommand extends Command {
  constructor(calculator) {
    super();
    this.calculator = calculator;
  }

  execute() {
    try {
      this.calculator.memoryRead();
    } catch (error) {
      console.error('Error executing MemoryReadCommand:', error.message);
    }
  }
}

class MemoryWipeCommand extends Command {
  constructor(calculator) {
    super();
    this.calculator = calculator;
  }

  execute() {
    try {
      this.calculator.memoryWipe();
    } catch (error) {
      console.error('Error executing MemoryWipeCommand:', error.message);
    }
  }
}

function addValue(value) {
  try {
    const command = new AddValueCommand(calculator, value);
    command.execute();
    input.value = calculator.value;
  } catch (error) {
    console.error('Error adding value:', error.message);
  }
}

function handleOperator(op) {
  try {
    if (input.value === '') return;

    const command = new HandleOperatorCommand(calculator, op);
    command.execute();
    input.value = calculator.value;
  } catch (error) {
    console.error('Error handling operator:', error.message);
  }
}

function clearHistory() {
  try {
    const command = new ClearHistoryCommand(calculator);
    command.execute();
    input.value = calculator.value;
  } catch (error) {
    console.error('Error clearing history:', error.message);
  }
}

function getWipe() {
  try {
    const command = new GetWipeCommand(calculator);
    command.execute();
    input.value = calculator.value;
  } catch (error) {
    console.error('Error executing getWipe:', error.message);
  }
}

function calculate() {
  try {
    const command = new CalculateCommand(calculator);
    command.execute();
    input.value = calculator.value;
  } catch (error) {
    console.error('Error executing calculate:', error.message);
  }
}

function findPowerSign() {
  try {
    const command = new FindPowerSignCommand(calculator);
    command.execute();
    input.value = calculator.value;
  } catch (error) {
    console.error('Error executing findPowerSign:', error.message);
  }
}

function getPercent() {
  try {
    const command = new GetPercentCommand(calculator);
    command.execute();
    input.value = calculator.value;
  } catch (error) {
    console.error('Error executing getPercent:', error.message);
  }
}

function getInverse() {
  try {
    const command = new GetInverseCommand(calculator);
    command.execute();
    input.value = calculator.value;
  } catch (error) {
    console.error('Error executing getInverse:', error.message);
  }
}

function getFactorial() {
  try {
    const command = new GetFactorialCommand(calculator);
    command.execute();
    input.value = calculator.value;
  } catch (error) {
    console.error('Error executing getFactorial:', error.message);
  }
}

function getSquare() {
  try {
    const command = new GetSquareCommand(calculator);
    command.execute();
    input.value = calculator.value;
  } catch (error) {
    console.error('Error executing getSquare:', error.message);
  }
}

function getCube() {
  try {
    const command = new GetCubeCommand(calculator);
    command.execute();
    input.value = calculator.value;
  } catch (error) {
    console.error('Error executing getCube:', error.message);
  }
}

function getRoot(n) {
  try {
    const command = new GetRootCommand(calculator, n);
    command.execute();
    input.value = calculator.value;
  } catch (error) {
    console.error('Error executing getRoot:', error.message);
  }
}

function getTenPower() {
  try {
    const command = new TenPowerCommand(calculator);
    command.execute();
    input.value = calculator.value;
  } catch (error) {
    console.error('Error executing getTenPower:', error.message);
  }
}

function addSign(sign) {
  try {
    const command = new AddSignCommand(calculator, sign);
    command.execute();
    input.value = calculator.value;
  } catch (error) {
    console.error('Error executing addSign:', error.message);
  }
}

function getOppositeSign() {
  try {
    const command = new GetOppositeSignCommand(calculator);
    command.execute();
    input.value = calculator.value;
  } catch (error) {
    console.error('Error executing getOppositeSign:', error.message);
  }
}

function memoryAdd() {
  try {
    const command = new MemoryAddCommand(calculator);
    command.execute();
    input.value = calculator.value;
  } catch (error) {
    console.error('Error executing memoryAdd:', error.message);
  }
}

function memoryWipe() {
  try {
    const command = new MemoryWipeCommand(calculator);
    command.execute();
    input.value = calculator.value;
  } catch (error) {
    console.error('Error executing memoryWipe:', error.message);
  }
}

function memoryClear() {
  try {
    const command = new MemoryClearCommand(calculator);
    command.execute();
    input.value = calculator.value;
  } catch (error) {
    console.error('Error executing memoryClear:', error.message);
  }
}

function memoryRead() {
  try {
    const command = new MemoryReadCommand(calculator);
    command.execute();
    input.value = calculator.value;
  } catch (error) {
    console.error('Error executing memoryRead:', error.message);
  }
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
