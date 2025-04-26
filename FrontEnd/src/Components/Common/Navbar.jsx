import React, { useState } from "react";
import { NavbarLinks } from "../../data/navbar-links";
import { EducationalInfo } from "../../data/educational-Info";
import { NavLink, Link } from "react-router-dom";
import file from "../../assets/Logo/file.png";
import { MdOutlineKeyboardArrowDown } from "react-icons/md";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu"
import { setToken } from "../../slices/authSlice";
import { setUser } from "../../slices/profileSlice";
import { useDispatch } from "react-redux";
import { BellIcon } from "lucide-react";
import NotificationModel from "./NotificationModel";
import { useNavigate } from "react-router-dom";

const Navbar = (props) => {
  const { token } = useSelector((state) => state.auth);
  const { user, notifications } = useSelector((state) => state.profile);
  const dispatch = useDispatch();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const navigate = useNavigate();



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
                  <DropdownMenu>
                    <DropdownMenuTrigger>
                      <p className="text-blue-900 font-semibold leading-4 hover:text-blue-800 p-4 flex justify-center items-center">
                        Educational Information <MdOutlineKeyboardArrowDown className="w-7 h-7" />
                      </p>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent
                      className="flex flex-col gap-y-2 p-2 text-blue-900 font-semibold"
                    >
                      {EducationalInfo.map((info, idx) => (
                        <NavLink
                          key={idx}
                          to={info.path}
                        >
                          {info.title}
                        </NavLink>
                      ))}
                    </DropdownMenuContent>
                  </DropdownMenu>
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
          {user && notifications.length > 0 && (
            <DropdownMenu>
              <DropdownMenuTrigger className="relative">
                <BellIcon className="w-6 h-6 text-blue-900" />
                {notifications.length > 0 && (
                  <div className="absolute bottom-4 left-3 w-4 h-4 bg-red-500 rounded-full flex items-center justify-center animate-bounce">
                    <span className="text-white text-xs">{notifications.length}</span>
                  </div>
                )}
              </DropdownMenuTrigger>
              <DropdownMenuContent className="flex flex-col gap-y-2 p-2">
                {notifications.map((notification, index) => (
                    <NotificationModel key={notification._id} notification={notification} />
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          )}
          {
            user && (
              <DropdownMenu>
                <DropdownMenuTrigger>
                  <Avatar className="w-10 h-10 rounded-full bg-blue-900">
                    <AvatarImage src={user?.img} />
                    <AvatarFallback className="text-white bg-blue-900">
                      {user?.firstName?.[0]?.toUpperCase() || 'U'}
                    </AvatarFallback>
                  </Avatar>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuLabel>
                    {user?.firstName} {user?.lastName}
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem
                    className="text-red-600 hover:text-red-800"
                    onClick={() => {
                      localStorage.removeItem("token");
                      localStorage.removeItem("user");
                      dispatch(setToken(null));
                      dispatch(setUser(null));
                      navigate("/login");
                    }}
                  >Logout</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>

            )
          }
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