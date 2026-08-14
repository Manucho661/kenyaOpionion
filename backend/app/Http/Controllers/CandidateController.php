<?php

namespace App\Http\Controllers;

use App\Models\Candidate;
use Illuminate\Http\Request;

class CandidateController extends Controller
{
    public function store(Request $request)
    {
        $validated = $request->validate(
            [
                'name' => ['required', 'string', 'max:255']
            ]
        );

        $candidate= Candidate::create($validated);

        return response()->json([
            'success' => true,
            'message' => 'Candidate created successfully',
            'candidate' => $candidate
        ]);
    }
}
