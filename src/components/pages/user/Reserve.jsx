import React from "react";
import { FiClock } from "react-icons/fi";
import { PiWarning } from "react-icons/pi";

const Reserve = () => {
  return (
    <div className="max-w-xl mx-auto p-6">
      {/* header */}
      <div className="border p-4 flex justify-between items-center">
        <div className="text-center border-r pr-4 flex flex-col gap-2">
          <div className="text-sm">Wednesday</div>
          <div className="text-2xl font-bold">9</div>
          <div className="text-sm">October</div>
        </div>
        <div className="flex-1 ml-4">
          <h2 className="text-lg font-bold">Meeting Room (ENGR888/1)</h2>
          <div className="flex items-center text-sm my-2">
            <FiClock className="mr-2" /> 13.00 - 17.00 (4 Hours)
          </div>
          <div className="text-sm">ชื่อผู้จอง + ID</div>
        </div>
      </div>

      {/* Form */}
      <div className="mt-5">
        <div className=" font-semibold">ชื่อการประชุม</div>
        <input
          className="w-full border border-[#CECECE] p-2 mt-3 rounded-sm"
          type="text"
        />

        <div className=" font-semibold mt-4">รายละเอียดการประชุม</div>
        <textarea className="w-full border border-[#CECECE] p-2 mt-3 rounded-sm h-24"></textarea>

        <div className=" font-semibold mt-4">สังกัด</div>
        <input
          className="w-full border border-[#CECECE] p-2 mt-3 rounded-sm"
          type="text"
        />

        <div className=" font-semibold mt-4">E-Mail</div>
        <input
          className="w-full border border-[#CECECE] p-2 mt-3 rounded-sm"
          type="email"
        />
      </div>

      {/* Note */}
      <div className="flex gap-3 items-center mt-5 p-4 bg-red-100 rounded-2xl">
        <PiWarning className="text-[#8A2A2B] font-semibold text-5xl ml-2" />

        <div className="flex flex-col gap-2">
          <div className="font-bold">Note :</div>
          <ul className="list-decimal pl-7 text-sm ">
            <li></li>
            <li></li>
            <li></li>
          </ul>
          <div className="flex items-center">
            <input type="checkbox" className="mr-2" />
            <span className="text-sm text-[#A6A6A6]">
              ฉันอ่านและยอมรับเงื่อนไข
            </span>
          </div>
        </div>
      </div>

      {/* Buttons */}
      <div className="mt-5 flex justify-end space-x-2">
        <button
          className="bg-[#E2E2E2] text-gray-600 px-5 py-1 rounded cursor-pointer"
          disabled
        >
          Close
        </button>
        <button className="bg-[#8A2A2B] text-white px-5 py-1 rounded cursor-pointer">
          Booking
        </button>
      </div>
    </div>
  );
};

export default Reserve;
