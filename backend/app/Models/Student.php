<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Student extends Model
{
    use HasFactory;
    protected $fillable = [
        'user_id',
        'nism',
        'nisn',
        'nik',
        'name',
        'birthplace',
        'birthdate',
        'gender',
        'orderborn',
        'sibling',
        'phone',
        'email',

        'province_id',
        'city_id',
        'district_id',
        'village_id',
        'address',

        'boarding',
        'oneemis',
        'onevervalpd',

        'parent_id',

        'creator',
        'updater'
    ];
}
