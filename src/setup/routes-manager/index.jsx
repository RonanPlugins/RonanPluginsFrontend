import React, { useState, useEffect } from 'react';
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
import PageNotFound from '../../pages/errors/PageNotFound';
import About from '../../pages/main/About/About';
import Tiers from '../../pages/main/Tiers/Tiers';
import AdminRoutes from './AdminRoutes';
import UserProfileDefault from '../../pages/UserDashboard/UserProfileDefault';
import AdminDashboardDefault from '../../pages/AdminDashboard/AdminDashboardDefault';
import AdminUsers from '../../pages/AdminDashboard/pages/AdminUsers';
import AdminSettings from '../../pages/AdminDashboard/pages/AdminSettings';
import AdminHome from '../../pages/AdminDashboard/pages/AdminHome';
import UserHome from '../../pages/UserDashboard/pages/UserHome';
import UserDownloads from '../../pages/UserDashboard/pages/UserDownloads';
import UserLicense from '../../pages/UserDashboard/pages/UserLicense';
import UserSubscription from '../../pages/UserDashboard/pages/UserSubscription';
import UserSettings from '../../pages/UserDashboard/pages/UserSettings';
import AdminPlugins from '../../pages/AdminDashboard/pages/AdminPlugins';
import AdminPages from '../../pages/AdminDashboard/pages/AdminPages';
import Links from '../../libs/Links';
import api from '../../api';
import MarkdownPage from '../../common/MarkdownPages/MarkdownPage';
import Loading from '../../util/Loading';
const data = require('../../mockupData/exampleDatabase.json');

function ExternalRedirect({ url }) {
  useEffect(() => {
    window.location.href = url;
  }, [url]);

  // Return null to prevent rendering any content
  return null;
}



function App() {
  const [user, setUser] = useState(null);
  const [pages, setPages] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchData = async () => {
      const response = await api.getPages().catch((err) => {
      setLoading(false)
      });
      setPages(response.data);
      setLoading(false)
    };

    fetchData();
  }, []);


  return (
    <UserContext.Provider value={{ user, setUser,pages,setPages}}>
        <Router>
          <Routes>
            {
              Links.Redirects.map((redirect) => {
                return (
                  <Route path={"/" + redirect.slug} element={<ExternalRedirect url={redirect.url} />} />
                )
              })
            }

            <Route element={<Default loading={ loading} />}>

              {/* Markdown Pages */}
              {pages?.map((page) => (
                <Route key={page.page_id} path={page.route} exact element={<MarkdownPage content={page.markdown} />} />
              ))}




              {/* Default Routes */}
              <Route path="/" exact element={<Home />} />
              <Route path="/plugins" element={<Plugins />} />
              {/* <Route path="/about" element={<About />} /> */}

              {/* Authentication Routes */}
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<SignUp />} />
              <Route path="/logout" element={<LogOut />} />
              {/* END Authentication Routes */}

              {/* Private Routes */}
              <Route element={<PrivateRoutes />}>
                <Route element={<DashboardDefault />}>
                  <Route path='/plans' element={<Tiers />} />
                  <Route path="/account" element={<Account />} />
                  <Route path="/account/payments" element={<Payments />} />
                  <Route path="/account/connections" element={<Connections />} />
                </Route>
                {/* <Route element={<AdminRoutes neededPermissions={"8"} />}> */}
                  {data.map((d) => {
                    return (
                      <>
                        <Route
                          path={'/plugin/' + d.ProductName + '/edit'}
                          element={<EditPluginPage pluginData={d} />}
                          key={d.id}
                        />
                      </>
                    );
                  })}
                </Route>
              {/* </Route> */}

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
                    </>
                  );
                })}
              </Route>

              <Route path="*" element={<PageNotFound />} />
              {/* END Default Routes */}
            </Route>
            <Route element={<PrivateRoutes />}>

              <Route element={<UserProfileDefault />}>
                <Route path="/user" element={<UserHome />} />
                <Route path="/user/downloads" element={<UserDownloads />} />
                <Route path="/user/license" element={<UserLicense />} />
                <Route path="/user/subscription" element={<UserSubscription />} />
                <Route path="/user/settings" element={<UserSettings />} />
            </Route>
            {/* TODO: Actually use correct permissions */}
              <Route element={<AdminDashboardDefault  />}>
                <Route element={<AdminRoutes neededPermissions={8388608} />}>
                  <Route path="/admin" element={<AdminHome />} />
                </Route>
                <Route element={<AdminRoutes neededPermissions={8388608} />}>
                  <Route path="/admin/plugins" element={<AdminPlugins />} />
                </Route>
                <Route element={<AdminRoutes neededPermissions={8388608} />}>
                  <Route path="/admin/users" element={<AdminUsers />} />
                </Route>
                <Route element={<AdminRoutes neededPermissions={8388608} />}>
                  <Route path="/admin/pages" element={<AdminPages />} />
                </Route>
                <Route element={<AdminRoutes neededPermissions={8388608} />}>
                  <Route path="/admin/settings" element={<AdminSettings />} />
                </Route>
               
              </Route>

            </Route>
          </Routes>
        </Router>
    </UserContext.Provider>
  );
}

export default App;
