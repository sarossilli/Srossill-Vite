// src/components/Footer.tsx
import { Link } from 'react-router-dom';
import { Github, Linkedin, User } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300 py-4">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center">
          <div className="text-sm text-gray-400">
            © {new Date().getFullYear()} Sam Rossilli
          </div>

          <div className="flex space-x-4">
            <a 
              href="https://github.com/sarossilli" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-white transition-colors"
              aria-label="GitHub Profile"
            >
              <Github size={20} />
            </a>
            <a 
              href="https://www.linkedin.com/in/sarossilli" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-white transition-colors"
              aria-label="LinkedIn Profile"
            >
              <Linkedin size={20} />
            </a>
            <Link 
              to="/admin" 
              className="text-gray-400 hover:text-white transition-colors"
              aria-label="Admin Login"
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