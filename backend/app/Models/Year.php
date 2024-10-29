<?php

namespace App\Models;

use App\Events\YearCreateOrUpdateEvent;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Year extends Model
{
    use HasFactory;
    protected $fillable = [
        'institution_id',
        'name',
        'description',
        'active'
    ];

    protected static function boot(): void
    {
        parent::boot();

        static::created(function ($year) {
            event(new YearCreateOrUpdateEvent($year));
        });

        static::updated(function ($year) {
            event(new YearCreateOrUpdateEvent($year));
        });
    }

    static function active(): object
    {
        return self::whereActive(1)->first();
    }

    public function institution(): object
    {
        return $this->hasOne(Institution::class, 'id', 'institution_id');
    }


}
