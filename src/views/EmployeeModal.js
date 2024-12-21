import { useEffect, useState } from "react";
import Checkboxes from "./Checkboxes";
import axiosInstance from "../utilities/axios";
  
import 'bootstrap/dist/css/bootstrap.css'

import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form'; 

const EMPLOYEE_TYPES = ['Admin', 'Medical', 'Clerical', 'Housekeeping'];  

const renameKeys = (keysMap, objArray) => {
  return objArray.map(obj => {
    const newObj = { /* empty object */ };
    Object?.keys(obj).forEach(key => {
      const renamedKey = keysMap[key] || key;
      newObj[renamedKey] = obj[key];
    });
    return newObj;
  });
};

const EmployeeModal = ({ handleCloseCallback, show, setShow, employeeInit = {} }) => { 
    const [ departments, setDepartments ] = useState([])
    const [ employee, setEmployee ] = useState(employeeInit)  
  
    useEffect(() => { 
        setEmployee(employeeInit) 
    }, [employeeInit])
 
    useEffect(() => {  
        axiosInstance.get('/api/department')
          .then(response => {   
              let data= renameKeys({ departmentId: "value" }, response.data)
              setDepartments(data) 
          })
          .catch(err => { 
            console.log(err) 
          }) 
    }, []) 
 
    const handleChange = (event) => {
        const { target } = event;
        setEmployee((prevState) => ({
          ...prevState,
          [target.name]: target.value,
        }));
        console.log("handleChange in Employee Modal", employee)
      };

    const handleChangeForDepartments = (departmentIdList) => { 
        setEmployee((prevState) => ({
            ...prevState,
            departments: departmentIdList,
          }));
          console.log("changeCallback",employee) 
    }

    const handleClose = () => { 
        if (employee.employeeId) { 
            axiosInstance.put('/api/employee/' + employee.employeeId, employee)
            .then(response => { 
                handleCloseCallback() 
            })
            .catch(err => { 
                if (err.response.data) alert(err.response.data)
                else console.log(err) 
            })
        }
        else { 
            console.log("new employee", employee)
            axiosInstance.post('/api/employee', employee)
            .then(response => {  
                handleCloseCallback() 
            })
            .catch(err => {
                if (err.response.data) alert(err.response.data)
                else console.log(err) 
            })
        } 
        setShow(false)
    }
 

    return ( 

    <Modal show={show} onHide={() => setShow(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Employee Information</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <form>
                <Form.Group> 
                    <Form.Control type="text" name="employeeId" hidden></Form.Control>

                    <Form.Label htmlFor="firstname">First Name</Form.Label>
                    <Form.Control 
                        type="text" 
                        name="firstname" 
                        placeholder="first name" 
                        value={employee.firstname} 
                        onChange={handleChange} 
                        required/>

                    <br/>
                    <Form.Label htmlFor="lastname">Last Name</Form.Label>
                    <Form.Control 
                        type="text" 
                        name="lastname" 
                        placeholder="last name" 
                        value={employee.lastname}  
                        onChange={handleChange} 
                        required/> 
                    <br/>  

                    <Form.Label htmlFor='type'>Type</Form.Label><br/>
                    <Form.Select name="type" value={employee.type} onChange={handleChange} required>

                        <option disabled selected={employee.type === ""} value="" style={{display:'none'}}> -- select an option -- </option>
                        {EMPLOYEE_TYPES.map((empType) => (
                        <option key={empType} 
                            name={empType} 
                            value={empType} 
                            >
                            {empType}
                        </option>
                        ))}
                    </Form.Select> 

                    <br/>
                    <div id="departmentsCheckboxes" >
                        Departments<br/> 
                        <Checkboxes selectedInit={employee.departments || []} totalOptions={departments} onChangeCallback={handleChangeForDepartments}/>
                    </div>

                </Form.Group>
            </form> 
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShow(false)}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleClose}>
            Save
          </Button>
        </Modal.Footer>
      </Modal> 
    );
};

export default EmployeeModal 