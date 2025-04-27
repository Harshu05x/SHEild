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
import { postRequest } from "../services/apiConnector";
import { authEndpoints } from "../services/apis";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setToken} from "../slices/authSlice";
import { setUser, setNotifications } from "../slices/profileSlice";

const Login = () => {
  const [formData, setFormData] = useState({
    mobile: "", 
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.mobile) newErrors.mobile = "Phone number is required";
    else if (!/^\d{10}$/.test(formData.mobile)) newErrors.mobile = "Phone number must be 10 digits";
    if (!formData.password) newErrors.password = "Password is required";
    return newErrors;
  };

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      const validationErrors = validateForm();
      if(Object.keys(validationErrors).length > 0) {
        toast.error(validationErrors.mobile || validationErrors.password);
        return;
      }

      const response = await postRequest(authEndpoints.LOGIN_API,formData);
      console.log(response);
      toast.success("Login successful");
      // take token and user save in local storage
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("user", JSON.stringify(response.data.user));
      // dispatch
      dispatch(setToken(response.data.token));
      dispatch(setUser(response.data.user));
      dispatch(setNotifications(response.data.notifications));
      navigate("/");
    } catch (error) {
      console.log(error);
      let msg = error?.response?.data?.message || "Something went wrong";
      toast.error(msg);
    }
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
              htmlFor="mobile"
              className="text-blue-800 text-sm font-semibold tracking-wider mb-1"
            >
              Phone
            </label>
            <input
              type="text"
              id="mobile"
              name="mobile"
              value={formData.mobile}
              onChange={handleChange}
              placeholder="Enter phone number"
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