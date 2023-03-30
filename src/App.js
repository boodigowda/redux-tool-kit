import React from 'react';
import { Routes,Route } from 'react-router-dom';
import Counter from './components/Counter';
import CounterRedux from './components/CounterRedux';
import Employees from './components/Employees';
import EmployeesRedux from './components/EmployeesRedux';
import Home from './components/Home';
import Navbar from './components/Navbar';
import UserList from './components/UserList';

function App() {
  return (
    <React.Fragment>
      <Navbar/>
      <Routes>
        <Route path={'/'} element={<Home/>}/>
        {/* <Route path={'/employees'} element={<Employees/>}/> */}
        <Route path={'/employees'} element={<EmployeesRedux/>}/>
        {/* <Route path={'/counter'} element={<Counter/>}/> */}
        <Route path={'/counter'} element={<CounterRedux/>}/>
        <Route path={'/users'} element={<UserList/>}/>
      </Routes>
    </React.Fragment>
  );
}

export default App;
