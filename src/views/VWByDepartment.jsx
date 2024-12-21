import axiosInstance from '../utilities/axios'
import { useEffect, useState } from 'react' 

const VWByDepartment = () => { 
  const [employees, setEmployees] = useState([]) 
  const [departments, setDepartments] = useState([])  
  const [heading, setHeading] = useState("View by Department")
  
  const loadEmployees = () => { 
    axiosInstance.get('/api/views/by-department')
      .then(response => { 
          setEmployees(response.data)
          console.log(employees) 
      })
      .catch(err => {
        setHeading("Server Error")
        if (err.response?.data) alert(err.response.data)
        console.log(err) 
      })
  } 
  
  useEffect(() => { 
    loadEmployees() 
    axiosInstance.get('/api/department')
      .then(response => {    
          setDepartments(response.data) 
      })
      .catch(err => {
        setHeading("Server Error")
        if (err.response?.data) alert(err.response.data)
        console.log(err) 
      }) 
  }, []) 
 
  return (
    <>
    <section>
      <h2>{heading}</h2> 

          {departments.map(department => (
          <>
          <b>{department.name}</b><br/>
          {employees?.filter(value => value.departmentName === department.departmentId)}
          <table> 
            {employees?.filter(value => value.departmentId === department.departmentId).map(emp => (
              <tr key={emp.employeeId}> 
                <td style={{minWidth:'15rem'}}>{emp.lastname}, {emp.firstname}</td> 
                <td>{emp.type}</td> 
              </tr> 
            ))}
          </table><br/> 
          </>
          ))} 

          <table> 
            {employees?.filter(value => typeof value.departmentId == "undefined").length >0 && (<><b>Unassigned</b><br/></>) }
            {employees?.filter(value => typeof value.departmentId == "undefined").map(emp => (
              <tr key={emp.employeeId}> 
                <td style={{minWidth:'15rem'}}>{emp.lastname}, {emp.firstname}</td> 
                <td>{emp.type}</td> 
              </tr> 
            ))}
          </table>
    </section>   
 
    </>
  );
}

export default VWByDepartment