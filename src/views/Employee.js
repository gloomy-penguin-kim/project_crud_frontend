import axiosInstance from '../utilities/axios.js'
import { useEffect, useState } from 'react'
import EmployeeModal from './EmployeeModal.js' 
import { useParams, Link } from 'react-router-dom'

import 'bootstrap/dist/css/bootstrap.css'
// // const renameKeys = (keysMap, objArray) => {
//   return objArray.map(obj => {
//     const newObj = {};
//     Object.keys(obj).forEach(key => {
//       const renamedKey = keysMap[key] || key;
//       newObj[renamedKey] = obj[key];
//     });
//     return newObj;
//   });
// };

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


  // const loadDepartments = () => {
  //   axiosInstance.get('department')
  //     .then(response => {   
  //         let data = response.data
  //         data = renameKeys({ departmentId: "value" }, data)
  //         setDepartments(data) 
  //     })
  //     .catch(err => {
  //       setPageState(enumPageState.ERROR)
  //       console.log(err) 
  //     }) 
  // }
  
  const loadEmployees = () => { 
    axiosInstance.get('employee')
      .then(response => { 
          setPageState(enumPageState.EMPLOYEES)
          setEmployees(response.data)
          console.log(employees) 
      })
      .catch(err => {
        setPageState(enumPageState.ERROR)
        console.log(err) 
      })
  } 

  const loadUnassigned = () => {
    axiosInstance.get('views/by-unassigned-employees')
      .then(response => {    
          setPageState(enumPageState.UNASSIGNED)
          setEmployees(response.data) 
      })
      .catch(err => {
        console.log(err) 
      }) 
  }   
  
  const loadOneEmployee = () => { 
    axiosInstance.get('employee/'+ encodeURIComponent(urlParam))
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
    console.log("edit employee", employeeInfo)
    console.log("editEmployee", pageState)
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
    console.log("employeeModalCallback", pageState)
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
      {(pageState === enumPageState.EMPLOYEES || pageState === enumPageState.EMPLOYEE || pageState === enumPageState.UNASSIGNED) && (
      <table> 
        <thead>
          <tr>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Type</th>
            <th>Department(s)</th>
            <th>{pageState === enumPageState.EMPLOYEES && (<button onClick={newEmployee}>New</button>)}</th>
          </tr> 
        </thead>
        <tbody> 
          {employees.map(emp => (
            <tr key={emp.employeeId}> 
              <td>{emp.firstname}</td>
              <td>{emp.lastname}</td>
              <td>{emp.type}</td>
              <td>{emp.departmentsName?.join(", ")}</td>
              {/* <td><Link to={"/employee/"+emp.employeeId}>{emp.employeeId}</Link></td> */}
              <td><button onClick={() => editEmployee(emp)}>Edit</button></td>
              <td><button onClick={() => deleteEmployee(emp)}>Delete</button></td>
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