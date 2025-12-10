import { calculateLpDirection, getRegimeNumber } from '../regime.types';

describe('regime.types utilities', () => {
  describe('calculateLpDirection', () => {
    it('should return "building" when LP increases', () => {
      const before = { spot: 50, lp: 20, stable: 30 };
      const after = { spot: 40, lp: 30, stable: 30 };
      expect(calculateLpDirection(before, after)).toBe('building');
    });

    it('should return "unwinding" when LP decreases', () => {
      const before = { spot: 40, lp: 30, stable: 30 };
      const after = { spot: 50, lp: 20, stable: 30 };
      expect(calculateLpDirection(before, after)).toBe('unwinding');
    });

    it('should return undefined when LP unchanged', () => {
      const before = { spot: 50, lp: 20, stable: 30 };
      const after = { spot: 45, lp: 20, stable: 35 };
      expect(calculateLpDirection(before, after)).toBeUndefined();
    });

    it('should return "building" when LP increases from 0', () => {
      const before = { spot: 70, lp: 0, stable: 30 };
      const after = { spot: 60, lp: 10, stable: 30 };
      expect(calculateLpDirection(before, after)).toBe('building');
    });

    it('should return "unwinding" when LP decreases to 0', () => {
      const before = { spot: 60, lp: 10, stable: 30 };
      const after = { spot: 70, lp: 0, stable: 30 };
      expect(calculateLpDirection(before, after)).toBe('unwinding');
    });
  });

  describe('getRegimeNumber', () => {
    it('should return correct numbers for all regime IDs', () => {
      expect(getRegimeNumber('ef')).toBe('01');
      expect(getRegimeNumber('f')).toBe('02');
      expect(getRegimeNumber('n')).toBe('03');
      expect(getRegimeNumber('g')).toBe('04');
      expect(getRegimeNumber('eg')).toBe('05');
    });

    it('should return "00" for unknown regime ID', () => {
      expect(getRegimeNumber('unknown')).toBe('00');
      expect(getRegimeNumber('')).toBe('00');
      expect(getRegimeNumber('xyz')).toBe('00');
    });
  });
});
