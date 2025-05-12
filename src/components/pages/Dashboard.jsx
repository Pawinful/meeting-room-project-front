import React, { useEffect, useState } from "react";
import { Chart } from "react-google-charts";
import axios from "axios";
import moment from "moment";
const BASE_URL = import.meta.env.VITE_APIKEY;

const Dashboard = () => {
  const [rooms, setRooms] = useState([]);
  const [pendingBooking, setPendingBooking] = useState([]);
  const [allBooking, setAllBooking] = useState([]);
  const today = moment().format("D MMMM YYYY");
  useEffect(() => {
    const fetchRooms = async () => {
      try {
        const res = await axios.get(BASE_URL + "rooms/getAllRoom");
        if (res.data.success) {
          setRooms(res.data.data);
          console.log(res.data.data);
        }
      } catch (err) {
        console.error("Error fetching rooms:", err);
      }
    };

    const fetchPendingBooking = async () => {
      try {
        const res = await axios.get(BASE_URL + "booking/getPendingBooking");
        if (res.data.success) {
          setPendingBooking(res.data.data);
          // console.log(res.data.data);
        }
      } catch (err) {
        console.error("Error fetching pendingBooking:", err);
      }
    };

    const fetchAllBooking = async () => {
      try {
        const res = await axios.get(BASE_URL + "booking/getAllBooking");
        if (res.data.success) {
          setAllBooking(res.data.data);
          // console.log(res.data.data);
        }
      } catch (err) {
        console.error("Error fetching allBooking:", err);
      }
    };
    fetchAllBooking();
    fetchPendingBooking();
    fetchRooms();
  }, []);

  const timeSlots = [
    "09:00-10:00",
    "10:00-11:00",
    "11:00-12:00",
    "12:00-13:00",
    "13:00-14:00",
    "14:00-15:00",
    "15:00-16:00",
    "16:00-17:00",
    "17:00-18:00",
    "18:00-19:00",
    "19:00-20:00",
    "20:00-21:00",
  ];

  const bookingMap = {};

  allBooking.forEach((booking) => {
    const bookingDate = moment(booking.bookingStartTime).local().format("YYYY-MM-DD");
    const todayDate = moment().format("YYYY-MM-DD");

    if (bookingDate === todayDate) {
      const room = booking.roomNameEN;
      if (!bookingMap[room]) bookingMap[room] = Array(timeSlots.length).fill(null);

      booking.bookingTime.forEach((timeStr) => {
        const hour = parseInt(timeStr.split(" ")[1].split(":")[0], 10);
        const slotIndex = timeSlots.findIndex(
          (slot) => parseInt(slot.split(":")[0]) === hour
        );
        if (slotIndex !== -1) {
          bookingMap[room][slotIndex] = {
            username: booking.customerUsername,
            slotLabel: timeSlots[slotIndex],
          };
        }
      });
    }
  });

  const roomList = Object.keys(bookingMap);

  const monthlyBookingData = () => {
    const monthMap = {};

    allBooking.forEach((booking) => {
      const month = moment(booking.bookingStartTime).format("MMM").toUpperCase();
      if (!monthMap[month]) monthMap[month] = 0;
      monthMap[month]++;
    });

    const orderedMonths = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"];

    const chartData = [["เดือน", "จำนวนจอง"]];
    orderedMonths.forEach((m) => {
      chartData.push([m, monthMap[m] || 0]);
    });

    return chartData;
  };

  const roomPopularityData = () => {
    const roomMap = {};

    allBooking.forEach((booking) => {
      const room = booking.roomNameEN;
      if (!roomMap[room]) roomMap[room] = 0;
      roomMap[room]++;
    });

    const chartData = [["ห้อง", "ความนิยม"]];
    Object.entries(roomMap).forEach(([room, count]) => {
      chartData.push([room, count]);
    });

    return chartData;
  };

  const todayBookingCount = allBooking.filter(
    (booking) =>
      moment(booking.bookingStartTime).local().format("D MMMM YYYY") === today
  ).length;


  return (
    <div className="bg-gray-100 min-h-screen p-6">
      <h1 className="text-3xl font-bold mb-6">Dashboard</h1>

      {/* แถว 1 */}
      <div className="grid grid-cols-2 lg:grid-cols-5 gap-6 mb-6 text-center">
        {[
          ["การจองทั้งหมด", allBooking.length],
          ["การจองวันนี้", todayBookingCount],
          ["รอการอนุมัติ", pendingBooking.length],
          ["จำนวนห้องประชุม", rooms.length],
        ].map(([title, value], index) => (
          <div key={index} className="bg-white rounded-lg p-4 shadow">
            <p className="font-bold mb-2">{title}</p>
            <p className="text-3xl font-bold">{value}</p>
          </div>
        ))}
        <div className="bg-white rounded-lg p-4 text-left">
          <p className="font-bold mb-2">เวลาทำการ</p>
          <div>
            <div className="flex justify-between">
              <p>จันทร์ - เสาร์</p>
              <p>09:00 - 21:00 น.</p>
            </div>
            <div className="flex justify-between">
              <p>อาทิตย์</p>
              <p>ปิดทำการ</p>
            </div>
          </div>
        </div>
      </div>

      {/* แถว 2 */}
      <div className="grid grid-cols-1 lg:grid-cols-1 gap-6 mb-6">
        {/* ตารางแสดงการจองห้อง */}
        <div className="bg-white rounded-lg col-span-2 p-4 text-left">
          <p className="font-bold text-lg">ตารางแสดงการจองห้อง</p>
          <p className="text-gray-500 text-sm mt-1 mb-3">{today}</p>

          <div className="overflow-auto max-w-full max-h-75 border border-gray-300 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            <table className="w-full text-sm border border-gray-300 min-w-175 ">
              <thead>
                <tr className="">
                  <th className="p-2 py-4 text-center min-w-30">ห้องประชุม/เวลา</th>
                  {timeSlots.map((time, index) => (
                    <th key={index} className="p-2 text-center min-w-25">
                      {time}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {roomList.map((room, idx) => (
                  <tr key={idx}>
                    <td className="border border-gray-300 text-center p-4">{room}</td>
                    {bookingMap[room].map((entry, timeIdx) => (
                      <td
                        key={timeIdx}
                        className={`border border-gray-300 text-center ${entry ? "bg-[#F9E193]" : ""
                          }`}
                      >
                        {entry && (
                          <div>
                            <p className="text-[#8A2A2B] font-bold">{entry.username}</p>
                            <p className="text-[#333333] text-sm">{entry.slotLabel}</p>
                          </div>
                        )}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>

            </table>
          </div>
        </div>



        {/* ประเภทผู้ใช้งาน */}
        {/* <div className="bg-white rounded-lg p-4">
          <p className="font-bold text-lg mb-2">ประเภทผู้ใช้งาน</p>
          <Chart
            width={"100%"}
            height={"250px"}
            chartType="PieChart"
            loader={<div>Loading Chart...</div>}
            data={[
              ["ประเภท", "จำนวน"],
              ["อาจารย์", 33],
              ["นักศึกษา", 67],
            ]}
            options={{
              pieHole: 0,
              legend: { position: "bottom" },
            }}
          />
        </div> */}
      </div>

      {/* แถว 3 */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* การจองล่าสุด */}
        <div className="bg-white rounded-lg p-4">
          <p className="font-bold text-lg mb-2">การจองล่าสุด</p>
          <div className="overflow-auto max-h-80 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            {allBooking.map(
              ({ customerUsername, bookingStatus, bookingStartTime }, index) => (
                <div
                  key={index}
                  className="flex justify-between items-center py-2"
                >
                  <span className="text-sm">{customerUsername}</span>
                  <span
                    className={`px-2 py-1 text-xs font-bold rounded ${bookingStatus === "PENDING"
                      ? "bg-gray-300 text-gray-700"
                      : bookingStatus === "REJECTED"
                        ? "bg-red-200 text-red-700"
                        : "bg-green-200 text-green-700"
                      }`}
                  >
                    {bookingStatus === "APPROVE"
                      ? "Approve"
                      : bookingStatus === "PENDING"
                        ? "Pending"
                        : bookingStatus}
                  </span>
                  <span className="text-sm text-gray-500">
                    {moment(bookingStartTime).format("DD-MM-YYYY")}
                  </span>
                </div>
              )
            )}
          </div>
        </div>
        <div className="bg-white rounded-lg p-4">
          <p className="font-bold text-lg mb-2">
            กราฟสรุปจำนวนการจองห้องประชุม
          </p>
          <Chart
            width={"100%"}
            height={"300px"}
            chartType="LineChart"
            loader={<div>Loading Chart</div>}
            data={monthlyBookingData()}
            options={{
              hAxis: { title: "เดือน" },
              vAxis: { title: "จำนวนจอง" },
              legend: { position: "none" },
            }}
          />

        </div>

        <div className="bg-white rounded-lg p-4">
          <p className="font-bold text-lg mb-2">
            กราฟเปรียบเทียบความนิยมห้องประชุม
          </p>
          <Chart
            width={"100%"}
            height={"300px"}
            chartType="ColumnChart"
            loader={<div>Loading Chart</div>}
            data={roomPopularityData()}
            options={{
              hAxis: { title: "ห้องประชุม" },
              vAxis: { title: "ความนิยม" },
              legend: { position: "none" },
            }}
          />

        </div>
      </div>
    </div>
  );
};

export default Dashboard;
