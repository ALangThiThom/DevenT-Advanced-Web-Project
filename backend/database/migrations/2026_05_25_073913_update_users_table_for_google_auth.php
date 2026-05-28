<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations to modify the users table for Google OAuth support.
     */
    public function up(): void
    {
        Schema::table('users', function (Blueprint $table) {
            // Store the Google ID for users authenticating via OAuth
            $table->string('google_id')->nullable()->after('email');

            // Make password nullable since OAuth users won't have a traditional password
            $table->string('password')->nullable()->change();
        });
    }

    /**
     * Reverse the migrations and rollback the OAuth modifications.
     */
    public function down(): void
    {
        Schema::table('users', function (Blueprint $table) {
            $table->dropColumn('google_id');

            // Revert password to be required
            $table->string('password')->nullable(false)->change();
        });
    }
};
