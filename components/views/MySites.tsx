import React, { useState, useEffect } from 'react';
import { LocationMarkerIcon, XIcon } from '../Icons';
import { User, Client, Site } from '../../types';


interface MySitesProps {
    user: User;
    clients: Client[];
    sites: Site[];
    onAddSite: (siteData: Omit<Site, 'id'>) => void;
    onUpdateSite: (siteId: string, data: Partial<Site>) => void;
    onDeleteSite: (siteId: string) => void;
}

const SiteModal: React.FC<{
    isOpen: boolean;
    onClose: () => void;
    clientId: string;
    onSave: (siteData: Partial<Site>, siteId?: string) => void;
    siteToEdit?: Site | null;
}> = ({ isOpen, onClose, clientId, onSave, siteToEdit }) => {
    const [name, setName] = useState('');
    const [address, setAddress] = useState('');

    useEffect(() => {
        if(siteToEdit) {
            setName(siteToEdit.name);
            setAddress(siteToEdit.address);
        } else {
            setName('');
            setAddress('');
        }
    }, [siteToEdit])

    if (!isOpen) return null;

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (name && address) {
            const siteData = { clientId, name, address };
            onSave(siteData, siteToEdit?.id);
            onClose();
        }
    };

    return (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4" onClick={onClose}>
            <div className="relative bg-[#0f0f0f] border border-[#535347] rounded-lg p-6 w-full max-w-md" onClick={e => e.stopPropagation()}>
                 <h3 className="text-lg font-bold text-[#c4c4c4] mb-4">{siteToEdit ? 'Edit Site' : 'Add New Site'}</h3>
                 <form onSubmit={handleSubmit} className="space-y-4">
                     <div>
                        <label htmlFor="siteName" className="block text-sm font-medium text-[#c4c4c4]">Site Name</label>
                        <input type="text" id="siteName" value={name} onChange={e => setName(e.target.value)} className="mt-1 block w-full bg-[#1a1a1a] border border-[#535347] rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-[#aeae5a] focus:border-[#aeae5a] sm:text-sm text-[#c4c4c4]" required/>
                    </div>
                     <div>
                        <label htmlFor="siteAddress" className="block text-sm font-medium text-[#c4c4c4]">Address</label>
                        <input type="text" id="siteAddress" value={address} onChange={e => setAddress(e.target.value)} className="mt-1 block w-full bg-[#1a1a1a] border border-[#535347] rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-[#aeae5a] focus:border-[#aeae5a] sm:text-sm text-[#c4c4c4]" required/>
                    </div>
                    <div className="flex justify-end space-x-2 pt-2">
                        <button type="button" onClick={onClose} className="bg-transparent border border-[#535347] text-[#c4c4c4] font-semibold py-2 px-4 rounded-md hover:bg-[#535347]/50">Cancel</button>
                        <button type="submit" className="bg-[#aeae5a] text-[#0f0f0f] font-bold py-2 px-4 rounded-md hover:bg-opacity-90">Save Site</button>
                    </div>
                 </form>
                 <button onClick={onClose} className="absolute top-3 right-3 text-[#787876] hover:text-[#c4c4c4]"><XIcon className="h-6 w-6"/></button>
            </div>
        </div>
    );
};


const MySites: React.FC<MySitesProps> = ({ user, clients, sites, onAddSite, onUpdateSite, onDeleteSite }) => {
    const [isModalOpen, setModalOpen] = useState(false);
    const [siteToEdit, setSiteToEdit] = useState<Site | null>(null);
    const clientProfile = clients.find(c => c.userId === user.id);
    const mySites = clientProfile ? sites.filter(s => s.clientId === clientProfile.id) : [];

    const handleSave = (siteData: Partial<Site>, siteId?: string) => {
        if (siteId) {
            onUpdateSite(siteId, siteData);
        } else {
            onAddSite(siteData as Omit<Site, 'id'>);
        }
    };
    
    const handleDelete = (siteId: string) => {
        if(window.confirm('Are you sure you want to delete this site?')) {
            onDeleteSite(siteId);
        }
    };

    return (
        <div>
            <div className="flex justify-between items-center mb-4">
                <div>
                    <h2 className="text-2xl font-bold text-[#c4c4c4]">My Sites & Posts</h2>
                    <p className="text-[#787876]">Manage the locations where you require security coverage.</p>
                </div>
                 <button 
                    onClick={() => { setSiteToEdit(null); setModalOpen(true); }}
                    className="bg-[#aeae5a] text-[#0f0f0f] font-bold py-2 px-4 rounded-md hover:bg-opacity-90 transition text-sm disabled:bg-opacity-50 disabled:cursor-not-allowed"
                    disabled={!clientProfile}
                 >
                    Add New Site
                </button>
             </div>
            <div className="bg-[#0f0f0f] border border-[#535347] rounded-lg">
                {mySites.length > 0 ? (
                    <ul className="divide-y divide-[#535347]/50">
                        {mySites.map(site => (
                            <li key={site.id} className="p-4 hover:bg-[#535347]/10 flex items-center justify-between">
                                <div className="flex items-center">
                                    <LocationMarkerIcon className="h-5 w-5 text-[#787876] mr-4 flex-shrink-0" />
                                    <div>
                                        <p className="text-sm font-medium text-[#c4c4c4]">{site.name}</p>
                                        <p className="text-xs text-[#787876]">{site.address}</p>
                                    </div>
                                </div>
                                <div className="text-xs font-semibold flex-shrink-0 ml-4 space-x-4">
                                     <button onClick={() => { setSiteToEdit(site); setModalOpen(true); }} className="text-[#aeae5a] hover:text-opacity-80">
                                        Edit
                                    </button>
                                     <button onClick={() => handleDelete(site.id)} className="text-red-400 hover:text-red-300">
                                        Delete
                                    </button>
                                </div>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <div className="text-center p-12 text-[#787876]">
                        <LocationMarkerIcon className="w-12 h-12 mx-auto text-[#787876] mb-4" />
                        <h3 className="text-xl font-semibold text-[#c4c4c4]">No Sites Found</h3>
                        <p className="mt-2">You have not configured any sites for {clientProfile?.companyName || 'your account'}.</p>
                    </div>
                )}
            </div>
            {clientProfile && (
                <SiteModal
                    isOpen={isModalOpen} 
                    onClose={() => setModalOpen(false)} 
                    clientId={clientProfile.id}
                    onSave={handleSave}
                    siteToEdit={siteToEdit}
                />
            )}
        </div>
    );
};

export default MySites;