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

namespace PrestaShop\PrestaShop\Core\Domain\SqlManagement;

/**
 * Class SqlRequestSettings stores SqlRequest settings.
 */
class SqlRequestSettings
{
    /**
     * Name of the setting for SqlRequest SQL query result file encoding in ps_configuration.
     */
    public const FILE_ENCODING = 'PS_ENCODING_FILE_MANAGER_SQL';

    /**
     * Name of the setting for SqlRequest SQL query result file separator in configuration.
     */
    public const FILE_SEPARATOR = 'PS_SEPARATOR_FILE_MANAGER_SQL';

    /**
     * @var string Encoding in which downloaded SqlRequest SQL query result files will be encoded
     */
    private string $fileEncoding;

    /**
     * @var string Separator used in downloaded SqlRequest SQL query result files
     */
    private string $fileSeparator;

    /**
     * @param string $fileEncoding
     * @param string $fileSeparator
     */
    public function __construct(string $fileEncoding, string $fileSeparator)
    {
        $this->fileEncoding = $fileEncoding;
        $this->fileSeparator = $fileSeparator;
    }

    /**
     * @return string
     */
    public function getFileEncoding(): string
    {
        return $this->fileEncoding;
    }

    public function getFileSeparator(): string
    {
        return $this->fileSeparator;
    }
}
