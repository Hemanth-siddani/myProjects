import React, { useEffect, useState } from 'react';

function Table() {
    const [renderClient, setRenderClient] = useState([]);

    useEffect(() => {
        let data = window.localStorage.getItem('clientArray');
        let formattedData = JSON.parse(data);
        setRenderClient(formattedData || []);
    }, []);

    const deleteClient = (index) => {
        alert('Do you want to delete the client record?')
        let updatedClients = [...renderClient];
        updatedClients.splice(index, 1);
        setRenderClient(updatedClients);
        window.localStorage.setItem('clientArray', JSON.stringify(updatedClients));
    };

    const handleDelete = (index) => {
        deleteClient(index);
    };

    return (
        <div className="container mx-auto p-4">
            <div className="overflow-x-scroll overflow-y-scroll">
                <table className="min-w-full bg-white">
                    <thead>
                        <tr className="w-full bg-gray-300 font-bold text-left">
                            <th className="p-2">Date</th>
                            <th className="p-2">Client Name</th>
                            <th className="p-2">Mobile Number</th>
                            <th className="p-2">Principle Amount</th>
                            <th className="p-2">Rate of Interest</th>
                            <th className="p-2">Time in Months</th>
                            <th className="p-2">Interest</th>
                            <th className="p-2">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {renderClient.map((eachClient, index) => (
                            <tr key={index} className="w-full bg-white hover:bg-gray-100">
                                <td className="p-2">{eachClient.startingDate}</td>
                                <td className="p-2">{eachClient.clientName}</td>
                                <td className="p-2">{eachClient.clientMobileNumber}</td>
                                <td className="p-2">{eachClient.principleAmount}</td>
                                <td className="p-2">{eachClient.rateOfInterest}</td>
                                <td className="p-2">{eachClient.timeInMonths}</td>
                                <td className="p-2">{eachClient.resultantInterest}</td>
                                <td className="p-2">
                                    <button className="btn btn-sm btn-outline-danger" type="button" onClick={() => handleDelete(index)}>
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default Table;
