<?php

namespace App\Services;

use App\Models\User;
use App\Models\VoterProfile;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;

class UserService
{
    public function create(array $data): User
    {
        return DB::transaction(function () use ($data) {

            $user = User::create([
                'name' => $data['name'],
                'email' => $data['email'],
                'role' => $data['role'],
                'password' => Hash::make($data['password']),
            ]);

            VoterProfile::create([
                'user_id' => $user->id,
                'national_id' => $data['national_id'],
                'region_id' => $data['region_id'],
            ]);

            return $user;
        });
    }
}