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
            <form onSubmit={handleSubmit} className="relative bg-[var(--bg-secondary)] border border-[var(--border-primary)] rounded-lg p-6 w-full max-w-md shadow-xl" onClick={e => e.stopPropagation()}>
                <h3 className="text-lg font-bold text-[var(--text-primary)] mb-4">{vehicleToEdit ? 'Edit Vehicle' : 'Add Vehicle'}</h3>
                <div className="space-y-4">
                    <input name="name" value={vehicleData.name || ''} onChange={handleChange} placeholder="Vehicle Name (e.g., Patrol Car 1)" className="w-full bg-[var(--bg-primary)] border border-[var(--border-secondary)] rounded-md py-2 px-3 text-[var(--text-primary)]" required />
                    <input name="licensePlate" value={vehicleData.licensePlate || ''} onChange={handleChange} placeholder="License Plate" className="w-full bg-[var(--bg-primary)] border border-[var(--border-secondary)] rounded-md py-2 px-3 text-[var(--text-primary)]" required />
                </div>
                <div className="flex justify-end mt-6">
                    <button type="submit" className="bg-[var(--accent-primary)] text-[var(--accent-primary-text)] font-bold py-2 px-4 rounded-md hover:bg-opacity-90">Save</button>
                </div>
                <button type="button" onClick={onClose} className="absolute top-3 right-3 text-[var(--text-secondary)] hover:text-[var(--text-primary)]"><XIcon className="h-6 w-6"/></button>
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
            case 'Available': return 'bg-green-100 text-green-800';
            case 'In Use': return 'bg-blue-100 text-blue-800';
            case 'Maintenance': return 'bg-yellow-100 text-yellow-800';
        }
    };

    return (
        <>
            <div>
                <div className="flex justify-between items-center mb-4">
                    <div>
                        <h2 className="text-2xl font-bold text-[var(--text-primary)]">Vehicle Management</h2>
                        <p className="text-[var(--text-secondary)]">Track and manage the company's vehicle fleet.</p>
                    </div>
                    <button onClick={() => { setVehicleToEdit(null); setIsModalOpen(true); }} className="bg-[var(--accent-primary)] text-[var(--accent-primary-text)] font-bold py-2 px-4 rounded-md hover:bg-opacity-90">Add Vehicle</button>
                </div>

                <div className="bg-[var(--bg-secondary)] border border-[var(--border-primary)] rounded-lg overflow-hidden shadow-sm">
                    <table className="min-w-full divide-y divide-[var(--border-primary)]">
                        <thead className="bg-[var(--bg-primary)]">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-[var(--text-secondary)] uppercase">Vehicle</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-[var(--text-secondary)] uppercase">Status</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-[var(--text-secondary)] uppercase">Assigned Mission</th>
                                <th className="px-6 py-3 text-right text-xs font-medium text-[var(--text-secondary)] uppercase">Actions</th>
                            </tr>
                        </thead>
                         <tbody className="divide-y divide-[var(--border-tertiary)]">
                            {vehicles.map(vehicle => (
                                <tr key={vehicle.id}>
                                    <td className="px-6 py-4">
                                        <div className="text-sm font-medium text-[var(--text-primary)]">{vehicle.name}</div>
                                        <div className="text-xs text-[var(--text-secondary)]">{vehicle.licensePlate}</div>
                                    </td>
                                    <td className="px-6 py-4"><span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusStyles(vehicle.status)}`}>{vehicle.status}</span></td>
                                    <td className="px-6 py-4 text-sm text-[var(--text-primary)]">{missions.find(m => m.id === vehicle.assignedMissionId)?.title || 'N/A'}</td>
                                    <td className="px-6 py-4 text-right text-sm space-x-4">
                                        <button onClick={() => { setVehicleToEdit(vehicle); setIsModalOpen(true); }} className="font-semibold text-[var(--accent-primary)] hover:text-opacity-80">Edit</button>
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