import React from 'react';
import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import MainLayout from './MainLayout'
function App() {
  console.log('App Screen');
  return (
    <React.Fragment>
      <MainLayout />
    </React.Fragment>
  );
}

export default App;
