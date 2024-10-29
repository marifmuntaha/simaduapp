<?php

use App\Http\Controllers\Admission\ProgramController;
use App\Http\Controllers\Admission\SettingController;
use Illuminate\Support\Facades\Route;

Route::apiResource('setting', SettingController::class)->except(['store', 'destroy']);
Route::apiResource('program', ProgramController::class);
