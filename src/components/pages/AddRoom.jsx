import React, { useState } from "react";
import { FaCloudUploadAlt } from "react-icons/fa";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AddRoom = () => {
  const [addRoomData, setAddRoomData] = useState({
    roomNameTH: "",
    roomNameEN: "",
    building: "",
    seat: "",
    size: "",
    location: "",
    capacity: "",
    note: "",
    branch: "RANGSIT",
    status: 0,
  });

  const [image, setImage] = useState(null); // สำหรับเก็บข้อมูลไฟล์
  const navigate = useNavigate();

  // Handle change ของ input fields
  const handleChange = (e) => {
    const { name, value } = e.target;
    setAddRoomData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Handle change ของไฟล์ (รูปภาพ)
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file); // เก็บข้อมูลไฟล์ที่เลือก
  };

  // ส่งข้อมูลไปยัง API
  const handleSave = async () => {
    const formData = new FormData();

    // เก็บข้อมูลจาก input fields
    formData.append("roomNameTH", addRoomData.roomNameTH);
    formData.append("roomNameEN", addRoomData.roomNameEN);
    formData.append("branch", addRoomData.branch);
    formData.append("building", addRoomData.building);
    formData.append("seat", addRoomData.seat);
    formData.append("size", addRoomData.size);
    formData.append("location", addRoomData.location);
    formData.append("capacity", addRoomData.capacity);
    formData.append("note", addRoomData.note);
    formData.append("status", addRoomData.status);

    // ส่งไฟล์ไปยัง backend แต่จะรับแค่ชื่อไฟล์
    if (image) {
      formData.append("image", image); // ส่งไฟล์ที่เลือกไป
    }

    try {
      const response = await axios.post(
        "http://localhost:3000/api/rooms/addRoom",
        formData
      );
      if (response.data.success) {
        // Clear form and navigate
        clearForm();
        navigate("/admin/manageroom");
      } else {
        alert("Failed to add room");
      }
    } catch (error) {
      console.error("Error uploading room:", error);
      alert("Error uploading room");
    }
  };

  // Clear form after saving
  const clearForm = () => {
    setAddRoomData({
      roomNameTH: "",
      roomNameEN: "",
      building: "",
      seat: "",
      size: "",
      location: "",
      capacity: "",
      note: "",
      branch: "RANGSIT",
      status: 0,
    });
    setImage(null); // Clear image
  };

  return (
    <div className="bg-[#EBEDF1] min-h-[92vh] flex justify-center items-start py-10">
      <div className="p-10 bg-white w-[94%] max-w-[94%] min-h-[80vh] shadow-md">
        <h1 className="text-[#8A2A2B] text-xl font-bold mb-10">
          เพิ่มห้องประชุม
        </h1>

        {/* content */}
        <div className="flex flex-col xl:flex-row gap-10">
          {/* Upload Image */}
          <div className="flex flex-col pr-7">
            <div className="bg-[#D9D9D9] w-90 h-65">
              {image && (
                <img
                  src={URL.createObjectURL(image)} // แสดงภาพตัวอย่าง
                  alt="Uploaded"
                  className="w-full h-full object-cover"
                />
              )}
            </div>
            <input
              type="file"
              onChange={handleImageChange}
              className="hidden"
              id="imageUpload"
            />
            <label
              htmlFor="imageUpload"
              className="w-90 h-10 mt-7 text-white font-medium bg-[#3B65FB] flex items-center cursor-pointer rounded-md"
            >
              <FaCloudUploadAlt className="bg-[#4880FF] p-2 w-10 h-10 rounded-l-md" />
              <p className="flex-1 text-center">UPLOAD</p>
            </label>
          </div>

          {/* Form */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 flex-grow">
            <div>
              <label className="font-bold block mb-2">หมายเลขห้อง TH</label>
              <input
                className="w-full p-3 border border-gray-400 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-300"
                type="text"
                name="roomNameTH"
                value={addRoomData.roomNameTH}
                onChange={handleChange}
              />
            </div>

            <div>
              <label className="font-bold block mb-2">หมายเลขห้อง EN</label>
              <input
                className="w-full p-3 border border-gray-400 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-300"
                type="text"
                name="roomNameEN"
                value={addRoomData.roomNameEN}
                onChange={handleChange}
              />
            </div>

            <div>
              <label className="font-bold block mb-2">อาคาร</label>
              <input
                className="w-full p-3 border border-gray-400 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-300"
                type="text"
                name="building"
                value={addRoomData.building}
                onChange={handleChange}
              />
            </div>

            <div>
              <label className="font-bold block mb-2">ชั้น / ห้อง</label>
              <input
                className="w-full p-3 border border-gray-400 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-300"
                type="text"
                name="location"
                value={addRoomData.location}
                onChange={handleChange}
              />
            </div>

            <div>
              <label className="font-bold block mb-2">ขนาดห้อง</label>
              <input
                className="w-full p-3 border border-gray-400 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-300"
                type="text"
                name="size"
                value={addRoomData.size}
                onChange={handleChange}
              />
            </div>

            <div>
              <label className="font-bold block mb-2">จำนวนที่นั่ง</label>
              <input
                className="w-full p-3 border border-gray-400 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-300"
                type="text"
                name="seat"
                value={addRoomData.seat}
                onChange={handleChange}
              />
            </div>

            <div>
              <label className="font-bold block mb-2">จำนวนคนที่แนะนำ</label>
              <input
                className="w-full p-3 border border-gray-400 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-300"
                type="text"
                name="capacity"
                value={addRoomData.capacity}
                onChange={handleChange}
              />
            </div>
            <div>
              <label className="font-bold block mb-2">เหตุผล</label>
              <input
                className="w-full p-3 border border-gray-400 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-300"
                type="text"
                name="note"
                value={addRoomData.note}
                onChange={handleChange}
              />
            </div>

            <div>
              <label className="font-bold block mb-2">สถานะห้อง</label>
              <select
                className="w-full p-3 border border-gray-400 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-300"
                name="status"
                value={addRoomData.status}
                onChange={handleChange}
              >
                <option value={0}>เปิดใช้งาน</option>
                <option value={1}>ปิดใช้งาน</option>
              </select>
            </div>

            <div>
              <label className="font-bold block mb-2">ศูนย์</label>
              <select
                className="w-full p-3 border border-gray-400 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-300"
                name="branch"
                value={addRoomData.branch}
                onChange={handleChange}
              >
                <option value="RANGSIT">RANGSIT</option>
                <option value="PATTAYA">PATTAYA</option>
              </select>
            </div>
          </div>
        </div>

        {/* Button */}
        <div className="flex justify-end gap-4 mt-8">
          <button
            onClick={() => navigate("/admin/manageroom")}
            className="py-1.5 w-28 font-medium text-white bg-gray-400 hover:bg-gray-500 rounded-md shadow-md cursor-pointer"
          >
            CANCEL
          </button>
          <button
            onClick={handleSave}
            className="py-1.5 w-28 font-medium text-white bg-[#3B65FB] hover:bg-[#2b4fb0] rounded-md shadow-md cursor-pointer"
          >
            SAVE
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddRoom;
