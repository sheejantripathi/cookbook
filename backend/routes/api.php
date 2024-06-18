<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\IngredientController;
use App\Http\Controllers\UtensilController;
use App\Http\Controllers\RecipeController;

use Illuminate\Support\Facades\Route;

Route::post('login', [AuthController::class, 'login']);
Route::middleware('auth:sanctum')->get('user', [AuthController::class, 'getUser']);

Route::middleware('auth:sanctum')->group(function () {
    //ingredients api routes
    Route::get('ingredients', [IngredientController::class, 'index']);
    Route::post('/ingredient', [IngredientController::class, 'store']);

    //utenils api routes
    Route::get('utensils', [UtensilController::class, 'index']);
    Route::post('/utensil', [UtensilController::class, 'store']);

    //recipes api routes
    Route::get('recipes', [RecipeController::class, 'index']);
    Route::get('recipes/all', [RecipeController::class, 'homepage']);
    Route::post('/recipe', [RecipeController::class, 'store']);
    Route::get('/recipe/{id}', [RecipeController::class, 'show']);
    Route::post('/recipe/{id}', [RecipeController::class, 'update']);
    Route::delete('/recipe/{id}', [RecipeController::class, 'destroy']);
});

