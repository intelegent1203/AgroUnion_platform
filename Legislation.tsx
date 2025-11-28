import React from 'react';
import type { Language, DocData } from '../types';
import { SectionCard } from './SectionCard';

interface LegislationProps {
  language: Language;
}

export const DOCUMENTS_DATA: DocData[] = [
  {
    type: { uz: 'Prezident Farmoni', ru: 'Указ Президента', en: 'Presidential Decree' },
    name: { uz: 'Qishloq xo‘jaligida yer va suv resurslaridan samarali foydalanish, investitsiyalarni jalb qilish hamda islohotlarni jadallashtirish chora-tadbirlari to‘g‘risida (PF-101)', ru: 'О мерах по эффективному использованию земельных и водных ресурсов в сельском хозяйстве, привлечению инвестиций и ускорению реформ (УП-101)', en: 'On measures for the efficient use of land and water resources in agriculture, attracting investments, and accelerating reforms (PD-101)' },
    date: { uz: '2024-yil 20-iyun', ru: '20 июня 2024 г.', en: 'June 20, 2024' },
    description: {
      uz: 'Yer va suv resurslaridan foydalanish samaradorligini oshirish, sohani raqamlashtirish, investitsiyalarni keng jalb etish va fermer xo‘jaliklarini transformatsiya qilishga qaratilgan muhim farmon.',
      ru: 'Важный указ, направленный на повышение эффективности использования земельных и водных ресурсов, цифровизацию отрасли, широкое привлечение инвестиций и трансформацию фермерских хозяйств.',
      en: 'An important decree aimed at increasing the efficiency of land and water resource use, digitalizing the sector, attracting broad investment, and transforming farms.'
    },
    link: 'https://lex.uz/docs/-6981464'
  },
  {
    type: { uz: 'Prezident Farmoni', ru: 'Указ Президента', en: 'Presidential Decree' },
    name: { uz: '“O‘zbekiston – 2030” strategiyasini “Yoshlar va biznesni qo‘llab-quvvatlash yili”da amalga oshirishga oid davlat dasturi to‘g‘risida (PF-37)', ru: 'О государственной программе по реализации стратегии «Узбекистан – 2030» в «Год поддержки молодежи и бизнеса» (УП-37)', en: 'On the state program for the implementation of the "Uzbekistan – 2030" strategy in the "Year of Youth and Business Support" (PD-37)' },
    date: { uz: '2024-yil 21-fevral', ru: '21 февраля 2024 г.', en: 'February 21, 2024' },
    description: {
      uz: '"O‘zbekiston – 2030" strategiyasi doirasida agrar sohani rivojlantirish, hosildorlikni oshirish va eksport hajmini ko\'paytirish bo\'yicha vazifalarni belgilovchi davlat dasturi.',
      ru: 'Государственная программа, определяющая задачи по развитию аграрного сектора, повышению урожайности и увеличению объемов экспорта в рамках стратегии «Узбекистан – 2030».',
      en: 'A state program defining tasks for the development of the agricultural sector, increasing productivity, and expanding export volumes within the framework of the "Uzbekistan – 2030" strategy.'
    },
    link: 'https://lex.uz/docs/-6783515'
  },
  {
    type: { uz: 'Prezident Qarori', ru: 'Постановление Президента', en: 'Presidential Resolution' },
    name: { uz: 'Meva-sabzavotchilik va uzumchilikda oilaviy tadbirkorlikni rivojlantirish, qishloq xo‘jaligi ishlab chiqarishida dehqon xo‘jaliklarining ulushini oshirish chora-tadbirlari to‘g‘risida (PQ-5109)', ru: 'О мерах по развитию семейного предпринимательства в плодоовощеводстве и виноградарстве, увеличению доли дехканских хозяйств в сельскохозяйственном производстве (ПП-5109)', en: 'On measures to develop family entrepreneurship in fruit, vegetable, and grape growing, and to increase the share of dekhkan farms in agricultural production (PR-5109)' },
    date: { uz: '2021-yil 12-may', ru: '12 мая 2021 г.', en: 'May 12, 2021' },
    description: {
      uz: 'Aholining tomorqa yerlaridan samarali foydalanishini rag\'batlantirish, dehqon xo\'jaliklarini qo\'llab-quvvatlash va agrar sohada oilaviy tadbirkorlikni rivojlantirishga qaratilgan qaror.',
      ru: 'Постановление, направленное на стимулирование эффективного использования приусадебных земель населением, поддержку дехканских хозяйств и развитие семейного предпринимательства в аграрной сфере.',
      en: 'A resolution aimed at stimulating the effective use of household plots, supporting dekhkan farms, and developing family entrepreneurship in the agricultural sector.'
    },
    link: 'https://lex.uz/docs/-5416298'
  }
];

const translations = {
  title: { uz: 'Qonunchilik Bazasi', ru: 'Законодательная База', en: 'Legislation Base' },
};

export const Legislation: React.FC<LegislationProps> = ({ language }) => {
  return (
    <SectionCard title={translations.title[language]}>
      <div className="space-y-6">
        {DOCUMENTS_DATA.map((doc, index) => (
          <div key={index} className="bg-green-50 p-6 rounded-xl border border-green-200 transition-all duration-300 hover:shadow-md hover:border-green-300">
            <div className="flex flex-col sm:flex-row justify-between sm:items-center mb-3">
              <span className="text-sm font-semibold bg-green-200 text-green-800 px-3 py-1 rounded-full self-start mb-2 sm:mb-0">
                {doc.type[language]}
              </span>
              <span className="text-sm text-gray-500 flex-shrink-0">{doc.date[language]}</span>
            </div>
            <h3 className="text-lg font-bold text-gray-800 mb-2">
              {doc.link ? (
                <a href={doc.link} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                  {doc.name[language]}
                </a>
              ) : (
                doc.name[language]
              )}
            </h3>
            <p className="text-gray-600 leading-relaxed">{doc.description[language]}</p>
          </div>
        ))}
      </div>
    </SectionCard>
  );
};