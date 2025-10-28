import React, { useState, useEffect } from 'react';
import type { Client, User } from '../../types';
import { XIcon, PlusCircleIcon } from '../Icons';

interface ManageClientModalProps {
    isOpen: boolean;
    onClose: () => void;
    clientToEdit?: Client | null;
    users: User[];
    onSave: (clientData: Partial<Client>, clientId?: string) => void;
}
const ManageClientModal: React.FC<ManageClientModalProps> = ({ isOpen, onClose, clientToEdit, users, onSave }) => {
    const [clientData, setClientData] = useState<Partial<Client>>({});

    useEffect(() => {
        setClientData(clientToEdit || { companyName: '', contactEmail: '', userId: null });
    }, [clientToEdit]);
    
    if (!isOpen) return null;

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setClientData(prev => ({ ...prev, [name]: value === 'null' ? null : value }));
    };

    const handleSave = (e: React.FormEvent) => {
        e.preventDefault();
        onSave(clientData, clientToEdit?.id);
        onClose();
    };

    const availableUsers = users.filter(u => u.role === 'Client');

    return (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4" onClick={onClose}>
            <form onSubmit={handleSave} className="relative bg-[#0f0f0f] border border-[#535347] rounded-lg p-6 w-full max-w-md" onClick={e => e.stopPropagation()}>
                <h3 className="text-lg font-bold text-[#c4c4c4] mb-4">{clientToEdit ? 'Edit Client' : 'Add New Client'}</h3>
                <div className="space-y-4">
                    <input name="companyName" value={clientData.companyName || ''} onChange={handleChange} placeholder="Company Name" required className="block w-full bg-[#1a1a1a] border border-[#535347] rounded-md py-2 px-3 text-[#c4c4c4]" />
                    <input name="contactEmail" type="email" value={clientData.contactEmail || ''} onChange={handleChange} placeholder="Contact Email" required className="block w-full bg-[#1a1a1a] border border-[#535347] rounded-md py-2 px-3 text-[#c4c4c4]" />
                    <select name="userId" value={clientData.userId || 'null'} onChange={handleChange} className="block w-full bg-[#1a1a1a] border border-[#535347] rounded-md py-2 px-3 text-[#c4c4c4]">
                        <option value="null">No Linked User Account</option>
                        {availableUsers.map(u => <option key={u.id} value={u.id}>{u.firstName} {u.lastName}</option>)}
                    </select>
                </div>
                <div className="flex justify-end mt-6">
                    <button type="submit" className="bg-[#aeae5a] text-[#0f0f0f] font-bold py-2 px-4 rounded-md hover:bg-opacity-90">Save Client</button>
                </div>
                <button type="button" onClick={onClose} className="absolute top-3 right-3 text-[#787876] hover:text-[#c4c4c4]"><XIcon className="h-6 w-6"/></button>
            </form>
        </div>
    );
};


interface ClientManagementProps {
  clients: Client[];
  users: User[];
  onAddClient: (data: Omit<Client, 'id' | 'userId' | 'whitelist' | 'blacklist'>, userId?: string) => void;
  onUpdateClient: (clientId: string, data: Partial<Client>) => void;
  onDeleteClient: (clientId: string) => void;
}

const ClientManagement: React.FC<ClientManagementProps> = ({ clients, users, onAddClient, onUpdateClient, onDeleteClient }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [clientToEdit, setClientToEdit] = useState<Client | null>(null);

  const handleSaveClient = (clientData: Partial<Client>, clientId?: string) => {
    if (clientId) {
      onUpdateClient(clientId, clientData);
    } else {
      onAddClient({ companyName: clientData.companyName || '', contactEmail: clientData.contactEmail || '' }, clientData.userId || undefined);
    }
  };

  const handleDelete = (clientId: string) => {
      if (window.confirm('Are you sure you want to delete this client? This will also cancel all their associated missions.')) {
          onDeleteClient(clientId);
      }
  };

  return (
    <>
    <div>
      <div className="flex justify-between items-center mb-4">
        <div>
          <h2 className="text-2xl font-bold text-[#c4c4c4]">Client Roster</h2>
          <p className="text-[#787876]">Manage all active client accounts.</p>
        </div>
        <button onClick={() => { setClientToEdit(null); setIsModalOpen(true); }} className="flex items-center bg-[#aeae5a] text-[#0f0f0f] font-bold py-2 px-4 rounded-md hover:bg-opacity-90 transition">
          <PlusCircleIcon className="h-5 w-5 mr-2" /> Add Client
        </button>
      </div>
      <div className="bg-[#0f0f0f] border border-[#535347] rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-[#535347]">
            <thead className="bg-[#535347]/20">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-[#c4c4c4] uppercase tracking-wider">Company Name</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-[#c4c4c4] uppercase tracking-wider">Primary Contact</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-[#c4c4c4] uppercase tracking-wider">Contact Email</th>
                <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-[#c4c4c4] uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#535347]/50">
                {clients.length > 0 ? (
                    clients.map((client) => {
                        const user = client.userId ? users.find(u => u.id === client.userId) : null;
                        return (
                        <tr key={client.id} className="hover:bg-[#535347]/10">
                        <td className="px-6 py-4 whitespace-nowrap"><div className="text-sm font-medium text-[#c4c4c4]">{client.companyName}</div></td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-[#c4c4c4]">{user ? `${user.firstName} ${user.lastName}` : 'N/A'}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-[#c4c4c4]">{client.contactEmail}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm">
                           <button onClick={() => { setClientToEdit(client); setIsModalOpen(true); }} className="text-[#aeae5a] hover:text-opacity-80 font-semibold">Edit</button>
                           <button onClick={() => handleDelete(client.id)} className="text-red-400 hover:text-red-300 font-semibold ml-4">Delete</button>
                        </td>
                        </tr>
                    )})
                ) : (
                    <tr><td colSpan={4} className="text-center p-12 text-[#787876]">No clients found.</td></tr>
                )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
    <ManageClientModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} clientToEdit={clientToEdit} users={users} onSave={handleSaveClient} />
    </>
  );
};

export default ClientManagement;