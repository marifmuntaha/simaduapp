<?php

namespace App\Listeners;

use App\Events\InstitutionDeleteEvent;
use App\Models\Admission\Setting;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Queue\InteractsWithQueue;

class InstitutionDeleteListener
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
    public function handle(InstitutionDeleteEvent $event): void
    {
        Setting::whereInstitutionId($event->institution->id)->delete();
    }
}
