<?php

declare(strict_types=1);

namespace App\Config;

use App\Controllers\AccountController;
use App\Controllers\SessionController;
use App\Controllers\StreamController;
use App\Security\JwtService;
use App\Security\Token;
use Dakujem\Middleware\Factory\AuthFactory as AuthMiddlewareFactory;
use Dakujem\Middleware\Factory\AuthWizard;
use Dakujem\Sleeve;
use Dakujem\Wire\Genie;
use Dibi\Connection;
use Psr\Container\ContainerInterface as Container;
use Psr\Http\Message\ResponseFactoryInterface;
use Psr\Log\LoggerInterface as Logger;
use Slim\Factory\AppFactory;

final class DependencyConfigurator
{
    function decorate(Sleeve $container): void
    {
        $settings = $container->get('settings');

#       +-------------------------------------------------------------------+
#       |    System services                                                |
#       +-------------------------------------------------------------------+

        // PSR-17 response factory.
        $container[ResponseFactoryInterface::class] = fn() => AppFactory::determineResponseFactory();

        // JWT encoding/decoding service
        $container[JwtService::class] = fn() => new JwtService(
            secret: $settings['tokens']['secret'],
            algo: $settings['tokens']['algo'],
        );


#       +-------------------------------------------------------------------+
#       |    Connections                                                    |
#       +-------------------------------------------------------------------+

        $container[Connection::class] = fn() => new Connection($settings['database']);


#       +-------------------------------------------------------------------+
#       |    Controllers                                                    |
#       +-------------------------------------------------------------------+

        // Note: Autowiring.
        $g = new Genie($container);

        $container[SessionController::class] = fn() => $g->construct(
            SessionController::class,
            $settings['auth']['list'] ?? [],
        );
        $container[AccountController::class] = fn() => $g->construct(AccountController::class);
        $container[StreamController::class] = fn() => $g->construct(StreamController::class);


#       +-------------------------------------------------------------------+
#       |    API services                                                   |
#       +-------------------------------------------------------------------+

        // `TokenMiddleware` factory.
        $container[AuthMiddlewareFactory::class] = function (Container $container) use ($settings) {
            $secret = $settings['tokens']['secret'];
            $algo = $settings['tokens']['algo'];
            // We configure AuthMiddlewareFactory by passing it:
            // 1/ a factory that returns a "decoder" callable for the `TokenMiddleware`, and
            // 2/ a Response factory
            return new AuthMiddlewareFactory(
                function () use ($secret, $algo): callable {
                    //
                    // NOTE
                    //
                    //   This decoder uses the default decoder factory,
                    //   but wraps the result into our own `Token` object.
                    //
                    //   If you do not need a custom implementation of `Token` object,
                    //   it is enough to just pass the default decoder factory to the AuthMiddlewareFactory
                    //   instead of this one, like this:
                    //   AuthWizard::defaultDecoder($secret)
                    //
                    return function (?string $rawToken, ?Logger $logger) use ($secret, $algo): ?Token {
                        $defaultDecoder = AuthWizard::defaultDecoder(
                            secret: $secret,
                            algo: $algo,
                        );
                        $payload = $defaultDecoder($rawToken, $logger);
                        if ($payload !== null) {
                            return new Token($payload);
                        }
                        return null;
                    };
                },
                $container->get(ResponseFactoryInterface::class),
            );
        };
    }
}
