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
        Schema::create('admission_settings', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('institution_id');
            $table->string('name');
            $table->string('alias');
            $table->unsignedBigInteger('year_id');
            $table->string('brochure')->nullable();
            $table->string('status');
            $table->string('youtube')->nullable();
            $table->string('logo')->nullable();
            $table->unsignedBigInteger('created_by');
            $table->unsignedBigInteger('updated_by');
        });
        Schema::create('admission_programs', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('institution_id');
            $table->unsignedBigInteger('year_id');
            $table->string('name');
            $table->string('alias');
            $table->enum('boarding', [1, 2])->default(2)->comment('1. Boarding, 2. Optional');
            $table->string('description')->nullable();
        });
        Schema::create('admission_students', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('user_id');
            $table->unsignedBigInteger('institution_id');
            $table->unsignedBigInteger('year_id');
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
            $table->unsignedBigInteger('creator');
            $table->unsignedBigInteger('updater');
            $table->timestamps();
        });

        Schema::create('admission_student_parents', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('user_id');
            $table->string('number_kk');
            $table->string('head_family');
            $table->enum('father_status', [1, 2, 3]);
            $table->string('father_name');
            $table->string('father_nik')->nullable();
            $table->string('father_birthplace')->nullable();
            $table->string('father_birthdate')->nullable();
            $table->string('father_email')->nullable();
            $table->string('father_phone')->nullable();
            $table->enum('mother_status', [1, 2, 3]);
            $table->string('mother_name');
            $table->string('mother_nik')->nullable();
            $table->string('mother_birthplace')->nullable();
            $table->string('mother_birthdate')->nullable();
            $table->string('mother_email')->nullable();
            $table->string('mother_phone')->nullable();
            $table->enum('guard_status', [1, 2, 3]);
            $table->string('guard_name');
            $table->string('guard_nik')->nullable();
            $table->string('guard_birthplace')->nullable();
            $table->string('guard_birthdate')->nullable();
            $table->string('guard_email')->nullable();
            $table->string('guard_phone')->nullable();
            $table->unsignedBigInteger('creator');
            $table->unsignedBigInteger('updater');
            $table->timestamps();
        });

        Schema::create('admission_student_parent', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('student_id');
            $table->unsignedBigInteger('parent_id');
        });

        Schema::create('admission_student_addresses', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('student_id');
            $table->unsignedBigInteger('province_id');
            $table->unsignedBigInteger('district_id');
            $table->unsignedBigInteger('subdistrict_id');
            $table->unsignedBigInteger('village_id');
            $table->string('address');
            $table->unsignedBigInteger('creator');
            $table->unsignedBigInteger('updater');
            $table->timestamps();
        });
        Schema::create('admission_student_programs', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('student_id');
            $table->unsignedBigInteger('program_id');
            $table->enum('boarding', [1, 2])->default(2)->comment('1. boarding, 2. non boarding');
            $table->unsignedBigInteger('creator');
            $table->unsignedBigInteger('updater');
            $table->timestamps();
        });
        Schema::create('admission_student_schools', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('student_id');
            $table->string('npsn');
            $table->string('name');
            $table->string('address');
            $table->unsignedBigInteger('creator');
            $table->unsignedBigInteger('updater');
            $table->timestamps();
        });
        Schema::create('admission_student_files', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('student_id');
            $table->unsignedBigInteger('file_id');
            $table->string('number');
            $table->string('value');
            $table->unsignedBigInteger('creator');
            $table->unsignedBigInteger('updater');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('admission_settings');
        Schema::dropIfExists('admission_programs');
        Schema::dropIfExists('admission_students');
        Schema::dropIfExists('admission_student_parents');
        Schema::dropIfExists('admission_student_parent');
        Schema::dropIfExists('admission_student_addresses');
        Schema::dropIfExists('admission_student_programs');
        Schema::dropIfExists('admission_student_schools');
        Schema::dropIfExists('admission_student_files');
    }
};
