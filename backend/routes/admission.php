<?php

use App\Http\Controllers\Admission\ProgramController;
use App\Http\Controllers\Admission\SettingController;
use App\Http\Controllers\InstitutionController;
use Illuminate\Support\Facades\Route;
Route::apiResource('institution', InstitutionController::class)->only('show');
Route::apiResource('setting', SettingController::class)->except(['store', 'destroy']);
Route::apiResource('program', ProgramController::class);
