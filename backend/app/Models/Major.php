<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Major extends Model
{
    use HasFactory;
    protected $fillable = [
        'ladder',
        'name',
        'alias',
        'description'
    ];

    public function ladders(): object
    {
        return $this->hasOne(
            Ladder::class,
            'id',
            'ladder'
        );
    }
}
