<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\InstitutionController;
use App\Http\Controllers\LadderController;
use App\Http\Controllers\LevelController;
use App\Http\Controllers\MajorController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\YearController;
use Illuminate\Support\Facades\Route;

Route::group(['prefix' => 'auth'], function (){
    Route::post('login', AuthController::class. '@login');
    Route::post('reset-password', AuthController::class. '@resetPassword');
    Route::post('change-password', AuthController::class. '@changePassword');
    Route::post('logout', AuthController::class. '@logout')->middleware('auth:sanctum');
});

Route::group(['middleware' => ['auth:root', 'auth:employee']], function () {
    Route::group(['prefix' => 'master'], function (){
        Route::apiResource('ladder', LadderController::class);
        Route::apiResource('level', LevelController::class);
        Route::apiResource('major', MajorController::class);
        Route::apiResource('year', YearController::class);
    });
    Route::group(['prefix' => 'institute'], function (){
        Route::apiResource('program', \App\Http\Controllers\ProgramController::class);
        Route::apiResource('classroom', \App\Http\Controllers\ClassroomController::class);
    });
    Route::apiResource('institution', InstitutionController::class);
    Route::apiResource('user', UserController::class);
});
