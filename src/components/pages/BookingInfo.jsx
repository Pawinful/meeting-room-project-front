import React, { useState } from "react";
import { FiChevronLeft } from "react-icons/fi";

const TABLE_ROWS = [
  {
    id: 1,
    room: "Meeting Room 1",
    date: "2024-10-08",
    timeStart: "10:00",
    timeEnd: "11:00",
    topic: "ตัวสอบกลางภาค",
    details: "Lorem ipsum dolor sit amet",
    studentId: "6510742478",
    major: "Soft-en",
    email: "user@gmail.com",
    status_: "อนุมัติ",
  },
  {
    id: 2,
    room: "Meeting room 2",
    date: "2024-10-08",
    timeStart: "10:00",
    timeEnd: "11:00",
    topic: "ตัวสอบกลางภาค",
    details: "Lorem ipsum dolor sit amet",
    studentId: "6510742478",
    major: "Soft-en",
    email: "user@gmail.com",
    status_: "ไม่อนุมัติ",
  },
  {
    id: 3,
    room: "Meeting room 3",
    date: "2024-10-08",
    timeStart: "10:00",
    timeEnd: "11:00",
    topic: "ตัวสอบกลางภาค",
    details: "Lorem ipsum dolor sit amet",
    studentId: "6510742478",
    major: "Soft-en",
    email: "user@gmail.com",
    status_: "ยกเลิก",
  },
  {
    id: 4,
    room: "Meeting room 4",
    date: "2024-10-08",
    timeStart: "10:00",
    timeEnd: "11:00",
    topic: "ตัวสอบกลางภาค",
    details: "Lorem ipsum dolor sit amet",
    studentId: "6510742478",
    major: "Soft-en",
    email: "user@gmail.com",
    status_: "ยกเลิก",
  },
  {
    id: 5,
    room: "Meeting room 5",
    date: "2024-10-08",
    timeStart: "10:00",
    timeEnd: "11:00",
    topic: "ตัวสอบกลางภาค",
    details: "Lorem ipsum dolor sit amet",
    studentId: "6510742478",
    major: "Soft-en",
    email: "user@gmail.com",
    status_: "ยกเลิก",
  },
  {
    id: 6,
    room: "Meeting room 6",
    date: "2024-10-08",
    timeStart: "10:00",
    timeEnd: "11:00",
    topic: "ตัวสอบกลางภาค",
    details: "Lorem ipsum dolor sit amet",
    studentId: "6510742478",
    major: "Soft-en",
    email: "user@gmail.com",
    status_: "ยกเลิก",
  },
];

const statusColor = (status_) => {
  switch (status_) {
    case "อนุมัติ":
      return "#45DB54";
    case "ไม่อนุมัติ":
    case "ยกเลิก":
      return "#FC6A6C";
    case "รออนุมัติ":
    default:
      return "#FED141";
  }
};

const BookingInfo = () => {
  const [selectedBooking, setSelectedBooking] = useState(null);

  return (
    <>
      <div className="bg-[#EBEDF1] h-[92vh] flex justify-center items-center">
        <div className="p-10 bg-white w-[94%] h-[80vh] shadow-md overflow-hidden">
          <div className="flex flex-col md:flex-row justify-between items-center mb-6">
            <h1 className="text-[#8A2A2B] text-xl font-bold text-center md:text-left">
              ข้อมูลการจองห้องประชุม
            </h1>
            <div className="flex items-center gap-2 mt-4 md:mt-0">
              <div className="text-gray-600">ค้นหา : </div>
              <input
                type="text"
                className="border border-gray-300 rounded-lg px-3 py-1 focus:outline-none"
              />
            </div>
          </div>

          <div className="flex-1 overflow-y-auto max-h-[65vh] [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            <table className="w-full table-auto">
              <thead>
                <tr className="border-b">
                  <th className="w-[10%] text-center p-4">ลำดับ</th>
                  <th className="w-[20%] text-center p-4">ห้องประชุม</th>
                  <th className="w-[15%] text-center p-4">วันที่</th>
                  <th className="w-[10%] text-center p-4">เวลา</th>
                  <th className="w-[25%] text-center p-4 hidden sm:table-cell">
                    เรื่อง
                  </th>
                  <th className="w-[10%] text-center p-4">สถานะ</th>
                  <th className="w-[10%] text-center p-4">จัดการ</th>
                </tr>
              </thead>
              <tbody>
                {TABLE_ROWS.map((row) => (
                  <tr key={row.id} className="border-b border-gray-400">
                    <td className="text-center px-4 py-5">{row.id}</td>
                    <td className="text-center px-4 py-5">{row.room}</td>
                    <td className="text-center px-4 py-5">{row.date}</td>
                    <td className="text-center px-4 py-5">
                      {row.timeStart} - {row.timeEnd}
                    </td>
                    <td className="text-center px-4 py-5 hidden sm:table-cell">
                      {row.topic}
                    </td>
                    <td className="px-4 py-5 flex justify-center">
                      <div
                        className="w-20 h-9 text-white rounded-md flex items-center justify-center text-sm font-bold"
                        style={{ backgroundColor: statusColor(row.status_) }}
                      >
                        {row.status_}
                      </div>
                    </td>
                    <td className="text-center px-4 py-5">
                      <button
                        onClick={() => setSelectedBooking(row)}
                        className="w-20 h-9 bg-[#3B65FB] text-white rounded-md text-sm cursor-pointer hover:bg-[#2650E6]"
                      >
                        แสดง
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      

      {selectedBooking && (
        <div
          className="fixed inset-0 flex items-center justify-center bg-black/50 z-50"
          onClick={() => setSelectedBooking(null)}
        >
          <div
            className="relative bg-white w-120 px-10 py-4 pb-6  shadow-lg space-y-2"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-center">
              <FiChevronLeft
                onClick={() => setSelectedBooking(null)}
                className="absolute left-5 text-2xl text-gray-600 cursor-pointer hover:text-gray-800"
              />
              <h2 className="flex-1 text-center font-bold">ข้อมูลการจอง</h2>
            </div>

            <hr className="mb-4 -mx-10" />
            <p><b>ห้องประชุม:</b> {selectedBooking.room}</p>
            <p><b>ชื่อการประชุม:</b> {selectedBooking.topic}</p>
            <p><b>รายละเอียดการประชุม:</b> {selectedBooking.details}</p>
            <p><b>Student ID:</b> {selectedBooking.studentId}</p>
            <p><b>สาขา:</b> {selectedBooking.major}</p>
            <p><b>E-Mail:</b> {selectedBooking.email}</p>
            <p><b>วันที่:</b> {selectedBooking.date}</p>
            <p><b>เวลาเริ่มต้น:</b> {selectedBooking.timeStart}</p>
            <p><b>เวลาสิ้นสุด:</b> {selectedBooking.timeEnd}</p>
            <p><b>สถานะ:</b> {selectedBooking.status_}</p>
          </div>
        </div>
      )}

    </>
  )
}

export default BookingInfo;
