import React, { useState } from 'react';
import { XIcon } from './Icons.tsx';
import { User, Client } from '../types.ts';

interface ApplicationModalProps {
  isOpen: boolean;
  onClose: () => void;
  applicationType: 'Guard' | 'Client' | 'Supervisor' | 'Operations' | 'Management';
  onSubmit: (type: 'New Guard' | 'New Client' | 'New Supervisor' | 'New Operations' | 'New Management', name: string, data: Partial<User & Client>, teamCode?: string) => void;
}

const ApplicationModal: React.FC<ApplicationModalProps> = ({ isOpen, onClose, applicationType, onSubmit }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [teamCode, setTeamCode] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    let type: 'New Guard' | 'New Client' | 'New Supervisor' | 'New Operations' | 'New Management';
    let data: Partial<User & Client>;
    
    switch (applicationType) {
        case 'Client':
            type = 'New Client';
            data = { companyName: name, contactEmail: email };
            break;
        case 'Supervisor':
            type = 'New Supervisor';
            data = { firstName: name.split(' ')[0] || '', lastName: name.split(' ').slice(1).join(' ') || '', email };
            break;
        case 'Operations':
             type = 'New Operations';
             data = { firstName: name.split(' ')[0] || '', lastName: name.split(' ').slice(1).join(' ') || '', email };
             break;
        case 'Management':
             type = 'New Management';
             data = { firstName: name.split(' ')[0] || '', lastName: name.split(' ').slice(1).join(' ') || '', email };
             break;
        default: // Guard
            type = 'New Guard';
            data = { firstName: name.split(' ')[0] || '', lastName: name.split(' ').slice(1).join(' ') || '', email };
            break;
    }
    
    const applicantName = (applicationType === 'Client') ? (data as Partial<Client>).companyName || 'New Client' : name;

    onSubmit(type, applicantName, data, teamCode);
    
    setName('');
    setEmail('');
    setTeamCode('');
  };
  
  const isPerson = applicationType !== 'Client';

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4" onClick={onClose} role="dialog" aria-modal="true">
      <div className="relative bg-[var(--bg-secondary)] border border-[var(--border-primary)] rounded-lg p-6 w-full max-w-md shadow-xl" onClick={e => e.stopPropagation()}>
        <h2 className="text-2xl font-bold text-center mb-2 text-[var(--text-primary)]">Apply to Join SSS</h2>
        <p className="text-center text-[var(--text-secondary)] mb-6">Complete the form below to start your application as a {applicationType}.</p>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-[var(--text-primary)]">{isPerson ? 'Full Name' : 'Company Name'}</label>
            <input type="text" id="name" value={name} onChange={e => setName(e.target.value)} className="mt-1 block w-full bg-[var(--bg-primary)] border border-[var(--border-secondary)] rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-[var(--accent-primary)] focus:border-[var(--accent-primary)] sm:text-sm text-[var(--text-primary)]" required/>
          </div>
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-[var(--text-primary)]">{isPerson ? 'Email Address' : 'Contact Email'}</label>
            <input type="email" id="email" value={email} onChange={e => setEmail(e.target.value)} className="mt-1 block w-full bg-[var(--bg-primary)] border border-[var(--border-secondary)] rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-[var(--accent-primary)] focus:border-[var(--accent-primary)] sm:text-sm text-[var(--text-primary)]" required/>
          </div>
          {isPerson && (
            <div>
              <label htmlFor="teamCode" className="block text-sm font-medium text-[var(--text-primary)]">Operations Team Code (Optional)</label>
              <input type="text" id="teamCode" value={teamCode} onChange={e => setTeamCode(e.target.value)} placeholder="e.g., #JAAM10141525" className="mt-1 block w-full bg-[var(--bg-primary)] border border-[var(--border-secondary)] rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-[var(--accent-primary)] focus:border-[var(--accent-primary)] sm:text-sm text-[var(--text-primary)]" />
            </div>
          )}
          <button type="submit" className="w-full bg-[var(--accent-primary)] text-[var(--accent-primary-text)] font-bold py-2.5 rounded-md hover:bg-opacity-90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-[var(--bg-secondary)] focus:ring-[var(--accent-primary)] transition">
            Submit Application
          </button>
        </form>
        <button onClick={onClose} className="absolute top-3 right-3 text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors" aria-label="Close application modal">
          <XIcon className="w-6 h-6" />
        </button>
      </div>
    </div>
  );
};

export default ApplicationModal;
