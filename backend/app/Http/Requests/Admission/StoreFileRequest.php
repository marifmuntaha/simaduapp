<?php

namespace App\Http\Requests\Admission;

use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;

class StoreFileRequest extends FormRequest
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
            'name' => 'required',
            'alias' => 'required',
            'status' => 'required',
        ];
    }

    public function attributes(): array
    {
        return [
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
            'creator' => $this->user('sanctum')->id,
            'updater' => $this->user('sanctum')->id,
        ]);
    }
}
