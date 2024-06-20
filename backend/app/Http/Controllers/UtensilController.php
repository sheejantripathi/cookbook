<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Utensil;
use Illuminate\Http\Request;

class UtensilController extends Controller
{
    public function index()
    {
        // Get all utensils
        return Utensil::all();
    }

    public function store(Request $request)
    {
        // Validate the request
        $request->validate(['name' => 'required|unique:utensils']);

        // Create a new utensil
        $utensil = Utensil::create([
            'name' => strtolower(($request->input('name')))
        ]);
        return response()->json($utensil, 201);
    }
}
