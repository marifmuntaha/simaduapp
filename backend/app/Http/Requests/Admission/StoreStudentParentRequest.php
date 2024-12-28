<?php

namespace App\Http\Requests\Admission;

use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Arr;

class StoreStudentParentRequest extends FormRequest
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
        $rules = [
            'user_id' => 'required',
            'student_id' => 'required',
            'number_kk' => 'required',
            'head_family' => 'required',
            'guard_status' => 'required',
            'guard_name' => 'required',
            'guard_nik' => 'required',
            'guard_birthplace' => 'required',
            'guard_birthdate' => 'required',
            'guard_email' => 'required',
            'guard_phone' => 'required',
        ];

        if ($this->input('father_status') === '1') {
            $rules = array_merge($rules, [
                'father_status' => 'required',
                'father_name' => 'required',
                'father_nik' => 'required',
                'father_birthplace' => 'required',
                'father_birthdate' => 'required',
                'father_email' => 'required',
                'father_phone' => 'required',
            ]);
        }
        if ($this->input('mother_status') === '1') {
            $rules = array_merge($rules, [
                'mother_status' => 'required',
                'mother_name' => 'required',
                'mother_nik' => 'required',
                'mother_birthplace' => 'required',
                'mother_birthdate' => 'required',
                'mother_email' => 'required',
                'mother_phone' => 'required',
            ]);
        }
        return $rules;
    }

    public function attributes(): array
    {
        return [
            'user_id' => 'ID Pengguna',
            'student_id' => 'ID Siswa',
            'number_kk' => 'Nomor Kartu Keluarga',
            'head_family' => 'Kepala Keluarga',
            'father_status' => 'Status Ayah Kandung',
            'father_name' => 'Nama Ayah Kandung',
            'father_nik' => 'NIK Ayah Kandung',
            'father_birthplace' => 'Tempat Lahir Ayah Kandung',
            'father_birthdate' => 'Tanggal Lahir Ayah Kandung',
            'father_email' => 'Alamat Email Ayah Kandung',
            'father_phone' => 'Nomor WA Ayah Kandung',
            'mother_status' => 'Status Ibu Kandung',
            'mother_name' => 'Nama Ibu Kandung',
            'mother_nik' => 'NIK Ibu Kandung',
            'mother_birthplace' => 'Tempat Lahir Ibu Kandung',
            'mother_birthdate' => 'Tanggal Lahir Ibu Kandung',
            'mother_email' => 'Alamat Email Ibu Kandung',
            'mother_phone' => 'Nomor WA Ibu Kandung',
            'guard_status' => 'Status Wali',
            'guard_name' => 'Nama Wali',
            'guard_nik' => 'NIK Wali',
            'guard_birthplace' => 'Tempat Lahir Wali',
            'guard_birthdate' => 'Tanggal Lahir Wali',
            'guard_email' => 'Alamat Email Wali',
            'guard_phone' => 'Nomor WA Wali',
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
