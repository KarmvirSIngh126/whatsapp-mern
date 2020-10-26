import React, { useEffect,useState } from 'react';
import Pusher from 'pusher-js'
import './App.css';
import Sidebar from "./Sidebar";
import ChatBody from "./ChatBody";
import axios from "./axios";
function App() {
  const [messages,setMessages]=useState([]);
  useEffect(()=>{
    axios.get('/messages/sync').then((response)=>{
      setMessages(response.data)
    })
  })
  useEffect(()=>{
    var pusher = new Pusher('49690bc514948fc9c99c', {
      cluster: 'ap2'
    });

    var channel = pusher.subscribe('messages');
    channel.bind('inserted', function(newMessage) {
      
      setMessages([[...messages,newMessage]])
    });
  return ()=>{
    channel.unbind_all();
    channel.unsubscribe();
  }
  },[messages]);
  console.log(messages)

  return (
    <div className="app">
    <div className= "body">
      <Sidebar />
      <ChatBody messages={messages}/> 
      </div>
    </div>
  );
}

export default App;
