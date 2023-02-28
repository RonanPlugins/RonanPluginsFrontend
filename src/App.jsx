import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import UserContext from './context/UserContext';
import LogOut from './functions/Logout';
import Login from './pages/Auth/Login';
import SignUp from './pages/Auth/SignUp';
import Default from './pages/Default';
import Home from './pages/Home';
import Plugins from './pages/Plugins';
// import { ProtectedRoutes } from './ProtectedRoutes'

function App() {
 const [user, setUser] = useState(null);
 return (
  <UserContext.Provider value={{ user, setUser }}>
   <Router>
    <Routes>
     <Route element={<Default />}>
      <Route path="/" exact element={<Home />} />
      <Route path="/plugins" element={<Plugins />} />
     </Route>
     <Route path="/auth/login" element={<Login />} />
     <Route path="/auth/signup" element={<SignUp />} />
     <Route path="/logout" element={<LogOut />} />
     {/* <Route element={<ProtectedRoutes />}>
       <Route path="/plugin/download" element={<Home />} />
     </Route> */}
    </Routes>
   </Router>
  </UserContext.Provider>
 );
}

export default App;
