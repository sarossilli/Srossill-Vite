import React from 'react';
import { Link } from 'react-router-dom';

const Header: React.FC = () => {
  return (
    <header className="sticky top-0 z-50 backdrop-blur-md bg-gray-800/75 border-b border-gray-700/50">
      <nav className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo and Name */}
          <div className="flex items-center space-x-2">
            <Link 
              to="/" 
              className="text-xl font-thin text-white/90 hover:text-white transition-colors" 
              data-testid="logo"
            >
              Sam Rossilli
            </Link>
          </div>
          
          {/* Navigation Links */}
          <div className="flex items-center space-x-6">
            {[
              { to: '/', label: 'Home' },
              { to: '/blog', label: 'Blog' },
              { to: '/about', label: 'About' }
            ].map(({ to, label }) => (
              <Link
                key={to}
                to={to}
                className="text-gray-300/90 hover:text-white transition-colors relative group"
              >
                {label}
                <span className="absolute inset-x-0 -bottom-1 h-0.5 bg-blue-500 scale-x-0 group-hover:scale-x-100 transition-transform" />
              </Link>
            ))}
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;