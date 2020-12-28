<?php

declare(strict_types=1);

namespace App\Security;

use JsonSerializable;

/**
 * Token
 */
class Token implements JsonSerializable
{
    public function __construct(private object $payload)
    {
    }

    public function getSubject(): int|string|null
    {
        return $this->payload->sub ?? null;
    }

    public function isAdmin(): bool
    {
        return $this->getSubject() == 1;
    }

    public function jsonSerialize()
    {
        return $this->payload;
    }
}
