import axiosInstance from '../utilities/axios'
import { useEffect, useState } from 'react'
import DepartmentModal from './DepartmentModal' 
import { useParams } from 'react-router-dom'
 
import 'bootstrap/dist/css/bootstrap.css'
import './css/table.css' 

const enumPageState = Object.freeze({ 
  DEPARTMENTS: "Departments",
  DEPARTMENT:  "Departments",
  NOT_FOUND: "Department not found",
  LOADING: "",
  ERROR: "Server Error",
});


const Department = () => {
    const { urlParam } = useParams()  
    const [ pageState, setPageState ] = useState(); 

    const [showEditModal, setShowEditModal] = useState(false)

    const emptyDepartment = { name: "" }
    const [department, setDepartment] = useState(emptyDepartment)
    const [departments, setDepartments] = useState([])  

 
  
    const loadDepartments = () => { 
        axiosInstance.get('/api/department')
        .then(response => { 
            setPageState(enumPageState.DEPARTMENTS)
            setDepartments(response.data)
            console.log(departments) 
        })
        .catch(err => {
            setPageState(enumPageState.ERROR)
            console.log(err) 
        })
    }  
  
    const loadOneDepartment = () => { 
        axiosInstance.get('/api/department/'+ encodeURIComponent(urlParam))
        .then(response => { 
            if (response.data.length > 0) {   
            setPageState(enumPageState.DEPARTMENT)
            setDepartment(response.data[0])
            setDepartments(response.data)
            setShowEditModal(true)
            }
            else setPageState(enumPageState.NOT_FOUND)
            console.log(department) 
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
      loadDepartments() 
    } 
    else { 
      loadOneDepartment() 
    }
  }, [urlParam])

  const editDepartment = (departmentInfo) => { 
    console.log("edit employee", departmentInfo)
    setDepartment(departmentInfo) 
    setShowEditModal(true) 
  }

  const deleteDepartment = (departmentInfo) => {
    console.log("delete employee", departmentInfo)
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

  const newDepartment = () => {
    setDepartments(emptyDepartment) 
    setShowEditModal(true) 
    console.log("new department", department)
  }
 
  const departmentModalCallback = () => { 
    if (pageState === enumPageState.DEPARTMENTS) {
      loadDepartments() 
    }
    else if (pageState === enumPageState.DEPARTMENT) {
      loadOneDepartment() 
    } 
  }
 
  return (
    <>
    <section>
      <h2>{pageState}</h2>
      {(pageState === enumPageState.DEPARTMENTS || 
        pageState === enumPageState.DEPARTMENT   ) && (
      <table> 
        <thead>
          <tr>
            <th style={{minWidth:'40rem'}}>Name</th> 
            <th>
              {pageState === enumPageState.DEPARTMENTS && (
              <button style={{color:'indigo'}} onClick={newDepartment}>New</button>
              )}
            </th>
          </tr> 
        </thead>
        <tbody> 
          {departments?.map(dep => (
            <tr key={dep.departmentId}> 
              <td>{dep.name}</td> 
               
              <td><button style={{color:'indigo'}} onClick={() => editDepartment(dep)}>Edit</button></td>
              <td><button style={{color:'grey'}} onClick={() => deleteDepartment(dep)}>Delete</button></td>
            </tr> 
          ))}
        </tbody>
      </table>)}
    </section>  

    <DepartmentModal  
      show={showEditModal}
      setShow={setShowEditModal}
      handleCloseCallback={departmentModalCallback} 
      departmentInit={department}  />

    </>
  );
}

export default Department