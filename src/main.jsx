import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import {BrowserRouter} from 'react-router-dom'
import {Toaster} from 'react-hot-toast'
import axios from 'axios'
import { AuthProvider } from './components/context/Authcontext.jsx'
// axios.defaults.baseURL="http://localhost:8000/api/v1";
axios.defaults.baseURL="https://edutech-backend-r2xf.onrender.com/api/v1";
axios.defaults.withCredentials=true;

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthProvider>
    <BrowserRouter>
    <Toaster position="top-right" toastOptions={{style:{fontSize:'15px'}}}/>
    <App />
    </BrowserRouter>
    </AuthProvider>
  </React.StrictMode>,
)
