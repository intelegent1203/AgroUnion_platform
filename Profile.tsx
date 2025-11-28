import React from 'react';
import type { Language, User, Suggestion } from '../types';
import { SectionCard } from './SectionCard';

const translations = {
    title: { uz: 'Shaxsiy Kabinet', ru: 'Личный Кабинет', en: 'Profile' },
    fullName: { uz: 'To\'liq Ism', ru: 'Полное Имя', en: 'Full Name' },
    role: { uz: 'Rol', ru: 'Роль', en: 'Role' },
    email: { uz: 'Elektron pochta', ru: 'Электронная почта', en: 'Email' },
    phone: { uz: 'Telefon', ru: 'Телефон', en: 'Phone' },
    roleNames: {
        admin: { uz: 'Administrator', ru: 'Администратор', en: 'Administrator' },
        scientist: { uz: 'Olim', ru: 'Ученый', en: 'Scientist' },
        farmer: { uz: 'Fermer', ru: 'Фермер', en: 'Farmer' },
        student: { uz: 'Talaba', ru: 'Студент', en: 'Student' },
        enthusiast: { uz: 'Qiziquvchi', ru: 'Энтузиаст', en: 'Enthusiast' },
        entrepreneur: { uz: 'Tadbirkor', ru: 'Предприниматель', en: 'Entrepreneur' },
    },
    activityLog: { uz: 'Faollik jurnali', ru: 'Журнал активности', en: 'Activity Log' },
    activities: {
        login: { uz: 'Tizimga kirdi', ru: 'Выполнен вход', en: 'Logged in' },
        viewedStats: { uz: 'Statistika sahifasini ko\'rdi', ru: 'Просмотрена страница статистики', en: 'Viewed Statistics page' },
        updatedProfile: { uz: 'Profil ma\'lumotlarini yangiladi', ru: 'Обновлена информация профиля', en: 'Updated profile information' },
    },
    timestamps: {
        now: { uz: 'hozir', ru: 'только что', en: 'just now' },
        minutes: { uz: '5 daqiqa oldin', ru: '5 минут назад', en: '5 minutes ago' },
        hours: { uz: '2 soat oldin', ru: '2 часа назад', en: '2 hours ago' },
    },
    userSuggestionsTitle: { uz: 'Foydalanuvchi Takliflari', ru: 'Предложения Пользователей', en: 'User Suggestions' },
    from: { uz: 'dan', ru: 'от', en: 'from' },
    noSuggestions: { uz: 'Hozircha takliflar yo\'q.', ru: 'Пока нет предложений.', en: 'No suggestions yet.' },
};

interface ProfileProps {
    language: Language;
    user: User;
    suggestions: Suggestion[];
}

const activityLogData = [
    { id: 1, action: 'login', timestamp: 'now' },
    { id: 2, action: 'viewedStats', timestamp: 'minutes' },
    { id: 3, action: 'updatedProfile', timestamp: 'hours' },
] as const;

export const Profile: React.FC<ProfileProps> = ({ language, user, suggestions }) => {
    return (
        <div className="space-y-8">
            <SectionCard title={translations.title[language]}>
                <div className="max-w-lg mx-auto bg-white p-8 rounded-xl">
                    <div className="space-y-4">
                        <div className="flex flex-col">
                            <span className="text-sm font-medium text-gray-500">{translations.fullName[language]}</span>
                            <span className="text-lg font-semibold text-gray-800">{user.firstName} {user.lastName}</span>
                        </div>
                        <div className="flex flex-col">
                            <span className="text-sm font-medium text-gray-500">{translations.role[language]}</span>
                            <span className={`text-lg font-semibold ${user.role === 'admin' ? 'text-red-600' : 'text-gray-800'}`}>
                                {translations.roleNames[user.role][language]}
                            </span>
                        </div>
                        <div className="flex flex-col">
                            <span className="text-sm font-medium text-gray-500">{translations.email[language]}</span>
                            <span className="text-lg font-semibold text-gray-800">{user.email}</span>
                        </div>
                        {user.phone && (
                            <div className="flex flex-col">
                                <span className="text-sm font-medium text-gray-500">{translations.phone[language]}</span>
                                <span className="text-lg font-semibold text-gray-800">{user.phone}</span>
                            </div>
                        )}
                    </div>

                    <div className="mt-8 pt-6 border-t border-gray-200">
                        <h3 className="text-lg font-semibold text-gray-700 mb-4">{translations.activityLog[language]}</h3>
                        <ul className="space-y-3">
                            {activityLogData.map(item => (
                                <li key={item.id} className="flex justify-between items-center text-sm">
                                    <span className="text-gray-600">{translations.activities[item.action][language]}</span>
                                    <span className="text-gray-400">{translations.timestamps[item.timestamp][language]}</span>
                                </li>
                            ))}
                        </ul>
                    </div>

                </div>
            </SectionCard>
            
            {user.role === 'admin' && (
                <SectionCard title={translations.userSuggestionsTitle[language]}>
                    <div className="space-y-4">
                        {suggestions.length > 0 ? (
                            suggestions.map((suggestion, index) => (
                                <div key={index} className="bg-green-50/70 p-4 rounded-lg border border-green-200">
                                    <div className="flex justify-between items-center mb-2">
                                        <p className="font-semibold text-gray-800">
                                            {suggestion.name} <span className="text-gray-500 font-normal">({suggestion.email})</span>
                                        </p>
                                        <p className="text-xs text-gray-500">{suggestion.timestamp.toLocaleString(language)}</p>
                                    </div>
                                    <p className="text-gray-700 whitespace-pre-wrap">{suggestion.message}</p>
                                </div>
                            ))
                        ) : (
                            <p className="text-gray-500 text-center py-4">{translations.noSuggestions[language]}</p>
                        )}
                    </div>
                </SectionCard>
            )}
        </div>
    );
};