import { useEffect, useState } from "react";
import { useAuthStore } from "../../store/authStore";
import useUserStore from "../../store/userStore";

const TABS = [
  { key: "registered", label: "Registered Events" },
  { key: "finished", label: "Finished Events" },
  { key: "cancelled", label: "Cancelled Events" },
];

const getInitials = (name) => {
  if (!name) return "?";
  const parts = name.trim().split(" ");
  if (parts.length === 1) return parts[0][0].toUpperCase();
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
};

const getAvatarColor = (name) => {
  const colors = [
    { bg: "#CECBF6", text: "#3C3489" },
    { bg: "#9FE1CB", text: "#085041" },
    { bg: "#F5C4B3", text: "#712B13" },
    { bg: "#B5D4F4", text: "#0C447C" },
    { bg: "#FAC775", text: "#633806" },
    { bg: "#F4C0D1", text: "#72243E" },
  ];
  if (!name) return colors[0];
  let sum = 0;
  for (let i = 0; i < name.length; i++) sum += name.charCodeAt(i);
  return colors[sum % colors.length];
};

export default function AttendeeProfile() {
  const { user } = useAuthStore();
  const { profile, loading, error, fetchProfile } = useUserStore();
  const [activeTab, setActiveTab] = useState("registered");

  useEffect(() => {
    fetchProfile();
  }, []);

  const displayName = profile?.name || user?.name || "User";
  const displayEmail = profile?.email || user?.email || "";
  const initials = getInitials(displayName);
  const avatarColor = getAvatarColor(displayName);

  return (
    <div style={{ maxWidth: 900, margin: "0 auto", padding: "2rem 1rem" }}>

      {/* Header */}
      <div style={{
        background: "var(--color-background-primary)",
        border: "0.5px solid var(--color-border-tertiary)",
        borderRadius: "var(--border-radius-lg)",
        padding: "1.5rem",
        marginBottom: "1rem",
      }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>

          {/* Avatar + Info */}
          <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
            <div style={{
              width: 80,
              height: 80,
              borderRadius: "50%",
              background: avatarColor.bg,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 28,
              fontWeight: 500,
              color: avatarColor.text,
              flexShrink: 0,
            }}>
              {initials}
            </div>

            <div>
              {loading ? (
                <div style={{ color: "var(--color-text-secondary)", fontSize: 14 }}>Đang tải...</div>
              ) : error ? (
                <div style={{ color: "var(--color-text-danger)", fontSize: 14 }}>{error}</div>
              ) : (
                <>
                  <h1 style={{ margin: 0, fontSize: 22, fontWeight: 500 }}>{displayName}</h1>
                  <p style={{ margin: "4px 0 0", fontSize: 14, color: "var(--color-text-secondary)", display: "flex", alignItems: "center", gap: 6 }}>
                    <i className="ti ti-mail" style={{ fontSize: 15 }} aria-hidden="true" />
                    {displayEmail}
                  </p>
                </>
              )}
            </div>
          </div>

          {/* Edit Profile Button */}
          <button
            onClick={() => {/* navigate to edit page */}}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 6,
              padding: "8px 16px",
              borderRadius: "var(--border-radius-md)",
              border: "none",
              background: "#534AB7",
              color: "#EEEDFE",
              fontSize: 14,
              fontWeight: 500,
              cursor: "pointer",
            }}
          >
            <i className="ti ti-edit" style={{ fontSize: 15 }} aria-hidden="true" />
            Edit profile
          </button>

        </div>
      </div>

      {/* Tabs */}
      <div style={{
        background: "var(--color-background-primary)",
        border: "0.5px solid var(--color-border-tertiary)",
        borderRadius: "var(--border-radius-lg)",
        overflow: "hidden",
      }}>
        {/* Tab bar */}
        <div style={{
          display: "flex",
          borderBottom: "0.5px solid var(--color-border-tertiary)",
        }}>
          {TABS.map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              style={{
                padding: "14px 20px",
                border: "none",
                background: "transparent",
                fontSize: 14,
                fontWeight: activeTab === tab.key ? 500 : 400,
                color: activeTab === tab.key ? "#534AB7" : "var(--color-text-secondary)",
                borderBottom: activeTab === tab.key ? "2px solid #534AB7" : "2px solid transparent",
                cursor: "pointer",
                transition: "all 0.15s",
                marginBottom: -1,
              }}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Tab content */}
        <div style={{ padding: "1.5rem" }}>
          {activeTab === "registered" && (
            <EmptyState message="Bạn chưa đăng ký sự kiện nào." icon="ti-calendar" />
          )}
          {activeTab === "finished" && (
            <EmptyState message="Chưa có sự kiện nào hoàn thành." icon="ti-circle-check" />
          )}
          {activeTab === "cancelled" && (
            <EmptyState message="Chưa có sự kiện nào bị huỷ." icon="ti-calendar-off" />
          )}
        </div>
      </div>

    </div>
  );
}

function EmptyState({ message, icon }) {
  return (
    <div style={{
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      padding: "3rem 1rem",
      color: "var(--color-text-secondary)",
      gap: 12,
    }}>
      <i className={`ti ${icon}`} style={{ fontSize: 40 }} aria-hidden="true" />
      <p style={{ margin: 0, fontSize: 14 }}>{message}</p>
    </div>
  );
}