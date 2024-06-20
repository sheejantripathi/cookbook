<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Utensil;
use Illuminate\Http\Request;

class UtensilController extends Controller
{
    public function index()
    {
        return Utensil::all();
    }

    public function store(Request $request)
    {
        $request->validate(['name' => 'required|unique:utensils']);
        $utensil = Utensil::create([
            'name' => strtolower(($request->input('name')))
        ]);
        return response()->json($utensil, 201);
    }
}
