<?php

declare(strict_types=1);

namespace App\Controllers;

use LogicException;
use Psr\Http\Message\ResponseInterface as Response;
use Psr\Http\Message\ServerRequestInterface as Request;

/**
 * InvokableController
 */
trait InvokableController
{
    public function __invoke(Request $request, Response $response, ...$args): Response
    {
        $requestHandler = $this->requestHandler($request->getMethod());
        if ($requestHandler === null) {
            throw new LogicException(sprintf('Handler for %s is not defined.', $request->getMethod()));
        }
        return $requestHandler($request, $response, ...$args);
    }

    /**
     * @return callable[]
     */
    protected function requestHandlers(): array
    {
        return [
            'GET' => [$this, 'read'],
            'POST' => [$this, 'create'],
            'DELETE' => [$this, 'delete'],
            'PATCH' => [$this, 'update'],
            'PUT' => [$this, 'replace'],
        ];
    }

    /**
     * @param string $method
     * @return callable|NULL
     */
    protected function requestHandler(string $method): ?callable
    {
        return $this->requestHandlers() [$method] ?? null;
    }
}
