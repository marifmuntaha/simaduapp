<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class UserResource extends JsonResource
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
                        'label' => $this->fullname
                    ];
                    break;
                default:
            }
        } else {
            $resource = parent::toArray($request);
        }
        return $resource;
    }
}
