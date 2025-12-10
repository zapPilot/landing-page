import { getFeatures, FEATURE_VISUALS, Feature } from '../features';
import { MESSAGES } from '../messages';

describe('features config', () => {
  describe('getFeatures', () => {
    it('should return features with combined text and visual data', () => {
      const features = getFeatures();

      expect(features.length).toBe(MESSAGES.features.items.length);
      expect(features.length).toBe(FEATURE_VISUALS.length);

      features.forEach((feature, index) => {
        // Text content from MESSAGES
        expect(feature.title).toBe(MESSAGES.features.items[index].title);
        expect(feature.description).toBe(MESSAGES.features.items[index].description);

        // Visual config from FEATURE_VISUALS
        expect(feature.icon).toBe(FEATURE_VISUALS[index].icon);
        expect(feature.gradient).toBe(FEATURE_VISUALS[index].gradient);
        expect(feature.delay).toBe(FEATURE_VISUALS[index].delay);
      });
    });

    it('should return all features with valid properties', () => {
      const features = getFeatures();

      features.forEach((feature: Feature) => {
        // All required text properties exist
        expect(typeof feature.title).toBe('string');
        expect(feature.title.length).toBeGreaterThan(0);
        expect(typeof feature.description).toBe('string');
        expect(feature.description.length).toBeGreaterThan(0);

        // All required visual properties exist
        expect(feature.icon).toBeDefined();
        expect(typeof feature.gradient).toBe('string');
        expect(feature.gradient.length).toBeGreaterThan(0);
        expect(typeof feature.delay).toBe('number');
        expect(feature.delay).toBeGreaterThanOrEqual(0);
      });
    });
  });

  describe('array synchronization', () => {
    it('should have same number of items in MESSAGES and FEATURE_VISUALS', () => {
      expect(MESSAGES.features.items.length).toBe(FEATURE_VISUALS.length);
    });

    it('should have exactly 4 features', () => {
      expect(MESSAGES.features.items.length).toBe(4);
      expect(FEATURE_VISUALS.length).toBe(4);
    });
  });
});
