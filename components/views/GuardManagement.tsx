import React, { useState } from 'react';
import { User, UserRole } from '../../types';
import { XIcon } from '../Icons';

const ranks = ['OFC (Officer)', 'CPL (Corporal)', 'SGT (Sergeant)', 'LT (Lieutenant)', 'CAP (Captain)', 'CMD (Commander)', 'DPT CHF (Deputy Chief)', 'ASST CHF (Asst. Chief)', 'CHF (Chief)'];

interface ManageUserModalProps {
    isOpen: boolean;
    onClose: () => void;
    user: User;
    onUpdate: (userId: string, newRank: string, newLevel: number) => void;
}
const ManageUserModal: React.FC<ManageUserModalProps> = ({ isOpen, onClose, user, onUpdate }) => {
    const [rank, setRank] = useState(user.rank);
    const [level, setLevel] = useState(user.level);
    if (!isOpen) return null;

    const handleSave = () => {
        onUpdate(user.id, rank, level);
        onClose();
    };

    return (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4" onClick={onClose}>
            <div className="relative bg-[#0f0f0f] border border-[#535347] rounded-lg p-6 w-full max-w-md" onClick={e => e.stopPropagation()}>
                <h3 className="text-lg font-bold text-[#c4c4c4] mb-4">Manage {user.firstName} {user.lastName}</h3>
                <div className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-[#c4c4c4]">Rank</label>
                        <select value={rank} onChange={e => setRank(e.target.value)} className="mt-1 block w-full bg-[#1a1a1a] border border-[#535347] rounded-md py-2 px-3 text-[#c4c4c4]">
                            {ranks.map(r => <option key={r} value={r}>{r}</option>)}
                        </select>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-[#c4c4c4]">Security Level</label>
                        <input type="number" value={level} onChange={e => setLevel(Number(e.target.value))} min="1" max="5" className="mt-1 block w-full bg-[#1a1a1a] border border-[#535347] rounded-md py-2 px-3 text-[#c4c4c4]" />
                    </div>
                </div>
                <div className="flex justify-end mt-6">
                    <button onClick={handleSave} className="bg-[#aeae5a] text-[#0f0f0f] font-bold py-2 px-4 rounded-md hover:bg-opacity-90">Save Changes</button>
                </div>
                <button onClick={onClose} className="absolute top-3 right-3 text-[#787876] hover:text-[#c4c4c4]"><XIcon className="h-6 w-6"/></button>
            </div>
        </div>
    );
};


interface GuardManagementProps {
  users: User[];
  onUpdateRank: (userId: string, newRank: string, newLevel: number) => void;
}

const GuardManagement: React.FC<GuardManagementProps> = ({ users, onUpdateRank }) => {
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const guards = users.filter(u => u.role !== UserRole.Client);

  return (
    <>
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
                  <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-[#c4c4c4] uppercase tracking-wider">Actions</th>
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
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm">
                      <button onClick={() => setSelectedUser(guard)} className="text-[#aeae5a] hover:text-opacity-80 font-semibold">Manage</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      {selectedUser && <ManageUserModal isOpen={!!selectedUser} onClose={() => setSelectedUser(null)} user={selectedUser} onUpdate={onUpdateRank} />}
    </>
  );
};

export default GuardManagement;
