import { useState,useEffect } from "react";


const Contacts = ({display,name,lastMessage,id,status, created_on,msg_status, contactRoom,room}) => {

  const [notification,setNotification]= useState(false);

  useEffect(async() => {
    const res =  await fetch(`http://localhost:5000/connections/complete/${room}/${id}`,
    {
      method: 'PUT',
    });
  },[])

  const setDisplayId = () => {
    return (id % 8) + 1
  }
  const formatDate = () => {
    return created_on.substring(0, 10);
  }


  
  return ( 
    <li class="person" data-chat={`person${id}`}>
      <div class="user">
          <img src={`https://www.bootdey.com/img/Content/avatar/avatar${setDisplayId()}.png`} alt="Retail Admin"/>
          <span class={`status ${status}`}></span>
      </div>
      
      <p class="name-time">
          <span class="name">{name}</span>
          <br/>
          <span class="time">Joined: {formatDate()} </span>

          { msg_status === 'pending' ?  
              room === contactRoom ? 
                '' : 
                <span class=""> &nbsp;
                  <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" fill="currentColor" class="bi bi-circle-fill text-danger" viewBox="0 0 16 16">
                  <circle cx="8" cy="8" r="8"/>
                  </svg> 
                </span>
              : ''
      }
         
      </p>
      
    </li>
   );
}
 
export default Contacts;