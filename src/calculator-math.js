let input = document.querySelector('input');
let currentValue = '';
let operator = '';
let result = null;
let memory = 0;

function addValue(value) {
  // добавить валидацию на корректность ввода
  if (input.value === '0') input.value = '';

  input.value += value;
}

function handleOperator(op) {
  if (input.value === '') return;

  if (operator && /[+\-*/]/.test(input.value)) {
    calculate();
  }

  if (!/[+\-*/]$/.test(input.value)) {
    input.value += op;
    operator = op;
  } else {
    input.value = input.value.slice(0, -1) + op;
    operator = op;
  }
}

function clearHistory() {
  let currentValue = '';
  let operator = '';
  let result = null;
  input.value = '0';
}

function getWipe() {
  if (input.value === '') return;

  let data = input.value.split('');
  data.pop();

  if (data.length === 0) {
    input.value = '0';
  } else {
    input.value = data.join('');
  }
}

function calculate() {
  if (!operator) return;

  const parts = input.value.split(operator);

  if (parts.length !== 2 || parts[1] === '') return;

  const left = Number(parts[0]);
  const right = Number(parts[1]);

  switch (operator) {
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

  input.value = result.toString();
  operator = '';
}

function getPercent() {
  if (!input.value) return;

  if (operator && input.value.includes(operator)) {
    const parts = input.value.split(operator);

    if (parts.length === 2 && parts[1] !== '') {
      const percent = Number(parts[1]) / 100;
      parts[1] = percent.toString();
      input.value = parts.join(operator);
    }
  } else {
    const percent = Number(input.value) / 100;
    input.value = percent.toString();
  }
  calculate();
}

function getInverse() {
  if (!input.value) return;

  if (operator && input.value.includes(operator)) {
    const parts = input.value.split(operator);

    if (parts.length === 2 && parts[1] !== '') {
      const inverse = Math.pow(Number(parts[1]), -1);
      parts[1] = inverse.toString();
      input.value = parts.join(operator);
    }
  } else {
    const inverse = Math.pow(Number(input.value), -1);
    input.value = inverse.toString();
  }
  calculate();
}
function getFactorial() {
  if (!input.value) return;

  if (operator && input.value.includes(operator)) {
    const parts = input.value.split(operator);

    if (parts.length === 2 && parts[1] !== '') {
      const factorialValue = factorial(parts[1]);
      input.value = parts[0] + factorialValue;
      parts[1] = factorialValue.toString();
      input.value = parts.join(operator);
    }
  } else {
    const factorialValue = factorial(input.value);
    input.value = factorialValue.toString();
  }
  calculate();
}
function factorial(n) {
  return n ? n * factorial(n - 1) : 1;
}

function getSquare() {
  if (!input.value) return;

  if (operator && input.value.includes(operator)) {
    const parts = input.value.split(operator);

    if (parts.length === 2 && parts[1] !== '') {
      const square = Math.pow(Number(parts[1]), 2);
      parts[1] = square.toString();
      input.value = parts.join(operator);
    }
  } else {
    const square = Math.pow(Number(input.value), 2);
    input.value = square.toString();
  }
  calculate();
}

function getCube() {
  if (!input.value) return;

  if (operator && input.value.includes(operator)) {
    const parts = input.value.split(operator);

    if (parts.length === 2 && parts[1] !== '') {
      const cube = Math.pow(Number(parts[1]), 3);
      parts[1] = cube.toString();
      input.value = parts.join(operator);
    }
  } else {
    const cube = Math.pow(Number(input.value), 3);
    input.value = cube.toString();
  }
  calculate();
}
function getTenPower() {
  if (!input.value) return;

  if (operator && input.value.includes(operator)) {
    const parts = input.value.split(operator);

    if (parts.length === 2 && parts[1] !== '') {
      const cube = Math.pow(10, Number(parts[1]));
      parts[1] = cube.toString();
      input.value = parts.join(operator);
    }
  } else {
    const cube = Math.pow(10, Number(input.value));
    input.value = cube.toString();
  }
  calculate();
}

// function getYPower() {
//   if (!input.value) return;

//   if (operator && input.value.includes(operator)) {
//     const parts = input.value.split(operator);

//     if (parts.length === 2 && parts[1] !== '') {
//       const cube = Math.pow(Number(parts[1]), 3);
//       parts[1] = cube.toString();
//       input.value = parts.join(operator);
//     }
//   } else {
//     const cube = Math.pow(Number(input.value), 3);
//     input.value = cube.toString();
//   }
// }

function getRoot(y) {
  if (!input.value) return;

  if (operator && input.value.includes(operator)) {
    const parts = input.value.split(operator);

    if (parts.length === 2 && parts[1] !== '') {
      const res = Math.pow(Number(parts[1]), 1 / y);
      parts[1] = res.toString();
      input.value = parts.join(operator);
    }
  } else {
    const res = Math.pow(Number(input.value), 1 / y);
    input.value = res.toString();
  }
  calculate();
}

// function getYRoot(y) {
//   if (!input.value) return;

//   if (operator && input.value.includes(operator)) {
//     const parts = input.value.split(operator);

//     if (parts.length === 2 && parts[1] !== '') {
//       const res = Math.pow(Number(parts[1]), 1 / y);
//       parts[1] = res.toString();
//       input.value = parts.join(operator);
//     }
//   } else {
//     const res = Math.pow(Number(input.value), 1 / y);
//     input.value = res.toString();
//   }
//   calculate();
// }

//значения

//не ноу как ещё сделать, нет мыслИ
function getOppositeSign() {}

function memoryAdd() {
  if (!input.value) return;

  calculate();

  memory += Number(input.value);
}

function memoryWipe() {
  if (!input.value) return;

  calculate();

  memory -= Number(input.value);
}

function memoryClear() {
  memory = 0;
}

function memoryRead() {
  if (memory == null) return;

  if (input.value === '0') {
    input.value = '';
  }

  input.value += memory.toString();
}

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
// document.getElementById('cube').addEventListener('click', () => getYPower());

//корни
document.getElementById('cubeRoot').addEventListener('click', () => getRoot(3));
document
  .getElementById('squareRoot')
  .addEventListener('click', () => getRoot(2));
// document.getElementById('yRoot').addEventListener('click', () => getRoot(y));

//работа с историей
document.getElementById('ac').addEventListener('click', () => clearHistory());
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
