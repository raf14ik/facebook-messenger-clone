import { useEffect, useState } from 'react';
import './App.css';
import { Button, FormControl, Input, InputLabel} from '@material-ui/core';
import Message from './Message';
import db from "./firebase";
import firebase from "firebase";
import FlipMove from "react-flip-move";


function App() {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([]);
  const [username, setUsername] = useState(''); 


  useEffect(()=>{
    db.collection('messages')
    .orderBy('timestamp', 'desc')
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
      text: input,
      timestamp: firebase.firestore.FieldValue.serverTimestamp()
    })
    setInput('');
  }

  return (
    <div className="App">
     <h1>Welcome {username}</h1>

     <form>
       <FormControl>
         <InputLabel>Enter a message...</InputLabel>
         <Input value={input} onChange={event => setInput(event.target.value)}/>
         <Button disabled={!input} variant="contained" color="primary" type="submit" onClick={sendMessage}> send messsage</Button>
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
