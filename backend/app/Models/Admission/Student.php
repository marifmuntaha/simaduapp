<?php

namespace App\Models\Admission;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Student extends Model
{
    use HasFactory;

    protected $table = 'admission_students';
    protected $fillable = [
        'id',
        'user_id',
        'institution_id',
        'year_id',
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
        'creator',
        'updater'
    ];
}
