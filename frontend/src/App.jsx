import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import MainRoute from './route/Route';


function App() {
  return (
    <BrowserRouter>
      <MainRoute />
    </BrowserRouter>
  );
}

export default App;
