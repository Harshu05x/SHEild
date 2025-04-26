
// import Template from "../Components/Auth/Template"

// function Signup() {
//     return (
//         // <Template
//         //     title="Join the millions learning to code with StudyNotion for free"
//         //     description1="Build skills for today, tomorrow, and beyond."
//         //     description2="Education to future-proof your career."
//         //     image={"https://5.imimg.com/data5/SELLER/Default/2022/9/KI/SC/EB/158302774/womenprotectioninindia-8573119940-1--500x500.jpg"}
//         //     formType="signup"
//         // />
//         <div>

//         </div>
//     )
// }

// export default Signup


import React, { useState } from "react";
import Women from "./../assets/Image/Women.jpg"; // Reuse background image
import { Btn } from "../Components/Core/HomePage/btn"; // Reuse Btn component
import { Link } from "react-router-dom";
import { postRequest } from "../services/apiConnector";
import { authEndpoints } from "../services/apis";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setToken } from "../slices/authSlice";
import { setUser } from "../slices/profileSlice";

const Signup = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    password: "",
    aadhaar: "",
    contactNumber: "",
    gender: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const validateForm = () => {
    const newErrors = {};
    console.log(formData);
    if (!formData.firstName) newErrors.firstName = "First name is required";
    if (!formData.lastName) newErrors.lastName = "Last name is required";
    if (!formData.password || formData.password.length < 8)
      newErrors.password = "Password must be at least 8 characters";
    if (!formData.aadhaar || !/^\d{12}$/.test(formData.aadhaar))
      newErrors.aadhaar = "Aadhaar must be a 12-digit number";
    if (!formData.contactNumber || !/^\d{10}$/.test(formData.contactNumber))
      newErrors.contactNumber = "Contact number must be a 10-digit number";
    if (!formData.gender) newErrors.gender = "Gender is required";
    return newErrors;
  };

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      setIsLoading(true);
      const validationErrors = validateForm();
      console.log(validationErrors);
      if (Object.keys(validationErrors).length > 0) {
        setErrors(validationErrors);
        return;
      } 
      setErrors({});
      const response = await postRequest(authEndpoints.SIGNUP_API,formData);
      console.log(response);
      toast.success("Signup successful");
      // take token and user save in local storage
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("user", JSON.stringify(response.data.user));

      // dispatch
      dispatch(setToken(response.data.token));
      dispatch(setUser(response.data.user));
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

      {/* Signup Form Container */}
      <div className="relative w-11/12 max-w-lg bg-white bg-opacity-90 rounded-lg shadow-xl p-8">
        <h2 className="text-4xl font-serif font-extrabold text-blue-900 text-center mb-6">
          SHEild Signup
        </h2>
        <p className="text-blue-800 text-center mb-8 tracking-wider">
          Create your secure account to join our community
        </p>

        <form onSubmit={handleSubmit} className="flex flex-col gap-y-4">
          {/* First Name */}
          <div className="flex flex-col">
            <label
              htmlFor="firstName"
              className="text-blue-800 text-sm font-semibold tracking-wider mb-1"
            >
              First Name
            </label>
            <input
              type="text"
              id="firstName"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              placeholder="Enter first name"
              className="border border-blue-800 rounded-md px-4 py-2 text-blue-900 focus:outline-none focus:ring-2 focus:ring-blue-900"
              required
            />
            {errors.firstName && (
              <p className="text-red-600 text-xs mt-1">{errors.firstName}</p>
            )}
          </div>

          {/* Last Name */}
          <div className="flex flex-col">
            <label
              htmlFor="lastName"
              className="text-blue-800 text-sm font-semibold tracking-wider mb-1"
            >
              Last Name
            </label>
            <input
              type="text"
              id="lastName"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              placeholder="Enter last name"
              className="border border-blue-800 rounded-md px-4 py-2 text-blue-900 focus:outline-none focus:ring-2 focus:ring-blue-900"
              required
            />
            {errors.lastName && (
              <p className="text-red-600 text-xs mt-1">{errors.lastName}</p>
            )}
          </div>

          {/* Password */}
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
            {errors.password && (
              <p className="text-red-600 text-xs mt-1">{errors.password}</p>
            )}
          </div>

          {/* Aadhaar */}
          <div className="flex flex-col">
            <label
              htmlFor="aadhaar"
              className="text-blue-800 text-sm font-semibold tracking-wider mb-1"
            >
              Aadhaar Number
            </label>
            <input
              type="text"
              id="aadhaar"
              name="aadhaar"
              value={formData.aadhaar}
              onChange={handleChange}
              placeholder="Enter 12-digit Aadhaar number"
              className="border border-blue-800 rounded-md px-4 py-2 text-blue-900 focus:outline-none focus:ring-2 focus:ring-blue-900"
              required
            />
            {errors.aadhaar && (
              <p className="text-red-600 text-xs mt-1">{errors.aadhaar}</p>
            )}
          </div>

          {/* Contact Number */}
          <div className="flex flex-col">
            <label
              htmlFor="contactNumber"
              className="text-blue-800 text-sm font-semibold tracking-wider mb-1"
            >
              Contact Number
            </label>
            <input
              type="text"
              id="contactNumber"
              name="contactNumber"
              value={formData.contactNumber}
              onChange={handleChange}
              placeholder="Enter 10-digit phone number"
              className="border border-blue-800 rounded-md px-4 py-2 text-blue-900 focus:outline-none focus:ring-2 focus:ring-blue-900"
              required
            />
            {errors.contactNumber && (
              <p className="text-red-600 text-xs mt-1">{errors.contactNumber}</p>
            )}
          </div>

          {/* Gender */}
          <div className="flex flex-col">
            <label
              htmlFor="gender"
              className="text-blue-800 text-sm font-semibold tracking-wider mb-1"
            >
              Gender
            </label>
            <select
              id="gender"
              name="gender"
              value={formData.gender}
              onChange={handleChange}
              className="border border-blue-800 rounded-md px-4 py-2 text-blue-900 focus:outline-none focus:ring-2 focus:ring-blue-900"
              required
            >
              <option value="" disabled>
                Select gender
              </option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
            {errors.gender && (
              <p className="text-red-600 text-xs mt-1">{errors.gender}</p>
            )}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="bg-blue-900 text-white font-semibold py-2 rounded-md hover:bg-blue-800 transition-colors tracking-wider"
          >
            Sign Up
          </button>
        </form>

        {/* Login Link */}
        <p className="text-blue-800 text-center mt-6 tracking-wider">
          Already have an account?{" "}
          <Link to="/login" className="text-blue-900 font-semibold hover:underline">
            Log In
          </Link>
        </p>

        {/* Reusable Btn Component */}
        <div className="mt-6 flex justify-center">
          <Btn link="/about" />
        </div>
      </div>
    </div>
  );
};

export default Signup;