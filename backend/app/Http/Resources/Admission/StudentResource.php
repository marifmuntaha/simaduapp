<?php

namespace App\Http\Resources\Admission;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Support\Arr;

class StudentResource extends JsonResource
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
            'user_id' => $this['user_id'],
            'institution_id' => $this['institution_id'],
            'year_id' => $this['year_id'],
            'nisn' => $this['nisn'],
            'nik' => $this['nik'],
            'name' => $this['name'],
            'birthplace' => $this['birthplace'],
            'birthdate' => $this['birthdate'],
            'gender' => $this['gender'],
            'orderborn' => $this['orderborn'],
            'sibling' => $this['sibling'],
            'phone' => $this['phone'],
            'email' => $this['email'],
            'creator' => $this['creator'],
            'updater' => $this['updater'],
        ];

        if ($request->has('with')){
            $with = explode(',', $request->with);
            $with = count($with) > 1 ? $with : [$request->with];
            if (in_array('parent', $with)){
                $resource = Arr::add($resource, 'parent', new StudentParentResource($this->parent[0]));
            }
            if (in_array('address', $with)){
                $resource = Arr::add($resource, 'address', new StudentAddressResource($this->address));
            }
            if (in_array('program', $with)){
                $resource = Arr::add($resource, 'program', new StudentProgramResource($this->program));
            }
            if (in_array('school', $with)){
                $resource = Arr::add($resource, 'school', new StudentSchoolResource($this->school));
            }
            if (in_array('user', $with)){
                $resource = Arr::add($resource, 'user', new StudentProgramResource($this->user));
            }
        }

        return $resource;
    }
}
