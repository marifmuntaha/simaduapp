<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreUserRequest;
use App\Http\Requests\UpdateUserRequest;
use App\Http\Resources\UserResource;
use App\Models\User;
use Exception;
use Illuminate\Http\Request;

class UserController extends Controller
{
    public function index(Request $request)
    {
        $users = new User();
        $users = $request->has('role') ? $users->whereRole($request->role) : $users;
        return response([
            'success' => true,
            'message' => null,
            'result' => UserResource::collection($users->get())
        ]);
    }

    public function store(StoreUserRequest $request)
    {
        try {
            if ($user = User::create($request->all())) {
                $user->institution()->sync($request->institution_id);
                return response([
                    'success' => true,
                    'message' => 'Pengguna berhasil ditambahkan',
                    'result' => new UserResource($user)
                ], 201);
            }
            else {
                throw new Exception("Gagal menyimpan pengguna");
            }
        } catch (Exception $exception){
            return response([
                'success' => false,
                'message' => $exception->getMessage(),
                'result' => null
            ], 422);
        }
    }
    public function show(User $user)
    {
        return response([
            'success' => true,
            'message' => null,
            'result' => new UserResource($user)
        ]);
    }

    public function update(UpdateUserRequest $request, User $user)
    {
        try {
            return $user->update(array_filter($request->all()))
                ? response([
                    'success' => true,
                    'message' => 'Pengguna berhasil diubah',
                    'result' => new UserResource($user)
                ]) : throw new Exception("Gagal mengubah pengguna");
        } catch (Exception $exception){
            return response([
                'success' => false,
                'message' => $exception->getMessage(),
                'result' => null
            ], 422);
        }
    }

    public function destroy(User $user)
    {
        try {
            return $user->delete()
                ? response([
                    'success' => true,
                    'message' => 'Pengguna berhasil dihapus',
                    'result' => new UserResource($user)
                ]) : throw new Exception("Gagal menghapus pengguna");
        } catch (Exception $exception){
            return response([
                'success' => false,
                'message' => $exception->getMessage(),
                'result' => null
            ], 422);
        }
    }
}
