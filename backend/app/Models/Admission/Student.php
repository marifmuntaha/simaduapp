<?php

namespace App\Models\Admission;

use App\Models\User;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

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

    public function parent(): BelongsToMany
    {
        return $this->belongsToMany(
            StudentParent::class,
            'admission_student_parent',
            'student_id',
            'parent_id'
        );
    }

    public function address(): object
    {
        return $this->hasOne(StudentAddress::class, 'student_id', 'id');
    }

    public function program(): object
    {
        return $this->hasOne(StudentProgram::class, 'student_id', 'id');
    }

    public function user(): object
    {
        return $this->hasOne(User::class, 'id', 'user_id');
    }
}
