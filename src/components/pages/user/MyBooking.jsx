import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaHome } from "react-icons/fa";
import { HiUsers } from "react-icons/hi2";
import moment from "moment";
import "moment/locale/th";
import { useNavigate } from "react-router-dom";

const BASE_URL = import.meta.env.VITE_APIKEY;

const MyBooking = () => {
  const [data, setData] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const userData = JSON.parse(localStorage.getItem("userData"));
        const username = userData?.username;

        if (!username) {
          console.warn("Username not found in localStorage.");
          return;
        }

        const response = await axios.get(
          BASE_URL + "booking/getUserBooking/" + username
        );

        if (response.data.success) {
          setData(response.data.data);
        } else {
          console.warn("Failed to fetch booking data.");
        }
      } catch (error) {
        console.error("Error fetching bookings:", error);
      }
    };

    fetchBookings();
  }, []);

  const handleCancel = async (bookingId) => {
    if (!window.confirm("Are you sure you want to cancel this booking?")) {
      return;
    }
    try {
      const response = await axios.delete(
        BASE_URL + "booking/deleteBooking/" + bookingId
      );
      if (response.data.success) {
        setData((prevData) =>
          prevData.filter((item) => item._id !== bookingId)
        );
      } else {
        alert("Failed to cancel booking.");
      }
    } catch (error) {
      console.error("Error cancelling booking:", error);
      alert("An error occurred while cancelling the booking.");
    }
  };

  const handleEdit = (roomId, meetingId) => {
    localStorage.setItem("editRoomId", roomId);
    localStorage.setItem("editMeetingId", meetingId);
    navigate("/roominfoedit");
  };

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-xl font-bold mb-4">My Booking</h1>

      {data.map((item) => (
        <div key={item._id} className="bg-white border shadow-md p-6 mb-8">
          <div className="flex items-start gap-6 mb-5">
            <div className="bg-gray-200 p-5 rounded-lg">
              <FaHome className="text-grey-600 text-4xl" />
            </div>
            <div>
              <h2 className="text-xl font-semibold mb-1">{item.roomNameEN}</h2>
              <p className="text-gray-500 flex items-center gap-2 text-sm">
                Meeting Name : {item.meetingName}
              </p>
            </div>
          </div>

          <div className="flex justify-center items-center gap-10 max-[450px]:gap-5">
            <div>
              <div className="font-semibold mb-3">Start Date</div>
              <div className="bg-[#CECECE] px-3 max-[450px]:px-2 py-1 text-sm rounded-md">
                {moment(item.bookingStartTime).format("D MMM YYYY HH:mm:ss")}
              </div>
            </div>
            <div>
              <div className="font-semibold mb-3">End Date</div>
              <div className="bg-[#8A2A2B] text-white px-3 max-[450px]:px-2 py-1 text-sm rounded-md">
                {moment(item.bookingEndTime).format("D MMM YYYY HH:mm:ss")}
              </div>
            </div>
          </div>

          <div className="overflow-x-auto mt-6 flex justify-center">
            <table className="border border-gray-400 text-center">
              <thead className="text-gray-70">
                <tr>
                  <th className="border border-gray-400 px-2 py-3 text-sm">
                    Student ID
                  </th>
                  <th className="border border-gray-400 px-2 py-3 text-sm">
                    Confirm Status
                  </th>
                  <th className="border border-gray-400 px-2 py-3 text-sm">
                    Time Add
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr className="border border-gray-400">
                  <td className="border border-gray-400 px-2 py-3 text-sm">
                    {item.customerUsername}
                  </td>
                  <td className="border border-gray-400 px-2 py-3 text-sm">
                    {item.bookingStatus === "PENDING"
                      ? "Pending"
                      : item.bookingStatus === "APPROVE"
                      ? "Approve"
                      : item.bookingStatus}
                  </td>
                  <td className="border border-gray-400 px-2 py-3 text-sm">
                    {moment(item.createdAt).format("D MMM YYYY HH:mm:ss")}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="mt-6 text-gray-600 text-sm mb-24">
            <p>กฎการยืนยันการใช้งาน :</p>
          </div>

          <div className="-mx-6 border-b"></div>

          <div className="flex justify-end items-center mt-5">
            <div className="flex gap-3">
              <button
                className="bg-[#E2E2E2] px-4 py-1 rounded-md cursor-pointer"
                onClick={() => handleEdit(item.roomId, item._id)}
              >
                Edit
              </button>
              <button
                className="bg-[#8A2A2B] text-white px-4 py-1 rounded-md cursor-pointer"
                onClick={() => handleCancel(item._id)}
              >
                Cancel
              </button>
              {/* <button
                className="bg-[#1A5D44] text-white px-4 py-1 rounded-md cursor-pointer"
                onClick={() => handleCancel(item._id)}
              >
                Confirm
              </button> */}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default MyBooking;
