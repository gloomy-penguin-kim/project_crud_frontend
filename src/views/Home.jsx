import React from 'react'

const Home = ({ handleCloseCallback, show, setShow, employeeInit = {} }) => {  
      return (
        <><p>
        <h2>Welcome to the Employee Department Website!</h2> 
        </p>
        <p>
          Please click <button>here</button> to reload the test data (for everyone). 
        </p>
        <p>
          Employees have one employee type (clerical, medical, housekeeping, etc) and can belong to zero or many departments. 
        </p>
        </>
      )

}


export default Home 