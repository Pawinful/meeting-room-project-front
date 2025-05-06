import React, { useEffect, useState } from "react";
import {
  FiMapPin,
  FiHome,
  FiLayers,
  FiChevronLeft,
  FiChevronRight,
} from "react-icons/fi";
import { LuUsers } from "react-icons/lu";
import { format, addDays, subWeeks, addWeeks, startOfWeek } from "date-fns";
import axios from "axios";
import moment from "moment";
import clsx from "clsx";

const BASE_URL = import.meta.env.VITE_APIKEY;

const RoomStatus = () => {
  const [rooms, setRooms] = useState([]);
  const [bookingStatus, setBookingStatus] = useState({});
  const [currentWeek, setCurrentWeek] = useState(
    startOfWeek(new Date(), { weekStartsOn: 0 })
  );

  const days = Array.from({ length: 7 }, (_, i) => addDays(currentWeek, i));
  const times = [
    "09:00",
    "10:00",
    "11:00",
    "12:00",
    "13:00",
    "14:00",
    "15:00",
    "16:00",
    "17:00",
    "18:00",
    "19:00",
    "20:00",
  ];

  const last31Days = Array.from({ length: 31 }, (_, i) =>
    moment().subtract(i, "days").format("YYYY-MM-DD")
  );

  const sundays = [];
  const endDate = moment().add(1, "month");
  let current = moment();
  while (current.isBefore(endDate)) {
    if (current.day() === 0) sundays.push(current.format("YYYY-MM-DD"));
    current.add(1, "day");
  }
  const holidays = [...last31Days, ...sundays];

  useEffect(() => {
    const fetchRooms = async () => {
      try {
        const res = await axios.get(BASE_URL + "rooms/getAllRoom");
        if (res.data.success) {
          setRooms(res.data.data);
          fetchAllBookings(res.data.data);
        }
      } catch (err) {
        console.error("Error fetching rooms:", err);
      }
    };

    const fetchAllBookings = async (rooms) => {
      const status = {};
      for (const room of rooms) {
        try {
          const res = await axios.post(BASE_URL + "booking/getRoomBooking", {
            roomNameEN: room.roomNameEN,
          });
          if (res.data.success) {
            const bookings = res.data.data;
            bookings.forEach((booking) => {
              if (!status[booking.roomNameEN]) status[booking.roomNameEN] = {};
              const state =
                booking.bookingStatus === "APPROVE" ? "booked" : "pending";
              booking.bookingTime.forEach((t) => {
                status[booking.roomNameEN][t] = state;
              });
            });
          }
        } catch (err) {
          console.error(`Failed fetching bookings for ${room.roomNameEN}`, err);
        }
      }
      setBookingStatus(status);
    };

    fetchRooms();
  }, []);

  const handlePrevWeek = () => setCurrentWeek(subWeeks(currentWeek, 1));
  const handleNextWeek = () => setCurrentWeek(addWeeks(currentWeek, 1));

  const getColor = (status) => {
    switch (status) {
      case "missed":
        return "bg-[#F1802E]";
      case "booked":
        return "bg-[#8A2A2B]";
      case "pending":
        return "bg-[#90DCF8]";
      case "holiday":
        return "bg-[#A6A6A6]";
      default:
        return "bg-white border border-gray-300";
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6 max-[350px]:p-5">
      <div className="flex md:flex-row md:items-center justify-center mb-4 p-6">
        <div className="mr-2 max-[500px]:mt-2">Status:</div>
        <div className="grid grid-cols-4 gap-x-1 gap-y-1 md:flex md:gap-4">
          <div className="flex items-center gap-1">
            <div className="w-4 h-4 rounded-full border border-gray-400"></div>
            <div className="text-sm">ว่าง</div>
          </div>
          <div className="flex items-center gap-1">
            <div className="w-4 h-4 rounded-full bg-[#8A2A2B]"></div>
            <div className="text-sm">ไม่ว่าง</div>
          </div>
          <div className="flex items-center gap-1">
            <div className="w-4 h-4 rounded-full bg-[#1A5D44]"></div>
            <div className="text-sm">กำลังใช้งาน</div>
          </div>
          <div className="flex items-center gap-1">
            <div className="w-4 h-4 rounded-full bg-[#F1802E]"></div>
            <div className="text-sm">หลุดจอง</div>
          </div>
          <div className="flex items-center gap-1 col-span-1">
            <div className="w-4 h-4 rounded-full bg-[#90DCF8]"></div>
            <div className="text-sm">รออนุมัติ</div>
          </div>
          <div className="flex items-center gap-1 col-span-3">
            <div className="w-4 h-4 rounded-full bg-[#A6A6A6]"></div>
            <div className="text-sm">วันหยุด / เลยเวลาการจอง</div>
          </div>
        </div>
      </div>

      {rooms.map((room) => (
        <div key={room._id}>
          {/* Room Header */}
          <div className="flex gap-10 mb-4">
            <div className="flex flex-col items-center">
              <div
                className="w-28 h-28 rounded-lg bg-cover bg-center bg-gray-200 mb-2"
                style={{
                  backgroundImage: `url('/assets/${room.roomImage}')`,
                }}
              />
              <p className="text-xs border px-1 rounded mb-1">
                SIZE: {room.size}
              </p>
              <p className="text-xs flex items-center">
                <LuUsers className="mr-1" />
                {room.capacity}
              </p>
            </div>
            <div className="flex flex-col justify-center space-y-2 text-sm">
              <p className="text-lg font-bold">{room.roomNameEN}</p>
              <p className="flex items-center">
                <FiMapPin className="mr-2" /> {room.branch}
              </p>
              <p className="flex items-center">
                <FiHome className="mr-2" /> {room.building}
              </p>
              <p className="flex items-center">
                <FiLayers className="mr-2" /> {room.location}
              </p>
            </div>
          </div>
          <div className="shadow-md rounded-l p-6 border max-[350px]:px-1 max-[390px]:px-2 mb-10">
            {/* Calendar Header */}
            <div className="flex justify-between items-center mb-2 border-b pb-2">
              <button onClick={handlePrevWeek} className="p-2">
                <FiChevronLeft />
              </button>
              <h3 className="text-lg font-semibold">
                {format(currentWeek, "MMMM yyyy")}
              </h3>
              <button onClick={handleNextWeek} className="p-2">
                <FiChevronRight />
              </button>
            </div>

            {/* Days and Times */}
            <div className="grid grid-cols-[70px_repeat(7,_1fr)] text-xs text-center font-medium border-b mb-4">
              <div>Time</div>
              {days.map((day, i) => (
                <div key={i}>
                  <div>{format(day, "E")}</div>
                  <div className="mb-2">{format(day, "d")}</div>
                </div>
              ))}
            </div>

            <div className="grid grid-cols-[70px_repeat(7,_1fr)]">
              {/* Time Column */}
              <div className="flex flex-col items-start mt-0.5">
                {times.map((time) => (
                  <span key={time} className="py-2.5 text-xs whitespace-nowrap">
                    {`${time}-${String(Number(time.split(":")[0]) + 1).padStart(
                      2,
                      "0"
                    )}:00`}
                  </span>
                ))}
              </div>

              {/* Booking Grid */}
              {days.map((day) => (
                <div key={day} className="flex flex-col items-center">
                  {times.map((time) => {
                    const dateKey = format(day, "yyyy-MM-dd");
                    const timeKey = `${dateKey} ${time}`;
                    const status = holidays.includes(dateKey)
                      ? "holiday"
                      : bookingStatus[room.roomNameEN]?.[timeKey] ||
                        "available";

                    return (
                      <div
                        key={timeKey}
                        className={clsx(
                          "w-7 h-7 rounded-full m-1 border",
                          getColor(status)
                        )}
                      ></div>
                    );
                  })}
                </div>
              ))}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default RoomStatus;
