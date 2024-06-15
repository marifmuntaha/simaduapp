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
        Schema::create('programs', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('institution');
            $table->unsignedBigInteger('year');
            $table->string('name');
            $table->string('alias');
            $table->string('description')->nullable();
            $table->boolean('boarding');
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
        Schema::dropIfExists('programs');
    }
};
