<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('students', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('user_id');
            $table->string('nism')->unique();
            $table->string('nisn')->unique();
            $table->string('nik')->unique();
            $table->string('name');
            $table->string('birthplace');
            $table->string('birthdate');
            $table->enum('gender', ['L', 'P']);
            $table->string('orderborn')->nullable();
            $table->string('sibling')->nullable();
            $table->string('phone')->nullable();
            $table->string('email')->nullable();

            $table->unsignedBigInteger('province_id');
            $table->unsignedBigInteger('city_id');
            $table->unsignedBigInteger('district_id');
            $table->unsignedBigInteger('village_id');
            $table->string('address');

            $table->unsignedBigInteger('boarding')->default(0);

            $table->enum('onemis', [1, 2])->default(2)->comment('1. Sudah 2. Belum');
            $table->enum('onevervalpd', [1, 2])->default(2)->comment('1. Sudah 2. Belum');

            $table->unsignedBigInteger('parent_id');
            $table->unsignedBigInteger('creator');
            $table->unsignedBigInteger('updater');

            $table->timestamps();
        });
        Schema::create('student_institution', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('institution_id');
            $table->unsignedBigInteger('year_id');
            $table->unsignedBigInteger('student_id');
            $table->enum('active', [1, 2])->default(2)->comment('1. aktif 2. tidak');
        });
        Schema::create('student_level', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('year_id');
            $table->unsignedBigInteger('level_id');
            $table->unsignedBigInteger('student_id');
            $table->enum('active', [1, 2])->default(2)->comment('1. aktif 2. tidak');
        });
        Schema::create('student_program', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('year_id');
            $table->unsignedBigInteger('program_id');
            $table->unsignedBigInteger('student_id');
            $table->enum('active', [1, 2])->default(2)->comment('1. aktif 2. tidak');
        });
        Schema::create('student_classroom', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('year_id');
            $table->unsignedBigInteger('classroom_id');
            $table->unsignedBigInteger('student_id');
            $table->enum('active', [1, 2])->default(2)->comment('1. aktif 2. tidak');
        });
        Schema::create('student_status', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('year_id');
            $table->unsignedBigInteger('student_id');
            $table->enum('active', [1, 2])->default(1)->comment('1. Aktif, 2. Tidak');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('students');
        Schema::dropIfExists('student_institution');
        Schema::dropIfExists('student_level');
        Schema::dropIfExists('student_program');
        Schema::dropIfExists('student_classroom');
        Schema::dropIfExists('student_status');
    }
};
