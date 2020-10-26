import React, { useState } from 'react'
import "./chat.css"
import SearchOutlined from '@material-ui/icons/SearchOutlined'
import AttachFile from '@material-ui/icons/AttachFile'
import Mic from '@material-ui/icons/Mic'
import MoreVert from '@material-ui/icons/MoreVert'
import { Avatar, IconButton } from '@material-ui/core'
import InsertEmoticon from '@material-ui/icons/InsertEmoticon'


import axios from './axios';
function ChatBody({messages}) {
    const [input, setInput] = useState('');
    const sendMessage =async (e)=>{e.preventDefault();
    await axios.post("/messages/new",{
        message:input,
        name:"DEMO",
        timestamp:"justnow",
        received:false});
        setInput("");
    }
    return (
        <div className="chat">
         <div className="chat_header">
             <Avatar />
        <div className="chat_headerInfo">
        <h3>RoomName</h3>
        <p>Laste seen at</p>
        </div>
        <div className="chat_headerRight">
        <IconButton><SearchOutlined /></IconButton>
        <IconButton><AttachFile /></IconButton>
        <IconButton><MoreVert /></IconButton>
        </div>
        </div>
        <div className="chat_body">
            {messages.map((message)=>(<p className={`chat_message ${message.received && "chat_receiver"}`}>
    <span className="chat_name">{message.name}</span>
            {message.message}
            <span className="chat_timestamp">
                {message.timestamp}
            </span>
            </p>))}
            </div>
           
            <div className="chat_footer">
                <InsertEmoticon />
                <form>
                    <input 
                    value={input}
                    onChange={(e)=>(setInput(e.target.value))}
                    paceholder="type a message"
                    type="text"
                    />
                    <button
                    onClick={sendMessage}

                    type="submit">
                        Send a message
                    </button>
                </form>
                <Mic />

                </div>
            </div>   
        
    )
}

export default ChatBody
