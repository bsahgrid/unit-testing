interface IQuantityValidator {
  validate(quantity: number): { isValid: boolean; error: string | null };
}

export class QuantityValidator implements IQuantityValidator {
  private readonly threshold: number;
  private readonly packageSize: number;

  constructor(threshold: number, packageSize: number) {
    if (threshold < 0) {
      throw new Error('threshold cannot be negative');
    }
    if (packageSize <= 0) {
      throw new Error('packageSize should be greater than zero');
    }

    this.threshold = threshold;
    this.packageSize = packageSize;
  }

  public validate(quantity: number): { isValid: boolean; error: string | null } {
    if (quantity <= 0) {
      return { isValid: false, error: 'Quantity must be greater than zero' };
    }

    if (quantity < this.threshold) {
      return { isValid: true, error: null };
    }

    const isDivisible = quantity % this.packageSize === 0;
    if (isDivisible) {
      return { isValid: true, error: null };
    }

    return {
      isValid: false,
      error: `Quantity should be divisible by ${this.packageSize}`,
    };
  }
}