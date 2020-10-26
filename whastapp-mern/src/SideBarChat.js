import React from 'react'
import "./SideBarChat.css"
import { Avatar } from '@material-ui/core'
function SideBarChat() {
    return (
        <div className="sidebarChat">
            <Avatar />
        <div className= 'sidebarChat_info'>
            <h2>name</h2>
            <p>info</p>
            </div>  
            
        </div>
    )
}

export default SideBarChat;
