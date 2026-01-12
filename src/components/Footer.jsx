import React from 'react';
import { FaHeart } from 'react-icons/fa';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-secondary/50 border-t border-accent/20 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-3 gap-8 mb-8">
          {/* About */}
          <div>
            <h3 className="text-white font-bold mb-4">Blessing Ele Agbonkpolor</h3>
            <p className="text-gray-400 text-sm">
              Agile Project Manager and Cybersecurity Specialist delivering secure, high-impact solutions.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-bold mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm text-gray-400">
              <li>
                <a href="#home" className="hover:text-accent transition-colors">Home</a>
              </li>
              <li>
                <a href="#about" className="hover:text-accent transition-colors">About</a>
              </li>
              <li>
                <a href="#projects" className="hover:text-accent transition-colors">Projects</a>
              </li>
              <li>
                <a href="#contact" className="hover:text-accent transition-colors">Contact</a>
              </li>
            </ul>
          </div>

          {/* Social */}
          <div>
            <h3 className="text-white font-bold mb-4">Follow</h3>
            <ul className="space-y-2 text-sm text-gray-400">
              <li>
                <a
                  href="https://github.com/okutachiblessing"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-accent transition-colors"
                >
                  GitHub
                </a>
              </li>
              <li>
                <a
                  href="https://www.linkedin.com/in/blessing-ele-agbonkpolor"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-accent transition-colors"
                >
                  LinkedIn
                </a>
              </li>
              <li>
                <a
                  href="mailto:okutachiblessing@gmail.com"
                  className="hover:text-accent transition-colors"
                >
                  Email
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-accent/20 pt-8">
          <div className="flex flex-col sm:flex-row justify-between items-center text-sm text-gray-400">
            <p>
              © {currentYear} Blessing Ele Agbonkpolor. All rights reserved.
            </p>
            <p className="flex items-center gap-2 mt-4 sm:mt-0">
              Made with <FaHeart className="text-red-500" size={16} /> by Blessing
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
