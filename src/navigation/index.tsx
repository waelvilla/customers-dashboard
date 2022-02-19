import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import AllCustomersScreen from 'src/screens/AllCustomersScreen';
import CustomerScreen from 'src/screens/CustomerScreen/Customer.screen';
import HomeScreen from 'src/screens/HomeScreen';
import LoginScreen from 'src/screens/LoginScreen';
import DashboardScreenTemplate from 'src/templates/DashboardScreen';

function RootNavigator() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomeScreen />} />
        <Route path="/login" element={<LoginScreen />} />
        <Route path="customers">
          <Route path=":customerId" element={<DashboardScreenTemplate Screen={CustomerScreen} />} />
          <Route index element={<DashboardScreenTemplate Screen={AllCustomersScreen} />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default RootNavigator;
