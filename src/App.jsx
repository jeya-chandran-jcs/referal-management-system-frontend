import { useState } from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import ForgetPassword from './routes/userRoutes/ForgetPassword'
import ResetPassword from './routes/userRoutes/ResetPassword'
import Login from './routes/userRoutes/Login'
import Register from './routes/userRoutes/Register'
import Home from './pages/Home'
import Metrics from './pages/Metrics'
import Referal from './pages/Referal'
function App() {
  

  return (
  <div>
    <Router>
      <Routes>
        <Route path="/user/login" element={<Login />} />
        <Route path="/user/register" element={<Register />} />
        <Route path="/user/forget-password" element={<ForgetPassword />} />
        <Route path="/user/reset-password/:token" element={<ResetPassword />} />
        <Route path="/" element={<Home />} />
        <Route path="/metrics-dashboard" element={<Metrics />} />
        <Route path="/referal" element={<Referal />} />
      </Routes>
    </Router>
  </div>  
  )
}

export default App
