<?php

namespace App\Http\Resources\Admission;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ProgramResource extends JsonResource
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
            'year_id' => $this['year_id'],
            'name' => $this['name'],
            'alias' => $this['alias'],
            'description' => $this['description'],
            'boarding' => $this['boarding'],
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
