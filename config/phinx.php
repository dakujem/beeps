<?php

declare(strict_types=1);

use App\Bootstrap;

$root = __DIR__ . '/../';

// TODO this bootstrapping is duplicated (index.php).
Bootstrap::environment($root);
$config = require 'config.php';

$dbc = $config['database'];
$driverToAdapter = [
    'mysqli' => 'mysql',
];

return [
    'paths' => [
        'migrations' => $root . '/db/migrations',
        'seeds' => $root . '/db/seeds',
    ],
    'environments' => [
        'default_migration_table' => 'phinxlog',
        'default_environment' => 'default',
        'default' => [
            'adapter' => $driverToAdapter[$dbc['driver']] ?? $dbc['driver'],
            'host' => $dbc['host'],
            'name' => $dbc['database'],
            'user' => $dbc['username'],
            'pass' => $dbc['password'],
            'port' => $dbc['port'],
            'charset' => $dbc['charset'],
        ],
    ],
    'version_order' => 'creation',
];
