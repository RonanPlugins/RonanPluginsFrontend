import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import UserContext from '../app-context-manager/UserContext';
import LogOut from '../../functions/Logout';
import Account from '../../pages/account-manager/Account';
import Connections from '../../pages/account-manager/Connections';
import Payments from '../../pages/account-manager/Payments';
import Login from '../../pages/auth/signin';
import SignUp from '../../pages/auth/signup';
import DashboardDefault from '../../pages/dashboard/DashboardDefault';
import Default from '../../pages/main/Default/Default';
import Home from '../../pages/main/Home/Home';
import Plugins from '../../pages/main/Plugins/Plugins';
import PrivateRoutes from './PrivateRoutes';
import Plugin from '../../pages/Plugins/Plugin';
import EditPluginPage from '../../pages/settings/admin/EditPluginPage';
import Admin from '../../pages/admin/Admin';
import Users from '../../pages/admin/users/Users';
import AdminPlugins from '../../pages/admin/plugins/AdminPlugins';
import Settings from '../../pages/admin/settings/Settings';
import AdminDefault from '../../pages/admin/Default/AdminDefault';
import PageNotFound from '../../pages/errors/PageNotFound';
import AboutUs from '../../pages/main/AboutUs/AboutUs';
const data = require('../../mockupData/exampleDatabase.json');

function App() {
 const [user, setUser] = useState(null);
 return (
  <UserContext.Provider value={{ user, setUser }}>
   <Router>
    <Routes>
     <Route element={<Default />}>
      {/* Default Routes */}
      <Route path="/" exact element={<Home />} />
      <Route path="/plugins" element={<Plugins />} />
      <Route path="/about-us" element={<AboutUs />} />

      {/* Authentication Routes */}
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/logout" element={<LogOut />} />
      {/* END Authentication Routes */}

      {/* Private Routes */}
      <Route element={<PrivateRoutes />}>
       <Route element={<DashboardDefault />}>
        <Route path="/account" element={<Account />} />
        <Route path="/account/payments" element={<Payments />} />
        <Route path="/account/connections" element={<Connections />} />
       </Route>
      </Route>
      {/* END Private Routes */}
      {/* Private Routes */}
      <Route element={<AdminDefault/>}>
        <Route path="/admin" element={<Admin/>} />
        <Route path="/admin/users" element={<Users />} />
        <Route path="/admin/plugins" element={<AdminPlugins />} />
        <Route path="/admin/settings" element={<Settings />} />
      </Route>
      {/* END Private Routes */}

      {/* Plugin Routes */}
      <Route>
       {data.map((d) => {
        return (
         <>
          <Route
           path={'/plugin/' + d.ProductName}
           element={<Plugin pluginData={d} content={d.ProductMarkdown} />}
           key={d.id}
          />
          <Route
           path={'/plugin/' + d.ProductName + '/edit'}
           element={<EditPluginPage pluginData={d} />}
           key={d.id + '.edit'}
          />
         </>
        );
       })}
      </Route>

      <Route path="*" element={<PageNotFound/>} />
      {/* END 1Default Routes */}
     </Route>
    </Routes>
   </Router>
  </UserContext.Provider>
 );
}

export default App;
