import Contacts from "./Contacts";
import { useEffect, useState } from "react";

const ContactWindow = ({setOtherUser,userID,FetchRequests,loggedUser, connections, setConnections, room}) => {
  
  const [isClicked,setIsClicked] = useState(false);
  const setDisplayId = () => {
    return (sessionStorage.getItem('user_id') % 8) + 1
  }

  const formatDate = () => {
    return sessionStorage.getItem('created_on').substring(0, 10);
  }
  useEffect(async () => {
    console.log("Error A");
    const connections = await FetchRequests.getConnections(parseInt(sessionStorage.getItem('user_id')));
    setConnections(connections);
    console.log("Wow",connections);
  },[])

  useEffect(async() => {
    console.log("Error B");
    const connectionInterval = setInterval(async () => {
      const connections = await FetchRequests.getConnections(parseInt(sessionStorage.getItem('user_id')));
      console.log(connections);
      setConnections(connections);
    },1500);

    return () => {
      clearInterval(connectionInterval);
    }
  }, []);

  useEffect(async() => {
    console.log("isclicked",isClicked.other_user);
    if(isClicked!=false){
      const otherUser= await FetchRequests.getUserById(parseInt(isClicked.other_user));
      console.log(otherUser);
      setOtherUser(otherUser);
      if(isClicked.msg_status !== 'complete'){
        const res = await fetch(`http://localhost:5000/connections/complete/${isClicked.room_no}/${isClicked.user_id}`,
        {
          method: 'PUT',
        });
        console.log("Put complete");
      }
     
    }
    

    
  },[isClicked]);


  return (
    <div class="">
      
        <ul class="users" >
        <li class="person" data-chat={`person${sessionStorage.getItem('user_id')}`} style={{backgroundColor: 'white'}}>
            <div class="user">
                <img src={`https://www.bootdey.com/img/Content/avatar/avatar${setDisplayId()}.png`} alt="Retail Admin"/>
            </div>
            
            <p class="name-time" >
                <span class="name text-dark">{sessionStorage.getItem('username')}</span>
                <br/>
                <span class="time">Joined: {formatDate()} </span>

                
              
            </p>
            
          </li>
          <span className="p-3 fw-bold fs-6 text-light p-1">Conversations:</span>
            { connections.map((user,index) =>{ 
                return <a href='#' className="text-decoration-none text-light" onClick={() => setIsClicked(user)} key={index}>
                          <Contacts  name={user.username} id={user.other_user} contactRoom={user.room_no} room={room} status={user.status} msg_status={user.msg_status} created_on={user.created_on} lastMessage={"Yo!"} />
                        </a>  
            }
            )}        
        </ul>
    </div>
        

    
   );
}
 
export default ContactWindow;