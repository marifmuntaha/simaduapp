<?php

namespace App\Http\Requests;

use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;

class StoreMajorRequest extends FormRequest
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
            'ladder_id' => 'required',
            'name' => 'required|string',
            'alias' => 'required|string',
            'description' => 'nullable|string',
        ];
    }

    public function attributes(): array
    {
        return [
            'ladder_id' => 'Jenjang',
            'name' => 'Nama',
            'alias' => 'Singkatan',
            'description' => 'Diskripsi',
        ];
    }
}
