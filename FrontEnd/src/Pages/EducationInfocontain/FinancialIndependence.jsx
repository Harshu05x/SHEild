import React from "react";
import Women from './../../assets/Image/Women.jpg';
import { Btn } from "../../Components/Core/HomePage/btn";
import { Link } from "react-router-dom";
import Financial from "./../../assets/Image/Financial.jpg";
const FinancialIndependence = () => {
  // Sample financial independence content (replace with real data as needed)
  const financialTips = [
    {
      id: 1,
      title: "Budgeting",
      description:
        "Create a monthly budget to track income and expenses, prioritizing savings and essential needs.",
    },
    {
      id: 2,
      title: "Saving",
      description:
        "Set up an emergency fund and save regularly, even small amounts, to build financial security.",
    },
    {
      id: 3,
      title: "Investing",
      description:
        "Explore low-risk investment options like mutual funds or fixed deposits to grow your wealth over time.",
    },
    {
      id: 4,
      title: "Entrepreneurship",
      description:
        "Develop skills and start a small business to achieve financial independence through entrepreneurship.",
    },
  ];

  // Image URL from Pixabay
  const financialImage = "https://cdn.pixabay.com/photo/2016/03/09/09/22/workplace-1245776_1280.jpg";

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
            Financial Independence
          </h1>
          <p className="w-3/5 text-center text-lg text-blue-800 tracking-wider leading-relaxed">
            Take control of your finances with resources on budgeting, saving, investing, and entrepreneurship. SHEild empowers you to achieve financial freedom.
          </p>
          <div className="mt-6">
            <Btn link="/signup" />
          </div>
        </div>
      </div>

      {/* Financial Content Section */}
      <div className="w-10/12 mx-auto py-12">
        <h2 className="text-4xl font-serif font-semibold text-blue-900 text-center mb-10">
          Key Financial Strategies
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
          <div className="bg-white bg-opacity-90 rounded-lg shadow-lg p-6 flex flex-col gap-y-4">
            <img
              src={Financial}
              alt="Financial Independence"
              className="w-full h-48 object-cover rounded-md"
              loading="lazy"
            />
            <h3 className="text-2xl font-serif font-bold text-blue-900">
              Building Financial Freedom
            </h3>
            <p className="text-blue-800 tracking-wider">
              Financial independence starts with knowledge and planning. Explore tools and strategies to secure your financial future.
            </p>
            <Link
              to="/signup"
              className="text-blue-900 font-semibold hover:underline text-center mt-4"
            >
              Join SHEild to Learn More
            </Link>
          </div>
          {financialTips.map((tip) => (
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
            Achieve Financial Freedom
          </h2>
          <p className="text-white text-lg tracking-wider mb-8">
            Join our community to access financial resources, connect with experts, and empower yourself to achieve independence.
          </p>
          <Btn link="/signup" />
        </div>
      </div>
    </div>
  );
};

export default FinancialIndependence;