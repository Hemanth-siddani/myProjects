import React, { useEffect, useState } from 'react'
import '../styles/Form.css'
function Form() {
    let date = new Date()
    const [todayDate, setTodayDate] = useState('')
    const [clientArray, setClientArray] = useState([])
    const [clientObject, setClientObject] = useState({
        startingDate : '',
        clientName: '',
        clientMobileNumber: '',
        principleAmount: '',
        rateOfInterest: '',

    })
    let findingMonthsDuration = (startingDate,endingDate) => {
        let starting_date = new Date(startingDate)
        let ending_date = new Date(endingDate)
        let yearDifference = (ending_date.getFullYear() - starting_date.getFullYear()) * 12
        let monthDifference = ((ending_date.getMonth() + 1) - (starting_date.getMonth() + 1))
        let dateDifference = (ending_date.getDate() - starting_date.getDate()) * (1/31)
        monthDifference += (yearDifference + dateDifference)
        return parseFloat(monthDifference.toFixed(2))
    }

    let typeConversion = (clientArray) => {
        clientArray.forEach((client) => {
            client.clientMobileNumber = parseInt(client.clientMobileNumber)

            client.principleAmount = parseInt(client.principleAmount)
            client.rateOfInterest = parseFloat(client.rateOfInterest)
            client.timeInMonths =  findingMonthsDuration(client.startingDate,client.currentDate)

            let resultantInterest = (client.principleAmount * client.rateOfInterest * client.timeInMonths) / 100
            client.resultantInterest = resultantInterest
            console.log(client.startingDate,client.currentDate)


            console.log('clientArray : ',clientArray)
        })
        window.localStorage.setItem('clientArray', JSON.stringify(clientArray))
    }
    let handleInput = (event) => {
        const { name, value } = event.target
        setClientObject({
            ...clientObject,
            [name]: value,
        })

    }

    clientObject.currentDate = todayDate

    useEffect(() => {
        setTodayDate(
            `${date.getFullYear()}-${date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1}-${date.getDate() < 10 ? '0' + date.getDate() : date.getDate()}`
        )
    }, [])

    useEffect(() => {
        const savedClientArray = JSON.parse(window.localStorage.getItem('clientArray')) || []
        setClientArray(savedClientArray)
    }, [])

    let handleClick = () => {
        alert('Client added successfully.')
        setClientArray([...clientArray, clientObject])
        setClientObject({
            startingDate : '',
            clientName: '',
            clientMobileNumber: '',
            principleAmount: '',
            rateOfInterest: '',
        })
    }
    useEffect(() => {
        typeConversion(clientArray)
    }, [clientArray])
    return (
        <div className="form-container">
            <form className="form" action="">
                <ul>
                    <li>
                        <input
                            type="date"
                            placeholder="Starting date"
                            name="startingDate"
                            value={clientObject.startingDate}
                            onChange={handleInput}
                        />
                    </li>
                    <li>
                        <input
                            type="text"
                            placeholder="Client name"
                            name="clientName"
                            value={clientObject.clientName}
                            onChange={handleInput}
                        />
                    </li>
                    <li>
                        <input
                            type="text"
                            placeholder="Mobile number"
                            name="clientMobileNumber"
                            value={clientObject.clientMobileNumber}
                            onChange={handleInput}
                        />
                    </li>
                    <li>
                        <input
                            type="text"
                            placeholder="Principle amount"
                            name="principleAmount"
                            value={clientObject.principleAmount}
                            onChange={handleInput}
                        />
                    </li>
                    <li>
                        <input
                            type="text"
                            placeholder="Rate of interest"
                            name="rateOfInterest"
                            value={clientObject.rateOfInterest}
                            onChange={handleInput}
                        />
                    </li>
                    <li>
                        <button type="button" onClick={() => handleClick()}>
                            Calculate
                        </button>
                    </li>
                </ul>
            </form>
        </div>
    )
}

export default Form




