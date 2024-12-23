<?php

namespace App\Models\Admission;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class StudentSchool extends Model
{
    use HasFactory;
    protected $table = 'admission_student_schools';
    protected $fillable = [
        'student_id',
        'npsn',
        'name',
        'address',
        'creator',
        'updater',
    ];
}
