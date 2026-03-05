import { QuantityValidator } from 'tasks/task2';

describe('QuantityValidator', () => {
  it('throws if threshold is negative', () => {
    expect(() => new QuantityValidator(-1, 5)).toThrow();
  });

  it('throws if packageSize is zero or less', () => {
    expect(() => new QuantityValidator(10, 0)).toThrow();
    expect(() => new QuantityValidator(10, -1)).toThrow();
  });

  it('returns invalid with a specific error when quantity is zero or negative', () => {
    const validator = new QuantityValidator(10, 5);

    expect(validator.validate(0)).toEqual({
      isValid: false,
      error: 'Quantity must be greater than zero',
    });
    expect(validator.validate(-1)).toEqual({
      isValid: false,
      error: 'Quantity must be greater than zero',
    });
  });

  it('returns valid when quantity is positive and below threshold', () => {
    const validator = new QuantityValidator(10, 5);

    expect(validator.validate(1)).toEqual({ isValid: true, error: null });
    expect(validator.validate(9)).toEqual({ isValid: true, error: null });
  });

  it('returns valid when quantity meets/exceeds threshold and is divisible by packageSize', () => {
    const validator = new QuantityValidator(10, 5);

    expect(validator.validate(10)).toEqual({ isValid: true, error: null });
    expect(validator.validate(15)).toEqual({ isValid: true, error: null });
  });

  it('returns invalid when quantity meets/exceeds threshold and is not divisible by packageSize', () => {
    const validator = new QuantityValidator(10, 5);

    expect(validator.validate(11)).toEqual({
      isValid: false,
      error: 'Quantity should be divisible by 5',
    });
  });
});
