import {
  getRegimeIndex,
  getRegimeById,
  getActiveStrategy,
  getDirectionLabel,
} from '../regimeUtils';
import { regimes, type RegimeId } from '../regimeData';

describe('regimeUtils', () => {
  describe('getRegimeIndex', () => {
    it('should return correct index for all regime IDs', () => {
      expect(getRegimeIndex('ef')).toBe(0);
      expect(getRegimeIndex('f')).toBe(1);
      expect(getRegimeIndex('n')).toBe(2);
      expect(getRegimeIndex('g')).toBe(3);
      expect(getRegimeIndex('eg')).toBe(4);
    });

    it('should return -1 for invalid regime ID', () => {
      expect(getRegimeIndex('invalid' as RegimeId)).toBe(-1);
    });
  });

  describe('getRegimeById', () => {
    it('should return correct regime for valid ID', () => {
      const regime = getRegimeById('n');
      expect(regime.id).toBe('n');
      expect(regime.label).toBe('Neutral');
    });

    it('should return fallback regime[0] for invalid ID', () => {
      const regime = getRegimeById('invalid' as RegimeId);
      expect(regime).toBe(regimes[0]);
      expect(regime.id).toBe('ef');
    });

    it('should return correct regime for all valid IDs', () => {
      const ef = getRegimeById('ef');
      const f = getRegimeById('f');
      const n = getRegimeById('n');
      const g = getRegimeById('g');
      const eg = getRegimeById('eg');

      expect(ef.label).toBe('Extreme Fear');
      expect(f.label).toBe('Fear');
      expect(n.label).toBe('Neutral');
      expect(g.label).toBe('Greed');
      expect(eg.label).toBe('Extreme Greed');
    });
  });

  describe('getActiveStrategy', () => {
    describe('Extreme regimes (ef, n, eg)', () => {
      it('should always return default strategy for ef', () => {
        const strategy = getActiveStrategy('ef', 'forward');
        expect(strategy.title).toBe('Maximum Accumulation');

        const strategyBackward = getActiveStrategy('ef', 'backward', 'f');
        expect(strategyBackward.title).toBe('Maximum Accumulation');
      });

      it('should always return default strategy for n', () => {
        const strategy = getActiveStrategy('n', 'forward');
        expect(strategy.title).toBe('Holiday Mode');

        const strategyWithPrevious = getActiveStrategy('n', 'backward', 'g');
        expect(strategyWithPrevious.title).toBe('Holiday Mode');
      });

      it('should always return default strategy for eg', () => {
        const strategy = getActiveStrategy('eg', 'backward');
        expect(strategy.title).toBe('Maximum Profit-Taking');

        const strategyWithPrevious = getActiveStrategy('eg', 'forward', 'g');
        expect(strategyWithPrevious.title).toBe('Maximum Profit-Taking');
      });
    });

    describe('Fear regime with previousRegimeId', () => {
      it('should return fromLeft strategy when coming from lower index (ef)', () => {
        const strategy = getActiveStrategy('f', 'forward', 'ef');
        expect(strategy.title).toBe('Monitor Market Recovery');
      });

      it('should return fromRight strategy when coming from higher index (n)', () => {
        const strategy = getActiveStrategy('f', 'backward', 'n');
        expect(strategy.title).toBe('Unwind LP for Spot');
      });

      it('should fallback to direction-based strategy when same index (edge case)', () => {
        const strategy = getActiveStrategy('f', 'forward', 'f');
        // When prev === curr, it falls back to animationDirection logic
        expect(strategy.title).toBe('Monitor Market Recovery');
      });
    });

    describe('Greed regime with previousRegimeId', () => {
      it('should return fromLeft strategy when coming from lower index (n)', () => {
        const strategy = getActiveStrategy('g', 'forward', 'n');
        expect(strategy.title).toBe('Lock Gains into LP');
      });

      it('should return fromRight strategy when coming from higher index (eg)', () => {
        const strategy = getActiveStrategy('g', 'backward', 'eg');
        expect(strategy.title).toBe('Take a Rest');
      });
    });

    describe('Fallback to animationDirection when no previousRegimeId', () => {
      it('should return fromLeft strategy when direction is forward for Fear', () => {
        const strategy = getActiveStrategy('f', 'forward');
        expect(strategy.title).toBe('Monitor Market Recovery');
      });

      it('should return fromRight strategy when direction is backward for Fear', () => {
        const strategy = getActiveStrategy('f', 'backward');
        expect(strategy.title).toBe('Unwind LP for Spot');
      });

      it('should return fromLeft strategy when direction is forward for Greed', () => {
        const strategy = getActiveStrategy('g', 'forward');
        expect(strategy.title).toBe('Lock Gains into LP');
      });

      it('should return fromRight strategy when direction is backward for Greed', () => {
        const strategy = getActiveStrategy('g', 'backward');
        expect(strategy.title).toBe('Take a Rest');
      });
    });

    describe('Edge cases', () => {
      it('should handle previousRegimeId with same value', () => {
        const fStrategy = getActiveStrategy('f', 'forward', 'f');
        const gStrategy = getActiveStrategy('g', 'backward', 'g');

        // Should fall back to default or directional strategy since prev === curr index
        expect(fStrategy).toBeDefined();
        expect(fStrategy.title).toBeDefined();
        expect(gStrategy).toBeDefined();
        expect(gStrategy.title).toBeDefined();
      });

      it('should prioritize previousRegimeId over animationDirection', () => {
        // Coming from ef (lower index) but direction is backward
        // Should use fromLeft (based on previousRegimeId) not fromRight (based on direction)
        const strategy = getActiveStrategy('f', 'backward', 'ef');
        expect(strategy.title).toBe('Monitor Market Recovery');
      });
    });
  });

  describe('getDirectionLabel', () => {
    describe('Extreme regimes', () => {
      it('should return null for ef', () => {
        expect(getDirectionLabel('ef', 'forward')).toBeNull();
        expect(getDirectionLabel('ef', 'backward')).toBeNull();
      });

      it('should return null for n', () => {
        expect(getDirectionLabel('n', 'forward')).toBeNull();
        expect(getDirectionLabel('n', 'backward')).toBeNull();
      });

      it('should return null for eg', () => {
        expect(getDirectionLabel('eg', 'forward')).toBeNull();
        expect(getDirectionLabel('eg', 'backward')).toBeNull();
      });
    });

    describe('Fear regime labels', () => {
      it('should return recovery label when direction is forward', () => {
        const label = getDirectionLabel('f', 'forward');
        expect(label).toBe('From Extreme Fear (recovery)');
      });

      it('should return decline label when direction is backward', () => {
        const label = getDirectionLabel('f', 'backward');
        expect(label).toBe('From Neutral (decline)');
      });
    });

    describe('Greed regime labels', () => {
      it('should return bull run label when direction is forward', () => {
        const label = getDirectionLabel('g', 'forward');
        expect(label).toBe('From Neutral (bull run)');
      });

      it('should return correction label when direction is backward', () => {
        const label = getDirectionLabel('g', 'backward');
        expect(label).toBe('From Extreme Greed (correction)');
      });
    });
  });
});
