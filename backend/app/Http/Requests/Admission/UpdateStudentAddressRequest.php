<?php

namespace App\Http\Requests\Admission;

use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;

class UpdateStudentAddressRequest extends FormRequest
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
            'id' => 'required',
            'province_id' => 'required',
            'district_id' => 'required',
            'subdistrict_id' => 'required',
            'village_id' => 'required',
            'address' => 'required',
        ];
    }

    public function attributes(): array
    {
        return [
            'id' => 'ID Siswa',
            'province_id' => 'Provinsi',
            'district_id' => 'Kabupaten/Kota',
            'subdistrict_id' => 'Kecamatan',
            'village_id' => 'Desa/Kelurahan',
            'address' => 'Jalan',
        ];
    }

    public function prepareForValidation()
    {
        return $this->merge([
            'updater' => $this->user('sanctum')->id,
        ]);
    }
}
