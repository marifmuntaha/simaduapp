<?php

namespace App\Events;

use App\Models\Year;
use Illuminate\Broadcasting\Channel;
use Illuminate\Broadcasting\InteractsWithSockets;
use Illuminate\Broadcasting\PresenceChannel;
use Illuminate\Broadcasting\PrivateChannel;
use Illuminate\Contracts\Broadcasting\ShouldBroadcast;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Queue\SerializesModels;

class InstitutionCreateEvent
{
    use Dispatchable, InteractsWithSockets, SerializesModels;
    public object $institution;
    public object $year;

    /**
     * Create a new event instance.
     */
    public function __construct($institution)
    {
        $this->institution = $institution;
        $this->year = Year::active();
    }
}
