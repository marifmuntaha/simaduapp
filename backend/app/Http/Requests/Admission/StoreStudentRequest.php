<?php

namespace App\Http\Requests\Admission;

use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;

class StoreStudentRequest extends FormRequest
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
            'user_id' => 'required',
            'institution_id' => 'required',
            'year_id' => 'required',
            'nisn' => 'required|unique:admission_students,nisn',
            'nik' => 'required|unique:admission_students,nik',
            'name' => 'required',
            'birthplace' => 'required',
            'birthdate' => 'required',
            'gender' => 'required',
            'orderborn' => 'required',
            'sibling' => 'required',
            'phone' => 'required',
            'email' => 'nullable',
        ];
    }

    public function attributes(): array
    {
        return [
            'user_id' => 'ID Pengguna',
            'institution_id' => 'ID Lembaga',
            'year_id' => 'ID Tahun Aktif',
            'nisn' => 'NISN',
            'nik' => 'NIK',
            'name' => 'Nama Lengkap',
            'birthplace' => 'Tempat Lahir',
            'birthdate' => 'Tanggal Lahir',
            'gender' => 'Jenis Kelamin',
            'orderborn' => 'Anak Ke',
            'sibling' => 'Jumlah Saudara',
            'phone' => 'Nomor Whatsapp',
            'email' => 'alamat Email',
        ];
    }

    public function prepareForValidation()
    {
        return $this->merge([
            'creator' => $this->user('sanctum')->id,
            'updater' => $this->user('sanctum')->id,
        ]);
    }
}
