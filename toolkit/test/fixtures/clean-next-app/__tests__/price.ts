import { describe, expect, it } from 'vitest';
import { priceLabel } from '../lib/price';

describe('priceLabel', () => {
  it('formats cents', () => expect(priceLabel(1500)).toBe('$15.00'));
});
