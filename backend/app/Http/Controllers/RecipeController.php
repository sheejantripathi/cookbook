<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Recipe;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Validator;
use PhpParser\Node\Stmt\TryCatch;

class RecipeController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $recipes = Recipe::with(['ingredients', 'utensils', 'user'])->get();
        return response()->json($recipes);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        try {
           
        Log::info('This is incoming request', $request->all());
        // Validate the request data
        $validator = Validator::make($request->all(), [
            'name' => 'required|string|max:255',
            'description' => 'nullable|string',
            'image' => 'nullable|string',
            'steps' => 'nullable|array',
            'steps.*' => 'string',
            'ingredients' => 'nullable|array',
            'utensils' => 'nullable|array',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'status' => 'error',
                'message' => 'Validation failed',
                'errors' => $validator->errors()
            ], 422);
        }

        $recipe = Recipe::create([
            'name' => $request->name,
            'description' => $request->description,
            'image' => $request->image,
            'steps' => $request->steps,
            'user_id' => auth()->user()->id
        
        ]);
        // $recipe->ingredients()->attach($validatedData['ingredients']);
        // $recipe->utensils()->attach($validatedData['utensils']);

        if ($request->has('ingredients')) {
            $recipe->ingredients()->attach($request->ingredients);
        }

        if ($request->has('utensils')) {
            $recipe->utensils()->attach($request->utensils);
        }

        return response()->json([
            'status' => 'success',
            'data' => $recipe
        ], 201);
        
        } catch (\Exception $e) {
            return response()->json([
                'status' => 'error',
                'message' => 'An error occured while saving the recipe',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $recipe = Recipe::with(['ingredients', 'utensils'])->find($id);

        if(!$recipe) {
            return response()->json(['message' => 'Recipe not found'], 404);
        }

        return response()->json($recipe);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $recipe = Recipe::find($id);

        if (!$recipe) {
            return response()->json(['error' => 'Recipe not found'], 404);
        }
    
        $recipe->update($request->all());
    
        if ($request->has('ingredients')) {
            $recipe->ingredients()->sync($request->input('ingredients'));
        }
    
        if ($request->has('utensils')) {
            $recipe->utensils()->sync($request->input('utensils'));
        }
    
        return response()->json($recipe);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $recipe = Recipe::find($id);

    if (!$recipe) {
        return response()->json(['error' => 'Recipe not found'], 404);
    }

    $recipe->delete();

    return response()->json(['message' => 'Recipe deleted successfully']);
    }
}
