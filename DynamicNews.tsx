
import React, { useState, useEffect } from 'react';
import { GoogleGenAI, Type } from '@google/genai';
import type { Language, DynamicNewsArticle } from '../types';
import { SectionCard } from './SectionCard';
import { InfoIcon } from './IconComponents';

const translations = {
    title: {
        uz: 'Dinamik Yangiliklar',
        ru: 'Динамические Новости',
        en: 'Dynamic News',
    },
    description: {
        uz: 'Sun\'iy intellekt yordamida O\'zbekiston qishloq xo\'jaligi sohasidagi so\'nggi yangiliklar va voqealar avtomatik ravishda to\'planadi.',
        ru: 'Последние новости и события в сфере сельского хозяйства Узбекистана, автоматически собранные с помощью искусственного интеллекта.',
        en: 'The latest news and events in the agricultural sector of Uzbekistan, automatically aggregated using Artificial Intelligence.',
    },
    loading: {
        uz: 'Yangiliklar yuklanmoqda...',
        ru: 'Загрузка новостей...',
        en: 'Loading news...',
    },
    error: {
        uz: 'Yangiliklarni yuklashda xatolik yuz berdi. Iltimos, keyinroq qayta urinib ko\'ring.',
        ru: 'Произошла ошибка при загрузке новостей. Пожалуйста, попробуйте позже.',
        en: 'An error occurred while loading the news. Please try again later.',
    },
    noNews: {
        uz: 'Hozircha yangi yangiliklar topilmadi.',
        ru: 'Свежих новостей пока не найдено.',
        en: 'No new news found at the moment.',
    },
    readMore: {
        uz: 'Batafsil',
        ru: 'Читать далее',
        en: 'Read More',
    }
};

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY! });

const newsArticleSchema = {
    type: Type.ARRAY,
    items: {
      type: Type.OBJECT,
      properties: {
        title: {
          type: Type.STRING,
          description: 'Yangilikning sarlavhasi',
        },
        summary: {
          type: Type.STRING,
          description: 'Yangilikning qisqacha mazmuni (2-3 jumla)',
        },
        sourceUrl: {
            type: Type.STRING,
            description: 'Yangilikning asl manbasiga havola (URL)',
        },
        publicationDate: {
            type: Type.STRING,
            description: 'Yangilik e\'lon qilingan sana (YYYY-MM-DD formatida)',
        },
      },
      required: ["title", "summary", "sourceUrl", "publicationDate"],
    },
};

const LoadingSkeleton: React.FC = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="bg-white p-6 rounded-xl shadow-md border border-gray-200 animate-pulse">
                <div className="h-5 bg-gray-200 rounded w-3/4 mb-3"></div>
                <div className="h-3 bg-gray-200 rounded w-1/2 mb-4"></div>
                <div className="space-y-2">
                    <div className="h-4 bg-gray-200 rounded"></div>
                    <div className="h-4 bg-gray-200 rounded"></div>
                    <div className="h-4 bg-gray-200 rounded w-5/6"></div>
                </div>
                 <div className="h-8 bg-gray-200 rounded-full w-24 mt-4"></div>
            </div>
        ))}
    </div>
);

const ArticleCard: React.FC<{ article: DynamicNewsArticle; language: Language }> = ({ article, language }) => (
    <a 
        href={article.sourceUrl} 
        target="_blank" 
        rel="noopener noreferrer"
        className="block bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300 border border-gray-200 transform hover:-translate-y-1 h-full flex flex-col"
    >
        <div className="flex-grow">
            <h3 className="text-lg font-bold text-gray-800 mb-2">{article.title}</h3>
            <p className="text-xs text-gray-500 mb-3">{article.publicationDate}</p>
            <p className="text-sm text-gray-600 leading-relaxed">{article.summary}</p>
        </div>
        <div className="mt-4 pt-4 border-t border-gray-100 text-right">
            <span className="font-semibold text-green-600 hover:text-green-700">
                {translations.readMore[language]} &rarr;
            </span>
        </div>
    </a>
);


export const DynamicNews: React.FC<{ language: Language }> = ({ language }) => {
    const [news, setNews] = useState<DynamicNewsArticle[] | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchNews = async () => {
            setIsLoading(true);
            setError(null);
            setNews(null);

            try {
                const prompt = `Internetdan foydalanib, O'zbekiston qishloq xo'jaligi sohasiga oid so'nggi 7 kun ichidagi eng muhim 5-6 ta yangilikni top. Natijalarni JSON formatida, sarlavha, qisqacha mazmun, asl manba havolasi va e'lon qilingan sana bilan taqdim et.`;

                const response = await ai.models.generateContent({
                    model: 'gemini-2.5-flash',
                    contents: prompt,
                    config: {
                        responseMimeType: "application/json",
                        responseSchema: newsArticleSchema,
                    },
                });
                
                const jsonText = response.text.trim();
                const parsedNews: DynamicNewsArticle[] = JSON.parse(jsonText);
                setNews(parsedNews);

            } catch (err) {
                console.error("Error fetching dynamic news:", err);
                setError(translations.error[language]);
            } finally {
                setIsLoading(false);
            }
        };

        fetchNews();
    }, [language]);

    return (
        <SectionCard title={translations.title[language]}>
            <p className="mb-8 text-gray-600 max-w-3xl">{translations.description[language]}</p>
            {isLoading && <LoadingSkeleton />}
            {error && (
                <div className="bg-red-50 border border-red-200 text-red-800 p-4 rounded-lg flex items-center">
                    <InfoIcon className="h-5 w-5 mr-3 flex-shrink-0" />
                    <p>{error}</p>
                </div>
            )}
            {news && !isLoading && (
                news.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {news.map((article, index) => (
                            <ArticleCard key={index} article={article} language={language} />
                        ))}
                    </div>
                ) : (
                    <div className="bg-gray-50 text-gray-600 p-6 rounded-lg text-center">
                        <p>{translations.noNews[language]}</p>
                    </div>
                )
            )}
        </SectionCard>
    );
};
