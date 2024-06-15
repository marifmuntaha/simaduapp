<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ClassroomResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        $resource = [
            'institution' => $this['institution'],
            'year' => $this['year'],
            'level' => $this['level'],
            'major' => $this['major'],
            'name' => $this['name'],
            'fullname' => $this['fullname'],
            'creator' => $this['creator'],
            'updater' => $this['updater'],
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
            in_array('institution', $with) && $resource['institution'] = new InstitutionResource($this->institutions);
            in_array('year', $with) && $resource['year'] = $this->years;
            in_array('level', $with) && $resource['level'] = $this->levels;
            in_array('major', $with) && $resource['major'] = $this->majors;
        }
        return $resource;
    }
}
