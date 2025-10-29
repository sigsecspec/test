import React, { useState, useEffect } from 'react';
import { User, Client } from '../../types';
import * as db from '../../database';
import * as Icons from '../Icons';

const ClientManagement: React.FC<{ user: User }> = () => {
    const [clients, setClients] = useState<Client[]>([]);

    useEffect(() => {
        setClients(db.getClients());
    }, []);

    return (
        <div className="animate-in" style={{ animationDelay: "100ms", opacity: 0, transform: "translateY(10px)" }}>
            <h1 className="text-3xl font-bold text-gray-800 mb-6">Client Management</h1>
             <div className="bg-white shadow-md rounded-lg overflow-hidden">
                <table className="min-w-full leading-normal">
                    <thead>
                        <tr className="bg-gray-100 text-left text-gray-600 uppercase text-sm">
                            <th className="px-5 py-3">Company Name</th>
                            <th className="px-5 py-3">Contact Email</th>
                            <th className="px-5 py-3">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {clients.map(client => (
                            <tr key={client.id} className="border-b border-gray-200 hover:bg-gray-50">
                                <td className="px-5 py-4 text-sm">
                                    <p className="text-gray-900 whitespace-no-wrap">{client.companyName}</p>
                                </td>
                                <td className="px-5 py-4 text-sm">{client.contactEmail}</td>
                                <td className="px-5 py-4 text-sm">
                                    <button className="text-blue-600 hover:text-blue-900">View Contracts</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ClientManagement;