
import React from 'react';
import type { Language, TechData } from '../types';
import { SectionCard } from './SectionCard';
import { CostCalculator } from './CostCalculator';

interface TechnologiesProps {
  language: Language;
}

export const AGRO_PLATFORMS_DATA: TechData[] = [
  {
    name: { uz: 'Agroplatforma.uz', ru: 'Agroplatforma.uz', en: 'Agroplatforma.uz' },
    description: { uz: 'Subsidiya ajratish jarayonlarini raqamlashtirish axborot tizimi.', ru: 'Информационная система для цифровизации процессов выделения субсидий.', en: 'Information system for digitizing subsidy allocation processes.' },
    application: { uz: 'Qishloq xo\'jaligi mahsulotlari yetishtiruvchilarga davlat yordamini avtomatlashtirish.', ru: 'Автоматизация государственной поддержки сельхозпроизводителей.', en: 'Automation of state support for agricultural producers.' },
    link: 'https://agroplatforma.uz',
  },
  {
    name: { uz: 'Agroportal.uz', ru: 'Agroportal.uz', en: 'Agroportal.uz' },
    description: { uz: 'Yagona interaktiv agroxizmatlar portali.', ru: 'Единый портал интерактивных агроуслуг.', en: 'Unified portal of interactive agro-services.' },
    application: { uz: 'Fermerlar va agrobiznes uchun onlayn xizmatlar, ma\'lumotlar va maslahatlar.', ru: 'Онлайн-услуги, информация и консультации для фермеров и агробизнеса.', en: 'Online services, information, and consultations for farmers and agribusiness.' },
    link: 'https://agroportal.uz/',
  },
  {
    name: { uz: 'DigitAgro Yechimlari', ru: 'Решения DigitAgro', en: 'DigitAgro Solutions' },
    description: { uz: '"Aqlli" qishloq xo\'jaligi texnologiyalari.', ru: 'Технологии "умного" сельского хозяйства.', en: '"Smart" agriculture technologies.' },
    application: { uz: 'Dronlar, IoT va sun\'iy intellekt orqali agrar sohani optimallashtirish.', ru: 'Оптимизация аграрного сектора с помощью дронов, IoT и искусственного интеллекта.', en: 'Optimizing the agrarian sector through drones, IoT, and artificial intelligence.' },
    link: 'https://digitagro.uz/',
  },
];

export const TECHNOLOGIES_DATA: TechData[] = [
  {
    name: { uz: 'Aqlli sug\'orish', ru: 'Умное орошение', en: 'Smart Irrigation' },
    description: { uz: 'Suvni tejash texnologiyalari', ru: 'Технологии экономии воды', en: 'Water saving technologies' },
    application: { uz: 'Tomchilatib sug\'orish, yomg\'irlatib sug\'orish', ru: 'Капельное орошение, дождевание', en: 'Drip irrigation, sprinkler irrigation' },
  },
  {
    name: { uz: 'Anorganik o\'g\'itlar', ru: 'Неорганические удобрения', en: 'Inorganic Fertilizers' },
    description: { uz: 'Sintetik yo\'l bilan olingan mineral o\'g\'itlar', ru: 'Синтетические минеральные удобрения', en: 'Synthetic mineral fertilizers' },
    application: { uz: 'Azot, fosfor, kaliy o\'g\'itlari bilan o\'simliklarni oziqlantirish', ru: 'Подкормка растений азотными, фосфорными, калийными удобрениями', en: 'Feeding plants with nitrogen, phosphorus, potassium fertilizers' },
  },
  {
    name: { uz: 'Organik qishloq xo\'jaligi', ru: 'Органическое сельское хозяйство', en: 'Organic Farming' },
    description: { uz: 'Sintetik pestitsidlar va o\'g\'itlardan foydalanmasdan dehqonchilik qilish usullari', ru: 'Методы ведения сельского хозяйства без использования синтетических пестицидов и удобрений', en: 'Farming methods without the use of synthetic pesticides and fertilizers' },
    application: { uz: 'Kompost, go\'ng, almashlab ekish, biologik kurash', ru: 'Компост, навоз, севооборот, биологический контроль', en: 'Compost, manure, crop rotation, biological control' },
  },
  {
    name: { uz: 'Integratsiyalashgan zararkunandalarga qarshi kurash (IPM)', ru: 'Интегрированная защита растений (IPM)', en: 'Integrated Pest Management (IPM)' },
    description: { uz: 'Zararkunandalarga qarshi kurashning ekologik jihatdan oqilona yondashuvi', ru: 'Экологически обоснованный подход к борьбе с вредителями', en: 'An ecologically sound approach to pest control' },
    application: { uz: 'Biologik, madaniy, fizikaviy va kimyoviy usullarni birgalikda qo\'llash', ru: 'Сочетание биологических, культурных, физических и химических методов', en: 'Combination of biological, cultural, physical, and chemical methods' },
  },
];

const translations = {
  title: { uz: 'Zamonaviy Texnologiyalar va Platformalar', ru: 'Современные Технологии и Платформы', en: 'Modern Technologies and Platforms' },
  platformsTitle: { uz: 'Raqamli Platformalar', ru: 'Цифровые Платформы', en: 'Digital Platforms' },
  coreTechTitle: { uz: 'Asosiy Texnologiyalar', ru: 'Основные Технологии', en: 'Core Technologies' },
  name: { uz: 'Nomi', ru: 'Название', en: 'Name' },
  description: { uz: 'Tavsif', ru: 'Описание', en: 'Description' },
  application: { uz: 'Qo\'llanilishi', ru: 'Применение', en: 'Application' },
};

const TechnologyTable: React.FC<{language: Language, data: TechData[]}> = ({ language, data }) => (
    <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200">
          <thead className="bg-green-100">
            <tr>
              <th className="py-3 px-4 text-left text-sm font-semibold text-green-800 uppercase">{translations.name[language]}</th>
              <th className="py-3 px-4 text-left text-sm font-semibold text-green-800 uppercase">{translations.description[language]}</th>
              <th className="py-3 px-4 text-left text-sm font-semibold text-green-800 uppercase">{translations.application[language]}</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {data.map((tech, index) => (
              <tr key={index} className="hover:bg-green-50/50">
                <td className="py-4 px-4 font-medium text-gray-800">
                  {tech.link ? (
                    <a href={tech.link} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                      {tech.name[language]}
                    </a>
                  ) : (
                    tech.name[language]
                  )}
                </td>
                <td className="py-4 px-4 text-gray-600">{tech.description[language]}</td>
                <td className="py-4 px-4 text-gray-600">{tech.application[language]}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
);

export const Technologies: React.FC<TechnologiesProps> = ({ language }) => {
  return (
    <div className="space-y-12">
      <SectionCard title={translations.title[language]}>
        <div className="space-y-10">
          <div>
              <h3 className="text-xl font-semibold mb-4 text-gray-700">{translations.platformsTitle[language]}</h3>
              <TechnologyTable language={language} data={AGRO_PLATFORMS_DATA} />
          </div>
          <div>
              <h3 className="text-xl font-semibold mb-4 text-gray-700">{translations.coreTechTitle[language]}</h3>
              <TechnologyTable language={language} data={TECHNOLOGIES_DATA} />
          </div>
        </div>
      </SectionCard>
      <CostCalculator language={language} />
    </div>
  );
};
