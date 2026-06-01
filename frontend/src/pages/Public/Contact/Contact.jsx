import { useState } from "react";

const subjects = [
  "Event Planning Inquiry",
  "Technical Support",
  "Partnership Opportunity",
  "General Question",
  "Other",
];

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: subjects[0],
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div
      style={{
        background: "var(--color-background-primary)",
        minHeight: "100vh",
        padding: "5rem 1rem",
      }}
    >
      <div style={{ textAlign: "center", marginBottom: "2.5rem" }}>
        <h1
          style={{
            fontSize: "clamp(1.8rem, 4vw, 2.5rem)",
            fontWeight: 600,
            color: "#0b4a3a",
            margin: "0 0 0.75rem",
          }}
        >
          Get in Touch
        </h1>
      </div>

      <div
        style={{
          maxWidth: 580,
          margin: "0 auto",
          background: "var(--color-background-primary)",
          border: "1px solid var(--color-border-tertiary)",
          borderRadius: 12,
          padding: "2rem",
        }}
      >
        {submitted ? (
          <div style={{ textAlign: "center", padding: "2rem 0" }}>
            <div
              style={{
                width: 56,
                height: 56,
                borderRadius: "50%",
                background: "#e1f5ee",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                margin: "0 auto 1rem",
              }}
            >
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#0b4a3a"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <polyline points="20 6 9 17 4 12" />
              </svg>
            </div>
            <h2
              style={{
                fontSize: 18,
                fontWeight: 600,
                color: "#0b4a3a",
                margin: "0 0 0.5rem",
              }}
            >
              Message sent!
            </h2>
            <p
              style={{
                fontSize: 14,
                color: "var(--color-text-secondary)",
                margin: "0 0 1.5rem",
              }}
            >
              Thanks for reaching out. We'll get back to you shortly.
            </p>
            <button
              onClick={() => {
                setSubmitted(false);
                setFormData({
                  name: "",
                  email: "",
                  subject: subjects[0],
                  message: "",
                });
              }}
              style={{
                padding: "10px 24px",
                border: "1px solid #d1d5db",
                borderRadius: 20,
                background: "transparent",
                color: "var(--color-text-primary)",
                fontSize: 14,
                cursor: "pointer",
              }}
            >
              Send another message
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit}>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: "1rem",
                marginBottom: "1rem",
              }}
            >
              <div>
                <label style={labelStyle}>Full Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="John Doe"
                  required
                  style={inputStyle}
                  onFocus={(e) => {
                    e.target.style.borderColor = "#0b4a3a";
                    e.target.style.boxShadow = "0 0 0 2px rgba(11,74,58,0.15)";
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = "#d1d5db";
                    e.target.style.boxShadow = "none";
                  }}
                />
              </div>
              <div>
                <label style={labelStyle}>Email Address</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="john@example.com"
                  required
                  style={inputStyle}
                  onFocus={(e) => {
                    e.target.style.borderColor = "#0b4a3a";
                    e.target.style.boxShadow = "0 0 0 2px rgba(11,74,58,0.15)";
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = "#d1d5db";
                    e.target.style.boxShadow = "none";
                  }}
                />
              </div>
            </div>

            <div style={{ marginBottom: "1rem" }}>
              <label style={labelStyle}>Subject</label>
              <div style={{ position: "relative" }}>
                <select
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  style={{
                    ...inputStyle,
                    appearance: "none",
                    paddingRight: 40,
                    cursor: "pointer",
                  }}
                  onFocus={(e) => {
                    e.target.style.borderColor = "#0b4a3a";
                    e.target.style.boxShadow = "0 0 0 2px rgba(11,74,58,0.15)";
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = "#d1d5db";
                    e.target.style.boxShadow = "none";
                  }}
                >
                  {subjects.map((s) => (
                    <option key={s} value={s}>
                      {s}
                    </option>
                  ))}
                </select>
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  style={{
                    position: "absolute",
                    right: 14,
                    top: "50%",
                    transform: "translateY(-50%)",
                    pointerEvents: "none",
                    color: "var(--color-text-secondary)",
                  }}
                >
                  <polyline points="6 9 12 15 18 9" />
                </svg>
              </div>
            </div>

            <div style={{ marginBottom: "1.5rem" }}>
              <label style={labelStyle}>Message</label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder="Tell us more about your needs..."
                required
                rows={5}
                style={{
                  ...inputStyle,
                  resize: "vertical",
                  minHeight: 100,
                }}
                onFocus={(e) => {
                  e.target.style.borderColor = "#0b4a3a";
                  e.target.style.boxShadow = "0 0 0 2px rgba(11,74,58,0.15)";
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = "#d1d5db";
                  e.target.style.boxShadow = "none";
                }}
              />
            </div>

            <button
              type="submit"
              style={{
                width: "100%",
                padding: "13px",
                background: "#0b4a3a",
                color: "#e8f5f1",
                border: "none",
                borderRadius: 8,
                fontSize: 15,
                fontWeight: 500,
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: 8,
                transition: "background 0.15s",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.background = "#083a2d")}
              onMouseLeave={(e) => (e.currentTarget.style.background = "#0b4a3a")}
            >
              Send Message
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="22" y1="2" x2="11" y2="13" />
                <polygon points="22 2 15 22 11 13 2 9 22 2" />
              </svg>
            </button>
          </form>
        )}
      </div>
    </div>
  );
}

const labelStyle = {
  display: "block",
  fontSize: 13,
  fontWeight: 500,
  color: "var(--color-text-primary)",
  marginBottom: 6,
};

const inputStyle = {
  width: "100%",
  padding: "10px 14px",
  border: "1px solid #d1d5db",
  borderRadius: 8,
  fontSize: 14,
  background: "var(--color-background-primary)",
  color: "var(--color-text-primary)",
  outline: "none",
  boxSizing: "border-box",
  transition: "border-color 0.15s, box-shadow 0.15s",
  fontFamily: "inherit",
};