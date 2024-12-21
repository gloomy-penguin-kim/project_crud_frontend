import axiosInstance from '../utilities/axios'
import { useEffect, useState } from 'react'
import EmployeeModal from './EmployeeModal' 
import { useParams } from 'react-router-dom'
 
import 'bootstrap/dist/css/bootstrap.css'
import './css/table.css'

const enumPageState = Object.freeze({
  EMPLOYEES:   "Employees",
  EMPLOYEE:  "Employee",
  NOT_FOUND: "Employee not found",
  UNASSIGNED: "Unassigned Employees",
  LOADING: "",
  ERROR: "Server Error"
});


const Employee = () => {
  const [showEditModal, setShowEditModal] = useState(false)
  const [employees, setEmployees] = useState([])  

  const emptyEmployee = { firstname: "", lastname: "", type: "", departmentsId: [], empty: true}
  const [employee, setEmployee] = useState(emptyEmployee)

  const { urlParam } = useParams() 

  const [ pageState, setPageState ] = useState(); 
 
  
  const loadEmployees = () => { 
    axiosInstance.get('/api/employee')
      .then(response => { 
          setPageState(enumPageState.EMPLOYEES)
          setEmployees(response.data)
          console.log(employees) 
      })
      .catch(err => {
        if (err.response?.data) alert(err.response.data)
        setPageState(enumPageState.ERROR)
        console.log(err) 
      })
  } 

  const loadUnassigned = () => {
    axiosInstance.get('/api/views/by-unassigned-employees')
      .then(response => {    
          setPageState(enumPageState.UNASSIGNED)
          setEmployees(response.data) 
      })
      .catch(err => {
        if (err.response?.data) alert(err.response.data)
        setPageState(enumPageState.ERROR)
        console.log(err) 
      }) 
  }   
  
  const loadOneEmployee = () => { 
    axiosInstance.get('/api/employee/'+ encodeURIComponent(urlParam))
      .then(response => { 
        if (response.data.length > 0) {  
          console.log("employee found!", response.data)
          setPageState(enumPageState.EMPLOYEE)
          setEmployee(response.data[0])
          setEmployees(response.data)
          setShowEditModal(true)
        }
        else setPageState(enumPageState.NOT_FOUND)
        console.log(employee) 
      })
      .catch(err => {
        setPageState(enumPageState.ERROR)
        setPageState("Server Error")
        setShowEditModal(false)
        console.log(err) 
      })
  } 

  useEffect(() => { 
    setPageState(enumPageState.LOADING)  

    if (!urlParam) { 
      loadEmployees() 
    }
    else if (urlParam === "unassigned") { 
      loadUnassigned() 
    }  
    else { 
      loadOneEmployee() 
    }
  }, [urlParam])

  const editEmployee = (employeeInfo) => { 
    setEmployee(employeeInfo) 
    setShowEditModal(true) 
  }

  const deleteEmployee = (employeeInfo) => {
    console.log("delete employee", employeeInfo)
    if (window.confirm("Are you sure?")) { 
      axiosInstance.delete('employee/'+employeeInfo.employeeId)
        .then(response => {   
            loadEmployees() 
        })
        .catch(err => {
          console.log(err) 
        })  
    } 
  }

  const newEmployee = () => {
    setEmployee(emptyEmployee) 
    setShowEditModal(true) 
    console.log("new employee", employee)
  }
 
  const employeeModalCallback = () => { 
    if (pageState === enumPageState.EMPLOYEES) {
      loadEmployees() 
    }
    else if (pageState === enumPageState.EMPLOYEE) {
      loadOneEmployee() 
    }
    else if (pageState === enumPageState.UNASSIGNED) {
      loadUnassigned() 
    }
  }
 
  return (
    <>
    <section>
      <h2>{pageState}</h2>
      {(pageState === enumPageState.EMPLOYEES || 
        pageState === enumPageState.EMPLOYEE  || 
        pageState === enumPageState.UNASSIGNED) && (
      <table> 
        <thead>
          <tr>
              <th style={{minWidth:'10rem'}}>First Name</th>
              <th style={{minWidth:'15rem'}}>Last Name</th>
              <th style={{minWidth:'10rem'}}>Type</th>
              <th style={{minWidth:'25rem'}}>Departments</th>
            <th>
              {pageState === enumPageState.EMPLOYEES && (
              <button  style={{color:'indigo'}} onClick={newEmployee}>New</button>
              )}
            </th>
          </tr> 
        </thead>
        <tbody> 
          {employees.map(emp => (
            <tr key={emp.employeeId}> 
              <td>{emp.firstname}</td>
              <td>{emp.lastname}</td>
              <td>{emp.type}</td>
              <td>{emp.departmentsName?.join(", ")}</td>
              <td><button style={{color:'indigo'}} onClick={() => editEmployee(emp)}>Edit</button></td>
              <td><button style={{color:'grey'}} onClick={() => deleteEmployee(emp)}>Delete</button></td>
            </tr> 
          ))}
        </tbody>
      </table>)}
    </section>  

    <EmployeeModal 
      id = "employeeInfo"
      show={showEditModal}
      setShow={setShowEditModal}
      handleCloseCallback={employeeModalCallback} 
      employeeInit={employee}  />

    </>
  );
}

export default Employee