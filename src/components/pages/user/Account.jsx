import React from "react";
import { FaCircleUser } from "react-icons/fa6";

const Account = () => {
  return (
    <div className="max-w-xl mx-auto p-6">
      <div className="flex flex-col items-center gap-2 mt-3">
        <FaCircleUser className="w-20 h-20" />
        <div className="text-sm font-semibold">Edit</div>
      </div>

      {/* user Info */}
      <div className="my-4 w-23 text-center items-center px-1 py-1 rounded-lg font-semibold text-gray-700 bg-[#D9D9D9]">
        User Info
      </div>
      <div className="mb-4 ml-2">
        <div className=" text-gray-700  text-sm font-bold mb-2">Full name</div>
        <div className=" text-gray-700  ml-3">Sharky Sharky</div>
      </div>
      <div className="mb-4 ml-2">
        <div className=" text-gray-700  text-sm font-bold mb-2">Student ID</div>
        <div className=" text-gray-700  ml-3">6510742262</div>
      </div>

      {/* contact Info */}
      <div className="mt-5 my-4 w-30 text-center items-center px-1 py-1 rounded-lg font-semibold text-gray-700 bg-[#D9D9D9]">
        Contact Info
      </div>
      <div className="mb-4 ml-2">
        <label
          htmlFor="contactPhone"
          className="block text-gray-700 text-sm font-bold mb-2"
        >
          Contact Info
        </label>
        <input
          type="tel"
          id="contactPhone"
          className="shadow border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        />
      </div>
      <div className="mb-4 ml-2">
        <label
          htmlFor="emailAddress"
          className="block text-gray-700 text-sm font-bold mb-2"
        >
          Email Address
        </label>
        <input
          type="email"
          id="emailAddress"
          className="shadow border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        />
      </div>

      {/* button */}
      <div className="flex justify-center mt-10">
        <button
          className="bg-[#8A2A2B] hover:bg-[#6b2021] text-white font-semibold py-2 px-4 rounded focus:outline-none focus:shadow-outline mt-10 justify-center"
          type="button"
        >
          Save Change
        </button>
      </div>
    </div>
  );
};

export default Account;
