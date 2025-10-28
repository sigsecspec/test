import React, { useState, useEffect } from 'react';
import { User, UserRole } from '../../types';
import { XIcon } from '../Icons';

const ranks = ['OFC (Officer)', 'PVT (Private)', 'CPL (Corporal)', 'SGT (Sergeant)', 'LT (Lieutenant)', 'CAP (Captain)', 'CMD (Commander)', 'DPT CHF (Deputy Chief)', 'ASST CHF (Asst. Chief)', 'CHF (Chief)', 'N/A'];

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
            <div className="relative bg-[var(--bg-secondary)] border border-[var(--border-primary)] rounded-lg p-6 w-full max-w-lg shadow-xl" onClick={e => e.stopPropagation()}>
                <h3 className="text-lg font-bold text-[var(--text-primary)] mb-4">Manage {user.firstName} {user.lastName}</h3>
                <div className="space-y-4 max-h-[70vh] overflow-y-auto pr-2">
                     <div className="grid grid-cols-2 gap-4">
                        <input name="firstName" value={userData.firstName} onChange={handleChange} placeholder="First Name" className="block w-full bg-[var(--bg-primary)] border border-[var(--border-secondary)] rounded-md py-2 px-3 text-[var(--text-primary)]" />
                        <input name="lastName" value={userData.lastName} onChange={handleChange} placeholder="Last Name" className="block w-full bg-[var(--bg-primary)] border border-[var(--border-secondary)] rounded-md py-2 px-3 text-[var(--text-primary)]" />
                     </div>
                     <input name="email" value={userData.email} onChange={handleChange} placeholder="Email" className="block w-full bg-[var(--bg-primary)] border border-[var(--border-secondary)] rounded-md py-2 px-3 text-[var(--text-primary)]" />
                     <select name="role" value={userData.role} onChange={handleChange} className="block w-full bg-[var(--bg-primary)] border border-[var(--border-secondary)] rounded-md py-2 px-3 text-[var(--text-primary)]">
                        {Object.values(UserRole).map(r => <option key={r} value={r}>{r}</option>)}
                    </select>
                    <select name="rank" value={userData.rank} onChange={handleChange} className="block w-full bg-[var(--bg-primary)] border border-[var(--border-secondary)] rounded-md py-2 px-3 text-[var(--text-primary)]">
                        {ranks.map(r => <option key={r} value={r}>{r}</option>)}
                    </select>
                    <div>
                        <label className="block text-sm font-medium text-[var(--text-primary)]">Security Level</label>
                        <input type="number" value={userData.level} onChange={handleLevelChange} min="0" max="5" className="mt-1 block w-full bg-[var(--bg-primary)] border border-[var(--border-secondary)] rounded-md py-2 px-3 text-[var(--text-primary)]" />
                    </div>
                </div>
                <div className="flex justify-end mt-6">
                    <button onClick={handleSave} className="bg-[var(--accent-primary)] text-[var(--accent-primary-text)] font-bold py-2 px-4 rounded-md hover:bg-opacity-90">Save Changes</button>
                </div>
                <button onClick={onClose} className="absolute top-3 right-3 text-[var(--text-secondary)] hover:text-[var(--text-primary)]"><XIcon className="h-6 w-6"/></button>
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
        <h2 className="text-2xl font-bold text-[var(--text-primary)] mb-4">Guard & Staff Roster</h2>
        <p className="text-[var(--text-secondary)] mb-6">A complete list of all active personnel in the system.</p>
        <div className="bg-[var(--bg-secondary)] border border-[var(--border-primary)] rounded-lg overflow-hidden shadow-sm">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-[var(--border-primary)]">
              <thead className="bg-[var(--bg-primary)]">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-[var(--text-secondary)] uppercase tracking-wider">Name</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-[var(--text-secondary)] uppercase tracking-wider">Role / Rank</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-[var(--text-secondary)] uppercase tracking-wider">Level</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-[var(--text-secondary)] uppercase tracking-wider">Email</th>
                  <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-[var(--text-secondary)] uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[var(--border-tertiary)]">
                {guards.map((guard) => (
                  <tr key={guard.id} className="hover:bg-[var(--bg-primary)]">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-[var(--text-primary)]">{guard.firstName} {guard.lastName}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-[var(--text-primary)]">{guard.role}</div>
                      <div className="text-xs text-[var(--text-secondary)]">{guard.rank}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-[var(--accent-primary)]/10 text-[var(--accent-primary)]">
                        Level {guard.level}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-[var(--text-primary)]">{guard.email}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm">
                      <button onClick={() => setSelectedUser(guard)} className="text-[var(--accent-primary)] hover:text-opacity-80 font-semibold">Manage</button>
                       <button onClick={() => handleDelete(guard)} className="text-red-500 hover:text-red-700 font-semibold ml-4">Delete</button>
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