import React, { useState, useEffect } from 'react';
import type { Vehicle, Mission, VehicleStatus } from '../../types.ts';
import { XIcon } from '../Icons.tsx';

interface VehicleManagementProps {
    vehicles: Vehicle[];
    missions: Mission[];
    onAddVehicle: (data: Omit<Vehicle, 'id'>) => void;
    onUpdateVehicle: (id: string, data: Partial<Vehicle>) => void;
}

const vehicleStatuses: VehicleStatus[] = ['Available', 'In Use', 'Maintenance'];

// A new icon for Vehicle Management
const TruckIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 18.75a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 01-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h1.125c.621 0 1.125-.504 1.125-1.125V14.25m-17.25 4.5h10.5a1.125 1.125 0 001.125-1.125V6.75a1.125 1.125 0 00-1.125-1.125H3.375A1.125 1.125 0 002.25 6.75v10.5a1.125 1.125 0 001.125 1.125z" />
    </svg>
);


interface ManageVehicleModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSave: (data: Omit<Vehicle, 'id'>, id?: string) => void;
    vehicle?: Vehicle | null;
    missions: Mission[];
}

const ManageVehicleModal: React.FC<ManageVehicleModalProps> = ({ isOpen, onClose, onSave, vehicle, missions }) => {
    const [name, setName] = useState('');
    const [licensePlate, setLicensePlate] = useState('');
    const [status, setStatus] = useState<VehicleStatus>('Available');
    const [assignedMissionId, setAssignedMissionId] = useState<string | null>(null);

    useEffect(() => {
        if (vehicle) {
            setName(vehicle.name);
            setLicensePlate(vehicle.licensePlate);
            setStatus(vehicle.status);
            setAssignedMissionId(vehicle.assignedMissionId);
        } else {
            setName('');
            setLicensePlate('');
            setStatus('Available');
            setAssignedMissionId(null);
        }
    }, [vehicle]);

    if (!isOpen) return null;

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSave({ name, licensePlate, status, assignedMissionId }, vehicle?.id);
        onClose();
    };

    const availableMissions = missions.filter(m => m.status === 'Active' || m.status === 'Claimed');

    return (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4" onClick={onClose}>
            <form onSubmit={handleSubmit} className="relative bg-[var(--bg-secondary)] border border-[var(--border-primary)] rounded-lg p-6 w-full max-w-lg shadow-xl" onClick={e => e.stopPropagation()}>
                <h3 className="text-lg font-bold text-[var(--text-primary)] mb-4">{vehicle ? 'Edit Vehicle' : 'Add New Vehicle'}</h3>
                <div className="space-y-4">
                    <input value={name} onChange={e => setName(e.target.value)} placeholder="Vehicle Name (e.g., Patrol Car 1)" required className="w-full bg-[var(--bg-primary)] border border-[var(--border-secondary)] rounded-md py-2 px-3 text-[var(--text-primary)]" />
                    <input value={licensePlate} onChange={e => setLicensePlate(e.target.value)} placeholder="License Plate" required className="w-full bg-[var(--bg-primary)] border border-[var(--border-secondary)] rounded-md py-2 px-3 text-[var(--text-primary)]" />
                    <select value={status} onChange={e => setStatus(e.target.value as VehicleStatus)} className="w-full bg-[var(--bg-primary)] border border-[var(--border-secondary)] rounded-md py-2 px-3 text-[var(--text-primary)]">
                        {vehicleStatuses.map(s => <option key={s} value={s}>{s}</option>)}
                    </select>
                    <select value={assignedMissionId || ''} onChange={e => setAssignedMissionId(e.target.value || null)} className="w-full bg-[var(--bg-primary)] border border-[var(--border-secondary)] rounded-md py-2 px-3 text-[var(--text-primary)]" disabled={status !== 'In Use'}>
                        <option value="">No Assigned Mission</option>
                        {availableMissions.map(m => <option key={m.id} value={m.id}>{m.title} @ {m.site}</option>)}
                    </select>
                </div>
                <div className="flex justify-end mt-6">
                    <button type="submit" className="bg-[var(--accent-primary)] text-[var(--accent-primary-text)] font-bold py-2 px-4 rounded-md hover:bg-opacity-90">Save</button>
                </div>
                <button type="button" onClick={onClose} className="absolute top-3 right-3 text-[var(--text-secondary)] hover:text-[var(--text-primary)]"><XIcon className="h-6 w-6" /></button>
            </form>
        </div>
    );
};


const VehicleManagement: React.FC<VehicleManagementProps> = ({ vehicles, missions, onAddVehicle, onUpdateVehicle }) => {
    const [isModalOpen, setModalOpen] = useState(false);
    const [selectedVehicle, setSelectedVehicle] = useState<Vehicle | null>(null);

    const handleSave = (data: Omit<Vehicle, 'id'>, id?: string) => {
        if (id) {
            onUpdateVehicle(id, data);
        } else {
            onAddVehicle(data);
        }
    };

    const getMissionTitle = (missionId: string | null) => {
        if (!missionId) return 'N/A';
        const mission = missions.find(m => m.id === missionId);
        return mission ? mission.title : 'Unknown Mission';
    };

    const getStatusStyles = (status: VehicleStatus) => {
        switch (status) {
            case 'Available': return 'bg-green-100 text-green-800';
            case 'In Use': return 'bg-blue-100 text-blue-800';
            case 'Maintenance': return 'bg-yellow-100 text-yellow-800';
            default: return 'bg-gray-100 text-gray-800';
        }
    };

    return (
        <>
            <div>
                <div className="flex justify-between items-center mb-4">
                    <div>
                        <h2 className="text-2xl font-bold text-[var(--text-primary)]">Vehicle Management</h2>
                        <p className="text-[var(--text-secondary)]">Manage the company vehicle fleet.</p>
                    </div>
                    <button onClick={() => { setSelectedVehicle(null); setModalOpen(true); }} className="flex items-center bg-[var(--accent-primary)] text-[var(--accent-primary-text)] font-bold py-2 px-4 rounded-md hover:bg-opacity-90 transition">
                       <TruckIcon className="h-5 w-5 mr-2" /> Add Vehicle
                    </button>
                </div>
                <div className="bg-[var(--bg-secondary)] border border-[var(--border-primary)] rounded-lg overflow-hidden shadow-sm">
                    <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-[var(--border-primary)]">
                            <thead className="bg-[var(--bg-primary)]">
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-[var(--text-secondary)] uppercase">Vehicle</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-[var(--text-secondary)] uppercase">License Plate</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-[var(--text-secondary)] uppercase">Status</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-[var(--text-secondary)] uppercase">Assigned Mission</th>
                                    <th className="px-6 py-3 text-right text-xs font-medium text-[var(--text-secondary)] uppercase">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-[var(--border-tertiary)]">
                                {vehicles.map(vehicle => (
                                    <tr key={vehicle.id} className="hover:bg-[var(--bg-primary)]">
                                        <td className="px-6 py-4 text-sm font-medium text-[var(--text-primary)]">{vehicle.name}</td>
                                        <td className="px-6 py-4 text-sm text-[var(--text-secondary)]">{vehicle.licensePlate}</td>
                                        <td className="px-6 py-4">
                                            <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusStyles(vehicle.status)}`}>
                                                {vehicle.status}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 text-sm text-[var(--text-primary)]">{getMissionTitle(vehicle.assignedMissionId)}</td>
                                        <td className="px-6 py-4 text-right text-sm">
                                            <button onClick={() => { setSelectedVehicle(vehicle); setModalOpen(true); }} className="font-semibold text-[var(--accent-primary)] hover:text-opacity-80">Edit</button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
            <ManageVehicleModal 
                isOpen={isModalOpen} 
                onClose={() => setModalOpen(false)} 
                onSave={handleSave} 
                vehicle={selectedVehicle} 
                missions={missions} 
            />
        </>
    );
};

export default VehicleManagement;
