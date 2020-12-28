<?php

declare(strict_types=1);

namespace App\Config;

use Dakujem\Middleware\Factory\AuthFactory as AuthMiddlewareFactory;
use Dakujem\Middleware\TokenManipulators as Man;
use Dakujem\Slim\AppDecoratorInterface;
use ErrorException;
use Psr\Http\Message\ServerRequestInterface as Request;
use Psr\Http\Server\RequestHandlerInterface as RequestHandler;
use Slim\App;
use Slim\Error\Renderers\JsonErrorRenderer;

/**
 * Middleware configurator.
 *
 * NOTE:
 *   The middleware runs in a LIFO (Last In First Out) mode.
 */
class MiddlewareConfigurator implements AppDecoratorInterface
{
    public function decorate(App $slim): void
    {
        $container = $slim->getContainer();


#		+-------------------------------------------------------------------+
#		|    Routing                                                        |
#		+-------------------------------------------------------------------+

        $slim->addRoutingMiddleware();


#		+-------------------------------------------------------------------+
#		|    Parse Request body                                             |
#		+-------------------------------------------------------------------+

        $slim->addBodyParsingMiddleware();


#		+-------------------------------------------------------------------+
#		|    Authentication                                                 |
#		+-------------------------------------------------------------------+

        //
        // Verifies the presence of an authentic token in the request.
        //
        //   Please note that an AUTHORIZATION middleware is needed and is added via the router,
        //   unless you want to authorize every route of the app, in which case you could add it here.
        //
        $slim->add($container->get(AuthMiddlewareFactory::class)->decodeTokens(
            Man::TOKEN_ATTRIBUTE_NAME, // Write the decoded payload to the `token` request attribute.
            Man::HEADER_NAME, // Extract tokens from the `Authorization` header.
            null // Do not extract tokens from cookies.
        ));


#		+-------------------------------------------------------------------+
#		|    Custom Headers                                                 |
#		+-------------------------------------------------------------------+

        $slim->add(function (Request $request, RequestHandler $handler) {
            return $handler->handle($request)->withHeader('X-Powered-By', 'https://dev.to/dakujem');
//            return $handler->handle($request)->withHeader('X-Powered-By', 'https://dakujem.dev'); // TODO
        });


#		+-------------------------------------------------------------------+
#		|    Error Handling (The Outermost Layer)                           |
#		+-------------------------------------------------------------------+

        //
        // Note:
        //
        //   Error handling should be the outermost layer to catch errors from the other middleware too.
        //

        // Convert every error/warning/notice into a Throwable which can be caught and processed.
        $slim->add(function (Request $request, RequestHandler $handler) {
            // error handler to turn every error (warning, notice, ...) into an exception
            set_error_handler(function ($errno, $errstr, $errfile, $errline) {
                if (0 === error_reporting()) {
                    // error was suppressed with the @-operator
                    return false;
                }
                throw new ErrorException($errstr, 0, $errno, $errfile, $errline);
            });
            try {
                return $handler->handle($request);
            } finally {
                restore_error_handler();
            }
        });

        $emw = $slim->addErrorMiddleware($container->get('settings')['dev'], true, true);
        $emw->getDefaultErrorHandler()->setDefaultErrorRenderer('application/json', JsonErrorRenderer::class);
        // The end.
    }
}
