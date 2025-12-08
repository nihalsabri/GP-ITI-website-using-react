import React from "react";
import { Link } from "react-router-dom";

// Footer component
// - Uses Link (not NavLink)
// - Uses only the 4 links: Home, About Us, Services, Contact
// - Includes company details as placeholders
// - Placeholder image used where the award/logo sits

export default function Footer() {
  return (
    <footer className="w-full bg-[#342560] text-white mt-12">
      <div className="max-w-6xl mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Contact / Company column */}
        <div>
          <h3 className="font-semibold mb-3">Tradesmen Online Ltd</h3>
          <address className="not-italic text-sm space-y-1 text-gray-100">
            <div>4 Ridge House</div>
            <div>Ridge House Drive</div>
            <div>Stoke-on-Trent</div>
            <div>ST1 5SJ</div>
            <div className="mt-3 font-semibold">
              Tel: <span className="font-normal">01234 567890</span>
            </div>
            <div className="font-semibold">
              Email: <span className="font-normal">s7lb@elmkar.co.eg</span>
            </div>
          </address>
        </div>

        {/* Navigation links column (only provided links) */}
        <div>
          <h4 className="font-semibold mb-3">Navigation</h4>
          <ul className="space-y-2 text-gray-100">
            <li>
              <Link to="/" className="hover:underline">
                Home
              </Link>
            </li>
            <li>
              <Link to="/about" className="hover:underline">
                About Us
              </Link>
            </li>
            <li>
              <Link to="/services" className="hover:underline">
                Services
              </Link>
            </li>
            <li>
              <Link to="/contact" className="hover:underline">
                Contact
              </Link>
            </li>
          </ul>
        </div>

        {/* More info column (kept minimal, placeholders) */}
        <div>
          <h4 className="font-semibold mb-3">More info</h4>
          <ul className="space-y-2 text-gray-100 text-sm">
            <li>Privacy Policy</li>
            <li>Cookie Policy</li>
            <li>Terms and conditions</li>
            <li>Resolving issues</li>
          </ul>
        </div>

        {/* Social + placeholder image column */}
        <div>
          <h4 className="font-semibold mb-3">Follow us on social media</h4>
          <div className="flex items-center gap-3 mb-4">
            <Link
              to="#"
              className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition"
            >
              F
            </Link>
            <Link
              to="#"
              className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition"
            >
              I
            </Link>
          </div>

          {/* Placeholder for award / company image */}
          <div className="w-full bg-white rounded-sm p-4 mb-4">
            <div className="w-full h-16 bg-gray-200 flex items-center justify-center text-gray-600">
              Placeholder image
            </div>
          </div>

          <p className="text-sm text-gray-100 font-semibold">
            {/* تعاون مع أفضل الحرفيين المحليين */}
            Working with the best local tradespeople
          </p>
        </div>
      </div>

      <div className="border-t border-white/10 pt-6 pb-6">
        <div className="max-w-6xl mx-auto px-6 text-sm text-gray-200">
          Copyright 2025 by Tradesmen Online Ltd
        </div>
      </div>
    </footer>
  );
}
