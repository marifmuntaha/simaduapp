<?php

namespace App\Models\Admission;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class StudentFile extends Model
{
//    use HasFactory;

    protected $table = 'admission_student_files';
    protected $fillable = [
        'id',
        'student_id',
        'file_id',
        'number',
        'value',
        'creator',
        'updater',
    ];

    public function file(): object
    {
        return $this->hasOne(
            File::class,
            'id',
            'file_id'
        );
    }
}
