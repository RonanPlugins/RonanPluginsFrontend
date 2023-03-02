import React, { useState,useContext,useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import api from './api';
import UserContext from './context/UserContext';
import LogOut from './functions/Logout';
import Account from './pages/Account/Account';
import Payments from './pages/Account/Payments';
import Login from './pages/Auth/Login';
import SignUp from './pages/Auth/SignUp';
import Default from './pages/Default';
import Home from './pages/Home';
import Loading from './pages/Loading';
import Plugins from './pages/Plugins';
import { ProtectedRoutes } from './ProtectedRoutes';
// import { ProtectedRoutes } from './ProtectedRoutes'

function App() {
  const [user , setUser] = useState(null)
 return (
  <UserContext.Provider value={{ user, setUser }}>
   <Router>
    <Routes>
     <Route element={<Default />}>
      <Route path="/" exact element={<Home />} />
      <Route path="/plugins" element={<Plugins />} />
     <Route path="/loading" element={<Loading />} />
      
     <Route path="/login" element={<Login />} />
     <Route path="/signup" element={<SignUp />} />
     <Route path="/logout" element={<LogOut />} />
     </Route>
     <Route element={<ProtectedRoutes />}>
       <Route path="/account" element={<Account />} />
       <Route path="/account/payments" element={<Payments />} />
     </Route>
    </Routes>
   </Router>
  </UserContext.Provider>
 );
}

export default App;
