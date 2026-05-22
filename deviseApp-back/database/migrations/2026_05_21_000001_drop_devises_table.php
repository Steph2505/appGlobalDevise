<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Facades\Log;

return new class extends Migration
{
    public function up(): void
    {
        if (Schema::hasTable('devises')) {
            Schema::dropIfExists('devises');
            Log::info('Table devises supprimée.');
        }
    }

    public function down(): void
    {
        Log::warning('Rollback drop_devises.');
    }
};
