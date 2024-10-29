<?php

namespace App\Listeners;

use App\Events\InstitutionCreateEvent;
use App\Models\Admission\Setting;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Queue\InteractsWithQueue;

class InstitutionCreateListener
{
    /**
     * Create the event listener.
     */
    public function __construct()
    {
        //
    }

    /**
     * Handle the event.
     */
    public function handle(InstitutionCreateEvent $event): void
    {
        Setting::create([
            'institution_id' => $event->institution->id,
            'name' => $event->institution->name,
            'alias' => $event->institution->alias,
            'year_id' => $event->year->id,
            'brochure' => null,
            'status' => 1,
            'youtube' => null,
            'created_by' => 1,
            'updated_by' => 1,
        ]);
    }
}
