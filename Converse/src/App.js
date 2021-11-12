import {  useState,useEffect } from "react"
import io from "socket.io-client";
import "./App.css";
import {
  BrowserRouter as Router,
  Switch,
  Route,Redirect,
  Link
} from "react-router-dom";
import ChatWindow from "./components/ChatComponents/ChatWindow";
import ContactWindow from "./components/ChatComponents/ContactWindow";
import'./main.css'; // main css file
import ChatApp from "./components/ChatComponents/ChatApp";
import FormPage from "./components/FormComponents/FormPage";


function App() {
	const [loggedIn,setLoggedIn] = useState(false);
  const FetchRequests = {
    getUsers : async() => {
      const response = await fetch("http://localhost:5000/users");
      const users = await response.json();
      return users;
    },
    getConnections: async(user_id) => {
      const response = await fetch(`http://localhost:5000/connections/${user_id}`);
      const connection = await response.json();
      return connection;
    },
    getMessages : async() => {
      const response = await fetch("http://localhost:5000/messages/");
      const messages = await response.json();
      return messages;
    },
    getUserById : async(user_id) => {
      const response = await fetch(`http://localhost:5000/users/${user_id}`);
      const user = await response.json();
      console.log("User",user[0])
      return user[0];
    },
    getMessageCount : async(room_key) => {
      const response = await fetch(`http://localhost:5000/messages/count/${room_key}`);
      const messageCount = response.json();
      return messageCount;
    },
    getConnectionStatus : async(room_key, user_id) => {
      const response = await fetch(`http://localhost:5000/connections/${room_key}/${user_id}`);
      const connection = response.json();
      return connection;
    }
  }

  const [allMessages,setAllMessages] = useState([]); 
  useEffect(async() => {
    const allMessages= await FetchRequests.getMessages();
    setAllMessages(allMessages);
    console.log("Messages",allMessages);
  }, [loggedIn]);

  useEffect(() => {
    document.title = "Converse";
  },[])

  window.addEventListener("beforeunload", (ev) => 
  {  
      ev.preventDefault();
      // const res= fetch(`http://localhost:5000/users/offline/${sessionStorage.getItem('user_id')}`,
      // {
      //   method: 'PUT',
      // })
      return ev.returnValue = 'Are you sure you want to close?';
  });
  
	return (
    
    <Router>
    <div class="vh-100" >
      <Route exact path="/" >
        <FormPage FetchRequests={FetchRequests} loggedIn={loggedIn} setLoggedIn={setLoggedIn} />
      </Route>
      <Route exact path="/chat">
        {loggedIn !== false ? <ChatApp FetchRequests={FetchRequests} allMessages={allMessages} loggedIn={loggedIn} setLoggedIn={setLoggedIn} /> : <FormPage FetchRequests={FetchRequests} loggedIn={loggedIn} setLoggedIn={setLoggedIn} />}
        
      </Route>
    </div>
    </Router>
	)
}

export default App