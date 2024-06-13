<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Ladder extends Model
{
    use HasFactory;
    protected $fillable = [
        'id',
        'name',
        'alias',
        'description',
        'creator',
        'updater'
    ];
    protected $hidden = [
        'creator',
        'updater'
    ];
}
