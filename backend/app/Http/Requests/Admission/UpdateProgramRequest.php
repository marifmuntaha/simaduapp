<?php

namespace App\Http\Requests\Admission;

use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;

class UpdateProgramRequest extends FormRequest
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
            'id' => 'required|int',
            'institution_id' => ['required', 'exists:institutions,id'],
            'year_id' => ['required', 'exists:years,id'],
            'name' => ['required', 'string'],
            'alias' => ['required', 'string'],
            'description' => ['required', 'string'],
        ];
    }

    public function attributes(): array
    {
        return [
            'id' => 'ID',
            'institution_id' => 'Institusi',
            'year_id' => 'Tahun Pelajaran',
            'name' => 'Nama Program',
            'alias' => 'Nama Singkatan',
            'description' => 'Deskripsi Program',
        ];
    }
}
