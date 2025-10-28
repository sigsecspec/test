import React, { useState, useEffect } from 'react';
import type { Client, Mission, User, Site, Contract } from '../../types.ts';
import { getTrainingModules } from '../../database.ts';

interface PostMissionProps {
    clients: Client[];
    sites: Site[];
    contracts: Contract[];
    onAddMission: (missionData: Omit<Mission, 'id' | 'status' | 'claimedBy' | 'checkIns' | 'checkOuts' | 'reports'>) => void;
    user: User;
}

const PostMission: React.FC<PostMissionProps> = ({ clients, sites, contracts, onAddMission, user }) => {
    const [title, setTitle] = useState('');
    const [site, setSite] = useState('');
    const [description, setDescription] = useState('');
    const [startTime, setStartTime] = useState('');
    const [endTime, setEndTime] = useState('');
    const [payRate, setPayRate] = useState(25);
    const [requiredLevel, setRequiredLevel] = useState(1);
    const [requiredTraining, setRequiredTraining] = useState<string[]>([]);
    const [requiredGuards, setRequiredGuards] = useState(1);
    const [selectedClient, setSelectedClient] = useState('');
    const [selectedContract, setSelectedContract] = useState('');
    const [message, setMessage] = useState('');

    const userClientProfile = clients.find(c => c.userId === user.id);
    const clientSites = sites.filter(s => s.clientId === selectedClient);
    const clientContracts = contracts.filter(c => c.clientId === selectedClient && c.status === 'Active');
    const guardTrainingModules = getTrainingModules().filter(m => m.type === 'guard');


    useEffect(() => {
        if (userClientProfile) {
            setSelectedClient(userClientProfile.id);
        } else if (clients.length > 0) {
            setSelectedClient(clients[0].id);
        }
    }, [clients, user, userClientProfile]);
    
    useEffect(() => {
        if (clientSites.length > 0) {
            setSite(clientSites[0].name);
        }
        if (clientContracts.length > 0) {
            setSelectedContract(clientContracts[0].id);
        }
    }, [clientSites, clientContracts]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!selectedClient || !selectedContract || !title || !site || !startTime || !endTime) {
            setMessage('Please fill out all required fields.');
            return;
        }

        onAddMission({
            clientId: selectedClient,
            contractId: selectedContract,
            title,
            site,
            description,
            startTime: new Date(startTime),
            endTime: new Date(endTime),
            payRate: Number(payRate),
            requiredLevel: Number(requiredLevel),
            requiredTraining,
            requiredGuards: Number(requiredGuards),
        });

        setMessage('Mission posted successfully!');
        // Reset form
        setTitle('');
        setSite(clientSites.length > 0 ? clientSites[0].name : '');
        setDescription('');
        setStartTime('');
        setEndTime('');
        setPayRate(25);
        setRequiredLevel(1);
        setRequiredTraining([]);
        setRequiredGuards(1);

        setTimeout(() => setMessage(''), 3000);
    };
    
    const canSubmit = clientSites.length > 0 && clientContracts.length > 0;

    const handleTrainingChange = (moduleId: string) => {
        setRequiredTraining(prev => 
            prev.includes(moduleId)
            ? prev.filter(id => id !== moduleId)
            : [...prev, moduleId]
        );
    };

    return (
        <div>
            <h2 className="text-2xl font-bold text-[var(--text-primary)] mb-4">Post a New Mission</h2>
            <div className="bg-[var(--bg-secondary)] border border-[var(--border-primary)] rounded-lg p-6 shadow-sm">
                <form onSubmit={handleSubmit} className="space-y-4">
                     <div>
                        <label htmlFor="client" className="block text-sm font-medium text-[var(--text-primary)]">Client</label>
                        <select 
                            id="client" 
                            value={selectedClient} 
                            onChange={e => setSelectedClient(e.target.value)} 
                            className="mt-1 block w-full bg-[var(--bg-secondary)] border border-[var(--border-secondary)] rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-[var(--accent-primary)] focus:border-[var(--accent-primary)] sm:text-sm text-[var(--text-primary)]"
                            disabled={!!userClientProfile}
                        >
                           {clients.map(c => <option key={c.id} value={c.id}>{c.companyName}</option>)}
                        </select>
                         {!!userClientProfile && <p className="text-xs text-[var(--text-secondary)] mt-1">Posting as {userClientProfile.companyName}.</p>}
                    </div>
                     <div>
                        <label htmlFor="contract" className="block text-sm font-medium text-[var(--text-primary)]">Contract</label>
                        <select 
                            id="contract" 
                            value={selectedContract} 
                            onChange={e => setSelectedContract(e.target.value)} 
                            className="mt-1 block w-full bg-[var(--bg-secondary)] border border-[var(--border-secondary)] rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-[var(--accent-primary)] focus:border-[var(--accent-primary)] sm:text-sm text-[var(--text-primary)]"
                            required
                        >
                           {clientContracts.map(c => <option key={c.id} value={c.id}>{c.title}</option>)}
                           {clientContracts.length === 0 && <option disabled>Please create and activate a contract first.</option>}
                        </select>
                    </div>
                     <div>
                        <label htmlFor="title" className="block text-sm font-medium text-[var(--text-primary)]">Mission Title</label>
                        <input type="text" id="title" value={title} onChange={e => setTitle(e.target.value)} className="mt-1 block w-full bg-[var(--bg-secondary)] border border-[var(--border-secondary)] rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-[var(--accent-primary)] focus:border-[var(--accent-primary)] sm:text-sm text-[var(--text-primary)]" required/>
                    </div>
                     <div>
                        <label htmlFor="site" className="block text-sm font-medium text-[var(--text-primary)]">Site / Location</label>
                        <select 
                            id="site" 
                            value={site} 
                            onChange={e => setSite(e.target.value)} 
                            className="mt-1 block w-full bg-[var(--bg-secondary)] border border-[var(--border-secondary)] rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-[var(--accent-primary)] focus:border-[var(--accent-primary)] sm:text-sm text-[var(--text-primary)]"
                            required
                        >
                           {clientSites.map(s => <option key={s.id} value={s.name}>{s.name} ({s.address})</option>)}
                           {clientSites.length === 0 && <option disabled>Please add a site first.</option>}
                        </select>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label htmlFor="startTime" className="block text-sm font-medium text-[var(--text-primary)]">Start Time</label>
                            <input type="datetime-local" id="startTime" value={startTime} onChange={e => setStartTime(e.target.value)} className="mt-1 block w-full bg-[var(--bg-secondary)] border border-[var(--border-secondary)] rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-[var(--accent-primary)] focus:border-[var(--accent-primary)] sm:text-sm text-[var(--text-primary)]" required/>
                        </div>
                        <div>
                            <label htmlFor="endTime" className="block text-sm font-medium text-[var(--text-primary)]">End Time</label>
                            <input type="datetime-local" id="endTime" value={endTime} onChange={e => setEndTime(e.target.value)} className="mt-1 block w-full bg-[var(--bg-secondary)] border border-[var(--border-secondary)] rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-[var(--accent-primary)] focus:border-[var(--accent-primary)] sm:text-sm text-[var(--text-primary)]" required/>
                        </div>
                    </div>
                     <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div>
                            <label htmlFor="payRate" className="block text-sm font-medium text-[var(--text-primary)]">Pay Rate ($/hr)</label>
                            <input type="number" id="payRate" value={payRate} onChange={e => setPayRate(Number(e.target.value))} className="mt-1 block w-full bg-[var(--bg-secondary)] border border-[var(--border-secondary)] rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-[var(--accent-primary)] focus:border-[var(--accent-primary)] sm:text-sm text-[var(--text-primary)]" required/>
                        </div>
                        <div>
                            <label htmlFor="requiredLevel" className="block text-sm font-medium text-[var(--text-primary)]">Required Level</label>
                            <input type="number" id="requiredLevel" min="1" max="5" value={requiredLevel} onChange={e => setRequiredLevel(Number(e.target.value))} className="mt-1 block w-full bg-[var(--bg-secondary)] border border-[var(--border-secondary)] rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-[var(--accent-primary)] focus:border-[var(--accent-primary)] sm:text-sm text-[var(--text-primary)]" required/>
                        </div>
                        <div>
                            <label htmlFor="requiredGuards" className="block text-sm font-medium text-[var(--text-primary)]"># of Guards</label>
                            <input type="number" id="requiredGuards" min="1" value={requiredGuards} onChange={e => setRequiredGuards(Number(e.target.value))} className="mt-1 block w-full bg-[var(--bg-secondary)] border border-[var(--border-secondary)] rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-[var(--accent-primary)] focus:border-[var(--accent-primary)] sm:text-sm text-[var(--text-primary)]" required/>
                        </div>
                    </div>
                     <div>
                        <label className="block text-sm font-medium text-[var(--text-primary)]">Required Training</label>
                        <div className="mt-2 grid grid-cols-2 md:grid-cols-3 gap-2">
                           {guardTrainingModules.map(module => (
                               <label key={module.id} className="flex items-center space-x-2 bg-[var(--bg-primary)] p-2 rounded-md border border-[var(--border-tertiary)]">
                                   <input type="checkbox" checked={requiredTraining.includes(module.id)} onChange={() => handleTrainingChange(module.id)} className="form-checkbox h-4 w-4 text-[var(--accent-primary)] focus:ring-[var(--accent-primary)] border-[var(--border-secondary)] rounded"/>
                                   <span className="text-sm text-[var(--text-primary)]">{module.title}</span>
                               </label>
                           ))}
                        </div>
                    </div>
                     <div>
                        <label htmlFor="description" className="block text-sm font-medium text-[var(--text-primary)]">Description</label>
                        <textarea id="description" value={description} onChange={e => setDescription(e.target.value)} rows={4} className="mt-1 block w-full bg-[var(--bg-secondary)] border border-[var(--border-secondary)] rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-[var(--accent-primary)] focus:border-[var(--accent-primary)] sm:text-sm text-[var(--text-primary)]"></textarea>
                    </div>
                    <div className="flex items-center justify-between">
                         <button type="submit" className="w-full bg-[var(--accent-primary)] text-[var(--accent-primary-text)] font-bold py-2.5 rounded-md hover:bg-opacity-90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-[var(--bg-secondary)] focus:ring-[var(--accent-primary)] transition disabled:bg-opacity-50 disabled:cursor-not-allowed" disabled={!canSubmit}>
                            Post Mission
                        </button>
                    </div>
                    {message && <p className="text-sm text-center mt-4 text-green-500">{message}</p>}
                </form>
            </div>
        </div>
    );
};

export default PostMission;
