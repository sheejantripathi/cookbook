<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Utensil extends Model
{
    use HasFactory;

    //mass assignable attributes/fillables
    protected $fillable = ['name'];

    //relationships
    public function recipes() {
        return $this->belongsToMany(Recipe::class);
    }
}
