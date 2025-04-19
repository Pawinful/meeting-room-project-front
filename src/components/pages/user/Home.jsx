import React from "react";
import { Link, useNavigate } from "react-router-dom";

const meetingRooms = [
  {
    success: true,
    data: [
      {
        "_id": "67c9423c7e32b902db13dcaa",
        "roomNameTH": "วศ 504",
        "roomNameEN": "ENGR 504",
        "roomImage": "image.jpg",
        "branch": "RANGSIT",
        "building": "TSE Building",
        "seat": 56,
        "roomType": "MEETING_ROOM",
        "status": 0,
        "note": "test note",
        "createdAt": "2025-03-06T06:35:40.463Z",
        "updatedAt": "2025-03-06T06:35:40.463Z",
        "__v": 0
      },
      {
        "_id": "67c9423c7e32b902db13dcaa",
        "roomNameTH": "วศ 505",
        "roomNameEN": "ENGR 505",
        "roomImage": "image.jpg",
        "branch": "RANGSIT",
        "building": "TSE Building",
        "seat": 56,
        "roomType": "MEETING_ROOM",
        "status": 0,
        "note": "test note",
        "createdAt": "2025-03-06T06:35:40.463Z",
        "updatedAt": "2025-03-06T06:35:40.463Z",
        "__v": 0
      },
      {
        "_id": "67c9423c7e32b902db13dcaa",
        "roomNameTH": "วศ 504",
        "roomNameEN": "ENGR 506",
        "roomImage": "image.jpg",
        "branch": "PATTAYA",
        "building": "TSE Building",
        "seat": 56,
        "roomType": "MEETING_ROOM",
        "status": 0,
        "note": "test note",
        "createdAt": "2025-03-06T06:35:40.463Z",
        "updatedAt": "2025-03-06T06:35:40.463Z",
        "__v": 0
      },
      {
        "_id": "67c9423c7e32b902db13dcaa",
        "roomNameTH": "วศ 504",
        "roomNameEN": "ENGR 507",
        "roomImage": "image.jpg",
        "branch": "PATTAYA",
        "building": "TSE Building",
        "seat": 56,
        "roomType": "MEETING_ROOM",
        "status": 0,
        "note": "test note",
        "createdAt": "2025-03-06T06:35:40.463Z",
        "updatedAt": "2025-03-06T06:35:40.463Z",
        "__v": 0
      },
    ],
  },
];

const rooms = meetingRooms[0].data;

const groupedRooms = rooms.reduce((acc, room) => {
  if (!acc[room.branch]) acc[room.branch] = [];
  acc[room.branch].push(room);
  return acc;
}, {});

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
        {Object.entries(groupedRooms).map(([branchName, rooms], index) => (
          <div key={index} className="relative w-full md:w-1/2">
            {/* ชื่อศูนย์ */}
            <div className="bg-[#8A2A2B] text-white px-6 py-4 pb-12 rounded-md text-lg font-semibold relative">
              {index + 1}. {branchName}
            </div>

            {/* ทุกห้องประชุม */}
            <div className="p-6 grid grid-cols-2 gap-8 relative mt-[-55px] max-[350px]:p-5 max-[350px]:gap-6">
              {rooms.map((room, i) => (
                <Link to="/roominfo" key={room._id}>
                  <div className="bg-[#A6A6A6] w-full h-36 rounded-lg shadow-md relative">
                    <span className="absolute bottom-5 left-0 w-full text-center text-sm font-semibold text-white">
                      {room.roomNameEN}
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
