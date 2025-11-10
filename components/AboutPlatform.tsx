
import React from 'react';
import type { Language } from '../types';
import { SectionCard } from './SectionCard';

const translations = {
    title: {
        uz: 'Platforma Haqida',
        ru: 'О Платформе',
        en: 'About the Platform',
    },
    aboutTitle: {
        uz: 'AgroUnion nima?',
        ru: 'Что такое AgroUnion?',
        en: 'What is AgroUnion?',
    },
    aboutText: {
        uz: 'AgroUnion - bu O\'zbekistondagi qishloq xo\'jaligi sohasining barcha ishtirokchilari: fermerlar, agronomlar, talabalar, tadbirkorlar va ilmiy xodimlar uchun yaratilgan yagona raqamli platformadir. Bizning maqsadimiz - sohadagi eng so\'nggi ma\'lumotlar, texnologiyalar va bilimlarni bir joyga to\'plash orqali agrar sektorni rivojlantirishga hissa qo\'shish.',
        ru: 'AgroUnion — это единая цифровая платформа, созданная для всех участников сельскохозяйственного сектора Узбекистана: фермеров, агрономов, студентов, предпринимателей и научных сотрудников. Наша цель — способствовать развитию аграрного сектора, собирая в одном месте самую свежую информацию, технологии и знания в отрасли.',
        en: 'AgroUnion is a unified digital platform created for all participants in the agricultural sector of Uzbekistan: farmers, agronomists, students, entrepreneurs, and researchers. Our goal is to contribute to the development of the agricultural sector by gathering the latest information, technologies, and knowledge in the industry in one place.',
    },
    featuresTitle: {
        uz: 'Platforma imkoniyatlari va qulayliklari',
        ru: 'Возможности и преимущества платформы',
        en: 'Platform Features and Benefits',
    },
    featuresList: [
        {
            uz: 'Qishloq xo\'jaligi sohalari bo\'yicha tizimlashtirilgan ma\'lumotlar bazasi (donchilik, bog\'dorchilik, chorvachilik va h.k.).',
            ru: 'Систематизированная база данных по отраслям сельского хозяйства (зерноводство, садоводство, животноводство и т.д.).',
            en: 'A systematized database on agricultural sectors (grain farming, horticulture, livestock, etc.).',
        },
        {
            uz: 'Eng so\'nggi agrotexnologiyalar, aqlli sug\'orish tizimlari va organik dehqonchilik usullari haqida batafsil ma\'lumot.',
            ru: 'Подробная информация о новейших агротехнологиях, системах умного орошения и методах органического земледелия.',
            en: 'Detailed information on the latest agricultural technologies, smart irrigation systems, and organic farming methods.',
        },
        {
            uz: 'Respublika va hududlar bo\'yicha dolzarb statistik ma\'lumotlar: hosildorlik, eksport-import hajmlari, bozor narxlari.',
            ru: 'Актуальные статистические данные по республике и регионам: урожайность, объемы экспорта-импорта, рыночные цены.',
            en: 'Current statistical data for the republic and regions: yields, export-import volumes, market prices.',
        },
        {
            uz: 'Sohaga oid qonunchilik hujjatlari, davlat dasturlari va imtiyozlar to\'g\'risidagi ma\'lumotlar.',
            ru: 'Информация о законодательных актах, государственных программах и льготах в отрасли.',
            en: 'Information on legislative acts, state programs, and benefits in the industry.',
        },
        {
            uz: 'Talabalar va yosh mutaxassislar uchun o\'quv materiallari, video darsliklar va onlayn kurslar.',
            ru: 'Учебные материалы, видеоуроки и онлайн-курсы для студентов и молодых специалистов.',
            en: 'Educational materials, video tutorials, and online courses for students and young professionals.',
        },
        {
            uz: 'Sohadagi so\'nggi yangiliklar, innovatsiyalar va bo\'lib o\'tadigan tadbirlar haqida tezkor xabardorlik.',
            ru: 'Оперативное информирование о последних новостях, инновациях и предстоящих событиях в отрасли.',
            en: 'Prompt information about the latest news, innovations, and upcoming events in the industry.',
        },
    ],
};

export const AboutPlatform: React.FC<{ language: Language }> = ({ language }) => {
    return (
        <SectionCard title={translations.title[language]}>
            <div className="space-y-8">
                <div>
                    <h3 className="text-xl font-semibold text-gray-800 mb-2">{translations.aboutTitle[language]}</h3>
                    <p className="text-gray-600 leading-relaxed">{translations.aboutText[language]}</p>
                </div>
                <div>
                    <h3 className="text-xl font-semibold text-gray-800 mb-2">{translations.featuresTitle[language]}</h3>
                    <ul className="list-disc list-inside space-y-2 text-gray-600">
                        {translations.featuresList.map((feature, index) => (
                            <li key={index}>{feature[language]}</li>
                        ))}
                    </ul>
                </div>
            </div>
        </SectionCard>
    );
};