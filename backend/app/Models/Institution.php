<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Institution extends Model
{
    use HasFactory;
    protected $fillable = [
        'user',
        'ladder',
        'name',
        'alias',
        'nsm',
        'npsn',
        'headmaster',
        'logo',
        'creator',
        'updater'
    ];

    public function users() : object
    {
        return $this->hasOne(
            User::class,
            'id',
            'user'
        );
    }

    public function ladders(): object
    {
        return $this->hasOne(
            Ladder::class,
            'id',
            'ladder'
        );
    }
}
