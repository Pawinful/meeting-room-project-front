import React from "react";
import { FaHome, FaMapMarkerAlt } from "react-icons/fa";
import { HiUsers } from "react-icons/hi2";

const data = [
  {
    _id: "67c92a3e27493bd775bacbb8",
    meetingName: "test1",
    meetingDescription: "test description1",
    roomNameTH: "วศ. 501",
    roomNameEN: "ENGR 501",
    customerUsername: "6510742478",
    customerDepartment: "โครงการวิศวกรรมศาสตร์และการจัดการเชิงธุรกิจ",
    locaTion: "Co-Learning Space, TSE Building Fl.1",
    customerEmail: "pawin.suk@dome.tu.ac.th",
    bookingStartTime: "2022-12-16T02:33:24.000Z",
    bookingEndTime: "2023-12-16T02:33:24.000Z",
    requireApprove: true,
    approver: "admin",
    bookingStatus: "NOT_APPROVED",
    createdAt: "2025-03-06T04:53:18.035Z",
    updatedAt: "2025-03-06T06:13:36.469Z",
    roomSize: "1-2",
    __v: 0,
  },
  {
    _id: "67c92a4627493bd775bacbbb",
    meetingName: "test2",
    meetingDescription: "test description2",
    roomNameTH: "วศ. 501",
    roomNameEN: "ENGR 501",
    customerUsername: "6510742478",
    customerDepartment: "โครงการวิศวกรรมศาสตร์และการจัดการเชิงธุรกิจ",
    locaTion: "Co-Learning Space, TSE Building Fl.1",
    customerEmail: "pawin.suk@dome.tu.ac.th",
    bookingStartTime: "2022-12-16T02:33:24.000Z",
    bookingEndTime: "2023-12-16T02:33:24.000Z",
    requireApprove: true,
    approver: "PENDING",
    bookingStatus: "NOT_APPROVED",
    createdAt: "2025-03-06T04:53:26.553Z",
    updatedAt: "2025-03-06T06:13:38.671Z",
    roomSize: "1-2",
    __v: 0,
  },
  {
    _id: "67c92a4c27493bd775bacbbe",
    meetingName: "test1",
    meetingDescription: "test description1",
    roomNameTH: "วศ. 501",
    roomNameEN: "ENGR 501",
    customerUsername: "6510742478",
    customerDepartment: "โครงการวิศวกรรมศาสตร์และการจัดการเชิงธุรกิจ",
    locaTion: "Co-Learning Space, TSE Building Fl.1",
    customerEmail: "pawin.suk@dome.tu.ac.th",
    bookingStartTime: "2022-12-16T02:33:24.000Z",
    bookingEndTime: "2023-12-16T02:33:24.000Z",
    requireApprove: true,
    approver: "PENDING",
    bookingStatus: "NOT_APPROVED",
    createdAt: "2025-03-06T04:53:32.254Z",
    updatedAt: "2025-03-06T06:13:40.523Z",
    roomSize: "1-2",
    __v: 0,
  },
  {
    _id: "67c92a5927493bd775bacbc1",
    meetingName: "test4",
    meetingDescription: "test description4",
    roomNameTH: "วศ. 501",
    roomNameEN: "ENGR 501",
    customerUsername: "6510742478",
    customerDepartment: "โครงการวิศวกรรมศาสตร์และการจัดการเชิงธุรกิจ",
    locaTion: "Co-Learning Space, TSE Building Fl.1",
    customerEmail: "pawin.suk@dome.tu.ac.th",
    bookingStartTime: "2022-12-16T02:33:24.000Z",
    bookingEndTime: "2023-12-16T02:33:24.000Z",
    requireApprove: true,
    approver: "PENDING",
    bookingStatus: "APPROVED",
    createdAt: "2025-03-06T04:53:45.443Z",
    updatedAt: "2025-03-06T06:11:48.130Z",
    roomSize: "1-2",
    __v: 0,
  },
  {
    _id: "67c93dc3fe846b81079e5b30",
    meetingName: "len game",
    meetingDescription: "len game gub phuen",
    roomNameTH: "วศ 503",
    roomNameEN: "ENGR 503",
    customerUsername: "6510742478",
    customerDepartment: "โครงการวิศวกรรมศาสตร์และการจัดการเชิงธุรกิจ (EBM)",
    locaTion: "Co-Learning Space, TSE Building Fl.1",
    customerEmail: "asdf@asdf.com",
    bookingStartTime: "2025-03-05T21:19:00.000Z",
    bookingEndTime: "2025-03-06T03:43:00.000Z",
    requireApprove: true,
    approver: "PENDING",
    bookingStatus: "PENDING",
    createdAt: "2025-03-06T06:16:35.478Z",
    updatedAt: "2025-03-06T06:16:35.478Z",
    roomSize: "1-2",
    __v: 0,
  },
];

const MyBooking = () => {
  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-xl font-bold mb-4">My Booking</h1>

      <div className="bg-white border shadow-md p-6 mb-6">
        <div className="flex items-start gap-6 mb-5">
          <div className="bg-gray-200 p-5 rounded-lg">
            <FaHome className="text-grey-600 text-4xl" />
          </div>
          <div>
            <h2 className="text-xl font-semibold mb-1">Meeting Room</h2>
            <p className="text-gray-500 flex items-center gap-2 text-sm">
              <FaMapMarkerAlt /> Co-Learning Space, TSE Building Fl.1
            </p>
          </div>
        </div>

        <div className="flex justify-center items-center gap-10 max-[450px]:gap-5">
          <div>
            <div className="font-semibold mb-3">Start Date</div>
            <div className="bg-[#CECECE] px-3 py-1 text-sm rounded-md">
              5 ต.ค. 2567 10:00:00
            </div>
          </div>
          <div>
            <div className="font-semibold mb-3">End Date</div>
            <div className="bg-[#8A2A2B] text-white px-3 py-1 text-sm rounded-md">
              5 ต.ค. 2567 11:00:00
            </div>
          </div>
        </div>

        {/* ตาราง */}
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
              {data.map((item, index) => (
                <tr key={index} className="border border-gray-400">
                  <td className="border border-gray-400 px-2 py-3 text-sm">
                    {item.studentId}
                  </td>
                  <td className="border border-gray-400 px-2 py-3 text-sm">
                    {item.confirmStatus}
                  </td>
                  <td className="border border-gray-400 px-2 py-3 text-sm">
                    {item.timeAdd}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="mt-6 text-gray-600 text-sm mb-24">
          <p>กฎการยืนยันการใช้งาน :</p>
        </div>
        <div className="flex items-center gap-4 mb-5">
          <HiUsers />{" "}
          <span className="bg-[#FED141] px-3 py-0.5 rounded-md text-sm">
            1 - 2
          </span>
        </div>

        <div className="-mx-6 border-b"></div>

        <div className="flex justify-end items-center mt-5 ">
          <div className="flex gap-3">
            <button className="bg-[#E2E2E2] px-4 py-1 rounded-md">Edit</button>
            <button className="bg-[#C53739] text-white px-4 py-1 rounded-md">
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyBooking;
