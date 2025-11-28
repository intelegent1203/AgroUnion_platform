
import React from 'react';
// FIX: Aliased the SearchResults type to avoid a name collision with the SearchResults component.
import type { Language, SearchResults as SearchResultsData, SectorData, TechData, DocData, NewsData, AiSearchResult } from '../types';

interface SearchResultsProps {
    language: Language;
    query: string;
    results: SearchResultsData;
    aiResults: AiSearchResult | null;
    isAiSearching: boolean;
}

const translations = {
    title: { uz: 'Qidiruv natijalari', ru: 'Результаты поиска', en: 'Search Results' },
    platformTitle: { uz: 'Platforma Bo\'yicha Natijalar', ru: 'Результаты по Платформе', en: 'Platform Results' },
    found: { uz: 'ta natija topildi', ru: 'результатов найдено', en: 'results found' },
    notFound: { uz: 'Platformada hech narsa topilmadi.', ru: 'На платформе ничего не найдено.', en: 'Nothing found on the platform.' },
    inSectors: { uz: 'Sohalar bo\'limidan', ru: 'Из раздела Отрасли', en: 'From the Sectors section' },
    inTechnologies: { uz: 'Texnologiyalar bo\'limidan', ru: 'Из раздела Технологии', en: 'From the Technologies section' },
    inLegislation: { uz: 'Qonunchilik bo\'limidan', ru: 'Из раздела Законодательство', en: 'From the Legislation section' },
    inNews: { uz: 'Yangiliklar bo\'limidan', ru: 'Из раздела Новости', en: 'From the News section' },
    aiSearchTitle: { uz: 'Sun\'iy Intellekt Bilan Veb-Qidiruv', ru: 'Веб-поиск с Искусственным Интеллектом', en: 'AI-Powered Web Search' },
    aiLoading: { uz: 'SI javobini kuting...', ru: 'Ожидание ответа ИИ...', en: 'Waiting for AI response...' },
    sourcesTitle: { uz: 'Manbalar', ru: 'Источники', en: 'Sources' },
};

const ResultCard: React.FC<{title: string, content: string | React.ReactNode, tag: string}> = ({title, content, tag}) => (
    <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
        <div className="flex justify-between items-start">
            <h4 className="text-lg font-semibold text-green-800">{title}</h4>
            <span className="text-xs bg-green-100 text-green-700 font-medium px-2 py-1 rounded-full whitespace-nowrap">{tag}</span>
        </div>
        <div className="mt-2 text-sm text-gray-600">{content}</div>
    </div>
);

export const SearchResults: React.FC<SearchResultsProps> = ({ language, query, results, aiResults, isAiSearching }) => {
    // This calculation method is correct and avoids type inference issues.
    const totalResults = results.sectors.length + results.technologies.length + results.legislation.length + results.news.length;

    return (
        <div className="space-y-8">
            <header className="text-center">
                <h1 className="text-3xl font-bold text-gray-800">
                    {translations.title[language]}: "<span className="text-green-600">{query}</span>"
                </h1>
            </header>
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
                {/* Local Platform Results */}
                <div className="lg:col-span-2 space-y-8">
                    <h2 className="text-2xl font-bold text-gray-800 border-b-2 border-green-200 pb-2">
                        {translations.platformTitle[language]}
                    </h2>
                    {totalResults > 0 ? (
                        <div className="space-y-8">
                            {results.sectors.length > 0 && (
                                <section>
                                    <h3 className="text-xl font-semibold mb-4">{translations.inSectors[language]}</h3>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        {results.sectors.map((item: SectorData, index) => (
                                            <ResultCard key={`sector-${index}`} title={item.name[language]} content={item.description[language]} tag="Soha" />
                                        ))}
                                    </div>
                                </section>
                            )}
                            {results.technologies.length > 0 && (
                                <section>
                                    <h3 className="text-xl font-semibold mb-4">{translations.inTechnologies[language]}</h3>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        {results.technologies.map((item: TechData, index) => (
                                            <ResultCard key={`tech-${index}`} title={item.name[language]} content={item.description[language]} tag="Texnologiya" />
                                        ))}
                                    </div>
                                </section>
                            )}
                            {results.legislation.length > 0 && (
                                <section>
                                    <h3 className="text-xl font-semibold mb-4">{translations.inLegislation[language]}</h3>
                                    <div className="space-y-3">
                                        {results.legislation.map((item: DocData, index) => (
                                            <ResultCard key={`leg-${index}`} title={item.name[language]} content={item.description[language]} tag="Qonun" />
                                        ))}
                                    </div>
                                </section>
                            )}
                            {results.news.length > 0 && (
                                <section>
                                    <h3 className="text-xl font-semibold mb-4">{translations.inNews[language]}</h3>
                                    <div className="space-y-3">
                                        {results.news.map((item: NewsData, index) => (
                                            <ResultCard key={`news-${index}`} title={item.category[language]} content={item.description[language]} tag="Yangilik" />
                                        ))}
                                    </div>
                                </section>
                            )}
                        </div>
                    ) : (
                        <div className="bg-white p-6 rounded-lg shadow-sm text-center text-gray-500">
                           <p>{translations.notFound[language]}</p>
                        </div>
                    )}
                </div>

                {/* AI Web Search Results */}
                <div className="lg:col-span-1 lg:sticky top-24">
                    <div className="bg-white p-6 rounded-2xl shadow-lg border border-green-200">
                        <h3 className="text-xl font-bold text-green-800 mb-4">{translations.aiSearchTitle[language]}</h3>
                        {isAiSearching && (
                            <div className="flex items-center space-x-3 text-gray-600">
                                <div className="w-5 h-5 border-2 border-dashed rounded-full animate-spin border-green-600"></div>
                                <span>{translations.aiLoading[language]}</span>
                            </div>
                        )}
                        {aiResults && (
                            <div className="space-y-4 animate-fade-in">
                                <p className="text-gray-700 whitespace-pre-wrap leading-relaxed">{aiResults.text}</p>
                                {aiResults.sources && aiResults.sources.length > 0 && (
                                    <div className="pt-4 border-t border-green-100">
                                        <h4 className="font-semibold text-gray-800 mb-2">{translations.sourcesTitle[language]}</h4>
                                        <ul className="space-y-2 max-h-48 overflow-y-auto pr-2">
                                            {/* FIX: Conditionally render the source link only if source.web.uri exists to avoid runtime errors, as the `web` property in GroundingChunk is now optional. */}
                                            {aiResults.sources.map((source, index) => (
                                                source.web?.uri && (
                                                    <li key={index} className="text-sm flex items-start space-x-2">
                                                        <span className="text-green-500 mt-0.5">&#10142;</span>
                                                        <a href={source.web.uri} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800 hover:underline break-words">
                                                            {source.web.title || source.web.uri}
                                                        </a>
                                                    </li>
                                                )
                                            ))}
                                        </ul>
                                    </div>
                                )}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};