
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

    let typeConversion = (clientArray) => {
        clientArray.forEach((client) => {
            client.clientMobileNumber = parseInt(client.clientMobileNumber)
            client.principleAmount = parseInt(client.principleAmount)
            client.rateOfInterest = parseFloat(client.rateOfInterest)
        })
        window.localStorage.setItem('clientArray', JSON.stringify(clientArray))
    }
    let formValidations = (name, value) => {
        let error = {}
        let specialCharacters = ['@', '#', '$', '%', '^', '&', '*', '(', ')', '=', '-', '+', '{', '}', '|', '/', ',', '<', '>', '?', '!']
        let capitalLetters = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'X', 'Y', 'Z']
        let smallLetters = []
        capitalLetters.map((eachLetter, index) => {
            smallLetters[index] = eachLetter.toLowerCase()
        })
        let numericNumbers = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
        switch (name) {
            case 'startingDate':
                if (!value) {
                    error[name] = 'Starting date is required.'
                }
                break
            case 'clientName':
                if (!value) {
                    error[name] = 'Client name is required.'
                }
                else if ((numericNumbers.some((number) => value.includes(number))) || (specialCharacters.some((specialChar) => value.includes(specialChar)))) {
                    error[name] = 'Only alphabets are allowed in this field.'
                }
                break
            case 'clientMobileNumber':
                if (!value) {
                    error[name] = 'Mobile number is required.'
                }
                else if ((capitalLetters.some((capitalChar) => value.includes(capitalChar))) || (specialCharacters.some((specialChar) => value.includes(specialChar))) || (smallLetters.some((smallChar) => value.includes(smallChar)))) {
                    error[name] = 'Only numbers are allowed in this field.'
                }
                else if (value.length !== 10) {
                    error[name] = 'Mobile number length must be 10 digits.'
                }
                break
            case 'principleAmount':
                if (!value) {
                    error[name] = 'Principle amount is required.'
                }
                else if ((capitalLetters.some((capitalChar) => value.includes(capitalChar))) || (specialCharacters.some((specialChar) => value.includes(specialChar))) || (smallLetters.some((smallChar) => value.includes(smallChar)))) {
                    error[name] = 'Only numbers are allowed in this field.'
                }
                break
            case 'rateOfInterest':
                if (!value) error[name] = 'Rate of interest is required.'
                else if ((capitalLetters.some((capitalChar) => value.includes(capitalChar))) || (specialCharacters.some((specialChar) => value.includes(specialChar))) || (smallLetters.some((smallChar) => value.includes(smallChar)))) {
                    error[name] = 'Only numbers are allowed in this field.'
                }
                break
            default:
                break  
        }
        return error
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


    useEffect(() => {
        const timer = setTimeout(() => {
            setErrors({})
        }, 5000)


        return () => clearTimeout(timer)
    }, [errors])

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



