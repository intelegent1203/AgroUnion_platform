import React, { useState } from 'react';
import type { Language, NavItemId, User } from '../types';
import { SectionCard } from './SectionCard';
import { RegisterUserForm } from './RegisterUserForm';
import { RegisterAdminForm } from './RegisterAdminForm';

const translations = {
    title: { uz: 'Ro\'yxatdan O\'tish', ru: 'Регистрация', en: 'Registration' },
    chooseRole: { uz: 'Rolingizni tanlang', ru: 'Выберите вашу роль', en: 'Choose your role' },
    asUser: { uz: 'Foydalanuvchi', ru: 'Пользователь', en: 'User' },
    userDescription: { uz: 'Fermer, talaba, olim yoki soha qiziquvchisi sifatida ro\'yxatdan o\'tish.', ru: 'Регистрация в качестве фермера, студента, ученого или энтузиаста отрасли.', en: 'Register as a farmer, student, scientist, or industry enthusiast.' },
    asAdmin: { uz: 'Administrator', ru: 'Администратор', en: 'Administrator' },
    adminDescription: { uz: 'Platformani boshqarish uchun maxsus kirish.', ru: 'Специальный доступ для управления платформой.', en: 'Special access to manage the platform.' },
    hasAccount: { uz: 'Hisobingiz bormi?', ru: 'Уже есть аккаунт?', en: 'Already have an account?' },
    loginNow: { uz: 'Tizimga kiring', ru: 'Войдите', en: 'Log in' },
};

interface RegisterProps {
    language: Language;
    onRegister: (user: User) => void;
    setActiveSection: (section: NavItemId) => void;
}

export const Register: React.FC<RegisterProps> = ({ language, onRegister, setActiveSection }) => {
    const [registrationType, setRegistrationType] = useState<'selection' | 'user' | 'admin'>('selection');

    if (registrationType === 'user') {
        return <RegisterUserForm language={language} onRegister={onRegister} onBack={() => setRegistrationType('selection')} setActiveSection={setActiveSection} />;
    }

    if (registrationType === 'admin') {
        return <RegisterAdminForm language={language} onRegister={onRegister} onBack={() => setRegistrationType('selection')} setActiveSection={setActiveSection} />;
    }

    return (
        <SectionCard title={translations.title[language]}>
            <div className="max-w-2xl mx-auto text-center">
                <h3 className="text-xl font-semibold text-gray-700 mb-8">{translations.chooseRole[language]}</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div
                        onClick={() => setRegistrationType('user')}
                        className="p-8 border-2 border-green-200 rounded-lg text-center cursor-pointer hover:bg-green-50 hover:border-green-400 transition-all duration-300"
                    >
                        <h4 className="text-2xl font-bold text-green-700 mb-2">{translations.asUser[language]}</h4>
                        <p className="text-gray-600">{translations.userDescription[language]}</p>
                    </div>

                    <div
                        onClick={() => setRegistrationType('admin')}
                        className="p-8 border-2 border-gray-200 rounded-lg text-center cursor-pointer hover:bg-gray-50 hover:border-gray-400 transition-all duration-300"
                    >
                        <h4 className="text-2xl font-bold text-gray-800 mb-2">{translations.asAdmin[language]}</h4>
                        <p className="text-gray-600">{translations.adminDescription[language]}</p>
                    </div>
                </div>
                 <p className="mt-8 text-center text-gray-600">
                    {translations.hasAccount[language]}{' '}
                    <a href="#" onClick={(e) => { e.preventDefault(); setActiveSection('login'); }} className="font-medium text-green-600 hover:text-green-700">
                        {translations.loginNow[language]}
                    </a>
                </p>
            </div>
        </SectionCard>
    );
};
