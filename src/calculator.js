export class Calculator {
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

  applyUnaryOperation(operation, errorMessage = 'Invalid number') {
    if (!this.value) throw new Error('Value is empty');

    const apply = (num) => {
      const result = operation(num);
      if (isNaN(result) || !isFinite(result)) throw new Error(errorMessage);
      return result;
    };

    if (this.operator && this.value.includes(this.operator)) {
      const parts = this.value.split(this.operator);
      if (parts.length === 2 && parts[1] !== '') {
        const number = Number(parts[1]);
        parts[1] = apply(number).toString();
        this.value = parts.join(this.operator);
      } else {
        throw new Error('Invalid expression');
      }
    } else {
      const number = Number(this.value);
      this.value = apply(number).toString();
    }

    this.calculate();
  }

  getPercent() {
    try {
      this.applyUnaryOperation((n) => n / 100, 'Invalid number for percent');
    } catch (e) {
      console.error(e.message);
    }
  }

  getInverse() {
    try {
      this.applyUnaryOperation(
        (n) => Math.pow(n, -1),
        'Cannot compute inverse',
      );
    } catch (e) {
      console.error(e.message);
    }
  }

  getFactorial() {
    try {
      this.applyUnaryOperation((n) => {
        if (!Number.isInteger(n) || n < 0)
          throw new Error('Factorial requires non-negative integer');
        return this.factorial(n);
      }, 'Invalid number for factorial');
    } catch (e) {
      console.error(e.message);
    }
  }

  factorial(n) {
    return n ? n * this.factorial(n - 1) : 1;
  }

  getSquare() {
    try {
      this.applyUnaryOperation((n) => Math.pow(n, 2));
    } catch (e) {
      console.error(e.message);
    }
  }

  getCube() {
    try {
      this.applyUnaryOperation((n) => Math.pow(n, 3));
    } catch (e) {
      console.error(e.message);
    }
  }

  getTenPower() {
    try {
      this.applyUnaryOperation((n) => Math.pow(10, n), 'Invalid number');
    } catch (e) {
      console.error(e.message);
    }
  }

  getRoot(n) {
    try {
      this.applyUnaryOperation(
        (x) => Math.pow(x, 1 / n),
        'Cannot compute root for this number',
      );
    } catch (e) {
      console.error(e.message);
    }
  }

  addSign(sign) {
    try {
      if (!this.value) {
        throw new Error('Value is empty');
      }

      if (this.value.includes(sign)) {
        throw new Error(`Sign "${sign}" already used`);
      }

      if (/[+\-*/]$/.test(this.value)) {
        throw new Error(`Cannot add "${sign}" after operator`);
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
            this.operator = '-';
          } else if (operator === '-') {
            operator = '+';
            this.operator = '+';
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
