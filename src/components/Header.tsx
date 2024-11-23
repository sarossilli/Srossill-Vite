import { Link } from 'react-router-dom';
import icon from '../assets/icon.svg'

const Header = () => {
  return (
    <header className="bg-gray-800 border-b border-gray-700">
      <nav className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo and Name */}
          <div className="flex items-center space-x-2">
            <img src={icon} alt="Logo" className="w-8 h-8" />
            <Link to="/" className="text-xl font-bold text-white" data-testid="logo">Sam Rossilli</Link>
          </div>
          {/* Navigation Links */}
          <div className="flex items-center space-x-6">
            <Link to="/" className="text-gray-300 hover:text-white transition-colors">
              Home
            </Link>
            <Link to="/projects" className="text-gray-300 hover:text-white transition-colors">
              Projects
            </Link>
            <Link to="/blog" className="text-gray-300 hover:text-white transition-colors">
              Blog
            </Link>
            <Link to="/about" className="text-gray-300 hover:text-white transition-colors">
              About
            </Link>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;