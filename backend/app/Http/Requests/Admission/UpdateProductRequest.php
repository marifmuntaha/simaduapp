<?php

namespace App\Http\Requests\Admission;

use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;

class UpdateProductRequest extends FormRequest
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
            'name' => 'required',
            'alias' => 'required',
            'gender' => 'required',
            'program' => 'required',
            'price' => 'required',
            'boarding' => 'required'
        ];
    }

    public function attributes(): array
    {
        return [
            'id' => 'ID Item',
            'name' => 'Nama Item',
            'alias' => 'Singkatan',
            'gender' => 'Jenis Kelamin',
            'program' => 'Jenis Program',
            'price' => 'Harga',
            'boarding' => 'Boarding'
        ];
    }

    public function prepareForValidation()
    {
        return $this->merge([
            'updater' => $this->user('sanctum')->id,
        ]);
    }
}
