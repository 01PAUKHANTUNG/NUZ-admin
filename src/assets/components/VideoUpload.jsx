import React, { useContext, useEffect, useState } from 'react'
import { AdminNuZContext } from '../context/NuZContext';
import axios from 'axios';
import {backendUrl} from '../../../config.js'
import { toast } from 'react-toastify';


const VideoUpload = () => {

  const [searchTitle, setSearchTitle] = useState('');
  const {lessons, getLessons} = useContext(AdminNuZContext)


  const [course, setCourse] = useState('');
  const [batch, setBatch] = useState('');
  const [semester, setSemester] = useState('');
  const [module, setModule] = useState('');
  const [lesson, setLesson] = useState('');
  const [videoTitle, setVideoTitle] = useState('');
  const [videoUrl, setVideoUrl] = useState('');

  const filterVideo = lessons.filter((item) =>
  item.title.toLowerCase().includes(searchTitle.toLowerCase())
    ).reverse();

  const submitHandle = async (e) => {
        e.preventDefault();

    if(course === "" || batch === "" || semester === "" || module === "" || lesson === "" || videoTitle === "" || videoUrl === ""){
       return toast.error("Please fill and select all the fields");

    }else{
       let formData = new FormData();
          formData.append('course', course);
          formData.append('batch', Number(batch));
          formData.append('semester', Number(semester));
          formData.append('module', module);
          formData.append('lesson', Number((lesson)));
          formData.append('title', videoTitle);
          formData.append('videoUrl', videoUrl);

       try{
         const videoData = {
          course,
          batch,
          semester,
          module,
          lesson,
          title: videoTitle,
          videoUrl
         }

       let res = await axios.post(backendUrl +"/api/video/upload", videoData);

        if(res.data.success){
          toast.success(res.data.message);
          setCourse('');
          setBatch('');
          setSemester('');
          setModule('');
          setLesson('');
          setVideoTitle('');
          setVideoUrl('');
        }

        await getLessons();

        }
        catch(err){
          console.log(err)
        }
      }
    }
  
    const deleteLesson = async(_id)=>{
     
      let response = await axios.post(backendUrl + '/api/lessons/delete',{_id})
     if(response.data.success){
        toast.info(response.data.message);
        
        }
        await getLessons();
     }

     useEffect(()=>{
      getLessons();
     },[])

  return (
    
    <div>
     
      <div className='m-4 p-2'>
        <p className='text-black font-bold text-3xl'> Upload Lecture Video</p>
      </div>
     
      <div className='flex gap-5 '>
         <form 
          onSubmit={submitHandle}
          className='bg-blue-900 rounded-sm p-4 w-[50%] max-h-max'>
            <div className='flex flex-col gap-2 mt-2'>
              <p className='text-white'>COURSE PROGRAM</p>
              <select className='border-2 border-gray-400 rounded-sm p-2 bg-white w-full' value={course} onChange={(e) => setCourse(e.target.value)}>
                <option value=""> Select Course</option>
                 <option value="MPA">Master of Public Affairs</option>
                 <option value="LLB"> Bachelor of Law</option>
                 <option value="DSSS">Diploma in Social Science Studies</option>
              </select>
             </div>

              <div className='flex gap-2 mt-2'>
                <div className='flex flex-col gap-2'>
                   <p className='text-white'>BATCH</p>
                   <input type="number" value={batch} onChange={(e) => setBatch(e.target.value)} className='border-2 border-gray-400 rounded-sm p-2 bg-white' min={1} required/>
                </div>
            
                <div className='flex flex-col gap-2 w-full '>
                  <p className='text-white'>SEMESTER</p>
                  <select value={semester} onChange={(e) => setSemester(e.target.value)} className='border-2 border-gray-400 rounded-sm p-2 bg-white w-full'>
                    <option value=""> Select Semester </option>
                    <option value="1">Semester 1</option>
                    <option value="2"> Semester 2</option>
                    <option value="3"> Semester 3</option>
                    <option value="4"> Semester 4</option>
                  </select>
                </div>
              </div>


              <div className='flex flex-col gap-2 mt-2'>
                 <p className='text-white'>MODULE NAME</p>
                 <input type="text" value={module} onChange={(e) => setModule(e.target.value)} className='border-2 border-gray-400 rounded-sm p-2 bg-white ' placeholder='Environmental Science' required/>
              </div>

              <div className='flex gap-2 w-full mt-2'>
                <div className='flex flex-col gap-2'>
                  <p className='text-white'>LESSON</p>
                  <input type="number" value={lesson} onChange={(e) => setLesson(e.target.value)} className='border-2 border-gray-400 rounded-sm p-2 bg-white' min={1} required/>
                </div>

                <div className='flex flex-col gap-2 w-full'>
                  <p className='text-white'>VIDEO TITLE</p>
                  <input type="text" value={videoTitle} onChange={(e) => setVideoTitle(e.target.value)} className='border-2 border-gray-400 rounded-sm p-2 bg-white w-full' placeholder='Natural resources' required/>
                </div>
              </div>

              <div className='flex flex-col gap-2 border-dotted border-red-300 rounded-sm mt-2'>
                  <p className='text-white'>Video URL</p>
                  <input type='text' value={videoUrl} onChange={(e) => setVideoUrl(e.target.value)} className='bg-white border-2 border-gray-500 rounded-sm p-2' placeholder='Paste video URL'/>       
              </div>

              <button type='submit'  className='text-center items-center p-3 w-full text-white bg-green-600 text-xl rounded-sm cursor-pointer hover:bg-green-800 hover:shadow-2xs mt-4'> UPLOAD VIDEO</button>
         </form>

          <div className='flex flex-col gap-6 bg-gray-300 p-2 rounded-sm w-[50%]'>
              <div>
                 <input 
                 type='text' 
                 placeholder='Search by Video Title' 
                 className='py-2 px-4 rounded-sm bg-white border-2 border-gray-500'
                 onChange={(e)=>setSearchTitle(e.target.value)}
                 />
              </div>

                <div className='grid grid-cols-[1fr_1fr_1fr_2fr_1fr_2fr_1fr] items-center text-center'>
                    <p className='font-semibold'>Course</p>
                    <p className='font-semibold'>Batch</p>
                    <p className='font-semibold'>Semester</p>
                    <p className='font-semibold'>Module</p>
                    <p className='font-semibold'>Lesson</p>
                    <p className='font-semibold'>Title</p>
                    <p className='font-semibold'>Delete</p>
                </div>
              <div className='h-[calc(70vh-100px)] overflow-y-auto scrollbar-thumb-amber-50'>
            
                  {
                  filterVideo.map((item, index)=>{
                    return(  
                      <div key={index} className='grid grid-cols-[1fr_1fr_1fr_2fr_1fr_2fr_1fr] items-center text-center py-4 bg-white border-2 border-gray-400 rounded-sm my-3'>  
                        <p>{item.course}</p>
                        <p>{item.batch}</p>
                        <p>{item.semester}</p>
                        <p>{item.module}</p>
                        <p>{item.lesson}</p>
                        <p>{item.title} </p>     
                        <p onClick={()=>deleteLesson(item._id)} className='hover:text-red-700 hover:cursor-pointer hover:text-xl active:text-red-900 underline-offset-1'>Delete</p>
                      </div>
                    
                    )
                  })
                }
 
              </div>
         </div>
      </div>
    
    </div>
  )
}

export default VideoUpload