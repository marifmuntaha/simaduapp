<?php

use App\Http\Controllers\Admission\FileController;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\ClassroomController;
use App\Http\Controllers\InstitutionController;
use App\Http\Controllers\LadderController;
use App\Http\Controllers\LevelController;
use App\Http\Controllers\MajorController;
use App\Http\Controllers\ProgramController;
use App\Http\Controllers\StudentController;
use App\Http\Controllers\StudentParentController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\YearController;
use Illuminate\Support\Facades\Route;

Route::group(['prefix' => 'auth'], function (){
    Route::post('login', AuthController::class. '@login');
    Route::post('reset-password', AuthController::class. '@resetPassword');
    Route::post('change-password', AuthController::class. '@changePassword');
    Route::post('logout', AuthController::class. '@logout')->middleware('auth:sanctum');
});
Route::group(['middleware' => 'auth:sanctum'], function () {
    Route::group(['prefix' => 'master'], function (){
        Route::apiResource('file', FileController::class);
        Route::apiResource('ladder', LadderController::class);
        Route::apiResource('level', LevelController::class);
        Route::apiResource('major', MajorController::class);
        Route::apiResource('year', YearController::class);
    });
    Route::group(['prefix' => 'institute'], function (){
        Route::apiResource('program', ProgramController::class);
        Route::apiResource('classroom', ClassroomController::class);
    });
    Route::apiResource('institution', InstitutionController::class);
    Route::apiResource('student', StudentController::class);
    Route::apiResource('student/parent', StudentParentController::class);
    Route::apiResource('user', UserController::class);
});
Route::apiResource('institution', InstitutionController::class)->only('show');
Route::prefix('admission')->group(base_path('routes/admission.php'));
