<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class RegisterRequest extends FormRequest
{
    // 1. Cho phép mọi người dùng sử dụng request này
    public function authorize(): bool
    {
        return true;
    }

    // 2. Định nghĩa các quy tắc kiểm tra (Rules)
    public function rules(): array
    {
        return [
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users',
            'password' => 'required|string|min:8|confirmed',
            'role' => 'required|in:Attendee,Organizer'
        ];
    }

    public function messages(): array
    {
        return [
            'name.required' => 'Họ và tên không được để trống.',
            'email.unique' => 'Email này đã được đăng ký rồi.',
            'password.confirmed' => 'Mật khẩu xác nhận không khớp.',

        ];
    }
}