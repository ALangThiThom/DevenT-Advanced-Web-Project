import { useEffect, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { handleGoogleCallback } from "../../services/authService";
import { useAuthStore } from "../../store/authStore";

/**
 * AuthCallback Component
 * Acts as the intermediate processing page that handles the redirect callback from Google OAuth.
 * It extracts the authorization code, sends it to the backend, and updates local auth state.
 */
export default function AuthCallback() {
  const navigate = useNavigate();
  const location = useLocation();
  const login = useAuthStore((state) => state.login);

  // Use a ref to prevent the effect from running twice in React 18 Strict Mode.
  // This ensures we don't consume the one-time-use OAuth code multiple times.
  const isProcessed = useRef(false);

  useEffect(() => {
    const processGoogleAuth = async () => {
      if (isProcessed.current) return;
      isProcessed.current = true;

      try {
        const queryParams = new URLSearchParams(location.search);

        if (queryParams.get("error")) {
          throw new Error("You denied Google access permission.");
        }

        if (!queryParams.get("code")) {
          throw new Error("Authentication code not found from Google.");
        }

        const data = await handleGoogleCallback(location.search);

        if (data.success && data.token) {
          login(data.user, data.token);

          navigate("/attendee/dashboard", { replace: true });
        } else {
          throw new Error(data.message || "Authentication failed.");
        }
      } catch (error) {
        // Lấy message từ response của backend nếu có (axios error)
        const serverMessage =
          error?.response?.data?.message || null;

        console.error("Google Auth Error:", error);
        console.error("Server response:", error?.response?.data);

        alert(
          serverMessage ||
          error.message ||
            "An error occurred while logging in with Google. Please try again!",
        );

        navigate("/attendee/login", { replace: true });
      }
    };

    processGoogleAuth();
  }, [location.search, navigate, login]);

  return (
    <div className="d-flex flex-column justify-content-center align-items-center vh-100 bg-light">
      <div
        className="spinner-border text-primary mb-3"
        role="status"
        style={{ width: "3rem", height: "3rem" }}
      >
        <span className="visually-hidden">Loading...</span>
      </div>
      <h4 className="fw-semibold text-dark">Syncing Google account...</h4>
      <p className="text-muted">Please do not close your browser right now.</p>
    </div>
  );
}
