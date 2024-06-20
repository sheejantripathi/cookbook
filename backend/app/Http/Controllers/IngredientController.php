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
        return Ingredient::all();
    }

    public function store(Request $request)
    {
        $request->validate(['name' => 'required|unique:ingredients']);
        $ingredient = Ingredient::create([
            'name' => strtolower(($request->input('name')))
        ]);
        return response()->json($ingredient, 201);
    }
}
