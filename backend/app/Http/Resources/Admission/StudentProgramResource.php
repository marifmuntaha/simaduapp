<?php

namespace App\Http\Resources\Admission;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class StudentProgramResource extends JsonResource
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
            'student_id' => $this['student_id'],
            'program_id' => $this['program_id'],
            'boarding' => $this['boarding'],
            'creator' => $this['creator'],
            'updater' => $this['updater'],
            'program' => $this->program,
        ];
        return $resource;
    }
}
