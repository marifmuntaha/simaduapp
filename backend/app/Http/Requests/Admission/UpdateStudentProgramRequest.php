<?php

namespace App\Http\Requests\Admission;

use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;

class UpdateStudentProgramRequest extends FormRequest
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
            'program_id' => 'required',
            'boarding' => 'required'
        ];
    }

    public function attributes(): array
    {
        return [
            'id' => 'ID Program',
            'program_id' => 'Program Pilihan',
            'boarding' => 'Boarding/Pondok'
        ];
    }

    public function prepareForValidation()
    {
        return $this->merge([
            'updater' => $this->user('sanctum')->id,
        ]);
    }
}
