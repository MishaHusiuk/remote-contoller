import { useAuth0 } from "@auth0/auth0-react";
import { useEffect, useRef, useState } from "react";

const Profile = () => {
  const { user, isAuthenticated, isLoading, logout } = useAuth0();
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  // Handle clicks outside of the menu to close it
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setMenuOpen(false);
      }
    };
  
    // Add event listener to detect clicks outside the menu
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      // Clean up the event listener when the component is unmounted
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  if (isLoading) {
    return <div>Loading ...</div>;
  }
  
  console.log('user', user)
  return (
    isAuthenticated && user ? (
      <div className="relative" ref={menuRef}>
        {/* Profile Picture */}
        <button onClick={toggleMenu} className="flex items-center focus:outline-none">
          <img
            src={user.picture}
            alt={user.name}
            className="w-10 h-10 rounded-full border-2 border-gray-300"
          />
        </button>

        {/* Dropdown Menu */}
        {menuOpen && (
          <div className="absolute right-0 mt-2 w-48 bg-gray-800 text-white rounded-lg shadow-lg">
            <div className="px-4 py-2 border-b border-gray-700">
              <span className="block font-bold">{user.name}</span>
            </div>
            <div className="px-4 py-2">
              <button
                onClick={() =>
                  logout({ logoutParams: { returnTo: window.location.origin } })
                }
                className="w-full text-left hover:bg-gray-700 rounded-md px-2 py-1"
              >
                Logout
              </button>
            </div>
          </div>
        )}
      </div>
    )
      : null
  );
};

export default Profile;
