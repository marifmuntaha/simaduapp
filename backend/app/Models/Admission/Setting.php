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
    protected $fillable = ['institution_id', 'name', 'alias', 'year_id', 'brochure', 'status', 'youtube', 'logo', 'created_by', 'updated_by'];

    public $timestamps = false;

    public function institution(): object
    {
        return $this->hasOne(Institution::class, 'id', 'institution');
    }

    public function year(): object
    {
        return $this->hasOne(Year::class, 'id', 'year');
    }
}
