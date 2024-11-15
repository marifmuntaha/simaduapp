<?php

namespace App\Http\Resources;

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
            'institution' => $this['institution'],
            'year' => $this['year'],
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
        if ($request->has('with')){
            $with = explode(',', $request->with);
            $with = count($with) > 1 ? $with : [$request->with];
            if (in_array('institution', $with)){
                $resource['institution'] = new InstitutionResource($this->institutions);
            }
            if (in_array('year', $with)){
                $resource['year'] = $this->years;
            }
        }
        return $resource;
    }
}
