
import React, { useState, useEffect } from 'react';
import { GoogleGenAI } from '@google/genai';
import type { Language, SectorData, AiSearchResult, EnhancedSectorData } from '../types';
import { SectionCard } from './SectionCard';

// FIX: Renamed from STATIC_SECTORS_DATA and exported to be used in App.tsx
export const SECTORS_DATA: SectorData[] = [
  {
    name: { uz: 'Donchilik', ru: 'Зерноводство', en: 'Grain Farming' },
    description: { uz: 'Don ekinlari etishtirish', ru: 'Выращивание зерновых культур', en: 'Cultivation of grain crops' },
    subSectors: [
      { uz: 'Bug\'doy', ru: 'Пшеница', en: 'Wheat' },
      { uz: 'Arpa', ru: 'Ячмень', en: 'Barley' },
      { uz: 'Sholi', ru: 'Рис', en: 'Rice' },
      { uz: 'Makkajo\'xori', ru: 'Кукуруза', en: 'Corn' },
    ]
  },
  {
    name: { uz: 'Bog\'dorchilik', ru: 'Садоводство', en: 'Horticulture' },
    description: { uz: 'Meva-sabzavotchilik', ru: 'Плодоовощеводство', en: 'Fruit and vegetable growing' },
    subSectors: [
      { uz: 'Olma', ru: 'Яблоко', en: 'Apple' },
      { uz: 'Uzum', ru: 'Виноград', en: 'Grape' },
      { uz: 'Shaftoli', ru: 'Персик', en: 'Peach' },
      { uz: 'Pomidor', ru: 'Помидор', en: 'Tomato' },
      { uz: 'Yong\'oq', ru: 'Орех', en: 'Walnut' },
    ]
  },
  {
    name: { uz: 'Chorvachilik', ru: 'Животноводство', en: 'Livestock' },
    description: { uz: 'Chorva mollari boqish', ru: 'Разведение скота', en: 'Cattle breeding' },
    subSectors: [
      { uz: 'Qoramol', ru: 'Крупный рогатый скот', en: 'Cattle' },
      { uz: 'Qo\'y', ru: 'Овцы', en: 'Sheep' },
      { uz: 'Echki', ru: 'Козы', en: 'Goats' },
      { uz: 'Parranda', ru: 'Птица', en: 'Poultry' },
    ]
  },
   {
    name: { uz: 'Ipakchilik', ru: 'Шелководство', en: 'Sericulture' },
    description: { uz: 'Ipak qurti boqish', ru: 'Разведение шелкопряда', en: 'Silkworm breeding' },
    subSectors: [
      { uz: 'Tut daraxti', ru: 'Шелковица', en: 'Mulberry tree' },
      { uz: 'Ipak qurti', ru: 'Шелкопряд', en: 'Silkworm' },
    ]
  }
];

const translations = {
  title: { uz: 'Qishloq Xo\'jaligi Sohalari', ru: 'Отрасли Сельского Хозяйства', en: 'Agricultural Sectors' },
  subSectorsLabel: { uz: 'Asosiy turlari', ru: 'Основные виды', en: 'Main types' },
  sourcesTitle: { uz: 'Manbalar', ru: 'Источники', en: 'Sources' },
  ministryTitle: { uz: 'O\'zbekiston Respublikasi Qishloq xo\'jaligi vazirligi', ru: 'Министерство сельского хозяйства Республики Узбекистан', en: 'Ministry of Agriculture of the Republic of Uzbekistan' },
  officialSite: { uz: 'Rasmiy sayt', ru: 'Официальный сайт', en: 'Official Website' },
  errorFetching: { uz: 'Ma\'lumot yuklashda xatolik.', ru: 'Ошибка загрузки данных.', en: 'Error fetching data.' },
};

const LoadingSkeleton: React.FC = () => (
    <div className="space-y-3 animate-pulse">
        <div className="h-4 bg-gray-200 rounded w-3/4"></div>
        <div className="h-4 bg-gray-200 rounded w-full"></div>
        <div className="h-4 bg-gray-200 rounded w-5/6"></div>
    </div>
);

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY! });

export const AgriculturalSectors: React.FC<{ language: Language }> = ({ language }) => {
  const [enhancedSectors, setEnhancedSectors] = useState<EnhancedSectorData[]>(
      SECTORS_DATA.map(sector => ({ ...sector, aiContent: null }))
  );
  const [ministryInfo, setMinistryInfo] = useState<AiSearchResult | null>(null);
  const [isLoadingSectors, setIsLoadingSectors] = useState(true);
  const [isLoadingMinistry, setIsLoadingMinistry] = useState(true);

  useEffect(() => {
    let isMounted = true;

    const fetchSectorDetails = async () => {
        setIsLoadingSectors(true);
        try {
            const promises = SECTORS_DATA.map(sector => {
                const prompt = `O'zbekistonda "${sector.name[language]}" sohasi haqida internetdan foydalanib batafsil ma'lumot ber. Uning mamlakat qishloq xo'jaligidagi o'rni, asosiy yutuqlari va muammolarini yoritib ber.`;
                return ai.models.generateContent({
                    model: 'gemini-2.5-flash',
                    contents: prompt,
                    config: { tools: [{ googleSearch: {} }] },
                });
            });

            const settledResults = await Promise.allSettled(promises);
            
            const newEnhancedSectors = settledResults.map((result, index) => {
                const sector = SECTORS_DATA[index];
                if (result.status === 'fulfilled') {
                    const response = result.value;
                    const rawText = response.text;
                    const cleanedText = rawText.replace(/\*\*/g, '');
                    return {
                        ...sector,
                        aiContent: {
                            text: cleanedText,
                            sources: response.candidates?.[0]?.groundingMetadata?.groundingChunks ?? []
                        }
                    };
                } else {
                    console.error(`Error fetching details for sector: ${sector.name[language]}`, result.reason);
                    return {
                        ...sector,
                        aiContent: { text: translations.errorFetching[language], sources: [] }
                    };
                }
            });

            if (isMounted) {
                setEnhancedSectors(newEnhancedSectors);
            }
        } catch (error) {
            console.error("A critical error occurred in fetchSectorDetails:", error);
             if (isMounted) {
                 setEnhancedSectors(SECTORS_DATA.map(sector => ({ ...sector, aiContent: {text: translations.errorFetching[language], sources: []} })));
             }
        } finally {
            if (isMounted) {
                setIsLoadingSectors(false);
            }
        }
    };

    const fetchMinistryInfo = async () => {
        setIsLoadingMinistry(true);
        try {
            const prompt = `O'zbekiston Respublikasi Qishloq xo'jaligi vazirligi (sayt: https://www.gov.uz/oz/agro) haqida qisqacha ma'lumot ber. Uning asosiy vazifalari nimalardan iborat?`;
            const response = await ai.models.generateContent({
                model: 'gemini-2.5-flash',
                contents: prompt,
                config: { tools: [{ googleSearch: {} }] },
            });
            const rawText = response.text;
            const cleanedText = rawText.replace(/\*\*/g, ''); // Remove markdown bold syntax
            if (isMounted) {
                setMinistryInfo({
                    text: cleanedText,
                    sources: response.candidates?.[0]?.groundingMetadata?.groundingChunks ?? []
                });
            }
        } catch (error) {
            console.error("Error fetching ministry info:", error);
            if (isMounted) {
                setMinistryInfo({text: translations.errorFetching[language], sources: []});
            }
        } finally {
            if (isMounted) {
                setIsLoadingMinistry(false);
            }
        }
    };

    fetchSectorDetails();
    fetchMinistryInfo();

    return () => {
      isMounted = false;
    }
  }, [language]);

  return (
    <div className="space-y-12">
      <SectionCard title={translations.title[language]}>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {enhancedSectors.map((sector, index) => (
            <div key={index} className="bg-green-50 p-6 rounded-xl border border-green-200 flex flex-col">
              <h3 className="text-xl font-bold text-green-700 mb-3">{sector.name[language]}</h3>
              
              <div className="text-gray-700 mb-4 space-y-2 flex-grow">
                {isLoadingSectors ? <LoadingSkeleton /> : (
                  <>
                    <p className="whitespace-pre-wrap leading-relaxed">{sector.aiContent?.text}</p>
                    {sector.aiContent && sector.aiContent.sources.length > 0 && (
                        <div className="pt-3 mt-3 border-t border-green-200">
                            <h5 className="font-semibold text-sm text-gray-800 mb-1">{translations.sourcesTitle[language]}:</h5>
                             <ul className="space-y-1">
                                {/* FIX: Conditionally render the source link only if source.web.uri exists to avoid runtime errors due to the `web` property being optional. */}
                                {sector.aiContent.sources.map((source, idx) => (
                                    source.web?.uri && (
                                        <li key={idx} className="text-xs flex items-start space-x-1.5">
                                            <span className="text-green-600 mt-0.5">&#10142;</span>
                                            <a href={source.web.uri} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline break-words">
                                                {source.web.title || source.web.uri}
                                            </a>
                                        </li>
                                    )
                                ))}
                            </ul>
                        </div>
                    )}
                  </>
                )}
              </div>
              
              <div>
                <h4 className="font-semibold text-gray-800">{translations.subSectorsLabel[language]}:</h4>
                <div className="flex flex-wrap gap-2 mt-2">
                  {sector.subSectors.map((sub, subIndex) => (
                    <span key={subIndex} className="bg-green-200 text-green-800 text-sm font-medium px-3 py-1 rounded-full">
                      {sub[language]}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </SectionCard>

      <SectionCard title={translations.ministryTitle[language]}>
          <div className="bg-blue-50 p-6 rounded-xl border border-blue-200">
            {isLoadingMinistry ? <LoadingSkeleton /> : (
                <div className="space-y-4">
                    <p className="text-gray-700 whitespace-pre-wrap leading-relaxed">{ministryInfo?.text}</p>
                    <div className="flex items-center space-x-2">
                         <span className="font-semibold">{translations.officialSite[language]}:</span>
                         <a href="https://www.gov.uz/oz/agro" target="_blank" rel="noopener noreferrer" className="text-blue-600 font-medium hover:underline">
                            agro.gov.uz
                         </a>
                    </div>
                </div>
            )}
          </div>
      </SectionCard>
    </div>
  );
};