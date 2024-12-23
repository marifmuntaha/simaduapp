<?php

namespace App\Models\Admission;

use App\Models\Institution;
use App\Models\Year;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class File extends Model
{
    use HasFactory;
    protected $table = 'files';
    protected $fillable = [
        'institution_id',
        'year_id',
        'name',
        'alias',
        'status',
        'creator',
        'updater'
    ];

    public $timestamps = false;

    public function institution(): object
    {
        return $this->hasOne(Institution::class, 'id', 'institution_id');
    }

    public function year(): object
    {
        return $this->hasOne(Year::class, 'id', 'year_id');
    }
}
