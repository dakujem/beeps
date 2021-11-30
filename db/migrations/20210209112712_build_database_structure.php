<?php

declare(strict_types=1);

use Phinx\Migration\AbstractMigration;

final class BuildDatabaseStructure extends AbstractMigration
{
    /**
     * Change Method.
     *
     * More information on writing migrations is available here:
     * https://book.cakephp.org/phinx/0/en/migrations.html#the-change-method
     *
     * Remember to call "create()" or "update()" and NOT "save()" when working
     * with the Table class.
     */
    public function change(): void
    {
        // TODO this should not be needed...
        if ($this->hasTable('beeps')) {
            $this->table('beeps')->drop()->save();
        }
        if ($this->hasTable('accounts')) {
            $this->table('accounts')->drop()->save();
        }

        $tableOptions = ['collation' => 'utf8mb4_unicode_ci'];

        $this
            ->table('accounts', $tableOptions)
            ->addColumn('email', 'string', ['limit' => 255,])
            ->addColumn('created', 'datetime')
            ->addIndex('email', [
                'unique' => true,
                'name' => 'idx_accounts_email',
            ])
            ->create();

        $this
            ->table('beeps', $tableOptions)
            ->addColumn('account', 'integer')
            ->addColumn('public', 'boolean', ['default' => false,])
            ->addColumn('published', 'datetime', ['null' => true, 'default' => null,])
            ->addColumn('body', 'text')
            ->addColumn('created', 'datetime')
            ->addColumn('updated', 'datetime', ['null' => true])
            ->addIndex('public', ['name' => 'idx_beeps_public',])
            ->addIndex('published', ['name' => 'idx_beeps_published',])
            ->addIndex('created', ['name' => 'idx_beeps_created',])
            ->addIndex('updated', ['name' => 'idx_beeps_updated',])
            ->addForeignKey('account', 'accounts', 'id', ['delete' => 'CASCADE', 'update' => 'CASCADE',])
            ->create();
    }
}
