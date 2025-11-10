
import React from 'react';
import type { Language } from '../types';
import { ChartBarIcon, NewspaperIcon, SunIcon } from './IconComponents';
import { NEWS_DATA, NewsCard } from './NewsAndInnovations';

interface HomePageProps {
  language: Language;
}

const translations = {
  heroTitle: {
    uz: 'AgroUnion: Qishloq Xo\'jaligi Bilimlari Markazi',
    ru: 'АгроСоюз: Центр Сельскохозяйственных Знаний',
    en: 'AgroUnion: The Center for Agricultural Knowledge',
  },
  heroSubtitle: {
    uz: 'Fermerlar, talabalar va tadbirkorlar uchun ishonchli ma\'lumotlar bazasi. Yangi texnologiyalarni o\'rganing va amaliy tajriba almashing.',
    ru: 'Надежная база знаний для фермеров, студентов и предпринимателей. Изучайте новые технологии и обменивайтесь практическим опытом.',
    en: 'A reliable knowledge base for farmers, students, and entrepreneurs. Learn new technologies and exchange practical experience.',
  },
  dailyStats: {
    uz: 'Kunlik Statistika',
    ru: 'Ежедневная Статистика',
    en: 'Daily Statistics',
  },
  weather: {
    uz: 'Ob-havo',
    ru: 'Погода',
    en: 'Weather',
  },
  marketPrices: {
    uz: 'Bozor Narxlari',
    ru: 'Рыночные Цены',
    en: 'Market Prices',
  },
  latestNews: {
    uz: 'So\'nggi Yangiliklar',
    ru: 'Последние Новости',
    en: 'Latest News',
  },
  popularArticles: {
    uz: 'Mashhur Maqolalar',
    ru: 'Популярные Статьи',
    en: 'Popular Articles',
  },
  errorFetchingNews: {
    uz: 'Yangiliklarni yuklashda xatolik yuz berdi.',
    ru: 'Произошла ошибка при загрузке новостей.',
    en: 'An error occurred while loading the news.',
  },
  noNewsFound: {
    uz: 'Hozircha yangiliklar topilmadi.',
    ru: 'Новостей пока не найдено.',
    en: 'No news found at the moment.',
  },
};

const StatCard: React.FC<{ icon: React.ReactNode; title: string; value: string; unit: string; color: string }> = ({ icon, title, value, unit, color }) => (
    <div className="bg-white p-6 rounded-xl shadow-md flex items-start space-x-4">
        <div className={`p-3 rounded-full ${color}`}>
            {icon}
        </div>
        <div>
            <p className="text-sm text-gray-500">{title}</p>
            <p className="text-2xl font-bold text-gray-800">{value} <span className="text-base font-medium text-gray-600">{unit}</span></p>
        </div>
    </div>
);

export const HomePage: React.FC<HomePageProps> = ({ language }) => {
  const latestNews = NEWS_DATA.slice(0, 3);

  return (
    <div className="space-y-12">
      {/* Hero Section */}
      <section className="relative bg-green-600 rounded-2xl p-8 md:p-12 text-white overflow-hidden">
        <div className="absolute inset-0 bg-black opacity-20"></div>
        <img src="https://picsum.photos/1200/400?image=1078" alt="Farm field" className="absolute inset-0 w-full h-full object-cover"/>
        <div className="relative z-10 text-center">
            <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight mb-4 text-shadow">{translations.heroTitle[language]}</h1>
            <p className="max-w-3xl mx-auto text-lg md:text-xl text-green-100 text-shadow-sm">{translations.heroSubtitle[language]}</p>
        </div>
      </section>

      {/* Daily Statistics */}
      <section>
        <h2 className="text-2xl font-bold mb-6">{translations.dailyStats[language]}</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <StatCard icon={<SunIcon className="w-6 h-6 text-yellow-800"/>} title={translations.weather[language]} value="+28" unit="°C" color="bg-yellow-100" />
            <StatCard icon={<ChartBarIcon className="w-6 h-6 text-blue-800"/>} title={`${translations.marketPrices[language]} (Bug'doy)`} value="2,500" unit="so'm/kg" color="bg-blue-100" />
            <StatCard icon={<NewspaperIcon className="w-6 h-6 text-purple-800"/>} title={translations.latestNews[language]} value="3+" unit="ta" color="bg-purple-100" />
        </div>
      </section>

      {/* News and Articles */}
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        <div>
          <h2 className="text-2xl font-bold mb-6">{translations.latestNews[language]}</h2>
          <div className="grid grid-cols-1 gap-6">
            {latestNews.length > 0 ? (
                latestNews.map((news, index) => (
                   <NewsCard key={index} news={news} language={language} />
                ))
            ) : (
                <div className="p-4 bg-gray-50 text-gray-600 rounded-lg text-center">{translations.noNewsFound[language]}</div>
            )}
          </div>
        </div>
        <div>
          <h2 className="text-2xl font-bold mb-6">{translations.popularArticles[language]}</h2>
          <div className="space-y-4">
            <div className="p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition">
              <h3 className="font-semibold text-green-800">Organik dehqonchilik: Boshlang'ich qo'llanma</h3>
              <p className="text-sm text-gray-600 mt-1">Kimyoviy o'g'itlardan voz kechish va tabiiy usullarga o'tish sirlari.</p>
            </div>
            <div className="p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition">
              <h3 className="font-semibold text-green-800">Zararkunandalarga qarshi biologik kurash</h3>
              <p className="text-sm text-gray-600 mt-1">Tabiatga zarar yetkazmasdan hosilni himoya qilish usullari.</p>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
};
