import { useEffect, useState } from 'react' 

import Form from 'react-bootstrap/Form'; 
 
const Checkboxes = ( props ) => { 
    const { selectedInit, totalOptions, onChangeCallback } = props 
    const [selected, setSelected] = useState(selectedInit)   

    const handleChange = (event) => {
        const { target } = event;  
        let tempSelected = selected 

        if (target.checked) {
            tempSelected.push(target.value)
        }
        else { 
            const index = tempSelected.indexOf(target.value); 
            if (index !== -1) {
                tempSelected.splice(index, 1);
            } 
        } 
        setSelected(tempSelected) 
        if (typeof onChangeCallback == "function") onChangeCallback(selected) 
    } 

    useEffect(() => { 
        setSelected(selectedInit)
        
        let checkboxesDiv = document.getElementById('checkboxesDiv')
        let checkboxes = checkboxesDiv.getElementsByTagName('input') || [] 
        checkboxes = Array.from(checkboxes).filter(input => input.type === 'checkbox')

        checkboxes.forEach(checkbox => {  
            if (selected.includes(checkbox.value)) {
                checkbox.checked = true 
            }
            else checkbox.checked = false  
        }); 

    }, [selectedInit, selected]) 
 
    return (
    <>
        <div id="checkboxesDiv" style={{marginLeft: '1.25rem'}}> 
            {totalOptions.map((option, index) => {
                return (<> 
                <Form.Check className="checkboxes" type="checkbox" name={option.name} value={option.value} 
                        defaultChecked={selected.includes(option.value)} 
                        onChange={handleChange}/>
                {option.name}<br/>
                </>
                )
            })}  
        </div>
    </>
  );
}

export default Checkboxes