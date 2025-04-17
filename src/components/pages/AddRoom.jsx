import React from "react";
import { FaCloudUploadAlt } from "react-icons/fa";

const AddRoom = () => {
  return (
    <>
      <div className="bg-[#EBEDF1] min-h-[92vh] flex justify-center items-start py-10">
        <div className="p-10 bg-white w-[94%] max-w-[94%] min-h-[80vh] shadow-md">
          <h1 className="text-[#8A2A2B] text-xl font-bold mb-10">
            เพิ่มห้องประชุม
          </h1>

          {/* content */}
          <div className="flex flex-col xl:flex-row gap-10">
            {/* Upload Image */}
            <div className="flex flex-col pr-7">
              <div className="bg-[#D9D9D9] w-90 h-65 "></div>
              <button className="w-90 h-10 mt-7 text-white font-medium bg-[#3B65FB] flex items-center cursor-pointer rounded-md">
                <FaCloudUploadAlt className="bg-[#4880FF] p-2  w-10 h-10 rounded-l-md" />
                <p className="flex-1 text-center">UPLOAD</p>
              </button>
            </div>

            {/* Form */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 flex-grow">
              <div>
                <label className="font-bold block mb-2">หมายเลขห้อง TH</label>
                <input
                  className="w-full p-3 border border-gray-400 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-300"
                  type="text"
                />
              </div>

              <div>
                <label className="font-bold block mb-2">หมายเลขห้อง EN</label>
                <input
                  className="w-full p-3 border border-gray-400 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-300"
                  type="text"
                />
              </div>

              <div>
                <label className="font-bold block mb-2">ศูนย์</label>
                <select className="w-full p-3 border border-gray-400 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-300">
                  <option></option>
                </select>
              </div>

              <div>
                <label className="font-bold block mb-2">อาคาร</label>
                <input
                  className="w-full p-3 border border-gray-400 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-300"
                  type="text"
                />
              </div>

              <div>
                <label className="font-bold block mb-2">จำนวนที่นั่ง</label>
                <select className="w-full p-3 border border-gray-400 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-300">
                  <option></option>
                </select>
              </div>

              <div>
                <label className="font-bold block mb-2">ประเภทห้อง</label>
                <input
                  className="w-full p-3 border border-gray-400 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-300"
                  type="text"
                />
              </div>

              <div>
                <label className="font-bold block mb-2">สถานะห้อง</label>
                <select className="w-full p-3 border border-gray-400 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-300">
                  <option></option>
                </select>
              </div>

              <div>
                <label className="font-bold block mb-2">เหตุผล</label>
                <input
                  className="w-full p-3 border border-gray-400 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-300"
                  type="text"
                />
              </div>
            </div>
          </div>

          {/* Button */}
          <div className="flex justify-end gap-4 mt-8">
            <button className="py-1.5 w-28 font-medium text-white bg-gray-400 hover:bg-gray-500 rounded-md shadow-md cursor-pointer">
              CANCEL
            </button>
            <button className="py-1.5 w-28 font-medium text-white bg-[#3B65FB] hover:bg-[#2b4fb0] rounded-md shadow-md cursor-pointer">
              SAVE
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddRoom;
