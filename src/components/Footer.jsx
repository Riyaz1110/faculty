import React from 'react';
import { Link } from 'react-router-dom';

const ChevronIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 mr-2 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
  </svg>
);

const MailIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
  </svg>
);

const PhoneIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
  </svg>
);

const FacebookIcon = () => (
  <svg fill="currentColor" viewBox="0 0 24 24" className="h-4 w-4 mr-2 text-gray-400">
    <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" />
  </svg>
);

const TwitterIcon = () => (
  <svg fill="currentColor" viewBox="0 0 24 24" className="h-4 w-4 mr-2 text-gray-400">
    <path d="M22.46 6c-.77.35-1.6.58-2.46.69.88-.53 1.56-1.37 1.88-2.38-.83.5-1.75.85-2.72 1.05C18.37 4.5 17.26 4 16 4c-2.35 0-4.27 1.92-4.27 4.29 0 .34.04.67.11.98C8.28 9.09 5.11 7.38 3 4.79c-.37.63-.58 1.37-.58 2.15 0 1.49.75 2.81 1.91 3.56-.71 0-1.37-.2-1.95-.5v.05c0 2.08 1.48 3.82 3.44 4.21a4.22 4.22 0 0 1-1.93.07 4.28 4.28 0 0 0 4 2.98 8.521 8.521 0 0 1-5.33 1.84c-.34 0-.68-.02-1.02-.06C3.44 20.29 5.7 21 8.12 21 16 21 20.33 14.46 20.33 8.79c0-.19 0-.37-.01-.56.84-.6 1.56-1.36 2.14-2.23z" />
  </svg>
);

export default function Footer() {
  return (
    <footer className="flex flex-col text-sm font-sans bg-gray-900 text-gray-400">
      {/* Top blue accent border */}
      <div className="h-1 w-full bg-blue-600"></div>

      {/* Main footer content */}
      <div className="max-w-[1200px] w-full mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">

          {/* JOB SEEKERS */}
          <div className="flex flex-col gap-3">
            <h3 className="text-white font-bold text-sm tracking-wide mb-2 uppercase">Job Seekers</h3>
            <Link to="/search" className="flex items-center hover:text-blue-400 transition-colors duration-200">
              <ChevronIcon /> Find a Job
            </Link>
            <Link to="#" className="flex items-center hover:text-blue-400 transition-colors duration-200">
              <ChevronIcon /> Job Alerts
            </Link>
            <Link to="#" className="flex items-center hover:text-blue-400 transition-colors duration-200">
              <ChevronIcon /> Post a Resume
            </Link>
            <Link to="#" className="flex items-center hover:text-blue-400 transition-colors duration-200">
              <ChevronIcon /> Account Login
            </Link>
          </div>

          {/* EMPLOYERS */}
          <div className="flex flex-col gap-3">
            <h3 className="text-white font-bold text-sm tracking-wide mb-2 uppercase">Employers</h3>
            <Link to="#" className="flex items-center hover:text-blue-400 transition-colors duration-200">
              <ChevronIcon /> Register
            </Link>
            <Link to="#" className="flex items-center hover:text-blue-400 transition-colors duration-200">
              <ChevronIcon /> Post a Job
            </Link>
            <Link to="#" className="flex items-center hover:text-blue-400 transition-colors duration-200">
              <ChevronIcon /> Advertising
            </Link>
            <Link to="#" className="flex items-center hover:text-blue-400 transition-colors duration-200">
              <ChevronIcon /> Account Login
            </Link>
          </div>

          {/* COMPANY */}
          <div className="flex flex-col gap-3">
            <h3 className="text-white font-bold text-sm tracking-wide mb-2 uppercase">Company</h3>
            <Link to="/about-us" className="flex items-center hover:text-blue-400 transition-colors duration-200">
              <ChevronIcon /> About Us
            </Link>
            <Link to="/privacy-policy" className="flex items-center hover:text-blue-400 transition-colors duration-200">
              <ChevronIcon /> Privacy Policy
            </Link>
            <Link to="/terms" className="flex items-center hover:text-blue-400 transition-colors duration-200">
              <ChevronIcon /> Terms and Conditions
            </Link>
          </div>

          {/* CONTACT */}
          <div className="flex flex-col gap-3">
            <h3 className="text-white font-bold text-sm tracking-wide mb-2 uppercase">Contact</h3>
            <a href="mailto:info@campushire.com" className="flex items-center hover:text-blue-400 transition-colors duration-200">
              <MailIcon /> info@campushire.com
            </a>
            <a href="tel:5105087386" className="flex items-center hover:text-blue-400 transition-colors duration-200">
              <PhoneIcon /> 510-508-7386
            </a>
          </div>

          {/* SOCIAL */}
          <div className="flex flex-col gap-3 lg:border-l lg:border-gray-800 lg:pl-8">
            <h3 className="text-white font-bold text-sm tracking-wide mb-2 uppercase">Social</h3>
            <a href="#" className="flex items-center hover:text-blue-400 transition-colors duration-200">
              <FacebookIcon /> Facebook
            </a>
            <a href="#" className="flex items-center hover:text-blue-400 transition-colors duration-200">
              <TwitterIcon /> Twitter
            </a>
          </div>

        </div>
      </div>

      {/* Bottom bar */}
      <div className="py-6 px-6 bg-gray-950">
        <div className="max-w-[1200px] w-full mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs text-gray-500">
            &copy; 2026 CampusHire. All Rights Reserved.
          </p>

          {/* Logo placeholder */}
          <Link to="/" className="flex items-center space-x-2 select-none hover:opacity-80 transition-opacity">
            <div className="w-6 h-6 bg-blue-600 rounded flex items-center justify-center">
              <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
              </svg>
            </div>
            <span className="font-bold text-gray-300 text-sm tracking-tight">CampusHire</span>
          </Link>
        </div>
      </div>
    </footer>
  );
}
