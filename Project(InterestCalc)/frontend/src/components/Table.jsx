import React, { useEffect, useState } from 'react'
import Axios from 'axios'
import '../styles/Table.css'

function Table() {
  const [displayClients, setDisplayClients] = useState([])

  let typeConversion = (dbResponseData) => {
    dbResponseData.map((tempClient) => {
      tempClient.clientMobileNumber = parseInt(tempClient.clientMobileNumber)
      tempClient.principleAmount = parseInt(tempClient.principleAmount)
      tempClient.rateOfInterest = parseFloat(tempClient.rateOfInterest)
    })

    return dbResponseData
  }
  let findingMonthsDuration = (startingDate) => {
    let ending_date = new Date()
    let starting_date = new Date(startingDate)

    let yearDifference = ((ending_date.getFullYear() - starting_date.getFullYear()) * 12)
    let monthDifference = ((ending_date.getMonth() + 1) - (starting_date.getMonth() + 1))
    let dateDifference = ((ending_date.getDate() - starting_date.getDate()) * (1 / 31))

    monthDifference += (yearDifference + dateDifference)

    return parseFloat(monthDifference.toFixed(2))
  }
  let findingInterest = (principle_amount,rate_of_interest,time_duration) => {
    return parseFloat(((principle_amount * rate_of_interest * time_duration) / 100).toFixed(2))
  }
  let findingTotalAmount = (Principle_Amount,Interest) => {
    return parseFloat((Principle_Amount + Interest).toFixed(2))
  }
  useEffect(() => {
    Axios.post('http://localhost:8080').then((dbResponse) => {
      if (dbResponse.data) {
        let typeConvertedData = typeConversion(dbResponse.data)
        console.log('typeConvertedData', typeConvertedData)
        setDisplayClients(typeConvertedData)
      }
      else {
        console.log('No data found.')
      }
    })
  }, [])
  let clientDeletion = (clientId) => {
    console.log('This is clientDeletion function.',clientId)
    Axios.delete(`http://localhost:8080/client_deletion/${clientId}`)
    setDisplayClients(displayClients.filter(client => client._id !== clientId))
  }
  return (
    <div className="table-container">
      <h2 className="table-header">Client Table</h2>
      <table>
        <thead>
          <tr className="table-row">
            <th className="table-cell">Starting date</th>
            <th className="table-cell">Client Name</th>
            <th className="table-cell">Mobile Number</th>
            <th className="table-cell">Principal Amount</th>
            <th className="table-cell">Rate of Interest</th>
            <th className="table-cell">Time in months</th>
            <th className="table-cell">Interest</th>
            <th className="table-cell">Total amount</th>
            <th className="table-cell">Actions</th>
          </tr>
        </thead>
        <tbody>
          {displayClients.map((client, index) => (
            <tr key={index} className="table-row">
              <td className="table-cell">{client.startingDate}</td>
              <td className="table-cell">{client.clientName}</td>
              <td className="table-cell">{client.clientMobileNumber}</td>
              <td className="table-cell">{client.principleAmount}</td>
              <td className="table-cell">{client.rateOfInterest}</td>
              <td className="table-cell">{findingMonthsDuration(client.startingDate)}</td>
              <td className="table-cell">{findingInterest(client.principleAmount,client.rateOfInterest,findingMonthsDuration(client.startingDate))}</td>
              <td className="table-cell">{findingTotalAmount(client.principleAmount,findingInterest(client.principleAmount,client.rateOfInterest,findingMonthsDuration(client.startingDate)))}</td>
              <td className="table-cell">
                <button className='deleteButton' onClick={() => clientDeletion(client._id)}>Delete</button>
              </td>

            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default Table



