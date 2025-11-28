import React from 'react';
import type { Language } from '../types';
import { SectionCard } from './SectionCard';
import { SparklesIcon, UserAddIcon, UsersIcon, GlobeIcon } from './IconComponents';

interface StatisticsProps {
  language: Language;
}

const translations = {
  userStatsTitle: { uz: 'Platformadan foydalanish statistikasi', ru: 'Статистика использования платформы', en: 'Platform Usage Statistics' },
  onlineUsers: { uz: 'Onlayn foydalanuvchilar', ru: 'Пользователи онлайн', en: 'Online Users' },
  newUsers: { uz: 'Yangi ro\'yxatdan o\'tganlar (bugun)', ru: 'Новые регистрации (сегодня)', en: 'New Registrations (today)' },
  activeSection: { uz: 'Eng faol bo\'lim', ru: 'Самый активный раздел', en: 'Most Active Section' },
  technologiesSection: { uz: 'Texnologiyalar', ru: 'Технологии', en: 'Technologies' },
  internationalResourcesTitle: {
    uz: 'Xalqaro Resurslar',
    ru: 'Международные Ресурсы',
    en: 'International Resources'
  },
  gppTitle: {
    uz: 'Global Mahsulot Narxlari',
    ru: 'Мировые Цены на Продукты',
    en: 'Global Product Prices'
  },
  gppDescription: {
    uz: 'Dunyo bo\'ylab oziq-ovqat mahsulotlari va boshqa iste\'mol tovarlarining chakana narxlari haqida ma\'lumot beruvchi xalqaro platforma. Bozor tahlili, eksport-import narxlarini solishtirish va global narx tendensiyalarini kuzatish uchun foydali manba.',
    ru: 'Международная платформа с данными о розничных ценах на продукты питания и другие потребительские товары по всему миру. Полезный ресурс для анализа рынка, сравнения экспортно-импортных цен и отслеживания мировых тенденций.',
    en: 'An international platform with data on retail prices for food and other consumer goods worldwide. A useful resource for market analysis, comparing export-import prices, and tracking global trends.'
  },
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
    <div className="space-y-12">
      <SectionCard title={translations.userStatsTitle[language]}>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {userStats.map((stat, index) => (
                   <StatCard key={index} icon={stat.icon} title={stat.title} value={stat.value} color={stat.color} />
              ))}
          </div>
      </SectionCard>

      <SectionCard title={translations.internationalResourcesTitle[language]}>
        <a 
          href="http://globalproductprices.com" 
          target="_blank" 
          rel="noopener noreferrer" 
          className="block bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300 border border-gray-200 transform hover:-translate-y-1"
        >
          <div className="flex items-start space-x-4">
            <div className="p-3 rounded-full bg-blue-100 flex-shrink-0">
              <GlobeIcon className="w-7 h-7 text-blue-800"/>
            </div>
            <div>
              <h4 className="text-xl font-bold text-blue-700 mb-2">{translations.gppTitle[language]}</h4>
              <p className="text-gray-600 leading-relaxed">{translations.gppDescription[language]}</p>
            </div>
          </div>
        </a>
      </SectionCard>
    </div>
  );
};