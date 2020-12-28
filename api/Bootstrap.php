<?php

declare(strict_types=1);

namespace App;

use App\Config\DependencyConfigurator;
use App\Config\MiddlewareConfigurator;
use Dakujem\Sleeve;
use Dakujem\Slim\SlimFactory;
use Dotenv\Dotenv;
use Dotenv\Exception\InvalidPathException;
use Psr\Container\ContainerInterface as Container;
use Slim\App;

final class Bootstrap
{
    /**
     * Loads environment variables,
     * optionally validating them.
     *
     * @param string $pathToEnvFile
     */
    public static function environment(string $pathToEnvFile): void
    {
        try {
            class_exists(Dotenv::class) && Dotenv::createImmutable($pathToEnvFile)->load();
        } catch (InvalidPathException /* | InvalidFileException | InvalidEncodingException | ValidationException */ $e) {
            //
            // Gracefully ignore the error when no .env file is present.
            //
            //   Note that you may also ignore invalid file format errors, encoding errors,
            //   and validation errors by catching respective exceptions.
            //
        }
    }

    /**
     * Bootstraps a service container instance.
     *
     * @param array $settings an array of global "settings"
     * @return Container
     */
    public static function container(array $settings): Container
    {
        //
        // Define the App builder routine here.
        //
        //   A basic set of App configurators is used.
        //   You can extend the list with any other configurators
        //   to configure the App instance according to your specific needs.
        //
        $appBuilder = function (Container $container) {
            return SlimFactory::buildFromContainer(
                $container,
                // App configurators:
                [
                    // Configures middleware
                    MiddlewareConfigurator::class,

                    // Registers routes
                    fn(App $slim) => Router::register($slim, $container),
                ],
            );
        };

        // Bootstrap the container.
        $container = new Sleeve([
            // An array of settings.
            'settings' => $settings,
            // A reference to self.
            Container::class => fn(Container $c) => $c,
            // The App instance.
            App::class => $appBuilder,
        ]);

        // Populate the container with system services.
        (new DependencyConfigurator())->decorate($container);

        return $container;
    }
}
