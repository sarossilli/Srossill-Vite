// src/components/Footer.tsx
import { Link } from 'react-router-dom';
import { Linkedin, Github, User } from 'lucide-react';  // Using lucide icons

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300 py-4">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center">
          {/* Left - Copyright */}
          <div className="text-sm text-gray-400">
            © {new Date().getFullYear()} Sam Rossilli
          </div>
          {/* Middle - Social Links */}
          <div className="flex space-x-4">
            <a 
              href="https://github.com/sarossilli" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-white transition-colors"
            >
              <Github size={20} />
            </a>
            <a 
              href="https://www.linkedin.com/in/sarossilli" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-white transition-colors"
            >
              <Linkedin size={20} />
            </a>
            <Link 
              to="/admin" 
              className="text-gray-400 hover:text-white transition-colors"
            >
              <User size={20} />
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;