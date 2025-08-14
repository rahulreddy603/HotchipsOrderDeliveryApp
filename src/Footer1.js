import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-6">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          {/* Brand Message */}
          <div className="mb-6 md:mb-0 text-center md:text-left">
            <h2 className="text-xl font-bold">Shree Laxmi Hot Chips</h2>
            <p className="text-sm mt-2">Crafted with Gemini Sunflower Oil for crispy perfection</p>
            <p className="text-sm">Committed to cleanliness and quality</p>
          </div>

          {/* Customer Interaction */}
          <div className="mb-6 md:mb-0 text-center">
            <h3 className="text-lg font-semibold">Connect With Us</h3>
            <p className="text-sm mt-2">
              <a
                href="https://wa.me/7620711494?text=Hello%20Shree%20Laxmi%20Hot%20Chips,%20here%20is%20my%20feedback:"
                target="_blank"
                rel="noopener noreferrer"
                className="underline hover:text-yellow-400 focus:outline-none"
              >
                Share Your Feedback
              </a>
            </p>
            <div className="flex justify-center space-x-4 mt-2">
              
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M18.77 7.46H14.5v-1.9c0-.9.6-1.1 1-1.1h3V.5h-4.33C10.24.5 9.5 3.44 9.5 5.32v2.14h-3v4h3v12h5v-12h3.85l.42-4z" />
                </svg>
              
                
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M12 2.16c3.2 0 3.58.01 4.85.07 1.17.06 1.97.24 2.67.51.73.29 1.36.68 1.98 1.3s1.01 1.25 1.3 1.98c.27.7.45 1.5.51 2.67.06 1.27.07 1.65.07 4.85s-.01 3.58-.07 4.85c-.06 1.17-.24 1.97-.51 2.67-.29.73-.68 1.36-1.3 1.98s-1.25 1.01-1.98 1.3c-.7.27-1.5.45-2.67.51-1.27.06-1.65.07-4.85.07s-3.58-.01-4.85-.07c-1.17-.06-1.97-.24-2.67-.51-.73-.29-1.36-.68-1.98-1.3s-1.01-1.25-1.3-1.98c-.27-.7-.45-1.5-.51-2.67-.06-1.27-.07-1.65-.07-4.85s.01-3.58.07-4.85c.06-1.17.24-1.97.51-2.67.29-.73.68-1.36 1.3-1.98s1.25-1.01 1.98-1.3c.7-.27 1.5-.45 2.67-.51 1.27-.06 1.65-.07 4.85-.07m0-2.16c-3.26 0-3.67.01-4.97.07-1.3.06-2.19.27-2.97.57-.81.32-1.5.75-2.18 1.43S1.3 3.87 1 4.68c-.3.78-.51 1.67-.57 2.97-.06 1.3-.07 1.71-.07 4.97s.01 3.67.07 4.97c.06 1.3.27 2.19.57 2.97.32.81.75 1.5 1.43 2.18s1.37 1.11 2.18 1.43c.78.3 1.67.51 2.97.57 1.3.06 1.71.07 4.97.07s3.67-.01 4.97-.07c1.3-.06 2.19-.27 2.97-.57.81-.32 1.5-.75 2.18-1.43s1.11-1.37 1.43-2.18c.3-.78.51-1.67.57-2.97.06-1.3.07-1.71.07-4.97s-.01-3.67-.07-4.97c-.06-1.3-.27-2.19-.57-2.97-.32-.81-.75-1.5-1.43-2.18s-1.37-1.11-2.18-1.43c-.78-.3-1.67-.51-2.97-.57-1.3-.06-1.71-.07-4.97-.07z" />
                </svg>
              
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-6 text-center text-sm border-t border-gray-700 pt-4">
          <p>&copy; 2025 Shree Laxmi Hot Chips. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;