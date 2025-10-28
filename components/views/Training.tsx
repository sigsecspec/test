import React, { useState } from 'react';
import type { User, Appeal, TrainingModule, UserTrainingProgress } from '../../types.ts';
import { AcademicCapIcon, XIcon } from '../Icons.tsx';
import { getTrainingModules, getUserTrainingProgress, completeTraining } from '../../database.ts';

interface TrainingModalProps {
    module: TrainingModule;
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
        const correct = answer.trim().toLowerCase() === module.quiz[0].a.trim().toLowerCase();
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
                        <div className="prose max-w-none text-[var(--text-secondary)] mb-6 max-h-[50vh] overflow-y-auto pr-2">
                          <p>{module.content}</p>
                          <div className="mt-4 text-center">
                            <p className="font-bold">An audio version of this content would play here.</p>
                          </div>
                        </div>
                        <button onClick={() => setStep(1)} className="w-full bg-[var(--accent-primary)] text-[var(--accent-primary-text)] font-bold py-2.5 rounded-md">Start Quiz</button>
                    </div>
                )}
                {step === 1 && !showResult && (
                    <form onSubmit={handleQuizSubmit}>
                        <p className="font-semibold text-[var(--text-primary)] mb-2">{module.quiz[0].q}</p>
                        <input value={answer} onChange={e => setAnswer(e.target.value)} className="mt-1 block w-full bg-[var(--bg-secondary)] border border-[var(--border-secondary)] rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-[var(--accent-primary)] focus:border-[var(--accent-primary)] sm:text-sm" />
                        <p className="text-xs text-yellow-600 mt-2">You only get one attempt at this quiz.</p>
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
    const allModules = getTrainingModules();
    const userProgress = getUserTrainingProgress(user.id);
    const [activeModule, setActiveModule] = useState<TrainingModule | null>(null);
    const [_, setForceRender] = useState(0); // Helper to force re-render on completion

    const handleTrainingComplete = (moduleId: string, passed: boolean) => {
        completeTraining(user.id, moduleId, passed);
        setForceRender(c => c + 1); // Trigger re-fetch of progress
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

    const getModuleStatus = (moduleId: string) => {
        const progress = userProgress.find(p => p.moduleId === moduleId);
        return progress ? progress.status : 'Not Started';
    }

    const sections = [
        { title: "Guard Training", modules: allModules.filter(m => m.type === 'guard') },
        { title: "Lead Guard Training", modules: allModules.filter(m => m.type === 'lead-guard') },
        { title: "Supervisor Training", modules: allModules.filter(m => m.type === 'supervisor') },
        { title: "Training Officer Training", modules: allModules.filter(m => m.type === 'training-officer') },
    ];
    
    return (
        <>
            <div>
                <h2 className="text-2xl font-bold text-[var(--text-primary)] mb-4">Training Center</h2>
                <p className="text-[var(--text-secondary)] mb-6">Complete new training modules to unlock more mission types and apply for promotions.</p>
                
                <div className="space-y-8">
                    {sections.map(section => (
                        <ModuleSection 
                            key={section.title}
                            title={section.title}
                            modules={section.modules}
                            onSelectModule={setActiveModule}
                            getModuleStatus={getModuleStatus}
                            onAppeal={handleAppeal}
                        />
                    ))}
                </div>
            </div>
            {activeModule && <TrainingModal module={activeModule} onClose={() => setActiveModule(null)} onComplete={handleTrainingComplete} />}
        </>
    );
};

const ModuleSection: React.FC<{
    title: string,
    modules: TrainingModule[],
    getModuleStatus: (moduleId: string) => UserTrainingProgress['status'],
    onSelectModule: (module: TrainingModule) => void,
    onAppeal: (id: string, title: string) => void,
}> = ({ title, modules, getModuleStatus, onSelectModule, onAppeal }) => {
    if (modules.length === 0) return null;

    return (
        <div className="bg-[var(--bg-secondary)] border border-[var(--border-primary)] rounded-lg p-6">
            <h3 className="text-xl font-semibold text-[var(--text-primary)] border-b border-[var(--border-primary)] pb-2 mb-4">{title}</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {modules.map(module => {
                    const status = getModuleStatus(module.id);
                    return (
                        <div key={module.id} className="border border-[var(--border-tertiary)] bg-[var(--bg-primary)] rounded-lg p-4 flex flex-col justify-between">
                            <div>
                                <div className="flex justify-between items-center">
                                    <h4 className="font-bold text-[var(--text-primary)]">{module.title}</h4>
                                    <span className={`px-2 py-0.5 text-xs rounded-full ${status === 'Passed' ? 'bg-green-100 text-green-800' : status === 'Failed' ? 'bg-red-100 text-red-800' : 'bg-gray-100'}`}>
                                        {status}
                                    </span>
                                </div>
                                <p className="text-xs text-[var(--text-secondary)] mt-1">{module.duration}</p>
                            </div>
                            <div className="mt-4">
                                {status === 'Failed' ? (
                                    <button onClick={() => onAppeal(module.id, module.title)} className="w-full text-sm bg-yellow-500 text-black font-bold py-2 rounded-md hover:bg-yellow-400">Appeal for Retake</button>
                                ) : (
                                    <button onClick={() => onSelectModule(module)} disabled={status === 'Passed' || status === 'Pending Approval'} className="w-full text-sm bg-[var(--accent-secondary)] text-white font-bold py-2 rounded-md hover:bg-[var(--accent-secondary-hover)] disabled:bg-gray-400 disabled:cursor-not-allowed">
                                        {status === 'Passed' ? 'Completed' : status === 'Pending Approval' ? 'Pending' : 'Start Module'}
                                    </button>
                                )}
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default Training;
