<?php

namespace App\Http\Requests;

use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;

class UpdateUserRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, ValidationRule|array|string>
     */
    public function rules(): array
    {
        return [
            'fullname' => 'required|string',
            'email' => 'required|string|email',
            'username' => 'required|string',
            'password' => 'nullable|string',
            'role' => 'required|string',
            'phone' => 'required|string',
            'image' => 'nullable|string',
        ];
    }

    public function attributes(): array
    {
        return [
            'fullname' => 'Nama Lengkap',
            'email' => 'Alamat Email',
            'username' => 'Nama Pengguna',
            'password' => 'Kata Sandi',
            'role' => 'Hak Akses',
            'phone' => 'Nomor Telepon',
            'image' => 'Gambar',
        ];
    }
}
