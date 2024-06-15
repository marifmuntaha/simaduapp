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
        Schema::create('classrooms', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('institution');
            $table->unsignedBigInteger('year');
            $table->unsignedBigInteger('level');
            $table->unsignedBigInteger('major');
            $table->string('name');
            $table->string('fullname');
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
        Schema::dropIfExists('classrooms');
    }
};
