import React, { useState } from 'react';
import { XIcon } from './Icons.tsx';
import { User, Client } from '../types.ts';

interface ApplicationModalProps {
  isOpen: boolean;
  onClose: () => void;
  applicationType: 'Guard' | 'Client';
  onSubmit: (type: 'New Guard' | 'New Client', name: string, data: Partial<User & Client>) => void;
}

const ApplicationModal: React.FC<ApplicationModalProps> = ({ isOpen, onClose, applicationType, onSubmit }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const type = applicationType === 'Guard' ? 'New Guard' : 'New Client';
    
    // This is a simplified data structure for the initial application.
    // The full profile completion will happen after approval as per the spec.
    const data = applicationType === 'Guard' 
      ? { firstName: name.split(' ')[0] || '', lastName: name.split(' ').slice(1).join(' ') || '', email }
      : { companyName: name, contactEmail: email };
    
    const applicantName = applicationType === 'Guard' ? name : (data as Partial<Client>).companyName || 'New Client';

    onSubmit(type, applicantName, data);
    
    // Reset form for next time
    setName('');
    setEmail('');
  };
  
  const isGuard = applicationType === 'Guard';

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4" onClick={onClose} role="dialog" aria-modal="true">
      <div className="relative bg-[var(--bg-secondary)] border border-[var(--border-primary)] rounded-lg p-6 w-full max-w-md shadow-xl" onClick={e => e.stopPropagation()}>
        <h2 className="text-2xl font-bold text-center mb-2 text-[var(--text-primary)]">Apply to Join SSS</h2>
        <p className="text-center text-[var(--text-secondary)] mb-6">Complete the form below to start your application as a {applicationType}.</p>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-[var(--text-primary)]">{isGuard ? 'Full Name' : 'Company Name'}</label>
            <input type="text" id="name" value={name} onChange={e => setName(e.target.value)} className="mt-1 block w-full bg-[var(--bg-primary)] border border-[var(--border-secondary)] rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-[var(--accent-primary)] focus:border-[var(--accent-primary)] sm:text-sm text-[var(--text-primary)]" required/>
          </div>
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-[var(--text-primary)]">{isGuard ? 'Email Address' : 'Contact Email'}</label>
            <input type="email" id="email" value={email} onChange={e => setEmail(e.target.value)} className="mt-1 block w-full bg-[var(--bg-primary)] border border-[var(--border-secondary)] rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-[var(--accent-primary)] focus:border-[var(--accent-primary)] sm:text-sm text-[var(--text-primary)]" required/>
          </div>
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
