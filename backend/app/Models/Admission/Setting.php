<?php

namespace App\Models\Admission;

use App\Models\Institution;
use App\Models\Year;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Setting extends Model
{
    use HasFactory;

    protected $table = 'admission_settings';
    protected $fillable = ['institution', 'name', 'alias', 'year', 'brochure', 'status', 'youtube', 'created_by', 'updated_by'];

    public function institution(): object
    {
        return $this->hasOne(Institution::class, 'id', 'institution');
    }

    public function year(): object
    {
        return $this->hasOne(Year::class, 'id', 'year');
    }
}
