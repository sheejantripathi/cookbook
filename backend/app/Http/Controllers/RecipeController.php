<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Recipe;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;


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
            // Validate the request data
            $request->validate([
                'name' => 'required|string|max:255',
                'description' => 'required|string',
                'image' => 'required|image|mimes:jpeg,png,jpg,gif,svg|max:2048', // Updated validation for image upload
                'steps' => 'required|array',
                'steps.*' => 'required|string',
                'ingredients' => 'required|array',
                'ingredients.*' => 'exists:ingredients,id',
                'utensils' => 'required|array',
                'utensils.*' => 'exists:utensils,id',
            ]);

            $data = $request->all();
            $data['user_id'] = Auth::id();

            // Handle file upload
            if ($request->hasFile('image')) {
                $imagePath = $request->file('image')->store('images', 'public'); // Store file in 'storage/app/public/images' directory
                $data['image'] = asset('storage/' . $imagePath); // Store the public URL of the uploaded file
            }

            $recipe = Recipe::create($data);

            // Sync ingredients and utensils
            $recipe->ingredients()->sync($request->ingredients);
            $recipe->utensils()->sync($request->utensils);

            return response()->json([
                'status' => 'success',
                'data' => $recipe
            ], 201);
        
        } catch (\Exception $e) {
            return response()->json([
                'status' => 'error',
                'message' => 'An error occurred while saving the recipe',
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
