const { createCover, supportedConsoles, consoleConfigs } = require('..');

describe('RomCoverApi', () => {
  describe('exports', () => {
    test('should export createCover function', () => {
      expect(typeof createCover).toBe('function');
    });

    test('should export supportedConsoles array', () => {
      expect(Array.isArray(supportedConsoles)).toBe(true);
      expect(supportedConsoles.length).toBeGreaterThan(0);
    });

    test('should export consoleConfigs object', () => {
      expect(typeof consoleConfigs).toBe('object');
    });
  });

  describe('supportedConsoles', () => {
    test('should contain expected consoles', () => {
      expect(supportedConsoles).toContain('gameboy');
      expect(supportedConsoles).toContain('nes');
      expect(supportedConsoles).toContain('snes');
      expect(supportedConsoles).toContain('n64');
      expect(supportedConsoles).toContain('gamecube');
      expect(supportedConsoles).toContain('ps1');
    });
  });

  describe('consoleConfigs', () => {
    test('should have config for each supported console', () => {
      supportedConsoles.forEach(console => {
        expect(consoleConfigs[console]).toBeDefined();
        expect(consoleConfigs[console]).toHaveProperty('logo');
        expect(consoleConfigs[console]).toHaveProperty('cropAspectRatio');
        expect(consoleConfigs[console]).toHaveProperty('logoWidth');
        expect(consoleConfigs[console]).toHaveProperty('placement');
      });
    });
  });

  describe('createCover', () => {
    test('should throw error for invalid console type', async () => {
      await expect(createCover('invalid', './test.jpg')).rejects.toThrow(
        'Tipo de consola no válido: invalid'
      );
    });

    test('should throw error for non-existent image', async () => {
      await expect(createCover('gameboy', './non-existent-image.jpg')).rejects.toThrow();
    });
  });
});
