<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\Rule;

use GuzzleHttp\Client as GuzzleClient;
use Laravel\Socialite\Facades\Socialite;

class AuthController extends Controller
{
    /**
     * Register a new user and return an access token.
     */
    public function register(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users',
            'password' => 'required|string|min:8|confirmed',
            'role' => 'required|in:organizer,attendee'
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => Hash::make($request->password),
            'role' => $request->role,
        ]);

        $token = $user->createToken('auth_token')->plainTextToken;

        return response()->json([
            'message' => 'Registration successful',
            'access_token' => $token,
            'token_type' => 'Bearer',
            'user' => $user
        ], 201);
    }

    /**
     * Authenticate user credentials and generate a new access token.
     */
    public function login(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'email' => 'required|email',
            'password' => 'required'
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        $user = User::where('email', $request->email)->first();

        if (!$user || !Hash::check($request->password, $user->password)) {
            return response()->json([
                'message' => 'Incorrect email or password.'
            ], 401);
        }

        // Invalidate previous tokens to ensure a fresh session and prevent token accumulation
        $user->tokens()->delete();

        $token = $user->createToken('auth_token')->plainTextToken;

        return response()->json([
            'message' => 'Login successful',
            'access_token' => $token,
            'token_type' => 'Bearer',
            'user' => $user
        ], 200);
    }

    /**
     * Revoke the user's current access token.
     */
    public function logout(Request $request)
    {
        $request->user()->currentAccessToken()->delete();

        return response()->json([
            'message' => 'Logout successful'
        ], 200);
    }

    /**
     * Generate the OAuth URL for Google authentication.
     * The frontend uses this URL to redirect the user to Google's consent screen.
     */
    public function getGoogleAuthUrl()
    {
        $url = Socialite::driver('google')
            ->stateless()
            ->setHttpClient(new GuzzleClient(['verify' => false]))
            ->with(['prompt' => 'select_account'])
            ->redirect()
            ->getTargetUrl();

        return response()->json([
            'success' => true,
            'url' => $url
        ]);
    }

    /**
     * Handle the callback from Google OAuth.
     * Authenticates an existing user or registers a new one via their Google account.
     */
    public function handleGoogleCallback(Request $request)
    {
        try {
            $googleUser = Socialite::driver('google')
                ->stateless()
                ->redirectUrl(config('services.google.redirect'))
                ->setHttpClient(new GuzzleClient(['verify' => false]))
                ->user();

            $user = User::where('email', $googleUser->getEmail())->first();

            if ($user) {
                $user->google_id = $googleUser->getId();
                $user->save();
            } else {
                // Default all new users registering via OAuth to the 'attendee' role
                $user = User::create([
                    'name' => $googleUser->getName(),
                    'email' => $googleUser->getEmail(),
                    'google_id' => $googleUser->getId(),
                    'role' => 'attendee'
                ]);
            }

            $token = $user->createToken('auth_token')->plainTextToken;

            return response()->json([
                'success' => true,
                'message' => 'Google Login Successful',
                'user' => $user,
                'token' => $token
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to authenticate with Google: ' . $e->getMessage()
            ], 400);
        }
    }

    public function updateProfile(Request $request)
    {
        $user = $request->user();

        // Validate dữ liệu truyền lên
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            // Đảm bảo email không bị trùng với người khác, ngoại trừ chính user hiện tại
            'email' => ['required', 'string', 'email', 'max:255', Rule::unique('users')->ignore($user->id)],
        ]);

        // Cập nhật vào DB
        $user->update($validated);

        // Trả về dữ liệu mới để frontend cập nhật lại Zustand store
        return response()->json($user, 200);
    }

    /**
     * Cập nhật/Đổi mật khẩu mới
     */
    public function updatePassword(Request $request)
    {
        $request->validate([
            'newPassword' => 'required|string|min:6',
        ]);

        $user = $request->user();
        
        // Tiến hành mã hóa mật khẩu mới và lưu
        $user->password = Hash::make($request->newPassword);
        $user->save();

        return response()->json(['message' => 'Thay đổi mật khẩu thành công!'], 200);
    }
}
