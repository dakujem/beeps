<?php

declare(strict_types=1);

namespace App\Tools;

use Psr\Http\Message\ServerRequestInterface as Request;
use Slim\Interfaces\RouteInterface;
use Slim\Routing\RouteContext;

/**
 * In Slim v3 you can simply type `$request->getParam('target')`,
 * this helper returns this simple approach in form of `RequestHelper::param($request, 'target')`.
 */
class RequestHelper
{
    /**
     * Get a parameter from the request (body, query).
     *
     * From Slim v3 implementation:
     * https://github.com/slimphp/Slim/blob/3.x/Slim/Http/Request.php
     *
     * @param Request $request
     * @param $key
     * @param null $default
     * @return mixed|null
     */
    public static function param(Request $request, $key, $default = null)
    {
        $postParams = $request->getParsedBody();
        $getParams = $request->getQueryParams();
        $result = $default;
        if (is_array($postParams) && isset($postParams[$key])) {
            $result = $postParams[$key];
        } elseif (is_object($postParams) && property_exists($postParams, $key)) {
            $result = $postParams->{$key};
        } elseif (isset($getParams[$key])) {
            $result = $getParams[$key];
        }
        return $result;
    }

    public static function routeContext(Request $request): RouteContext
    {
        return RouteContext::fromRequest($request);
    }

    public static function route(Request $request): RouteInterface
    {
        return static::routeContext($request)->getRoute();
    }

    public static function routeArgs(Request $request): array
    {
        return static::route($request)->getArguments();
    }

    public static function routeArg(Request $request, string $name, string $default = null): ?string
    {
        return static::route($request)->getArgument($name, $default);
    }

    /**
     * Convert a string value originating from a URL int o a boolean value.
     * Note that this method is heavily opinionated.
     *
     * @param string|bool|null $rawValue
     * @return bool
     */
    public static function toBoolean(string|bool|null $rawValue): bool
    {
        if (is_bool($rawValue)) {
            return $rawValue;
        }
        return
            $rawValue !== null &&
            $rawValue !== '' &&
            $rawValue !== '0' &&
            strtolower($rawValue) !== 'false';
    }
}
