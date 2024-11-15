<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class LadderSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $ladders = [
            ['Raudhatul Atfal', 'RA', '', 1, 1],
            ['Madrasah Ibtidaiyah', 'MI', '', 1, 1],
            ['Madrasah Tsanawiyah', 'MTs', '', 1, 1],
            ['Madrasah Aliyah', 'MA', '', 1, 1],

        ];

        for ($i = 0; $i < count($ladders); $i++) {
            DB::table('ladders')->insert([
                'name' => $ladders[$i][0],
                'alias' => $ladders[$i][1],
                'description' => $ladders[$i][2],
                'creator' => $ladders[$i][3],
                'updater' => $ladders[$i][4],
            ]);
        }
    }
}
