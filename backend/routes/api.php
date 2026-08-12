<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\RegionController;
use App\Http\Controllers\UserController;
use Illuminate\Support\Facades\Route;
// users
Route::post('/users', [UserController::class, 'store']);
Route::delete('/users/{id}', [UserController::class, 'destroy']);

// Regions
Route::post('/regions', [RegionController::class, 'store']);

// Authentication
Route::post('/login', [AuthController::class, 'login']);
