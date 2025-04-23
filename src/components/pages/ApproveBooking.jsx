import moment from "moment";
import React, { useEffect, useState } from "react";
import axios from "axios";

const ApproveBooking = () => {
  const [bookingData, setBookingData] = useState(null);

  useEffect(() => {
    const bookingId = localStorage.getItem("selectedPendingBookingId");

    if (bookingId) {
      axios
        .post(`http://localhost:3000/api/booking/getBooking/${bookingId}`)
        .then((res) => {
          if (res.data.success) {
            setBookingData(res.data.data);
          }
        })
        .catch((err) => {
          console.error("Error fetching booking data:", err);
        });
    }
  }, []);

  if (!bookingData) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p>กำลังโหลดข้อมูล...</p>
      </div>
    );
  }

  return (
    <div className="bg-[#EBEDF1] min-h-[92vh] flex justify-center items-center py-12">
      <div className="p-10 bg-white w-[94%] min-h-[80vh] shadow-md">
        <h1 className="text-[#8A2A2B] text-xl font-bold mb-5">อนุมัติการจอง</h1>

        <div className="flex flex-col">
          <div className="p-3">
            <div className="flex flex-col gap-3">
              <div className="font-bold">ห้องประชุม</div>
              <div className="bg-gray-100 border border-gray-300 rounded-md p-3">
                {bookingData.roomNameEN}
              </div>
            </div>

            <div className="flex flex-col gap-3 mt-4">
              <div className="font-bold">ชื่อการประชุม</div>
              <div className="bg-gray-100 border border-gray-300 rounded-md p-3">
                {bookingData.meetingName}
              </div>
            </div>

            <div className="flex flex-col gap-3 mt-4">
              <div className="font-bold">รายละเอียดการประชุม</div>
              <div className="bg-gray-100 border border-gray-300 rounded-md p-3">
                {bookingData.meetingDescription}
              </div>
            </div>

            <div className="flex flex-col gap-3 mt-4">
              <div className="font-bold">รหัสนักศึกษา</div>
              <div className="bg-gray-100 border border-gray-300 rounded-md p-3">
                {bookingData.customerUsername}
              </div>
            </div>

            <div className="flex flex-col gap-3 mt-4">
              <div className="font-bold">สังกัด</div>
              <div className="bg-gray-100 border border-gray-300 rounded-md p-3">
                {bookingData.customerDepartment}
              </div>
            </div>

            <div className="flex flex-col gap-3 mt-4">
              <div className="font-bold">Email</div>
              <div className="bg-gray-100 border border-gray-300 rounded-md p-3">
                {bookingData.customerEmail}
              </div>
            </div>

            <div className="flex flex-col gap-3 mt-4">
              <div className="font-bold">วันที่</div>
              <div className="bg-gray-100 border border-gray-300 rounded-md p-3">
                {moment(bookingData.bookingStartTime).format("D MMMM YYYY")}
              </div>
            </div>

            <div className="flex gap-5 mt-4">
              <div className="flex-1">
                <div className="font-bold mb-3">เวลาเริ่มต้น</div>
                <div className="bg-gray-100 border border-gray-300 rounded-md p-3">
                  {moment(bookingData.bookingStartTime).format("HH:mm")}
                </div>
              </div>
              <div className="flex-1">
                <div className="font-bold mb-3">เวลาสิ้นสุด</div>
                <div className="bg-gray-100 border border-gray-300 rounded-md p-3">
                  {moment(bookingData.bookingEndTime).format("HH:mm")}
                </div>
              </div>
            </div>
          </div>

          {/* Button */}
          <div className="flex justify-end gap-4 mt-8">
            <button className="py-1.5 w-28 font-medium bg-red-700 hover:bg-red-800 text-white rounded-md cursor-pointer">
              ไม่อนุมัติ
            </button>
            <button className="py-1.5 w-28 font-medium bg-green-700 hover:bg-green-800 text-white rounded-md cursor-pointer">
              อนุมัติ
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ApproveBooking;
