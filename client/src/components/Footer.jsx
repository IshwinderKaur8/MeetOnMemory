import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-white border-t border-gray-200 pt-16 pb-8 mt-auto">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* Column 1: Project Info */}
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-3">
              <img src="/favicon.svg" alt="logo" className="w-8 h-8" />
              <span className="font-semibold text-xl text-gray-800">MeetOnMemory</span>
            </div>
            <p className="text-gray-600 font-medium">
              AI-Powered Meeting Memory & Management Platform
            </p>
            <p className="text-gray-500 text-sm leading-relaxed">
              Transform meetings, discussions, and organizational knowledge into a searchable and structured repository using AI.
            </p>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-6">Quick Links</h3>
            <ul className="flex flex-col gap-3">
              <li>
                <Link
                  to="/"
                  className="text-gray-600 hover:text-blue-600 transition-all duration-300 transform hover:-translate-y-0.5 hover:drop-shadow-sm inline-block"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  to="/dashboard"
                  className="text-gray-600 hover:text-blue-600 transition-all duration-300 transform hover:-translate-y-0.5 hover:drop-shadow-sm inline-block"
                >
                  Dashboard
                </Link>
              </li>
              <li>
                <Link
                  to="/login"
                  className="text-gray-600 hover:text-blue-600 transition-all duration-300 transform hover:-translate-y-0.5 hover:drop-shadow-sm inline-block"
                >
                  Login
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Resources */}
          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-6">Resources</h3>
            <ul className="flex flex-col gap-3">
              <li>
                <a
                  href="https://github.com/imuniqueshiv/MeetOnMemory"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-600 hover:text-blue-600 transition-all duration-300 transform hover:-translate-y-0.5 hover:drop-shadow-sm inline-block"
                >
                  GitHub Repository
                </a>
              </li>
              <li>
                <a
                  href="https://github.com/imuniqueshiv"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-600 hover:text-blue-600 transition-all duration-300 transform hover:-translate-y-0.5 hover:drop-shadow-sm inline-block"
                >
                  Report Issues
                </a>
              </li>
              <li>
                <a
                  href="https://github.com/imuniqueshiv/MeetOnMemory/blob/main/CONTRIBUTING.md"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-600 hover:text-blue-600 transition-all duration-300 transform hover:-translate-y-0.5 hover:drop-shadow-sm inline-block"
                >
                  Contributing
                </a>
              </li>
            </ul>
          </div>

          {/* Column 4: Built with */}
          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-6">Built with</h3>
            <ul className="flex flex-col gap-3 text-gray-600">
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-blue-600"></span>
                React
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-blue-600"></span>
                Node.js
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-blue-600"></span>
                Express
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-blue-600"></span>
                MongoDB
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-blue-600"></span>
                Google Gemini
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="pt-8 border-t border-gray-200 flex flex-col md:flex-row justify-between items-center gap-4 text-center md:text-left">
          <p className="text-gray-500 text-sm">
            &copy; {currentYear} MeetOnMemory.
          </p>
          <p className="text-gray-500 text-sm">
            Built with ❤️ by the MeetOnMemory Community.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
