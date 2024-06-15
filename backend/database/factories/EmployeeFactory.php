<?php

namespace Database\Factories;

use App\Models\Employee;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;

/**
 * @extends Factory<Employee>
 */
class EmployeeFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    protected static ?string $password;
    public function definition(): array
    {
        return [
            'fullname' => fake()->name(),
            'email' => fake()->unique()->safeEmail(),
            'username' => fake()->username(),
            'password' => static::$password ??= Hash::make('password'),
            'role' => fake()->numberBetween(1, 5),
            'phone' => fake()->phoneNumber(),
            'image' => fake()->image(),
            'remember_token' => Str::random(10),
        ];
    }
}
