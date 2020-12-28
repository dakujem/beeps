<?php

declare(strict_types=1);

namespace Tests\Frame;

use DomainException;
use Psr\Http\Message\ResponseInterface as Response;
use Psr\Http\Message\ServerRequestInterface as Request;
use Slim\Psr7\Factory\ServerRequestFactory;

/**
 * Bundle of shortcuts to be used with HTTP tests.
 */
final class Http
{
    public static function makeRequest(string $method, string $uri, array $params = []): Request
    {
        return (new ServerRequestFactory())->createServerRequest($method, $uri, []);
    }

    public static function withJson(Request $req, mixed $data): Request
    {
        $req = $req->withHeader('Content-Type', 'application/json');
        if ($data !== null) {
            $req = $req->withParsedBody($data);
        }
        return $req;
    }

    public static function readJson(Response $res): ?object
    {
//        if(in_array('Application/JSON', $res->getHeader('Content-Type');
        try {
            $body = $res->getBody();
            $body->rewind();
            $raw = (string)$res->getBody();
            $content = json_decode($raw);
        } catch (DomainException) {
            // ignore
            $content = null;
        }

        return $content;
    }

    public static function get(string $uri, array $params = []): Request
    {
        return static::makeRequest('GET', $uri, $params);
    }

    public static function post(string $uri, array $params = []): Request
    {
        return static::makeRequest('POST', $uri, $params);
    }
}
