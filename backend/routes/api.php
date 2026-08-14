<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\CandidateController;
use App\Http\Controllers\RegionController;
use App\Http\Controllers\UserController;
use Illuminate\Support\Facades\Route;
// users
Route::post('/users', [UserController::class, 'store']);
Route::delete('/users/{id}', [UserController::class, 'destroy']);

// Regions
Route::post('/regions', [RegionController::class, 'store']);
Route::get('/regions', [RegionController::class, 'index']);
Route::delete('/regions/{id}', [RegionController::class, 'destroy']);


// Authentication
Route::post('/login', [AuthController::class, 'login']);

// candidate
Route::post('/candidates', [CandidateController::class, 'store']);
