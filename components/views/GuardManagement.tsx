import React from 'react';
import { User, UserRole } from '../../types';
import { getUsers } from '../../database';

const GuardManagement: React.FC = () => {
  const [guards, setGuards] = React.useState<User[]>([]);

  React.useEffect(() => {
    const allUsers = getUsers();
    // Filter out clients from the guard management view
    setGuards(allUsers.filter(u => u.role !== UserRole.Client));
  }, []);

  return (
    <div>
      <h2 className="text-2xl font-bold text-[#c4c4c4] mb-4">Guard & Staff Roster</h2>
      <p className="text-[#787876] mb-6">A complete list of all active personnel in the system.</p>
      <div className="bg-[#0f0f0f] border border-[#535347] rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-[#535347]">
            <thead className="bg-[#535347]/20">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-[#c4c4c4] uppercase tracking-wider">Name</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-[#c4c4c4] uppercase tracking-wider">Role / Rank</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-[#c4c4c4] uppercase tracking-wider">Level</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-[#c4c4c4] uppercase tracking-wider">Email</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#535347]/50">
              {guards.map((guard) => (
                <tr key={guard.id} className="hover:bg-[#535347]/10">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-[#c4c4c4]">{guard.firstName} {guard.lastName}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-[#c4c4c4]">{guard.role}</div>
                    <div className="text-xs text-[#787876]">{guard.rank}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-[#aeae5a]/20 text-[#aeae5a]">
                      Level {guard.level}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-[#c4c4c4]">{guard.email}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default GuardManagement;