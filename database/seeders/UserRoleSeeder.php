<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;

class UserRoleSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        //
                // Create 2 Admins
        User::create([
            'name' => 'Admin One',
            'email' => 'admin1@example.com',
            'user_role' => 'admin',
            'password' => Hash::make('password'), // You can use env('DEFAULT_ADMIN_PASSWORD') if needed
        ]);

        User::create([
            'name' => 'Admin Two',
            'email' => 'admin2@example.com',
            'user_role' => 'admin',
            'password' => Hash::make('password'),
        ]);

        // Create 100 Voters
        User::factory(100)->create([
            'user_role' => 'voter',
        ]);

    }
}
