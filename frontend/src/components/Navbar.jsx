import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  BookOpen,
  User,
  LogOut,
  Menu,
  X,
  ShieldCheck,
  Library,
} from "lucide-react";

export default function Navbar({ onLogout, userRole }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <nav className="bg-slate-50 w-full border-b border-slate-200 sticky top-0 z-50">
      <div className="container mx-auto px-4 lg:px-8 relative">
        <div className="flex justify-between items-center h-16">
          <Link
            to="/books"
            className="flex items-center space-x-2 text-slate-800 hover:text-amber-600 transition-colors duration-200"
          >
            <Library className=" text-amber-600" size={28} />
            <span className="font-serif text-xl font-medium">BookShelf</span>
          </Link>

          <button
            className="md:hidden p-2 rounded-lg hover:bg-slate-100 focus:outline-none focus:ring-2 focus:ring-slate-200"
            onClick={toggleMenu}
          >
            {isMenuOpen ? (
              <X className="h-6 w-6 text-slate-600" />
            ) : (
              <Menu className="h-6 w-6 text-slate-600" />
            )}
          </button>

          <div className="hidden md:flex items-center space-x-6">
            <Link
              to="/books"
              className="flex items-center space-x-1 text-slate-600 hover:text-amber-600 transition-all duration-200"
            >
              <BookOpen className="h-5 w-5" />
              <span className="font-medium">Browse Books</span>
            </Link>

            <Link
              to="/profile"
              className="flex items-center space-x-1 text-slate-600 hover:text-amber-600 transition-all duration-200"
            >
              <User className="h-5 w-5" />
              <span className="font-medium">Profile</span>
            </Link>

            {userRole === "admin" && (
              <Link
                to="/admin"
                className="flex items-center space-x-1 text-emerald-600 hover:text-emerald-700 transition-all duration-200"
              >
                <ShieldCheck className="h-5 w-5" />
                <span className="font-medium">Admin</span>
              </Link>
            )}

            <button
              onClick={onLogout}
              className="flex items-center space-x-1 text-slate-600 hover:text-red-600 transition-all duration-200"
            >
              <LogOut className="h-5 w-5" />
              <span className="font-medium">Sign Out</span>
            </button>
          </div>
        </div>

        {isMenuOpen && (
          <div className="absolute top-full left-0 w-full bg-white border-t border-slate-200 shadow-lg md:hidden">
            <div className="flex flex-col py-2">
              <Link
                to="/books"
                onClick={closeMenu}
                className="flex items-center space-x-2 px-4 py-3 text-slate-600 hover:bg-slate-50 transition-colors duration-200"
              >
                <BookOpen className="h-5 w-5" />
                <span className="font-medium">Browse Books</span>
              </Link>

              <Link
                to="/profile"
                onClick={closeMenu}
                className="flex items-center space-x-2 px-4 py-3 text-slate-600 hover:bg-slate-50 transition-colors duration-200"
              >
                <User className="h-5 w-5" />
                <span className="font-medium">Profile</span>
              </Link>

              {userRole === "admin" && (
                <Link
                  to="/admin"
                  onClick={closeMenu}
                  className="flex items-center space-x-2 px-4 py-3 text-emerald-600 hover:bg-slate-50 transition-colors duration-200"
                >
                  <ShieldCheck className="h-5 w-5" />
                  <span className="font-medium">Admin</span>
                </Link>
              )}

              <button
                onClick={() => {
                  onLogout();
                  closeMenu();
                }}
                className="flex items-center space-x-2 px-4 py-3 text-slate-600 hover:bg-slate-50 transition-colors duration-200"
              >
                <LogOut className="h-5 w-5" />
                <span className="font-medium">Sign Out</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
