import { useEffect, useState } from 'react';
import './App.css';
import { FormControl, Input, InputLabel, IconButton} from '@material-ui/core';
import Message from './Message';
import db from "./firebase";
import firebase from "firebase";
import FlipMove from "react-flip-move";
import SendIcon from "@material-ui/icons/Send";


function App() {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([]);
  const [username, setUsername] = useState(''); 


  useEffect(()=>{
    db.collection('messages')
    .orderBy('timestamp', 'asc')
    .onSnapshot(snapshot =>{
      setMessages(snapshot.docs.map(doc => ({id: doc.id,message: doc.data()})))
    })
  }, [])

  useEffect(() =>{
    setUsername(prompt('please enter your username'))
  }, [])


  const sendMessage = (event) => {
    event.preventDefault();

    db.collection('messages').add({
      username: username,
      message: input,
      timestamp: firebase.firestore.FieldValue.serverTimestamp()
    })
    setInput('');
  }

  return (
    <div className="App">
     <img src="https://scontent.ftun3-1.fna.fbcdn.net/v/t39.8562-6/120009688_325579128711709_1736249742330805861_n.png?_nc_cat=1&ccb=2&_nc_sid=6825c5&_nc_ohc=kHPoRRu-brYAX9hvU6e&_nc_ht=scontent.ftun3-1.fna&oh=af384c3ea0b87db74355e107ca2da148&oe=5FDB2E7D"/>
     <h1>Messenger Clone</h1>
     <h3>Welcome {username}</h3>


     <form className="app__form">
       <FormControl className="app__formControl">
         <InputLabel>Enter a message...</InputLabel>
         <Input 
         className="app__input" 
         placeholder="Enter a message..." 
         value={input} 
         onChange={event => setInput(event.target.value)}
         />

         <IconButton 
         className="app__iconButton"
         disabled={!input}
         variant="contained" 
         color="primary" 
         type="submit"
         onClick={sendMessage}>

           <SendIcon />
           
         </IconButton>
       </FormControl>
     </form>


     <FlipMove>
     {
      messages.map(({id, message}) => (
        <Message key={id} username={username} message={message}/>
      ))
     }
     </FlipMove>
    </div>
  );
}

export default App;
