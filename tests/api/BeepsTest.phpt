<?php

declare(strict_types=1);

use App\Security\JwtService;
use Dibi\Connection;
use Psr\Http\Message\ResponseInterface as Response;
use Tester\Assert;
use Tester\TestCase;
use Tests\Frame\Api;
use Tests\Frame\Http;

require_once __DIR__ . '/../bootstrap.php';

(new class() extends TestCase {
    public function testBeepsPublicEndpoint(): void
    {
        // make request
        $req = Http::get('/beeps');
        // handle request
        $res = Api::handle($req);

        // make basic assertions
        $body = $this->assert200WithDataThenReturnBody($res);

        /** @var Connection $db */
        $db = _c()->get(Connection::class);
        $num = (int)$db->query('SELECT COUNT(`id`) FROM `beeps` WHERE `public` AND `published`')->fetchSingle();
        Assert::same($num, count($body->data));
    }

    public function testBeepsProtectedEndpoint(): void
    {
        // make request
        $jwt = _c()->get(JwtService::class);
        $mail = 'dakujem@dakujem.dev';
        $token = $jwt->generate(['sub' => $mail]);
        $req = Http::get('/beeps')->withHeader('Authorization', 'Bearer ' . $token);
        // handle request
        $res = Api::handle($req);

        // make basic assertions
        $body = $this->assert200WithDataThenReturnBody($res);

        /** @var Connection $db */
        $db = _c()->get(Connection::class);
        $num = (int)$db->query('SELECT COUNT(`id`) FROM `beeps` WHERE `published`')->fetchSingle();
        Assert::same($num, count($body->data));
    }

    private function assert200WithDataThenReturnBody(Response $res): object
    {
        Assert::same(200, $res->getStatusCode());

        $body = Http::readJson($res);
        Assert::notNull($body->data ?? null);
        Assert::type('array', $body->data ?? null);

        return $body;
    }
})->run();
