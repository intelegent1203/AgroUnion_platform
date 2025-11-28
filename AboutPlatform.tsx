
import React from 'react';
import type { Language } from '../types';
import { SectionCard } from './SectionCard';
import { LeafIcon, ChartBarIcon, NewspaperIcon, GlobeIcon, UsersIcon, SparklesIcon, SearchIcon, UserCircleIcon } from './IconComponents';

const translations = {
    title: {
        uz: 'Platforma Haqida',
        ru: 'О Платформе',
        en: 'About the Platform',
    },
    aboutTitle: {
        uz: 'AgroUnion: Ilm-fan va Amaliyotni Birlashtiruvchi Makon',
        ru: 'AgroUnion: Пространство, объединяющее науку и практику',
        en: 'AgroUnion: A Space Uniting Science and Practice',
    },
    aboutText: {
        uz: 'AgroUnion — bu shunchaki axborot sayti emas, balki O‘zbekiston qishloq xo‘jaligi ekotizimini rivojlantirish uchun maxsus yaratilgan raqamli ko‘prikdir. Biz fermerlar, talabalar, olimlar va tadbirkorlarni yagona platformada birlashtirib, ishonchli ma\'lumotlar, zamonaviy texnologiyalar va tahliliy resurslar bilan ta\'minlaymiz.',
        ru: 'AgroUnion — это не просто информационный сайт, а цифровой мост, созданный специально для развития сельскохозяйственной экосистемы Узбекистана. Мы объединяем фермеров, студентов, ученых и предпринимателей на единой платформе, предоставляя надежные данные, современные технологии и аналитические ресурсы.',
        en: 'AgroUnion is not just an information site, but a digital bridge created specifically for the development of Uzbekistan\'s agricultural ecosystem. We unite farmers, students, scientists, and entrepreneurs on a single platform, providing reliable data, modern technologies, and analytical resources.',
    },
    sectionsTitle: {
        uz: 'Platforma Bo\'limlari va Ularning Imkoniyatlari',
        ru: 'Разделы Платформы и Их Возможности',
        en: 'Platform Sections and Their Capabilities',
    },
    contentLabel: {
        uz: 'Nimalarni o\'z ichiga oladi?',
        ru: 'Что включает в себя?',
        en: 'What does it include?',
    },
    benefitLabel: {
        uz: 'Sizga qanday foyda beradi?',
        ru: 'Какую пользу это приносит вам?',
        en: 'How does it benefit you?',
    },
    // New section for Target Audience
    forWhomTitle: {
        uz: 'Platforma Kimlar Uchun?',
        ru: 'Для Кого Платформа?',
        en: 'Who is the Platform For?',
    },
    sectionsList: [
        {
            id: 'sectors',
            title: {
                uz: 'Qishloq Xo\'jaligi Sohalari',
                ru: 'Отрасли Сельского Хозяйства',
                en: 'Agricultural Sectors',
            },
            content: {
                uz: 'Donchilik, paxtachilik, bog\'dorchilik, chorvachilik va ipakchilik kabi asosiy yo\'nalishlar bo\'yicha fundamental ma\'lumotlar. Har bir soha bo\'yicha Sun\'iy Intellekt (SI) yordamida shakllantirilgan tahliliy maqolalar.',
                ru: 'Фундаментальные данные по основным направлениям, таким как зерноводство, хлопководство, садоводство, животноводство и шелководство. Аналитические статьи, сформированные с помощью Искусственного Интеллекта (ИИ).',
                en: 'Fundamental data on key areas such as grain farming, cotton growing, horticulture, livestock, and sericulture. Analytical articles generated with the help of Artificial Intelligence (AI).',
            },
            benefit: {
                uz: 'Sohangizdagi eng so\'nggi tendensiyalar va muammolar yechimini tezda topish, ekish va parvarishlash bo\'yicha ilmiy asoslangan tavsiyalarni olish imkoniyati.',
                ru: 'Возможность быстро находить последние тенденции и решения проблем в вашей отрасли, получать научно обоснованные рекомендации по посадке и уходу.',
                en: 'The ability to quickly find the latest trends and solutions in your field, and receive scientifically backed recommendations for planting and care.',
            }
        },
        {
            id: 'tech',
            title: {
                uz: 'Texnologiyalar va Kalkulyator',
                ru: 'Технологии и Калькулятор',
                en: 'Technologies and Calculator',
            },
            content: {
                uz: 'Zamonaviy agrotexnologiyalar (dronlar, sensorlar, aqlli sug\'orish) tavsifi va raqamlashtirish xarajatlarini hisoblovchi interaktiv kalkulyator.',
                ru: 'Описание современных агротехнологий (дроны, датчики, умное орошение) и интерактивный калькулятор для расчета затрат на цифровизацию.',
                en: 'Descriptions of modern agri-technologies (drones, sensors, smart irrigation) and an interactive calculator to estimate digitalization costs.',
            },
            benefit: {
                uz: 'Xo\'jaligingizni modernizatsiya qilish uchun qancha mablag\' ketishini oldindan hisoblash va investitsiya samaradorligini (ROI) baholash.',
                ru: 'Предварительный расчет затрат на модернизацию вашего хозяйства и оценка возврата инвестиций (ROI).',
                en: 'Pre-calculate the costs of modernizing your farm and evaluate the return on investment (ROI).',
            }
        },
        {
            id: 'docs',
            title: {
                uz: 'Qonunchilik Bazasi',
                ru: 'Законодательная База',
                en: 'Legislation Base',
            },
            content: {
                uz: 'Prezident farmonlari, qarorlar va davlat dasturlari. Subsidiyalar, yer ajratish va soliq imtiyozlari haqidagi rasmiy hujjatlar to\'plami.',
                ru: 'Указы Президента, постановления и государственные программы. Сборник официальных документов о субсидиях, выделении земель и налоговых льготах.',
                en: 'Presidential decrees, resolutions, and state programs. A collection of official documents on subsidies, land allocation, and tax incentives.',
            },
            benefit: {
                uz: 'Huquqiy savodxonlikni oshirish, davlat tomonidan berilayotgan imtiyozlardan xabardor bo\'lish va o\'z haq-huquqlaringizni himoya qilish.',
                ru: 'Повышение правовой грамотности, осведомленность о государственных льготах и защита своих прав.',
                en: 'Improving legal literacy, staying informed about state benefits, and protecting your rights.',
            }
        },
        {
            id: 'stats',
            title: {
                uz: 'Statistika va Bozor Narxlari',
                ru: 'Статистика и Рыночные Цены',
                en: 'Statistics and Market Prices',
            },
            content: {
                uz: 'Platformadan foydalanish statistikasi va global bozorlardagi qishloq xo\'jaligi mahsulotlarining narxlari monitoringi.',
                ru: 'Статистика использования платформы и мониторинг цен на сельскохозяйственную продукцию на мировых рынках.',
                en: 'Platform usage statistics and monitoring of agricultural product prices in global markets.',
            },
            benefit: {
                uz: 'Bozor konyunkturasi va narxlar o\'zgarishini kuzatish orqali mahsulotni qachon va qayerga sotish bo\'yicha to\'g\'ri qaror qabul qilish.',
                ru: 'Принятие правильных решений о том, когда и где продавать продукцию, путем отслеживания рыночной конъюнктуры и изменений цен.',
                en: 'Making the right decisions on when and where to sell products by tracking market trends and price changes.',
            }
        },
        {
            id: 'edu',
            title: {
                uz: 'Ta\'lim va Ilm-fan',
                ru: 'Образование и Наука',
                en: 'Education and Science',
            },
            content: {
                uz: '"TIQXMMI" MTU bazasidagi ilmiy laboratoriyalar, dissertatsiyalar, o\'quv qo\'llanmalari va oziq-ovqat xavfsizligi bo\'yicha resurslar.',
                ru: 'Научные лаборатории, диссертации, учебные пособия и ресурсы по продовольственной безопасности на базе НИУ «ТИИИМСХ».',
                en: 'Scientific laboratories, dissertations, textbooks, and food security resources based on "TIIAME" NRU.',
            },
            benefit: {
                uz: 'Talabalar va tadqiqotchilar uchun ishonchli ilmiy manbalardan foydalanish, fermerlar uchun esa malaka oshirish imkoniyati.',
                ru: 'Доступ к надежным научным источникам для студентов и исследователей, а также возможность повышения квалификации для фермеров.',
                en: 'Access to reliable scientific sources for students and researchers, and professional development opportunities for farmers.',
            }
        },
        {
            id: 'news',
            title: {
                uz: 'Yangiliklar va SI Qidiruvi',
                ru: 'Новости и Поиск с ИИ',
                en: 'News and AI Search',
            },
            content: {
                uz: 'Sohaga oid eng so\'nggi yangiliklar agregatori va har qanday agrar mavzuda ma\'lumot topib beruvchi aqlli qidiruv tizimi.',
                ru: 'Агрегатор последних новостей отрасли и умная поисковая система, находящая информацию по любой аграрной теме.',
                en: 'An aggregator of the latest industry news and a smart search engine that finds information on any agricultural topic.',
            },
            benefit: {
                uz: 'Dunyoda va O\'zbekistonda bo\'layotgan o\'zgarishlardan birinchi bo\'lib xabardor bo\'lish va kerakli ma\'lumotni soniyalar ichida topish.',
                ru: 'Быть в курсе изменений в мире и Узбекистане, и находить нужную информацию за считанные секунды.',
                en: 'Be the first to know about changes in the world and Uzbekistan, and find the necessary information within seconds.',
            }
        },
    ],
    rolesList: [
        {
            title: { uz: 'Fermerlar va Dehqonlar', ru: 'Фермеры и Дехкане', en: 'Farmers and Peasants' },
            description: {
                uz: 'Hosildorlikni oshirish sirlari, kasalliklarga qarshi kurash, subsidiya olish va bozor narxlarini kuzatish imkoniyati.',
                ru: 'Секреты повышения урожайности, борьба с болезнями, получение субсидий и мониторинг рыночных цен.',
                en: 'Secrets to increasing yields, disease control, obtaining subsidies, and monitoring market prices.'
            }
        },
        {
            title: { uz: 'Talabalar va Olimlar', ru: 'Студенты и Ученые', en: 'Students and Scientists' },
            description: {
                uz: 'Ilmiy tadqiqotlar uchun ishonchli manbalar, xalqaro tajriba, laboratoriyalar va "TIQXMMI" MTU bazasidagi ishlanmalar.',
                ru: 'Надежные источники для научных исследований, международный опыт, лаборатории и разработки на базе НИУ «ТИИИМСХ».',
                en: 'Reliable sources for scientific research, international experience, laboratories, and developments based on "TIIAME" NRU.'
            }
        },
        {
            title: { uz: 'Tadbirkorlar va Investorlar', ru: 'Предприниматели и Инвесторы', en: 'Entrepreneurs and Investors' },
            description: {
                uz: 'Bozor tahlili, eksport imkoniyatlari, raqamli texnologiyalarni joriy etish xarajatlari va qonunchilik bazasi.',
                ru: 'Анализ рынка, экспортные возможности, затраты на внедрение цифровых технологий и законодательная база.',
                en: 'Market analysis, export opportunities, costs of implementing digital technologies, and the legislative framework.'
            }
        }
    ]
};

const getIcon = (id: string) => {
    switch (id) {
        case 'sectors': return <LeafIcon className="h-6 w-6 text-green-600" />;
        case 'tech': return <SparklesIcon className="h-6 w-6 text-blue-600" />;
        case 'docs': return <NewspaperIcon className="h-6 w-6 text-purple-600" />;
        case 'stats': return <ChartBarIcon className="h-6 w-6 text-orange-600" />;
        case 'edu': return <GlobeIcon className="h-6 w-6 text-indigo-600" />;
        case 'news': return <SearchIcon className="h-6 w-6 text-red-600" />;
        default: return <LeafIcon className="h-6 w-6 text-gray-600" />;
    }
};

export const AboutPlatform: React.FC<{ language: Language }> = ({ language }) => {
    return (
        <SectionCard title={translations.title[language]}>
            <div className="space-y-16">
                {/* Intro Section */}
                <div className="bg-gradient-to-r from-green-50 to-white p-8 rounded-2xl border border-green-100 shadow-sm">
                    <div className="flex flex-col md:flex-row items-start gap-6">
                        <div className="p-4 bg-white rounded-full shadow-md">
                            <LeafIcon className="h-10 w-10 text-green-600" />
                        </div>
                        <div>
                            <h3 className="text-2xl md:text-3xl font-bold text-green-800 mb-4">{translations.aboutTitle[language]}</h3>
                            <p className="text-gray-700 leading-relaxed text-lg">{translations.aboutText[language]}</p>
                        </div>
                    </div>
                </div>

                {/* Detailed Sections Grid */}
                <div>
                    <h3 className="text-2xl font-bold text-gray-800 mb-8 flex items-center">
                        <span className="w-2 h-8 bg-green-500 rounded-full mr-3"></span>
                        {translations.sectionsTitle[language]}
                    </h3>
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                        {translations.sectionsList.map((section) => (
                            <div key={section.id} className="bg-white border border-gray-100 rounded-2xl p-6 shadow-md hover:shadow-xl transition-all duration-300 group flex flex-col h-full">
                                <div className="flex items-center mb-5">
                                    <div className="p-3 bg-gray-50 rounded-xl group-hover:bg-green-50 transition-colors duration-300 mr-4">
                                        {getIcon(section.id)}
                                    </div>
                                    <h4 className="text-xl font-bold text-gray-800 group-hover:text-green-700 transition-colors">
                                        {section.title[language]}
                                    </h4>
                                </div>
                                
                                <div className="mb-6 flex-grow">
                                    <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">
                                        {translations.contentLabel[language]}
                                    </p>
                                    <p className="text-gray-700 leading-relaxed">
                                        {section.content[language]}
                                    </p>
                                </div>

                                <div className="bg-green-50/50 rounded-xl p-4 mt-auto border border-green-100 relative overflow-hidden">
                                    <div className="absolute top-0 left-0 w-1 h-full bg-green-400"></div>
                                    <p className="text-xs font-bold text-green-800 uppercase tracking-wider mb-2">
                                        {translations.benefitLabel[language]}
                                    </p>
                                    <p className="text-gray-800 text-sm font-medium">
                                        {section.benefit[language]}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Target Audience Section */}
                <div className="bg-gray-50 rounded-3xl p-8 md:p-12">
                    <h3 className="text-2xl font-bold text-gray-800 mb-8 text-center">{translations.forWhomTitle[language]}</h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {translations.rolesList.map((role, index) => (
                            <div key={index} className="bg-white p-6 rounded-2xl shadow-sm text-center border border-gray-100 hover:-translate-y-2 transition-transform duration-300">
                                <div className="mx-auto w-16 h-16 bg-blue-50 rounded-full flex items-center justify-center mb-4 text-blue-600">
                                    {index === 0 ? <UserCircleIcon className="h-8 w-8" /> : 
                                     index === 1 ? <UsersIcon className="h-8 w-8" /> : 
                                     <ChartBarIcon className="h-8 w-8" />}
                                </div>
                                <h4 className="text-lg font-bold text-gray-800 mb-3">{role.title[language]}</h4>
                                <p className="text-sm text-gray-600 leading-relaxed">{role.description[language]}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </SectionCard>
    );
};
