import React, { useState, useEffect } from 'react';
import { Button, FormControl, InputLabel, Input } from '@material-ui/core';
import './App.css';
import Message from './Message';
import { db } from './firebase';

function App() {
  const [input, setInput] = useState('')
  const [messages, setMessages] = useState([{username:'Sarthak',message:'Hey!'}, {username:'Den',message:'Hello'}]) // state used to save messages in the form of objects
  const [username, setUsername] = useState('') // state used to save username
  // useState = variable in React
  // useEffect = run code on a condition

  // to store the messages in database
  useEffect(()=>{
    db.collection('messages').onSnapshot(snapshot=>{
      setMessages(snapshot.docs.map(doc=>doc.data()))
    })
  },[])


  useEffect(()=>{
    setUsername(prompt('Please enter your name'))

  },[])
  const sendMessage = (event) => {
    event.preventDefault() // to prevent the app from refreshing because when we press enter and the form is going to submit the screen will be refreshed
    setMessages([...messages, {username: username, text: input}]) // appending or pushing objects
    setInput('')
  }
  return (
    <div className="App">
      <h2>Hey🖐 {username}</h2>
      <form>
      {/* using designing things from material ui */}
        <FormControl>
          <InputLabel >Enter a Message...</InputLabel>
          <Input value={input} onChange={event => setInput(event.target.value)}/>
          <Button disabled={!input} variant="contained" color="primary" type="submit" onClick={sendMessage}>Send Message</Button>
        </FormControl>
        </form>
        {/* to display the messages */}
        {
          messages.map(message => (
            <Message username={username} message={message}/> //taking message as a property and passing it to the Message.js for further styling
          ))
        }
    </div>
  );
}

export default App;
