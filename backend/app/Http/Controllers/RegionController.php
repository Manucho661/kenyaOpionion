<?php

namespace App\Http\Controllers;

use App\Models\Region;
use Illuminate\Http\Request;

class RegionController extends Controller
{
    //
    public function index()
    {
        $regions = Region::all();

        return response()->json($regions);
    }
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
            "message" => 'Region created successfully',
            "region" => $region
        ]);
    }

    public function update() {}

    public function destroy(string $id)
    {
        $region = Region::find($id);
        if (!$region) {
            return response()->json([
                'Region not found'
            ], 404);
        }
    }
}
