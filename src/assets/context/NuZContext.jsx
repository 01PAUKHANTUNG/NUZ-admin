import React, { createContext, useEffect, useState } from 'react'
import axios from 'axios';
import { backendUrl } from '../../../config.js';


export const AdminNuZContext = createContext();


const AdminNuZProvider =  (props) => {

const [lessons, setLessons] = useState([]);
const [allStudent, setAllStudent] = useState([]);

const getLessons = async ()=>{
  let response = await axios.get(backendUrl + '/api/lessons/getAllLessons');
    if(response.data.success){
    setLessons(response.data.lesson)
  }
}

const getStudentAccess = async ()=>{
  let response = await axios.get(backendUrl + '/api/student/get');
    if(response.data.success){
    setAllStudent(response.data.student)
  }
}


useEffect(()=>{
  getLessons();
  getStudentAccess();
},[])

const value = {backendUrl, lessons,  getLessons, allStudent, getStudentAccess}   

  return (
    <AdminNuZContext.Provider value={value} >
      {props.children}
    </AdminNuZContext.Provider>
  )
}

export default AdminNuZProvider
