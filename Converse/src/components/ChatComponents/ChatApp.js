import {  useState,useEffect } from "react";
import ContactWindow from "./ContactWindow";
import ChatWindow from "./ChatWindow";
import { Redirect } from "react-router";
import SearchUsers from "../FriendsComponents/SearchUsers";
import backgrd from './../../assets/back6.jfif';

const ChatApp = ({FetchRequests, loggedIn, setLoggedIn, allMessages}) => {

  const [room,setRoom]= useState(0);
  const [otherUser,setOtherUser] = useState({user_id:0});
  const user_id= sessionStorage.getItem('user_id');
  const [messagesOfRoom, setMessagesOfRoom] = useState([]);
  const [searchBar,setSearchBar] = useState('');
  const [notificationAt,SetNotificationAt] = useState([]);
  const [connections,setConnections] = useState([]);

  const createRoomKey = (contact) => {
    if(parseInt(contact.user_id) > parseInt(user_id)){
      return user_id.toString() + contact.user_id.toString();
    }
    else{
      return contact.user_id.toString() + user_id.toString() ;
    }
  }

  const logout = async() => {
    const res= await fetch(`http://localhost:5000/users/offline/${sessionStorage.getItem('user_id')}`,
    {
      method: 'PUT',
    })
    setLoggedIn(false);
  }

  useEffect(() => {
    console.log(otherUser);
    setRoom(createRoomKey(otherUser));

  }, [otherUser])
  
  useEffect(() => {
    const messagesOfRoom = allMessages.filter((message) => message.room_key === room);
    setMessagesOfRoom(messagesOfRoom);
    console.log(room);
    console.log("Messages of that room", messagesOfRoom);
  }, [room])


    if(loggedIn===false){
      return <Redirect to="/" ></Redirect>
    }

  return ( 
    <div class="vh-100" style={{backgroundImage: `url(${backgrd})`}}>
    <div class="container ">   
            <div class="page-title ">
              <div class="row gutters">
                  <div class="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12">
                      
                      {/*<input type="number" onChange={(e) => setUserID(parseInt(e.target.value))} value={userID} />*/}
                      
                  </div>
                  <div class="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12"> </div>
              </div>
          </div>
          
          <div class="content-wrapper  p-3">

              <div class="row gutters ">

                  <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12 ">

                      <div class="card m-0 border border-dark">

                          <div class="row no-gutters ">
                          <div class="col-xl-4 col-lg-4 col-md-4 col-sm-3 col-3">
                            <div class="users-container bg-dark">
                              <div class="chat-search-box d-flex">
                                  <div class="input-group">
                                      <input 
                                      class="form-control" 
                                      placeholder="Search for users..."
                                      onChange={(e) => setSearchBar(e.target.value)}
                                      value={searchBar}
                                      />
                                  </div>
                                  <button class="btn btn-light border" onClick={async() => {logout()}} >
                                    <svg className="mb-1" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-box-arrow-right" viewBox="0 0 16 16">
                                    <path fillRule="evenodd" d="M10 12.5a.5.5 0 0 1-.5.5h-8a.5.5 0 0 1-.5-.5v-9a.5.5 0 0 1 .5-.5h8a.5.5 0 0 1 .5.5v2a.5.5 0 0 0 1 0v-2A1.5 1.5 0 0 0 9.5 2h-8A1.5 1.5 0 0 0 0 3.5v9A1.5 1.5 0 0 0 1.5 14h8a1.5 1.5 0 0 0 1.5-1.5v-2a.5.5 0 0 0-1 0v2z"/>
                                    <path fillRule="evenodd" d="M15.854 8.354a.5.5 0 0 0 0-.708l-3-3a.5.5 0 0 0-.708.708L14.293 7.5H5.5a.5.5 0 0 0 0 1h8.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3z"/>
                                  </svg></button>
                              </div>
                              { searchBar === '' ? 
                                <ContactWindow 
                                setOtherUser={setOtherUser}  
                                FetchRequests={FetchRequests}
                                connections={connections}
                                setConnections={setConnections}
                                room={room}
                                /> : 
                                <SearchUsers searchBar={searchBar} FetchRequests={FetchRequests} setOtherUser={setOtherUser} />
                              }
                              
                            </div>
                          </div>

                            <div class="col-xl-8 col-lg-8 col-md-8 col-sm-9 col-9 " style = {{ minHeight: '90vh'}}>
                            {otherUser.user_id !==0 ? 
                            
                            <ChatWindow 
                            name={otherUser.username} 
                            room={room} 
                            otherUser={otherUser}
                            messagesOfRoom = {messagesOfRoom}
                            FetchRequests={FetchRequests}
                            notificationAt={notificationAt}
                            setSearchBar={setSearchBar}
                            SetNotificationAt={SetNotificationAt}
                            connections={connections}
                            setConnections={setConnections}
                            
                            />  : ''
                          }
                            
                            </div>
                          </div>          
                      </div>
                  </div>
              </div>
          </div>
      </div>  
</div>
   );
}
 
export default ChatApp;