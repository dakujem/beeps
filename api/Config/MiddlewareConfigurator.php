<?php

declare(strict_types=1);

namespace App\Config;

use App\Tools\ThrowingErrorHandler;
use Dakujem\Middleware\Factory\AuthFactory as AuthMiddlewareFactory;
use Dakujem\Middleware\GenericMiddleware;
use Dakujem\Middleware\TokenManipulators as Man;
use Dakujem\Slim\AppDecoratorInterface;
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


#       +-------------------------------------------------------------------+
#       |    Error Handling (Inner Layer)                                   |
#       +-------------------------------------------------------------------+

        $emw = $slim->addErrorMiddleware($container->get('settings')['dev'], true, true);
        $emw->getDefaultErrorHandler()->setDefaultErrorRenderer('application/json', JsonErrorRenderer::class);


#       +-------------------------------------------------------------------+
#       |    Routing                                                        |
#       +-------------------------------------------------------------------+

        $slim->addRoutingMiddleware();


#       +-------------------------------------------------------------------+
#       |    Parse Request body                                             |
#       +-------------------------------------------------------------------+

        $slim->addBodyParsingMiddleware();


#       +-------------------------------------------------------------------+
#       |    Authentication                                                 |
#       +-------------------------------------------------------------------+

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


#       +-------------------------------------------------------------------+
#       |    Custom Headers                                                 |
#       +-------------------------------------------------------------------+

        $slim->add(function (Request $request, RequestHandler $handler) {
            return $handler->handle($request)->withHeader('X-Powered-By', 'https://dev.to/dakujem');
//            return $handler->handle($request)->withHeader('X-Powered-By', 'https://dakujem.dev'); // TODO
        });


#       +-------------------------------------------------------------------+
#       |    Error Handling (The Outermost Layer)                           |
#       +-------------------------------------------------------------------+

        // Convert every error/warning/notice into a Throwable which can be caught and processed.
        $slim->add(new GenericMiddleware(function (Request $request, RequestHandler $handler) {
            // Error handler to turn every reported error (warning, notice, ...) into an exception.
            set_error_handler(new ThrowingErrorHandler());
            try {
                return $handler->handle($request);
            } finally {
                // Restore the previous error handler.
                restore_error_handler();
            }
        }));

        //
        // Note:
        //
        //   Error handling should be the outermost layer to catch errors from the other middleware too.
        //   However, for better consistency (headers, CORS, etc.) we are adding another error-handling middleware
        //   specifically for the app layer to the bottom of the stack.
        //
        $slim->add($emw);


        //
        // The end.
        //
    }
}
