import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../../store/authStore";
import useUserStore from "../../store/userStore";
import NavBar from "../../components/Layout/NavBar/NavBar.jsx";

export default function EditProfile() {
  const navigate = useNavigate();
  const { user, updateUser } = useAuthStore();
  const { profile, loading, error, updateProfile, updatePassword } =
    useUserStore();

  const [formData, setFormData] = useState({
    name: profile?.name || user?.name || "",
    email: profile?.email || user?.email || "",
    password: "",
    confirmPassword: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formError, setFormError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    if (formError) setFormError("");
    if (successMessage) setSuccessMessage("");
  };

  const validateForm = () => {
    if (!formData.name.trim()) {
      setFormError("Name is required");
      return false;
    }
    if (!formData.email.trim()) {
      setFormError("Email is required");
      return false;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      setFormError("Please enter a valid email address");
      return false;
    }
    if (formData.password && formData.password.length < 6) {
      setFormError("Password must be at least 6 characters");
      return false;
    }
    if (formData.password && formData.password !== formData.confirmPassword) {
      setFormError("Passwords do not match");
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormError("");
    setSuccessMessage("");

    if (!validateForm()) return;

    setIsSubmitting(true);

    try {
      const updateData = {
        name: formData.name,
        email: formData.email,
      };

      await updateProfile(updateData);

      updateUser({
        name: formData.name,
        email: formData.email,
      });

      if (formData.password) {
        await updatePassword({
          newPassword: formData.password,
        });
      }

      setSuccessMessage("Profile updated successfully!");

      setFormData((prev) => ({
        ...prev,
        password: "",
        confirmPassword: "",
      }));

      setTimeout(() => {
        navigate("/attendee/profile");
      }, 2000);
    } catch (err) {
      setFormError(err.message || "Failed to update profile");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDiscard = () => {
    navigate("/attendee/profile");
  };

  return (
    <div
      style={{
        background: "var(--color-background-primary)",
        minHeight: "100vh",
      }}
    >
      <NavBar />

      <div style={{ maxWidth: 800, margin: "0 auto", padding: "2rem 1rem" }}>
        {/* Header */}
        <div style={{ marginBottom: "2rem" }}>
          <h1
            style={{
              margin: 0,
              fontSize: 28,
              fontWeight: 500,
              color: "var(--color-text-primary)",
            }}
          >
            Edit Profile
          </h1>
          <p
            style={{
              margin: "8px 0 0",
              fontSize: 14,
              color: "var(--color-text-secondary)",
            }}
          >
            Manage your public presence and contact details.
          </p>
        </div>

        {/* Form Card */}
        <div
          style={{
            background: "#ffffff",
            boxShadow:
              "0 4px 6px -1px rgba(0, 0, 0, 0.05), 0 2px 4px -1px rgba(0, 0, 0, 0.03)",
            border: "1px solid var(--color-border-tertiary)",
            borderRadius: "12px", // Bo góc chuẩn theo ảnh 2 mẫu search
            padding: "2.5rem",
          }}
        >
          <form onSubmit={handleSubmit}>
            {/* PHẦN 1: PERSONAL INFORMATION */}
            <div style={{ marginBottom: "2.5rem" }}>
              <h2
                style={{
                  fontSize: 16,
                  fontWeight: 600,
                  color: "var(--color-text-primary)",
                  margin: "0 0 1.25rem 0",
                }}
              >
                Personal Information
              </h2>
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr",
                  gap: "1.5rem",
                }}
              >
                <div>
                  <label
                    style={{
                      display: "block",
                      marginBottom: "0.5rem",
                      fontSize: 14,
                      fontWeight: 500,
                      color: "var(--color-text-primary)",
                    }}
                  >
                    Full Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    disabled={isSubmitting}
                    className="custom-input"
                  />
                </div>

                <div>
                  <label
                    style={{
                      display: "block",
                      marginBottom: "0.5rem",
                      fontSize: 14,
                      fontWeight: 500,
                      color: "var(--color-text-primary)",
                    }}
                  >
                    Email Address
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    disabled={isSubmitting}
                    className="custom-input"
                  />
                </div>
              </div>
            </div>

            {/* PHẦN 2: SECURITY */}
            <div style={{ marginBottom: "2.5rem" }}>
              <h2
                style={{
                  fontSize: 16,
                  fontWeight: 600,
                  color: "var(--color-text-primary)",
                  margin: "0 0 1.25rem 0",
                }}
              >
                Security
              </h2>
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr",
                  gap: "1.5rem",
                }}
              >
                <div>
                  <label
                    style={{
                      display: "block",
                      marginBottom: "0.5rem",
                      fontSize: 14,
                      fontWeight: 500,
                      color: "var(--color-text-primary)",
                    }}
                  >
                    Password
                  </label>
                  <input
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    disabled={isSubmitting}
                    placeholder="Leave blank to keep current password"
                    className="custom-input"
                  />
                </div>

                <div>
                  <label
                    style={{
                      display: "block",
                      marginBottom: "0.5rem",
                      fontSize: 14,
                      fontWeight: 500,
                      color: "var(--color-text-primary)",
                    }}
                  >
                    Confirm Password
                  </label>
                  <input
                    type="password"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    disabled={isSubmitting}
                    placeholder="Re-enter new password"
                    className="custom-input"
                  />
                </div>
              </div>
            </div>

            {/* Messages */}
            {formError && (
              <div
                style={{
                  padding: "12px 16px",
                  background: "#fef2f2",
                  border: "0.5px solid #fecaca",
                  borderRadius: "8px",
                  color: "#dc2626",
                  fontSize: 14,
                  marginBottom: "1.5rem",
                }}
              >
                {formError}
              </div>
            )}

            {successMessage && (
              <div
                style={{
                  padding: "12px 16px",
                  background: "#f0fdf4",
                  border: "0.5px solid #bbf7d0",
                  borderRadius: "8px",
                  color: "#16a34a",
                  fontSize: 14,
                  marginBottom: "1.5rem",
                }}
              >
                {successMessage}
              </div>
            )}

            {/* Buttons */}
            <div
              style={{
                display: "flex",
                justifyContent: "flex-end",
                gap: "1rem",
                paddingTop: "1.5rem",
                borderTop: "0.5px solid var(--color-border-tertiary)",
              }}
            >
              <button
                type="button"
                onClick={handleDiscard}
                disabled={isSubmitting}
                style={{
                  padding: "10px 24px",
                  border: "1px solid #767676",
                  borderRadius: "20px",
                  background: "var(--color-background-secondary)",
                  color: "var(--color-text-primary)",
                  fontSize: 14,
                  fontWeight: 500,
                  cursor: isSubmitting ? "not-allowed" : "pointer",
                  transition: "all 0.15s",
                }}
                onMouseEnter={(e) => {
                  if (!isSubmitting) {
                    e.target.style.background =
                      "var(--color-background-tertiary)";
                  }
                }}
                onMouseLeave={(e) => {
                  if (!isSubmitting) {
                    e.target.style.background =
                      "var(--color-background-secondary)";
                  }
                }}
              >
                Discard
              </button>

              <button
                type="submit"
                disabled={isSubmitting}
                style={{
                  padding: "10px 24px",
                  border: "none",
                  borderRadius: "20px", // Bo góc mềm mại cho nút Save đúng yêu cầu
                  background: isSubmitting ? "#1f6b5a" : "#0b4a3a",
                  color: "#e6f0ee",
                  fontSize: 14,
                  fontWeight: 500,
                  cursor: isSubmitting ? "not-allowed" : "pointer",
                  transition: "all 0.15s",
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                }}
                onMouseEnter={(e) => {
                  if (!isSubmitting) {
                    e.target.style.background = "#083a2d";
                  }
                }}
                onMouseLeave={(e) => {
                  if (!isSubmitting) {
                    e.target.style.background = "#0b4a3a";
                  }
                }}
              >
                {isSubmitting ? (
                  <>
                    <i
                      className="ti ti-loader"
                      style={{ animation: "spin 1s linear infinite" }}
                    />
                    Saving...
                  </>
                ) : (
                  "Save Changes"
                )}
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* Thẻ style quản lý các trạng thái hover, focus cho input giống hệt ảnh mẫu */}
      <style>{`
        .custom-input {
        width: 100%;
        padding: 12px 16px;
        border: 1px solid #d1d5db; /* Đổi thành xám nhạt khi ở trạng thái bình thường */
        border-radius: 12px;
        font-size: 14px;
        background: #ffffff;
        color: var(--color-text-primary);
        outline: none;
        box-sizing: border-box;
        transition: border-color 0.15s, box-shadow 0.15s;
        }

        /* Khi hover: màu viền sẽ chuyển từ xám nhạt sang xám đậm rõ rệt */
        .custom-input:hover {
        border-color: #4a4a4a; /* Hoặc dùng #111827 nếu muốn gần như đen hẳn */
        }

        /* Khi click vô (focus): giữ nguyên viền cũ và bọc thêm 1 viền ngoài màu xanh lá rất sát */
        .custom-input:focus {
        border-color: #0b4a3a; 
        box-shadow: 0 0 0 2px #0b4a3a; 
        }

        /* Khi click vô (focus): giữ nguyên viền cũ và bọc thêm 1 viền ngoài màu xanh lá rất sát (giống ảnh 3) */
        .custom-input:focus {
          border-color: #0b4a3a; 
          box-shadow: 0 0 0 2px #0b4a3a; /* Đổ shadow dạng viền đặc ôm sát khít vào input */
        }

        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}
