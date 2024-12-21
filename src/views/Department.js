import axiosInstance from '../utilities/axios.js'
import { useEffect, useState } from 'react';
import DepartmentModal from './DepartmentModal.js'
const Department = () => {
  const [departments, setDepartments] = useState([])
  const [department, setDepartment] = useState({})
  const [showEditModal, setShowEditModal] = useState(false)
  
    const loadDepartments = () => {
        axiosInstance.get('department')
            .then(response => { 
                setDepartments(response.data)
            })
            .catch(err => {
                console.log(err) 
            })
    }

    useEffect(() => {
        loadDepartments()
    }, [])

    const editDepartment = (departmentInfo) => {
        setDepartment(departmentInfo)
        setShowEditModal(true) 
    }
    const deleteDepartment = (departmentInfo) => {
        if (window.confirm("Are you sure?")) { 
          axiosInstance.delete('department/'+departmentInfo.departmentId)
            .then(response => {   
                loadDepartments() 
            })
            .catch(err => {
              console.log(err) 
            })  
        }  
    }


    const handleModalClose = (depChanged) => { 
        if (depChanged) {
        if (depChanged.employeeId) { 
            axiosInstance.put('department/' + department.departmentId, depChanged)
            .then(response => { 
                setDepartment({})
                setShowEditModal(false)
                loadDepartments() 
            })
            .catch(err => {
                if (err.response.data) alert(err.response.data) 
                    console.log(err.response)
                //console.log(err) 
            })
        }
        else { 
            axiosInstance.post('department', depChanged)
            .then(response => { 
                setDepartment({})
                setShowEditModal(false)
                loadDepartments() 
            })
            .catch(err => {
                console.log(err) 
            })
        }
        } 
        else {
            setDepartment({})
            setShowEditModal(false)
        }
    } 

    const newDepartment = () => { 
        setDepartment({ name: "" }) 
        setShowEditModal(true) 
    }
 
  return (
    <section>
      <h2>Department</h2>
      <table>
        <thead>
          <tr>
            <th>Department Name</th> 
            <th><button onClick={newDepartment}>New</button></th>
          </tr> 
        </thead>
        <tbody>
        {departments.map(dep => (
          <tr> 
            <td>{dep.name}</td> 
            <td><button onClick={() => editDepartment(dep)}>Edit</button></td>
            <td><button onClick={() => deleteDepartment(dep)}>Delete</button></td> 
          </tr> 
        ))}
        </tbody>
      </table>
      <DepartmentModal show={showEditModal} departmentInit={department} handleClose={handleModalClose} /> 
    </section>

  );
}

export default Department