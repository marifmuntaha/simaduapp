<?php

namespace App\Http\Requests;

use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;

class UpdateClassroomRequest extends FormRequest
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
            'level_id' => 'required',
            'major_id' => 'required',
            'name' => 'required|string',
            'fullname' => 'required|string',
        ];
    }

    public function attributes(): array
    {
        return [
            'institution_id' => 'Lembaga',
            'year_id' => 'Tahun Pelajaran',
            'level_id' => 'Tingkat',
            'major_id' => 'Jurusan',
            'name' => 'Nama',
            'fullname' => 'Alias',
        ];
    }

    public function prepareForValidation()
    {
        return $this->merge([
            'updater' => $this->user('sanctum')->id,
        ]);
    }
}
