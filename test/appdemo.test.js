import { expect } from 'chai';

describe('Appium DEMO App', () => {

  afterEach(async () => {
    // Terminate the app (if running)
    await browser.execute('mobile: terminateApp', { appId: 'io.appium.android.apis' });

    // Short delay to ensure app is closed
    await browser.pause(1000);

    // Start the app again
    await browser.execute('mobile: activateApp', { appId: 'io.appium.android.apis' });
  });

  it('Klik elemen', async () => {
    // menu: home page
    const elemenKlik = await $(`//android.widget.TextView[@content-desc="Accessibility"]`);
    await elemenKlik.click();
  });
  
  it('Input ke elemen', async () => {
    // menu: App > Alert Dialogs > Text Entry dialog
    const appMenu = await $(`//android.widget.TextView[@content-desc="App"]`)
    const alertdialogMenu = await $(`//android.widget.TextView[@content-desc="Alert Dialogs"]`)
    const textentryMenu = await $(`//android.widget.Button[@content-desc="Text Entry dialog"]`)
    await appMenu.click();
    await alertdialogMenu.click();
    await textentryMenu.click();
    

    // start input elemen
    const nameField = await $(`//android.widget.EditText[@resource-id="io.appium.android.apis:id/username_edit"]`)
    const passField = await $(`//android.widget.EditText[@resource-id="io.appium.android.apis:id/password_edit"]`)
  });
  
  it('Memastikan App bisa terbuka dan elemen tersedia', async () => {
    const accessibilityMenu = await $(`//android.widget.TextView[@content-desc="Accessibility"]`);

    // Wait, then click
    await accessibilityMenu.waitForDisplayed({ timeout: 10000 });
    const isVisible = await accessibilityMenu.isDisplayed();
    expect(isVisible).to.be.true;
  });

  it('Scroll elemen hard-coded', async () => {
    // menu: Views > Gallery > 1. Photos
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

    // case: scroll scrollview sampai ketemu element
    /*const scrollView = await $(`android=new UiSelector().resourceId("abc")`);
    const targetElement = await $(`//android.widget.Gallery[@resource-id="io.appium.android.apis:id/gallery"]`);

    let maxScrolls = 5;
    let isVisible = await targetElement.isDisplayed().catch(() => false);

    while (!isVisible && maxScrolls > 0) {
      const location = await scrollView.getLocation();
      const size = await scrollView.getSize();

      const centerX = location.x + size.width / 2;
      const startY = location.y + size.height * 0.8;
      const endY = location.y + size.height * 0.2;

      // Swipe up inside the scrollView
      await browser.performActions([{
        type: 'pointer',
        id: 'finger1',
        parameters: { pointerType: 'touch' },
        actions: [
          { type: 'pointerMove', duration: 0, x: centerX, y: startY },
          { type: 'pointerDown', button: 0 },
          { type: 'pause', duration: 200 },
          { type: 'pointerMove', duration: 300, x: centerX, y: endY },
          { type: 'pointerUp', button: 0 }
        ]
      }]);
      await browser.releaseActions();

      // Wait briefly before checking again
      await browser.pause(1000);

      isVisible = await targetElement.isDisplayed().catch(() => false);
      maxScrolls--;
    }

    expect(isVisible).to.be.true;
    */

  });


});
