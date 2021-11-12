import Message from "./Message";
import io from "socket.io-client";
import { useEffect, useRef, useState } from "react";
import ReactScrollableFeed from 'react-scrollable-feed';

const ChatWindow = ({display,room,loggedUser,name,FetchRequests,otherUser,messagesOfRoom, setSearchBar}) => {
  
  const user_id= sessionStorage.getItem('user_id');
  const username = sessionStorage.getItem('username');
  const created_on = sessionStorage.getItem('created_on');
  const [ messageText, setMessageText ] = useState({ message: "", username: username, room_key: room, user_id: user_id, sent_on: '' })
	const [ chat, setChat ] = useState([]);
  const [currentUserInfo, setCurrentUserInfo] = useState();
  const [singleConnection,setSingleConnection] = useState([]);
  

	const socketRef = useRef()

  useEffect( async() => {
    
  },[])

	useEffect(
		() => {
      console.log("Hello");
			socketRef.current = io.connect("http://localhost:4000")
			socketRef.current.on("message", ({ username, message,room_key, user_id, sent_on }) => {
        
				setChat([ ...chat, { username, message,room_key, user_id, sent_on } ])
			})

			return () => socketRef.current.disconnect()
		},
		[ chat ]
	)

  useEffect(async() => {
    const singleConnection= await FetchRequests.getConnectionStatus(room, user_id);
    console.log("Single",singleConnection);
    setSingleConnection(singleConnection);
  }, [room]);

  const getDate = () => {
    return new Date(Date.now()).toISOString();
  }

	const onMessageSubmit = async(e) => {
    e.preventDefault();
    if(messageText.message!== ''){
      
      const { username, message,room_key, user_id } = messageText;

      console.log("Room:",room_key,user_id);

      socketRef.current.emit("message", { username, message,room_key, user_id, sent_on: getDate() })
      

      const formData = new FormData();
      formData.append('Room',room_key); 
      formData.append('Message', message);
      formData.append('sent_by', user_id);
      console.log(formData);
      const res = await fetch(
        `http://localhost:5000/messages/`,
        {
          method: 'POST',
          body: formData,
        },
        );

      
      

      //INSERTS A CONNECTION IF THERE ARE NO MESSAGES IN THAT ROOM
      if(messagesOfRoom.length === 0){
        const messageCount= await FetchRequests.getMessageCount(room);
        //console.log("Message empty",messageCount);
        
        if (parseInt(messageCount[0].count) === 1){
          console.log("First Message",otherUser);

          const connectionForm = new FormData();
          connectionForm.append('room',room);
          connectionForm.append('user_id', user_id);
          connectionForm.append('other_user',otherUser.user_id);
          connectionForm.append('msg_status', 'pending');

          const res = await fetch('http://localhost:5000/connections/', 
          {
            method: 'POST',
            body: connectionForm,
          });

        }
      }
      setMessageText({ message: "", username, room_key, user_id , sent_on: getDate() })
      console.log("Of Room",messagesOfRoom);
      try{
        console.log("Single Connection", singleConnection[0],room);
        if(singleConnection[0].msg_status !== 'pending' ){
           console.log("Make Pending", singleConnection[0].msg_status);
  
           const res = await fetch(`http://localhost:5000/connections/pending/${room}/${singleConnection[0].other_user}`,
          {
            method: 'PUT',
          })
        }
      }
      catch{
        console.log("error");
      }
      finally{
        setSearchBar('');
      }
      

      
      

    }
	
	}

  return ( 

      <div class="">
        <div class="selected-user">
            <span>To: <span class="name">{name}</span></span>
        </div>
        <div class="chat-container">
        
            <ul className="chat-box chatContainerScroll " onScroll={this}>
                <ReactScrollableFeed>
                {/*<p>Room Number: {room}</p>*/}
                
                {messagesOfRoom.map( ({  message,room_key,sent_by, sent_on}, index) => 
                      room_key === room ? ( 
                        sent_by === parseInt(sessionStorage.getItem('user_id')) ?
                         
                         <Message position="right"
                          user={{user_id: user_id, username: username, created_on: created_on}}
                           sent_on={sent_on}
                            content={message} key={index} ></Message>
                             :
                         <Message position="left"
                         user={otherUser}
                         sent_on={sent_on}
                          content={message}
                           key={index} ></Message> 
                      ) : '' )}
                
                {chat.map( ({ username, message,room_key,user_id, sent_on}, index) => 
                      room_key === room ? ( 
                        user_id === sessionStorage.getItem('user_id') ?
                         <Message position="right"
                          user={{user_id: user_id, username: username, created_on: created_on}}
                           sent_on={sent_on}
                            content={message} key={index} ></Message>
                             :
                         <Message position="left"
                         user={otherUser}
                         sent_on={sent_on}
                          content={message}
                           key={index} ></Message> 
                      ) : '' )}
                </ReactScrollableFeed>
            </ul>
            
            
            <div class="form-group mt-3 mb-0">
              <form onSubmit={onMessageSubmit}>
                <div className="form-group d-flex p-2">
                  <input 
                  type="text" 
                  className="form-control me-2" 
                  onChange={(e) => { setMessageText({username, message: e.target.value, room_key: room, user_id: user_id})}}
                  value={messageText.message} />
                  <button type="submit" className="btn btn-dark">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-chevron-double-right mb-1" viewBox="0 0 16 16">
                      <path fill-rule="evenodd" d="M3.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L9.293 8 3.646 2.354a.5.5 0 0 1 0-.708z"/>
                      <path fill-rule="evenodd" d="M7.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L13.293 8 7.646 2.354a.5.5 0 0 1 0-.708z"/>
                    </svg>
                  </button>
                </div>
              </form>
              </div>
        </div>
        <div className="container bg-secondary d-flex flex-column " id='MainWindow'>
     
      </div>

      
    </div>
    
   );
}
 
export default ChatWindow;