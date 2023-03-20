import React from 'react'
import { Outlet } from 'react-router-dom';
import AdminDashboardSidebar from './AdminDashboardSidebar';


const AdminDashboardDefault = () => {
  return (
    <div>
      <AdminDashboardSidebar>
      <Outlet/>
      </AdminDashboardSidebar>
    </div>
  );
};

export default AdminDashboardDefault