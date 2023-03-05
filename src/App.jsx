import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import UserContext from './context/UserContext';
import LogOut from './functions/Logout';
import Account from './pages/Account/Account';
import Connections from './pages/Account/Connections';
import Payments from './pages/Account/Payments';
import Login from './pages/Auth/Login';
import SignUp from './pages/Auth/SignUp';
import Default from './pages/Default';
import Home from './pages/Home';
import Plugins from './pages/Plugins';
import PrivateRoutes from './PrivateRoutes';

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
      {/* Private Routes */}
      <Route element={<PrivateRoutes />}>
       <Route path="/account" element={<Account />} />
       <Route path="/account/payments" element={<Payments />} />
       <Route path="/account/connections" element={<Connections />} />
      </Route>
     </Route>
    </Routes>
   </Router>
  </UserContext.Provider>
 );
}

export default App;
