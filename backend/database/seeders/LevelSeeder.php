<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class LevelSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $levels = [
            [1, '0', '0'],
            [2, '1', 'I'],
            [2, '2', 'II'],
            [2, '3', 'III'],
            [2, '4', 'IV'],
            [2, '5', 'V'],
            [2, '6', 'VI'],
            [3, '7', 'VII'],
            [3, '8', 'VIII'],
            [3, '9', 'IX'],
            [4, '10', 'X'],
            [4, '11', 'XI'],
            [4, '12', 'XII']
        ];

        for ($i = 0; $i < count($levels); $i++) {
            DB::table('levels')->insert([
                'ladder_id' => $levels[$i][0],
                'name' => $levels[$i][1],
                'alias' => $levels[$i][2],
            ]);
        }
    }
}
