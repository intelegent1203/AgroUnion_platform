
import React, { useState } from 'react';
import type { Language, NavItemId, User } from '../types';
import { SectionCard } from './SectionCard';

const translations = {
    title: { uz: 'Tizimga Kirish', ru: 'Вход в систему', en: 'Login' },
    emailPlaceholder: { uz: 'Elektron pochta', ru: 'Электронная почта', en: 'Email Address' },
    passwordPlaceholder: { uz: 'Parol', ru: 'Пароль', en: 'Password' },
    loginButton: { uz: 'Kirish', ru: 'Войти', en: 'Login' },
    noAccount: { uz: 'Hisobingiz yo\'qmi?', ru: 'Нет аккаунта?', en: 'Don\'t have an account?' },
    registerNow: { uz: 'Hoziroq ro\'yxatdan o\'ting', ru: 'Зарегистрируйтесь сейчас', en: 'Register now' },
    error: { uz: 'Noto\'g\'ri email yoki parol', ru: 'Неверный email или пароль', en: 'Incorrect email or password' },
};

interface LoginProps {
    language: Language;
    onLogin: (user: User) => void;
    setActiveSection: (section: NavItemId) => void;
}

export const Login: React.FC<LoginProps> = ({ language, onLogin, setActiveSection }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setError('');

        // Mock authentication
        if (email === 'admin@agrounion.uz' && password === 'admin123') {
            onLogin({
                firstName: 'Admin',
                lastName: 'User',
                email: 'admin@agrounion.uz',
                role: 'admin'
            });
        } else if (email && password) {
             onLogin({
                firstName: 'Test',
                lastName: 'Foydalanuvchi',
                email: email,
                phone: '+998901234567',
                role: 'farmer'
            });
        } else {
            setError(translations.error[language]);
        }
    };

    return (
        <SectionCard title={translations.title[language]}>
            <div className="max-w-md mx-auto">
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label htmlFor="email" className="sr-only">{translations.emailPlaceholder[language]}</label>
                        <input
                            type="email"
                            name="email"
                            id="email"
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 bg-white text-gray-900 placeholder:text-gray-400"
                            placeholder={translations.emailPlaceholder[language]}
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="password" className="sr-only">{translations.passwordPlaceholder[language]}</label>
                        <input
                            type="password"
                            name="password"
                            id="password"
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 bg-white text-gray-900 placeholder:text-gray-400"
                            placeholder={translations.passwordPlaceholder[language]}
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    
                    {error && <p className="text-red-500 text-sm">{error}</p>}

                    <div>
                        <button type="submit" className="w-full px-8 py-3 bg-green-600 text-white font-bold rounded-lg hover:bg-green-700 transition transform hover:scale-105 shadow-lg">
                            {translations.loginButton[language]}
                        </button>
                    </div>
                </form>
                <p className="mt-6 text-center text-gray-600">
                    {translations.noAccount[language]}{' '}
                    <a href="#" onClick={(e) => {e.preventDefault(); setActiveSection('register')}} className="font-medium text-green-600 hover:text-green-700">
                        {translations.registerNow[language]}
                    </a>
                </p>
            </div>
        </SectionCard>
    );
};