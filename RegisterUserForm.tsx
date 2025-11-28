import React, { useState } from 'react';
import type { Language, NavItemId, User, UserRole } from '../types';
import { SectionCard } from './SectionCard';
import { ArrowLeftIcon } from './IconComponents';

const translations = {
    title: { uz: 'Foydalanuvchi Sifatida Ro\'yxatdan O\'tish', ru: 'Регистрация как Пользователь', en: 'Register as a User' },
    firstNamePlaceholder: { uz: 'Ism', ru: 'Имя', en: 'First Name' },
    lastNamePlaceholder: { uz: 'Familiya', ru: 'Фамилия', en: 'Last Name' },
    roleLabel: { uz: 'Kasbingiz', ru: 'Ваша профессия', en: 'Your Profession' },
    roleOptions: {
        scientist: { uz: 'Olim', ru: 'Ученый', en: 'Scientist' },
        farmer: { uz: 'Fermer', ru: 'Фермер', en: 'Farmer' },
        student: { uz: 'Talaba', ru: 'Студент', en: 'Student' },
        enthusiast: { uz: 'Qiziquvchi', ru: 'Энтузиаст', en: 'Enthusiast' },
        entrepreneur: { uz: 'Tadbirkor', ru: 'Предприниматель', en: 'Entrepreneur' },
    },
    phonePlaceholder: { uz: 'Telefon raqami', ru: 'Номер телефона', en: 'Phone Number' },
    emailPlaceholder: { uz: 'Elektron pochta', ru: 'Электронная почта', en: 'Email Address' },
    passwordPlaceholder: { uz: 'Parol', ru: 'Пароль', en: 'Password' },
    registerButton: { uz: 'Ro\'yxatdan o\'tish', ru: 'Зарегистрироваться', en: 'Register' },
    hasAccount: { uz: 'Hisobingiz bormi?', ru: 'Уже есть аккаунт?', en: 'Already have an account?' },
    loginNow: { uz: 'Tizimga kiring', ru: 'Войдите', en: 'Log in' },
    back: { uz: 'Orqaga', ru: 'Назад', en: 'Back' },
};

interface RegisterUserFormProps {
    language: Language;
    onRegister: (user: User) => void;
    onBack: () => void;
    setActiveSection: (section: NavItemId) => void;
}

export const RegisterUserForm: React.FC<RegisterUserFormProps> = ({ language, onRegister, onBack, setActiveSection }) => {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        role: 'farmer' as UserRole,
        phone: '',
        email: '',
        password: '',
    });

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const newUser: User = {
            firstName: formData.firstName,
            lastName: formData.lastName,
            role: formData.role,
            phone: formData.phone,
            email: formData.email,
        };
        onRegister(newUser);
    };

    const roleKeys = Object.keys(translations.roleOptions) as Exclude<UserRole, 'admin'>[];

    return (
        <SectionCard title={translations.title[language]}>
            <div className="max-w-md mx-auto">
                <button onClick={onBack} className="mb-4 inline-flex items-center text-sm font-medium text-gray-600 hover:text-gray-800">
                    <ArrowLeftIcon className="h-4 w-4 mr-1" />
                    {translations.back[language]}
                </button>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="flex space-x-4">
                        <input type="text" name="firstName" placeholder={translations.firstNamePlaceholder[language]} onChange={handleInputChange} required className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 bg-white text-gray-900 placeholder:text-gray-400" />
                        <input type="text" name="lastName" placeholder={translations.lastNamePlaceholder[language]} onChange={handleInputChange} required className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 bg-white text-gray-900 placeholder:text-gray-400" />
                    </div>
                     <div>
                        <label htmlFor="role" className="block text-sm font-medium text-gray-700 mb-1">{translations.roleLabel[language]}</label>
                        <select name="role" id="role" value={formData.role} onChange={handleInputChange} required className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 bg-white text-gray-900">
                            {roleKeys.map(key => (
                                <option key={key} value={key}>{translations.roleOptions[key as keyof typeof translations.roleOptions][language]}</option>
                            ))}
                        </select>
                    </div>
                    <input type="tel" name="phone" placeholder={translations.phonePlaceholder[language]} onChange={handleInputChange} required className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 bg-white text-gray-900 placeholder:text-gray-400" />
                    <input type="email" name="email" placeholder={translations.emailPlaceholder[language]} onChange={handleInputChange} required className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 bg-white text-gray-900 placeholder:text-gray-400" />
                    <input type="password" name="password" placeholder={translations.passwordPlaceholder[language]} onChange={handleInputChange} required className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 bg-white text-gray-900 placeholder:text-gray-400" />

                    <button type="submit" className="w-full px-8 py-3 bg-green-600 text-white font-bold rounded-lg hover:bg-green-700 transition transform hover:scale-105 shadow-lg">
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