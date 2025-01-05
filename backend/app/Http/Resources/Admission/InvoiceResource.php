<?php

namespace App\Http\Resources\Admission;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Support\Arr;

class InvoiceResource extends JsonResource
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
            'student_id' => $this['student_id'],
            'number' => $this['number'],
            'amount' => $this['amount'],
            'discount' => $this['discount'],
            'discount_description' => $this['discount_description'],
            'total' => $this['total'],
            'item' => $this['item'],
            'status' => $this['status'],
            'created_at' => $this['created_at'],
            'updated_at' => $this['updated_at'],
            'creator' => $this['creator'],
            'updater' => $this['updater'],
        ];
        if ($request->has('with')){
            $with = explode(',', $request->with);
            $with = count($with) > 1 ? $with : [$request->with];
            if (in_array('student', $with)){
                $resource = Arr::add($resource, 'student', new StudentResource($this->student));
            }
        }
        return $resource;
    }
}
