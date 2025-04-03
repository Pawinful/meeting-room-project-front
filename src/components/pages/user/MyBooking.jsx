import React from 'react';
import { FaHome, FaMapMarkerAlt } from 'react-icons/fa';
import { HiUsers } from 'react-icons/hi2';

const data = [
    { studentId: "6510742262", confirmStatus: "Confirm", timeAdd: "0000-00-00 00:00:00" },
];

const MyBooking = () => {
    return (
        <div className='max-w-3xl mx-auto p-6'>
            <h1 className='text-xl font-bold mb-4'>My Booking</h1>

            <div className="bg-white border shadow-md p-6 mb-6">
                <div className='flex items-start gap-6 mb-5'>
                    <div className='bg-gray-200 p-5 rounded-lg'>
                        <FaHome className='text-grey-600 text-4xl' />
                    </div>
                    <div>
                        <h2 className='text-xl font-semibold mb-1'>Meeting Room</h2>
                        <p className='text-gray-500 flex items-center gap-2 text-sm'>
                            <FaMapMarkerAlt /> Co-Learning Space, TSE Building Fl.1
                        </p>
                    </div>
                </div>

                
                <div className='flex justify-center items-center gap-10 max-[450px]:gap-5'>
                    <div>
                        <div className='font-semibold mb-3'>Start Date</div>
                        <div className='bg-[#CECECE] px-3 py-1 text-sm rounded-md'>5 ต.ค. 2567 10:00:00</div>
                    </div>
                    <div>
                        <div className='font-semibold mb-3'>End Date</div>
                        <div className='bg-[#8A2A2B] text-white px-3 py-1 text-sm rounded-md'>5 ต.ค. 2567 11:00:00</div>
                    </div>
                </div>

                {/* ตาราง */}
                <div className="overflow-x-auto mt-6 flex justify-center">
                    <table className="border border-gray-400 text-center">
                        <thead className="text-gray-70">
                            <tr>
                                <th className="border border-gray-400 px-2 py-3 text-sm">Student ID</th>
                                <th className="border border-gray-400 px-2 py-3 text-sm">Confirm Status</th>
                                <th className="border border-gray-400 px-2 py-3 text-sm">Time Add</th>
                            </tr>
                        </thead>
                        <tbody>
                            {data.map((item, index) => (
                                <tr key={index} className="border border-gray-400">
                                    <td className="border border-gray-400 px-2 py-3 text-sm">{item.studentId}</td>
                                    <td className="border border-gray-400 px-2 py-3 text-sm">{item.confirmStatus}</td>
                                    <td className="border border-gray-400 px-2 py-3 text-sm">{item.timeAdd}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                
                <div className='mt-6 text-gray-600 text-sm mb-24'>
                    <p>กฎการยืนยันการใช้งาน :</p>
                </div>
                <div className='flex items-center gap-4 mb-5'><HiUsers /> <span className='bg-[#FED141] px-3 py-0.5 rounded-md text-sm'>1 - 2</span></div>
                
                <div className='-mx-6 border-b'></div>

                <div className='flex justify-end items-center mt-5 '>
                    <div className='flex gap-3'>
                        <button className='bg-[#E2E2E2] px-4 py-1 rounded-md'>Edit</button>
                        <button className='bg-[#C53739] text-white px-4 py-1 rounded-md'>Cancel</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default MyBooking;
