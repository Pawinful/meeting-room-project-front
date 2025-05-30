import React, { useState, useEffect } from "react";
import {
  FiMapPin,
  FiHome,
  FiLayers,
  FiChevronLeft,
  FiChevronRight,
} from "react-icons/fi";
import { LuUsers } from "react-icons/lu";
import { format, addDays, subWeeks, addWeeks, startOfWeek } from "date-fns";
import { motion } from "framer-motion";
import clsx from "clsx";
import { Link } from "react-router-dom";
import axios from "axios";
import moment from "moment";

const BASE_URL = import.meta.env.VITE_APIKEY;

const last31Days = Array.from({ length: 36 }, (_, i) =>
  moment().subtract(i, "days").format("YYYY-MM-DD")
);

const sundays = [];
const startDate = moment();
const endDate = moment().add(1, "month");

let current = startDate.clone();

while (current.isBefore(endDate)) {
  if (current.day() === 0) {
    sundays.push(current.format("YYYY-MM-DD"));
  }
  current.add(1, "day");
}

const holidays = [...last31Days, ...sundays];

const BookingCalendar = ({ roomName }) => {
  const roomNameEN = localStorage.getItem("selectedRoomNameEN");
  const [bookingData, setBookingData] = useState([]);
  const payload = { roomNameEN: roomNameEN };

  useEffect(() => {
    const fetchBookingData = async () => {
      try {
        const res = await axios.post(
          BASE_URL + "booking/getRoomBooking",

          payload
        );
        if (res.data.success) {
          setBookingData(res.data.data);
          // console.log(res.data);
        }
      } catch (err) {
        console.error("Error fetching booking data:", err);
      }
    };

    fetchBookingData();
  }, [roomNameEN]);

  const bookingStatus = {};

  bookingData.forEach((booking) => {
    const room = booking.roomNameEN;
    const status = booking.bookingStatus === "APPROVE" ? "booked" : "pending";

    if (!bookingStatus[room]) {
      bookingStatus[room] = {};
    }

    booking.bookingTime.forEach((timeSlot) => {
      bookingStatus[room][timeSlot] = status;
    });
  });

  const [selectedTimes, setSelectedTimes] = useState([]);
  const [selectedDate, setSelectedDate] = useState(null);
  const [currentWeek, setCurrentWeek] = useState(
    startOfWeek(new Date(), { weekStartsOn: 0 })
  );
  const maxBookingHours = 3;

  const handlePrevWeek = () => {
    const oneMonthAgo = moment().subtract(1, "month").startOf("week").toDate();
    const newWeek = subWeeks(currentWeek, 1);

    if (newWeek >= oneMonthAgo) {
      setCurrentWeek(newWeek);
    }
  };

  const handleNextWeek = () => setCurrentWeek(addWeeks(currentWeek, 1));

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

  const toggleTimeSlot = (day, time) => {
    const selectedDateTime = `${format(day, "yyyy-MM-dd")} ${time}`;
    const dateKey = format(day, "yyyy-MM-dd");

    if (
      holidays.includes(dateKey) ||
      bookingStatus[roomName]?.[selectedDateTime] === "booked"
    )
      return;

    if (selectedDate && selectedDate !== dateKey) return;

    if (!selectedDate) setSelectedDate(dateKey);

    const newSelectedTimes = [...selectedTimes];

    if (newSelectedTimes.includes(selectedDateTime)) {
      const updated = newSelectedTimes.filter((t) => t !== selectedDateTime);
      setSelectedTimes(updated);
      if (updated.length === 0) setSelectedDate(null);
      return;
    }

    const sortedTimes = times.map((t) => `${dateKey} ${t}`);
    const index = sortedTimes.indexOf(selectedDateTime);

    if (newSelectedTimes.length === 0) {
      setSelectedTimes([selectedDateTime]);
    } else if (newSelectedTimes.length < maxBookingHours) {
      const lastTime = newSelectedTimes[newSelectedTimes.length - 1];
      const lastIndex = sortedTimes.indexOf(lastTime);
      if (index === lastIndex + 1) {
        setSelectedTimes([...newSelectedTimes, selectedDateTime]);
      }
    }
  };

  return (
    <div className="p-4 bg-white shadow-md rounded-l border max-[350px]:px-1 max-[380px]:px-1">
      {/* หัวเดือน */}
      <div className="flex items-center justify-between mb-2 border-b pb-2">
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

      {/* วัน, วันที่ */}
      <div className="grid grid-cols-[70px_repeat(7,_1fr)] mb-2 text-center items-center text-xs font-medium border-b">
        <div className="col-span-1 text-center">Time</div>
        {days.map((day, idx) => (
          <div key={idx} className="col-span-1">
            <span
            // className={clsx("p-2 rounded-full", {
            //   "bg-yellow-300": idx === 4,
            // })}
            >
              {format(day, "E")}
            </span>
            <span className="block mb-2">{format(day, "d")}</span>
          </div>
        ))}
      </div>

      {/* เวลาและปุ่มกลมๆ */}
      <div className="grid grid-cols-[70px_repeat(7,_1fr)]">
        <div className="flex flex-col items-start mt-0.5">
          {times.map((time) => (
            <span
              key={time}
              className="py-2.5 text-xs whitespace-nowrap max-[365px]:py-2"
            >
              {time === "09:00"
                ? "09:00-10:00"
                : time === "10:00"
                  ? "10:00-11:00"
                  : time === "11:00"
                    ? "11:00-12:00"
                    : time === "12:00"
                      ? "12:00-13:00"
                      : time === "13:00"
                        ? "13:00-14:00"
                        : time === "14:00"
                          ? "14:00-15:00"
                          : time === "15:00"
                            ? "15:00-16:00"
                            : time === "16:00"
                              ? "16:00-17:00"
                              : time === "17:00"
                                ? "17:00-18:00"
                                : time === "18:00"
                                  ? "18:00-19:00"
                                  : time === "19:00"
                                    ? "19:00-20:00"
                                    : time === "20:00"
                                      ? "20:00-21:00"
                                      : time}
            </span>
          ))}
        </div>
        {days.map((day) => (
          <div
            key={format(day, "yyyy-MM-dd")}
            className="flex flex-col items-center"
          >
            {times.map((time) => {
              const timeKey = `${format(day, "yyyy-MM-dd")} ${time}`;
              const status = bookingStatus[roomName]?.[timeKey];
              const isBooked = status === "booked";
              const isPending = status === "pending";
              const isHoliday = holidays.includes(format(day, "yyyy-MM-dd"));
              const isSelected = selectedTimes.includes(timeKey);
              return (
                <motion.button
                  key={timeKey}
                  onClick={() => toggleTimeSlot(day, time)}
                  disabled={isBooked || isHoliday || isPending}
                  className={clsx(
                    "w-7 h-7 rounded-full border border-gray-300 m-1 max-[365px]:w-6  max-[365px]:h-6",
                    {
                      "bg-[#8A2A2B]": isBooked,
                      "bg-[#FED141]": isSelected,
                      "bg-[#90DCF8]": isPending,
                      "bg-[#A6A6A6]": isHoliday && !isBooked && !isPending,
                    }
                  )}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                />
              );
            })}
          </div>
        ))}
      </div>

      {/* Footer */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-b p-4 flex justify-between items-center">
        <span className="text-sm">ทั้งหมด {selectedTimes.length} ชั่วโมง </span>
        <Link
          to="/reserve"
          onClick={() => {
            localStorage.setItem(
              "selectedTimes",
              JSON.stringify(selectedTimes)
            );
          }}
        >
          <button className="bg-[#8A2A2B] text-white px-8 py-2 rounded">
            จองเลย
          </button>
        </Link>
      </div>
    </div>
  );
};

const RoomInfo = () => {
  const [roomData, setRoomData] = useState(null);

  useEffect(() => {
    const roomId = localStorage.getItem("selectedRoomId");

    if (roomId) {
      axios
        .get(BASE_URL + "rooms/getRoom/" + roomId)
        .then((res) => {
          if (res.data.success) {
            setRoomData(res.data.data);
          }
        })
        .catch((err) => console.error("Fetch room failed:", err));
    }
  }, []);

  if (!roomData) return <div>Loading...</div>;

  return (
    <div className="max-w-2xl mx-auto p-6 max-[350px]:p-5">
      <div className="flex gap-12 justify-center max-[350px]:gap-3">
        <div className="flex flex-col items-center">
          <div
            className="w-32 h-32 rounded-lg mb-4 bg-cover bg-center bg-gray-200"
            style={{
              backgroundImage: `url('/assets/${roomData.roomImage}')`,
            }}
          ></div>
          <div className="px-2">
            <p className="text-xs border px-1 rounded mb-2">
              SIZE: {roomData.size}
            </p>
            <p className="flex items-center justify-center text-xs">
              <LuUsers className="mr-2" />
              {roomData.capacity}
            </p>
          </div>
        </div>
        <div className="space-y-4">
          <div className="">
            <div className="text-lg font-bold">{roomData.roomNameEN}</div>
          </div>
          <div className="space-y-2 text-xs">
            <p className="flex items-center">
              <FiMapPin className="mr-2" /> {roomData.branch}
            </p>
            <p className="flex items-center">
              <FiHome className="mr-2" /> {roomData.building}
            </p>
            <p className="flex items-center">
              <FiLayers className="mr-2" /> {roomData.location}
            </p>
          </div>
        </div>
      </div>

      <div className="my-4">
        <BookingCalendar roomName={roomData.roomNameEN} />
      </div>

      <div className="flex flex-col gap-4 m-6 text-sm mb-18">
        <div className="flex gap-2">
          <div className="w-6 h-6 bg-white border border-gray-400 rounded-full"></div>
          <div>ว่าง</div>
        </div>
        <div className="flex gap-2">
          <div className="w-6 h-6 bg-[#A6A6A6] rounded-full"></div>
          <div>วันหยุด / เลยเวลาจอง</div>
        </div>
        <div className="flex gap-2">
          <div className="w-6 h-6 bg-[#8A2A2B] rounded-full"></div>
          <div>ไม่ว่าง</div>
        </div>
        <div className="flex gap-2">
          <div className="w-6 h-6 bg-[#FED141] rounded-full"></div>
          <div>เวลาที่จอง</div>
        </div>
        <div className="flex gap-2">
          <div className="w-6 h-6 bg-[#90DCF8] rounded-full"></div>
          <div>รออนุมัติ</div>
        </div>
      </div>
    </div>
  );
};

export default RoomInfo;
