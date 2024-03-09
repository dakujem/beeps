<?php

declare(strict_types=1);

use App\Tools\Env;
use Dakujem\Cumulus\Dsn;

return [
//
//  +-----------------------------------------------------------------+
//  |  System variables
//  +-----------------------------------------------------------------+
//
    'dev' => Env::bool('DEVELOPMENT', false),

//
//  +-----------------------------------------------------------------+
//  |  Authentication
//  +-----------------------------------------------------------------+
//
    'auth' => [
        'list' => (function (?string $json): array {
            return $json ? json_decode($json, true) : [];
        })(Env::string('AUTH_LIST')),
    ],

//
//  +-----------------------------------------------------------------+
//  |  API
//  +-----------------------------------------------------------------+
//
    'tokens' => [
        'secret' => Env::string('API_SECRET', 'I should never have committed this, screw me!'),
        'algo' => 'HS256',
    ],

//
//  +-----------------------------------------------------------------+
//  |  Database
//  +-----------------------------------------------------------------+
//
    'database' => (function () {
        $db = new Dsn(Env::string('DATABASE_URL'), [
            'driver' => Dsn::valueMapper(['mysql' => 'mysqli'], 'scheme'),
        ]);
        return [
            'database' => $db->get('database', 'beeps'),
            'host' => $db->get('host', 'localhost'),
            'port' => $db->get('port', 3306),
            'username' => $db->get('username', 'root'),
            'password' => $db->get('password', ''),
            'driver' => $db->get('driver', 'mysqli'),
            'charset' => 'utf8mb4', // 4-byte character set
        ];
    })(),
];
