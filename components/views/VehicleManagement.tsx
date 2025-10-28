import React, { useState, useEffect } from 'react';
import type { Vehicle, Mission, VehicleStatus } from '../../types';
import { XIcon } from '../Icons';

interface VehicleManagementProps {
    vehicles: Vehicle[];
    missions: Mission[];
    onAddVehicle: (data: Omit<Vehicle, 'id'>) => void;
    onUpdateVehicle: (id: string, data: Partial<Vehicle>) => void;
}

const VehicleModal: React.FC<{
    isOpen: boolean;
    onClose: () => void;
    onSave: (data: Partial<Vehicle>, id?: string) => void;
    vehicleToEdit?: Vehicle | null;
}> = ({ isOpen, onClose, onSave, vehicleToEdit }) => {
    const [vehicleData, setVehicleData] = useState<Partial<Vehicle>>({});

    useEffect(() => {
        setVehicleData(vehicleToEdit || { name: '', licensePlate: '', status: 'Available', assignedMissionId: null });
    }, [vehicleToEdit]);

    if(!isOpen) return null;
    
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setVehicleData(p => ({ ...p, [name]: value }));
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSave(vehicleData, vehicleToEdit?.id);
        onClose();
    };

    return (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4" onClick={onClose}>
            <form onSubmit={handleSubmit} className="relative bg-[#0f0f0f] border border-[#535347] rounded-lg p-6 w-full max-w-md" onClick={e => e.stopPropagation()}>
                <h3 className="text-lg font-bold text-[#c4c4c4] mb-4">{vehicleToEdit ? 'Edit Vehicle' : 'Add Vehicle'}</h3>
                <div className="space-y-4">
                    <input name="name" value={vehicleData.name || ''} onChange={handleChange} placeholder="Vehicle Name (e.g., Patrol Car 1)" className="w-full bg-[#1a1a1a] border border-[#535347] rounded-md py-2 px-3 text-[#c4c4c4]" required />
                    <input name="licensePlate" value={vehicleData.licensePlate || ''} onChange={handleChange} placeholder="License Plate" className="w-full bg-[#1a1a1a] border border-[#535347] rounded-md py-2 px-3 text-[#c4c4c4]" required />
                </div>
                <div className="flex justify-end mt-6">
                    <button type="submit" className="bg-[#aeae5a] text-[#0f0f0f] font-bold py-2 px-4 rounded-md hover:bg-opacity-90">Save</button>
                </div>
                <button type="button" onClick={onClose} className="absolute top-3 right-3 text-[#787876] hover:text-[#c4c4c4]"><XIcon className="h-6 w-6"/></button>
            </form>
        </div>
    );
};

const VehicleManagement: React.FC<VehicleManagementProps> = ({ vehicles, missions, onAddVehicle, onUpdateVehicle }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [vehicleToEdit, setVehicleToEdit] = useState<Vehicle | null>(null);

    const handleSave = (data: Partial<Vehicle>, id?: string) => {
        if(id) {
            onUpdateVehicle(id, data);
        } else {
            onAddVehicle(data as Omit<Vehicle, 'id'>);
        }
    };
    
    const getStatusStyles = (status: VehicleStatus) => {
        switch(status) {
            case 'Available': return 'bg-green-500/20 text-green-400';
            case 'In Use': return 'bg-blue-500/20 text-blue-300';
            case 'Maintenance': return 'bg-yellow-500/20 text-yellow-400';
        }
    };

    return (
        <>
            <div>
                <div className="flex justify-between items-center mb-4">
                    <div>
                        <h2 className="text-2xl font-bold text-[#c4c4c4]">Vehicle Management</h2>
                        <p className="text-[#787876]">Track and manage the company's vehicle fleet.</p>
                    </div>
                    <button onClick={() => { setVehicleToEdit(null); setIsModalOpen(true); }} className="bg-[#aeae5a] text-[#0f0f0f] font-bold py-2 px-4 rounded-md hover:bg-opacity-90">Add Vehicle</button>
                </div>

                <div className="bg-[#0f0f0f] border border-[#535347] rounded-lg overflow-hidden">
                    <table className="min-w-full divide-y divide-[#535347]">
                        <thead className="bg-[#535347]/20">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-[#c4c4c4] uppercase">Vehicle</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-[#c4c4c4] uppercase">Status</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-[#c4c4c4] uppercase">Assigned Mission</th>
                                <th className="px-6 py-3 text-right text-xs font-medium text-[#c4c4c4] uppercase">Actions</th>
                            </tr>
                        </thead>
                         <tbody className="divide-y divide-[#535347]/50">
                            {vehicles.map(vehicle => (
                                <tr key={vehicle.id}>
                                    <td className="px-6 py-4">
                                        <div className="text-sm font-medium text-[#c4c4c4]">{vehicle.name}</div>
                                        <div className="text-xs text-[#787876]">{vehicle.licensePlate}</div>
                                    </td>
                                    <td className="px-6 py-4"><span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusStyles(vehicle.status)}`}>{vehicle.status}</span></td>
                                    <td className="px-6 py-4 text-sm text-[#c4c4c4]">{missions.find(m => m.id === vehicle.assignedMissionId)?.title || 'N/A'}</td>
                                    <td className="px-6 py-4 text-right text-sm space-x-4">
                                        <button onClick={() => { setVehicleToEdit(vehicle); setIsModalOpen(true); }} className="font-semibold text-[#aeae5a] hover:text-opacity-80">Edit</button>
                                        {/* Add more actions like assigning to mission here */}
                                    </td>
                                </tr>
                            ))}
                         </tbody>
                    </table>
                </div>
            </div>
            <VehicleModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} onSave={handleSave} vehicleToEdit={vehicleToEdit} />
        </>
    );
};

export default VehicleManagement;