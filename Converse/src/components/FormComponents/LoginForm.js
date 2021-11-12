import { useState } from "react";
import InputField from "./InputField";
import { Redirect } from "react-router-dom";


const LoginForm = ({FetchRequests,loggedIn,setLoggedIn,setAlertProperties}) => {

  const [email,setEmail] = useState('');
  const [password,setPassword] = useState('');
  const [ redirectToForm, setRedirectToForm ] = useState(false);


  const checkCredentials = async(event) => {
    event.preventDefault();
    const users = await FetchRequests.getUsers();
    console.log(users);

    let userInDb= false;
    let correctPassword = false;

    users.map(async(user) => {
      if(user.email===email){
        userInDb=true
        if(user.pwd==password){
          correctPassword=true;
          console.log("yay");
          sessionStorage.setItem("user_id", user.user_id);
          sessionStorage.setItem("username", user.username);
          sessionStorage.setItem("created_on", user.created_on);
          sessionStorage.setItem("login", true);
          const res = await fetch(`http://localhost:5000/users/online/${user.user_id}`,
          {
            method: 'PUT',
          });
          setLoggedIn(true);
        }
        
      }
      if(!userInDb){
        setAlertProperties(['danger','User does not exist'])
      }
      else if(!correctPassword){
        
        setAlertProperties(['danger','Incorrect password'])
      }
    });
    
    
  }

  if(loggedIn){
    return <Redirect to='/chat' />
  }

  return ( 
    <form onSubmit={checkCredentials}>


        <InputField type="email" placeholder="Email Address" 
        value={email} hook={setEmail} />

        <InputField type="password" placeholder="Password" 
        value={password} hook={setPassword} />

        <button type="submit" className="btn btn-dark w-100 mb-2" >
          Login
        </button>

    </form>
   );
}
 
export default LoginForm;