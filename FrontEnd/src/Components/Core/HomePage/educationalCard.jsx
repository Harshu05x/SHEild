import React from "react"
import { Btn } from "./btn";
const EducationalCard=({link})=>
{
    console.log(link);
    return(
        <div>
            <div className="flex flex-col gap-9 items-center justify-center pb-10">
                <img src={link?.img} alt="" loading="lazy"/>
                <p className="text-3xl font-semibold text-blue-900 leading-3">{link?.title}</p>
                <p className="text-base font-serif text-center tracking-widest  text-blue-800">{link?.description}</p>
                <Btn path={link?.path}/>
            </div>
        </div> 
    )
}

export default EducationalCard;