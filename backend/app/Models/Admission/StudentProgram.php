<?php

namespace App\Models\Admission;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class StudentProgram extends Model
{
    use HasFactory;
    protected $table = 'admission_student_programs';
    protected $fillable = [
        'id',
        'student_id',
        'program_id',
        'boarding',
        'creator',
        'updater',
    ];

    public function program(): object
    {
        return $this->hasOne(Program::class, 'id', 'program_id');
    }
}
