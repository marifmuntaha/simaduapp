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
            'id' => $this['id'],
            'institution_id' => $this['institution_id'],
            'year_id' => $this['year_id'],
            'level_id' => $this['level_id'],
            'major_id' => $this['major_id'],
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
            in_array('institution', $with) && $resource['institution'] = new InstitutionResource($this->institution);
            in_array('year', $with) && $resource['year'] = $this->year;
            in_array('level', $with) && $resource['level'] = $this->level;
            in_array('major', $with) && $resource['major'] = $this->major;
        }
        return $resource;
    }
}
