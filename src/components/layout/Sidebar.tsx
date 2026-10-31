import React, { useEffect } from "react";

interface NavigationProps {
  isMenuOpen: boolean;
  toggleMenu: () => void;
}

const Sidebar: React.FC<NavigationProps> = ({ isMenuOpen, toggleMenu }) => {
  useEffect(() => {
    const previousOverflow = document.body.style.overflow;

    if (isMenuOpen) {
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [isMenuOpen]);

  const genres = [
    "comedy",
    "drama",
    "fantasy & sci-fi",
    "kids & family",
    "adult animation",
    "action",
    "crime",
    "horror",
  ];

  return (
    <header
      // className={`fixed top-0 left-0 h-screen w-full transform bg-linear-to-r from-black/70 via-black/35 to-black/10 z-40 px-4 ${
      //   isMenuOpen ? "translate-x-0" : "-translate-x-full"
      // } transition-transform duration-300 ease-in-out filter`}
      className={`fixed top-0 left-0 h-screen w-full transform bg-linear-to-r from-black/70 to-transparent z-40 px-4 sm:px-9 lg:px-12 ${
        isMenuOpen ? "translate-x-0" : "-translate-x-full"
      } transition-transform duration-300 ease-in-out filter`}
    >
      <div className="mt-17.5">
        {/* <div className="block md:hidden">
          <div className="flex flex-col">
            {menus.map((menu, index) => (
              <span key={index}>{menu.title}</span>
            ))}
          </div>
        </div> */}
        <ul className="mt-17.5">
          {genres.map((genre, index) => (
            <li
              key={index}
              className="text-white w-fit cursor-pointer text-base mb-2"
              onClick={toggleMenu}
            >
              <span className="capitalize">{genre}</span>
            </li>
          ))}
        </ul>
      </div>
    </header>
  );
};

export default Sidebar;
