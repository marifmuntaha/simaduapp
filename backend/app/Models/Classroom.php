<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Classroom extends Model
{
    use HasFactory;
    protected $fillable = [
        'institution',
        'year',
        'level',
        'major',
        'name',
        'fullname',
        'creator',
        'updater',
    ];

    public function institutions(): object
    {
        return $this->hasOne(Institution::class, 'id', 'institution');
    }

    public function years(): object
    {
        return $this->hasOne(Year::class, 'id', 'year');
    }

    public function levels(): object
    {
        return $this->hasOne(Level::class, 'id', 'level');
    }

    public function majors(): object
    {
        return $this->hasOne(Major::class, 'id', 'major');
    }
}
