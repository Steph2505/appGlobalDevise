<?php

namespace App\Http\Controllers;

use App\Repositories\DevisRepository;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Validator;

class DevisController extends Controller
{
    protected $devisRepository;
    public function __construct(DevisRepository $devisRepository) {
        $this->devisRepository = $devisRepository;
    }

    public function index()
    {
        try {
            $devis = $this->devisRepository->getAll();

            return response()->json([
                'success' => true,
                'data'    => $devis,
                'message' => 'Liste des devis récupérée avec succès',
            ]);
        } catch (Exception $e) {
            Log::error('Erreur liste devis : ' . $e->getMessage());

            return response()->json([
                'success' => false,
                'message' => 'Erreur lors de la récupération des devis',
            ], 500);
        }
    }

    public function store(Request $request)
    {
        try {
            $validator = Validator::make($request->all(), [
                'client_id' => 'required|exists:customers,id',
                'status' => 'required|in:Drafts,Validated',
                'montant_total' => 'required|numeric|min:0',
                'lignes' => 'required|array|min:1',
                'lignes.*.intitule' => 'required|string|max:500',
                'lignes.*.quantite' => 'required|numeric|min:0',
                'lignes.*.prix_unitaire' => 'required|numeric|min:0',
                'lignes.*.total' => 'required|numeric|min:0',
            ]);

            if ($validator->fails()) {
                return response()->json([
                    'success' => false,
                    'message' => 'Validation échouée',
                    'errors'  => $validator->errors(),
                ], 422);
            }

            $devis = $this->devisRepository->createWithLignes(
                [
                    'client_id' => $request->client_id,
                    'user_id' => auth()->id(),
                    'status' => $request->status,
                    'montant_total' => $request->montant_total,
                    'currency' => $request->currency,
                ],
                $request->lignes
            );

            return response()->json([
                'success' => true,
                'data'=> $devis,
                'message' => 'Devis créé avec succès',
            ], 201);
        } catch (Exception $e) {
            Log::error('Erreur création devis : ' . $e->getMessage());

            return response()->json([
                'success' => false,
                'message' => 'Erreur lors de la création du devis',
            ], 500);
        }
    }

    public function show(int $id)
    {
        try {
            $devis = $this->devisRepository->findById($id);

            return response()->json([
                'success'=> true,
                'data' => $devis,
                'message' => 'Devis récupéré avec succès',
            ]);
        } catch (Exception $e) {
            Log::error('Erreur récupération devis #' . $id . ' : ' . $e->getMessage());

            return response()->json([
                'success' => false,
                'message' => 'Devis introuvable',
            ], 404);
        }
    }

    public function update(Request $request, int $id)
    {
        try {
            $validator = Validator::make($request->all(), [
                'client_id' => 'required|exists:customers,id',
                'status' => 'required|in:Drafts,Validated',
                'montant_total' => 'required|numeric|min:0',
                'lignes' => 'required|array|min:1',
                'lignes.*.intitule' => 'required|string|max:500',
                'lignes.*.quantite' => 'required|numeric|min:0',
                'lignes.*.prix_unitaire' => 'required|numeric|min:0',
                'lignes.*.total'         => 'required|numeric|min:0',
            ]);

            if ($validator->fails()) {
                return response()->json([
                    'success' => false,
                    'message' => 'Validation échouée',
                    'errors'  => $validator->errors(),
                ], 422);
            }

            $devis = $this->devisRepository->updateWithLignes(
                $id,
                [
                    'client_id'=> $request->client_id,
                    'status' => $request->status,
                    'montant_total' => $request->montant_total,
                    'currency' => $request->currency,
                ],
                $request->lignes
            );

            return response()->json([
                'success' => true,
                'data' => $devis,
                'message' => 'Devis mis à jour avec succès',
            ]);
        } catch (Exception $e) {
            Log::error('Erreur mise à jour devis #' . $id . ' : ' . $e->getMessage());

            return response()->json([
                'success' => false,
                'message' => 'Erreur lors de la mise à jour du devis',
            ], 500);
        }
    }

    public function destroy(int $id)
    {
        try {
            $this->devisRepository->deleteById($id);

            return response()->json([
                'success' => true,
                'message' => 'Devis supprimé avec succès',
            ]);
        } catch (Exception $e) {
            Log::error('Erreur suppression devis #' . $id . ' : ' . $e->getMessage());

            return response()->json([
                'success' => false,
                'message' => 'Erreur lors de la suppression du devis',
            ], 500);
        }
    }
}
