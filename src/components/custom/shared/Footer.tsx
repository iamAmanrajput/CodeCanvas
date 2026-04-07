import Link from "next/link";
import React from "react";

const Footer = () => {
  const getCurrentYear = () => new Date().getFullYear();
  return (
    <footer className="w-full bg-linear-to-br from-customTeal to-customBlack">
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center py-8 gap-4">
        <p className="text-sm text-gray-300">
          © {getCurrentYear()} CodeCanvas. All rights reserved.
        </p>

        <nav className="flex gap-6 text-sm">
          <Link href="#" className="hover:text-customWhite">
            Privacy
          </Link>
          <Link href="#" className="hover:text-customWhite">
            Terms
          </Link>
          <Link href="#" className="hover:text-customWhite">
            Contact
          </Link>
        </nav>
      </div>
    </footer>
  );
};

export default Footer;
