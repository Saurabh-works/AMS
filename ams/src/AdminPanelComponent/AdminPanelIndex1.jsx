import React from 'react'
import AttendanceComponent from './AttendanceComponent';
import UpdateNewStudentData from './UpdateNewStudentData';
import UpdateBatchStudentData from './UpdateBatchStudentData';   //Shivanjali Chnages
import StudentDataTable from './StudentDataTable';


function AdminPanelIndex() {
  return (
    <div className='flex bg-blue-600'>
      <span className='p-5 text-[20px] text-white font-bold'>Teacher Panel</span>
      <nav className='flex list-none ml-auto gap-4 text-white p-5 text-[20px]'>
        <li>Dashboard</li>
        <li>Batches</li>
        <li>Attendance</li>
      </nav>
      <div>AdminPanel_index</div> <hr/>
      <AttendanceComponent></AttendanceComponent> <hr/>
      <UpdateNewStudentData></UpdateNewStudentData> <hr/>
      <UpdateBatchStudentData></UpdateBatchStudentData><hr/>   {/*Shivanjali Changes */}
      <StudentDataTable></StudentDataTable>
    </div>
  )
}
export default AdminPanelIndex;
