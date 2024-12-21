import { useEffect, useState } from "react"; 
import axiosInstance from "../utilities/axios";
  
import 'bootstrap/dist/css/bootstrap.css'

import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form'; 
 
const DepartmentModal = ({ handleCloseCallback, show, setShow, departmentInit  }) => {  
    const [ department, setDepartment ] = useState(departmentInit)  
  
    console.log("departmentInit", departmentInit)
 
    console.log("department", department) 

    useEffect(() => { 
        setDepartment(departmentInit) 
    }, [departmentInit]) 
 
    const handleChange = (event) => {
        const { target } = event;
        setDepartment((prevState) => ({
          ...prevState,
          [target.name]: target.value,
        }));
        console.log("handleChange in department Modal", department)
      };
 
    const handleClose = () => { 
        if (department.departmentId) { 
            axiosInstance.put('department/' + department.departmentId, department)
            .then(response => { 
                handleCloseCallback() 
            })
            .catch(err => { 
                if (err.response.data) alert(err.response.data)
                else console.log(err) 
            })
        }
        else { 
            console.log("new department", department)
            axiosInstance.post('department', department)
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
          <Modal.Title>Department Information</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <form>
                <Form.Group> 
                    <Form.Control type="text" name="departmentId" hidden></Form.Control>

                    <Form.Label htmlFor="name">Name</Form.Label>
                    <Form.Control 
                        type="text" 
                        name="name" 
                        placeholder="name" 
                        value={department.name} 
                        onChange={handleChange} 
                        required/>  
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

export default DepartmentModal 