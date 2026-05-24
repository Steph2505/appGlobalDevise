<?php

namespace App\Repositories;

use App\Models\Devis;
use Illuminate\Support\Facades\DB;

class DevisRepository extends ResourceRepository
{
    public function __construct(Devis $model)
    {
        $this->model = $model;
    }

    public function getAll()
    {
        return $this->model->with(['client'])->latest()->get();
    }

    public function findById(int $id)
    {
        return $this->model->with(['client', 'lignes'])->findOrFail($id);
    }

    public function createWithLignes(array $data, array $lignes)
    {
        return DB::transaction(function () use ($data, $lignes) {
            $devis = $this->model->create($data);

            $devis->reference = 'REF-' . date('Y-m-d') . '-' . str_pad($devis->id, 4, '0', STR_PAD_LEFT);
            $devis->save();

            foreach ($lignes as $ligne) {
                $devis->lignes()->create($ligne);
            }

            return $devis->load(['client', 'lignes']);
        });
    }

    public function updateWithLignes(int $id, array $data, array $lignes)
    {
        return DB::transaction(function () use ($id, $data, $lignes) {
            $devis = $this->model->findOrFail($id);
            $devis->update($data);

            // Remplace toutes les lignes existantes
            $devis->lignes()->delete();
            foreach ($lignes as $ligne) {
                $devis->lignes()->create($ligne);
            }

            return $devis->load(['client', 'lignes']);
        });
    }

    public function deleteById(int $id): void
    {
        // Les lignes sont supprimées en cascade via la contrainte FK
        $this->model->findOrFail($id)->delete();
    }
}
