<?php

declare(strict_types=1);

use App\Security\JwtService;
use Psr\Http\Message\ResponseInterface;
use Tester\Assert;
use Tester\TestCase;
use Tests\Frame\Api;
use Tests\Frame\Http;

require_once __DIR__ . '/../bootstrap.php';

(new class() extends TestCase {
    public function testReadSessionUnauthorized(): void
    {
        // make request
        $req = Http::get('/session');
        // handle request
        $res = Api::handle($req);

        Assert::type(ResponseInterface::class, $res);
        Assert::same(200, $res->getStatusCode());

        $body = Http::readJson($res);
        Assert::notNull($body->data ?? null);
        Assert::same(null, $body->data->token ?? null);
    }

    public function testCreateSessionFail(): void
    {
        // make request
        $req = Http::withJson(Http::post('/session'), ['foo' => 'bar']);

        // handle request
        $res = Api::handle($req);

        Assert::type(ResponseInterface::class, $res);
        Assert::same(401, $res->getStatusCode());
    }

    public function testCreateSessionSuccess(): void
    {
        $mail = 'dakujem@dakujem.dev';
        // make request
        $req = Http::withJson(Http::post('/session'), ['username' => $mail, 'password' => 'foobar!']);

        // handle request
        $res = Api::handle($req);

        Assert::type(ResponseInterface::class, $res);
        Assert::same(201, $res->getStatusCode());

        $body = Http::readJson($res);
        Assert::notNull($body->data ?? null);

        $token = $body->data->token ?? null;
        Assert::notNull($token);

        $jwt = _c()->get(JwtService::class);

        try {
            $claims = $jwt->decode($token);
        } catch (Throwable $e) {
            // failed!
            throw $e;
        }
        // SUB claim will contain the e-mail
        Assert::same($mail, $claims->sub ?? null);
    }

    public function testReadSessionAuthorized(): void
    {
        $jwt = _c()->get(JwtService::class);
        $mail = 'dakujem@dakujem.dev';
        $token = $jwt->generate(['sub' => $mail]);

        // make request
        $req = Http::get('/session')->withHeader('Authorization', 'Bearer ' . $token);

        // handle request
        $res = Api::handle($req);

        Assert::type(ResponseInterface::class, $res);
        Assert::same(200, $res->getStatusCode());

        $body = Http::readJson($res);
        Assert::notNull($body->data ?? null);
        Assert::notNull($body->data->token ?? null);

        Assert::same($mail, $body->data->token->sub ?? null);
    }
})->run();
