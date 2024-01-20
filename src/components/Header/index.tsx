import { useState, useCallback, FC } from "react";
import SwitchLang from "../SwitchLang/intex";

const NavLinks: FC = () => (
  <a
    href="https://github.com/EclipsoZhuk/google-map"
    target="_blank"
    rel="noopener noreferrer"
    className="block mt-4 lg:inline-block lg:mt-0 text-blue-200 hover:text-white"
  >
    Github
  </a>
);

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const handleVisibility = useCallback(() => setIsOpen(!isOpen), [isOpen]);

  return (
    <header className=" bg-blue-900">
      <div className="container mx-auto flex items-center justify-between flex-wrap p-6">
        <div className="flex items-center flex-shrink-0 text-white mr-6">
          <span className="font-semibold text-xl tracking-tight">
            Google Map
          </span>
        </div>
        <div className="lg:hidden max-lg:flex">
          <SwitchLang />
        </div>

        <div className="block lg:hidden">
          <button
            className="flex items-center px-3 py-2 border rounded text-blue-200 border-blue-400 hover:text-white hover:border-white"
            onClick={handleVisibility}
          >
            <svg
              className="fill-current h-3 w-3"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <title>Google Map</title>
              <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
            </svg>
          </button>
        </div>

        <div className="lg:flex max-lg:hidden">
          <SwitchLang />
        </div>

        <div
          className={`w-full flex-grow lg:flex lg:items-center lg:justify-end lg:w-auto ${
            isOpen ? "block" : "hidden"
          } `}
        >
          <NavLinks />
        </div>
      </div>
    </header>
  );
};

export default Header;
