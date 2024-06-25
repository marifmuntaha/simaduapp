<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class YearResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        $resource = [
            'id' => $this['id'],
            'institution_id' => $this['institution_id'],
            'name' => $this['name'],
            'description' => $this['description'],
            'active' => $this['active'],
        ];
        if ($request->has('type')){
            if ($request->type == 'select'){
                $resource = [
                    'value' => $this['id'],
                    'label' => $this['name'],
                ];
            }
        }
        return $resource;
    }
}
