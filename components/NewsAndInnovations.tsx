
import React from 'react';
import type { Language, NewsData } from '../types';
import { SectionCard } from './SectionCard';

interface NewsAndInnovationsProps {
  language: Language;
}

export const NEWS_DATA: NewsData[] = [
  {
    title: { uz: 'Suv sohasi raqamlashtiriladi', ru: 'Сфера водных ресурсов будет оцифрована', en: 'The Water Sector is Being Digitalized' },
    category: { uz: 'Texnologik yangiliklar', ru: 'Технологические новости', en: 'Technological News' },
    description: {
      uz: '“Suv sohasini raqamlashtirish jarayonini yana-da jadallashtirish va barqaror rivojlantirish chora-tadbirlari to‘g‘risida”gi Prezident Farmoni qabul qilindi. Ushbu farmon suv resurslari hisobini to‘liq yuritish, 600 mingdan ortiq suv isteʼmolchilari ma\'lumotlarini elektronlashtirish va Suv xo‘jaligini raqamlashtirish va monitoring markazini tashkil etishni maqsad qilgan.',
      ru: 'Принят Указ Президента «О мерах по дальнейшему ускорению процесса цифровизации водного хозяйства и его устойчивому развитию». Указ направлен на полный учет водных ресурсов, оцифровку данных более 600 тысяч водопотребителей и создание Центра цифровизации и мониторинга водного хозяйства.',
      en: 'A Presidential Decree "On measures to further accelerate the digitalization of the water sector and its sustainable development" has been adopted. The decree aims to fully account for water resources, digitize data for over 600,000 water consumers, and establish a Center for Digitalization and Monitoring of Water Management.'
    },
    updateTime: { uz: 'Yaqinda', ru: 'Недавно', en: 'Recently' }
  },
  { 
    title: { uz: '“TIQXMMI”da Xitoy bilan hamkorlikda “Aqlli qishloq xo‘jaligi” laboratoriyasi ochildi', ru: 'В «ТИИИМСХ» открылась лаборатория «Умное сельское хозяйство» в сотрудничестве с Китаем', en: '"Smart Agriculture" Laboratory Opened at "TIIAME" in Collaboration with China' },
    category: { uz: 'Ilmiy yangiliklar', ru: 'Научные новости', en: 'Scientific News' }, 
    description: { uz: '“TIQXMMI” Milliy tadqiqot universiteti va Xitoyning Shimoliy-G‘arbiy universiteti hamkorligida IoT, “aqlli sug‘orish” va raqamli agrobiznes kabi innovatsion yechimlarni o‘z ichiga olgan qo‘shma laboratoriya ishga tushirildi.', ru: 'Национальный исследовательский университет «ТИИИМСХ» и Северо-Западный университет Китая запустили совместную лабораторию, включающую инновационные решения, такие как IoT, «умное орошение» и цифровой агробизнес.', en: '"TIIAME" National Research University and China\'s Northwest A&F University have launched a joint laboratory featuring innovative solutions such as IoT, "smart irrigation," and digital agribusiness.' }, 
    updateTime: { uz: '9-iyul, 2024', ru: '9 июля 2024 г.', en: 'July 9, 2024' } 
  },
  { 
    title: { uz: 'Plazma bilan ishlov berilgan chigit hosildorlikni ikki barobarga oshirdi', ru: 'Семена, обработанные плазмой, удвоили урожайность хлопка', en: 'Plasma-Treated Cotton Seeds Doubled Yield' },
    category: { uz: 'Texnologik yangiliklar', ru: 'Технологические новости', en: 'Technological News' }, 
    description: { uz: '"TIQXMMI" tajriba maydonida plazma bilan ishlov berilgan "Ravnaq" navli paxta chigiti nazorat guruhiga nisbatan ikki barobardan ko\'proq ko\'sak (58 taga qarshi 25 ta) hosil qildi.', ru: 'На опытном поле «ТИИИМСХ» семена хлопчатника сорта «Равнак», обработанные плазмой, дали более чем в два раза больше коробочек (58 против 25) по сравнению с контрольной группой.', en: 'At the "TIIAME" experimental field, plasma-treated "Ravnaq" cotton seeds produced more than double the bolls (58 vs. 25) compared to the control group.' }, 
    updateTime: { uz: 'Yaqinda', ru: 'Недавно', en: 'Recently' } 
  },
  { 
    title: { uz: 'O\'zbekistonda g\'allachilik va agroklasterlar: soha muammolari va yechimlari', ru: 'Зерноводство и агрокластеры в Узбекистане: проблемы и решения отрасли', en: 'Grain Farming and Agro-clusters in Uzbekistan: Industry Challenges and Solutions' },
    category: { uz: 'Bozor tahlili', ru: 'Анализ рынка', en: 'Market Analysis' },
    description: { uz: 'Agrar soha eksperti bilan O\'zbekistondagi g\'allachilik va agroklasterlar tizimining bugungi holati, muammolari va kelajagi haqida muhim intervyu. https://youtu.be/MTAUU7CHeRc', ru: 'Важное интервью с экспертом аграрного сектора о текущем состоянии, проблемах и будущем зерноводства и системы агрокластеров в Узбекистане. https://youtu.be/MTAUU7CHeRc', en: 'An important interview with an agricultural sector expert about the current state, problems, and future of grain farming and the agro-cluster system in Uzbekistan. https://youtu.be/MTAUU7CHeRc' }, 
    updateTime: { uz: 'Yaqinda', ru: 'Недавно', en: 'Recently' } 
  },
  { 
    title: { uz: 'Ilmiy Tadqiqotlar Natijalari', ru: 'Результаты Научных Исследований', en: 'Scientific Research Results' },
    category: { uz: 'Ilmiy yangiliklar', ru: 'Научные новости', en: 'Scientific News' }, 
    description: { uz: 'Sohadagi so\'nggi ilmiy yutuqlar va tadqiqotlar haqida oylik hisobot.', ru: 'Ежемесячный отчет о последних научных достижениях и исследованиях в отрасли.', en: 'Monthly report on the latest scientific achievements and research in the industry.' }, 
    updateTime: { uz: 'Har oy', ru: 'Ежемесячно', en: 'Monthly' } 
  },
  { 
    title: { uz: 'Agrosanoat uchun yangi uskunalar', ru: 'Новое оборудование для агропрома', en: 'New Equipment for Agribusiness' },
    category: { uz: 'Texnologik yangiliklar', ru: 'Технологические новости', en: 'Technological News' }, 
    description: { uz: 'Qishloq xo\'jaligi samaradorligini oshiruvchi yangi texnika va uskunalar haqida haftalik obzor.', ru: 'Еженедельный обзор новой техники и оборудования, повышающих эффективность сельского хозяйства.', en: 'Weekly review of new machinery and equipment that increase agricultural efficiency.' }, 
    updateTime: { uz: 'Har hafta', ru: 'Еженедельно', en: 'Weekly' } 
  },
  { 
    title: { uz: 'Bozordagi Narxlar va Tendensiyalar', ru: 'Цены и тенденции на рынке', en: 'Market Prices and Trends' },
    category: { uz: 'Bozor yangiliklari', ru: 'Рыночные новости', en: 'Market News' }, 
    description: { uz: 'Asosiy qishloq xo\'jaligi mahsulotlari bozoridagi narxlar va tendensiyalar haqida kunlik ma\'lumot.', ru: 'Ежедневная информация о ценах и тенденциях на рынке основных сельскохозяйственных продуктов.', en: 'Daily information on prices and trends in the market for major agricultural products.' }, 
    updateTime: { uz: 'Kunlik', ru: 'Ежедневно', en: 'Daily' } 
  },
];


const translations = {
  title: { uz: 'Yangiliklar va Innovatsiyalar', ru: 'Новости и Инновации', en: 'News and Innovations' },
  watchVideo: { uz: 'Videoni ko\'rish', ru: 'Смотреть видео', en: 'Watch Video' },
};

export const NewsCard: React.FC<{ news: NewsData; language: Language }> = ({ news, language }) => {
  const urlRegex = /(https?:\/\/[^\s]+)/g;
  const isVideo = urlRegex.test(news.description.uz);
  const descriptionText = news.description[language].replace(urlRegex, '').trim();
  const url = news.description[language].match(urlRegex)?.[0];

  const content = (
    <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300 flex flex-col h-full border border-gray-200">
      <div className="flex-grow">
        <div className="flex justify-between items-center mb-2">
            <span className="text-xs font-semibold bg-green-100 text-green-800 px-2 py-1 rounded-full">{news.category[language]}</span>
            <span className="text-xs text-gray-500">{news.updateTime[language]}</span>
        </div>
        <h3 className="text-lg font-bold text-gray-800 mb-2">{news.title[language]}</h3>
        <p className="text-sm text-gray-600 leading-relaxed">{descriptionText}</p>
      </div>
      {isVideo && (
          <div className="mt-4 pt-4 border-t border-gray-200">
            <span className="text-blue-600 font-semibold hover:underline">{translations.watchVideo[language]}</span>
          </div>
      )}
    </div>
  );

  if (isVideo && url) {
    return <a href={url} target="_blank" rel="noopener noreferrer" className="block h-full">{content}</a>;
  }
  
  return content;
};


export const NewsAndInnovations: React.FC<NewsAndInnovationsProps> = ({ language }) => {
  return (
    <SectionCard title={translations.title[language]}>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {NEWS_DATA.map((item, index) => (
          <NewsCard key={index} news={item} language={language} />
        ))}
      </div>
    </SectionCard>
  );
};
