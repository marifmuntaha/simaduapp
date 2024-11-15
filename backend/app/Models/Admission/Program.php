<?php

namespace App\Models\Admission;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Program extends Model
{
    use HasFactory;

    protected $table = 'admission_programs';
    protected $fillable = ['id', 'institution_id', 'year_id', 'name', 'alias', 'description', 'boarding'];
    public $timestamps = false;
}
