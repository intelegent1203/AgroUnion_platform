import React, { useState } from 'react';
import type { Language, NavItemId, User } from '../types';
import { SectionCard } from './SectionCard';
import { ArrowLeftIcon } from './IconComponents';

const translations = {
    title: { uz: 'Administrator Sifatida Ro\'yxatdan O\'tish', ru: 'Регистрация как Администратор', en: 'Register as an Administrator' },
    emailPlaceholder: { uz: 'Elektron pochta', ru: 'Электронная почта', en: 'Email Address' },
    passwordPlaceholder: { uz: 'Parol', ru: 'Пароль', en: 'Password' },
    registerButton: { uz: 'Ro\'yxatdan o\'tish', ru: 'Зарегистрироваться', en: 'Register' },
    hasAccount: { uz: 'Hisobingiz bormi?', ru: 'Уже есть аккаунт?', en: 'Already have an account?' },
    loginNow: { uz: 'Tizimga kiring', ru: 'Войдите', en: 'Log in' },
    back: { uz: 'Orqaga', ru: 'Назад', en: 'Back' },
    adminEmailRequirement: { uz: 'Faqat belgilangan administrator pochtasi bilan ro\'yxatdan o\'tish mumkin.', ru: 'Регистрация возможна только с указанной электронной почтой администратора.', en: 'Registration is only possible with a designated administrator email.'}
};

interface RegisterAdminFormProps {
    language: Language;
    onRegister: (user: User) => void;
    onBack: () => void;
    setActiveSection: (section: NavItemId) => void;
}

export const RegisterAdminForm: React.FC<RegisterAdminFormProps> = ({ language, onRegister, onBack, setActiveSection }) => {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const newUser: User = {
            firstName: 'Admin',
            lastName: 'User',
            role: 'admin',
            email: formData.email,
        };
        onRegister(newUser);
    };

    return (
        <SectionCard title={translations.title[language]}>
            <div className="max-w-md mx-auto">
                 <button onClick={onBack} className="mb-4 inline-flex items-center text-sm font-medium text-gray-600 hover:text-gray-800">
                    <ArrowLeftIcon className="h-4 w-4 mr-1" />
                    {translations.back[language]}
                </button>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <p className="text-sm text-gray-500 bg-yellow-50 p-3 rounded-md border border-yellow-200">{translations.adminEmailRequirement[language]}</p>
                    <input type="email" name="email" placeholder={translations.emailPlaceholder[language]} onChange={handleInputChange} required className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 bg-white text-gray-900 placeholder:text-gray-400" />
                    <input type="password" name="password" placeholder={translations.passwordPlaceholder[language]} onChange={handleInputChange} required className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 bg-white text-gray-900 placeholder:text-gray-400" />

                    <button type="submit" className="w-full px-8 py-3 bg-gray-800 text-white font-bold rounded-lg hover:bg-gray-900 transition transform hover:scale-105 shadow-lg">
                        {translations.registerButton[language]}
                    </button>
                </form>
                <p className="mt-6 text-center text-gray-600">
                    {translations.hasAccount[language]}{' '}
                    <a href="#" onClick={(e) => { e.preventDefault(); setActiveSection('login'); }} className="font-medium text-green-600 hover:text-green-700">
                        {translations.loginNow[language]}
                    </a>
                </p>
            </div>
        </SectionCard>
    );
};