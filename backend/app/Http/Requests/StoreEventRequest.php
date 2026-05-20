<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Contracts\Validation\Validator;
use Illuminate\Http\Exceptions\HttpResponseException;

class StoreEventRequest extends FormRequest
{
    /**
     * Xác định xem người dùng có quyền thực hiện request này hay không.
     */
    public function authorize(): bool
    {
        // Trả về true vì phân quyền đã được xử lý triệt để ở file Route Middleware (CheckRole)
        return true;
    }

    /**
     * Mảng các quy tắc kiểm tra dữ liệu (Validation Rules).
     */
    public function rules(): array
    {
        return [
            'title' => 'required|string|max:255',
            'description' => 'required|string',
            'location' => 'required|string|max:255',
            'start_time' => 'required|date|after:now',
            'end_time' => 'required|date|after:start_time',
            'capacity' => 'required|integer|min:1',
            'category_id' => 'required|integer|exists:categories,id', // Kiểm tra danh mục hợp lệ
            'status' => 'required|in:draft,published', // Yêu cầu có status từ 2 nút
        ];
    }

    /**
     * Tùy chỉnh format JSON khi Validation thất bại (Giữ nguyên cấu trúc API của bạn).
     */
    protected function failedValidation(Validator $validator)
    {
        throw new HttpResponseException(response()->json([
            'success' => false,
            'errors' => $validator->errors()
        ], 422));
    }
}
