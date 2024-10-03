import React from "react";
import Girls from "./../assets/Image/Girls.jpg";
import Seva from "./../assets/Image/Seva.jpg";
const About=()=>
{
    return(
        <div className="mt-24">
            
            <div className="absolute w-screen h-screen">
                <img src={Girls} alt="" loading="lazy" className="w-screen h-screen object-fill opacity-25"/>
            </div>
            <div className="relative flex flex-col gap-y-4 justify-start w-screen h-screen   items-center">
                
                <p className="w-2/5 p-6 leading-loose mb-9 mx-0 gap-y-1 mt-32 font-semibold tracking-widest text-blue-900  bg-slate-200  border border-blue-500 text-center text-lg ">SHEild itself say "SHE SHEILD" is a life-saving, live-changing web 
                application for women and girls,It Empowering women through a secure, Aadhaar-verified platform that provides safety, support, 
                and connection. Our community offers essential tools like emergency alerts, safety resources, and a space to share and seek help, 
                ensuring women feel safe, supported, and empowered in every aspect of their lives.</p>
                <p className="text-9xl font-serif font-extrabold leading-7 mt-20 text-blue-900 opacity-45">" SHE - SHEILD "</p>
                
            </div>  
            <div className="bg-slate-50"> 
                <div className="flex flex-col items-center justify-center pb-10">
                    <div className="flex flex-row w-10/12 h-1/2 items-center justify-between mx-auto my-auto p-10">
                        <p className="text-lg font-serif text-start w-1/2 tracking-widest  text-blue-900">Our platform is dedicated to empowering women by offering a safe, secure space where they can connect, access vital safety tools, and find support. Through Aadhaar-based verification, we ensure that only verified women can join the community, fostering trust and security.
                            <br></br><br></br>
                            Key features include emergency alert systems, where users can send distress messages to their closest contacts and local authorities with their live location in times of danger. We also offer safety resources, a menstrual cycle reminder, a discussion forum, and the ability to file anonymous complaints.
                            <br></br><br></br>
                            Our mission is to create a supportive network for women, where they can feel empowered and protected. By combining advanced technology with a focus on women’s safety, we aim to reduce threats and provide a platform for women to thrive.
                        </p>
                        <img src={Seva} alt="" loading="lazy" height="480px" width="580px"></img>
                    </div>
                    <div>
                        <p className="text-xl font-sans leading-relaxed tracking-normal font-semibold text-black">Join us as we work together to create safer environments and stronger communities for women everywhere.</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default About;