<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Support\Arr;

class InstitutionResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        $resource = [
            'id' => $this->id,
            'user' => $this->user,
            'ladder' => $this->ladder,
            'name' => $this->name,
            'alias' => $this->alias,
            'nsm' => $this->nsm,
            'npsn' => $this->npsn,
            'headmaster' => $this->headmaster,
            'logo' => $this->logo,
            'creator' => $this->creator,
            'updater' => $this->updater,
        ];
        if ($request->has('with')){
            $with = explode(',', $request->with);
            $with = count($with) > 1 ? $with : [$request->with];
            if (in_array('ladder', $with)){
                $resource['ladder'] = $this->ladders;
            }
            if (in_array('user', $with)){
                $resource['user'] = $this->users;
            }
        }

        return $resource;
    }
}
