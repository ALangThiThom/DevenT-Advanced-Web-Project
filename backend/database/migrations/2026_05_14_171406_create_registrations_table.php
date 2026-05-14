<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up()
    {
        Schema::create('registrations', function (Blueprint $table) {
            $table->id();
            $table->foreignId('event_id')->constrained('events')->onDelete('cascade');
            $table->foreignId('attendee_id')->constrained('users')->onDelete('cascade');
            $table->enum('status', ['Confirmed', 'Waitlisted', 'Cancelled'])->default('Confirmed');
            $table->timestamp('created_at')->useCurrent();

            $table->unique(['event_id', 'attendee_id'], 'unique_event_attendee_reg');

            // Index tối ưu hóa truy vấn Waitlist
            $table->index(['event_id', 'status', 'created_at'], 'idx_registrations_waitlist');
        });
    }

    public function down()
    {
        Schema::dropIfExists('registrations');
    }
};
