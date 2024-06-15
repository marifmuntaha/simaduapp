<?php

namespace App\Http\Controllers;

use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Arr;
use Illuminate\Support\Facades\Auth;

class AuthController extends Controller
{
    public function login(Request $request)
    {
        $auth = match ($request->type) {
            1 => Auth::guard('root'),
            2 => Auth::guard('employee'),
            default => Auth::guard('web'),
        };
        try {
            return $auth->attempt($request->only('username', 'password'))
                ? response([
                    'status' => true,
                    'message' => 'Berhasil masuk, anda akan dialihkan dalam 2 detik',
                    'result' => Arr::add($request->user(), 'token', $request->user()->createToken($request->username)->plainTextToken)
                ]) : throw new Exception("Nama Pengguna atau Kata Sandi Salah");
        } catch (Exception $exception) {
            return response([
                'status' => false,
                'message' => $exception->getMessage(),
                'result' => null
            ], 422);
        }
    }

    public function logout(Request $request)
    {
        try {
            return $request->user('sanctum')->currentAccessToken()->delete()
                ? response([
                    'status' => true,
                    'message' => 'Berhasil keluar',
                    'result' => null
                ]) : throw new Exception("Terjadi kesalahan server");
        } catch (Exception $exception){
            return response([
                'status' => false,
                'message' => $exception->getMessage(),
                'result' => null
            ], 422);
        }
    }

    public function resetPassword(Request $request)
    {

    }

    public function changePassword(Request $request)
    {

    }
}
