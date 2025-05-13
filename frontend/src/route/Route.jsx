import React from 'react';
import { Routes, Route } from 'react-router-dom';
import LoginPage from '../userDemo/LoginPage';
import User from '../userDemo/User';

function MainRoute() {
  return (
    <Routes>
      <Route path="/" element={<LoginPage />} />
      <Route path="/user" element={<User />} />
    </Routes>
  );
}

export default MainRoute;
