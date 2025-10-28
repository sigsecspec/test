import React, { useState } from 'react';
import type { User, Appeal } from '../../types';
import { AcademicCapIcon, XIcon } from '../Icons';

type TrainingStatus = 'Not Started' | 'In Progress' | 'Passed' | 'Failed';

const trainingModules = {
    guard: [
        { id: 'g01', title: 'Level 1: Basic Security Procedures', duration: '1 hr', content: 'Covers standard operating procedures, observation skills, and basic incident reporting.', quiz: [{q: 'What is the first step in an incident?', a: 'Observe'}] },
        { id: 'g02', title: 'Level 2: Pepper Spray Certification', duration: '2 hrs', content: 'Includes usage, safety, and legal implications of using pepper spray.', quiz: [{q: 'What is the primary use of pepper spray?', a: 'Defense'}] },
        { id: 'g03', title: 'Level 3: Taser Certification', duration: '2 hrs', content: 'Advanced training on taser operation and use-of-force policies.', quiz: [{q: 'What does TASER stand for?', a: 'Thomas A. Swift\'s Electric Rifle'}] },
    ],
    supervisor: [
        { id: 's01', title: 'Leadership & Team Management', duration: '2 hrs', content: 'Focuses on leadership styles, conflict resolution, and team motivation.', quiz: [{q: 'What is a key leadership trait?', a: 'Integrity'}] },
        { id: 's02', title: 'Spot Check Procedures', duration: '1.5 hrs', content: 'Details the process and standards for conducting effective spot checks.', quiz: [{q: 'How many spot checks per shift?', a: '3'}] },
    ]
};

interface TrainingModalProps {
    module: {id: string, title: string, content: string, quiz: {q: string, a: string}[]};
    onClose: () => void;
    onComplete: (moduleId: string, passed: boolean) => void;
}

const TrainingModal: React.FC<TrainingModalProps> = ({ module, onClose, onComplete }) => {
    const [step, setStep] = useState(0); // 0 for content, 1 for quiz
    const [answer, setAnswer] = useState('');
    const [showResult, setShowResult] = useState(false);
    const [passed, setPassed] = useState(false);

    const handleQuizSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const correct = answer.toLowerCase() === module.quiz[0].a.toLowerCase();
        setPassed(correct);
        setShowResult(true);
    };

    const handleFinish = () => {
        onComplete(module.id, passed);
        onClose();
    };

    return (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
            <div className="relative bg-[var(--bg-secondary)] border border-[var(--border-primary)] rounded-lg p-6 w-full max-w-2xl">
                <h3 className="text-xl font-bold text-[var(--text-primary)] mb-4">{module.title}</h3>
                {step === 0 && (
                    <div>
                        <p className="text-[var(--text-secondary)] mb-6">{module.content}</p>
                        <button onClick={() => setStep(1)} className="w-full bg-[var(--accent-primary)] text-[var(--accent-primary-text)] font-bold py-2.5 rounded-md">Start Quiz</button>
                    </div>
                )}
                {step === 1 && !showResult && (
                    <form onSubmit={handleQuizSubmit}>
                        <p className="font-semibold text-[var(--text-primary)] mb-2">{module.quiz[0].q}</p>
                        <input value={answer} onChange={e => setAnswer(e.target.value)} className="mt-1 block w-full bg-[var(--bg-secondary)] border border-[var(--border-secondary)] rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-[var(--accent-primary)] focus:border-[var(--accent-primary)] sm:text-sm" />
                        <button type="submit" className="mt-4 w-full bg-[var(--accent-primary)] text-[var(--accent-primary-text)] font-bold py-2.5 rounded-md">Submit Answer (1 Attempt)</button>
                    </form>
                )}
                {showResult && (
                     <div>
                        <p className={`text-lg font-bold ${passed ? 'text-green-500' : 'text-red-500'}`}>{passed ? 'Passed!' : 'Failed.'}</p>
                        <p className="text-[var(--text-secondary)]">The correct answer was: {module.quiz[0].a}</p>
                        <button onClick={handleFinish} className="mt-4 w-full bg-[var(--accent-secondary)] text-white font-bold py-2.5 rounded-md">Finish Training</button>
                    </div>
                )}

                <button onClick={onClose} className="absolute top-3 right-3 text-[var(--text-secondary)] hover:text-[var(--text-primary)]"><XIcon className="h-6 w-6"/></button>
            </div>
        </div>
    )
};


interface TrainingProps {
    user: User;
    onAddAppeal: (data: Omit<Appeal, 'id' | 'status' | 'dateSubmitted'>) => void;
}

const Training: React.FC<TrainingProps> = ({ user, onAddAppeal }) => {
    const [trainingStatus, setTrainingStatus] = useState<Record<string, TrainingStatus>>({});
    const [activeModule, setActiveModule] = useState<any>(null);

    const handleTrainingComplete = (moduleId: string, passed: boolean) => {
        setTrainingStatus(prev => ({ ...prev, [moduleId]: passed ? 'Passed' : 'Failed' }));
    };

    const handleAppeal = (moduleId: string, moduleTitle: string) => {
        const reason = prompt(`Please state the reason for your appeal to retake the "${moduleTitle}" quiz.`);
        if (reason) {
            onAddAppeal({
                userId: user.id,
                type: 'Training Retake',
                originalId: moduleId,
                reason,
            });
            alert('Your appeal has been submitted for review.');
        }
    };
    
    const getStatusStyles = (status: TrainingStatus) => {
        switch(status) {
            case 'Passed': return 'bg-green-100 text-green-800';
            case 'Failed': return 'bg-red-100 text-red-800';
            default: return 'bg-gray-100 text-gray-800';
        }
    };

    return (
        <>
            <div>
                <h2 className="text-2xl font-bold text-[var(--text-primary)] mb-4">Training Center</h2>
                <p className="text-[var(--text-secondary)] mb-6">Complete new training modules to unlock more mission types.</p>
                
                <div className="space-y-8">
                    <ModuleSection title="Guard Training" modules={trainingModules.guard} onSelectModule={setActiveModule} status={trainingStatus} onAppeal={handleAppeal} />
                    
                    {(user.role === 'Supervisor' || user.role === 'TrainingOfficer') &&
                        <ModuleSection title="Supervisor Training" modules={trainingModules.supervisor} onSelectModule={setActiveModule} status={trainingStatus} onAppeal={handleAppeal} />
                    }
                </div>
            </div>
            {activeModule && <TrainingModal module={activeModule} onClose={() => setActiveModule(null)} onComplete={handleTrainingComplete} />}
        </>
    );
};

const ModuleSection: React.FC<{
    title: string,
    modules: any[],
    status: Record<string, TrainingStatus>,
    onSelectModule: (module: any) => void,
    onAppeal: (id: string, title: string) => void,
}> = ({ title, modules, status, onSelectModule, onAppeal }) => (
    <div className="bg-[var(--bg-secondary)] border border-[var(--border-primary)] rounded-lg p-6">
        <h3 className="text-xl font-semibold text-[var(--text-primary)] border-b border-[var(--border-primary)] pb-2 mb-4">{title}</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {modules.map(module => (
                <div key={module.id} className="border border-[var(--border-tertiary)] bg-[var(--bg-primary)] rounded-lg p-4 flex flex-col justify-between">
                    <div>
                        <div className="flex justify-between items-center">
                            <h4 className="font-bold text-[var(--text-primary)]">{module.title}</h4>
                            <span className={`px-2 py-0.5 text-xs rounded-full ${status[module.id] === 'Passed' ? 'bg-green-100 text-green-800' : status[module.id] === 'Failed' ? 'bg-red-100 text-red-800' : 'bg-gray-100'}`}>
                                {status[module.id] || 'Not Started'}
                            </span>
                        </div>
                        <p className="text-xs text-[var(--text-secondary)] mt-1">{module.duration}</p>
                    </div>
                    <div className="mt-4">
                        {status[module.id] === 'Failed' ? (
                             <button onClick={() => onAppeal(module.id, module.title)} className="w-full text-sm bg-yellow-500 text-black font-bold py-2 rounded-md hover:bg-yellow-400">Appeal for Retake</button>
                        ) : (
                            // Fix: Use the onSelectModule prop instead of the undefined setActiveModule.
                            <button onClick={() => onSelectModule(module)} disabled={status[module.id] === 'Passed'} className="w-full text-sm bg-[var(--accent-secondary)] text-white font-bold py-2 rounded-md hover:bg-[var(--accent-secondary-hover)] disabled:bg-gray-300 disabled:cursor-not-allowed">
                                {status[module.id] === 'Passed' ? 'Completed' : 'Start Module'}
                            </button>
                        )}
                    </div>
                </div>
            ))}
        </div>
    </div>
);


export default Training;
