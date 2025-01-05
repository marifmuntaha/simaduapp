<?php

namespace App\Http\Requests\Admission;

use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;

class UpdateInvoiceRequest extends FormRequest
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
            'id' => 'required',
            'student_id' => 'required',
            'number' => 'required',
            'amount' => 'required',
            'discount' => 'nullable',
            'discount_description' => 'nullable',
            'total' => 'required',
            'item' => 'required',
            'status' => 'required',
        ];
    }

    public function attributes(): array
    {
        return [
            'id' => 'ID',
            'student_id' => 'ID Siswa',
            'number' => 'Nomor Tagihan',
            'amount' => 'Total Tagihan',
            'discount' => 'Diskon',
            'discount_description' => 'Diskripsi Diskon',
            'total' => 'Total',
            'item' => 'Item Tagihan',
            'status' => 'Status',
        ];
    }

    public function prepareForValidation()
    {
        return $this->merge([
            'updater' => $this->user('sanctum')->id,
        ]);
    }
}
