<?php

declare(strict_types=1);

namespace Tests\Frame;

use Psr\Http\Message\ResponseInterface as Response;
use Psr\Http\Message\ServerRequestInterface as Request;
use Slim\App;

/**
 * Shortcut to API App handle method.
 */
final class Api
{
    public static function handle(Request $req): Response
    {
        /** @var App $app */
        $app = _c()->get(App::class);
        return $app->handle($req);
    }
}
