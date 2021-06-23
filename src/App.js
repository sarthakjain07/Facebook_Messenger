import React, { useState, useEffect } from 'react';
import { Button, FormControl, InputLabel, Input } from '@material-ui/core';
import './App.css';
import Message from './Message';
import { db } from './firebase';
import firebase from "firebase";
import FlipMove from 'react-flip-move';
import SendIcon from '@material-ui/icons/Send';
import { IconButton } from '@material-ui/core';

function App() {
  const [input, setInput] = useState('')
  // const [messages, setMessages] = useState([]) // state used to save messages in the form of objects
  const [messages, setMessages] = useState([{ username: 'Jarvis', message: 'Hi! Refresh the page & leave your message, Mr. Xain will be replying soon😊' }]) // when not using database
  const [username, setUsername] = useState('') // state used to save username
  // useState = variable in React
  // useEffect = run code on a condition
  // window.scrollTo(0, 999999999999);

  // to store the messages in database we are using this useEffect
  useEffect(() => {
    db.collection('messages')
      .orderBy('timestamp', 'desc')//message will be sorted according to timestamp in ascending order
      .onSnapshot(snapshot => {
        setMessages(snapshot.docs.map(doc => ({ id: doc.id, message: doc.data() })))
        // 'docs' is the entire document consisting of many 'doc'
        //  'doc' is each individual document in the 'docs'. 'doc' is the key-value pair present in each document, as an object.
        // 'id' is the unique key that is present in firestore for each doc , Format of 'data'  --> {text: 'something' , username: 'name'}
        // Finally, 'doc' and 'message' is of the format --> {id: 'unique_doc_key', text: 'something' , username: 'name'}
      })
  }, [])


  useEffect(() => {
    setUsername(prompt('Please enter your name'))

  }, [])
  const sendMessage = (event) => {
    event.preventDefault() // to prevent the app from refreshing because when we press enter and the form is going to submit the screen will be refreshed
    // window.scrollTo(0, 999999999999); //After typing message, it scrolls down to show the recent message

    db.collection('messages').add({
      message: input,
      username: username,
      timestamp: firebase.firestore.FieldValue.serverTimestamp()
    })

    // setMessages([...messages, {username: username, text: input}]) // appending or pushing objects
    setInput('')
  }
  return (
    <div className="App">
      <img src="https://facebookbrand.com/wp-content/uploads/2020/10/Logo_Messenger_NewBlurple-399x399-1.png?w=100&h=100" alt="TexTinder" />
      <h2>Hey🖐 {username}</h2>
      <form className="app__form">
        {/* using designing things from material ui */}
        <FormControl className="app__formControl">
          <Input className="app__input" placeholder={'Enter a Message...'} value={input} onChange={event => setInput(event.target.value)} />
          <IconButton className="app__iconButton" disabled={!input} variant="contained" color="primary" type="submit" onClick={sendMessage}>
            <SendIcon />
          </IconButton>
        </FormControl>
      </form>
      {/* to display the messages */}
      <FlipMove>
        {
          messages.map(({ id, message }) => (
            <Message key={id} username={username} message={message} /> //taking message as a property and passing it to the Message.js for further styling
          ))
        }
      </FlipMove>
    </div>
  );
}

export default App;
