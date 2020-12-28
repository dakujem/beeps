<?php

declare(strict_types=1);

namespace App\Tools;

/**
 * Environment accessor with sensible API.
 */
final class Env
{
    public static function string(string $var, ?string $default = null): ?string
    {
        $raw = static::raw($var);
        return $raw !== null ? $raw : $default;
    }

    public static function bool(string $var, bool $default = false): bool
    {
        $raw = static::raw($var);
        return $raw !== null ? (bool)$raw : $default;
    }

    public static function int(string $var, int $default = null): ?int
    {
        $raw = static::raw($var);
        return $raw !== null ? intval($raw) : $default;
    }

    private static function raw(string $var): ?string
    {
        // Note: getenv could be used, but is not thread-safe and thus discouraged.
        // getenv($var) !== false ? getenv($var) : null
        return $_ENV[$var] ?? null;
    }
}
