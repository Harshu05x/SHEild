import React from "react";
import { Btn } from "../../Components/Core/HomePage/btn";
import Women from './../../assets/Image/Women.jpg';
import { Link } from "react-router-dom";
import selfDefence from "./../../assets/Image/selfDefence.jpg";

const SelfDefense = () => {
  // Sample self-defense content (replace with real data as needed)
  const selfDefenseTips = [
    {
      id: 1,
      title: "Situational Awareness",
      description:
        "Always be aware of your surroundings. Avoid distractions like headphones or your phone in unfamiliar or potentially unsafe areas. Trust your instincts if something feels off.",
    },
    {
      id: 2,
      title: "Basic Self-Defense Moves",
      description:
        "Learn simple techniques like the palm strike (hitting with the heel of your hand), knee strike, or elbow jab to create distance from an attacker. Practice these moves regularly.",
    },
    {
      id: 3,
      title: "Use Your Voice",
      description:
        "Shout loudly to attract attention and deter an attacker. Phrases like 'Stop!' or 'Help!' can alert others and disrupt the situation.",
    },
    {
      id: 4,
      title: "Safety in Numbers",
      description:
        "Travel with friends or in groups when possible, especially at night. Use well-lit, populated routes to reduce risk.",
    },
    {
      id: 5,
      title: "Emergency Tools",
      description:
        "Carry legal self-defense tools like pepper spray or a personal alarm. Ensure you know how to use them effectively and keep them accessible.",
    },
  ];

  // Image URL from Pixabay
  const selfDefenseImage = "https://cdn.pixabay.com/photo/2020/02/06/09/39/self-defense-4823484_1280.jpg";

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
            Self-Defense & Safety Tips
          </h1>
          <p className="w-3/5 text-center text-lg text-blue-800 tracking-wider leading-relaxed">
            Empower yourself with practical self-defense techniques and safety strategies. SHEild provides resources to help you stay confident and secure in any situation.
          </p>
          <div className="mt-6">
            <Btn link="/signup" />
          </div>
        </div>
      </div>

      {/* Self-Defense Content Section */}
      <div className="w-10/12 mx-auto py-12">
        <h2 className="text-4xl font-serif font-semibold text-blue-900 text-center mb-10">
          Key Self-Defense Strategies
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
          <div className="bg-white bg-opacity-90 rounded-lg shadow-lg p-6 flex flex-col gap-y-4">
            <img
              src={selfDefence}
              alt="Self-Defense"
              className="w-full h-48 object-cover rounded-md"
              loading="lazy"
            />
            <h3 className="text-2xl font-serif font-bold text-blue-900">
              Why Self-Defense Matters
            </h3>
            <p className="text-blue-800 tracking-wider">
              Self-defense is about more than physical techniques—it’s about confidence, awareness, and preparedness. Learn how to protect yourself and stay safe.
            </p>
            <Link
              to="/signup"
              className="text-blue-900 font-semibold hover:underline text-center mt-4"
            >
              Join SHEild to Learn More
            </Link>
          </div>
          {selfDefenseTips.map((tip) => (
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
            Stay Safe with SHEild
          </h2>
          <p className="text-white text-lg tracking-wider mb-8">
            Join our community to access exclusive self-defense resources, connect with safety experts, and empower yourself to live fearlessly.
          </p>
          <Btn link="/signup" />
        </div>
      </div>
    </div>
  );
};

export default SelfDefense;