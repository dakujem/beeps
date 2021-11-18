<?php

declare(strict_types=1);

namespace App\Controllers;

use App\Security\JwtService;
use App\Tools\RequestHelper;
use App\Tools\ResponseHelper;
use Dakujem\Middleware\TokenManipulators;
use Fig\Http\Message\StatusCodeInterface as StatusCode;
use Psr\Http\Message\ResponseInterface as Response;
use Psr\Http\Message\ServerRequestInterface as Request;
use Throwable;

/**
 * Create a session or read session info.
 */
final class SessionController
{
    use InvokableController;

    public function __construct(
        private JwtService $jwt,
        // Associative array of username-password pairs.
        private array $authList = [],
    ) {
    }

    /**
     * Create a session (i.e. log in, authenticate).
     *
     * @param Request $request
     * @param Response $response
     * @return Response
     */
    public function create(Request $request, Response $response): Response
    {
        $username = RequestHelper::param($request, 'username');
        $password = trim(RequestHelper::param($request, 'password') ?? '');

        $usernameCheck = $passwordCheck = null;
        try {
            //
            // Authenticated! :-))
            //
            //   Here we accept any valid e-mail and any non-empty password.
            //
            //   Of course here you would check your database or identity provider
            //   to see if you can authenticate this user, given the credentials.
            //
            $usernameCheck = filter_var($username, FILTER_VALIDATE_EMAIL);
            $passwordCheck = $password !== '';

            //
            // Additionally, for defined users, check for a real password match.
            //
            //   This is a makeshift authentication.
            //   Normally, you want to use `password_hash` and `password_verify` functions here.
            //
            if ($this->authList[$username] ?? null) {
                $passwordCheck = $passwordCheck && $password === $this->authList[$username];
            }

            // Both checks must pass.
            $authenticated = $usernameCheck && $passwordCheck;

            if ($authenticated) {
                $claims = [
                    'sub' => $username, // You want a unique identifier here, preferably an auto-incremented database ID.
                ];
                $data = [
                    'token' => $this->jwt->encode($claims),
                ];
                return ResponseHelper::jsonData($response, $data, StatusCode::STATUS_CREATED);
            }
        } catch (Throwable $e) {
            return $this->reject($response, $e);
        }
        return $this->rejectErrors($response, array_filter([
            'username' => !$usernameCheck ? 'Username must be a valid e-mail address.' : null,
            'password' => !$passwordCheck ? 'Password must not be empty.' : null,
        ]));
//        return $this->reject($response, 'Credentials not found.');
    }

    /**
     * Read current session info.
     *
     * @param Request $request
     * @param Response $response
     * @return Response
     */
    public function read(Request $request, Response $response): Response
    {
        $accessToken = TokenManipulators::attributeTokenProvider(TokenManipulators::TOKEN_ATTRIBUTE_NAME)($request);
        return ResponseHelper::jsonData($response, [
            'token' => $accessToken,
        ]);
    }

    private function reject(Response $response, Throwable|string $message, ?int $status = null): Response
    {
        if ($message instanceof Throwable) {
            $message = $message->getMessage();
        }
        return ResponseHelper::jsonError($response, $message, $status ?? StatusCode::STATUS_UNAUTHORIZED);
    }

    private function rejectErrors(Response $response, array $errors, ?int $status = null): Response
    {
        return ResponseHelper::jsonErrors($response, $errors, $status ?? StatusCode::STATUS_UNAUTHORIZED);
    }
}
