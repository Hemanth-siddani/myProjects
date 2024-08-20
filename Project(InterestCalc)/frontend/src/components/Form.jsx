

import React, { useEffect, useState } from 'react'
import '../styles/Form.css'
import Axios from 'axios'

function Form() {
    const [errorMessage, setErrorMessage] = useState('')
    const [clientObject, setClientObject] = useState({
        startingDate: '',
        clientName: '',
        clientMobileNumber: '',
        principleAmount: '',
        rateOfInterest: '',
    })

    useEffect(() => {
        const timer = setTimeout(() => {
            setErrorMessage('')
        }, 8000)
        return () => clearTimeout(timer)
    }, [errorMessage])

    const handleInput = (event) => {
        const { name, value } = event.target
        setClientObject({
            ...clientObject,
            [name]: value,
        })
    }

    const formValidation = (event) => {
        const { startingDate, clientName, clientMobileNumber, principleAmount, rateOfInterest } = clientObject
        if (!startingDate || !clientName || !clientMobileNumber || !principleAmount || !rateOfInterest) {
            setErrorMessage('Must fill all the fields.');
            return false;
        }
        if (!startingDate) {
            setErrorMessage('Starting date is required')
            return false
        }

        for (let i = 0; i < clientName.length; i++) {
            const charCode = clientName.charCodeAt(i)
            if (!(charCode >= 65 && charCode <= 90) && // A-Z
                !(charCode >= 97 && charCode <= 122) && // a-z
                charCode !== 32) { // space
                setErrorMessage('Client name must contain only alphabets and spaces')
                return false
            }
        }

        if (clientMobileNumber.length !== 10 || isNaN(clientMobileNumber)) {
            setErrorMessage('Client mobile number must be exactly 10 digits and only contain numbers')
            return false
        }

        if (isNaN(principleAmount) || principleAmount <= 0) {
            setErrorMessage('Principle amount must be a positive number')
            return false
        }
        if (isNaN(rateOfInterest) || rateOfInterest <= 0 || rateOfInterest > 100) {
            setErrorMessage('Rate of interest must be a number between 1 and 100')
            return false
        }
        return true
    }

    const handleClick = async () => {
        if (formValidation()) {
            try {
                const response = await Axios.post('http://localhost:8080/', clientObject)
                console.log('Server response:', response.data)

                setClientObject({
                    startingDate: '',
                    clientName: '',
                    clientMobileNumber: '',
                    principleAmount: '',
                    rateOfInterest: '',
                })
            } catch (error) {
                console.error('Error while submitting the form data:', error)
            }
        }
    }

    return (
        <div className="glass-form">
            <form>
                <div className="form-group">
                    <label htmlFor="startingDate">Starting date</label>
                    <input
                        type="date"
                        name="startingDate"
                        value={clientObject.startingDate}
                        onChange={handleInput}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="clientName">Client name</label>
                    <input
                        type="text"
                        name="clientName"
                        value={clientObject.clientName}
                        onChange={handleInput}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="clientMobileNumber">Client mobile number</label>
                    <input
                        type="text"
                        name="clientMobileNumber"
                        value={clientObject.clientMobileNumber}
                        onChange={handleInput}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="principleAmount">Principle amount</label>
                    <input
                        type="text"
                        name="principleAmount"
                        value={clientObject.principleAmount}
                        onChange={handleInput}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="rateOfInterest">Rate of interest</label>
                    <input
                        type="text"
                        name="rateOfInterest"
                        value={clientObject.rateOfInterest}
                        onChange={handleInput}
                        required
                    />
                </div>
                <button type="button" className="submit-button" onClick={handleClick}>
                    Add client
                </button>
                {errorMessage && <p className='errorMessage'>{errorMessage}</p>}
            </form>
        </div>
    )
}

export default Form


