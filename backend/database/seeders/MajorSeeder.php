<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class MajorSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $majors = [
            [1, 'NON JURUSAN', 'NON JURUSAN', ''],
            [2, 'NON JURUSAN', 'NON JURUSAN', ''],
            [3, 'NON JURUSAN', 'NON JURUSAN', ''],
            [4, 'Ilmu Pengetahuan Alam', 'IPA', ''],
            [4, 'Ilmu Pengetahuan Sosial', 'IPS', ''],
        ];

        for ($i = 0; $i < count($majors); $i++) {
            DB::table('majors')->insert([
                'ladder_id' => $majors[$i][0],
                'name' => $majors[$i][1],
                'alias' => $majors[$i][2],
                'description' => $majors[$i][2],
            ]);
        }
    }
}
