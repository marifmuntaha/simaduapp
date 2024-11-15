<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class StudentParent extends Model
{
    use HasFactory;
    protected $fillable = [
        'user_id',
        'number_kk',
        'head_family',
        'father_status',
        'father_name',
        'father_nik',
        'father_birthplace',
        'father_birthday',
        'father_email',
        'father_phone',
        'mother_status',
        'mother_name',
        'mother_nik',
        'mother_birthplace',
        'mother_birthday',
        'mother_email',
        'mother_phone',
        'guard_status',
        'guard_name',
        'guard_nik',
        'guard_birthplace',
        'guard_birthday',
        'guard_email',
        'guard_phone',
        'creator',
        'updater',
    ];
}
