import React from "react";
import Women from "./../assets/Image/Women.jpg";
import file from "./../assets/Logo/file.png";
import Legal from "./../assets/Image/Legal.jpg";
import { EducationalInfo } from "../data/educational-Info";
import EducationalCard from "../Components/Core/HomePage/educationalCard";
import { Btn } from "../Components/Core/HomePage/btn";
import Aim1 from "./../assets/Image/Aim1.jpg";
import Future from "./../assets/Image/Future.jpg";
const Home=()=>
{
    return(
        <div className="mt-24 left-0 right-0">
            {/* Main Section */}
            <div className="w-screen h-screen object-fill">
                <div className="absolute w-screen h-screen object-fill">
                    <img src={Women} className="opacity-40 w-screen h-screen object-fill"></img>
                </div>
                <div className="relative flex flex-col gap-y-4 justify-center object-fill w-screen h-screen   items-center">
                    <p className="text-9xl font-serif font-extrabold leading-7 text-blue-900">SHEild</p>
                    <p className="w-2/5 h-20 leading-loose mt-10 mb-9 mx-0 gap-y-1 tracking-wider text-blue-800 text-center text-lg">At the heart of our mission is a safe, supportive, and empowering environment for women.we are dedicated to protecting and uplifting women, empowering them to live fearlessly and confidently.</p>
                    <img src={file}></img>
                </div>  
            </div>
            
            {/* information Section */}
            <div className="flex w-10/12 mx-auto">
                <div className="grid grid-cols-2 w-full gap-3 mt-10">
                    {
                       EducationalInfo.map((link,index) =>
                       {
                            return(
                                <div key={index} className="w-3/4 mx-auto h-1/4">
                                    <EducationalCard link={link} />
                                </div>
                            )
                        
                        })
                    }

                </div>
               
            </div>

            {/* purpose Section */}
            <div className="w-screen h-screen object-fill">
                <div className="absolute w-screen h-screen object-fill">
                    <img src={Aim1} className="opacity-30 w-screen h-screen object-fill"></img>
                </div>
                <div className="relative flex w-10/12 justify-between items-center mx-auto pt-28">
                    <div className="flex flex-col gap-y-11 w-1/3 justify-center items-center ">
                        <p className="text-4xl font-semibold text-blue-900 leading-3">PURPOSE OF SHEild</p>
                        <p className="text-lg font-serif text-center tracking-widest  text-blue-800">Empowering women with a secure platform for safety, support, and connection. Trusted through Aadhaar verification, our community offers emergency alerts and essential resources for protection and empowerment.</p>
                        <Btn link="/about" />
                    </div>
                    <div className="w-2/4 h-2/4">
                        <img src={Future} alt="" loading="lazy"/>
                    </div>
                </div>  
            </div>
        </div>
    )
}

export default Home;