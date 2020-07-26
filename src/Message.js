import React, { useEffect, forwardRef } from 'react'
import { Typography, CardContent, Card } from '@material-ui/core'
import './Message.css'
import notificationSound from './assets/notificationsound.mp3'

const Message = forwardRef(({ message, username }, ref) => {
    const isUser = username === message.username;

    useEffect(() => {
        if(!isUser)
            playNotification();
    }, [])

    const playNotification = () => {
        const audioEl = document.getElementsByClassName("audio-element")[0]
        audioEl.play()
    }

    return (
        <div ref={ref} className={`message ${isUser && 'message__user'}`}>
            <Card className = {isUser ? "message__userCard" : "message__guestCard"}>
                <CardContent>
                    <Typography
                        color="blue"
                        variant="h5"
                        component="h2"
                    >
                       {!isUser && `${message.username}: `} {message.message}
                    </Typography>
                </CardContent>
            </Card>
            <audio className="audio-element">
                <source src={notificationSound}></source>
            </audio>
            <p></p>
        </div>
    )
})

export default Message
