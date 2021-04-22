import { INITIAL_SETTINGS, SettingsService } from './settings.service';
describe('SettingsService', () => {
  let service: SettingsService;

  beforeEach(() => (service = new SettingsService()));

  it('should create', () => {
    expect(service).toBeTruthy();
    expect(service.settings).toBeTruthy('Setting does not have default value!');
  });

  it('should only change one property', () => {
    const newSetting = { offset: { isScrolledToTop: 100 } };
    service.settings = newSetting as any;
    const newObj = { ...INITIAL_SETTINGS };
    newObj.offset.isScrolledToTop = 100;
    expect(service.settings).toEqual(jasmine.objectContaining(newObj));
  });

  it('should throw an error when invalid object is provided', () => {
    expect(() => (service.settings = null)).toThrowError(
      `Invalid settings object!`
    );
  });
});
