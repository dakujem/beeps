<?php

declare(strict_types=1);

namespace App\Tools;

use DateTimeInterface;

/**
 * Serializer
 *
 * @author Andrej Rypak <xrypak@gmail.com>
 */
class Serializer
{
    public static function date(?DateTimeInterface $date): ?array
    {
        return $date ? [
            'unix' => $date->getTimestamp(), // unix timestamp
            'js' => $date->getTimestamp() * 1000, // microseconds, used by JS...
        ] : null;
    }
}
