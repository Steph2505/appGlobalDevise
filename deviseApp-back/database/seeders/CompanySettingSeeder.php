<?php

namespace Database\Seeders;

use App\Models\CompanySetting;
use Illuminate\Database\Seeder;

class CompanySettingSeeder extends Seeder
{
    public function run(): void
    {
        if (CompanySetting::exists()) {
            return;
        }

        CompanySetting::create([
            'name'    => 'My Entreprise',
            'address' => 'Cameroun, Yaoundé',
            'phone'   => '+237 6XX XXX XXX',
            'email'   => 'contact@monentreprise.cm',
            'website' => 'www.monentreprise.cm',
            'siret'   => 'RC/DLA/2024/B/XXXXX',
            'logo'    => '',
            'footer'  => 'Quote valid for 30 days from the date of issue.',
        ]);
    }
}
