<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\YearController;
use Illuminate\Support\Facades\Route;

Route::group(['prefix' => 'auth'], function (){
    Route::post('login', AuthController::class. '@login');
    Route::post('reset-password', AuthController::class. '@resetPassword');
    Route::post('change-password', AuthController::class. '@changePassword');
});

Route::group(['middleware' => 'auth:sanctum'], function () {
    Route::group(['prefix' => 'master'], function (){
        Route::apiResource('year', YearController::class);
    });
    Route::apiResource('user', UserController::class);
    Route::post('auth/logout', AuthController::class. '@logout');
});
