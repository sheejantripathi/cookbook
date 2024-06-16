<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Laravel\Sanctum\HasApiTokens;

class Ingredient extends Model
{
    use HasApiTokens, HasFactory;

    //mass assignable attributes/fillables

    protected $fillable = ['name'];

    //relationships
    public function recipes() {
        return $this->belongsToMany(Recipe::class);
    }
}
