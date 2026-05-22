<?php

namespace App\Http\Controllers;

use App\Repositories\AuthRepository;
use Illuminate\Http\Request;

class AuthController extends Controller
{
    protected $authRepository;

    public function __construct(AuthRepository $authRepository)
    {
        $this->authRepository = $authRepository;
    }


    public function login(Request $request)
    {
        return $this->authRepository->login($request);
    }

    public function me(Request $request)
    {
        return response()->json([
            'success' => true,
            'data'    => $request->user()->load('accessRights'),
        ]);
    }

    public function logout(Request $request)
    {
        return $this->authRepository->logout($request);
    }

}