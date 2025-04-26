import React from "react";
import Women from './../../assets/Image/Women.jpg';
import { Btn } from "../../Components/Core/HomePage/btn";
import { Link } from "react-router-dom";
import Legal from "./../../assets/Image/Legal.jpg";
const LegalRights = () => {
  // Sample legal rights content (replace with real data as needed)
  const legalRightsResources = [
    {
      id: 1,
      title: "Protection Against Violence",
      description:
        "Learn about laws like the Protection of Women from Domestic Violence Act, 2005, and how to seek help through helplines or legal aid.",
    },
    {
      id: 2,
      title: "Workplace Rights",
      description:
        "Understand your rights to equal pay, maternity benefits, and a harassment-free workplace under laws like the Sexual Harassment of Women at Workplace Act, 2013.",
    },
    {
      id: 3,
      title: "Property and Inheritance Rights",
      description:
        "Know your rights to inherit and own property under the Hindu Succession Act, 1956, and other relevant laws, ensuring fair treatment.",
    },
    {
      id: 4,
      title: "Access to Legal Aid",
      description:
        "Free legal aid is available through the National Legal Services Authority (NALSA) for women in need of legal support.",
    },
  ];

  // Image URL from Pixabay
  const legalRightsImage = "https://cdn.pixabay.com/photo/2016/11/14/03/22/woman-1822459_1280.jpg";

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
            Legal Rights & Protection
          </h1>
          <p className="w-3/5 text-center text-lg text-blue-800 tracking-wider leading-relaxed">
            Empower yourself with knowledge of your legal rights. SHEild provides resources to help women navigate laws and seek protection confidently.
          </p>
          <div className="mt-6">
            <Btn link="/signup" />
          </div>
        </div>
      </div>

      {/* Legal Rights Content Section */}
      <div className="w-10/12 mx-auto py-12">
        <h2 className="text-4xl font-serif font-semibold text-blue-900 text-center mb-10">
          Key Legal Resources
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
          <div className="bg-white bg-opacity-90 rounded-lg shadow-lg p-6 flex flex-col gap-y-4">
            <img
              src={Legal}
              alt="Legal Rights"
              className="w-full h-48 object-cover rounded-md"
              loading="lazy"
            />
            <h3 className="text-2xl font-serif font-bold text-blue-900">
              Understanding Your Rights
            </h3>
            <p className="text-blue-800 tracking-wider">
              Knowledge of legal rights empowers women to protect themselves and seek justice. Explore key laws and resources available to you.
            </p>
            <Link
              to="/signup"
              className="text-blue-900 font-semibold hover:underline text-center mt-4"
            >
              Join SHEild to Learn More
            </Link>
          </div>
          {legalRightsResources.map((resource) => (
            <div
              key={resource.id}
              className="bg-white bg-opacity-90 rounded-lg shadow-lg p-6 flex flex-col gap-y-4"
            >
              <h3 className="text-2xl font-serif font-bold text-blue-900">
                {resource.title}
              </h3>
              <p className="text-blue-800 tracking-wider">
                {resource.description}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Call to Action */}
      <div className="w-screen bg-blue-900 py-12">
        <div className="w-10/12 mx-auto text-center">
          <h2 className="text-4xl font-serif font-semibold text-white mb-6">
            Empower with Knowledge
          </h2>
          <p className="text-white text-lg tracking-wider mb-8">
            Join our community to access legal resources, connect with experts, and stay informed about your rights as a woman.
          </p>
          <Btn link="/signup" />
        </div>
      </div>
    </div>
  );
};

export default LegalRights;