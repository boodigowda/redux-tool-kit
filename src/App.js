import React, { useEffect } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import Counter from './components/Counter';
import CounterRedux from './components/CounterRedux';
import Employees from './components/Employees';
import EmployeesRedux from './components/EmployeesRedux';
import Home from './components/Home';
import Navbar from './components/Navbar';
import UserList from './components/UserList';
import UserListRedux from './components/UserListRedux';

function App() {
  // ONCE WE RELOAD THE PAGE, PAGE WILL NAVIGATE TO THE HOME PAGE
  // const navigate = useNavigate();
  // useEffect(() => {
  //   const handleReload = (event) => {
  //     navigate('/')
  //   };
  //   window.addEventListener("load", handleReload);
  //   return () => {
  //     window.removeEventListener("load", handleReload);
  //   };
  // }, [navigate]);

  return (
    <React.Fragment>
      <Navbar />
      <Routes>
        <Route path={'/'} element={<Home />} />
        {/* <Route path={'/employees'} element={<Employees/>}/> */}
        <Route path={'/employees'} element={<EmployeesRedux />} />
        {/* <Route path={'/counter'} element={<Counter/>}/> */}
        <Route path={'/counter'} element={<CounterRedux />} />
        {/* <Route path={'/users'} element={<UserList/>}/> */}
        <Route path={'/users'} element={<UserListRedux />} />
      </Routes>
    </React.Fragment>
  );
}

export default App;
