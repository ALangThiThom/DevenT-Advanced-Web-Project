<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Category;

class CategorySeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $categories = ['Music', 'Sports', 'Food', 'Art', 'Education', 'Community'];
        foreach ($categories as $cat) {
            Category::firstOrCreate(['name' => $cat]);
        }
    }
}
