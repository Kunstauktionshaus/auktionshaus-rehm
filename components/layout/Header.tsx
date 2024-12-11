"use client";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import AuthButtonsContainer from "../auth/AuthButtonsContainer";
import LocalSwitcher from "../Locale-Switcher";
import Logo from "../Logo";
import NavComponent from "./MainNavigation";
import { faBarsStaggered, faTimes } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <header className="w-full bg-white font-montserrat">
      <div className="w-full max-w-screen-3xl mx-auto flex justify-between items-center p-2">
        <button className="md:hidden">
          <FontAwesomeIcon
            icon={faBarsStaggered}
            className="text-navy mr-4 text-2xl hover:text-teal"
            onClick={toggleMenu}
          />
        </button>
        <Logo />
        <div className="w-full flex gap-2 justify-end items-center">
          <div className="hidden md:block">
            <LocalSwitcher />
          </div>

          <AuthButtonsContainer />
        </div>
      </div>
      <div className="hidden md:block">
        <NavComponent />
      </div>
      {isMenuOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-10"
          onClick={toggleMenu}
        >
          <div className="fixed top-0 left-0 w-full sm:w-3/4  h-full bg-white shadow-lg z-20 p-5 transition transform duration-500 ease-in-out">
            <button className="text-navy text-2xl mb-6" onClick={toggleMenu}>
              <FontAwesomeIcon icon={faTimes} />
            </button>
            <LocalSwitcher />
            <NavComponent closeMenu={closeMenu} />
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
