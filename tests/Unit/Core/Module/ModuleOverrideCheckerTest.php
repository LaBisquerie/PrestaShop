<?php
/**
 * Copyright since 2007 PrestaShop SA and Contributors
 * PrestaShop is an International Registered Trademark & Property of PrestaShop SA
 *
 * NOTICE OF LICENSE
 *
 * This source file is subject to the Open Software License (OSL 3.0)
 * that is bundled with this package in the file LICENSE.md.
 * It is also available through the world-wide-web at this URL:
 * https://opensource.org/licenses/OSL-3.0
 * If you did not receive a copy of the license and are unable to
 * obtain it through the world-wide-web, please send an email
 * to license@prestashop.com so we can send you a copy immediately.
 *
 * DISCLAIMER
 *
 * Do not edit or add to this file if you wish to upgrade PrestaShop to newer
 * versions in the future. If you wish to customize PrestaShop for your
 * needs please refer to https://devdocs.prestashop.com/ for more information.
 *
 * @author    PrestaShop SA and Contributors <contact@prestashop.com>
 * @copyright Since 2007 PrestaShop SA and Contributors
 * @license   https://opensource.org/licenses/OSL-3.0 Open Software License (OSL 3.0)
 */

namespace Tests\Unit\Core\Module;

use PHPUnit\Framework\TestCase;
use PrestaShop\PrestaShop\Core\Module\ModuleOverrideChecker;
use Symfony\Contracts\Translation\TranslatorInterface;

class ModuleOverrideCheckerTest extends TestCase
{
    /**
     * @var string
     */
    protected $psOverrideDir;

    /**
     * @var string
     */
    protected $modulesTestsDir;

    protected function setUp(): void
    {
        $this->psOverrideDir = dirname(__DIR__, 3) . '/Resources/modules_tests/override_for_unit_test/';
        $this->modulesTestsDir = dirname(__DIR__, 3) . '/Resources/modules_tests';
    }

    /**
     * @dataProvider provideTestData
     */
    public function testHasOverrideConflict(string $moduleName, bool $expectedResult): void
    {
        $moduleOverrideChecker = $this->getModuleOverrideChecker();

        $moduleOverridePath = sprintf('%s/%s/override', $this->modulesTestsDir, $moduleName);

        $this->assertEquals($expectedResult, $moduleOverrideChecker->hasOverrideConflict($moduleOverridePath));
    }

    private function getModuleOverrideChecker(): ModuleOverrideChecker
    {
        $translatorMock = $this->createMock(TranslatorInterface::class);
        $translatorMock->method('trans')->willReturnArgument(0);

        return new ModuleOverrideChecker($translatorMock, $this->psOverrideDir);
    }

    public function provideTestData(): array
    {
        return [
            [
                'testnoconflict',
                false,
            ],
            [
                'testnooverride',
                false,
            ],
            [
                'testbasicconflict',
                true,
            ],
            [
                'testtrickyconflict',
                true,
            ],
            [
                'testpropertyconflict',
                true,
            ],
            [
                'testconstantconflict',
                true,
            ],
        ];
    }
}