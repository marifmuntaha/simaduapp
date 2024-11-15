<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Program extends Model
{
    use HasFactory;
    protected $fillable = [
        'institution_id',
        'year_id',
        'name',
        'alias',
        'description',
        'boarding',
        'creator',
        'updater'
    ];

    public function institution(): object
    {
        return $this->hasOne(
            Institution::class,
            'id',
            'institution_id'
        );
    }

    public function year(): object
    {
        return $this->hasOne(
            Year::class,
            'id',
            'year_id'
        );
    }
}
