<?php

namespace App\Http\Requests;

use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;

class UpdateInstitutionRequest extends FormRequest
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
            'ladder_id' => 'required',
            'name' => 'required|string',
            'alias' => 'required|string',
            'nsm' => 'required|string',
            'npsn' => 'required|string',
            'headmaster' => 'required|string',
            'logo' => 'nullable|string',
        ];
    }

    public function attributes(): array
    {
        return [
            'user_id' => 'Operator',
            'ladder_id' => 'Jenjang',
            'name' => 'Nama Madrasah',
            'alias' => 'Singkatan',
            'nsm' => 'NSM',
            'npsn' => 'NPSN',
            'headmaster' => 'Kepala Madrasah',
            'logo' => 'Logo',
        ];
    }

    public function prepareForValidation()
    {
        return $this->merge([
            'updater' => $this->user('sanctum')->id,
        ]);
    }
}
