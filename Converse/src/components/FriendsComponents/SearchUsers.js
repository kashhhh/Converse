import { useEffect, useState } from "react";
import Contacts from "../ChatComponents/Contacts";

const SearchUsers = ({searchBar,FetchRequests,setOtherUser}) => {
  const [users,setUsers] = useState([]);
  useEffect(async () => {
    const users = await FetchRequests.getUsers();
    setUsers(users);
    console.log("Wow",users);
  },[])

  return ( 
    <div class="">
      <span className="p-3 fw-bold fs-6 text-light">Users starting with {searchBar}:</span>
        <ul class="users">
            { users.map((user,index) =>{ 
              if(user.username.toLowerCase().startsWith(searchBar.toLowerCase()) 
                  && user.user_id!== parseInt(sessionStorage.getItem('user_id'))){
                
                return <a href='#' className="text-decoration-none text-light" onClick={() => setOtherUser(user)} key={index}>
                <Contacts name={user.username} id={user.user_id} status={user.status}  created_on={user.created_on} lastMessage={"Yo!"} />
              </a>  
              }
                
            }
            )}        
        </ul>
    </div>
   );
}
 
export default SearchUsers;