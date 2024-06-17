<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Recipe extends Model
{
    use HasFactory;

    //mass assignable attributes/fillables

    protected $fillable = ['name', 'description', 'image', 'steps', 'user_id'];

    //Attribute casting
    protected $casts = [
        'steps' => 'array',
    ];

    //relationships
    public function ingredients() {
        return $this->belongsToMany(Ingredient::class);
    }

    public function utensils() {
        return $this->belongsToMany(Utensil::class);
    }

    public function user() {
        return $this->belongsTo(User::class);
    }
}
