<?php

declare(strict_types=1);

namespace App\Security;

use Carbon\CarbonImmutable;
use Firebase\JWT\JWT as Lib;
use LogicException;

final class JwtService
{
    function __construct(private string $secret, private string $algo = 'HS256', private int $ttl = 60)
    {
        if (strlen($secret) < 20) {
            throw new LogicException('API secret too short.');
        }
    }

    function encode($claims): string
    {
        return Lib::encode($claims, $this->secret, $this->algo);
    }

    function decode(string $token): object
    {
        return Lib::decode($token, $this->secret, [$this->algo]);
    }

    /**
     * Generate a new JWT.
     *
     * @link https://tools.ietf.org/html/rfc7519 JWT RFC
     *
     * Default claims can be overridden.
     *
     * @param array $claims
     * @return string
     */
    function generate(array $claims): string
    {
        $iat = CarbonImmutable::now(); // "issued at" / token creation time
        $exp = $iat->addMinutes($this->ttl); // token expires at
        $defaults = [
            'exp' => $exp->unix(),
            'iat' => $iat->unix(),
            'nbf' => $iat->unix(),
        ];
        $notNull = function ($claim) {
            return $claim !== null;
        };
        return $this->encode(array_filter(array_merge($defaults, $claims), $notNull));
    }
}
