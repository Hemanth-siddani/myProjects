
// import React, { useState } from 'react';
// import '../styles/Form.css';
// import Axios from 'axios';

// function Form() {
//     const [errorObject,setErrorObject] = useState({
//         startingDate: '',
//         clientName: '',
//         clientMobileNumber: '',
//         principleAmount: '',
//         rateOfInterest: '',
//     })
//     const [clientObject, setClientObject] = useState({
//         startingDate: '',
//         clientName: '',
//         clientMobileNumber: '',
//         principleAmount: '',
//         rateOfInterest: '',
//     });
//     let formValidation = (keyName,Value) => {
//         // console.log('\nkeyName',keyName,'\nValue',Value)
//         let error = ''
//         switch(keyName) {
//             case 'startingDate':
//                 if(!Value) {
//                     console.log(keyName)
//                     error = 'This field is required.'
//                 }
//                 break
//             case 'clientName':
//                 if(!Value) {
//                     console.log(keyName)
//                     error = 'This field is required.'
//                 }
//                 break
//             case 'clientMobileNumber':
//                 if(!Value) {
//                     console.log(keyName)
//                     error = 'This field is required.'
//                 }
//                 break
//             case 'principleAmount':
//                 if(!Value) {
//                     console.log(keyName)
//                     error = 'This field is required.'
//                 }
//                 break
//             case 'rateOfInterest':
//                 if(!Value) {
//                     console.log(keyName)
//                     error = 'This field is required.'
//                 }
//                 break
//             default:
//                 console.log('Invalid data')         
//         }
//         setErrorObject({
//             ...errorObject,
//             [keyName]: error
//         })
//     }
//     const handleInput = (event) => {
//         const { name, value } = event.target;
//         setClientObject({
//             ...clientObject,
//             [name]: value,
//         });
//         formValidation(name,value)
//     };

//     const handleClick = async () => {
//         if (Object.values(clientObject).every(val => val !== '')) {
//             try {
//                 const response = await Axios.post('http://localhost:8080/', clientObject);
//                 console.log('Server response:', response.data);

//                 setClientObject({
//                     startingDate: '',
//                     clientName: '',
//                     clientMobileNumber: '',
//                     principleAmount: '',
//                     rateOfInterest: '',
//                 });
//             } catch (error) {
//                 console.error('Error while submitting the form data:', error);
//             }
//         } 
//     };

//     return (
//         <>
//             <div className="glass-form">
//                 <form>
//                     <div className="form-group">
//                         <label htmlFor="startingDate">Starting date</label>
//                         <input
//                             type="date"
//                             name="startingDate"
//                             value={clientObject.startingDate}
//                             onChange={handleInput}
//                         />
//                         {!errorObject.startingDate && <p>{errorObject.startingDate}</p>}
//                     </div>
//                     <div className="form-group">
//                         <label htmlFor="clientName">Client name</label>
//                         <input
//                             type="text"
//                             name="clientName"
//                             value={clientObject.clientName}
//                             onChange={handleInput}
//                         />
//                         {errorObject.clientName && <p className='error'>{errorObject.clientName}</p>}
//                     </div>
//                     <div className="form-group">
//                         <label htmlFor="clientMobileNumber">Client mobile number</label>
//                         <input
//                             type="text"
//                             name="clientMobileNumber"
//                             value={clientObject.clientMobileNumber}
//                             onChange={handleInput}
//                         />
//                         {errorObject.clientMobileNumber && <p className='error'>{errorObject.clientMobileNumber}</p>}
//                     </div>
//                     <div className="form-group">
//                         <label htmlFor="principleAmount">Principle amount</label>
//                         <input
//                             type="text"
//                             name="principleAmount"
//                             value={clientObject.principleAmount}
//                             onChange={handleInput}
//                         />
//                         {errorObject.principleAmount && <p className='error'>{errorObject.principleAmount}</p>}
//                     </div>
//                     <div className="form-group">
//                         <label htmlFor="rateOfInterest">Rate of interest</label>
//                         <input
//                             type="text"
//                             name="rateOfInterest"
//                             value={clientObject.rateOfInterest}
//                             onChange={handleInput}
//                         />
//                         {errorObject.rateOfInterest && <p className='error'>{errorObject.rateOfInterest}</p>}
//                     </div>
//                     <button type="button" className="submit-button" onClick={handleClick}>
//                         Add client
//                     </button>
//                 </form>
//             </div>
//         </>
//     );
// }

// export default Form;


// ********************************************


import React, { useState } from 'react';
import '../styles/Form.css';
import Axios from 'axios';

function Form() {
    const [errorObject, setErrorObject] = useState({
        startingDate: '',
        clientName: '',
        clientMobileNumber: '',
        principleAmount: '',
        rateOfInterest: '',
    });
    
    const [clientObject, setClientObject] = useState({
        startingDate: '',
        clientName: '',
        clientMobileNumber: '',
        principleAmount: '',
        rateOfInterest: '',
    });

    let formValidation = (keyName, value) => {
        let error = '';
        switch (keyName) {
            case 'startingDate':
                if (!value) {
                    error = 'This field is required.';
                }
                break;
            case 'clientName':
                if (!value) {
                    error = 'This field is required.';
                }
                break;
            case 'clientMobileNumber':
                if (!value) {
                    error = 'This field is required.';
                }
                break;
            case 'principleAmount':
                if (!value) {
                    error = 'This field is required.';
                }
                break;
            case 'rateOfInterest':
                if (!value) {
                    error = 'This field is required.';
                }
                break;
            default:
                console.log('Invalid data');
        }
        setErrorObject({
            ...errorObject,
            [keyName]: error,
        });
    };

    const handleInput = (event) => {
        const { name, value } = event.target;
        setClientObject({
            ...clientObject,
            [name]: value,
        });
        formValidation(name, value);
    };

    const handleClick = async () => {
        if (Object.values(clientObject).every((val) => val !== '')) {
            try {
                const response = await Axios.post('http://localhost:8080/', clientObject);
                console.log('Server response:', response.data);

                setClientObject({
                    startingDate: '',
                    clientName: '',
                    clientMobileNumber: '',
                    principleAmount: '',
                    rateOfInterest: '',
                });
            } 
            catch (error) {
                console.error('Error while submitting the form data:', error);
            }
        }
    };

    return (
        <>
            <div className="glass-form">
                <form>
                    <div className="form-group">
                        <label htmlFor="startingDate">Starting date</label>
                        <input
                            type="date"
                            name="startingDate"
                            value={clientObject.startingDate}
                            onChange={handleInput}
                        />
                        {errorObject.startingDate && <p className="error">{errorObject.startingDate}</p>}
                    </div>
                    <div className="form-group">
                        <label htmlFor="clientName">Client name</label>
                        <input
                            type="text"
                            name="clientName"
                            value={clientObject.clientName}
                            onChange={handleInput}
                        />
                        {errorObject.clientName && <p className="error">{errorObject.clientName}</p>}
                    </div>
                    <div className="form-group">
                        <label htmlFor="clientMobileNumber">Client mobile number</label>
                        <input
                            type="text"
                            name="clientMobileNumber"
                            value={clientObject.clientMobileNumber}
                            onChange={handleInput}
                        />
                        {errorObject.clientMobileNumber && <p className="error">{errorObject.clientMobileNumber}</p>}
                    </div>
                    <div className="form-group">
                        <label htmlFor="principleAmount">Principle amount</label>
                        <input
                            type="text"
                            name="principleAmount"
                            value={clientObject.principleAmount}
                            onChange={handleInput}
                        />
                        {errorObject.principleAmount && <p className="error">{errorObject.principleAmount}</p>}
                    </div>
                    <div className="form-group">
                        <label htmlFor="rateOfInterest">Rate of interest</label>
                        <input
                            type="text"
                            name="rateOfInterest"
                            value={clientObject.rateOfInterest}
                            onChange={handleInput}
                        />
                        {errorObject.rateOfInterest && <p className="error">{errorObject.rateOfInterest}</p>}
                    </div>
                    <button type="button" className="submit-button" onClick={handleClick}>
                        Add client
                    </button>
                </form>
            </div>
        </>
    );
}

export default Form;



