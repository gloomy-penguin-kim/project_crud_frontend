import axiosInstance from '../utilities/axios.js'
import { useEffect, useState } from 'react' 

import 'bootstrap/dist/css/bootstrap.css';

const VWByEmployeeType = () => {  
    const employeeTypes = ['staff', 'admin', 'medical', 'clerical', 'housekeeping'];
    const [employees, setEmployees] = useState([])  
    
    const loadEmployees = () => { 
        axiosInstance.get('views/by-employee-type')
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
    }, []) 
 
  return (
    <>
    <section>
      <h2>View by Employee Type</h2>  
          {employeeTypes.map(employeeType => (
          <>
          <span><b>{employeeType}</b></span><br/>  
          <table> 
            {employees.filter(obj => obj.type === employeeType).map(emp => (
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