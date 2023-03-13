import React from 'react'
import ReactDOM from 'react-dom/client'
import App from '../src/setup/routes-manager/index.jsx'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ChakraProvider } from '@chakra-ui/react'

ReactDOM.createRoot(document.getElementById('root')).render(
  <ChakraProvider>
    <ToastContainer />
    <App />
  </ChakraProvider>
)
