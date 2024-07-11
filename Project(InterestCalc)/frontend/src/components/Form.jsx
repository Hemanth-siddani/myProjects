
import React, { useEffect, useState } from 'react'
import '../styles/Form.css'

function Form() {

    let date = new Date()
    const [todayDate, setTodayDate] = useState('')
    const [clientArray, setClientArray] = useState([])
    const [clientObject, setClientObject] = useState({
        startingDate: '',
        clientName: '',
        clientMobileNumber: '',
        principleAmount: '',
        rateOfInterest: '',
    })
    const [errors, setErrors] = useState({})

    let findingMonthsDuration = (startingDate, endingDate) => {
        let starting_date = new Date(startingDate)
        let ending_date = new Date(endingDate)
        let yearDifference = (ending_date.getFullYear() - starting_date.getFullYear()) * 12
        let monthDifference = ((ending_date.getMonth() + 1) - (starting_date.getMonth() + 1))
        let dateDifference = (ending_date.getDate() - starting_date.getDate()) * (1 / 31)
        monthDifference += (yearDifference + dateDifference)
        return parseFloat(monthDifference.toFixed(2))
    }

    let typeConversion = (clientArray) => {
        clientArray.forEach((client) => {
            client.clientMobileNumber = parseInt(client.clientMobileNumber)
            client.principleAmount = parseInt(client.principleAmount)
            client.rateOfInterest = parseFloat(client.rateOfInterest)
            client.timeInMonths = findingMonthsDuration(client.startingDate, client.currentDate)

            let resultantInterest = (client.principleAmount * client.rateOfInterest * client.timeInMonths) / 100
            client.resultantInterest = resultantInterest
            console.log(client.startingDate, client.currentDate)
        })
        window.localStorage.setItem('clientArray', JSON.stringify(clientArray))
    }

    let formValidations = (name, value) => {
        let error = {}
        let specialCharacters = ['@', '#', '$', '%', '^', '&', '*', '(', ')', '=', '-', '+', '{', '}', '|', '.', '/', ',', '<', '>', '?', '!']
        switch (name) {
            case 'startingDate':
                if (!value) error[name] = 'Starting date is required'
                break
            case 'clientName':
                if (!value) error[name] = 'Client name is required'
                else if(specialCharacters.some((char) => value.includes(char))) error[name] = 'No special characters are allowed in this field.'
                break
            case 'clientMobileNumber':
                if (!value) error[name] = 'Mobile number is required'
                else if (!/^\d+$/.test(value)) error[name] = 'Mobile number must be numeric'
                else if(value.length !== 10) error[name] = 'Mobile number length must be 10 digits.'
                break
            case 'principleAmount':
                if (!value) error[name] = 'Principle amount is required'
                else if (!/^\d+$/.test(value)) error[name] = 'Principle amount must be numeric'
                break
            case 'rateOfInterest':
                if (!value) error[name] = 'Rate of interest is required'
                else if (isNaN(parseFloat(value))) error[name] = 'Rate of interest must be a number'
                break
            default:
                break
        }
        console.log('error',error)
        return error
    }

    let handleInput = (event) => {
        const { name, value } = event.target
        setClientObject({
            ...clientObject,
            [name]: value,
        })
        setErrors({
            ...errors,
            ...formValidations(name, value),
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
        const newErrors = {}
        Object.keys(clientObject).forEach((key) => {
            const error = formValidations(key, clientObject[key])
            if (Object.keys(error).length > 0) {
                newErrors[key] = error[key]
            }
        })
        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors)
        } else {
            alert('Client added successfully.')
            setClientArray([...clientArray, clientObject])
            setClientObject({
                startingDate: '',
                clientName: '',
                clientMobileNumber: '',
                principleAmount: '',
                rateOfInterest: '',
            })
        }
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
                        {errors.startingDate && <span className="error">{errors.startingDate}</span>}
                    </li>
                    <li>
                        <input
                            type="text"
                            placeholder="Client name"
                            name="clientName"
                            value={clientObject.clientName}
                            onChange={handleInput}
                        />
                        {errors.clientName && <span className="error">{errors.clientName}</span>}
                    </li>
                    <li>
                        <input
                            type="text"
                            placeholder="Mobile number"
                            name="clientMobileNumber"
                            value={clientObject.clientMobileNumber}
                            onChange={handleInput}
                        />
                        {errors.clientMobileNumber && <span className="error">{errors.clientMobileNumber}</span>}
                    </li>
                    <li>
                        <input
                            type="text"
                            placeholder="Principle amount"
                            name="principleAmount"
                            value={clientObject.principleAmount}
                            onChange={handleInput}
                        />
                        {errors.principleAmount && <span className="error">{errors.principleAmount}</span>}
                    </li>
                    <li>
                        <input
                            type="text"
                            placeholder="Rate of interest"
                            name="rateOfInterest"
                            value={clientObject.rateOfInterest}
                            onChange={handleInput}
                        />
                        {errors.rateOfInterest && <span className="error">{errors.rateOfInterest}</span>}
                    </li>
                    <li>
                        <button type="button" onClick={handleClick}>
                            Calculate
                        </button>
                    </li>
                </ul>
            </form>
        </div>
    )
}

export default Form



