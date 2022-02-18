import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import CustomersScreen from 'src/screens/CustomersScreen';
import HomeScreen from 'src/screens/HomeScreen';
import LoginScreen from 'src/screens/LoginScreen';
import DashboardScreenTemplate from 'src/templates/DashboardScreen';

function RootNavigator() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomeScreen />} />
        <Route path="/login" element={<LoginScreen />} />
        <Route path="/customers" element={<DashboardScreenTemplate Screen={CustomersScreen} />} />
      </Routes>
    </BrowserRouter>
  );
}

export default RootNavigator;
