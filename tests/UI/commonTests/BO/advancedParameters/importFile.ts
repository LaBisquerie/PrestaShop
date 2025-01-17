// Import utils
import testContext from '@utils/testContext';

import {expect} from 'chai';
import {
  boDashboardPage,
  boImportPage,
  boLoginPage,
  type BrowserContext,
  type Page,
  utilsPlaywright,
} from '@prestashop-core/ui-testing';

let browserContext: BrowserContext;
let page: Page;

/**
 * Function to import file
 * @param fileName {string} File name to import
 * @param entityToImport {string} Value to import
 * @param baseContext {string} String to identify the test
 */
function importFileTest(
  fileName: string,
  entityToImport: string,
  baseContext: string = 'commonTests-importFileTest',
): void {
  describe(`PRE-TEST: Import file '${fileName}'`, async () => {
    // before and after functions
    before(async function () {
      browserContext = await utilsPlaywright.createBrowserContext(this.browser);
      page = await utilsPlaywright.newTab(browserContext);
    });

    after(async () => {
      await utilsPlaywright.closeBrowserContext(browserContext);
    });

    it('should login in BO', async function () {
      await testContext.addContextItem(this, 'testIdentifier', 'loginBO', baseContext);

      await boLoginPage.goTo(page, global.BO.URL);
      await boLoginPage.successLogin(page, global.BO.EMAIL, global.BO.PASSWD);

      const pageTitle = await boDashboardPage.getPageTitle(page);
      expect(pageTitle).to.contains(boDashboardPage.pageTitle);
    });

    it('should go to \'Advanced Parameters > Import\' page', async function () {
      await testContext.addContextItem(this, 'testIdentifier', 'goToImportPage', baseContext);

      await boDashboardPage.goToSubMenu(
        page,
        boDashboardPage.advancedParametersLink,
        boDashboardPage.importLink,
      );
      await boImportPage.closeSfToolBar(page);

      const pageTitle = await boImportPage.getPageTitle(page);
      expect(pageTitle).to.contains(boImportPage.pageTitle);
    });

    it(`should import '${fileName}' file`, async function () {
      await testContext.addContextItem(this, 'testIdentifier', 'importFile', baseContext);

      const uploadSuccessText = await boImportPage.uploadImportFile(page, entityToImport, fileName);
      expect(uploadSuccessText).contain(fileName);

      if (await boImportPage.isForceAllIDNumbersVisible(page)) {
        await boImportPage.setForceAllIDNumbers(page);
      }
    });

    it('should go to next import file step', async function () {
      await testContext.addContextItem(this, 'testIdentifier', 'nextStep', baseContext);

      const panelTitle = await boImportPage.goToImportNextStep(page);
      expect(panelTitle).contain(boImportPage.importPanelTitle);
    });

    it('should start import file', async function () {
      await testContext.addContextItem(this, 'testIdentifier', 'confirmImport', baseContext);

      const modalTitle = await boImportPage.startFileImport(page);
      expect(modalTitle).contain(boImportPage.importModalTitle);
    });

    it('should check that the import is completed', async function () {
      await testContext.addContextItem(this, 'testIdentifier', 'waitForImport', baseContext);

      const isCompleted = await boImportPage.getImportValidationMessage(page);
      expect(isCompleted, 'The import is not completed!')
        .contain('Data imported')
        .and.contain('Look at your listings to make sure it\'s all there as you wished.');
    });

    it('should close import progress modal', async function () {
      await testContext.addContextItem(this, 'testIdentifier', 'closeImportModal', baseContext);

      const isModalClosed = await boImportPage.closeImportModal(page);
      expect(isModalClosed).to.eq(true);
    });
  });
}

export default importFileTest;
