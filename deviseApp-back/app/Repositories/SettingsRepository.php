<?php

namespace App\Repositories;

use App\Models\CompanySetting;

class SettingsRepository
{
    public function get(): CompanySetting
    {
        $settings = CompanySetting::first();

        if (!$settings) {
            $settings = CompanySetting::create(['name' => '']);
        }

        return $settings;
    }

    public function update(array $data): CompanySetting
    {
        $settings = CompanySetting::first();

        if ($settings) {
            $settings->update($data);
        } else {
            $settings = CompanySetting::create($data);
        }

        return $settings->fresh();
    }
}
