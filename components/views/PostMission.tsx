import React, { useState, useEffect } from 'react';
import type { Client, Mission, User } from '../../types';

interface PostMissionProps {
    clients: Client[];
    onAddMission: (missionData: Omit<Mission, 'id' | 'status' | 'claimedBy'>) => void;
    user: User;
}

const PostMission: React.FC<PostMissionProps> = ({ clients, onAddMission, user }) => {
    const [title, setTitle] = useState('');
    const [site, setSite] = useState('');
    const [description, setDescription] = useState('');
    const [startTime, setStartTime] = useState('');
    const [endTime, setEndTime] = useState('');
    const [payRate, setPayRate] = useState(25);
    const [requiredLevel, setRequiredLevel] = useState(1);
    const [selectedClient, setSelectedClient] = useState('');
    const [message, setMessage] = useState('');

    useEffect(() => {
        // If the current user is a client, find their associated client profile
        const userClientProfile = clients.find(c => c.userId === user.id);
        if (userClientProfile) {
            setSelectedClient(userClientProfile.id);
        } else if (clients.length > 0) {
            // Otherwise, default to the first client in the list (for management roles)
            setSelectedClient(clients[0].id);
        }
    }, [clients, user]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!selectedClient || !title || !site || !startTime || !endTime) {
            setMessage('Please fill out all required fields.');
            return;
        }

        onAddMission({
            clientId: selectedClient,
            title,
            site,
            description,
            startTime: new Date(startTime),
            endTime: new Date(endTime),
            payRate: Number(payRate),
            requiredLevel: Number(requiredLevel),
        });

        setMessage('Mission posted successfully!');
        // Reset form
        setTitle('');
        setSite('');
        setDescription('');
        setStartTime('');
        setEndTime('');
        setPayRate(25);
        setRequiredLevel(1);

        setTimeout(() => setMessage(''), 3000);
    };
    
    const userClientProfile = clients.find(c => c.userId === user.id);

    return (
        <div>
            <h2 className="text-2xl font-bold text-[#c4c4c4] mb-4">Post a New Mission</h2>
            <div className="bg-[#0f0f0f] border border-[#535347] rounded-lg p-6">
                <form onSubmit={handleSubmit} className="space-y-4">
                     <div>
                        <label htmlFor="client" className="block text-sm font-medium text-[#c4c4c4]">Client</label>
                        <select 
                            id="client" 
                            value={selectedClient} 
                            onChange={e => setSelectedClient(e.target.value)} 
                            className="mt-1 block w-full bg-[#0f0f0f] border border-[#535347] rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-[#aeae5a] focus:border-[#aeae5a] sm:text-sm text-[#c4c4c4]"
                            disabled={!!userClientProfile} // Disable if the user is a client
                        >
                           {clients.map(c => <option key={c.id} value={c.id}>{c.companyName}</option>)}
                        </select>
                         {!!userClientProfile && <p className="text-xs text-[#787876] mt-1">Posting as {userClientProfile.companyName}.</p>}
                    </div>
                     <div>
                        <label htmlFor="title" className="block text-sm font-medium text-[#c4c4c4]">Mission Title</label>
                        <input type="text" id="title" value={title} onChange={e => setTitle(e.target.value)} className="mt-1 block w-full bg-[#0f0f0f] border border-[#535347] rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-[#aeae5a] focus:border-[#aeae5a] sm:text-sm text-[#c4c4c4]" required/>
                    </div>
                     <div>
                        <label htmlFor="site" className="block text-sm font-medium text-[#c4c4c4]">Site / Location</label>
                        <input type="text" id="site" value={site} onChange={e => setSite(e.target.value)} className="mt-1 block w-full bg-[#0f0f0f] border border-[#535347] rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-[#aeae5a] focus:border-[#aeae5a] sm:text-sm text-[#c4c4c4]" required/>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label htmlFor="startTime" className="block text-sm font-medium text-[#c4c4c4]">Start Time</label>
                            <input type="datetime-local" id="startTime" value={startTime} onChange={e => setStartTime(e.target.value)} className="mt-1 block w-full bg-[#0f0f0f] border border-[#535347] rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-[#aeae5a] focus:border-[#aeae5a] sm:text-sm text-[#c4c4c4]" required/>
                        </div>
                        <div>
                            <label htmlFor="endTime" className="block text-sm font-medium text-[#c4c4c4]">End Time</label>
                            <input type="datetime-local" id="endTime" value={endTime} onChange={e => setEndTime(e.target.value)} className="mt-1 block w-full bg-[#0f0f0f] border border-[#535347] rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-[#aeae5a] focus:border-[#aeae5a] sm:text-sm text-[#c4c4c4]" required/>
                        </div>
                    </div>
                     <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label htmlFor="payRate" className="block text-sm font-medium text-[#c4c4c4]">Pay Rate ($/hr)</label>
                            <input type="number" id="payRate" value={payRate} onChange={e => setPayRate(Number(e.target.value))} className="mt-1 block w-full bg-[#0f0f0f] border border-[#535347] rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-[#aeae5a] focus:border-[#aeae5a] sm:text-sm text-[#c4c4c4]" required/>
                        </div>
                        <div>
                            <label htmlFor="requiredLevel" className="block text-sm font-medium text-[#c4c4c4]">Required Level</label>
                            <input type="number" id="requiredLevel" min="1" max="5" value={requiredLevel} onChange={e => setRequiredLevel(Number(e.target.value))} className="mt-1 block w-full bg-[#0f0f0f] border border-[#535347] rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-[#aeae5a] focus:border-[#aeae5a] sm:text-sm text-[#c4c4c4]" required/>
                        </div>
                    </div>
                     <div>
                        <label htmlFor="description" className="block text-sm font-medium text-[#c4c4c4]">Description</label>
                        <textarea id="description" value={description} onChange={e => setDescription(e.target.value)} rows={4} className="mt-1 block w-full bg-[#0f0f0f] border border-[#535347] rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-[#aeae5a] focus:border-[#aeae5a] sm:text-sm text-[#c4c4c4]"></textarea>
                    </div>
                    <div className="flex items-center justify-between">
                         <button type="submit" className="w-full bg-[#aeae5a] text-[#0f0f0f] font-bold py-2.5 rounded-md hover:bg-opacity-90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-[#0f0f0f] focus:ring-[#aeae5a] transition">
                            Post Mission
                        </button>
                    </div>
                    {message && <p className="text-sm text-center mt-4 text-green-400">{message}</p>}
                </form>
            </div>
        </div>
    );
};

export default PostMission;