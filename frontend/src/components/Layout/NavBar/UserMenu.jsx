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
        <svg
          className="navbar__user-icon"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
        >
          <circle cx="12" cy="8" r="4" stroke="currentColor" strokeWidth="2" />
          <path
            d="M 5 18 C 5 15.239 8.134 13 12 13 C 15.866 13 19 15.239 19 18"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
          />
        </svg>
        <span className="navbar__user-name">{user.name}</span>
      </button>
      {isOpen && (
        <div className="navbar__dropdown-menu">
          <a href="/profile" className="navbar__dropdown-item">
            Profile
          </a>
          <a href="/events/mine" className="navbar__dropdown-item">
            My Events
          </a>
          <button
            type="button"
            className="navbar__dropdown-item navbar__dropdown-item--danger"
            onClick={() => {
              setIsOpen(false);
              logout();
            }}
          >
            Log out
          </button>
        </div>
      )}
    </div>
  );
};

export default UserMenu;
