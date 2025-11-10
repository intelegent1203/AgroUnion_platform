
import React, { useState, useMemo } from 'react';
import type { Language, LocalizedString } from '../types';
import { SectionCard } from './SectionCard';

const translations = {
    title: {
        uz: 'Raqamli Texnologiyalar Xarajat Kalkulyatori',
        ru: 'Калькулятор Затрат на Цифровые Технологии',
        en: 'Digital Technology Cost Calculator',
    },
    description: {
        uz: 'Belgilangan maydon uchun raqamli qishloq xo\'jaligi texnologiyalarini joriy etishning taxminiy yillik xarajatlarini hisoblang. O\'z qiymatlaringizni sariq ustunlarga kiriting va natijalarni avtomatik ravishda ko\'ring.',
        ru: 'Рассчитайте примерные годовые затраты на внедрение цифровых агротехнологий для указанной площади. Введите свои значения в желтые столбцы и смотрите результаты автоматически.',
        en: 'Calculate the estimated annual costs of implementing digital agricultural technologies for a specified area. Enter your values in the yellow columns and see the results automatically.',
    },
    areaLabel: { uz: 'Umumiy maydon (gektar)', ru: 'Общая площадь (гектар)', en: 'Total Area (hectares)' },
    // Table Headers
    component: { uz: 'Texnologiya Komponenti', ru: 'Компонент Технологии', en: 'Technology Component' },
    capex: { uz: 'Sarmoya (CAPEX)', ru: 'Капитальные затраты (CAPEX)', en: 'Capital Costs (CAPEX)' },
    amortization: { uz: 'Amortizatsiya (yil)', ru: 'Амортизация (лет)', en: 'Amortization (years)' },
    opex: { uz: 'Yillik Xarajat (OPEX)', ru: 'Годовые расходы (OPEX)', en: 'Annual Costs (OPEX)' },
    var: { uz: 'O\'zgaruvchan Xarajat (VAR)', ru: 'Переменные расходы (VAR)', en: 'Variable Costs (VAR)' },
    totalAnnual: { uz: 'Jami Yillik', ru: 'Итого в год', en: 'Total Annual' },
    // Technology Names
    sensors: { uz: 'Sensorlar tarmog\'i', ru: 'Сенсорная сеть', en: 'Sensor Network' },
    drone: { uz: 'Dron va tahlil', ru: 'Дрон и аналитика', en: 'Drone & Analytics' },
    irrigation: { uz: 'Aqlli sug\'orish', ru: 'Умное орошение', en: 'Smart Irrigation' },
    saas: { uz: 'SaaS Platforma', ru: 'SaaS Платформа', en: 'SaaS Platform' },
    // Results
    resultsTitle: { uz: 'Hisob-kitob Natijalari', ru: 'Результаты Расчета', en: 'Calculation Results' },
    totalAnnualCost: { uz: 'Umumiy yillik xarajat', ru: 'Общие годовые затраты', en: 'Total Annual Cost' },
    costPerHectare: { uz: '1 gektar uchun yillik xarajat', ru: 'Годовые затраты на 1 гектар', en: 'Annual Cost Per Hectare' },
    currency: { uz: 'so\'m', ru: 'сум', en: 'UZS' },
    // Glossary
    glossaryTitle: { uz: 'Atamalar Izohi', ru: 'Глоссарий Терминов', en: 'Glossary of Terms' },
    financialTermsTitle: { uz: 'Moliyaviy Atamalar', ru: 'Финансовые Термины', en: 'Financial Terms' },
    techComponentsTitle: { uz: 'Texnologiya Komponentlari', ru: 'Технологические Компоненты', en: 'Technology Components' },
    capexExplanation: {
        uz: 'Uskunalar, texnologiyalar yoki binolar kabi uzoq muddatli aktivlarni sotib olish uchun qilinadigan bir martalik yirik xarajatlar. Bu boshlang\'ich investitsiya hisoblanadi.',
        ru: 'Единовременные крупные затраты на приобретение долгосрочных активов, таких как оборудование, технологии или здания. Это считается первоначальной инвестицией.',
        en: 'One-time, major expenses for purchasing long-term assets like equipment, technology, or buildings. This is the initial investment.',
    },
    amortizationExplanation: {
        uz: 'Sarmoyaviy xarajat qiymatini uskunaning xizmat qilish muddati davomida yillarga taqsimlash. Bu yillik eskirish xarajatini hisoblashga yordam beradi.',
        ru: 'Распределение стоимости капитальных затрат на годы в течение срока службы оборудования. Это помогает рассчитать годовые затраты на износ.',
        en: 'The process of spreading the cost of a capital asset over its useful life. This helps calculate the annual depreciation cost.',
    },
    opexExplanation: {
        uz: 'Texnologiyadan foydalanish uchun zarur bo\'lgan doimiy yillik operatsion xarajatlar (masalan, litsenziya, texnik xizmat, obuna to\'lovlari).',
        ru: 'Постоянные годовые операционные расходы, необходимые для использования технологии (например, лицензия, техническое обслуживание, абонентская плата).',
        en: 'Ongoing annual operational costs required to use the technology (e.g., license fees, maintenance, subscriptions).',
    },
    varExplanation: {
        uz: 'Foydalanish hajmi yoki intensivligiga qarab o\'zgaradigan xarajatlar (masalan, dron uchun qo\'shimcha batareyalar, har bir tahlil uchun to\'lov).',
        ru: 'Затраты, которые меняются в зависимости от объема или интенсивности использования (например, дополнительные батареи для дрона, плата за каждый анализ).',
        en: 'Costs that vary depending on the volume or intensity of use (e.g., extra batteries for a drone, fee per analysis).',
    },
    sensorsExplanation: {
        uz: 'Vazifasi: Tuproq namligi, harorati, ozuqa moddalari miqdori kabi muhim ko\'rsatkichlarni real vaqt rejimida o\'lchaydi. Nima uchun kerak: Resurslarni (suv, o\'g\'it) aniq va tejamkor ishlatish, hosildorlikni oshirish va o\'simliklar holatini doimiy nazorat qilish uchun.',
        ru: 'Задача: Измеряет в реальном времени важные показатели, такие как влажность почвы, температура, содержание питательных веществ. Зачем нужно: Для точного и экономного использования ресурсов (вода, удобрения), повышения урожайности и постоянного контроля состояния растений.',
        en: 'Task: Measures key indicators like soil moisture, temperature, and nutrient levels in real time. Why it\'s needed: For precise and economical use of resources (water, fertilizer), increasing yield, and constantly monitoring plant health.',
    },
    droneExplanation: {
        uz: 'Vazifasi: Katta maydonlarni tezda kuzatish, ekinlar holatini (kasallik, zararkunandalar, o\'sish sur\'ati) tahlil qilish. Nima uchun kerak: Muammolarni erta aniqlash, purkash kabi ishlarni avtomatlashtirish va dala salomatligi xaritasini yaratish uchun.',
        ru: 'Задача: Быстрый осмотр больших площадей, анализ состояния посевов (болезни, вредители, темпы роста). Зачем нужно: Для раннего выявления проблем, автоматизации таких задач, как опрыскивание, и создания карты здоровья поля.',
        en: 'Task: Quickly survey large areas, analyze crop conditions (diseases, pests, growth rate). Why it\'s needed: For early problem detection, automating tasks like spraying, and creating a field health map.',
    },
    irrigationExplanation: {
        uz: 'Vazifasi: Sensorlardan olingan ma\'lumotlar va ob-havo prognozlariga asoslanib, sug\'orish jarayonini avtomatik boshqaradi. Nima uchun kerak: Suv sarfini 50% gacha tejash, o\'simliklarni kerakli vaqtda optimal miqdorda suv bilan ta\'minlash uchun.',
        ru: 'Задача: Автоматически управляет процессом полива на основе данных с датчиков и прогнозов погоды. Зачем нужно: Для экономии до 50% воды, обеспечения растений оптимальным количеством воды в нужное время.',
        en: 'Task: Automatically manages the irrigation process based on data from sensors and weather forecasts. Why it\'s needed: To save up to 50% of water and provide plants with the optimal amount of water at the right time.',
    },
    saasExplanation: {
        uz: 'Vazifasi: Barcha texnologiyalardan (sensorlar, dronlar) kelayotgan ma\'lumotlarni bir joyga to\'plash, tahlil qilish va fermerga qaror qabul qilish uchun qulay shaklda taqdim etish. Nima uchun kerak: Xo\'jalikni samarali boshqarish, xarajatlar va hosilni prognoz qilish uchun.',
        ru: 'Задача: Собирает, анализирует и представляет в удобной форме данные со всех технологий (датчики, дроны) для принятия фермером решений. Зачем нужно: Для эффективного управления хозяйством, прогнозирования затрат и урожая.',
        en: 'Task: Gathers, analyzes, and presents data from all technologies (sensors, drones) in a user-friendly format for farmer decision-making. Why it\'s needed: For effective farm management and forecasting costs and yields.',
    },
};

interface TechnologyCost {
  id: 'sensors' | 'drone' | 'irrigation' | 'saas';
  name: LocalizedString;
  capex: number;
  amortization: number;
  opex: number;
  var: number;
}

const initialTechnologies: TechnologyCost[] = [
    { id: 'sensors', name: translations.sensors, capex: 0, amortization: 5, opex: 0, var: 0 },
    { id: 'drone', name: translations.drone, capex: 0, amortization: 4, opex: 0, var: 0 },
    { id: 'irrigation', name: translations.irrigation, capex: 0, amortization: 10, opex: 0, var: 0 },
    { id: 'saas', name: translations.saas, capex: 0, amortization: 1, opex: 0, var: 0 },
];

const GlossaryItem: React.FC<{ title: string; children: React.ReactNode }> = ({ title, children }) => (
    <div className="bg-white p-4 rounded-lg border border-gray-200">
        <h5 className="font-bold text-gray-800">{title}</h5>
        <p className="mt-1 text-sm text-gray-600" dangerouslySetInnerHTML={{ __html: children as string }} />
    </div>
);

export const CostCalculator: React.FC<{ language: Language }> = ({ language }) => {
    const [area, setArea] = useState<number>(1);
    const [technologies, setTechnologies] = useState<TechnologyCost[]>(initialTechnologies);

    const handleTechChange = (id: TechnologyCost['id'], field: keyof Omit<TechnologyCost, 'id' | 'name'>, value: string) => {
        const numericValue = parseFloat(value) || 0;
        setTechnologies(prev =>
            prev.map(tech =>
                tech.id === id ? { ...tech, [field]: numericValue } : tech
            )
        );
    };
    
    const calculatedResults = useMemo(() => {
        const results = technologies.map(tech => {
            const amortizationCost = (tech.amortization > 0) ? tech.capex / tech.amortization : tech.capex;
            const total = amortizationCost + tech.opex + tech.var;
            return { ...tech, total };
        });

        const totalAnnualCost = results.reduce((sum, tech) => sum + tech.total, 0);
        const costPerHectare = area > 0 ? totalAnnualCost / area : 0;

        return { techRows: results, totalAnnualCost, costPerHectare };
    }, [technologies, area]);


    const formatCurrency = (value: number) => {
        return new Intl.NumberFormat('uz-UZ').format(Math.round(value));
    };

    return (
        <SectionCard title={translations.title[language]}>
            <div>
                <p className="mb-6 text-gray-600">{translations.description[language]}</p>

                <div className="mb-8">
                    <label htmlFor="area" className="block text-lg font-semibold text-gray-800 mb-2">{translations.areaLabel[language]}</label>
                    <input
                        type="number"
                        id="area"
                        value={area || ''}
                        onChange={(e) => setArea(parseFloat(e.target.value) || 0)}
                        className="w-full max-w-xs px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 bg-white"
                        min="0"
                        placeholder="1"
                    />
                </div>

                <div className="overflow-x-auto">
                    <table className="min-w-full bg-white border border-gray-200">
                        <thead className="bg-green-100">
                            <tr>
                                <th className="py-3 px-4 text-left text-sm font-semibold text-green-800">{translations.component[language]}</th>
                                <th className="py-3 px-4 text-left text-sm font-semibold text-green-800">{translations.capex[language]}</th>
                                <th className="py-3 px-4 text-left text-sm font-semibold text-green-800">{translations.amortization[language]}</th>
                                <th className="py-3 px-4 text-left text-sm font-semibold text-green-800">{translations.opex[language]}</th>
                                <th className="py-3 px-4 text-left text-sm font-semibold text-green-800">{translations.var[language]}</th>
                                <th className="py-3 px-4 text-right text-sm font-semibold text-green-800">{translations.totalAnnual[language]}</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                            {calculatedResults.techRows.map(tech => (
                                <tr key={tech.id}>
                                    <td className="py-3 px-4 font-medium text-gray-800">{tech.name[language]}</td>
                                    <td className="py-2 px-2"><input type="number" value={tech.capex || ''} onChange={(e) => handleTechChange(tech.id, 'capex', e.target.value)} className="w-full p-2 bg-yellow-50 border border-yellow-300 rounded-md focus:outline-none focus:ring-1 focus:ring-yellow-500"/></td>
                                    <td className="py-2 px-2"><input type="number" value={tech.amortization || ''} onChange={(e) => handleTechChange(tech.id, 'amortization', e.target.value)} className="w-full p-2 bg-yellow-50 border border-yellow-300 rounded-md focus:outline-none focus:ring-1 focus:ring-yellow-500"/></td>
                                    <td className="py-2 px-2"><input type="number" value={tech.opex || ''} onChange={(e) => handleTechChange(tech.id, 'opex', e.target.value)} className="w-full p-2 bg-yellow-50 border border-yellow-300 rounded-md focus:outline-none focus:ring-1 focus:ring-yellow-500"/></td>
                                    <td className="py-2 px-2"><input type="number" value={tech.var || ''} onChange={(e) => handleTechChange(tech.id, 'var', e.target.value)} className="w-full p-2 bg-yellow-50 border border-yellow-300 rounded-md focus:outline-none focus:ring-1 focus:ring-yellow-500"/></td>
                                    <td className="py-3 px-4 text-right font-semibold text-gray-700">{formatCurrency(tech.total)}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                
                <div className="mt-8 pt-6 border-t-2 border-green-200 bg-green-50 p-6 rounded-lg">
                    <h3 className="text-xl font-bold text-gray-800 mb-4">{translations.resultsTitle[language]}</h3>
                    <div className="space-y-3">
                        <div className="flex justify-between items-center text-lg">
                            <span className="text-gray-600 font-medium">{translations.totalAnnualCost[language]}:</span>
                            <span className="text-2xl font-bold text-green-700">{formatCurrency(calculatedResults.totalAnnualCost)} {translations.currency[language]}</span>
                        </div>
                        <div className="flex justify-between items-center text-lg">
                            <span className="text-gray-600 font-medium">{translations.costPerHectare[language]}:</span>
                            <span className="text-2xl font-bold text-green-700">{formatCurrency(calculatedResults.costPerHectare)} {translations.currency[language]}</span>
                        </div>
                    </div>
                </div>

                <div className="mt-10 pt-6 border-t border-green-200">
                    <h3 className="text-2xl font-bold text-gray-800 mb-6">{translations.glossaryTitle[language]}</h3>
                    <div className="space-y-6">
                        <div>
                            <h4 className="text-lg font-semibold text-green-700 mb-3">{translations.financialTermsTitle[language]}</h4>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <GlossaryItem title={translations.capex[language]}>{translations.capexExplanation[language]}</GlossaryItem>
                                <GlossaryItem title={translations.amortization[language]}>{translations.amortizationExplanation[language]}</GlossaryItem>
                                <GlossaryItem title={translations.opex[language]}>{translations.opexExplanation[language]}</GlossaryItem>
                                <GlossaryItem title={translations.var[language]}>{translations.varExplanation[language]}</GlossaryItem>
                            </div>
                        </div>
                         <div>
                            <h4 className="text-lg font-semibold text-green-700 mb-3">{translations.techComponentsTitle[language]}</h4>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <GlossaryItem title={translations.sensors[language]}>{translations.sensorsExplanation[language]}</GlossaryItem>
                                <GlossaryItem title={translations.drone[language]}>{translations.droneExplanation[language]}</GlossaryItem>
                                <GlossaryItem title={translations.irrigation[language]}>{translations.irrigationExplanation[language]}</GlossaryItem>
                                <GlossaryItem title={translations.saas[language]}>{translations.saasExplanation[language]}</GlossaryItem>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </SectionCard>
    );
};
