import React, { useState, useEffect } from 'react'
import './styles/App.css'
import Form from './components/Form'
import Table from './components/Table'

function App() {
  const [showTable, setShowTable] = useState(false)

  useEffect(() => {
    // Retrieve the saved state from localStorage
    const savedState = localStorage.getItem('showTable')
    if (savedState !== null) {
      setShowTable(JSON.parse(savedState))
    }
  }, [])

  const handleRendering = () => {
    setShowTable((prevState) => {
      const newState = !prevState
      // Save the new state to localStorage
      localStorage.setItem('showTable', JSON.stringify(newState))
      return newState
    })
  }

  return (
    <>
      <div>
        <div>
          {showTable ? <Table /> : <Form />}
        </div>
        <div>
          <button className='renderPageButton' onClick={handleRendering}>
            {showTable ? 'Show form' : 'Show table'}
          </button>
        </div>
      </div>
    </>
  )
}

export default App
