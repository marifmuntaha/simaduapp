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
        Schema::create('student_parents', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('user_id');
            $table->string('number_kk');
            $table->string('head_family');
            $table->enum('father_status', [1, 2, 3]);
            $table->string('father_name');
            $table->string('father_nik')->nullable();
            $table->string('father_birthplace')->nullable();
            $table->date('father_birthday')->nullable();
            $table->string('father_email')->nullable();
            $table->string('father_phone')->nullable();
            $table->enum('mother_status', [1, 2, 3]);
            $table->string('mother_name');
            $table->string('mother_nik')->nullable();
            $table->string('mother_birthplace')->nullable();
            $table->date('mother_birthday')->nullable();
            $table->string('mother_email')->nullable();
            $table->string('mother_phone')->nullable();
            $table->enum('guard_status', [1, 2, 3]);
            $table->string('guard_name');
            $table->string('guard_nik')->nullable();
            $table->string('guard_birthplace')->nullable();
            $table->date('guard_birthday')->nullable();
            $table->string('guard_email')->nullable();
            $table->string('guard_phone')->nullable();
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
        Schema::dropIfExists('student_parents');
    }
};
