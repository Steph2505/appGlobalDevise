<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Facades\Log;

return new class extends Migration
{
    public function up(): void
    {
        if (Schema::hasTable('customers')) {
            Log::warning('Migration customers ignorée : table déjà existante');
            return;
        }

        Schema::create('customers', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('email')->unique();
            $table->string('phone')->nullable();
            $table->string('address')->nullable();
            $table->timestamps();
        });

        Log::info('Table customers créée avec succès.');
    }

    public function down(): void
    {
        Schema::dropIfExists('customers');
    }
};
