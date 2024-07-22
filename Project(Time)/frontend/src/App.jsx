import React, { useEffect, useState } from 'react'
import CardAnimation from './components/CardAnimation'
function App() {
  const [time_display, set_time_display] = useState('')
  const [meridiem_indicators, set_meridiem_Indicators] = useState('')
  useEffect(() => {
    let Time = () => {
      let date = new Date();
      var hours = date.getHours();
      var minutes = date.getMinutes();
      var Seconds = date.getSeconds()
      var ampm = (hours >= 12) ? 'PM' : 'AM';
      hours = hours % 12;
      hours = (hours!=0) ? hours : 12; // the hour '0' should be '12'
      hours = hours < 10 ? '0'+ hours : hours;
      minutes = minutes < 10 ? '0'+minutes : minutes;
      Seconds = Seconds < 10 ? '0'+Seconds : Seconds;
      set_meridiem_Indicators(ampm)
      set_time_display(`${hours} : ${minutes} : ${Seconds}`)


    }
    setInterval(() => {
      Time()
    })
  })
  return (
    <>
      <div>
        <CardAnimation  time_display={time_display} meridiem_indicators={meridiem_indicators}/>
      </div>
    </>
  )
}

export default App
