<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class LigneDevis extends Model
{
    use HasFactory;

    protected $table = 'ligne_devis';

    protected $fillable = ['devis_id', 'intitule', 'quantite', 'prix_unitaire', 'total'];

    protected $casts = [
        'quantite'      => 'integer',
        'prix_unitaire' => 'decimal:2',
        'total'         => 'decimal:2',
    ];

    public function devis(): BelongsTo
    {
        return $this->belongsTo(Devis::class);
    }
}
