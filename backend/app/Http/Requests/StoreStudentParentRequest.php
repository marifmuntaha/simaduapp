<?php

namespace App\Http\Requests;

use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;

class StoreStudentParentRequest extends FormRequest
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
            'user_id' => 'required|int',
            'number_kk' => 'required|string',
            'head_family' => 'required|string',
            'father_status' => 'required|string',
            'father_name' => 'required|string',
            'father_nik' => $this->father_status == 1 ? 'required|string' : 'nullable',
            'father_birthplace' => $this->father_status == 1 ? 'required|string' : 'nullable',
            'father_birthday' => $this->father_status == 1 ? 'required|string' : 'nullable',
            'father_email' => $this->father_status == 1 ? 'required|string' : 'nullable',
            'father_phone' => $this->father_status == 1 ? 'required|string' : 'nullable',
            'mother_status' => 'required|string',
            'mother_name' => 'required|string',
            'mother_nik' => $this->mother_status == 1 ? 'required|string' : 'nullable',
            'mother_birthplace' => $this->mother_status == 1 ? 'required|string' : 'nullable',
            'mother_birthday' => $this->mother_status == 1 ? 'required|string' : 'nullable',
            'mother_email' => $this->mother_status == 1 ? 'required|string' : 'nullable',
            'mother_phone' => $this->mother_status == 1 ? 'required|string' : 'nullable',
            'guard_status' => 'required|string',
            'guard_name' => 'required|string',
            'guard_nik' => 'required|string',
            'guard_birthplace' => 'required|string',
            'guard_birthday' => 'required|string',
            'guard_email' => 'required|string',
            'guard_phone' => 'required|string',
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
