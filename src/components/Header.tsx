import { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";

interface User {
  name?: string;
  email: string;
  photoURL?: string;
}

export default function Header() {
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const authContext = useContext(AuthContext);
  const navigate = useNavigate();

  const { logout } = authContext || {};

  const handleProfileClick = () => setIsPopoverOpen(!isPopoverOpen);

  const handleGoogleSignIn = async () => {
    navigate("/login");
  };

  const handleLogout = () => {
    if (logout) {
      logout();
      window.location.replace("/");
    }
    setIsPopoverOpen(false);
  };

  useEffect(() => {
    const storedUser = sessionStorage.getItem("user");
    if (storedUser) {
      const userData = JSON.parse(storedUser);
      setUser({
        ...userData,
        photoURL: userData.photoURL,
      });
    }
  }, []);

  return (
    <header className="bg-white shadow-md w-full">
      <div className="flex justify-between items-center px-4 py-3 md:px-6 md:py-4">
        {/* Logo */}
        <Link to="/" className="text-xl md:text-2xl font-bold text-green-700">
          Paper Shapers
        </Link>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="text-gray-800 focus:outline-none focus-visible:ring-2 focus-visible:ring-green-300 focus-visible:ring-offset-2 rounded"
            aria-label="Toggle menu"
          >
            <svg
              className="w-6 h-6 md:w-8 md:h-8"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              {isMobileMenuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 8h16M4 16h16"
                />
              )}
            </svg>
          </button>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex space-x-6 items-center">
          <Link to="/" className="hover:text-green-700">
            Home
          </Link>
          <Link to="/about" className="hover:text-green-700">
            About
          </Link>
          <Link to="/services" className="hover:text-green-700">
            Services
          </Link>
          <Link to="/contact" className="hover:text-green-700">
            Contact
          </Link>

          {user ? (
            <div className="relative ml-4">
              <img
                src={user.photoURL}
                alt="Profile"
                className="w-8 h-8 rounded-full cursor-pointer"
                onClick={handleProfileClick}
              />
              {isPopoverOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-2">
                  <button
                    onClick={handleLogout}
                    className="block w-full px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            <button
              onClick={handleGoogleSignIn}
              aria-label="Login to Papershapers"
              className="px-4 py-2 bg-green-700 text-white rounded-full hover:bg-green-800 text-sm flex items-center gap-2 focus:outline-none focus-visible:ring-2 focus-visible:ring-green-300 focus-visible:ring-offset-2"
            >
              Login
            </button>
          )}
        </nav>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white border-t">
          <nav className="flex flex-col items-center space-y-4 py-4">
            <Link
              to="/"
              className="text-gray-700 hover:text-green-700"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Home
            </Link>
            <Link
              to="/about"
              className="text-gray-700 hover:text-green-700"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              About
            </Link>
            <Link
              to="/services"
              className="text-gray-700 hover:text-green-700"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Services
            </Link>
            <Link
              to="/contact"
              className="text-gray-700 hover:text-green-700"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Contact
            </Link>

            {user ? (
              <div className="flex items-center space-x-2 mt-4">
                <img
                  src={user.photoURL}
                  alt="Profile"
                  className="w-8 h-8 rounded-full"
                />
                <span className="text-sm text-gray-700">{user.email}</span>
              </div>
            ) : (
              <button
                onClick={handleGoogleSignIn}
                aria-label="Login to Papershapers"
                className="px-4 py-2 bg-green-700 text-white rounded-full hover:bg-green-800 text-sm flex items-center gap-2 focus:outline-none focus-visible:ring-2 focus-visible:ring-green-300 focus-visible:ring-offset-2"
              >
                Login
              </button>
            )}
          </nav>
        </div>
      )}
    </header>
  );
}
