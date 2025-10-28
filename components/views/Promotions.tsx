import React, { useState } from 'react';
import { User, Promotion, UserRole } from '../../types';
import { ArrowUpTrayIcon, XIcon } from '../Icons';

interface PromotionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (toRole: UserRole.Supervisor | UserRole.TrainingOfficer, applicationText: string) => void;
}

const PromotionModal: React.FC<PromotionModalProps> = ({ isOpen, onClose, onSubmit }) => {
  const [toRole, setToRole] = useState<UserRole.Supervisor | UserRole.TrainingOfficer>(UserRole.Supervisor);
  const [applicationText, setApplicationText] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(toRole, applicationText);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4" onClick={onClose}>
      <form onSubmit={handleSubmit} className="relative bg-[var(--bg-secondary)] border border-[var(--border-primary)] rounded-lg p-6 w-full max-w-lg shadow-xl" onClick={e => e.stopPropagation()}>
        <h3 className="text-lg font-bold text-[var(--text-primary)] mb-4">Apply for Promotion</h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-[var(--text-primary)]">Position</label>
            <select value={toRole} onChange={e => setToRole(e.target.value as any)} className="mt-1 block w-full bg-[var(--bg-primary)] border border-[var(--border-secondary)] rounded-md py-2 px-3 text-[var(--text-primary)]">
              <option value={UserRole.Supervisor}>Supervisor</option>
              <option value={UserRole.TrainingOfficer}>Training Officer</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-[var(--text-primary)]">Reason for Application</label>
            <textarea value={applicationText} onChange={e => setApplicationText(e.target.value)} rows={5} className="mt-1 block w-full bg-[var(--bg-primary)] border border-[var(--border-secondary)] rounded-md py-2 px-3 text-[var(--text-primary)]" placeholder="Briefly explain why you are a good fit for this role." required></textarea>
          </div>
        </div>
        <div className="flex justify-end mt-6">
          <button type="submit" className="bg-[var(--accent-primary)] text-[var(--accent-primary-text)] font-bold py-2 px-4 rounded-md hover:bg-opacity-90">Submit Application</button>
        </div>
        <button onClick={onClose} className="absolute top-3 right-3 text-[var(--text-secondary)] hover:text-[var(--text-primary)]"><XIcon className="h-6 w-6"/></button>
      </form>
    </div>
  );
};

interface PromotionsProps {
  user: User;
  users: User[];
  promotions: Promotion[];
  onAddPromotion: (data: Omit<Promotion, 'id'|'status'|'dateApplied'>) => void;
  onUpdatePromotionStatus: (id: string, status: 'Approved' | 'Denied') => void;
}

const Promotions: React.FC<PromotionsProps> = ({ user, users, promotions, onAddPromotion, onUpdatePromotionStatus }) => {
  const [isModalOpen, setModalOpen] = useState(false);
  const isGuard = user.role === UserRole.Guard || user.role === UserRole.LeadGuard;
  const isManagement = [UserRole.Owner, UserRole.CoOwner, UserRole.OperationsDirector, UserRole.OperationsManager].includes(user.role);

  const handleSubmitApplication = (toRole: UserRole.Supervisor | UserRole.TrainingOfficer, applicationText: string) => {
    onAddPromotion({ userId: user.id, toRole, applicationText });
  };
  
  const getUserName = (id: string) => {
      const u = users.find(usr => usr.id === id);
      return u ? `${u.firstName} ${u.lastName}` : 'Unknown';
  }

  return (
    <>
      <div>
        <div className="flex justify-between items-center mb-4">
          <div>
            <h2 className="text-2xl font-bold text-[var(--text-primary)]">Promotions</h2>
            <p className="text-[var(--text-secondary)]">{isGuard ? 'Apply for career advancement opportunities.' : 'Review and manage promotion applications.'}</p>
          </div>
          {isGuard && <button onClick={() => setModalOpen(true)} className="flex items-center bg-[var(--accent-primary)] text-[var(--accent-primary-text)] font-bold py-2 px-4 rounded-md hover:bg-opacity-90"><ArrowUpTrayIcon className="h-5 w-5 mr-2"/> Apply</button>}
        </div>
        
        <div className="bg-[var(--bg-secondary)] border border-[var(--border-primary)] rounded-lg overflow-hidden shadow-sm">
           <div className="overflow-x-auto">
             <table className="min-w-full divide-y divide-[var(--border-primary)]">
                <thead className="bg-[var(--bg-primary)]">
                    <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-[var(--text-secondary)] uppercase">Applicant</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-[var(--text-secondary)] uppercase">Applying For</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-[var(--text-secondary)] uppercase">Date</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-[var(--text-secondary)] uppercase">Status</th>
                        {isManagement && <th className="px-6 py-3 text-right text-xs font-medium text-[var(--text-secondary)] uppercase">Actions</th>}
                    </tr>
                </thead>
                <tbody className="divide-y divide-[var(--border-tertiary)]">
                    {promotions.map(p => (
                         <tr key={p.id} className="hover:bg-[var(--bg-primary)]">
                            <td className="px-6 py-4 text-sm font-medium text-[var(--text-primary)]">{getUserName(p.userId)}</td>
                            <td className="px-6 py-4 text-sm text-[var(--text-secondary)]">{p.toRole}</td>
                            <td className="px-6 py-4 text-sm text-[var(--text-secondary)]">{p.dateApplied.toLocaleDateString()}</td>
                            <td className="px-6 py-4 text-sm"><span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${p.status === 'Approved' ? 'bg-green-100 text-green-800' : p.status === 'Denied' ? 'bg-red-100 text-red-800' : 'bg-yellow-100 text-yellow-800'}`}>{p.status}</span></td>
                            {isManagement && p.status === 'Pending' && (
                                <td className="px-6 py-4 text-right text-sm space-x-2">
                                    <button onClick={() => onUpdatePromotionStatus(p.id, 'Denied')} className="font-semibold text-red-600 hover:text-red-800">Deny</button>
                                    <button onClick={() => onUpdatePromotionStatus(p.id, 'Approved')} className="font-semibold text-green-600 hover:text-green-800">Approve</button>
                                </td>
                            )}
                         </tr>
                    ))}
                </tbody>
             </table>
           </div>
        </div>
      </div>
      <PromotionModal isOpen={isModalOpen} onClose={() => setModalOpen(false)} onSubmit={handleSubmitApplication} />
    </>
  );
};

export default Promotions;