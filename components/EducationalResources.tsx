import React from 'react';
import type { Language, LocalizedString } from '../types';
import { SectionCard } from './SectionCard';

interface EducationalResourcesProps {
  language: Language;
}

const TIIAME_RESOURCES_DATA: { title: LocalizedString; description: LocalizedString; link: string }[] = [
    {
      title: { uz: 'Ilmiy laboratoriyalar', ru: 'Научные лаборатории', en: 'Scientific Laboratories' },
      description: { uz: 'Universitetning zamonaviy ilmiy-tadqiqot laboratoriyalari, ularning yo\'nalishlari va ilmiy salohiyati haqida ma\'lumot.', ru: 'Информация о современных научно-исследовательских лабораториях университета, их направлениях и научном потенциале.', en: 'Information about the university\'s modern research laboratories, their areas of focus, and scientific potential.' },
      link: 'https://tiiame.uz/scientific_activity/publications/laboratories'
    },
    {
      title: { uz: 'Milliy loyihalar', ru: 'Национальные проекты', en: 'National Projects' },
      description: { uz: 'Universitet olimlari tomonidan amalga oshirilayotgan milliy darajadagi ilmiy loyihalar va ularning natijalari.', ru: 'Научные проекты национального уровня, реализуемые учеными университета, и их результаты.', en: 'National-level scientific projects being implemented by university scientists and their results.' },
      link: 'https://tiiame.uz/scientific_activity/research_and_projects/national_projects'
    },
    {
      title: { uz: 'Oziq-ovqat xavfsizligi xalqaro markazi (IFAR)', ru: 'Международный центр по продовольственной безопасности (IFAR)', en: 'International Center for Food Security (IFAR)' },
      description: { uz: 'Oziq-ovqat xavfsizligi va qishloq xo‘jaligini barqaror rivojlantirish bo\'yicha xalqaro tadqiqot markazining faoliyati.', ru: 'Деятельность международного исследовательского центра по продовольственной безопасности и устойчивому развитию сельского хозяйства.', en: 'Activities of the International Research Center for Food Security and Sustainable Agricultural Development.' },
      link: 'https://tiiame.uz/ifar'
    },
    {
      title: { uz: 'Ilmiy nashrlar', ru: 'Научные публикации', en: 'Scientific Publications' },
      description: { uz: 'Universitet professor-o\'qituvchilari va tadqiqotchilarining ilmiy jurnallari, monografiyalari va maqolalari to\'plami.', ru: 'Сборник научных журналов, монографий и статей профессоров-преподавателей и исследователей университета.', en: 'A collection of scientific journals, monographs, and articles by the university\'s professors and researchers.' },
      link: 'https://tiiame.uz/scientific_activity/publications/scientific_publishing'
    },
    {
      title: { uz: 'Innovatsion ishlanmalar', ru: 'Инновационные разработки', en: 'Innovative Developments' },
      description: { uz: 'Qishloq xo\'jaligi sohasiga oid yaratilgan yangi texnologiyalar, qurilmalar va innovatsion yechimlar.', ru: 'Новые технологии, устройства и инновационные решения, созданные для аграрного сектора.', en: 'New technologies, devices, and innovative solutions created for the agricultural sector.' },
      link: 'https://tiiame.uz/scientific_activity/other/developments'
    },
    {
      title: { uz: 'Dissertatsiya avtoreferatlari', ru: 'Авторефераты диссертаций', en: 'Dissertation Abstracts' },
      description: { uz: 'Falsafa doktori (PhD) va fan doktori (DSc) ilmiy darajalarini olish uchun tayyorlangan dissertatsiyalar avtoreferatlari bazasi.', ru: 'База авторефератов диссертаций на соискание ученых степеней доктора философии (PhD) и доктора наук (DSc).', en: 'A database of abstracts for dissertations prepared for Doctor of Philosophy (PhD) and Doctor of Science (DSc) degrees.' },
      link: 'https://tiiame.uz/scientific_activity/other/abstracts'
    },
    {
      title: { uz: 'Oziq-ovqat xavfsizligi bilimlariga kirish', ru: 'Доступ к знаниям по продовольственной безопасности', en: 'Access to Food Security Knowledge' },
      description: { uz: 'Oziq-ovqat xavfsizligi sohasidagi bilimlar, resurslar va ma\'lumotlarga ochiq kirishni ta\'minlovchi portal.', ru: 'Портал, обеспечивающий открытый доступ к знаниям, ресурсам и информации в области продовольственной безопасности.', en: 'A portal providing open access to knowledge, resources, and information in the field of food security.' },
      link: 'https://tiiame.uz/access_to_food_security_knowledge'
    },
    {
      title: { uz: '"TIQXMMI" MTU LinkedIn sahifasi', ru: 'Страница «ТИИИМСХ» НИУ в LinkedIn', en: '"TIIAME" NRU on LinkedIn' },
      description: { uz: 'Universitetning rasmiy LinkedIn sahifasi orqali so\'nggi yangiliklar, yutuqlar va kasbiy aloqalar bilan tanishing.', ru: 'Следите за последними новостями, достижениями и профессиональными связями через официальную страницу университета в LinkedIn.', en: 'Follow the latest news, achievements, and professional connections through the university\'s official LinkedIn page.' },
      link: 'https://uz.linkedin.com/company/tiiameofficial'
    }
];


const translations = {
  title: { uz: 'Ta\'lim Resurslari', ru: 'Образовательные Ресурсы', en: 'Educational Resources' },
  tiiameTitle: { uz: '"TIQXMMI" MTU Ilmiy-Ma\'rifiy Resurslari', ru: 'Научно-образовательные ресурсы НИУ «ТИИИМСХ»', en: 'Scientific and Educational Resources of "TIIAME" NRU' },
};

export const EducationalResources: React.FC<EducationalResourcesProps> = ({ language }) => {
  return (
    <SectionCard title={translations.title[language]}>
        <div>
            <h3 className="text-xl font-semibold mb-4">{translations.tiiameTitle[language]}</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {TIIAME_RESOURCES_DATA.map((resource, index) => (
                    <a 
                        key={index} 
                        href={resource.link} 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="block p-6 bg-white rounded-lg shadow-sm hover:shadow-lg transition-shadow duration-300 border border-gray-200 h-full"
                    >
                        <h4 className="font-bold text-green-700 text-lg mb-2">{resource.title[language]}</h4>
                        <p className="text-gray-600 text-sm leading-relaxed">{resource.description[language]}</p>
                    </a>
                ))}
            </div>
        </div>
    </SectionCard>
  );
};