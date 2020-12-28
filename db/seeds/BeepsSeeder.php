<?php

declare(strict_types=1);

use Phinx\Seed\AbstractSeed;


/**
 * Basic seeder that
 * - creates the database structure
 * - seeds random data
 */
class BeepsSeeder extends AbstractSeed
{
    /**
     * Run Method.
     *
     * More information on writing seeders is available here:
     * https://book.cakephp.org/phinx/0/en/seeding.html
     */
    public function run()
    {
        $faker = Faker\Factory::create();
        $ago = '-3 years';
        $maxAccountId = 20;
        $numBeeps = 200;
        $postLength = [200, 1000];
        $dbFormat = 'Y-m-d H:i:s';

        $fakeAccounts = [];
        for ($i = 0; $i < $maxAccountId; $i++) {
            $fakeAccounts[] = [
                'email' => $faker->email,
                'created' => $faker->dateTimeBetween('-3 years')->format($dbFormat),
            ];
        }
        $fakePosts = [];
        for ($i = 0; $i < $numBeeps; $i++) {
            $fakePosts[] = [
                'account' => $faker->numberBetween(1, $maxAccountId),
                'body' => $faker->realText($faker->numberBetween(...$postLength)),
                'created' => $cr = $faker->dateTimeBetween($ago)->format($dbFormat),
                'public' => $faker->boolean,
                'published' => $faker->boolean ? $faker->dateTimeBetween($cr)->format($dbFormat) : null,
                'updated' => $faker->boolean ? $faker->dateTimeBetween($cr)->format($dbFormat) : null,
            ];
        }

        $this->table('accounts')->insert($fakeAccounts)->saveData();
        $this->table('beeps')->insert($fakePosts)->saveData();
    }
}
