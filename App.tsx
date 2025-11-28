
import React, { useState, useCallback } from 'react';
import { GoogleGenAI } from '@google/genai';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { HomePage } from './components/HomePage';
import { AgriculturalSectors, SECTORS_DATA } from './components/AgriculturalSectors';
import { Technologies, AGRO_PLATFORMS_DATA, TECHNOLOGIES_DATA } from './components/Technologies';
import { Statistics } from './components/Statistics';
import { Legislation, DOCUMENTS_DATA } from './components/Legislation';
import { EducationalResources } from './components/EducationalResources';
import { NewsAndInnovations, NEWS_DATA } from './components/NewsAndInnovations';
import DynamicNews from './components/DynamicNews';
import { NAV_ITEMS } from './constants';
import type { Language, NavItemId, User, SearchResults as SearchResultsData, AiSearchResult, Suggestion } from './types';
import { HomeIcon, ArrowLeftIcon } from './components/IconComponents';
import { AboutPlatform } from './components/AboutPlatform';
import { Team } from './components/Team';
import { Careers } from './components/Careers';
import { Contact } from './components/Contact';
import { FAQ } from './components/FAQ';
import { PrivacyPolicy } from './components/PrivacyPolicy';
import { TermsOfUse } from './components/TermsOfUse';
import { UserSuggestions } from './components/UserSuggestions';
import { Login } from './components/Login';
import { Register } from './components/Register';
import { Profile } from './components/Profile';
import { SearchResults } from './components/SearchResults';

const homeButtonTranslations = {
  home: {
    uz: 'Bosh Sahifa',
    ru: 'Главная',
    en: 'Home',
  },
};

const backButtonTranslations = {
  back: {
    uz: 'Orqaga',
    ru: 'Назад',
    en: 'Back',
  },
};

export const App: React.FC = () => {
  const [activeSection, setActiveSection] = useState<NavItemId>('home');
  const [language, setLanguage] = useState<Language>('uz');
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [searchResults, setSearchResults] = useState<SearchResultsData | null>(null);
  const [aiSearchResults, setAiSearchResults] = useState<AiSearchResult | null>(null);
  const [isAiSearching, setIsAiSearching] = useState<boolean>(false);
  const [suggestions, setSuggestions] = useState<Suggestion[]>([]);

  const handleLogin = (user: User) => {
    setCurrentUser(user);
    setActiveSection('home');
  };

  const handleLogout = () => {
    setCurrentUser(null);
    setActiveSection('home');
  };

  const handleRegister = (user: User) => {
    handleLogin(user);
  };

  const handleSuggestionSubmit = (suggestionData: Omit<Suggestion, 'timestamp'>) => {
    const newSuggestion: Suggestion = {
      ...suggestionData,
      timestamp: new Date(),
    };
    setSuggestions(prev => [newSuggestion, ...prev]);
  };

  const performSearch = (query: string, lang: Language): SearchResultsData => {
    const lowerCaseQuery = query.toLowerCase();
    if (!lowerCaseQuery) return { sectors: [], technologies: [], legislation: [], news: [] };

    const sectors = SECTORS_DATA.filter(item => 
      item.name[lang].toLowerCase().includes(lowerCaseQuery) ||
      item.description[lang].toLowerCase().includes(lowerCaseQuery) ||
      item.subSectors.some(sub => sub[lang].toLowerCase().includes(lowerCaseQuery))
    );
    
    const allTechAndPlatforms = [...AGRO_PLATFORMS_DATA, ...TECHNOLOGIES_DATA];
    const technologies = allTechAndPlatforms.filter(item => 
      item.name[lang].toLowerCase().includes(lowerCaseQuery) ||
      item.description[lang].toLowerCase().includes(lowerCaseQuery) ||
      item.application[lang].toLowerCase().includes(lowerCaseQuery)
    );

    const legislation = DOCUMENTS_DATA.filter(item => 
      item.name[lang].toLowerCase().includes(lowerCaseQuery) ||
      item.type[lang].toLowerCase().includes(lowerCaseQuery) ||
      item.description[lang].toLowerCase().includes(lowerCaseQuery)
    );

    const news = NEWS_DATA.filter(item => 
      item.title[lang].toLowerCase().includes(lowerCaseQuery) ||
      item.category[lang].toLowerCase().includes(lowerCaseQuery) ||
      item.description[lang].toLowerCase().includes(lowerCaseQuery)
    );
    return { sectors, technologies, legislation, news };
  };

  const handleSearch = async (query: string) => {
    // 1. Set local results
    const localResults = performSearch(query, language);
    setSearchQuery(query);
    setSearchResults(localResults);
    setActiveSection('search');

    // 2. Reset AI results and start loading
    setAiSearchResults(null);
    setIsAiSearching(true);

    try {
        // 3. Call Gemini API
        const ai = new GoogleGenAI({ apiKey: process.env.API_KEY! });
        
        const fullPrompt = `Qishloq xo'jaligi sohasiga oid quyidagi so'rov bo'yicha internetdan batafsil ma'lumot topib, umumlashtirib ber: "${query}"`;
        
        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: fullPrompt,
            config: {
                tools: [{ googleSearch: {} }],
            },
        });

        const rawText = response.text;
        const cleanedText = rawText.replace(/\*\*/g, ''); // Remove markdown bold syntax
        const sources = response.candidates?.[0]?.groundingMetadata?.groundingChunks ?? [];
        
        setAiSearchResults({ text: cleanedText, sources });

    } catch (error) {
        console.error("Error fetching AI search results:", error);
        const errorText = {
          uz: "Sun'iy intellekt bilan qidirishda xatolik yuz berdi. Iltimos, keyinroq qayta urinib ko'ring.",
          ru: "Произошла ошибка при поиске с помощью искусственного интеллекта. Пожалуйста, попробуйте позже.",
          en: "An error occurred while searching with Artificial Intelligence. Please try again later."
        }
        setAiSearchResults({ text: errorText[language], sources: [] });
    } finally {
        // 4. Stop loading
        setIsAiSearching(false);
    }
  };

  const renderSection = useCallback(() => {
    switch (activeSection) {
      case 'home':
        return <HomePage language={language} />;
      case 'sectors':
        return <AgriculturalSectors language={language} />;
      case 'technologies':
        return <Technologies language={language} />;
      case 'statistics':
        return <Statistics language={language} />;
      case 'legislation':
        return <Legislation language={language} />;
      case 'education':
        return <EducationalResources language={language} />;
      case 'news':
        return <NewsAndInnovations language={language} />;
      case 'dynamic-news':
        return <DynamicNews language={language} />;
      case 'suggestions':
        return <UserSuggestions language={language} onSuggestionSubmit={handleSuggestionSubmit} />;
      case 'aboutPlatform':
        return <AboutPlatform language={language} />;
      case 'team':
        return <Team language={language} />;
      case 'careers':
        return <Careers language={language} />;
      case 'contact':
        return <Contact language={language} />;
      case 'faq':
        return <FAQ language={language} />;
      case 'privacy':
        return <PrivacyPolicy language={language} />;
      case 'terms':
        return <TermsOfUse language={language} />;
      case 'login':
        return <Login language={language} onLogin={handleLogin} setActiveSection={setActiveSection} />;
      case 'register':
        return <Register language={language} onRegister={handleRegister} setActiveSection={setActiveSection} />;
      case 'profile':
        return currentUser ? <Profile language={language} user={currentUser} suggestions={suggestions} /> : <Login language={language} onLogin={handleLogin} setActiveSection={setActiveSection} />;
      case 'search':
        return searchResults ? <SearchResults language={language} query={searchQuery} results={searchResults} aiResults={aiSearchResults} isAiSearching={isAiSearching} /> : <HomePage language={language} />;
      default:
        return <HomePage language={language} />;
    }
  }, [activeSection, language, currentUser, searchQuery, searchResults, aiSearchResults, isAiSearching, suggestions]);

  const handleBackToHome = () => {
    setActiveSection('home');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="flex flex-col min-h-screen bg-green-50/50">
      <Header
        navItems={NAV_ITEMS}
        activeSection={activeSection}
        setActiveSection={setActiveSection}
        language={language}
        setLanguage={setLanguage}
        currentUser={currentUser}
        onLogout={handleLogout}
        onSearch={handleSearch}
      />
      <main className="flex-grow container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {activeSection !== 'home' && (
          <button
            onClick={handleBackToHome}
            className="mb-6 inline-flex items-center text-gray-500 hover:text-green-600 transition-colors duration-200"
          >
            <ArrowLeftIcon className="h-5 w-5 mr-2" />
            <span className="font-medium">{backButtonTranslations.back[language]}</span>
          </button>
        )}
        {renderSection()}
      </main>
      <Footer language={language} setActiveSection={setActiveSection} />
    </div>
  );
};
