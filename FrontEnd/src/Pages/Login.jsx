// import Template from '../Components/Auth/Template';
// import React from 'react';


// function Login(props) {
//     return (
//         <div>
//             {/* <Template
//                 title="Welcome Back"
//                 description1="Build skills for today, tomorrow, and beyond."
//                 description2="Education to future-proof your career."
//                 image={"https://5.imimg.com/data5/SELLER/Default/2022/9/KI/SC/EB/158302774/womenprotectioninindia-8573119940-1--500x500.jpg"}
//                 formType="login"
//             /> */}
//         </div>
//     );
// }

// export default Login;



import React, { useState } from "react";
import Women from "./../assets/Image/Women.jpg"; // Reuse background image
import { Btn } from "../Components/Core/HomePage/btn"; // Reuse Btn component
import { Link } from "react-router-dom";

const Login = () => {
  const [formData, setFormData] = useState({
    identifier: "", // Can be email or phone
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle login logic (e.g., API call with JWT token)
    console.log("Login submitted:", formData);
  };

  return (
    <div className="mt-24 min-h-screen flex items-center justify-center">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src={Women}
          alt="Background"
          className="opacity-30 w-full h-full object-fill"
        />
      </div>

      {/* Login Form Container */}
      <div className="relative w-11/12 max-w-md bg-white bg-opacity-90 rounded-lg shadow-xl p-8">
        <h2 className="text-4xl font-serif font-extrabold text-blue-900 text-center mb-6">
          SHEild Login
        </h2>
        <p className="text-blue-800 text-center mb-8 tracking-wider">
          Sign in to access your secure account
        </p>

        <form onSubmit={handleSubmit} className="flex flex-col gap-y-4">
          {/* Identifier Field (Email or Phone) */}
          <div className="flex flex-col">
            <label
              htmlFor="identifier"
              className="text-blue-800 text-sm font-semibold tracking-wider mb-1"
            >
              Email or Phone
            </label>
            <input
              type="text"
              id="identifier"
              name="identifier"
              value={formData.identifier}
              onChange={handleChange}
              placeholder="Enter email or phone"
              className="border border-blue-800 rounded-md px-4 py-2 text-blue-900 focus:outline-none focus:ring-2 focus:ring-blue-900"
              required
            />
          </div>

          {/* Password Field */}
          <div className="flex flex-col">
            <label
              htmlFor="password"
              className="text-blue-800 text-sm font-semibold tracking-wider mb-1"
            >
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Enter password"
                className="border border-blue-800 rounded-md px-4 py-2 text-blue-900 w-full focus:outline-none focus:ring-2 focus:ring-blue-900"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-blue-900"
              >
                {showPassword ? "Hide" : "Show"}
              </button>
            </div>
          </div>

          {/* Forgot Password Link */}
          <Link
            to="/forgot-password"
            className="text-blue-800 text-sm text-right hover:underline tracking-wider"
          >
            Forgot Password?
          </Link>

          {/* Submit Button */}
          <button
            type="submit"
            className="bg-blue-900 text-white font-semibold py-2 rounded-md hover:bg-blue-800 transition-colors tracking-wider"
          >
            Login
          </button>
        </form>

        {/* Signup Link */}
        <p className="text-blue-800 text-center mt-6 tracking-wider">
          Don't have an account?{" "}
          <Link to="/signup" className="text-blue-900 font-semibold hover:underline">
            Sign Up
          </Link>
        </p>

        {/* Reusable Btn Component for Additional Action */}
        <div className="mt-6 flex justify-center">
          <Btn link="/about" />
        </div>
      </div>
    </div>
  );
};

export default Login;