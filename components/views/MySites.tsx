import React from 'react';
import { LocationMarkerIcon } from '../Icons';
import { User, Client } from '../../types';

interface Site {
    id: string;
    clientId: string;
    name: string;
    address: string;
}

interface MySitesProps {
    user: User;
    clients: Client[];
    sites: Site[];
}

const MySites: React.FC<MySitesProps> = ({ user, clients, sites }) => {
    const clientProfile = clients.find(c => c.userId === user.id);
    const mySites = clientProfile ? sites.filter(s => s.clientId === clientProfile.id) : [];

    return (
        <div>
            <h2 className="text-2xl font-bold text-[#c4c4c4] mb-4">My Sites & Posts</h2>
            <p className="text-[#787876] mb-6">Manage the locations where you require security coverage.</p>
            <div className="bg-[#0f0f0f] border border-[#535347] rounded-lg">
                 <div className="p-4 flex justify-end border-b border-[#535347]">
                     <button className="bg-[#aeae5a] text-[#0f0f0f] font-bold py-2 px-4 rounded-md hover:bg-opacity-90 transition text-sm">
                        Add New Site
                    </button>
                 </div>
                {mySites.length > 0 ? (
                    <ul className="divide-y divide-[#535347]/50">
                        {mySites.map(site => (
                            <li key={site.id} className="p-4 hover:bg-[#535347]/10 flex items-center justify-between">
                                <div className="flex items-center">
                                    <LocationMarkerIcon className="h-5 w-5 text-[#787876] mr-4" />
                                    <div>
                                        <p className="text-sm font-medium text-[#c4c4c4]">{site.name}</p>
                                        <p className="text-xs text-[#787876]">{site.address}</p>
                                    </div>
                                </div>
                                <button className="text-xs text-[#aeae5a] hover:text-opacity-80 font-semibold">
                                    Edit
                                </button>
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
        </div>
    );
};

export default MySites;