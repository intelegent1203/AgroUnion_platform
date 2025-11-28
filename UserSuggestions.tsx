
import React, { useState } from 'react';
import type { Language, Suggestion } from '../types';
import { SectionCard } from './SectionCard';

const translations = {
    title: {
        uz: 'Foydalanuvchi Takliflari',
        ru: 'Предложения Пользователей',
        en: 'User Suggestions',
    },
    intro: {
        uz: 'Platformamizni siz bilan birga rivojlantiramiz! Quyidagi yo\'nalishlar bo\'yicha o\'z takliflaringizni yuborishingiz mumkin. Har bir taklif biz uchun qadrli va platformani yaxshilashga yordam beradi.',
        ru: 'Мы развиваем нашу платформу вместе с вами! Вы можете отправлять свои предложения по следующим направлениям. Каждое предложение ценно для нас и помогает улучшить платформу.',
        en: 'We are developing our platform together with you! You can send your suggestions in the following areas. Every suggestion is valuable to us and helps to improve the platform.',
    },
    suggestionsList: [
        {
            icon: '🆕',
            title: {
                uz: 'Yangi ma\'lumotlar qo\'shish',
                ru: 'Добавление новой информации',
                en: 'Adding new information',
            },
            description: {
                uz: 'Sohaga oid yangi statistik ma\'lumotlar, maqolalar, yoki tadqiqotlar bormi? Biz bilan bo\'lishing!',
                ru: 'Есть ли новые статистические данные, статьи или исследования в данной области? Поделитесь с нами!',
                en: 'Are there new statistics, articles, or research in the field? Share them with us!',
            }
        },
        {
            icon: '🛠️',
            title: {
                uz: 'Mavjud ma\'lumotlarni takomillashtirish',
                ru: 'Улучшение существующей информации',
                en: 'Improving existing information',
            },
            description: {
                uz: 'Platformadagi ma\'lumotlarda noaniqlik yoki xatolik sezdizmi? Yoki uni qanday yaxshilash bo\'yicha fikringiz bormi?',
                ru: 'Заметили неточность или ошибку в информации на платформе? Или у вас есть идеи, как ее улучшить?',
                en: 'Did you notice an inaccuracy or error in the information on the platform? Or do you have an idea on how to improve it?',
            }
        },
        {
            icon: '📂',
            title: {
                uz: 'Yangi bo\'limlar yaratish',
                ru: 'Создание новых разделов',
                en: 'Creating new sections',
            },
            description: {
                uz: 'Platformada yetishmayotgan, ammo foydali bo\'lishi mumkin bo\'lgan yangi bo\'limlar haqida taklif bering.',
                ru: 'Предложите новые разделы, которых не хватает на платформе, но которые могли бы быть полезными.',
                en: 'Suggest new sections that are missing from the platform but could be useful.',
            }
        },
        {
            icon: '💡',
            title: {
                uz: 'Texnik takliflar',
                ru: 'Технические предложения',
                en: 'Technical suggestions',
            },
            description: {
                uz: 'Saytning ishlashi, dizayni yoki funksionalligi bo\'yicha takliflaringiz bormi? Ularni eshitishdan mamnun bo\'lamiz.',
                ru: 'У вас есть предложения по работе, дизайну или функциональности сайта? Мы будем рады их услышать.',
                en: 'Do you have suggestions for the site\'s performance, design, or functionality? We would be happy to hear them.',
            }
        },
    ],
    formTitle: {
        uz: 'Taklifingizni yuboring',
        ru: 'Отправьте ваше предложение',
        en: 'Send your suggestion',
    },
    namePlaceholder: {
        uz: 'Ismingiz',
        ru: 'Ваше имя',
        en: 'Your Name',
    },
    emailPlaceholder: {
        uz: 'Elektron pochta',
        ru: 'Электронная почта',
        en: 'Email Address',
    },
    suggestionPlaceholder: {
        uz: 'Taklifingiz matni...',
        ru: 'Текст вашего предложения...',
        en: 'Your suggestion text...',
    },
    sendButton: {
        uz: 'Yuborish',
        ru: 'Отправить',
        en: 'Send',
    },
    successMessage: {
        uz: 'Rahmat! Taklifingiz muvaffaqiyatli yuborildi.',
        ru: 'Спасибо! Ваше предложение успешно отправлено.',
        en: 'Thank you! Your suggestion has been sent successfully.',
    },
    sendAnother: {
        uz: 'Yana taklif yuborish',
        ru: 'Отправить еще одно предложение',
        en: 'Send another suggestion',
    },
};

interface UserSuggestionsProps {
    language: Language;
    onSuggestionSubmit: (suggestion: Omit<Suggestion, 'timestamp'>) => void;
}

export const UserSuggestions: React.FC<UserSuggestionsProps> = ({ language, onSuggestionSubmit }) => {
    const [formData, setFormData] = useState({ name: '', email: '', message: '' });
    const [isSubmitted, setIsSubmitted] = useState(false);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (formData.name && formData.email && formData.message) {
            onSuggestionSubmit(formData);
            setFormData({ name: '', email: '', message: '' });
            setIsSubmitted(true);
        }
    };

    return (
        <SectionCard title={translations.title[language]}>
            <div className="space-y-12">
                <div>
                    <p className="text-gray-600 leading-relaxed mb-8">{translations.intro[language]}</p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {translations.suggestionsList.map((suggestion, index) => (
                            <div key={index} className="flex items-start p-4 bg-green-50/70 rounded-lg">
                                <span className="mr-4 text-3xl mt-1">{suggestion.icon}</span>
                                <div>
                                    <h4 className="text-lg font-semibold text-gray-800">{suggestion.title[language]}</h4>
                                    <p className="text-gray-600">{suggestion.description[language]}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="pt-8 border-t border-green-200">
                    <h3 className="text-2xl font-bold text-gray-800 mb-6 text-center">{translations.formTitle[language]}</h3>
                    <div className="max-w-xl mx-auto">
                        {isSubmitted ? (
                            <div className="text-center p-8 bg-green-100 border border-green-300 rounded-lg">
                                <p className="text-xl font-semibold text-green-800">{translations.successMessage[language]}</p>
                                <button
                                    onClick={() => setIsSubmitted(false)}
                                    className="mt-4 px-6 py-2 bg-green-600 text-white font-semibold rounded-full hover:bg-green-700 transition"
                                >
                                    {translations.sendAnother[language]}
                                </button>
                            </div>
                        ) : (
                            <form className="space-y-4" onSubmit={handleSubmit}>
                                <div>
                                    <label htmlFor="name" className="sr-only">{translations.namePlaceholder[language]}</label>
                                    <input type="text" name="name" id="name" value={formData.name} onChange={handleInputChange} required className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 bg-white text-gray-900 placeholder:text-gray-400" placeholder={translations.namePlaceholder[language]} />
                                </div>
                                <div>
                                    <label htmlFor="email" className="sr-only">{translations.emailPlaceholder[language]}</label>
                                    <input type="email" name="email" id="email" value={formData.email} onChange={handleInputChange} required className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 bg-white text-gray-900 placeholder:text-gray-400" placeholder={translations.emailPlaceholder[language]} />
                                </div>
                                <div>
                                    <label htmlFor="message" className="sr-only">{translations.suggestionPlaceholder[language]}</label>
                                    <textarea name="message" id="message" rows={5} value={formData.message} onChange={handleInputChange} required className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 bg-white text-gray-900 placeholder:text-gray-400" placeholder={translations.suggestionPlaceholder[language]}></textarea>
                                </div>
                                <div className="text-center">
                                    <button type="submit" className="px-8 py-3 bg-green-600 text-white font-bold rounded-full hover:bg-green-700 transition transform hover:scale-105 shadow-lg">
                                        {translations.sendButton[language]}
                                    </button>
                                </div>
                            </form>
                        )}
                    </div>
                </div>
            </div>
        </SectionCard>
    );
};
