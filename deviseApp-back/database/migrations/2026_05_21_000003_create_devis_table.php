<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Facades\Log;

return new class extends Migration
{
    public function up(): void
    {
        if (Schema::hasTable('devis')) {
            Log::warning('Migration devis ignorée : table déjà existante.');
            return;
        }

        Schema::create('devis', function (Blueprint $table) {
            $table->id();
            $table->string('reference')->unique()->nullable();
            $table->foreignId('client_id')->constrained('customers')->onDelete('cascade');
            $table->foreignId('user_id')->nullable()->constrained('users')->onDelete('set null');
            $table->enum('status', ['Drafts', 'Validated'])->default('Drafts');
            $table->decimal('montant_total', 15, 2)->default(0);
            $table->timestamps();
        });

        Log::info('Table devis créée avec succès.');
    }

    public function down(): void
    {
        Schema::dropIfExists('devis');
    }
};
