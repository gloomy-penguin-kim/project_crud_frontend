import axiosInstance from '../utilities/axios'
import { useEffect, useState } from 'react' 

import 'bootstrap/dist/css/bootstrap.css';

const VWByEmployeeType = () => {  
    const employeeTypes = ['Admin', 'Medical', 'Clerical', 'Housekeeping'];
    const [employees, setEmployees] = useState([])  
    const [heading, setHeading] = useState("View by Department")
    
    const loadEmployees = () => { 
        axiosInstance.get('/api/views/by-employee-type')
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
    }, []) 
 
  return (
    <>
    <section>
      <h2>{heading}</h2>  
          {employeeTypes.map(employeeType => (
          <>
          <span><b>{employeeType}</b></span><br/>  
          <table> 
            {employees.filter(obj => obj.type.toLowerCase() === employeeType.toLowerCase()).map(emp => (
              <tr key={emp.employeeId}> 
                <td style={{minWidth:'15rem'}}>{emp.lastname}, {emp.firstname}</td> 
                <td>{emp.departmentsName.join(', ')}</td> 
              </tr> 
            ))}
          </table><br/> 
          </>
          ))}  
    </section>   
 
    </>
  );
}

export default VWByEmployeeType