<?php

declare(strict_types=1);

use Psr\Http\Message\ResponseInterface;
use Tester\Assert;
use Tester\TestCase;
use Tests\Frame\Api;
use Tests\Frame\Http;

require_once __DIR__ . '/../bootstrap.php';

(new class() extends TestCase {
    public function testHome(): void
    {
        // make request
        $req = Http::get('/');
        // handle request
        $res = Api::handle($req);

        Assert::type(ResponseInterface::class, $res);
        Assert::same(200, $res->getStatusCode());
    }
})->run();
