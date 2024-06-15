<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Program extends Model
{
    use HasFactory;
    protected $fillable = [
        'institution',
        'year',
        'name',
        'alias',
        'description',
        'boarding',
        'creator',
        'updater'
    ];

    public function institutions(): object
    {
        return $this->hasOne(
            Institution::class,
            'id',
            'institution'
        );
    }

    public function years(): object
    {
        return $this->hasOne(
            Year::class,
            'id',
            'year'
        );
    }
}
