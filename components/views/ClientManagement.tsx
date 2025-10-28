import React from 'react';
import type { Client, User } from '../../types';

interface ClientManagementProps {
  clients: Client[];
  users: User[];
}

const ClientManagement: React.FC<ClientManagementProps> = ({ clients, users }) => {

  const clientAccounts = clients
    .map(client => ({
      ...client,
      user: client.userId ? users.find(u => u.id === client.userId) : null
    }))
    .filter(client => client.user); // Only include clients with a linked user account

  return (
    <div>
      <h2 className="text-2xl font-bold text-[#c4c4c4] mb-4">Client Roster</h2>
      <p className="text-[#787876] mb-6">A list of all client accounts with portal access.</p>
      <div className="bg-[#0f0f0f] border border-[#535347] rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-[#535347]">
            <thead className="bg-[#535347]/20">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-[#c4c4c4] uppercase tracking-wider">Company Name</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-[#c4c4c4] uppercase tracking-wider">Primary Contact</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-[#c4c4c4] uppercase tracking-wider">Contact Email</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#535347]/50">
                {clientAccounts.length > 0 ? (
                    clientAccounts.map((client) => (
                        <tr key={client.id} className="hover:bg-[#535347]/10">
                        <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm font-medium text-[#c4c4c4]">{client.companyName}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-[#c4c4c4]">
                            {client.user ? `${client.user.firstName} ${client.user.lastName}` : 'N/A'}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-[#c4c4c4]">
                            {client.contactEmail}
                        </td>
                        </tr>
                    ))
                ) : (
                    <tr>
                        <td colSpan={3} className="text-center p-12 text-[#787876]">
                            No client accounts with portal access found.
                        </td>
                    </tr>
                )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ClientManagement;