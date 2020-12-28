<?php

declare(strict_types=1);

/**
 * API request entry point.
 */

use App\Bootstrap;
use Slim\App;

// Autoload Composer.
require __DIR__ . '/../vendor/autoload.php';

(function (): void {
    // Bootstrap environment variables.
    Bootstrap::environment(__DIR__ . '/../');

    // Bootstrap a service container.
    $container = Bootstrap::container(require __DIR__ . '/../config/config.php');

    // Get a Slim app instance.
    /** @var App $app */
    $app = $container->get(App::class);

    // Dispatch the HTTP request.
    $app->run();
})();
