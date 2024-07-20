
import React, { useEffect, useState } from 'react'
import Chat from './components/Chat'
import './styles/App.css'
import { io } from 'socket.io-client'
const socket = io.connect('http://localhost:8080/')
function App() {
  const [showChat, setShowChat] = useState(false)
  const [username, setUsername] = useState('')
  const [roomCode, setRoomCode] = useState('')

  const joinChat = () => {
    if (username !== '' && roomCode !== '') {
      socket.emit('join_room',roomCode)
      localStorage.setItem('username', username)
      localStorage.setItem('roomCode', roomCode)
      setShowChat(true)
  
    }
  }

  useEffect(() => {
    const savedUsername = localStorage.getItem('username')
    const savedRoomCode = localStorage.getItem('roomCode')

    if (savedUsername && savedRoomCode) {
      setUsername(savedUsername)
      setRoomCode(savedRoomCode)
      setShowChat(true)
    }
  }, [])

  const leaveChat = () => {
    localStorage.removeItem('username')
    localStorage.removeItem('roomCode')
    setShowChat(false)
    setUsername('')
    setRoomCode('')
  }

  return (
    <div className="App">
      {!showChat ? (
        <div className='roomContainer'>
          <h2 className='roomTitle'>Join A Chat</h2>
          <ul>
            <li className=''>
             <input type="text" placeholder='User name' value={username} onChange={(event => setUsername(event.target.value))} className='px-3 py-2 rounded-xl'/>
            </li>
            <li className=''>
             <input type="text" placeholder='Room code' value={roomCode} onChange={(event => setRoomCode(event.target.value))} className='px-3 py-2 rounded-xl'/>  
            </li>
            <li className=''>
              <button className='joinButton px-3 py-2 rounded-xl bg-blue-300' onClick={joinChat}>Join</button>
            </li>
          </ul>
        </div>
      ) : (
        <div>
          <button onClick={leaveChat} className='backButton'>Back</button>
          <Chat socket={socket} username={username} roomCode={roomCode} />
        </div>
      )}
    </div>
  )
}

export default App


