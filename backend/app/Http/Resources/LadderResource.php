<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class LadderResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        $resource = [];
        if ($request->has('type')) {
            switch ($request->type) {
                case 'select':
                    $resource = [
                        'value' => $this->id,
                        'label' => $this->name
                    ];
                default:
            }
        } else {
            $resource = parent::toArray($request);
        }
        return $resource;
    }
}
