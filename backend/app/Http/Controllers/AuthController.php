<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreLoginRequest;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Arr;
use Illuminate\Support\Facades\Auth;

class AuthController extends Controller
{
    public function login(StoreLoginRequest $request)
    {
        try {
            if (Auth::attempt(['username' => $request->username, 'password' => $request->password])) {
                $user = $request->user();
                $ability =  json_decode($user->ability);
                $role = json_decode($request->role);
                if ($user->role == '1') {
                    return response([
                        'status' => true,
                        'message' => 'Berhasil masuk, anda akan dialihkan dalam 2 detik',
                        'result' => Arr::collapse([$user->toArray(), [
                            'token' => $user->createToken($request->username)->plainTextToken,
                        ]])
                    ]);
                }
                else {
                    $institution = $user->institution()->first();
                    if (in_array($request->ability, $ability)
                        && in_array($user->role, $role)
                        && ((int) $institution->id === (int) $request->institution)) {
                        return response([
                            'status' => true,
                            'message' => 'Berhasil masuk, anda akan dialihkan dalam 2 detik',
                            'result' => Arr::collapse([$user->toArray(), [
                                'token' => $user->createToken($request->username)->plainTextToken,
                            ]])
                        ]);
                    }
                    else {
                        return throw new Exception('Akses Ditolak', 403);
                    }
                }
            } else {
                throw new Exception('Nama Pengguna atau sandi salah', 401);
            }
        } catch (Exception $exception) {
            return response([
                'status' => false,
                'message' => $exception->getMessage(),
                'result' => null
            ], $exception->getCode());
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
        } catch (Exception $exception) {
            return response([
                'status' => false,
                'message' => $exception->getMessage(),
                'result' => null
            ], 422);
        }
    }

}
