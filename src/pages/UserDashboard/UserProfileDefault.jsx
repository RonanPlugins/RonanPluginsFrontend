import React from 'react'
import { Outlet } from 'react-router-dom';
import DashboardSidebar from './DashboardSidebar';


const UserProfileDefault = () => {
  return (
    <div>
      <DashboardSidebar>
      <Outlet/>
      </DashboardSidebar>
    </div>
  );
};

export default UserProfileDefault