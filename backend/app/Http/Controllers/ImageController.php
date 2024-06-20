<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Response;

class ImageController extends Controller
{
    public function index(string $filename) {
        $path = storage_path('app/public/images/' . $filename);

        Log::info($path);
        
        if (!File::exists($path)) {
            abort(404);
        }
    
        $file = File::get($path);
        $type = File::mimeType($path);
    
        $response = Response::make($file, 200);
        $response->header("Content-Type", $type);
        $response->header("Access-Control-Allow-Origin", "*");
        $response->header("Cross-Origin-Resource-Policy", "cross-origin");
    
        return $response;
    }
}
