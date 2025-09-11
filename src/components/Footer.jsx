import React from "react";
import { FaFacebook, FaInstagram, FaTwitter, FaLinkedin, FaYoutube } from "react-icons/fa";
import logo from "../assets/logo.svg";


export default function Footer() {
  return (
    <footer className="bg-white border-t border-gray-200 text-gray-700">
      <div className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-4 gap-10">
        
        {/* Logo + About */}
        <div>
          <img src={logo} alt="Angelzapp Logo" className="h-10 mb-4" />
          <p className="text-sm leading-6 text-gray-600">
            At angel z app, we are committed to making a difference in the lives of those in need. 
            Through our dedicated team and volunteer network, we strive to create lasting positive 
            impact within our communities. Join us in supporting various causes and building a 
            stronger, more inclusive future.
          </p>
        </div>

        {/* Explore */}
        <div>
          <h3 className="font-semibold text-gray-900 mb-4">Explore</h3>
          <ul className="space-y-2 text-sm">
            <li><a href="/" className="hover:text-orange-500">Home</a></li>
            <li><a href="/organization" className="hover:text-orange-500">Organization</a></li>
            <li><a href="/missions" className="hover:text-orange-500">Missions</a></li>
            <li><a href="/career" className="hover:text-orange-500">Career</a></li>
            <li><a href="/support" className="hover:text-orange-500">Support</a></li>
            <li><a href="/about" className="hover:text-orange-500">About Us</a></li>
            <li><a href="/contact" className="hover:text-orange-500">Contact Us</a></li>
            <li><a href="/more" className="hover:text-orange-500">More</a></li>
          </ul>
        </div>

        {/* Angelzapp */}
        <div>
          <h3 className="font-semibold text-gray-900 mb-4">Angelzapp</h3>
          <ul className="space-y-2 text-sm">
            <li><a href="/what-we-offer" className="hover:text-orange-500">What we offer</a></li>
            <li><a href="/security" className="hover:text-orange-500">Security</a></li>
            <li><a href="/privacy" className="hover:text-orange-500">Privacy</a></li>
            <li><a href="/terms" className="hover:text-orange-500">Terms</a></li>
            <li><a href="/support" className="hover:text-orange-500">Support</a></li>
          </ul>
        </div>

        {/* Social */}
        <div>
          <h3 className="font-semibold text-gray-900 mb-4">Social</h3>
          <ul className="space-y-3 text-sm">
            <li className="flex items-center gap-2"><FaFacebook /> <a href="#">Facebook</a></li>
            <li className="flex items-center gap-2"><FaInstagram /> <a href="#">Instagram</a></li>
            <li className="flex items-center gap-2"><FaTwitter /> <a href="#">Twitter</a></li>
            <li className="flex items-center gap-2"><FaLinkedin /> <a href="#">LinkedIn</a></li>
            <li className="flex items-center gap-2"><FaYoutube /> <a href="#">Youtube</a></li>
          </ul>
        </div>
      </div>

      {/* Copyright */}
      <div className="border-t border-gray-200 text-center py-4 text-sm text-gray-500">
        © 2025 Angelzapp. All rights reserved.
      </div>
    </footer>
  );
}
