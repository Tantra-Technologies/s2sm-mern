// frontend/layouts/AdminLayout.js

import React from "react";
import SideBar from "../components/Sidebar";
import Header from "../components/Header";

const Layout = ({ children, pageTitle }) => {
  return (
    <div className="flex w-full h-screen bg-[#f5f7fa]">
      <div className="lg:block lg:w-64">
        <SideBar/>
      </div>
      <div className="flex-1 overflow-auto">
        <Header title={pageTitle}/>
        <div className="p-4">
          {children}
        </div>
      </div>
    </div>
  );
};

export default Layout;
