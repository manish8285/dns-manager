import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import LoginPage from './pages/login/LoginPage.jsx';
import DNSRecordsPage from './pages/dns-record/DNSRecordsPage.jsx';
import DashboardPage from './pages/domain/DashboardPage.jsx';
import { DnsContext} from './context-api/DnsContext.jsx';
import { useContext, useEffect, useState } from 'react';

function App() {
  // using sessionStorage 

 const { isLoggedLogin}=useContext(DnsContext);

  useEffect(() =>
  {
    console.log(isLoggedLogin)
    sessionStorage.setItem('isLoggedLogin', JSON.stringify(isLoggedLogin));
  }, [isLoggedLogin]);

  const isLoggedIn = () => {
    return isLoggedLogin;
  };

  return (
    
      <BrowserRouter>
        <Routes>
          <Route path="/" element={isLoggedIn() ? <DashboardPage /> : <Navigate to="/login" />} />
          <Route path="/login" element={<LoginPage />} />
          {/* Protected routes */}
          <Route path="/dashboard" element={isLoggedIn() ? <DashboardPage /> : <Navigate to="/login" />}/>
          <Route path="/dns-records/:domainName" element={isLoggedIn() ? <DNSRecordsPage /> : <Navigate to="/login"/>}/>
        </Routes>
        <Toaster position="top-right" />
      </BrowserRouter>
  );
}

export default App;
