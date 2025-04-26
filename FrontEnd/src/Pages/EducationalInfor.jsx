import React from "react";
import Women from "./../assets/Image/Women.jpg";
import { Btn } from "../Components/Core/HomePage/btn";
import { EducationalInfo } from "../../data/educational-Info";
import { Link } from "react-router-dom";

const EducationalInformation = () => {
  return (
    <div className="mt-24 min-h-screen">
      {/* Hero Section */}
      <div className="w-screen h-[60vh] relative">
        <div className="absolute inset-0">
          <img
            src={Women}
            alt="Background"
            className="opacity-30 w-full h-full object-fill"
          />
        </div>
        <div className="relative flex flex-col gap-y-4 justify-center items-center w-full h-full">
          <h1 className="text-6xl font-serif font-extrabold text-blue-900">
            Educational Resources for Women
          </h1>
          <p className="w-3/5 text-center text-lg text-blue-800 tracking-wider leading-relaxed">
            Empower yourself with knowledge on legal rights, health, self-defense, and financial independence. SHEild provides resources to help women live confidently and securely.
          </p>
          <div className="mt-6">
            <Btn link="/signup" />
          </div>
        </div>
      </div>

      {/* Educational Content Section */}
      <div className="w-10/12 mx-auto py-12">
        <h2 className="text-4xl font-serif font-semibold text-blue-900 text-center mb-10">
          Explore Our Resources
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
          {EducationalInfo.map((info, index) => (
            <div
              key={index}
              className="bg-white bg-opacity-90 rounded-lg shadow-lg p-6 flex flex-col gap-y-4"
            >
              <img
                src={info.img}
                alt={info.title}
                className="w-full h-48 object-cover rounded-md"
                loading="lazy"
              />
              <h3 className="text-2xl font-serif font-bold text-blue-900">
                {info.title}
              </h3>
              <p className="text-blue-800 tracking-wider">
                {info.description}
              </p>
              <Link
                to={info.path}
                className="text-blue-900 font-semibold hover:underline text-center mt-4"
              >
                Learn More
              </Link>
            </div>
          ))}
        </div>
      </div>

      {/* Call to Action */}
      <div className="w-screen bg-blue-900 py-12">
        <div className="w-10/12 mx-auto text-center">
          <h2 className="text-4xl font-serif font-semibold text-white mb-6">
            Join SHEild Today
          </h2>
          <p className="text-white text-lg tracking-wider mb-8">
            Become part of our community to access exclusive resources, connect with others, and stay informed about women’s safety and empowerment.
          </p>
          <Btn link="/signup" />
        </div>
      </div>
    </div>
  );
};

export default EducationalInformation;