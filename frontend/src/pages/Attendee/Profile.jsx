import { useEffect, useState } from "react";
import { useAuthStore } from "../../store/authStore";
import { useNavigate } from "react-router-dom";
import useUserStore from "../../store/userStore";
import EventCard from "../Public/components/EventCard/EventCard.jsx";
import NavBar from "../../components/Layout/NavBar/NavBar.jsx";

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
  const colors = [{ bg: "#dff7ed", text: "#085041" }];
  if (!name) return colors[0];
  let sum = 0;
  for (let i = 0; i < name.length; i++) sum += name.charCodeAt(i);
  return colors[sum % colors.length];
};

function EventList({ events, eventsLoading, emptyMessage, emptyIcon }) {
  if (eventsLoading) {
    return (
      <div
        style={{
          textAlign: "center",
          padding: "3rem",
          color: "var(--color-text-secondary)",
          fontSize: 14,
        }}
      >
        Đang tải...
      </div>
    );
  }

  if (!events || events.length === 0) {
    return (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: "3rem 1rem",
          color: "var(--color-text-secondary)",
          gap: 12,
        }}
      >
        <i
          className={`ti ${emptyIcon}`}
          style={{ fontSize: 40 }}
          aria-hidden="true"
        />
        <p style={{ margin: 0, fontSize: 14 }}>{emptyMessage}</p>
      </div>
    );
  }

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
        gap: 24,
      }}
    >
      {events.map((event) => (
        <EventCard key={event.id} event={event} />
      ))}
    </div>
  );
}

export default function Profile() {
  const { user } = useAuthStore();
  const navigate = useNavigate();
  const {
    profile,
    loading,
    error,
    fetchProfile,
    registeredEvents,
    finishedEvents,
    cancelledEvents,
    eventsLoading,
    fetchRegisteredEvents,
    fetchFinishedEvents,
    fetchCancelledEvents,
  } = useUserStore();

  const [activeTab, setActiveTab] = useState("registered");

  useEffect(() => {
    fetchProfile();
    fetchRegisteredEvents();
  }, []);

  const handleTabChange = (tabKey) => {
    setActiveTab(tabKey);
    if (tabKey === "finished") {
      fetchFinishedEvents();
    }
    if (tabKey === "cancelled") {
      fetchCancelledEvents();
    }
  };

  const displayName = profile?.name || user?.name || "User";
  const displayEmail = profile?.email || user?.email || "";
  const initials = getInitials(displayName);
  const avatarColor = getAvatarColor(displayName);

  return (
    <div style={{ background: "var(--color-background-primary)" }}>
      {/* Header */}
      <div style={{ maxWidth: 900, margin: "0 auto", padding: "0 1rem 0" }}>
        <div
          style={{
            background: "var(--color-background-primary)",
            border: "0.5px solid var(--color-border-tertiary)",
            borderRadius: "var(--border-radius-lg)",
            padding: "1.5rem",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
              <div
                style={{
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
                }}
              >
                {initials}
              </div>
              <div>
                {loading ? (
                  <div
                    style={{
                      color: "var(--color-text-secondary)",
                      fontSize: 14,
                    }}
                  >
                    Đang tải...
                  </div>
                ) : error ? (
                  <div
                    style={{ color: "var(--color-text-danger)", fontSize: 14 }}
                  >
                    {error}
                  </div>
                ) : (
                  <>
                    <h1 style={{ margin: 0, fontSize: 22, fontWeight: 500 }}>
                      {displayName}
                    </h1>
                    <p
                      style={{
                        margin: "4px 0 0",
                        fontSize: 14,
                        color: "var(--color-text-secondary)",
                        display: "flex",
                        alignItems: "center",
                        gap: 0,
                      }}
                    >
                      <i
                        className="ti ti-mail"
                        style={{ fontSize: 15 }}
                        aria-hidden="true"
                      />
                      {displayEmail}
                    </p>
                  </>
                )}
              </div>
            </div>
            <button
              onClick={() => navigate("/profile/edit")}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 6,
                padding: "8px 16px",
                borderRadius: "12px",
                border: "none",
                background: "#0b4a3a",
                color: "#e6f0ee",
                fontSize: 14,
                fontWeight: 500,
                cursor: "pointer",
              }}
            >
              <i
                className="ti ti-pencil"
                style={{ fontSize: 15 }}
                aria-hidden="true"
              />
              Edit profile
            </button>
          </div>
        </div>
      </div>

      {/* Tabs - full width xám */}
      <div style={{ background: "#f0f2f5", minHeight: "60vh" }}>
        {/* Tab bar */}
        <div style={{ background: "#ffffff" }}>
          <div
            style={{
              maxWidth: 900,
              margin: "0 auto",
              padding: "0 1rem",
            }}
          >
            <div
              style={{
                background: "var(--color-background-primary)",
                display: "flex",
                borderBottom: "0.5px solid var(--color-border-tertiary)",
                borderRadius:
                  "var(--border-radius-lg) var(--border-radius-lg) 0 0",
              }}
            >
              {TABS.map((tab) => (
                <button
                  key={tab.key}
                  onClick={() => handleTabChange(tab.key)}
                  style={{
                    padding: "14px 20px",
                    border: "none",
                    background: "transparent",
                    fontSize: 14,
                    fontWeight: activeTab === tab.key ? 500 : 400,
                    color:
                      activeTab === tab.key
                        ? "#0b4a3a"
                        : "var(--color-text-secondary)",
                    borderBottom:
                      activeTab === tab.key
                        ? "2px solid #0b4a3a"
                        : "2px solid transparent",
                    cursor: "pointer",
                    transition: "all 0.15s",
                    marginBottom: -1,
                  }}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>
        </div>
        {/* Content */}
        <div
          style={{ maxWidth: 900, margin: "0 auto", padding: "1.5rem 1rem" }}
        >
          {activeTab === "registered" && (
            <EventList
              events={registeredEvents}
              eventsLoading={eventsLoading}
              emptyMessage="You haven't registered for any events yet."
              emptyIcon="ti-calendar"
            />
          )}
          {activeTab === "finished" && (
            <EventList
              events={finishedEvents}
              eventsLoading={eventsLoading}
              emptyMessage="No finished events yet."
              emptyIcon="ti-circle-check"
            />
          )}
          {activeTab === "cancelled" && (
            <EventList
              events={cancelledEvents}
              eventsLoading={eventsLoading}
              emptyMessage="No cancelled events yet."
              emptyIcon="ti-calendar-off"
            />
          )}
        </div>
      </div>
    </div>
  );
}
