<?php

namespace App\Http\Requests\Admission;

use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;

class UpdateFileRequest extends FormRequest
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
            'institution_id' => 'required',
            'year_id' => 'required',
            'name' => 'required',
            'alias' => 'required',
            'status' => 'required',
        ];
    }

    public function attributes(): array
    {
        return [
            'id' => 'ID Berkas',
            'institution_id' => 'ID Institusi',
            'year_id' => 'ID Tahun',
            'name' => 'Nama Berkas',
            'alias' => 'Singkatan',
            'status' => 'Status Berkas',
        ];
    }

    public function prepareForValidation()
    {
        return $this->merge([
            'updater' => $this->user('sanctum')->id,
        ]);
    }
}
