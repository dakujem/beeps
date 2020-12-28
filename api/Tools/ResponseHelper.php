<?php

declare(strict_types=1);

namespace App\Tools;

use Psr\Http\Message\ResponseInterface as Response;

/**
 * Usage:
 *   ResponseHelper::jsonData($response, $myCollection);
 */
final class ResponseHelper
{
    /**
     * @param Response $response
     * @param mixed $data
     * @param int|null $httpStatus
     * @return Response
     */
    public static function json(Response $response, $data, ?int $httpStatus = null): Response
    {
        $resp = $response->withHeader('Content-type', 'application/json');
        $data !== null && $resp->getBody()->write(json_encode($data));
        return $httpStatus !== null ? $resp->withStatus($httpStatus) : $resp;
    }

    /**
     * @param Response $response
     * @param mixed $data
     * @param int|null $httpStatus
     * @return Response
     */
    public static function jsonData(Response $response, $data, ?int $httpStatus = null): Response
    {
        return static::json($response, [
            'data' => $data,
        ], $httpStatus);
    }

    /**
     * @param Response $response
     * @param string|null $errorMessage
     * @param int|null $httpStatus
     * @param array|null $more
     * @return Response
     */
    public static function jsonError(
        Response $response,
        ?string $errorMessage,
        ?int $httpStatus = null,
        ?array $more = null
    ): Response {
        $data = [
            'error' => array_filter([
                'message' => $errorMessage,
            ]),
        ];
        return self::json(
            $response,
            $more !== null ? array_merge($data, $more) : $data,
            $httpStatus ?? 400 // BAD REQUEST
        );
    }

    /**
     * @param Response $response
     * @param array $errors
     * @param int|null $httpStatus
     * @param array|null $more
     * @return Response
     */
    public static function jsonErrors(
        Response $response,
        array $errors,
        ?int $httpStatus = null,
        ?array $more = null
    ): Response {
        $data = [
            'errors' => $errors,
        ];
        return self::json(
            $response,
            $more !== null ? array_merge($data, $more) : $data,
            $httpStatus ?? 400 // BAD REQUEST
        );
    }
}
