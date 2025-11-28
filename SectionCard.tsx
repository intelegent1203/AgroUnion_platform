import React from 'react';

interface SectionCardProps {
    title: string;
    children: React.ReactNode;
    className?: string;
}

export const SectionCard: React.FC<SectionCardProps> = ({ title, children, className }) => {
    return (
        <div className={`bg-white p-6 sm:p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden ${className}`}>
            <h2 className="text-2xl sm:text-3xl font-bold text-green-800 border-b-2 border-green-200 pb-4 mb-6">{title}</h2>
            {children}
        </div>
    );
};