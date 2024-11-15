<?php

namespace App\Http\Requests\Admission;

use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Facades\Auth;

class UpdateSettingRequest extends FormRequest
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
            'institution_id' => 'required|string',
            'name' => 'required|string',
            'alias' => 'required|string',
            'year_id' => 'required|integer',
            'brochure' => 'nullable|mimes:pdf|max:2048',
            'status' => 'required|string',
            'youtube' => 'nullable|string',
        ];
    }

    public function attributes(): array
    {
        return [
            'institution_id' => 'Instansi',
            'name' => 'Nama Aplikasi',
            'alias' => 'Nama Singkatan',
            'year_id' => 'Tahun Pelajaran',
            'brochure' => 'Brosur Pendaftaran',
            'status' => 'Status Pendaftaran',
            'youtube' => 'Link Tutorial',
        ];
    }

    public function prepareForValidation()
    {
        return $this->merge(['updated_by' => Auth::guard('sanctum')->user()->id]);
    }
}
