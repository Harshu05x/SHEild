import React from "react";
import { IoIosArrowForward } from "react-icons/io";
import { NavLink } from "react-router-dom";
import { Link } from "react-router-dom";
import { Navigate } from "react-router-dom";
export const Btn=({path})=>
{
    
    console.log(path);
    function clickHandler()
    {
        console.log("in click");
       <NavLink to={path}></NavLink>
    }
    return(
        <div>
            <button className="bg-blue-800 flex flex-row justify-center items-center gap-x-2 text-white hover:opacity-45 font-semibold leading-3 font-serif rounded-e-3xl rounded-s-3xl px-8 py-4" onClick={clickHandler}>
                FIND OUT MORE  <IoIosArrowForward className="text-white font-semibold"/>
            </button>
        </div>
    )
}