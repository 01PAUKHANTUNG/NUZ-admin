import React, { createContext } from 'react'
import { lessons } from '../Data/VideoData';
import { allUsers } from '../Data/studentAccData';

export const AdminNuZContext = createContext();

const AdminNuZProvider = (props) => {

  const value = {lessons, allUsers}

  return (
    <AdminNuZContext.Provider value={value} >
      {props.children}
    </AdminNuZContext.Provider>
  )
}

export default AdminNuZProvider
