<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('ligne_devis', function (Blueprint $table) {
            $table->float('quantite')->default(1)->unsigned()->change();
        });
    }

    public function down(): void
    {
        Schema::table('ligne_devis', function (Blueprint $table) {
            $table->unsignedInteger('quantite')->default(1)->change();
        });
    }
};
