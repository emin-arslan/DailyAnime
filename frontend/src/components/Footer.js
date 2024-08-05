import React from 'react';
import logo from "../assets/logo4.png";

const Footer = () => {
  return (
    <footer className="bg-[#353636] bg-opacity-75 text-gray-200 py-8">
      <div className="flex-row justify-center items-center mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="flex-row items-center justify-center object-center mb-4 md:mb-0">
            <img src={logo} className='flex mx-auto'/>
            <p className="text-sm">Your gateway to the world of anime</p>
          </div>
          <div className="flex space-x-4 mb-4 md:mb-0">
            <a href="/about" className="hover:underline">About Us</a>
            <a href="/contact" className="hover:underline">Contact</a>
            <a href="/terms" className="hover:underline">Terms of Service</a>
            <a href="/privacy" className="hover:underline">Privacy Policy</a>
          </div>
          <div className="flex space-x-4">
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
              <svg className="w-6 h-6 fill-current hover:text-blue-600" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                <path d="M22.676 0h-21.352c-.732 0-1.324.592-1.324 1.324v21.352c0 .732.592 1.324 1.324 1.324h11.497v-9.294h-3.128v-3.628h3.128v-2.671c0-3.1 1.893-4.787 4.657-4.787 1.325 0 2.464.099 2.795.143v3.24l-1.918.001c-1.504 0-1.795.714-1.795 1.763v2.31h3.589l-.468 3.628h-3.121v9.293h6.115c.731 0 1.324-.592 1.324-1.324v-21.352c0-.732-.593-1.324-1.324-1.324z"/>
              </svg>
            </a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" aria-label="Twitter">
              <svg className="w-6 h-6 fill-current hover:text-blue-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.016-.611 1.798-1.577 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-2.717 0-4.918 2.201-4.918 4.917 0 .386.044.763.128 1.124-4.083-.205-7.702-2.16-10.125-5.134-.423.726-.666 1.571-.666 2.473 0 1.707.869 3.213 2.191 4.096-.806-.025-1.564-.247-2.228-.616v.062c0 2.385 1.697 4.374 3.946 4.827-.413.112-.849.171-1.296.171-.318 0-.626-.031-.928-.088.627 1.955 2.445 3.379 4.6 3.418-1.68 1.318-3.808 2.104-6.115 2.104-.398 0-.79-.023-1.175-.069 2.181 1.397 4.768 2.213 7.557 2.213 9.054 0 14.002-7.496 14.002-13.986 0-.213-.005-.425-.014-.637.962-.693 1.797-1.562 2.457-2.549z"/>
              </svg>
            </a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
              <svg className="w-6 h-6 fill-current hover:text-pink-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                <path d="M12 2.163c3.204 0 3.584.012 4.849.07 1.366.062 2.633.334 3.608 1.309.975.975 1.247 2.242 1.309 3.608.058 1.265.07 1.645.07 4.849s-.012 3.584-.07 4.849c-.062 1.366-.334 2.633-1.309 3.608-.975.975-2.242 1.247-3.608 1.309-1.265.058-1.645.07-4.849.07s-3.584-.012-4.849-.07c-1.366-.062-2.633-.334-3.608-1.309-.975-.975-1.247-2.242-1.309-3.608-.058-1.265-.07-1.645-.07-4.849s.012-3.584.07-4.849c.062-1.366.334-2.633 1.309-3.608.975-.975 2.242-1.247 3.608-1.309 1.265-.058 1.645-.07 4.849-.07zm0-2.163c-3.259 0-3.67.014-4.947.072-1.47.065-2.917.35-3.997 1.431-1.08 1.08-1.366 2.527-1.431 3.997-.058 1.277-.072 1.688-.072 4.947s.014 3.67.072 4.947c.065 1.47.35 2.917 1.431 3.997 1.08 1.08 2.527 1.366 3.997 1.431 1.277.058 1.688.072 4.947.072s3.67-.014 4.947-.072c1.47-.065 2.917-.35 3.997-1.431 1.08-1.08 1.366-2.527 1.431-3.997.058-1.277.072-1.688.072-4.947s-.014-3.67-.072-4.947c-.065-1.47-.35-2.917-1.431-3.997-1.08-1.08-2.527-1.366-3.997-1.431-1.277-.058-1.688-.072-4.947-.072z"/>
                <path d="M12 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.162 6.162 6.162 6.162-2.759 6.162-6.162-2.759-6.162-6.162-6.162zm0 10.324c-2.295 0-4.162-1.867-4.162-4.162s1.867-4.162 4.162-4.162 4.162 1.867 4.162 4.162-1.867 4.162-4.162 4.162z"/>
                <circle cx="18.406" cy="5.595" r="1.439"/>
              </svg>
            </a>
          </div>
        </div>
        <div className="text-center text-sm text-gray-400 mt-4">
          © {new Date().getFullYear()} AnimeElysium. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
