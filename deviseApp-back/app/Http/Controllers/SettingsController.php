<?php

namespace App\Http\Controllers;

use App\Repositories\SettingsRepository;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Validator;

class SettingsController extends Controller
{
    protected SettingsRepository $repo;

    public function __construct(SettingsRepository $repo)
    {
        $this->repo = $repo;
    }

    public function show()
    {
        try {
            return response()->json([
                'success' => true,
                'data'    => $this->repo->get(),
            ]);
        } catch (Exception $e) {
            Log::error('Settings get: ' . $e->getMessage());
            return response()->json(['success' => false, 'message' => 'Erreur serveur'], 500);
        }
    }

    public function update(Request $request)
    {
        try {
            $validator = Validator::make($request->all(), [
                'name'     => 'required|string|max:255',
                'address'  => 'nullable|string|max:500',
                'phone'    => 'nullable|string|max:50',
                'email'    => 'nullable|email|max:255',
                'website'  => 'nullable|string|max:255',
                'siret'    => 'nullable|string|max:100',
                'logo'     => 'nullable|string|max:500',
                'footer'   => 'nullable|string|max:1000',
            ]);

            if ($validator->fails()) {
                return response()->json([
                    'success' => false,
                    'message' => 'Validation échouée',
                    'errors'  => $validator->errors(),
                ], 422);
            }

            $settings = $this->repo->update($validator->validated());

            return response()->json([
                'success' => true,
                'data'    => $settings,
                'message' => 'Paramètres mis à jour',
            ]);
        } catch (Exception $e) {
            Log::error('Settings update: ' . $e->getMessage());
            return response()->json(['success' => false, 'message' => 'Erreur serveur'], 500);
        }
    }
}
