// rfce es7 snippet
import React from 'react'
import {Card, CardContent, Typography } from "@material-ui/core";

function Message(props) {
    return (
            <Card className="message_card">
                <CardContent>
                    <Typography
                        color="white"
                        variant="h5"
                        component="h2"
                    >
                            {props.username}: {props.text}
                    </Typography>
                </CardContent>
            </Card>
                )
}

export default Message
