<?php

namespace App\Http\Controllers;

use App\Models\Region;
use Illuminate\Http\Request;

class RegionController extends Controller
{
    //
    public function store(Request $request)
    {
        $validated = $request->validate(
            [
                'region_name' => [
                    'required', 
                    'string', 
                    'max:255',
                    'unique:regions,region_name'
                    ],
            ]
        );
        $region = Region::create($validated);

        return response()->json([
            'success' => true,
            "Message" => 'Region created successfully'
        ]);
    }

    public function update(){

    }

    public function destroy(){
        
    }
}
