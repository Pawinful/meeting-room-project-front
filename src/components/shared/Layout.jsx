import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import Header from "./Header";

function Layout() {
  return (
    <div className="flex min-h-screen">
      <Navbar />
      <div className="flex flex-col flex-1 min-h-screen">
        <Header />
        <div className="flex-1">{<Outlet />}</div>
      </div>
    </div>
  );
}

export default Layout;
