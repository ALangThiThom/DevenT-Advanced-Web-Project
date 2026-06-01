import { useEffect, useRef, useState } from "react";

const UserMenu = ({ user, logout }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);
    return () => document.removeEventListener("mousedown", handleOutsideClick);
  }, []);

  return (
    <div className="navbar__user-menu" ref={dropdownRef}>
      <button
        type="button"
        className="navbar__user-button"
        onClick={() => setIsOpen((prev) => !prev)}
      >
        <span className="usermenu__avatar">
          {user?.name?.charAt(0).toUpperCase()}
        </span>
        <span className="navbar__user-name">{user.name}</span>
      </button>
      {isOpen && (
        <div className="navbar__dropdown-menu">
          <a href="/attendee/profile" className="navbar__dropdown-item">
            <svg
              className="navbar__dropdown-icon"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
            >
              <circle
                cx="12"
                cy="8"
                r="4"
                stroke="currentColor"
                strokeWidth="2"
              />
              <path
                d="M 5 18 C 5 15.239 8.134 13 12 13 C 15.866 13 19 15.239 19 18"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
            Profile
          </a>

          <button
            type="button"
            className="navbar__dropdown-item navbar__dropdown-item--danger"
            onClick={() => {
              setIsOpen(false);
              logout();
            }}
          >
            <svg
              className="navbar__dropdown-icon"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
            >
              <path
                d="M15 12H3M3 12L6 9M3 12L6 15"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M9 7V5C9 4.448 9.448 4 10 4H19C19.552 4 20 4.448 20 5V19C20 19.552 19.552 20 19 20H10C9.448 20 9 19.552 9 19V17"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
            Log out
          </button>
        </div>
      )}
    </div>
  );
};

export default UserMenu;
