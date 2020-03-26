import React, { useState, useRef, useEffect  } from 'react';

function UserSearchForm(props) {

    // Hooks
    const [name, setName] = useState();

    // Used to focus input field
    const focusForm = useRef(null);

    // Name form field
    function updateName(e) {
        const newVal = e.target.value;
        setName(newVal);
    }
    
    // Use effect to focus input field
    useEffect(()=> {
        focusForm.current.focus();
    },[]);

    return(
    <div>
        <form action="submit" onSubmit={
            (e) => {e.preventDefault(); 
            props.submit( props.formType, name)
            }}>
        <p>{props.formType} Search!</p>
            <label htmlFor="name" style={{color: 'rgb(30, 136, 229)'}}>{props.formType} Name</label>
            <input type="text" id="name" className="search-area" onChange={updateName} ref={focusForm} required />
            <button type="submit" className="btn" >Search</button>
        </form>
    </div>
    );
    
}

export default UserSearchForm;