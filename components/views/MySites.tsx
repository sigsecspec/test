import React from 'react';
import { LocationMarkerIcon } from '../Icons';

const sampleSites = [
    { id: 1, name: 'Main Entrance', address: '123 Commerce St, Downtown' },
    { id: 2, name: 'West Wing', address: '123 Commerce St, Downtown' },
    { id: 3, name: 'Loading Bay', address: '125 Commerce St, Downtown (Rear)' },
];

const MySites: React.FC = () => {
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
                <ul className="divide-y divide-[#535347]/50">
                    {sampleSites.map(site => (
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
            </div>
        </div>
    );
};

export default MySites;