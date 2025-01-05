<?php

namespace App\Models\Admission;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Invoice extends Model
{
//    use HasFactory;
    protected $table = 'admission_invoices';
    protected $fillable = [
        'id',
        'institution_id',
        'year_id',
        'student_id',
        'number',
        'amount',
        'discount',
        'discount_description',
        'total',
        'item',
        'status',
        'creator',
        'updater'
    ];

    public function student(): object
    {
        return $this->hasOne(Student::class, 'id', 'student_id');
    }
}
