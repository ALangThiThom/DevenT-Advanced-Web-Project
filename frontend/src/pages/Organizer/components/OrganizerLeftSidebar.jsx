import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { LayoutDashboard, Users, MessageSquare } from "lucide-react"; // Hoặc bộ icon bạn đang dùng
import SidebarDropdown from "./SidebarDropdown";
import "./OrganizerLeftSidebar.css";

function OrganizerLeftSidebar() {
  const location = useLocation();
  const navigate = useNavigate();

  // Kiểm tra xem item nào đang active
  const isActive = (path) => {
    return location.pathname === path || location.pathname.startsWith(path);
  };

  const handleMenuItemClick = (path) => {
    navigate(path);
  };

  return (
    <div className="organizer-left-sidebar">
      {/* 1. Nhóm MANAGEMENT */}
      <div className="sidebar-group">
        <p className="group-title">MANAGEMENT</p>

        {/* Mục Dashboard */}
        <div
          className={`menu-item ${isActive("/organizer/dashboard") ? "active" : ""}`}
          onClick={() => handleMenuItemClick("/organizer/dashboard")}
        >
          <LayoutDashboard size={20} className="menu-icon" />
          <span>Dashboard</span>
        </div>

        {/* Mục My Events (Có menu con xổ xuống) */}
        <SidebarDropdown />
      </div>

      {/* 2. Nhóm DATA */}
      <div className="sidebar-group">
        <p className="group-title">DATA</p>

        {/* Mục Attendance */}
        <div
          className={`menu-item ${isActive("/organizer/attendees") ? "active" : ""}`}
          onClick={() => handleMenuItemClick("/organizer/attendees")}
        >
          <Users size={20} className="menu-icon" />
          <span>Attendance</span>
        </div>

        {/* Mục Reviews */}
        <div
          className={`menu-item ${isActive("/organizer/reviews") ? "active" : ""}`}
          onClick={() => handleMenuItemClick("/organizer/reviews")}
        >
          <MessageSquare size={20} className="menu-icon" />
          <span>Reviews</span>
        </div>
      </div>
    </div>
  );
}

export default OrganizerLeftSidebar;
