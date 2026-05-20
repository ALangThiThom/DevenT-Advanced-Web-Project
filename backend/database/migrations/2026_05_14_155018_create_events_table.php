<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{

    public function up(): void
    {
        Schema::create('events', function (Blueprint $table) {

            $table->id();

            $table->foreignId('organizer_id')->constrained('users')->onDelete('cascade');

            $table->string('title', 255);
            $table->text('description');
            $table->enum('category', ['music', 'education', 'sports', 'food', 'art', 'community'])->nullable();
            $table->string('location')->nullable();

            $table->dateTime('start_time');
            $table->dateTime('end_time');

            $table->integer('capacity')->unsigned();

            $table->integer('registered_count')->unsigned()->default(0);

            $table->enum('status', ['draft', 'published', 'cancelled', 'completed'])->default('draft');

            $table->timestamps();

            $table->softDeletes();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('events');
    }
};
