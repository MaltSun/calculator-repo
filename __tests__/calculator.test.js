import { Calculator } from '../src/calculator.js';

describe('test find sign', () => {
  let calculator;
  calculator = new Calculator();
  test('calculates square root (default degree)', () => {
    expect(calculator.findPowerSign('√9')).toBe(3);
  });

  test('calculates custom root ', () => {
    expect(calculator.findPowerSign('3√27')).toBe(3);
  });

  test('calculates exponentiation', () => {
    expect(calculator.findPowerSign('2^3')).toBe(8);
  });

  test('returns number when no power or root present', () => {
    expect(calculator.findPowerSign('42')).toBe(42);
  });

  test('returns undefined for completely invalid input', () => {
    expect(calculator.findPowerSign('abc')).toBeUndefined();
  });
});
describe('test add value', () => {
  test('add value 5 should return 5', () => {
    const calculator = new Calculator();

    calculator.addValue('5');

    expect(calculator.value).toBe('5');
  });

  test('add value  should return 5', () => {
    const calculator = new Calculator();

    calculator.addValue('5');

    expect(calculator.value).toBe('5');
  });

  test('add value 5 to 0+ should return 0+5', () => {
    const calculator = new Calculator();
    calculator.value = '0+';

    calculator.addValue('5');

    expect(calculator.value).toBe('0+5');
  });
});

describe('test get factorial', () => {
  test('get factorial of 3 should return 6', () => {
    const calculator = new Calculator();
    calculator.value = '3';

    calculator.getFactorial('');

    expect(calculator.value).toBe('6');
  });

  test('get factorial of 1 + 3 should return 6', () => {
    const calculator = new Calculator();
    calculator.operator = '+';
    calculator.value = '1+3';

    calculator.getFactorial();

    expect(calculator.value).toBe('7');
  });
});

describe('test input operator', () => {
  test('input operator + should return 5+', () => {
    const calculator = new Calculator();
    calculator.value = '5';

    calculator.handleOperator('+');

    expect(calculator.value).toBe('5+');
  });

  test('input operator + should return 0+', () => {
    const calculator = new Calculator();

    calculator.handleOperator('+');

    expect(calculator.value).toBe('0+');
  });

  test('add operator + to 0+ should return 0+', () => {
    const calculator = new Calculator();
    calculator.value = '0+';
    calculator.handleOperator('+');

    expect(calculator.value).toBe('0+');
  });
});
describe('test raise to cube', () => {
  test('raise 2 to cube power shoud return 8', () => {
    const calculator = new Calculator();
    calculator.value = '2';

    calculator.getCube();

    expect(calculator.value).toBe('8');
  });

  test('raise 2+2 to cube power shoud return 10', () => {
    const calculator = new Calculator();
    calculator.operator = '+';
    calculator.value = '2+2';

    calculator.getCube();

    expect(calculator.value).toBe('10');
  });

  test('raise 2+ to cube power shoud return 2+', () => {
    const calculator = new Calculator();
    calculator.value = '2+';

    calculator.getCube();

    expect(calculator.value).toBe('2+');
  });

  test('raise "" to cube power should log error', () => {
    const calculator = new Calculator();
    calculator.value = '';

    const consoleSpy = jest
      .spyOn(console, 'error')
      .mockImplementation(() => {});

    calculator.getCube();

    expect(consoleSpy).toHaveBeenCalledWith('Value is empty');

    consoleSpy.mockRestore();
  });
});
describe('test raise to square', () => {
  test('raise 2 to square power shoud return 4', () => {
    const calculator = new Calculator();
    calculator.value = '2';

    calculator.getSquare();

    expect(calculator.value).toBe('4');
  });

  test('raise 2+2 to cube power shoud return 8', () => {
    const calculator = new Calculator();
    calculator.operator = '+';
    calculator.value = '2+2';

    calculator.getSquare();

    expect(calculator.value).toBe('6');
  });

  test('raise 2+ to square power shoud return 2+', () => {
    const calculator = new Calculator();
    calculator.operator = '+';
    calculator.value = '2+';

    calculator.getSquare();

    expect(calculator.value).toBe('2+');
  });

  test('raise "" to square power should log error', () => {
    const calculator = new Calculator();
    calculator.value = '';

    const consoleSpy = jest
      .spyOn(console, 'error')
      .mockImplementation(() => {});

    calculator.getSquare();

    expect(consoleSpy).toHaveBeenCalledWith('Value is empty');

    consoleSpy.mockRestore();
  });
});
describe('test raise ten in n power', () => {
  test('raise ten to 2 power shoud return 100', () => {
    const calculator = new Calculator();
    calculator.value = '2';

    calculator.getTenPower();

    expect(calculator.value).toBe('100');
  });

  test('raise ten to 2+2 power shoud return 102', () => {
    const calculator = new Calculator();
    calculator.operator = '+';
    calculator.value = '2+2';

    calculator.getTenPower();

    expect(calculator.value).toBe('102');
  });

  test('raise 2+ to cube power shoud return 2+', () => {
    const calculator = new Calculator();
    calculator.operator = '+';
    calculator.value = '2+';

    calculator.getTenPower();

    expect(calculator.value).toBe('2+');
  });

  test('raise "" to ten power should log error', () => {
    const calculator = new Calculator();
    calculator.value = '';

    const consoleSpy = jest
      .spyOn(console, 'error')
      .mockImplementation(() => {});

    calculator.getTenPower();

    expect(consoleSpy).toHaveBeenCalledWith('Value is empty');

    consoleSpy.mockRestore();
  });
});
describe('test get opposite sign', () => {
  test('get opossit sign of 2 should return -2', () => {
    const calculator = new Calculator();
    calculator.value = '2';

    calculator.getOppositeSign();

    expect(calculator.value).toBe('-2');
  });

  test('get opossit sign of 0-2 should return 0+2', () => {
    const calculator = new Calculator();

    calculator.operator = '-';
    calculator.value = '0-2';

    calculator.getOppositeSign();

    expect(calculator.value).toBe('0+2');
  });

  test('get opossit sign of 0+2 should return 0-2', () => {
    const calculator = new Calculator();

    calculator.operator = '+';
    calculator.value = '0+2';

    calculator.getOppositeSign();

    expect(calculator.value).toBe('0-2');
  });

  test('get opposite sign of "" should log error', () => {
    const calculator = new Calculator();

    calculator.value = '';

    const consoleSpy = jest
      .spyOn(console, 'error')
      .mockImplementation(() => {});

    calculator.getOppositeSign();

    expect(consoleSpy).toHaveBeenCalledWith('Value is empty');

    consoleSpy.mockRestore();
  });
});
describe('test operation with memory', () => {
  test('add 5 to memory should return 5', () => {
    const calculator = new Calculator();

    calculator.value = '5';

    calculator.memoryAdd();

    expect(calculator.memory).toBe(5);
  });

  test('add 5+5 to memory should return 5', () => {
    const calculator = new Calculator();

    calculator.operator = '+';
    calculator.value = '5+5';

    calculator.memoryAdd();

    expect(calculator.memory).toBe(10);
  });

  test('add 5 to memory, when memory already have 5, should return 10', () => {
    const calculator = new Calculator();

    calculator.memory = 5;
    calculator.value = '5';

    calculator.memoryAdd();

    expect(calculator.memory).toBe(10);
  });

  test('add "" to memory should log error', () => {
    const calculator = new Calculator();

    calculator.value = '';

    const consoleSpy = jest
      .spyOn(console, 'error')
      .mockImplementation(() => {});

    calculator.memoryAdd();

    expect(consoleSpy).toHaveBeenCalledWith('Value is empty');

    consoleSpy.mockRestore();
  });

  test('add h to memory should log error', () => {
    const calculator = new Calculator();

    calculator.value = 'h';

    const consoleSpy = jest
      .spyOn(console, 'error')
      .mockImplementation(() => {});

    calculator.memoryAdd();

    expect(consoleSpy).toHaveBeenCalledWith('Invalid number to add');

    consoleSpy.mockRestore();
  });

  test('wipe 5 from memory, when memory already have 5, should return 0', () => {
    const calculator = new Calculator();

    calculator.memory = 5;
    calculator.value = '5';

    calculator.memoryWipe();

    expect(calculator.memory).toBe(0);
  });

  test('wipe 5 from memory, when memory have 0, should return -5', () => {
    const calculator = new Calculator();

    calculator.value = '5';

    calculator.memoryWipe();

    expect(calculator.memory).toBe(-5);
  });

  test('wipe -5 from memory, when memory already have -5, should return 0', () => {
    const calculator = new Calculator();
    calculator.memory = -5;
    calculator.value = '-5';

    calculator.memoryWipe();

    expect(calculator.memory).toBe(0);
  });

  test('delete "" from memory should log error', () => {
    const calculator = new Calculator();

    calculator.value = '';

    const consoleSpy = jest
      .spyOn(console, 'error')
      .mockImplementation(() => {});

    calculator.memoryWipe();

    expect(consoleSpy).toHaveBeenCalledWith('Value is empty');

    consoleSpy.mockRestore();
  });

  test('delete h from memory should log error', () => {
    const calculator = new Calculator();

    calculator.value = 'h';

    const consoleSpy = jest
      .spyOn(console, 'error')
      .mockImplementation(() => {});

    calculator.memoryWipe();

    expect(consoleSpy).toHaveBeenCalledWith('Invalid number to wipe');

    consoleSpy.mockRestore();
  });

  test('clear memory, when memory already have 5, should return 0', () => {
    const calculator = new Calculator();
    calculator.memory = 5;

    calculator.memoryClear();

    expect(calculator.memory).toBe(0);
  });

  test('read memory, when memory clear, should return 0', () => {
    const calculator = new Calculator();
    calculator.value = '0';

    calculator.memoryRead();

    expect(calculator.value).toBe('0');
  });

  test('read memory, when memory already have 5, and value have 5 should return 55', () => {
    const calculator = new Calculator();
    calculator.value = '5';
    calculator.memory = 5;

    calculator.memoryRead();

    expect(calculator.value).toBe('55');
  });

  test('read memory, when memory already have 5, and value have 0 should return 55', () => {
    const calculator = new Calculator();

    calculator.memory = 5;

    calculator.memoryRead();

    expect(calculator.value).toBe('5');
  });

  test('read null from memory should log error', () => {
    const calculator = new Calculator();

    calculator.memory = null;

    const consoleSpy = jest
      .spyOn(console, 'error')
      .mockImplementation(() => {});

    calculator.memoryRead();

    expect(consoleSpy).toHaveBeenCalledWith('Memory is empty');

    consoleSpy.mockRestore();
  });
});

describe('test clear history', () => {
  test('clear history should clear value', () => {
    const calculator = new Calculator();

    calculator.operator = '-';

    calculator.clearHistory();

    expect(calculator.operator).toBe('');
  });

  test('clear history should not clear memory', () => {
    const calculator = new Calculator();

    calculator.memory = 5;

    calculator.clearHistory();

    expect(calculator.memory).toBe(5);
  });

  test('clear history should clear  result, value, operator, currenValue ', () => {
    const calculator = new Calculator();

    calculator.result = '8';

    calculator.clearHistory();

    expect(calculator.result).toBe(null);
  });

  test('clear history should clear value', () => {
    const calculator = new Calculator();

    calculator.value = '70';

    calculator.clearHistory();

    expect(calculator.value).toBe('0');
  });

  test('clear history should clear currenValue ', () => {
    const calculator = new Calculator();

    calculator.currentValue = '8';

    calculator.clearHistory();

    expect(calculator.currentValue).toBe('');
  });
});
describe('test wipe sign', () => {
  test('wipe last sign in 2+3 should return 2+ ', () => {
    const calculator = new Calculator();

    calculator.value = '2+3';

    calculator.getWipe();

    expect(calculator.value).toBe('2+');
  });

  test('wipe last sign in 2+ should return 2 ', () => {
    const calculator = new Calculator();

    calculator.value = '2+';

    calculator.getWipe();

    expect(calculator.value).toBe('2');
  });

  test('wipe last sign in 2 should return 0 ', () => {
    const calculator = new Calculator();

    calculator.value = '2';

    calculator.getWipe();

    expect(calculator.value).toBe('0');
  });
});
describe('test input operator', () => {
  test('input sign should return +', () => {
    const calculator = new Calculator();

    calculator.value = '2';

    calculator.handleOperator('+');

    expect(calculator.value).toBe('2+');
  });

  test('input sign should return +', () => {
    const calculator = new Calculator();

    calculator.value = '2+';

    calculator.handleOperator('+');

    expect(calculator.value).toBe('2+');
  });
});
describe('test get inverse', () => {
  test('get inverse 1/2 should return 0.5', () => {
    const calculator = new Calculator();

    calculator.value = '2';

    calculator.getInverse();

    expect(calculator.value).toBe('0.5');
  });

  test('get inverse 1/2 should return 0.5', () => {
    const calculator = new Calculator();

    calculator.operator = '+';
    calculator.value = '2+5';

    calculator.getInverse();

    expect(calculator.value).toBe('2.2');
  });

  test('get inver from " should log error', () => {
    const calculator = new Calculator();

    calculator.value = '';

    const consoleSpy = jest
      .spyOn(console, 'error')
      .mockImplementation(() => {});

    calculator.getInverse();

    expect(consoleSpy).toHaveBeenCalledWith('Value is empty');

    consoleSpy.mockRestore();
  });

  test('value is finiteshould log error', () => {
    const calculator = new Calculator();

    calculator.value = 'Finite';

    const consoleSpy = jest
      .spyOn(console, 'error')
      .mockImplementation(() => {});

    calculator.getInverse();

    expect(consoleSpy).toHaveBeenCalledWith('Cannot compute inverse');

    consoleSpy.mockRestore();
  });
});
describe('test get custom root', () => {
  test('get root from "" should log error', () => {
    const calculator = new Calculator();

    calculator.value = '';

    const consoleSpy = jest
      .spyOn(console, 'error')
      .mockImplementation(() => {});

    calculator.getRoot(2);

    expect(consoleSpy).toHaveBeenCalledWith('Value is empty');

    consoleSpy.mockRestore();
  });

  test('get root from 3+h should log error', () => {
    const calculator = new Calculator();

    calculator.value = '3+h';
    calculator.operator = '+';

    const consoleSpy = jest
      .spyOn(console, 'error')
      .mockImplementation(() => {});

    calculator.getRoot(2);

    expect(consoleSpy).toHaveBeenCalledWith('Invalid number for root');

    consoleSpy.mockRestore();
  });

  test('get root from h should log error', () => {
    const calculator = new Calculator();

    calculator.value = 'h';

    const consoleSpy = jest
      .spyOn(console, 'error')
      .mockImplementation(() => {});

    calculator.getRoot(2);

    expect(consoleSpy).toHaveBeenCalledWith('Invalid number for root');

    consoleSpy.mockRestore();
  });

  test('get root from 9 should return 3', () => {
    const calculator = new Calculator();

    calculator.value = '9';

    calculator.getRoot(2);

    expect(calculator.value).toBe('3');
  });

  test('get root from 4 should return 3', () => {
    const calculator = new Calculator();

    calculator.value = '4';

    calculator.getRoot(0.5);

    expect(calculator.value).toBe('16');
  });
});
describe('test add power or sqrt sign', () => {
  test('add sign to "" should log error', () => {
    const calculator = new Calculator();

    calculator.value = '';

    const consoleSpy = jest
      .spyOn(console, 'error')
      .mockImplementation(() => {});

    calculator.addSign('^');

    expect(consoleSpy).toHaveBeenCalledWith('Value is empty');

    consoleSpy.mockRestore();
  });

  test('value already have ^ should log error', () => {
    const calculator = new Calculator();

    calculator.value = '2^';

    const consoleSpy = jest
      .spyOn(console, 'error')
      .mockImplementation(() => {});

    calculator.addSign('^');

    expect(consoleSpy).toHaveBeenCalledWith('Sign \"^\" already used');

    consoleSpy.mockRestore();
  });

  test('add ^ afetr + should log error', () => {
    const calculator = new Calculator();

    calculator.value = '2+';

    const consoleSpy = jest
      .spyOn(console, 'error')
      .mockImplementation(() => {});

    calculator.addSign('^');

    expect(consoleSpy).toHaveBeenCalledWith('Cannot add \"^\" after operator');

    consoleSpy.mockRestore();
  });

  test('add ^ to 2 should return 2^', () => {
    const calculator = new Calculator();

    calculator.value = '2';

    calculator.addSign('^');

    expect(calculator.value).toBe('2^');
  });

  test('add ^ to 2 should return 2^', () => {
    const calculator = new Calculator();

    calculator.value = '2';

    calculator.addSign('^');

    expect(calculator.value).toBe('2^');
  });
});

describe('calculator take percent', () => {
  test('taking percent of "" should log error', () => {
    const calculator = new Calculator();
    calculator.value = '';

    const consoleSpy = jest
      .spyOn(console, 'error')
      .mockImplementation(() => {});

    calculator.getPercent();

    expect(consoleSpy).toHaveBeenCalledWith('Value is empty');

    consoleSpy.mockRestore();
  });

  test('taking percent of 5 + 100 should return 6', () => {
    const calculator = new Calculator();
    calculator.operator = '+';
    calculator.value = '5+100';

    calculator.getPercent();

    expect(calculator.value).toBe('6');
  });
});

describe('test calculate method', () => {
  test('empty operator should return log error', () => {
    const calculator = new Calculator();
    calculator.operator = '';

    const consoleSpy = jest
      .spyOn(console, 'error')
      .mockImplementation(() => {});

    calculator.calculate();

    expect(consoleSpy).toHaveBeenCalledWith('Operator is empty');

    consoleSpy.mockRestore();
  });

  test('calculate 5+5 should return 10', () => {
    const calculator = new Calculator();
    calculator.value = '5+5';
    calculator.operator = '+';

    calculator.calculate();

    expect(calculator.value).toBe('10');
  });

  test('calculate 5/5 should return 1', () => {
    const calculator = new Calculator();
    calculator.value = '5/5';
    calculator.operator = '/';

    calculator.calculate();

    expect(calculator.value).toBe('1');
  });
   test('calculate 5/5 should return error', () => {
    const calculator = new Calculator();
    calculator.value = '5/0';
    calculator.operator = '/';

    calculator.calculate();

    expect(calculator.value).toBe('Error');
  });
  test('calculate with non-existent operator & should return Error', () => {
    const calculator = new Calculator();
    calculator.value = '5&5';
    calculator.operator = '&';

    calculator.calculate();

    expect(calculator.value).toBe('Error');
  });
   test('calculate 5^2+2^2 should return 29', () => {
    const calculator = new Calculator();
    calculator.value = '5^2+2^2';
    calculator.operator = '+';

    calculator.calculate();

    expect(calculator.value).toBe('29');
  });
});
