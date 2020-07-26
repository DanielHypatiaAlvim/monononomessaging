import React, 
{ 
  useState,
  useEffect,
  useRef
} from 'react';
import './App.css';
import { 
  Input,
  FormControl,
  IconButton,
} from '@material-ui/core';
import Message from './Message';
import db from './firebase';
import firebase from 'firebase';
import FlipMove from 'react-flip-move';
import SendIcon from '@material-ui/icons/Send';

var firstTime = true;
var bottomVal

function App() {

  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([]);
  const [username, setUsername] = useState('');
  const [bottom, setBottom] = useState(false);
  const [text, setText] = useState('not initialized');
  const messagesEndRef = useRef(null)

  const scrollToBottom = async () => {
    await messagesEndRef.current.scrollIntoView({ behavior: "smooth" })
    bottomVal = window.scrollY;
    console.log("Scrolled!")
    console.log(bottomVal)
  }
  
  
  useEffect(() => {
    setUsername(prompt('Please enter your username'))
  }, [] ) 

  useEffect(() => {
    db.collection('messages')
    .orderBy('timestamp')
    .onSnapshot(snapshot => {
      setMessages(snapshot.docs.map(doc => ({id: doc.id, message: doc.data()})))
      if(firstTime) {
        scrollToBottom()
        firstTime = false;
      }
      else if(bottom)
        scrollToBottom();
    })
  }, [] )

  useEffect(() => {
    window.addEventListener('scroll', () => {
        const isBottom = window.scrollY === bottomVal+118 || window.scrollY === bottomVal;
        console.log(window.scrollY + " " + bottomVal);
        if(!isBottom) {
          setBottom(false)
          setText('Not bottom')
        }
        else {
          setBottom(true)
          setText('Bottom')
        }
    })
  }, [] )

  const sendMessage = (event) => {
    event.preventDefault();
    db.collection('messages').add({
      message: input,
      username: username,
      timestamp: firebase.firestore.FieldValue.serverTimestamp()
    }).then(() => {
      scrollToBottom()
    })
    setInput('');
  }

  return (

    <div className="App">
      <h1>Mononomessaging</h1>
      <h2>Welcome {username}</h2>
      <FlipMove>
        {
          messages.map(({id, message}) => (
            <Message key = {id} message={message} username={username}/> 
          ))
        }
      </FlipMove>
      <h1 style={{color: "white"}}>1</h1>
      <text style={{color: "white"}}>1</text>
      <form className="app__form">
        <FormControl class="app__formControl">
          <Input className="app__input" placeholder={text} value ={input} onChange={event => setInput(event.target.value)} />
          <IconButton className="app__iconButton" disabled={!input} variant="contained" color = "primary" type='submit' onClick={sendMessage}>
            <SendIcon />
          </IconButton>
        </FormControl>
      </form>
      <div ref={messagesEndRef} />
    </div>

  
  );
}

export default App;
