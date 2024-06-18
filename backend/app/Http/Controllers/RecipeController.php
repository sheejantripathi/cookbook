<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Recipe;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;

class RecipeController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        // get user id from the query parameter
        $userId = $request->query('userId');

        if ($userId) {
            // Get recipes by user id
            $recipes = Recipe::with(['ingredients', 'utensils', 'user'])
                        ->where('user_id', $userId)
                        ->get();
        } else {
            // Get all recipes if no user id is provided
            $recipes = Recipe::with(['ingredients', 'utensils', 'user'])->get();
        }

        // Transform the recipes to send only ingredient names and utensil names
        $transformedRecipes = $recipes->map(function ($recipe) {
            return [
                'id' => $recipe->id,
                'name' => $recipe->name,
                'description' => $recipe->description,
                'image' => $recipe->image,
                'ingredients' => $recipe->ingredients->pluck('name')->toArray(),
                'utensils' => $recipe->utensils->pluck('name')->toArray(),
                'user' => $recipe->user->id,
                'steps' => $recipe->steps,
                // You can include other fields as needed
            ];
        });

        return response()->json($transformedRecipes);
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

    // Validate the request data
    $request->validate([
        'name' => 'required|string|max:255',
        'description' => 'required|string',
        'steps' => 'required|array',
        'steps.*' => 'string',
        'ingredients' => 'required|array',
        'ingredients.*' => 'exists:ingredients,id',
        'utensils' => 'required|array',
        'utensils.*' => 'exists:utensils,id',
        'image' => 'string|image|mimes:jpeg,png,jpg,gif,svg|max:2048',
    ]);

    // Handle image upload if a new image is provided
    if ($request->hasFile('image')) {
        $image = $request->file('image');
        $imageName = time().'.'.$image->getClientOriginalExtension();
        $image->move(public_path('images'), $imageName);
        $recipe->image = '/images/'.$imageName;
    }else{
        $recipe->image = $request->input('imageString');
    }

    // Update basic fields
    $data = $request->all();
    $data['user_id'] = Auth::id();
    Log::info($data);
    // $recipe->name = $request->input('name');
    // $recipe->description = $request->input('description');
    // $recipe->steps = $request->input('steps');
    $recipe->fill($data);
    $recipe->save();

    // Sync the relationships
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
