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
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('admission_settings');
        Schema::dropIfExists('admission_programs');
    }
};
