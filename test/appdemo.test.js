import { expect } from 'chai';

describe('Appium DEMO App', () => {

  it('Memastikan App bisa terbuka dan elemen tersedia', async () => {
    const accessibilityMenu = await $(`//android.widget.TextView[@content-desc="Accessibility"]`);

    // Wait, then click
    await accessibilityMenu.waitForDisplayed({ timeout: 10000 });
    const isVisible = await accessibilityMenu.isDisplayed();
    expect(isVisible).to.be.true;
  });

  it('Scroll elemen hard-coded', async () => {
    // menu: Views/Gallery/1. Photos
    const viewsMenu = await $(`//android.widget.TextView[@content-desc="Views"]`);
    const galleryMenu = await $(`//android.widget.TextView[@content-desc="Gallery"]`);
    const photosMenu = await $(`//android.widget.TextView[@content-desc="1. Photos"]`);
    await viewsMenu.click();
    await galleryMenu.click();
    await photosMenu.click();

    // pastikan elemen Gallery terlihat
    const galleryWidget = await $(`//android.widget.Gallery[@resource-id="io.appium.android.apis:id/gallery"]`);
    await galleryWidget.waitForDisplayed({ timeout: 10000 });
    const isGalleryVisible = await galleryWidget.isDisplayed();
    expect(isGalleryVisible).to.be.true;

    // Appium 2.x SUpport
    // touchAction sudah tidak di support since Appium 2.x (sudah menggunakan W3C Actions API)
    // hitung size elemen yang ingin swipe
    const location = await galleryWidget.getLocation();
    const size = await galleryWidget.getSize();
    const y = location.y + size.height / 2;
    const startX = location.x + size.width - 10;
    const endX = location.x + 10;

    // mulai swipe
    await browser.performActions([{
      type: 'pointer',
      id: 'finger1',
      parameters: { pointerType: 'touch' },
      actions: [
        { type: 'pointerMove', duration: 0, x: startX, y },
        { type: 'pointerDown', button: 0 },
        { type: 'pause', duration: 100 },
        { type: 'pointerMove', duration: 300, x: endX, y },
        { type: 'pointerUp', button: 0 }
      ]
    }]);

    // Always release actions after use
    await browser.releaseActions();
  });

  it('Input ke elemen', async () => {
    // menu: ddds
  });

});
