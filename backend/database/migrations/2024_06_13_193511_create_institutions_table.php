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
        Schema::create('institutions', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('ladder_id');
            $table->string('name');
            $table->string('alias');
            $table->string('nsm')->nullable();
            $table->string('npsn')->nullable();
            $table->string('headmaster')->nullable();
            $table->string('logo')->nullable();
            $table->string('creator');
            $table->string('updater');
            $table->timestamps();
        });

        Schema::create('institution_user', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('institution_id');
            $table->unsignedBigInteger('user_id');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('institutions');
        Schema::dropIfExists('institution_user');
    }
};
