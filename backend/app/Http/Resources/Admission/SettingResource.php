<?php

namespace App\Http\Resources\Admission;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class SettingResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'institution_id' => $this->institution_id,
            'name' => $this->name,
            'alias' => $this->alias,
            'year_id' => $this->year_id,
            'brochure' => $this->brochure,
            'status' => $this->status,
            'youtube' => $this->youtube,
            'logo' => asset('/storage/admission/images/' . $this->logo),
            'created_by' => $this->created_by,
            'updated_by' => $this->updated_by,
        ];
    }
}
