import InputField from "./InputField";
import { useState } from "react";
import { Collapse } from 'bootstrap';


const Registration = ({setAlertProperties}) => {

  const onRegister = async(e) => {
  console.log("first");
  e.preventDefault();

  const formData = new FormData();
  formData.append('Username',name);
  formData.append('Email', regEmail);
  formData.append('Pwd', regPassword);
  console.log(formData);
  if(regPassword===reEnterPass){
    const res = fetch(
      `http://localhost:5000/users/`,
      {
        method: 'POST',
        body: formData,
      },
  
    );
    setAlertProperties(['success','Account Created']);
    setName('');
    setReEnterPass('');
    setRegEmail('');
    setRegPassword('');
  }
  else{
    setAlertProperties(['danger','Entered passwords are not the same']);
  }
  
}

  const [name,setName]= useState('');
  const [regEmail,setRegEmail]= useState('');
  const [regPassword,setRegPassword]= useState('');
  const [reEnterPass,setReEnterPass]= useState('');

  return (
    <div>
      <button
      className="btn btn-outline-dark w-100 mt-1 mb-3"
      data-bs-toggle="collapse"
      data-bs-target="#collapseRegister"
      >
        Register
      </button>


        <div>
          <div  className="collapse" id="collapseRegister">
          <form onSubmit={onRegister}>
            <InputField type="text" placeholder="Full Name"
            value={name} hook={setName} />
            <InputField type="email" placeholder="Email Address"
            value={regEmail} hook={setRegEmail} />
            <InputField type="password" placeholder="Password"
            value={regPassword} hook={setRegPassword} />
            <InputField type="password" placeholder="Re-Enter Password"
            value={reEnterPass} hook={setReEnterPass} />

            <button type='submit' className="btn btn-dark btn-block w-100 mb-2">Submit</button>

          </form>
        </div>
      </div>
    </div>
   );
}

export default Registration;