<?php

namespace App\Http\Requests;

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
            'nism' => 'required|string',
            'nisn' => 'required|string',
            'nik' => 'required|string',
            'name' => 'required|string',
            'birthplace' => 'required|string',
            'birthdate' => 'required|date',
            'gender' => 'required|string',
            'orderborn' => 'required|string',
            'sibling' => 'required|string',
            'phone' => 'required|string',
            'email' => 'required|string',
            'province_id' => 'required|string',
            'city_id' => 'required|string',
            'district_id' => 'required|string',
            'village_id' => 'required|string',
            'address' => 'required|string',
            'boarding' => 'required|string',
            'onevervalpd' => 'required|string',
            'father_name' => 'required|string',
            'mother_name' => 'required|string',
            'guard_nik' => 'required|string',
            'guard_email' => 'required|string',
            'guard_phone' => 'required|string',
            'guard_name' => 'required|string',
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
