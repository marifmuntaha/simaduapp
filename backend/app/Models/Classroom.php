<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Classroom extends Model
{
    use HasFactory;
    protected $fillable = [
        'institution_id',
        'year_id',
        'level_id',
        'major_id',
        'name',
        'fullname',
        'creator',
        'updater',
    ];

    public function institution(): object
    {
        return $this->hasOne(Institution::class, 'id', 'institution_id');
    }

    public function year(): object
    {
        return $this->hasOne(Year::class, 'id', 'year_id');
    }

    public function level(): object
    {
        return $this->hasOne(Level::class, 'id', 'level_id');
    }

    public function major(): object
    {
        return $this->hasOne(Major::class, 'id', 'major_id');
    }
}
