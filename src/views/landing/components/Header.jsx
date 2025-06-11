import { useState } from "react";
import { Link, useLocation } from "react-router";
import { Search, ChefHat } from "lucide-react";
import { navLinks } from "@/constants/navLink";

export default function Header() {
  const [searchQuery, setSearchQuery] = useState("");
  const location = useLocation();

  const handleSearch = (e) => {
    e.preventDefault();
    // Handle search functionality here
    console.log("Searching for:", searchQuery);
  };

  const isActiveLink = (path) => {
    return location.pathname === path;
  };

  return (
    <header className="fixed z-50 top-0 left-0 right-0 shadow-md bg-white border-b border-gray-200 px-4 lg:px-6 h-20 flex items-center justify-between">
      {/* Logo */}
      <Link to="/" className="flex items-center">
        <ChefHat className="h-8 w-8 text-purple-600" />
      </Link>

      {/* Navigation Menu */}
      <nav className="hidden md:flex items-center space-x-8">
        {navLinks.map((link) => (
          <Link
            to={link.href}
            className={`text-normal font-semibold transition-colors hover:text-purple-600`}
          >
            {link.label}
          </Link>
        ))}
      </nav>

      {/* Search Bar and Action Buttons */}
      <div className="flex items-center space-x-4">
        {/* Search Bar */}
        <form onSubmit={handleSearch} className="relative hidden sm:block">
          <input
            type="text"
            placeholder="Search here"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-64 px-4 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
          />
          <button
            type="submit"
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
          >
            <Search className="h-4 w-4" />
          </button>
        </form>

        {/* Action Buttons */}
        <div className="flex items-center space-x-3">
          <Link
            to="/signin"
            className="px-4 py-2 text-sm font-medium text-gray-600 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
          >
            Sign in
          </Link>
          <Link
            to="/get-started"
            className="px-4 py-2 text-sm font-medium text-white bg-purple-600 rounded-lg hover:bg-purple-700 transition-colors"
          >
            Get Started
          </Link>
        </div>
      </div>

      {/* Mobile Menu Button (for responsive design) */}
      <button className="md:hidden p-2 text-gray-600 hover:text-gray-900">
        <svg
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M4 6h16M4 12h16M4 18h16"
          />
        </svg>
      </button>
    </header>
  );
}
