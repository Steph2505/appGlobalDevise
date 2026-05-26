<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\CustomerController;
use App\Http\Controllers\DevisController;
use App\Http\Controllers\SettingsController;
use App\Http\Controllers\UserController;
use Illuminate\Support\Facades\Route;

// Routes publiques
Route::post('/login', [AuthController::class, 'login']);

Route::middleware('auth:sanctum')->group(function () {

    // Auth
    Route::get('/auth/me',      [AuthController::class, 'me']);
    Route::post('/auth/logout', [AuthController::class, 'logout']);

    // Devis
    Route::prefix('devis')->group(function () {
        Route::get('/',        [DevisController::class, 'index']);
        Route::post('/',       [DevisController::class, 'store']);
        Route::get('/{id}',    [DevisController::class, 'show']);
        Route::put('/{id}',    [DevisController::class, 'update']);
        Route::delete('/{id}', [DevisController::class, 'destroy']);
    });

    // Clients
    Route::prefix('customers')->group(function () {
        Route::get('/',        [CustomerController::class, 'index']);
        Route::post('/store',  [CustomerController::class, 'store']);
        Route::get('/{id}',    [CustomerController::class, 'show']);
        Route::put('/{id}',    [CustomerController::class, 'update']);
        Route::delete('/{id}', [CustomerController::class, 'destroy']);
    });

    // Paramètres entreprise
    Route::get('/settings',  [SettingsController::class, 'show']);
    Route::put('/settings',  [SettingsController::class, 'update']);

    // Utilisateurs
    Route::prefix('users')->group(function () {
        Route::get('/',          [UserController::class, 'index']);
        Route::post('/',         [UserController::class, 'store']);
        Route::get('/create',    [UserController::class, 'create']);
        Route::get('/{user}',    [UserController::class, 'show']);
        Route::put('/{user}',    [UserController::class, 'update']);
        Route::delete('/{user}', [UserController::class, 'destroy']);
    });

});
