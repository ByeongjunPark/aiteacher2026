import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import DashboardPage from './pages/DashboardPage';

function App() {
  const [userInfo, setUserInfo] = useState(null);

  return (
    <Router>
      <Routes>
        <Route 
          path="/" 
          element={<LandingPage onStart={setUserInfo} />} 
        />
        <Route 
          path="/dashboard" 
          element={
            userInfo ? (
              <DashboardPage userInfo={userInfo} />
            ) : (
              <Navigate to="/" replace />
            )
          } 
        />
      </Routes>
    </Router>
  );
}

export default App;
