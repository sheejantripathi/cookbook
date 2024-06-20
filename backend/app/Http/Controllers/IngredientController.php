<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Ingredient;
use Illuminate\Http\Request;
use Laravel\Sanctum\HasApiTokens;

class IngredientController extends Controller
{

    use HasApiTokens;

    public function index()
    {
        // Get all ingredients
        return Ingredient::all();
    }

    public function store(Request $request)
    {
        // Validate the request
        $request->validate(['name' => 'required|unique:ingredients']);

        // Create a new ingredient
        $ingredient = Ingredient::create([
            'name' => strtolower(($request->input('name')))
        ]);
        return response()->json($ingredient, 201);
    }
}
