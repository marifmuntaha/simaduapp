<?php

namespace App\Http\Requests;

use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;

class StoreProgramRequest extends FormRequest
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
            'institution_id' => 'required',
            'year_id' => 'required',
            'name' => 'required|string',
            'alias' => 'required|string',
            'description' => 'nullable|string',
            'boarding' => 'required|string',
        ];
    }

    public function attributes(): array
    {
        return [
            'institution_id' => 'Lembaga',
            'year_id' => 'Tahun Ajaran',
            'name' => 'Nama Program',
            'alias' => 'Singkatan',
            'description' => 'Diskripsi',
            'boarding' => 'Boarding',
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
