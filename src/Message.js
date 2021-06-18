// rfce es7 snippet
import React from 'react'
import {Card, CardContent, Typography } from "@material-ui/core";
import './Message.css'

function Message({message, username}) {
    const isUser = username === message.username; // checking if the person who is messaging is owner
    return (
        <div className={`message ${isUser && 'message_user'}`}>
            <Card className = {isUser ? "message_usercard" : "message_guestcard"}>
            {/* if the person isUser then a special class will be added message_user */}
                <CardContent>
                    <Typography
                        color="white"
                        variant="h5"
                        component="h2"
                    >
                            {message.username}: {message.text}
                    </Typography>
                </CardContent>
            </Card>
        </div>    
                )
}

export default Message
