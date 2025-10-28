import React, { useState, useEffect } from 'react';
import { User, UserRole } from '../../types';
import { XIcon } from '../Icons';

const ranks = ['OFC (Officer)', 'CPL (Corporal)', 'SGT (Sergeant)', 'LT (Lieutenant)', 'CAP (Captain)', 'CMD (Commander)', 'DPT CHF (Deputy Chief)', 'ASST CHF (Asst. Chief)', 'CHF (Chief)', 'N/A'];

interface ManageUserModalProps {
    isOpen: boolean;
    onClose: () => void;
    user: User;
    onUpdate: (userId: string, userData: Partial<User>) => void;
}
const ManageUserModal: React.FC<ManageUserModalProps> = ({ isOpen, onClose, user, onUpdate }) => {
    const [userData, setUserData] = useState(user);

    useEffect(() => {
        setUserData(user);
    }, [user]);
    
    if (!isOpen) return null;

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setUserData(prev => ({ ...prev, [name]: value }));
    };

    const handleLevelChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setUserData(prev => ({...prev, level: parseInt(e.target.value, 10) }));
    }

    const handleSave = () => {
        onUpdate(user.id, userData);
        onClose();
    };

    return (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4" onClick={onClose}>
            <div className="relative bg-[#0f0f0f] border border-[#535347] rounded-lg p-6 w-full max-w-lg" onClick={e => e.stopPropagation()}>
                <h3 className="text-lg font-bold text-[#c4c4c4] mb-4">Manage {user.firstName} {user.lastName}</h3>
                <div className="space-y-4 max-h-[70vh] overflow-y-auto pr-2">
                     <div className="grid grid-cols-2 gap-4">
                        <input name="firstName" value={userData.firstName} onChange={handleChange} placeholder="First Name" className="block w-full bg-[#1a1a1a] border border-[#535347] rounded-md py-2 px-3 text-[#c4c4c4]" />
                        <input name="lastName" value={userData.lastName} onChange={handleChange} placeholder="Last Name" className="block w-full bg-[#1a1a1a] border border-[#535347] rounded-md py-2 px-3 text-[#c4c4c4]" />
                     </div>
                     <input name="email" value={userData.email} onChange={handleChange} placeholder="Email" className="block w-full bg-[#1a1a1a] border border-[#535347] rounded-md py-2 px-3 text-[#c4c4c4]" />
                     <select name="role" value={userData.role} onChange={handleChange} className="block w-full bg-[#1a1a1a] border border-[#535347] rounded-md py-2 px-3 text-[#c4c4c4]">
                        {Object.values(UserRole).map(r => <option key={r} value={r}>{r}</option>)}
                    </select>
                    <select name="rank" value={userData.rank} onChange={handleChange} className="block w-full bg-[#1a1a1a] border border-[#535347] rounded-md py-2 px-3 text-[#c4c4c4]">
                        {ranks.map(r => <option key={r} value={r}>{r}</option>)}
                    </select>
                     <select name="guardType" value={userData.guardType || ''} onChange={handleChange} className="block w-full bg-[#1a1a1a] border border-[#535347] rounded-md py-2 px-3 text-[#c4c4c4]">
                        <option value="">N/A</option>
                        <option value="Base">Base</option>
                        <option value="Flex">Flex</option>
                        <option value="Seasonal">Seasonal</option>
                    </select>
                    <div>
                        <label className="block text-sm font-medium text-[#c4c4c4]">Security Level</label>
                        <input type="number" value={userData.level} onChange={handleLevelChange} min="0" max="5" className="mt-1 block w-full bg-[#1a1a1a] border border-[#535347] rounded-md py-2 px-3 text-[#c4c4c4]" />
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
  onUpdateUser: (userId: string, userData: Partial<User>) => void;
  onDeleteUser: (userId: string) => void;
}

const GuardManagement: React.FC<GuardManagementProps> = ({ users, onUpdateUser, onDeleteUser }) => {
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const guards = users.filter(u => u.role !== UserRole.Client);
  
  const handleDelete = (user: User) => {
    if(user.id === 'user-1') {
        alert("Cannot delete the primary owner account.");
        return;
    }
    if (window.confirm(`Are you sure you want to delete ${user.firstName} ${user.lastName}? This action cannot be undone.`)) {
        onDeleteUser(user.id);
    }
  };

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
                       <button onClick={() => handleDelete(guard)} className="text-red-400 hover:text-red-300 font-semibold ml-4">Delete</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      {selectedUser && <ManageUserModal isOpen={!!selectedUser} onClose={() => setSelectedUser(null)} user={selectedUser} onUpdate={onUpdateUser} />}
    </>
  );
};

export default GuardManagement;