import React, { useState, useEffect } from 'react';
import { User, Client, Site, Contract } from '../../types';
import * as db from '../../database';
import * as Icons from '../Icons';

// FIX: Destructure user from props to make it available in the component.
const PostMission: React.FC<{ user: User }> = ({ user }) => {
    const [client, setClient] = useState<Client | null>(null);
    const [sites, setSites] = useState<Site[]>([]);
    const [contracts, setContracts] = useState<Contract[]>([]);
    
    const [title, setTitle] = useState('');
    const [siteId, setSiteId] = useState('');
    const [contractId, setContractId] = useState('');
    const [startTime, setStartTime] = useState('');
    const [endTime, setEndTime] = useState('');
    const [payRate, setPayRate] = useState(25);
    const [requiredGuards, setRequiredGuards] = useState(1);
    const [requiredLevel, setRequiredLevel] = useState(1);
    const [description, setDescription] = useState('');

    useEffect(() => {
        const currentClient = db.getClients().find(c => c.userId === user.id);
        if (currentClient) {
            setClient(currentClient);
            setSites(db.getSites().filter(s => s.clientId === currentClient.id));
            setContracts(db.getContracts().filter(c => c.clientId === currentClient.id && c.status === 'Active'));
        }
    }, [user.id]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!client || !siteId || !contractId || !startTime || !endTime) {
            alert('Please fill all required fields');
            return;
        }

        const newMission = {
            title,
            clientId: client.id,
            siteId,
            contractId,
            startTime: new Date(startTime),
            endTime: new Date(endTime),
            payRate: Number(payRate),
            requiredGuards: Number(requiredGuards),
            requiredLevel: Number(requiredLevel),
            requiredCerts: [],
            description,
        };

        db.addMission(newMission);
        alert('Mission posted successfully!');
        // Reset form
        setTitle('');
        setSiteId('');
        setContractId('');
        setStartTime('');
        setEndTime('');
        setPayRate(25);
        setRequiredGuards(1);
        setRequiredLevel(1);
        setDescription('');
    };
    
    if (!client) {
        return <div className="text-center p-8 bg-white rounded-lg shadow-sm">Your client profile could not be loaded. Please contact support.</div>;
    }

    return (
        <div className="animate-in max-w-4xl mx-auto" style={{ animationDelay: "100ms", opacity: 0, transform: "translateY(10px)" }}>
            <h1 className="text-3xl font-bold text-gray-800 mb-6">Post a New Mission</h1>
            <form onSubmit={handleSubmit} className="bg-white p-8 border border-gray-200 rounded-lg shadow-md space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Mission Title</label>
                        <input type="text" value={title} onChange={e => setTitle(e.target.value)} required className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-blue-500 focus:border-blue-500" />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Contract</label>
                        <select value={contractId} onChange={e => setContractId(e.target.value)} required className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 bg-white focus:ring-blue-500 focus:border-blue-500">
                            <option value="">Select a contract</option>
                            {contracts.map(c => <option key={c.id} value={c.id}>{c.title}</option>)}
                        </select>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Site</label>
                        <select value={siteId} onChange={e => setSiteId(e.target.value)} required className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 bg-white focus:ring-blue-500 focus:border-blue-500">
                            <option value="">Select a site</option>
                            {sites.map(s => <option key={s.id} value={s.id}>{s.name}</option>)}
                        </select>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Start Time</label>
                        <input type="datetime-local" value={startTime} onChange={e => setStartTime(e.target.value)} required className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-blue-500 focus:border-blue-500" />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">End Time</label>
                        <input type="datetime-local" value={endTime} onChange={e => setEndTime(e.target.value)} required className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-blue-500 focus:border-blue-500" />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Pay Rate ($/hr)</label>
                        <input type="number" min="15" value={payRate} onChange={e => setPayRate(Number(e.target.value))} required className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-blue-500 focus:border-blue-500" />
                    </div>
                     <div>
                        <label className="block text-sm font-medium text-gray-700">Required Guards</label>
                        <input type="number" min="1" value={requiredGuards} onChange={e => setRequiredGuards(Number(e.target.value))} required className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-blue-500 focus:border-blue-500" />
                    </div>
                     <div>
                        <label className="block text-sm font-medium text-gray-700">Required Guard Level</label>
                        <input type="number" min="1" max="5" value={requiredLevel} onChange={e => setRequiredLevel(Number(e.target.value))} required className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-blue-500 focus:border-blue-500" />
                    </div>
                </div>
                 <div>
                    <label className="block text-sm font-medium text-gray-700">Description / Instructions</label>
                    <textarea value={description} onChange={e => setDescription(e.target.value)} rows={4} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-blue-500 focus:border-blue-500"></textarea>
                </div>
                <div className="text-right">
                    <button type="submit" className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                        <Icons.PlusCircle className="w-5 h-5 mr-2" />
                        Post Mission
                    </button>
                </div>
            </form>
        </div>
    );
};

export default PostMission;
