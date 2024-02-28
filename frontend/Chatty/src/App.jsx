import { useEffect, useState } from 'react'
import './App.css'
import io from 'socket.io-client'
import {nanoid} from 'nanoid'

//no dotenv
const socket = io.connect("http://localhost:3000")
const userName = nanoid(4)

function App() {
  const [message, setMessage] = useState('')
  const [chat, setChat] = useState([])

  const sendChat = (e) => {
    e.preventDefault()
    socket.emit("chat",{message, userName, user:"Utkarsh"})
    setMessage('')
  }

  useEffect(()=>{
    socket.on("chat",(payload) => {
      setChat([...chat, payload])
    })
  })

  return (
    <>
      <h1>Chatting Unlocked</h1>
      {
        chat.map((payload,index) => {
          return (
            <p key={index}><span>id: {payload.userName}</span>: {payload.message} </p>
          )
        })
      }
      <form onSubmit={sendChat}>
        <input type="text" 
        name='chat' 
        placeholder="send text" 
        value={message}
        onChange={(e) => {setMessage(e.target.value)}} />
        <button type="submit">Send</button>
      </form>
    </>
  )
}

export default App
