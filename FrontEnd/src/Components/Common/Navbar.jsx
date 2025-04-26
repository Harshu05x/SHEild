import React, { useState } from "react";
import { NavbarLinks } from "../../data/navbar-links";
import { EducationalInfo } from "../../data/educational-Info";
import { NavLink, Link } from "react-router-dom";
import file from "../../assets/Logo/file.png";
import { MdOutlineKeyboardArrowDown } from "react-icons/md";
import { useSelector } from "react-redux";

const Navbar = (props) => {
  const { token } = useSelector((state) => state.auth);
  const { user } = useSelector((state) => state.profile);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  return (
    <div className="flex flex-row h-[100px] w-full items-center justify-center fixed z-50 top-0 border-b-2 shadow-md bg-slate-50">
      <div className="flex flex-row w-9/12 justify-between py-4 items-center">
        {/* Logo */}
        <Link to="/">
          <div className="flex flex-col justify-center items-center pb-3 pt-2">
            <img src={file} alt="SHEild Logo" width={80} height={30} loading="lazy" />
            <p className="text-red-600 text-center leading-3 pb-2 font-bold">𝗦𝗛𝗘𝗶𝗹𝗱</p>
          </div>
        </Link>

        {/* Nav Links */}
        <nav>
          <ul className="flex gap-x-6 flex-row items-center my-auto justify-center pt-4">
            {NavbarLinks.map((link, index) => (
              <li key={index} className="relative">
                {link.title === "Educational Information" ? (
                  <div
                    className="text-blue-900 flex justify-center items-center font-semibold leading-4 hover:text-blue-800 cursor-pointer"
                    onMouseEnter={() => setIsDropdownOpen(true)}
                    onMouseLeave={() => setIsDropdownOpen(false)}
                  >
                    {link.title}
                    <MdOutlineKeyboardArrowDown className="w-7 h-7" />
                    {/* Dropdown */}
                    {isDropdownOpen && (
                      <div className="absolute top-full left-0 mt-2 w-64 bg-white bg-opacity-90 rounded-md shadow-lg z-50">
                        {EducationalInfo.map((info, idx) => (
                          <NavLink
                            key={idx}
                            to={info.path}
                            className="block px-4 py-2 text-blue-800 hover:bg-blue-100 hover:text-blue-900"
                            onClick={() => setIsDropdownOpen(false)}
                          >
                            {info.title}
                          </NavLink>
                        ))}
                        
                      </div>
                    )}
                  </div>
                ) : (
                  <NavLink to={link?.path}>
                    <p className="text-blue-900 font-semibold leading-4 hover:text-blue-800 p-4">
                      {link.title}
                    </p>
                  </NavLink>
                )}
              </li>
            ))}
          </ul>
        </nav>

        {/* Auth Buttons */}
        <div className="flex gap-x-4 items-center">
          {user && (
            <Link to="/dashboard" className="text-blue-900 font-semibold hover:text-blue-800">
              Dashboard
            </Link>
          )}
          {token === null && (
            <Link to="/login">
              <button className="border border-blue-900 bg-blue-900 text-white py-[8px] px-[16px] rounded-md hover:bg-blue-800">
                Log in
              </button>
            </Link>
          )}
          {token === null && (
            <Link to="/signup">
              <button className="border border-blue-900 bg-blue-900 text-white py-[8px] px-[16px] rounded-md hover:bg-blue-800">
                Sign Up
              </button>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;