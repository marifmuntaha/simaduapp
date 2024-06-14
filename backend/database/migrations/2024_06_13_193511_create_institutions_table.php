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
            $table->unsignedBigInteger('user')->nullable();
            $table->unsignedBigInteger('ladder');
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
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('institutions');
    }
};
