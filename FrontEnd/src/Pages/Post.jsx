import React from "react";
import Women from "./../assets/Image/Women.jpg"; // Reuse background image
import { Btn } from "../Components/Core/HomePage/btn"; // Reuse Btn component
import { Link } from "react-router-dom";

// Static data for government schemes (replace with real data as needed)
const governmentSchemes = [
  {
    id: 1,
    title: "Beti Bachao, Beti Padhao",
    description:
      "A campaign to promote the survival, protection, and education of the girl child, addressing declining child sex ratios and empowering girls through education.",
    eligibility: "Families with girl children, schools, and communities.",
    benefits: "Financial incentives, scholarships, and awareness programs.",
  },
  {
    id: 2,
    title: "Nirbhaya Fund",
    description:
      "A dedicated fund to support initiatives enhancing women’s safety and security, including safe transport, helplines, and forensic facilities.",
    eligibility: "Government agencies, NGOs, and women’s safety projects.",
    benefits: "Funding for safety infrastructure and victim support services.",
  },
  {
    id: 3,
    title: "Mahila Shakti Kendra",
    description:
      "Empowers rural women through skill development, digital literacy, and access to government schemes, fostering community-level support.",
    eligibility: "Rural women and women’s groups.",
    benefits: "Training, resources, and access to government programs.",
  },
  {
    id: 4,
    title: "One Stop Centre (Sakhi)",
    description:
      "Provides integrated support for women affected by violence, offering medical, legal, and psychological assistance under one roof.",
    eligibility: "Women facing violence or abuse.",
    benefits: "Free services, counseling, and legal aid.",
  },
  {
    id: 5,
    title: "Ujjawala Scheme",
    description:
      "Aims to prevent trafficking of women and children, and supports rescue, rehabilitation, and reintegration of victims.",
    eligibility: "Victims of trafficking and vulnerable women.",
    benefits: "Shelter, vocational training, and reintegration support.",
  },
];

const GovernmentSchemes = () => {
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
            Government Schemes for Women
          </h1>
          <p className="w-3/5 text-center text-lg text-blue-800 tracking-wider leading-relaxed">
            Explore government initiatives dedicated to women’s safety, security, and empowerment. These schemes provide resources, support, and opportunities to help women live fearlessly and confidently.
          </p>
          <div className="mt-6">
            <Btn link="/signup" />
          </div>
        </div>
      </div>

      {/* Schemes Section */}
      <div className="w-10/12 mx-auto py-12">
        <h2 className="text-4xl font-serif font-semibold text-blue-900 text-center mb-10">
          Key Schemes and Initiatives
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {governmentSchemes.map((scheme) => (
            <div
              key={scheme.id}
              className="bg-white bg-opacity-90 rounded-lg shadow-lg p-6 flex flex-col gap-y-4"
            >
              <h3 className="text-2xl font-serif font-bold text-blue-900">
                {scheme.title}
              </h3>
              <p className="text-blue-800 tracking-wider">
                {scheme.description}
              </p>
              <div>
                <p className="text-blue-800 font-semibold tracking-wider">
                  Eligibility:
                </p>
                <p className="text-blue-800 tracking-wider">
                  {scheme.eligibility}
                </p>
              </div>
              <div>
                <p className="text-blue-800 font-semibold tracking-wider">
                  Benefits:
                </p>
                <p className="text-blue-800 tracking-wider">
                  {scheme.benefits}
                </p>
              </div>
              <Link
                to="/signup"
                className="text-blue-900 font-semibold hover:underline text-center mt-4"
              >
                Join SHEild to Learn More
              </Link>
            </div>
          ))}
        </div>
      </div>

      {/* Call to Action */}
      <div className="w-screen bg-blue-900 py-12">
        <div className="w-10/12 mx-auto text-center">
          <h2 className="text-4xl font-serif font-semibold text-white mb-6">
            Empower Yourself Today
          </h2>
          <p className="text-white text-lg tracking-wider mb-8">
            Join the SHEild community to access resources, connect with support networks, and stay informed about government schemes that empower women.
          </p>
          <Btn link="/signup" />
        </div>
      </div>
    </div>
  );
};

export default GovernmentSchemes;