import React from "react";

import { Outlet } from 'react-router-dom'


function Main() {
  return (
    <div className="h-full w-full">
      <div className="h-[80px] pt-2 pl-4 w-full bg-white">
      </div>
      <Outlet />
    </div>
  );
}

export default Main;
