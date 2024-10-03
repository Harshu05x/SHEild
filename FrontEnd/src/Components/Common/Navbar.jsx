import React from "react";
import { NavbarLinks } from "../../data/navbar-links";
import { NavLink } from "react-router-dom";
import { Link } from "react-router-dom";
import file from "../../assets/Logo/file.png";
import { MdOutlineKeyboardArrowDown } from "react-icons/md";
import { useSelector } from "react-redux";

const Navbar=(props)=>
{
    const {token}=useSelector((state)=>state.auth);
    const {user}=useSelector((state)=>state.profile);
    return(
        <div className="flex flex-row h-[100px] w-full items-center justify-center fixed z-50 top-0 border-b-2 shadow-md bg-slate-50">
            <div className="flex flex-row w-9/12 justify-between py-4">
                {/* logo */}
               
                    <Link to={'/'}> 
                        <div className="flex flex-col justify-center items-center pb-3 pt-2">
                            <img src={file} alt="" width={80} height={30} loading="lazy"/>
                            <p className="text-red-600 text-center leading-3 pb-2">𝗦𝗛𝗘𝗶𝗹𝗱</p>
                        </div>
                        
                        
                        {/* SHEild name remaining */}
                    </Link>
                

                    {/* NavLinks */}
                    <nav >
                        <ul className="flex gap-x-6 flex-row items-center my-auto justify-center pt-4">
                            {
                                NavbarLinks.map((link,index)=>
                                {
                                    return(
                                    <li key={index} className="">
                                        {
                                            link.title === "Educational Information" ?
                                            (
                                                //ADD Componet for dropdown
                                              
                                                <div className="text-violet-600 flex justify-center items-center font-semibold leading-4 hover:text-violet-400 ">
                                                        {link?.title}
                                                        <MdOutlineKeyboardArrowDown  className="w-7 h-7"/>
                                                </div>
                                               
                                               
                                            ):
                                            (
                                                <NavLink to={link?.path}>
                                                    <p className="text-violet-600 font-semibold leading-4 hover:text-violet-400 p-4 m-4 ">
                                                        {link?.title}
                                                    </p>
                                                </NavLink>
                                            )
                                        }
                                    </li>
                                    )
                                    
                                })
                            }
                        </ul>
                    </nav>

                    <div className="flex gap-x-4 items-center">
                    {
                        user && (
                            <Link to={"/dashboard"} className="relative text-richblack-5 text-2xl">
                                {/* remaining */}
                            </Link>
                        )
                    }
                    {
                        token === null && (
                            <Link to={"/login"}>
                                <button className="border border-purple-400 shadow-sm bg-purple-400 text-white py-[8px] px-[16px] rounded-md">
                                    Log in
                                </button>
                            </Link>
                        )
                    }
                    {
                        token === null && (
                            <Link to={"/signup"}>
                                <button className="border border-purple-400 shadow-sm bg-purple-400 text-white py-[8px] px-[16px]  rounded-md">
                                    Sign Up
                                </button>
                            </Link>
                        )
                    }
                    {
                        // Remaining
                        // token !== null 
                    }
                    </div>
                
            </div>

        </div>
    )
}

export default Navbar;