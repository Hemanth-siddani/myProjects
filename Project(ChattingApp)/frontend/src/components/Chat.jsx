
import React, { useEffect, useState } from 'react'
import '../styles/Chat.css'

function Chat({ socket, username, roomCode }) {
  const [currentMessage, setCurrentMessage] = useState('')
  const [chatList, setChatList] = useState([])

  // Function to send a message
  const sendMessage = async () => {
    if (currentMessage !== '') {
      const chatDetails = {
        user_name: username,
        room_code: roomCode,
        current_message: currentMessage,
        current_time: `${(new Date().getHours() < 10 ? '0' + new Date().getHours() : new Date().getHours())}:${(new Date().getMinutes() < 10 ? '0' + new Date().getMinutes() : new Date().getMinutes())}`
      }
      await socket.emit('chat-details', chatDetails)
      setChatList(prevChat => [...prevChat, chatDetails])
      setCurrentMessage('')

      localStorage.setItem('chatList', JSON.stringify([...chatList, chatDetails]))
    }
  }
  useEffect(() => {
    const savedChatListString = localStorage.getItem('chatList')
    if (savedChatListString) {
      try {
        const savedChatList = JSON.parse(savedChatListString)
        setChatList(savedChatList)
      } catch (error) {
        console.error('Error parsing chatList from localStorage:', error)
        setChatList([])
      }
    }
  }, [])

  useEffect(() => {
    socket.on('broadcasting_data', data => {
      setChatList(prevChat => [...prevChat, data])


      localStorage.setItem('chatList', JSON.stringify([...chatList, data]))
    })
  }, [socket])

  let clearChat = () => {
    window.localStorage.removeItem('chatList')
    setChatList([])
  }

  return (
    <div className='chatContainer'>
      <div className='chat-header'>
        <div className='flex items-center gap-5 justify-evenly'>
          <span className='flex items-center gap-3'>
            <h2 className='chatTitle text-bold'>Chat Karo</h2>
            <span>
              <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" className="bi bi-chat-dots" viewBox="0 0 16 16">
                <path d="M5 8a1 1 0 1 1-2 0 1 1 0 0 1 2 0m4 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0m3 1a1 1 0 1 0 0-2 1 1 0 0 0 0 2" />
                <path d="m2.165 15.803.02-.004c1.83-.363 2.948-.842 3.468-1.105A9 9 0 0 0 8 15c4.418 0 8-3.134 8-7s-3.582-7-8-7-8 3.134-8 7c0 1.76.743 3.37 1.97 4.6a10.4 10.4 0 0 1-.524 2.318l-.003.011a11 11 0 0 1-.244.637c-.079.186.074.394.273.362a22 22 0 0 0 .693-.125m.8-3.108a1 1 0 0 0-.287-.801C1.618 10.83 1 9.468 1 8c0-3.192 3.004-6 7-6s7 2.808 7 6-3.004 6-7 6a8 8 0 0 1-2.088-.272 1 1 0 0 0-.711.074c-.387.196-1.24.57-2.634.893a11 11 0 0 0 .398-2" />
              </svg>
            </span>
          </span>
          <button className='clearChatButton' onClick={clearChat}>Clear chat</button>
        </div>
      </div>
      <div className='chat-body'>
        {chatList.map((eachMessage, index) => (
          <div key={index}>
            <div onClick={() => deleteEachMessage(index)}>
              <p className='chatMessage' id={username !== eachMessage.user_name ? 'you' : 'other'}>{eachMessage.current_message}</p>
              <p className='username_and_time'>{`${eachMessage.current_time} (${eachMessage.user_name})`}</p>
            </div>
          </div>
        ))}
      </div>
      <div className='chat-footer'>
        <input type="text" placeholder='Message' value={currentMessage} onChange={event => setCurrentMessage(event.target.value)} className='px-3 py-2 rounded-xl' />
        <button className='px-3 py-2 rounded-xl' onClick={sendMessage}>
          <span>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-send" viewBox="0 0 16 16">
              <path d="M15.854.146a.5.5 0 0 1 .11.54l-5.819 14.547a.75.75 0 0 1-1.329.124l-3.178-4.995L.643 7.184a.75.75 0 0 1 .124-1.33L15.314.037a.5.5 0 0 1 .54.11ZM6.636 10.07l2.761 4.338L14.13 2.576zm6.787-8.201L1.591 6.602l4.339 2.76z" />
            </svg>
          </span>
        </button>
      </div>
    </div>
  )
}

export default Chat
