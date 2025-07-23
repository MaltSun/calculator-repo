let input = document.querySelector('input');
let currentValue = '';
let operator = '';
let result = null;

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
}

function getInverse() {
  if (!input.value) return;

  if (operator && input.value.includes(operator)) {
    const parts = input.value.split(operator);

    if (parts.length === 2 && parts[1] !== '') {
      const inverse = Math.pow(Number(parts[1]), -1);
      parts[1] = inverse.toString();
      input.value = parts.join(operator);
    //    input.value = Number(parts[0])+ inverse;
    }
  } else {
    const inverse = Math.pow(Number(input.value), -1);
    input.value = inverse.toString();
  }
}
function getFactorial() {
  if (!input.value) return;

  if (operator && input.value.includes(operator)) {
    const parts = input.value.split(operator);

    if (parts.length === 2 && parts[1] !== '') {
      const factorialValue = factorial(parts[1]);
      input.value = parts[0]+factorialValue;
      parts[1] = factorialValue.toString();
      input.value = parts.join(operator);
    //    input.value = Number(parts[0]) + factorialValue;
    }
  } else {
    const factorialValue= factorial(input.value);
    input.value = factorialValue.toString();
  }
}
function factorial(n) {
  return n ? n * factorial(n - 1) : 1;
}

//значения
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

//работа с историей
document.getElementById('ac').addEventListener('click', () => clearHistory());

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
