<?php

namespace App\Http\Resources\Admission;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Support\Arr;

class StudentFileResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        $resource = [
            'student_id' => $this['student_id'],
            'file_id' => $this['file_id'],
            'number' => $this['number'],
            'value' => $this['value'],
            'creator' => $this['creator'],
            'updater' => $this['updater'],
        ];
        if ($request->has('with')){
            if ($request->with === 'file'){
                $resource = Arr::add($resource, 'file', $this->file);
            }
        }
        return $resource;
    }
}
