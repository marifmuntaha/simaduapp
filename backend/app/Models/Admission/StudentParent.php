<?php

namespace App\Models\Admission;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class StudentParent extends Model
{
    use HasFactory;
    protected $table = 'admission_student_parents';
    protected $fillable = [
        'id',
        'user_id',
        'number_kk',
        'head_family',
        'father_status',
        'father_name',
        'father_nik',
        'father_birthplace',
        'father_birthdate',
        'father_email',
        'father_phone',
        'mother_status',
        'mother_name',
        'mother_nik',
        'mother_birthplace',
        'mother_birthdate',
        'mother_email',
        'mother_phone',
        'guard_status',
        'guard_name',
        'guard_nik',
        'guard_birthplace',
        'guard_birthdate',
        'guard_email',
        'guard_phone',
        'creator',
        'updater',

    ];

    public function student(): object
    {
        return $this->belongsToMany(Student::class, 'admission_student_parent', 'parent_id', 'student_id');
    }
}
