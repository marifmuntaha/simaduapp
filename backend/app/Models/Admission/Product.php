<?php

namespace App\Models\Admission;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    use HasFactory;

    protected $table = 'admission_products';
    protected $fillable = [
        'id',
        'institution_id',
        'year_id',
        'name',
        'alias',
        'gender',
        'program',
        'price',
        'creator',
        'updater'
    ];
}
