import axiosInstance from '../utilities/axios.js'
import { useEffect, useState } from 'react' 

const VWByDepartment = () => { 
  const [employees, setEmployees] = useState([]) 
  const [departments, setDepartments] = useState([])  
  
  const loadEmployees = () => { 
    axiosInstance.get('views/by-department')
      .then(response => { 
          setEmployees(response.data)
          console.log(employees) 
      })
      .catch(err => {
        console.log(err) 
      })
  } 
  
  useEffect(() => { 
    loadEmployees() 
    axiosInstance.get('department')
      .then(response => {    
          setDepartments(response.data) 
      })
      .catch(err => {
        console.log(err) 
      }) 
  }, []) 
 
  return (
    <>
    <section>
      <h2>View by Department</h2> 

          {departments.map(department => (
          <>
          <b>{department.name}</b><br/>
          {employees.filter(value => value.departmentName === department.departmentId)}
 
          <table> 
            {employees.filter(value => value.departmentId === department.departmentId).map(emp => (
              <tr key={emp.employeeId}> 
                <td>{emp.firstname} {emp.lastname}</td> 
                <td>{emp.type}</td> 
              </tr> 
            ))}
          </table><br/> 
          </>
          ))} 

          <table> 
            {employees.filter(value => typeof value.departmentId == "undefined").length >0 && (<><b>Unassigned</b><br/></>) }
            {employees.filter(value => typeof value.departmentId == "undefined").map(emp2 => (
              <tr key={emp2.employeeId}> 
                <td>{emp2.firstname} {emp2.lastname}</td> 
                <td>{emp2.type}</td> 
              </tr> 
            ))}
          </table>
    </section>   
 
    </>
  );
}

export default VWByDepartment