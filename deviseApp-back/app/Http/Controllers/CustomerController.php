<?php

namespace App\Http\Controllers;

use App\Repositories\CustomerRepository;
use Exception;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Validator;

class CustomerController extends Controller
{
    protected $customerRepository;
    public function __construct(CustomerRepository $customerRepository) {
        $this->customerRepository = $customerRepository;
    }

    public function index()
    {
        try {
            $customers = $this->customerRepository->getAll();

            return response()->json([
                'success' => true,
                'data'=> $customers,
                'message' => 'Liste des clients récupérée avec succès',
            ]);
        } catch (Exception $e) {
            Log::error('Erreur liste clients : ' . $e->getMessage());

            return response()->json([
                'success' => false,
                'message' => 'Erreur lors de la récupération des clients',
            ], 500);
        }
    }

    public function store(Request $request)
    {
        try {
            $validator = Validator::make($request->all(), [
                'name' => 'required|string|max:255',
                'email' => 'required|email|unique:customers,email',
                'phone' => 'nullable|string|max:30',
                'address'=> 'nullable|string|max:500',
            ]);

            if ($validator->fails()) {
                return response()->json([
                    'success' => false,
                    'message' => 'Validation échouée',
                    'errors'=> $validator->errors(),
                ], 422);
            }

            $customer = $this->customerRepository->store($validator->validated());

            return response()->json([
                'success' => true,
                'data'=> $customer,
                'message' => 'Client créé avec succès',
            ], 201);
        } catch (Exception $e) {
            Log::error('Erreur création client : ' . $e->getMessage());

            return response()->json([
                'success' => false,
                'message' => 'Erreur lors de la création du client',
            ], 500);
        }
    }

    public function show(int $id)
    {
        try {
            $customer = $this->customerRepository->findById($id);

            return response()->json([
                'success' => true,
                'data'=> $customer,
                'message' => 'Client récupéré avec succès',
            ]);
        } catch (Exception $e) {
            Log::error('Erreur récupération client #' . $id . ' : ' . $e->getMessage());

            return response()->json([
                'success' => false,
                'message' => 'Client introuvable',
            ], 404);
        }
    }

    public function update(Request $request, int $id)
    {
        try {
            $validator = Validator::make($request->all(), [
                'name'    => 'required|string|max:255',
                'email'   => 'required|email|unique:customers,email,' . $id,
                'phone'   => 'nullable|string|max:30',
                'address' => 'nullable|string|max:500',
            ]);

            if ($validator->fails()) {
                return response()->json([
                    'success' => false,
                    'message' => 'Validation échouée',
                    'errors'  => $validator->errors(),
                ], 422);
            }

            $this->customerRepository->update($id, $validator->validated());
            $customer = $this->customerRepository->findById($id);

            return response()->json([
                'success' => true,
                'data' => $customer,
                'message' => 'Client mis à jour avec succès',
            ]);
        } catch (Exception $e) {
            Log::error('Erreur mise à jour client #' . $id . ' : ' . $e->getMessage());

            return response()->json([
                'success' => false,
                'message' => 'Erreur lors de la mise à jour du client',
            ], 500);
        }
    }

    public function destroy(int $id)
    {
        try {
            $this->customerRepository->destroy($id);

            return response()->json([
                'success' => true,
                'message' => 'Client supprimé avec succès',
            ]);
        } catch (Exception $e) {
            Log::error('Erreur suppression client #' . $id . ' : ' . $e->getMessage());

            return response()->json([
                'success' => false,
                'message' => 'Erreur lors de la suppression du client',
            ], 500);
        }
    }
}
