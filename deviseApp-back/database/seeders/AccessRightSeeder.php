<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Log;
use Exception;
use App\Models\User;
use App\Models\Profil;
use App\Models\AccessRight;
use App\Models\UserAccessRight;

class AccessRightSeeder extends Seeder
{

    public function run(): void
    {
        try {
            $rights = [
                $this->createAccessRight('create_devis', 'Droit de créer des devis'),
                $this->createAccessRight('update_devis', 'Droit de modifier les devis'),
                $this->createAccessRight('show_devis', 'Droit de visualiser les devis'),
                $this->createAccessRight('delete_devis', 'Droit de supprimer les devis'),
                $this->createAccessRight('index_customer', 'Droit de visualiser la liste des clients'),
                $this->createAccessRight('create_customer', 'Droit de créer des clients'),
                $this->createAccessRight('update_customer', 'Droit de modifier les clients'),
                $this->createAccessRight('show_customer', 'Droit de visualiser les clients'),
                $this->createAccessRight('delete_customer', 'Droit de supprimer les clients'),
                $this->createAccessRight('gestion_user', 'Droit de gérer les utilisateurs'),
            ];

            $superAdminProfil = Profil::where('name', 'Super Admin')->first();

            if (!$superAdminProfil) {
                throw new Exception('Profil Super Admin introuvable');
            }

            $superAdmins = User::where('profil_id', $superAdminProfil->id)->get();

            foreach ($superAdmins as $user) {
                foreach ($rights as $right) {
                    $this->assignAccessRight($user->id, $right->id);
                }
            }

        } catch (Exception $e) {
            Log::error('Erreur dans AccessRightSeeder: ' . $e->getMessage(), [
                'file' => $e->getFile(),
                'line' => $e->getLine(),
            ]);

            throw $e;
        }
    }

    private function createAccessRight($name, $description)
    {
        try {
            return AccessRight::firstOrCreate(
                ['name' => $name],
                ['description' => $description]
            );
        } catch (Exception $e) {
            Log::error("erreur creation des droits {$name}: " . $e->getMessage());
            throw $e;
        }
    }

    private function assignAccessRight($userId, $accessRightId)
    {
        try {
            UserAccessRight::firstOrCreate([
                'user_id' => $userId,
                'access_right_id' => $accessRightId,
            ]);

        } catch (Exception $e) {
            Log::error("Erreur lors de l'assignation du droit {$accessRightId} à l'utilisateur {$userId}: " . $e->getMessage());
            throw $e;
        }
    }
}