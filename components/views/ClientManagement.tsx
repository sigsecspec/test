import React from 'react';
import type { Client } from '../../types';

interface ClientManagementProps {
  clients: Client[];
}

const ClientManagement: React.FC<ClientManagementProps> = ({ clients }) => {

  return (
    <div>
      <h2 className="text-2xl font-bold text-[#c4c4c4] mb-4">Client Roster</h2>
      <p className="text-[#787876] mb-6">A complete list of all active clients.</p>
      <div className="bg-[#0f0f0f] border border-[#535347] rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-[#535347]">
            <thead className="bg-[#535347]/20">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-[#c4c4c4] uppercase tracking-wider">Company Name</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-[#c4c4c4] uppercase tracking-wider">Contact Email</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-[#c4c4c4] uppercase tracking-wider">User Account Linked</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#535347]/50">
              {clients.map((client) => (
                <tr key={client.id} className="hover:bg-[#535347]/10">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-[#c4c4c4]">{client.companyName}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-[#c4c4c4]">{client.contactEmail}</td>
                   <td className="px-6 py-4 whitespace-nowrap text-sm text-[#787876]">
                    {client.userId ? 'Yes' : 'No'}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ClientManagement;