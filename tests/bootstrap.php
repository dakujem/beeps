<?php

declare(strict_types=1);

define('ROOT', __DIR__);

require_once __DIR__ . '/../vendor/autoload.php';

use App\Bootstrap;
use Psr\Container\ContainerInterface;
use Tester\Environment;


//
// Initialize test environment.
//
//   Using nette/tester package.
//   https://github.com/nette/tester
//
Environment::setup();


/**
 * A nasty global :-)
 *
 * @return ContainerInterface
 */
function _c(): ContainerInterface
{
    static $container = null;
    if ($container === null) {
        $root = __DIR__ . '/../';
        // TODO this bootstrapping is duplicated (index.php).
        Bootstrap::environment($root);
        $container = Bootstrap::container(require $root . 'config/config.php');
    }
    return $container;
}
