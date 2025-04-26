import React from "react";
import Women from './../../assets/Image/Women.jpg';
import { Btn } from "../../Components/Core/HomePage/btn";
import { Link } from "react-router-dom";
import  Health from "./../../assets/Image/Health.jpg";



const HealthWellness = () => {
  // Sample health and wellness content (replace with real data as needed)
  const healthTips = [
    {
      id: 1,
      title: "Reproductive Health",
      description:
        "Stay informed about menstrual health, contraception, and regular check-ups to maintain reproductive well-being.",
    },
    {
      id: 2,
      title: "Mental Health",
      description:
        "Practice mindfulness, seek therapy if needed, and build a support network to manage stress and mental health challenges.",
    },
    {
      id: 3,
      title: "Nutrition",
      description:
        "Adopt a balanced diet rich in fruits, vegetables, and whole grains to support overall health and energy levels.",
    },
    {
      id: 4,
      title: "Exercise",
      description:
        "Engage in regular physical activity like yoga, walking, or strength training to boost physical and mental health.",
    },
  ];

  // Image URL from Pixabay
  const healthImage = "https://cdn.pixabay.com/photo/2017/08/07/14/02/woman-2602808_1280.jpg";

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
            Health & Wellness
          </h1>
          <p className="w-3/5 text-center text-lg text-blue-800 tracking-wider leading-relaxed">
            Prioritize your health with tips on reproductive health, mental wellness, nutrition, and exercise. SHEild supports your journey to well-being.
          </p>
          <div className="mt-6">
            <Btn link="/signup" />
          </div>
        </div>
      </div>

      {/* Health Content Section */}
      <div className="w-10/12 mx-auto py-12">
        <h2 className="text-4xl font-serif font-semibold text-blue-900 text-center mb-10">
          Key Health Tips
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
          <div className="bg-white bg-opacity-90 rounded-lg shadow-lg p-6 flex flex-col gap-y-4">
            <img
              src={Health}
              alt="Health & Wellness"
              className="w-full h-48 object-cover rounded-md"
              loading="lazy"
            />
            <h3 className="text-2xl font-serif font-bold text-blue-900">
              Holistic Wellness
            </h3>
            <p className="text-blue-800 tracking-wider">
              Health is more than physical—it's mental, emotional, and social. Explore resources to nurture every aspect of your well-being.
            </p>
            <Link
              to="/signup"
              className="text-blue-900 font-semibold hover:underline text-center mt-4"
            >
              Join SHEild to Learn More
            </Link>
          </div>
          {healthTips.map((tip) => (
            <div
              key={tip.id}
              className="bg-white bg-opacity-90 rounded-lg shadow-lg p-6 flex flex-col gap-y-4"
            >
              <h3 className="text-2xl font-serif font-bold text-blue-900">
                {tip.title}
              </h3>
              <p className="text-blue-800 tracking-wider">
                {tip.description}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Call to Action */}
      <div className="w-screen bg-blue-900 py-12">
        <div className="w-10/12 mx-auto text-center">
          <h2 className="text-4xl font-serif font-semibold text-white mb-6">
            Live Healthier with SHEild
          </h2>
          <p className="text-white text-lg tracking-wider mb-8">
            Join our community to access health resources, connect with wellness experts, and empower yourself to live a balanced life.
          </p>
          <Btn link="/signup" />
        </div>
      </div>
    </div>
  );
};

export default HealthWellness;