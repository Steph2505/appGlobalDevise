<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Facades\Log;

return new class extends Migration
{
    public function up(): void
    {
        if (Schema::hasTable('ligne_devis')) {
            Log::warning('Migration ligne_devis ignorée : table déjà existante.');
            return;
        }

        Schema::create('ligne_devis', function (Blueprint $table) {
            $table->id();
            $table->foreignId('devis_id')->constrained('devis')->onDelete('cascade');
            $table->string('intitule');
            $table->unsignedInteger('quantite')->default(1);
            $table->decimal('prix_unitaire', 15, 2)->default(0);
            $table->decimal('total', 15, 2)->default(0);
            $table->timestamps();
        });

        Log::info('Table ligne_devis créée avec succès.');
    }

    public function down(): void
    {
        Schema::dropIfExists('ligne_devis');
    }
};
