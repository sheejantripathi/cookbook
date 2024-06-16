<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\RecipeController;
use App\Http\Controllers\IngredientController;
use App\Http\Controllers\UtensilController;
use Illuminate\Support\Facades\Route;

Route::post('login', [AuthController::class, 'login']);
Route::middleware('auth:sanctum')->get('user', [AuthController::class, 'getUser']);

Route::middleware('auth:sanctum')->group(function () {
    Route::get('ingredients', [IngredientController::class, 'index']);
    Route::post('/ingredient', [IngredientController::class, 'store']);
});

Route::middleware('auth:api')->group(function () {
    Route::get('utensils', [UtensilController::class, 'index']);
    Route::post('/utensils', [UtensilController::class, 'store']);
});
