<?php

namespace App\Policies;

use App\Models\User;
use App\Models\Year;
use Illuminate\Auth\Access\Response;
use Illuminate\Support\Arr;

class YearPolicy
{
    /**
     * Determine whether the user can view any models.
     */
    public function viewAny(User $user): bool
    {
        //
    }

    /**
     * Determine whether the user can view the model.
     */
    public function view(User $user, Year $year): bool
    {
        //
    }

    /**
     * Determine whether the user can create models.
     */
    public function create(User $user): bool
    {
        return Arr::has($user->role, [1, 5]);
    }

    /**
     * Determine whether the user can update the model.
     */
    public function update(User $user, Year $year): bool
    {
        return Arr::has($user->role, [1, 5]);
    }

    /**
     * Determine whether the user can delete the model.
     */
    public function delete(User $user, Year $year): bool
    {
        return Arr::has($user->role, [1, 5]);
    }

    /**
     * Determine whether the user can restore the model.
     */
    public function restore(User $user, Year $year): bool
    {
        return Arr::has($user->role, [1, 5]);
    }

    /**
     * Determine whether the user can permanently delete the model.
     */
    public function forceDelete(User $user, Year $year): bool
    {
        return Arr::has($user->role, [1, 5]);
    }
}
