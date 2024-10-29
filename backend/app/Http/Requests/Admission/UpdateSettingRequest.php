<?php

namespace App\Http\Requests\Admission;

use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;

class UpdateSettingRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return false;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, ValidationRule|array|string>
     */
    public function rules(): array
    {
        return [
            'institution' => 'required|string',
            'name' => 'required|string',
            'alias' => 'required|string',
            'year' => 'required|integer',
            'brochure' => 'nullable|mimes:pdf|max:2048',
            'status' => 'required|string',
            'youtube' => 'nullable|string',
        ];
    }

    public function attributes(): array
    {
        return [
            'institution' => 'Instansi',
            'name' => 'Nama Aplikasi',
            'alias' => 'Nama Singkatan',
            'year' => 'Tahun Pelajaran',
            'brochure' => 'Brosur Pendaftaran',
            'status' => 'Status Pendaftaran',
            'youtube' => 'Link Tutorial',
        ];
    }
}
