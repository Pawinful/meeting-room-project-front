import React from "react";
import { Link, useNavigate } from "react-router-dom";

const meetingRooms = [
  {
    campus: "Rangsit Campus",
    rooms: [
      "Meeting Room 1",
      "Meeting Room 2",
      "Meeting Room 3",
      "Meeting Room 4",
      "Meeting Room 5",
      "Meeting Room 6",
    ],
  },
  {
    campus: "Pattaya Campus",
    rooms: [
      "Meeting Room 7",
      "Meeting Room 8",
      "Meeting Room 9",
      "Meeting Room 10",
    ],
  },
];

const Home = () => {
  return (
    <div className="min-h-screen">
      {/* Alert */}
      <div className="bg-[#54585A] text-white p-3 text-center text-sm flex justify-between">
        <span>Please choose Meeting room</span>
        <button className="text-white">✕</button>
      </div>

      {/* body */}
      <div className="p-6 flex flex-col md:flex-row gap-6 max-w-8xl mx-auto">
        {meetingRooms.map((campus, index) => (
          <div key={index} className="relative w-full md:w-1/2">
            {/* ชื่อศูนย์ */}
            <div className="bg-[#8A2A2B] text-white px-6 py-4 pb-12 rounded-md text-lg font-semibold relative">
              {index + 1}. {campus.campus}
            </div>

            {/* ทุกห้องประชุม */}
            <div className="p-6 grid grid-cols-2 gap-8 relative mt-[-55px] max-[350px]:p-5 max-[350px]:gap-6  ">
              {campus.rooms.map((room, i) => (
                <Link to="/roominfo">
                  <div
                    key={i}
                    className="bg-[#A6A6A6] w-full h-36 rounded-lg shadow-md relative"
                  >
                    {/* ชื่อห้องประชุม */}
                    <span className="absolute bottom-5 left-0 w-full text-center text-sm font-semibold text-white">
                      {room}
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
