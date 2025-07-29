const Calculator = require('../src/calculator.js');

describe('calculator test', () => {
  test('taking percent of 100 should return 1', () => {
    const calculator = new Calculator();
    calculator.value = '100';

    calculator.getPercent();

    expect(calculator.value).toBe('1');
  });
});
