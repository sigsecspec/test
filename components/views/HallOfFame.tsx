import React from 'react';
import { User, HallOfFameEntry } from '../../types.ts';
import { UserIcon, TrophyIcon } from '../Icons.tsx';

interface HallOfFameProps {
    users: User[];
    hallOfFameEntries: HallOfFameEntry[];
}

const HallOfFame: React.FC<HallOfFameProps> = ({ users, hallOfFameEntries }) => {

    const groupedByMonth = hallOfFameEntries.reduce((acc, entry) => {
        (acc[entry.month] = acc[entry.month] || []).push(entry);
        return acc;
    }, {} as Record<string, HallOfFameEntry[]>);

    const sortedMonths = Object.keys(groupedByMonth).sort((a, b) => new Date(b).getTime() - new Date(a).getTime());

    const getUserById = (id: string): User | undefined => users.find(u => u.id === id);

    return (
        <div>
            <div className="flex items-center mb-6">
                <TrophyIcon className="w-8 h-8 text-[var(--accent-primary)] mr-3" />
                <h2 className="text-3xl font-bold text-[var(--text-primary)]">Hall of Fame</h2>
            </div>
            <p className="text-[var(--text-secondary)] mb-8">Recognizing the exceptional performance and dedication of our top security specialists.</p>

            {sortedMonths.length > 0 ? (
                <div className="space-y-10">
                    {sortedMonths.map((month, index) => (
                        <div key={month} className="animate-in" style={{ animationDelay: `${100 * (index + 1)}ms`, opacity: 0 }}>
                            <h3 className="text-2xl font-semibold text-[var(--accent-primary)] border-b-2 border-[var(--border-secondary)] pb-2 mb-6">{month}</h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {groupedByMonth[month].map(entry => {
                                    const user = getUserById(entry.userId);
                                    if (!user) return null;
                                    return (
                                        <div key={entry.id} className="bg-[var(--bg-secondary)] border border-[var(--border-primary)] rounded-lg p-6 flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-6 hover:border-[var(--border-primary-hover)] transition-colors duration-300 shadow-lg" style={{'--tw-shadow-color': 'var(--shadow-color)'} as React.CSSProperties}>
                                            <div className="flex-shrink-0">
                                                <div className="w-20 h-20 rounded-full bg-[var(--accent-secondary-hover)] flex items-center justify-center border-2 border-[var(--border-tertiary)]">
                                                    <UserIcon className="w-12 h-12 text-[var(--accent-primary)]" />
                                                </div>
                                            </div>
                                            <div className="text-center sm:text-left">
                                                <p className="text-sm font-bold text-[var(--accent-primary)]">{entry.award}</p>
                                                <h4 className="text-xl font-bold text-[var(--text-primary)]">{user.firstName} {user.lastName}</h4>
                                                <p className="text-sm text-[var(--text-secondary)] mt-1">{user.rank}</p>
                                                <p className="text-sm text-[var(--text-primary)] mt-3 italic">"{entry.reason}"</p>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <div className="text-center py-12 bg-[var(--bg-secondary)] border border-[var(--border-primary)] rounded-lg">
                    <TrophyIcon className="w-16 h-16 mx-auto text-[var(--text-secondary)] mb-4" />
                    <p className="text-[var(--text-secondary)]">The Hall of Fame is being polished. Check back soon to see our top performers!</p>
                </div>
            )}
        </div>
    );
};

export default HallOfFame;