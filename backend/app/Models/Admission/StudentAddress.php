<?php

namespace App\Models\Admission;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class StudentAddress extends Model
{
    use HasFactory;
    protected $table = 'admission_student_addresses';
    protected $fillable = [
        'student_id',
        'province_id',
        'district_id',
        'subdistrict_id',
        'village_id',
        'address',
        'creator',
        'updater',
    ];
}
