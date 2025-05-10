"use client";
import React, { useState } from "react";
import DesktopMenu from "./menu/desktopMenu";
import MobileMenu from "./menu/mobileMenu";
import Logo from "./logo";

const Navbar = () => {
  const [activeLink, setActiveLink] = useState("");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <nav className="bg-[#F5F5F7]">
      <div className="w-full xl:max-w-6xl mx-auto sm:pl-2">
        <ul className="flex justify-between items-center space-x-4">
          <Logo />

          <DesktopMenu activeLink={activeLink} setActiveLink={setActiveLink} />

          <li>
            <svg
              height="48"
              viewBox="0 0 17 48"
              width="14"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              className="text-[#000c] max-md:hidden"
            >
              <path d="m16.2294 29.9556-4.1755-4.0821a6.4711 6.4711 0 1 0 -1.2839 1.2625l4.2005 4.1066a.9.9 0 1 0 1.2588-1.287zm-14.5294-8.0017a5.2455 5.2455 0 1 1 5.2455 5.2527 5.2549 5.2549 0 0 1 -5.2455-5.2527z"></path>
            </svg>
          </li>

          <li>
            <svg
              height="48"
              viewBox="0 0 17 48"
              width="14"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              className="text-[#000c] max-md:hidden"
            >
              <path d="m13.4575 16.9268h-1.1353a3.8394 3.8394 0 0 0 -7.6444 0h-1.1353a2.6032 2.6032 0 0 0 -2.6 2.6v8.9232a2.6032 2.6032 0 0 0 2.6 2.6h9.915a2.6032 2.6032 0 0 0 2.6-2.6v-8.9231a2.6032 2.6032 0 0 0 -2.6-2.6001zm-4.9575-2.2768a2.658 2.658 0 0 1 2.6221 2.2764h-5.2442a2.658 2.658 0 0 1 2.6221-2.2764zm6.3574 13.8a1.4014 1.4014 0 0 1 -1.4 1.4h-9.9149a1.4014 1.4014 0 0 1 -1.4-1.4v-8.9231a1.4014 1.4014 0 0 1 1.4-1.4h9.915a1.4014 1.4014 0 0 1 1.4 1.4z"></path>
            </svg>
          </li>

          <div className="flex justify-center items-center gap-10 sm:hidden">
            <li>
              <svg
                height="48"
                viewBox="0 0 17 48"
                width="14"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                className="text-[#000c]"
              >
                <path d="m16.2294 29.9556-4.1755-4.0821a6.4711 6.4711 0 1 0 -1.2839 1.2625l4.2005 4.1066a.9.9 0 1 0 1.2588-1.287zm-14.5294-8.0017a5.2455 5.2455 0 1 1 5.2455 5.2527 5.2549 5.2549 0 0 1 -5.2455-5.2527z"></path>
              </svg>
            </li>

            <li>
              <svg
                height="48"
                viewBox="0 0 17 48"
                width="14"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                className="text-[#000c]"
              >
                <path d="m13.4575 16.9268h-1.1353a3.8394 3.8394 0 0 0 -7.6444 0h-1.1353a2.6032 2.6032 0 0 0 -2.6 2.6v8.9232a2.6032 2.6032 0 0 0 2.6 2.6h9.915a2.6032 2.6032 0 0 0 2.6-2.6v-8.9231a2.6032 2.6032 0 0 0 -2.6-2.6001zm-4.9575-2.2768a2.658 2.658 0 0 1 2.6221 2.2764h-5.2442a2.658 2.658 0 0 1 2.6221-2.2764zm6.3574 13.8a1.4014 1.4014 0 0 1 -1.4 1.4h-9.9149a1.4014 1.4014 0 0 1 -1.4-1.4v-8.9231a1.4014 1.4014 0 0 1 1.4-1.4h9.915a1.4014 1.4014 0 0 1 1.4 1.4z"></path>
              </svg>
            </li>

            <li onClick={() => setMobileMenuOpen(true)}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="size-5 text-[#000c] "
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3.75 9h16.5m-16.5 6.75h16.5"
                ></path>
              </svg>
            </li>
          </div>

          <MobileMenu
            activeLink={activeLink}
            setActiveLink={setActiveLink}
            mobileMenuOpen={mobileMenuOpen}
            setMobileMenuOpen={setMobileMenuOpen}
          />
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
