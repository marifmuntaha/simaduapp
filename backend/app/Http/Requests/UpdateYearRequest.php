<?php

namespace App\Http\Requests;

use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;

class UpdateYearRequest extends FormRequest
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
            'institution_id' => 'required|integer',
            'name' => 'required|string',
            'active' => 'nullable|string',
            'description' => 'nullable|string',
        ];
    }

    public function attributes(): array
    {
        return [
            'institution_id' => 'Lembaga',
            'name' => 'Nama Tahun',
            'active' => 'Status',
            'description' => 'Diskripsi',
        ];
    }
}
