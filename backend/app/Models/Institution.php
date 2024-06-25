<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Institution extends Model
{
    use HasFactory;
    protected $fillable = [
        'ladder_id',
        'name',
        'alias',
        'nsm',
        'npsn',
        'headmaster',
        'logo',
        'creator',
        'updater'
    ];

    public function user() : object
    {
        return $this->belongsToMany(
            User::class,
            'institution_user',
            'institution_id',
            'user_id'
        );
    }

    public function ladder(): object
    {
        return $this->hasOne(
            Ladder::class,
            'id',
            'ladder_id'
        );
    }

    public function year(): object
    {
        return $this->hasMany(Year::class, 'institution_id', 'id');
    }

}
