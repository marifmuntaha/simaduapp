<?php

use App\Http\Controllers\Admission\StudentAddressController;
use App\Http\Controllers\Admission\StudentParentController;
use App\Http\Controllers\Admission\ProgramController;
use App\Http\Controllers\Admission\SettingController;
use App\Http\Controllers\Admission\StudentController;
use App\Http\Controllers\Admission\StudentProgramController;
use App\Http\Controllers\InstitutionController;
use Illuminate\Support\Facades\Route;

Route::apiResource('institution', InstitutionController::class)->only('show');
Route::apiResource('setting', SettingController::class)->except(['store', 'destroy']);
Route::apiResource('program', ProgramController::class);
Route::apiResource('student', StudentController::class);
Route::apiResource('student/parent', StudentParentController::class);
Route::apiResource('student/address', StudentAddressController::class);
Route::apiResource('student/program', StudentProgramController::class);
