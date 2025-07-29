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
            throw new Error('Invalid number for percent');
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
            throw new Error('Invalid number');
          }
          const cube = Math.pow(10, number);
          if (!isFinite(cube)) {
            throw new Error('Finity number');
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
