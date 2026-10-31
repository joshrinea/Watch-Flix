import { useState } from "react";
import { FaRegCircleUser, FaRegBookmark } from "react-icons/fa6";
import { IoSearch } from "react-icons/io5";
import Sidebar from "./Sidebar";
import { NavLink } from "react-router";

export const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const [isScrolled, setIsScrolled] = useState<boolean>(false);

  const menus = [
    {
      title: "home",
      route: "/",
    },
    {
      title: "movies",
      route: "/movies",
    },
    {
      title: "TV",
      route: "/tv",
    },
  ];

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleScroll = () => {
    if (window.scrollY > 100) {
      setIsScrolled(true);
    } else {
      setIsScrolled(false);
    }
  };

  window.addEventListener("scroll", handleScroll, true);

  return (
    <nav
      className={`fixed top-0 left-0 w-full mx-auto z-50 flex items-center px-4 sm:px-9 lg:px-12 transition-colors duration-500 h-16 ${isScrolled ? "bg-black/80" : "bg-transparent"}`}
    >
      <div
        className={`w-full flex justify-between items-center transition-colors duration-300`}
      >
        {/* menu hamburger */}
        <div className="block">
          <div
            className="w-6 h-6 cursor-pointer flex flex-col justify-between"
            onClick={() => {
              toggleMenu();
            }}
          >
            <span
              className={`relative z-70 h-1 w-full rounded-lg cursor-pointer transform duration-300 ease-in-out bg-white ${
                isMenuOpen ? "rotate-45 translate-y-2.5" : ""
              }`}
            ></span>
            <span
              className={`h-1 w-full rounded-lg cursor-pointer transform duration-300 ease-in-out bg-white ${
                isMenuOpen ? "w-0 hidden" : ""
              }`}
            ></span>
            <span
              className={`relative z-70 h-1 w-full rounded-lg cursor-pointer transform duration-300 ease-in-out bg-white ${
                isMenuOpen ? "-rotate-45 -translate-y-2.5" : ""
              }`}
            ></span>
          </div>
        </div>
        <Sidebar isMenuOpen={isMenuOpen} toggleMenu={toggleMenu} />
        {/* menu */}
        <div className="flex gap-2">
          {menus.map((menu) => (
            <NavLink
              to={menu.route}
              end={menu.route === "/" || menu.route === "/tv"}
              className={({ isActive }) =>
                `capitalize ${isActive ? "text-red-400" : "text-white"}`
              }
              key={menu.route}
            >
              {menu.title}
            </NavLink>
          ))}
        </div>
        {/* profile */}
        <div className="flex gap-2">
          <IoSearch size={22} className="text-white" />
          <FaRegBookmark size={22} className="text-white" />
          <FaRegCircleUser size={22} className="text-white" />
        </div>
      </div>
    </nav>
  );
};
