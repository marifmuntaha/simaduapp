<?php

namespace App\Http\Requests\Admission;

use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;

class UpdateStudentFileRequest extends FormRequest
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
            'student_id' => 'required',
            'file_id' => 'required',
            'number' => 'required',
            'value' => 'required',
        ];
    }

    public function attributes(): array
    {
        return [
            'id' => 'ID',
            'student_id' => 'ID Siswa',
            'file_id' => 'Berkas',
            'number' => 'Nomor Berkas',
            'value' => 'Berkas',
        ];
    }

    public function prepareForValidation()
    {
        return $this->merge([
            'updater' => $this->user('sanctum')->id,
        ]);
    }
}
