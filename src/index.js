import React from 'react'
import ReactDOM from 'react-dom/client'
import App from '../src/setup/routes-manager/index.jsx'
import "./index.css"
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ChakraProvider } from '@chakra-ui/react'
import { ProSidebarProvider } from 'react-pro-sidebar';


ReactDOM.createRoot(document.getElementById('root')).render(
  <ChakraProvider>
    <ProSidebarProvider>
      <ToastContainer />
      <App />
    </ProSidebarProvider>
  </ChakraProvider>
)
