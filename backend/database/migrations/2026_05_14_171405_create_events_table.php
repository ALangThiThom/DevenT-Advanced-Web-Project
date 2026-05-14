<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Facades\DB;

return new class extends Migration
{
    public function up()
    {
        Schema::create('events', function (Blueprint $table) {
            $table->id();
            $table->foreignId('organizer_id')->constrained('users')->onDelete('cascade');
            $table->string('name', 255);
            $table->text('description');
            $table->string('category', 100)->index('idx_events_category');
            $table->string('location', 255);
            $table->dateTime('date_time');
            $table->integer('capacity');
            $table->enum('status', ['Draft', 'Published', 'Cancelled'])->default('Draft')->index('idx_events_status');
            $table->timestamp('created_at')->useCurrent();
        });

        // Thêm Check Constraint cho capacity
        DB::statement('ALTER TABLE events ADD CONSTRAINT check_capacity CHECK (capacity > 0)');
    }

    public function down()
    {
        Schema::dropIfExists('events');
    }
};
