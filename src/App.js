import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'; 

import Home from './views/Home.js'
import Employee from './views/Employee.js'
import Department from './views/Department.js';
import VWByDepartment from './views/VWByDepartment.js';
import VWByEmployeeType from './views/VWByEmployeeType.js'

import './App.css'

import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

import 'bootstrap/dist/css/bootstrap.css';

function App() { 

  return (
    <BrowserRouter>
      <Navbar>      
          <Navbar.Brand href="#home">Apollonia Dental Practice</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="">
              <Nav.Link href="/">Home</Nav.Link>
              <Nav.Link href="/department">Departments</Nav.Link>
              <Nav.Link href="/employee">Employees</Nav.Link>  
              <Nav.Link href="/employee/unassigned">Unassigned Employees</Nav.Link>  
              <Nav.Link href="/by-department">View By Department</Nav.Link>
              <Nav.Link href="/by-employee-type">View By Employee Type</Nav.Link>
            </Nav>
          </Navbar.Collapse>  
      </Navbar>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/employee" element={<Employee />} />
        <Route path="/employee/:urlParam" element={<Employee />} />
        <Route path="/department" element={<Department />} />
        <Route path="/by-department" element={<VWByDepartment />} />
        <Route path="/by-employee-type" element={<VWByEmployeeType/>} />
      </Routes>
    </BrowserRouter>
  );
}
 

export default App 