import React, { useContext, useState } from 'react'
import plus from '../../assets/plus.png'
import { AdminNuZContext } from '../context/NuZContext';
import axios from 'axios';
import { toast } from 'react-toastify';

const StudentMag = () => {
  const [studeneAdd, setAddStudent] = useState(false);
  const {allStudent, backendUrl, getStudentAccess} = useContext(AdminNuZContext);

  const filterMPAStudent = allStudent.filter((student)=> student.studentID.slice(2, 5) === "MPA")
  const filterLLBStudent = allStudent.filter((student)=> student.studentID.slice(2, 5) === "LLB")
  const filterCSSSStudent = allStudent.filter((student)=> student.studentID.slice(2, 6) === "DSSS")

  const [studentID, setStudentID] = useState('');
  const [password, setPassword] = useState('');

  const onSubmitHandle = async (e)=>{
    e.preventDefault();

     const response = await axios.post(backendUrl + '/api/student/add',{studentID, password});
     if(response.data.success){
      toast.info(response.data.message);
      setStudentID('');
      setPassword('');
     }
     await getStudentAccess();
  }

  const deleteStudent = async(_id)=>{
     
    let response = await axios.post(backendUrl + '/api/student/delete',{_id})
     if(response.data.success){
        toast.info(response.data.message); 
        }
         await getStudentAccess();
     }

  return (
    <div>
      <div>
        <p className='text-2xl font-bold py-4 mb-4'> Student Access Management </p>
        <span onClick={()=>setAddStudent(!studeneAdd)} className='flex w-[230px] items-center justify-center border-2 border-blue-900  gap-2 cursor-pointer py-2 px-4 rounded-2xl relative hover:border-3 active:border-amber-400 '>
          <img src={plus} className='w-[20px]' alt='addIcon' />
          <button onClick={()=>setAddStudent(!studeneAdd)} className='cursor-pointer font-semibold '> Add Student</button>
        </span>
      </div>

        {
          studeneAdd ?  
          <div className='flex  mx-auto items-center mt-3'>
             <div className='w-[500px] bg-amber-100 rounded-sm mx-auto p-4'> 
               <div className='flex justify-between '>
                  <p className='text-2xl items-center py-4'> Student Authorization</p>
                  <p onClick={()=>setAddStudent(!studeneAdd)} className='text-2xl hover:text-red-500 w-3 cursor-pointer '> x </p>
                </div>
                <form onSubmit={onSubmitHandle}>
                   <div className='flex flex-col gap-2 '>
                      <lable>StudentID</lable>
                       <input onChange={(e)=>setStudentID(e.target.value)} value={studentID} type='text' className='bg-white border-2 border-gray-400 p-2 rounded-sm' placeholder='25MPA009' required/>
                   </div>
                   <div className='flex flex-col gap-2 '>
                      <label>Password</label>
                      <input onChange={(e)=>setPassword(e.target.value)} value={password} type='text' className='bg-white border-2 border-gray-400 p-2 rounded-sm' placeholder='Create password for your student' required/>
                   </div>
                   <button type='submit' className='bg-blue-800 cursor-pointer active:bg-green-800 mt-6 hover:bg-blue-900 text-white rounded-sm py-2 px-4 text-center w-full'> Give Access </button>
                </form>
            </div>
                
          </div>
         :

        <div className='mt-6'>
        <p className='text-green-500 font-bold italic'> Authorized Student Access List</p>
        <div className='flex flex-col gap-4'> 
           <div className='flex gap-35'>
            <div className='flex flex-col gap-3 mt-4 '>
             <p className='text-2xl font-semibold mb-8'> Master of Public Affaris</p>
              <div className='flex '>      
                <p className='w-[150px] text-xl font-semibold'> StudentID</p>
                <p className='w-[100px] text-xl font-semibold'>Password</p>
                <p className='w-[40px] text-xl font-semibold'> Remove</p>
              </div>
              <hr className=''/>
              {
                  filterMPAStudent.map((item, index)=>{
                    return(
                      <div key={index} className='flex '>
                        
                          <p className='w-[150px]'>{item.studentID}</p>
                          <p className='w-[100px]'>{item.password}</p>
                          <p onClick={()=>deleteStudent(item._id)} className='w-[40px] cursor-pointer text-red-400 font-bold hover:text-red-500 active:text-red-600 rounded-sm'> Remove </p>
                      </div>
                    )
                  })
                }
            </div>

            <div className='flex flex-col gap-3 mt-4'>
               <p className='text-2xl font-semibold mb-8'>Bachelor of Law</p>

              <div className='flex '>
                
                <p className='w-[150px] text-xl font-semibold'> StudentID</p>
                <p className='w-[100px] text-xl font-semibold'>Password</p>
                <p className='w-[40px] text-xl font-semibold'> Remove</p>
              </div>
              <hr className=''/>
              {
                  filterLLBStudent.map((item, index)=>{
                      return(
                        <div key={index} className='flex '>
                            <p>{index +1 }</p>
                            <p className='w-[150px]'>{item.studentID}</p>
                            <p className='w-[100px]'>{item.password}</p>
                            <p onClick={()=>deleteStudent(item._id)} className='w-[40px] cursor-pointer text-red-400 font-bold hover:text-red-500 active:text-red-600 rounded-sm'> Remove </p>
                      </div>
                    )
                  })
                }
            </div>

             <div className='flex flex-col gap-3 mt-4'>
               <p className='text-2xl font-semibold '>Diploma in Social Science Studies</p>

              <div className='flex '>
                
                <p className='w-[150px] text-xl font-semibold'> StudentID</p>
                <p className='w-[100px] text-xl font-semibold'>Password</p>
                <p className='w-[40px] text-xl font-semibold '> Remove</p>
              </div>
              <hr className=''/>
               {
                 filterCSSSStudent.map((item, index)=>{
                  return(
                    <div key={index} className='flex '>
                        <p>{index +1 }</p>
                        <p className='w-[150px]'>{item.studentID}</p>
                        <p className='w-[100px]'>{item.password}</p>
                        <p onClick={()=>deleteStudent(item._id)} className='w-[40px] cursor-pointer text-red-400 font-bold hover:text-red-500 active:text-red-600 rounded-sm'> Remove </p>
                    </div>
                  )
                })
                }
             </div>
            </div>

          </div>
        </div>
        }
    </div>
  )
}

export default StudentMag