<?php

declare(strict_types=1);

namespace App;

use App\Controllers\AccountController;
use App\Controllers\SessionController;
use App\Controllers\StreamController;
use App\Security\Token;
use Dakujem\Middleware\Factory\AuthFactory as AuthMiddlewareFactory;
use Psr\Container\ContainerInterface as Container;
use Psr\Http\Message\ResponseInterface as Response;
use Psr\Http\Message\ServerRequestInterface as Request;
use Slim\Interfaces\RouteCollectorProxyInterface as Group;

final class Router
{
    public static function register(Group $group, Container $container): void
    {
        // Note: Slim will hijack $this and static, use them with caution within the route handles.
        $group->group('/api', function (Group $group) use ($container): void {
            self::addApiRoutes($group, $container);
        });

        // Serve home page / client app
        $group->get('[/]', function (Request $request, Response $response): Response {
            $content = file_get_contents(__DIR__ . '/../public/index.html');
            $response->getBody()->write($content);
            return $response;
        });
    }

    private static function addApiRoutes(Group $group, Container $container): void
    {
        // Routes in this group are open for public access.
        $openGroup = $group->group('', function (Group $group) {
            // Authentication (public endpoints)
            $group->post('/session', SessionController::class);
            $group->get('/session', SessionController::class);

            // Read the "beeps" stream (public endpoint)
            $group->get('/beeps', StreamController::class);
        });

        // Routes in the following group are protected against unauthorized access (registered users only).
        $protectedGroup = $group->group('', function (Group $group) {
            // Manipulate "beeps"
            $group->post('/beeps', StreamController::class);
            $group->delete('/beeps/{id:[0-9]+}', StreamController::class);
            $group->patch('/beeps/{id:[0-9]+}', StreamController::class);
        });

        // Routes in the following group are protected against unauthorized access (administrators only).
        $adminGroup = $group->group('/admin', function (Group $group) {
            // read the list of all users
            $group->get('/accounts', AccountController::class);
        });

        /** @var AuthMiddlewareFactory $auth */
        $auth = $container->get(AuthMiddlewareFactory::class);

        //
        // Add AUTHORIZATION layer (check for presence of a valid token).
        //
        $protectedGroup->add(
            $auth->assertTokens()
        );

        //
        // Add AUTHORIZATION layer for admin access. Here we add a custom inspection.
        //
        $adminGroup->add(
            $auth->inspectTokens(function (Token $token, callable $next, callable $withError): Response {
                // check if the user is an admin
                if (!$token->isAdmin()) {
                    // if the predicate fails, return a response with an error message
                    return $withError('Requires administrator privileges.');
                }
                // otherwise continue
                return $next();
            })
        );
    }
}
