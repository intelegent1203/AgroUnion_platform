import React from 'react';
import type { Language } from '../types';
import { SectionCard } from './SectionCard';
import { SparklesIcon, UserAddIcon, UsersIcon } from './IconComponents';

interface StatisticsProps {
  language: Language;
}

const translations = {
  userStatsTitle: { uz: 'Platformadan foydalanish statistikasi', ru: 'Статистика использования платформы', en: 'Platform Usage Statistics' },
  onlineUsers: { uz: 'Onlayn foydalanuvchilar', ru: 'Пользователи онлайн', en: 'Online Users' },
  newUsers: { uz: 'Yangi ro\'yxatdan o\'tganlar (bugun)', ru: 'Новые регистрации (сегодня)', en: 'New Registrations (today)' },
  activeSection: { uz: 'Eng faol bo\'lim', ru: 'Самый активный раздел', en: 'Most Active Section' },
  technologiesSection: { uz: 'Texnologiyalar', ru: 'Технологии', en: 'Technologies' },
};

const StatCard: React.FC<{ icon: React.ReactNode; title: string; value: string; color: string }> = ({ icon, title, value, color }) => (
    <div className="bg-white p-6 rounded-xl shadow-md flex items-center space-x-4">
        <div className={`p-3 rounded-full ${color}`}>
            {icon}
        </div>
        <div>
            <p className="text-sm text-gray-500">{title}</p>
            <p className="text-2xl font-bold text-gray-800">{value}</p>
        </div>
    </div>
);


export const Statistics: React.FC<StatisticsProps> = ({ language }) => {

  const userStats = [
    { 
        icon: <UsersIcon className="w-6 h-6 text-teal-800"/>, 
        title: translations.onlineUsers[language], 
        value: '142', 
        color: 'bg-teal-100' 
    },
    { 
        icon: <UserAddIcon className="w-6 h-6 text-indigo-800"/>, 
        title: translations.newUsers[language], 
        value: '12', 
        color: 'bg-indigo-100' 
    },
    { 
        icon: <SparklesIcon className="w-6 h-6 text-amber-800"/>, 
        title: translations.activeSection[language], 
        value: translations.technologiesSection[language], 
        color: 'bg-amber-100' 
    },
  ];

  return (
    <SectionCard title={translations.userStatsTitle[language]}>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {userStats.map((stat, index) => (
                 <StatCard key={index} icon={stat.icon} title={stat.title} value={stat.value} color={stat.color} />
            ))}
        </div>
    </SectionCard>
  );
};