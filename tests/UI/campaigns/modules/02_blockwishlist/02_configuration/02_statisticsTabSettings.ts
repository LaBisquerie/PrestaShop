// Import utils
import testContext from '@utils/testContext';

// Import commonTests
import {resetModule} from '@commonTests/BO/modules/moduleManager';

import {
  boDashboardPage,
  boLoginPage,
  boModuleManagerPage,
  type BrowserContext,
  dataCustomers,
  dataModules,
  foClassicCategoryPage,
  foClassicHomePage,
  foClassicLoginPage,
  modBlockwishlistBoMain,
  modBlockwishlistBoStatistics,
  type Page,
  utilsPlaywright,
} from '@prestashop-core/ui-testing';

import {expect} from 'chai';

const baseContext: string = 'modules_blockwishlist_configuration_statisticsTabSettings';

describe('Wishlist module - Statistics tab settings', async () => {
  let browserContext: BrowserContext;
  let page: Page;

  // before and after functions
  before(async function () {
    browserContext = await utilsPlaywright.createBrowserContext(this.browser);
    page = await utilsPlaywright.newTab(browserContext);
  });

  after(async () => {
    await utilsPlaywright.closeBrowserContext(browserContext);
  });

  describe('Check the Back Office', async () => {
    it('should login in BO', async function () {
      await testContext.addContextItem(this, 'testIdentifier', 'loginBO', baseContext);

      await boLoginPage.goTo(page, global.BO.URL);
      await boLoginPage.successLogin(page, global.BO.EMAIL, global.BO.PASSWD);

      const pageTitle = await boDashboardPage.getPageTitle(page);
      expect(pageTitle).to.contains(boDashboardPage.pageTitle);
    });

    it('should go to \'Modules > Module Manager\' page', async function () {
      await testContext.addContextItem(this, 'testIdentifier', 'goToModuleManagerPage', baseContext);

      await boDashboardPage.goToSubMenu(
        page,
        boDashboardPage.modulesParentLink,
        boDashboardPage.moduleManagerLink,
      );
      await boModuleManagerPage.closeSfToolBar(page);

      const pageTitle = await boModuleManagerPage.getPageTitle(page);
      expect(pageTitle).to.contains(boModuleManagerPage.pageTitle);
    });

    it(`should search the module ${dataModules.blockwishlist.name}`, async function () {
      await testContext.addContextItem(this, 'testIdentifier', 'searchModule', baseContext);

      const isModuleVisible = await boModuleManagerPage.searchModule(page, dataModules.blockwishlist);
      expect(isModuleVisible).to.eq(true);
    });

    it(`should go to the configuration page of the module '${dataModules.blockwishlist.name}'`, async function () {
      await testContext.addContextItem(this, 'testIdentifier', 'goToConfigurationPage', baseContext);

      await boModuleManagerPage.goToConfigurationPage(page, dataModules.blockwishlist.tag);

      const pageTitle = await modBlockwishlistBoMain.getPageTitle(page);
      expect(pageTitle).to.eq(modBlockwishlistBoMain.pageTitle);

      const isConfigurationTabActive = await modBlockwishlistBoMain.isTabActive(page, 'Configuration');
      expect(isConfigurationTabActive).to.eq(true);

      const isStatisticsTabActive = await modBlockwishlistBoMain.isTabActive(page, 'Statistics');
      expect(isStatisticsTabActive).to.eq(false);
    });

    it('should go on Statistics Tab', async function () {
      await testContext.addContextItem(this, 'testIdentifier', 'goToStatisticsTab', baseContext);

      await modBlockwishlistBoMain.goToStatisticsTab(page);

      const pageTitle = await modBlockwishlistBoStatistics.getPageTitle(page);
      expect(pageTitle).to.eq(modBlockwishlistBoStatistics.pageTitle);

      const noRecordsFoundText = await modBlockwishlistBoStatistics.getTextForEmptyTable(page);
      expect(noRecordsFoundText).to.contains('warning No records found');
    });
  });
  describe('Go to the FO and add to favorites some products', async () => {
    it('should go to the FO', async function () {
      await testContext.addContextItem(this, 'testIdentifier', 'goToFO', baseContext);

      page = await modBlockwishlistBoStatistics.viewMyShop(page);
      await foClassicHomePage.changeLanguage(page, 'en');

      const isHomePage = await foClassicHomePage.isHomePage(page);
      expect(isHomePage).to.eq(true);
    });

    it('should go to login page', async function () {
      await testContext.addContextItem(this, 'testIdentifier', 'goToLoginPage', baseContext);

      await foClassicHomePage.goToLoginPage(page);

      const pageTitle = await foClassicLoginPage.getPageTitle(page);
      expect(pageTitle, 'Fail to open FO login page').to.contains(foClassicLoginPage.pageTitle);
    });

    it('should sign in with default customer', async function () {
      await testContext.addContextItem(this, 'testIdentifier', 'sighInFo', baseContext);

      await foClassicLoginPage.customerLogin(page, dataCustomers.johnDoe);

      const isCustomerConnected = await foClassicLoginPage.isCustomerConnected(page);
      expect(isCustomerConnected, 'Customer is not connected').to.eq(true);
    });

    it('should go to all products page', async function () {
      await testContext.addContextItem(this, 'testIdentifier', 'goToAllProducts', baseContext);

      await foClassicHomePage.goToAllProductsPage(page);

      const isCategoryPageVisible = await foClassicCategoryPage.isCategoryPage(page);
      expect(isCategoryPageVisible).to.eq(true);
    });

    for (let idxProduct: number = 1; idxProduct <= 3; idxProduct++) {
      // eslint-disable-next-line no-loop-func
      it(`should add product #${idxProduct} to wishlist`, async function () {
        await testContext.addContextItem(this, 'testIdentifier', `addToFavorite${idxProduct}`, baseContext);

        const textResult = await foClassicCategoryPage.addToWishList(page, idxProduct);
        expect(textResult).to.be.eq(foClassicCategoryPage.messageAddedToWishlist);

        const isAddedToWishlist = await foClassicCategoryPage.isAddedToWishlist(page, idxProduct);
        expect(isAddedToWishlist).to.eq(true);
      });
    }

    it('should logout', async function () {
      await testContext.addContextItem(this, 'testIdentifier', 'foLogout', baseContext);

      await foClassicCategoryPage.logout(page);

      const isCustomerConnected = await foClassicHomePage.isCustomerConnected(page);
      expect(isCustomerConnected).to.eq(false);
    });
  });
  describe('Return to BO and check statistics', async () => {
    it('should go to BO', async function () {
      await testContext.addContextItem(this, 'testIdentifier', 'goToBoBack', baseContext);

      page = await foClassicHomePage.closePage(browserContext, page, 0);

      const pageTitle = await modBlockwishlistBoStatistics.getPageTitle(page);
      expect(pageTitle).to.contains(modBlockwishlistBoStatistics.pageTitle);
    });

    it('should click on the refresh button', async function () {
      await testContext.addContextItem(this, 'testIdentifier', 'clickOnRefreshButton', baseContext);

      await modBlockwishlistBoStatistics.refreshStatistics(page);

      const pageTitle = await modBlockwishlistBoStatistics.getPageTitle(page);
      expect(pageTitle).to.contains(modBlockwishlistBoStatistics.pageTitle);

      const numProductsInTable = await modBlockwishlistBoStatistics.getNumProducts(page);
      expect(numProductsInTable).to.equals(3);
    });
  });

  resetModule(dataModules.blockwishlist, `${baseContext}_postTest_0`);
});
