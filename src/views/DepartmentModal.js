import { useEffect, useState } from "react"; 
 
import './modal.css'

const DepartmentModal = ({ handleClose, show, departmentInit = {} }) => {  

    const [department, setDepartment] = useState(departmentInit)  

    const handleChange = (event) => {
        const { target } = event;
        setDepartment((prevState) => ({
          ...prevState,
          [target.name]: target.value,
        }));
      };

    useEffect(() => { 
        setDepartment(departmentInit) 
    }, [departmentInit]) 

    return (
        <div className="modal" hidden={!show}>
        <section className="modal-content">
        <span class="close" onClick={() => handleClose()}>&times;</span>
        <form>
            <input type="hidden" name="departmentId" value={department.employeeId ? department.employeeId : ""}></input>

            <label htmlFor='name'>Department Name</label><br/>
            <input type="text" name="name" placeholder='department name' 
                   value={department.name} onChange={handleChange} 
                   autoFocus={true}/><br/> 
        </form>

        <button type="button" onClick={() => handleClose(department)}>
        Save
        </button>
        <button type="button" onClick={() => handleClose()}>
        Cancel
        </button>
    </section>
    </div>
    );
  };
export default DepartmentModal 