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
            'id' => $this['id'],
            'user_id' => $this['user_id'],
            'ladder_id' => $this['ladder_id'],
            'name' => $this['name'],
            'alias' => $this['alias'],
            'nsm' => $this['nsm'],
            'npsn' => $this['npsn'],
            'headmaster' => $this['headmaster'],
            'logo' => $this['logo'],
            'creator' => $this['creator'],
            'updater' => $this['updater'],
            'withLadderAlias' => $this->ladder->alias .' '. $this['name']
        ];
        if ($request->has('type')){
            if ($request->type == 'select'){
                $resource = [
                    'value' => $this['id'],
                    'label' => $this->ladder->alias .' '.$this['name'],
                ];
            }
        }
        if ($request->has('with')){
            $with = explode(',', $request->with);
            $with = count($with) > 1 ? $with : [$request->with];
            if (in_array('ladder', $with)){
                $resource['ladder'] = $this->ladder;
            }
            if (in_array('user', $with)){
                $resource['user'] = $this->user->first();
            }
        }

        return $resource;
    }
}
