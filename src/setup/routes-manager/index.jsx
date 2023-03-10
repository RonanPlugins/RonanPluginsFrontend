import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import UserContext from '../app-context-manager/UserContext';
import LogOut from '../../functions/Logout';
import Account from '../../pages/account-manager/Account';
import Connections from '../../pages/account-manager/Connections';
import Payments from '../../pages/account-manager/Payments';
import Login from '../../pages/sign-in';
import SignUp from '../../pages/sign-up';
import DashboardDefault from '../../pages/dashboard/DashboardDefault';
import Default from '../../pages/main/Default';
import Home from '../../pages/main/Home';
import Plugins from '../../pages/main/Plugins';
import PrivateRoutes from './PrivateRoutes';
import Plugin from '../../pages/Plugins/Plugin';
import EditPluginPage from '../../pages/settings/admin/EditPluginPage';
const data = require('../../pages/main/exampleDatabase.json');

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
          path={'/plugin/' + d.ProductName+"/edit"}
          element={<EditPluginPage pluginData={d} />}
          key={d.id+".edit"}
          />
          </>
        );
       })}
      </Route>

      <Route path="*" element={<>Page not found</>} />
      {/* END 1Default Routes */}
     </Route>
    </Routes>
   </Router>
  </UserContext.Provider>
 );
}

export default App;
