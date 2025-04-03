import React from "react";
import logo from "../../Assets/TSE_LOGO.png";

function Login() {
  return (
    <div className="min-h-screen flex flex-col justify-between p-6">

      {/* Logo */}
      <div className="flex justify-center">
        <img className="w-100" src={logo} alt="TSE Logo" />
      </div>

      {/* Content */}
      <div className="flex-1 flex items-center justify-center -mt-18">
        <div className="w-full max-w-md bg-white p-6 rounded-lg">
          <h2 className="text-2xl font-bold text-gray-800 text-center mb-4">
            TSE Meeting Room
          </h2>
          <p className="text-lg font-semibold text-gray-600 text-center mb-6">
            Sign in
          </p>

          {/* Form */}
          <div className="space-y-6">
            <div>
              <label className="block text-gray-700 font-medium mb-2">TSE ID</label>
              <input
                type="text"
                className="w-full p-3 bg-[#EBEDF1] rounded-md focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-gray-700 font-medium mb-2">Password</label>
              <input
                type="password"
                className="w-full p-3 bg-[#EBEDF1] rounded-md focus:outline-none"
              />
            </div>
          </div>

          {/* Button */}
          <div className="mt-8 text-center">
            <p className="text-sm text-gray-600 mb-3">จองล่วงหน้าอย่างน้อย 1 วัน</p>
            <button className="w-31 bg-[#8A2A2B] text-white py-2 rounded-md text-lg font-semibold hover:bg-[#621d1e]">
              Sign In
            </button>
          </div>
        </div>
      </div>

    </div>
  )
}

export default Login;
