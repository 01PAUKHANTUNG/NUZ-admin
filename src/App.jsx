import React from "react";
import Navbar from "./assets/components/Navbar";
import Sidenav from "./assets/components/Sidenav";
import { Route, Routes } from "react-router";
import VideoUpload from "./assets/components/VideoUpload";
import Assignment from "./assets/components/Assignment";
import StudentMag from "./assets/components/StudentMag";

const App = () => {
  return (
    <div className="min-h-screen">
      
      {/* Side Navigation */}
      <aside className="fixed left-0 top-0 h-screen border-r-2 00 w-64">
        <Sidenav />
      </aside>

      {/* Main Area */}
      <main className="ml-64">
        
        {/* Navbar */}
        <header className="sticky top-0 z-10 bg-white">
          <Navbar />
        </header>

        {/* Page Content */}
        <section className="p-6">
           <Routes>
               <Route path="/video-upload" element={<VideoUpload />} />
               <Route path="/student-mag" element={<StudentMag />} />
               <Route path="/assignment" element={<Assignment />} />
           </Routes>
        </section>

      </main>

    </div>
  );
};

export default App;