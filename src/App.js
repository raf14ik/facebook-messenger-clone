import { useState } from 'react';
import './App.css';
import { Button, FormControl, Input, InputLabel} from '@material-ui/core';
import Message from './Message';

function App() {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([]);
  const [username, setUsername] = useState('');

  console.log(input);
  console.log(messages);

const sendMessage= (event) => {
  event.preventDefault();
setMessages([...messages, input]);
setInput('');
}
  return (
    <div className="App">
     <h1>heelo</h1>
     <form>
       <FormControl>
         <InputLabel>Enter a message...</InputLabel>
         <Input value={input} onChange={event => setInput(event.target.value)}/>
         <Button disabled={!input} variant="contained" color="primary" type="submit" onClick={sendMessage}> send messsage</Button>
       </FormControl>
     </form>


     {
      messages.map((message) => (
        <Message text={message}/>
      ))
     }
    </div>
  );
}

export default App;
