<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Facades\DB;

return new class extends Migration
{
    public function up()
    {
        Schema::create('reviews', function (Blueprint $table) {
            $table->id();
            $table->foreignId('event_id')->constrained('events')->onDelete('cascade');
            $table->foreignId('attendee_id')->constrained('users')->onDelete('cascade');
            $table->integer('rating');
            $table->string('comment', 300)->nullable();
            $table->timestamp('created_at')->useCurrent();

            $table->unique(['event_id', 'attendee_id'], 'unique_event_attendee_rev');
        });

        // Check Constraint cho rating
        DB::statement('ALTER TABLE reviews ADD CONSTRAINT check_rating CHECK (rating >= 1 AND rating <= 5)');
    }

    public function down()
    {
        Schema::dropIfExists('reviews');
    }
};
