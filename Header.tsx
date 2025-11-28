import React, { useState } from 'react';
import type { Language, NavItem, NavItemId, User } from '../types';
import { LeafIcon, GlobeIcon, UserCircleIcon, LogoutIcon, LoginIcon, UserAddIcon, MenuIcon, XIcon, SearchIcon } from './IconComponents';

interface HeaderProps {
  navItems: NavItem[];
  activeSection: NavItemId;
  setActiveSection: (section: NavItemId) => void;
  language: Language;
  setLanguage: (language: Language) => void;
  currentUser: User | null;
  onLogout: () => void;
  onSearch: (query: string) => void;
}

const authTranslations = {
  login: { uz: 'Kirish', ru: 'Вход', en: 'Login' },
  register: { uz: 'Ro\'yxatdan o\'tish', ru: 'Регистрация', en: 'Register' },
  profile: { uz: 'Profil', ru: 'Профиль', en: 'Profile' },
  logout: { uz: 'Chiqish', ru: 'Выйти', en: 'Logout' },
  welcome: { uz: 'Xush kelibsiz', ru: 'Добро пожаловать', en: 'Welcome' },
};

const searchTranslations = {
  search: { uz: 'Qidirish', ru: 'Поиск', en: 'Search' },
  placeholder: { uz: 'Sayt bo\'ylab qidirish...', ru: 'Поиск по сайту...', en: 'Search the site...' },
};

const languages: { code: Language; name: string }[] = [
    { code: 'uz', name: 'O\'zbekcha' },
    { code: 'ru', name: 'Русский' },
    { code: 'en', name: 'English' },
];

export const Header: React.FC<HeaderProps> = ({ navItems, activeSection, setActiveSection, language, setLanguage, currentUser, onLogout, onSearch }) => {
  const [isLangDropdownOpen, setIsLangDropdownOpen] = useState(false);
  const [isUserDropdownOpen, setIsUserDropdownOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [localQuery, setLocalQuery] = useState('');

  const handleLanguageChange = (lang: Language) => {
    setLanguage(lang);
    setIsLangDropdownOpen(false);
  };
  
  const handleNavClick = (id: NavItemId) => {
    setActiveSection(id);
    setIsUserDropdownOpen(false);
    setIsMobileMenuOpen(false);
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (localQuery.trim()) {
      onSearch(localQuery.trim());
      setIsSearchOpen(false);
      setLocalQuery('');
    }
  };

  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center h-20">
          {isSearchOpen ? (
            <form onSubmit={handleSearchSubmit} className="flex items-center w-full gap-2 transition-all duration-300">
              <input
                type="search"
                value={localQuery}
                onChange={(e) => setLocalQuery(e.target.value)}
                placeholder={searchTranslations.placeholder[language]}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 bg-white"
                autoFocus
              />
              <button type="submit" className="p-2.5 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">
                <SearchIcon className="h-5 w-5" />
              </button>
              <button type="button" onClick={() => setIsSearchOpen(false)} className="p-2 text-gray-600 rounded-lg hover:bg-gray-100 transition-colors">
                <XIcon className="h-6 w-6" />
              </button>
            </form>
          ) : (
            <div className="flex items-center justify-between w-full">
              <div className="flex items-center space-x-2 sm:space-x-4">
                <div className="flex-shrink-0 flex items-center space-x-3 cursor-pointer" onClick={() => setActiveSection('home')}>
                  <LeafIcon className="h-10 w-10 text-green-600" />
                  <span className="text-2xl font-bold text-green-800 hidden sm:block">AgroUnion</span>
                </div>
                <button
                  onClick={() => setIsSearchOpen(true)}
                  className="p-2 rounded-full text-gray-600 hover:bg-gray-100 transition"
                  aria-label={searchTranslations.search[language]}
                >
                  <SearchIcon className="h-6 w-6" />
                </button>
              </div>
          
              {/* Desktop Navigation & Controls */}
              <div className="hidden lg:flex items-center space-x-6">
                <nav className="flex items-center space-x-6">
                  {navItems.map((item) => (
                    <a
                      key={item.id}
                      href="#"
                      onClick={(e) => { e.preventDefault(); handleNavClick(item.id); }}
                      className={`text-base font-medium transition duration-150 ease-in-out pb-1 whitespace-nowrap ${
                        activeSection === item.id 
                          ? 'text-green-600 border-b-2 border-green-600' 
                          : 'text-gray-600 hover:text-green-600'
                      }`}
                    >
                      {item.label[language]}
                    </a>
                  ))}
                </nav>

                <div className="w-px h-6 bg-gray-200"></div>

                <div className="flex items-center space-x-4">
                  {currentUser ? (
                    <div className="relative">
                      <button 
                        onClick={() => setIsUserDropdownOpen(!isUserDropdownOpen)}
                        className="flex items-center space-x-2 p-2 rounded-full hover:bg-gray-100 transition"
                      >
                        <span className="font-medium text-gray-700">{currentUser.firstName}</span>
                        <UserCircleIcon className="h-7 w-7 text-gray-600" />
                      </button>
                      {isUserDropdownOpen && (
                          <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1">
                            <div className="px-4 py-2 text-sm text-gray-500">
                                {authTranslations.welcome[language]},<br/>
                                <span className="font-semibold text-gray-800">{currentUser.firstName} {currentUser.lastName}</span>
                            </div>
                            <div className="border-t border-gray-100"></div>
                            <a
                                href="#"
                                onClick={(e) => { e.preventDefault(); handleNavClick('profile'); }}
                                className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                              >
                                <UserCircleIcon className="h-5 w-5 mr-2" />
                                {authTranslations.profile[language]}
                              </a>
                              <a
                                href="#"
                                onClick={(e) => { e.preventDefault(); onLogout(); setIsUserDropdownOpen(false); }}
                                className="flex items-center px-4 py-2 text-sm text-red-600 hover:bg-red-50"
                              >
                                <LogoutIcon className="h-5 w-5 mr-2"/>
                                {authTranslations.logout[language]}
                              </a>
                          </div>
                        )}
                    </div>
                  ) : (
                    <div className="flex items-center space-x-2">
                      <button onClick={() => setActiveSection('login')} className="px-4 py-2 text-sm font-medium text-green-600 border border-green-600 rounded-full hover:bg-green-50 transition whitespace-nowrap">
                        {authTranslations.login[language]}
                      </button>
                      <button onClick={() => setActiveSection('register')} className="px-4 py-2 text-sm font-medium text-white bg-green-600 rounded-full hover:bg-green-700 transition whitespace-nowrap">
                        {authTranslations.register[language]}
                      </button>
                    </div>
                  )}
                  
                  <div className="relative">
                    <button
                      onClick={() => setIsLangDropdownOpen(!isLangDropdownOpen)}
                      className="flex items-center p-2 rounded-full hover:bg-gray-100 transition"
                    >
                      <GlobeIcon className="h-6 w-6 text-gray-600" />
                    </button>
                    {isLangDropdownOpen && (
                      <div className="absolute right-0 mt-2 w-36 bg-white rounded-md shadow-lg py-1">
                        {languages.map(lang => (
                          <a
                            key={lang.code}
                            href="#"
                            onClick={(e) => { e.preventDefault(); handleLanguageChange(lang.code); }}
                            className={`block px-4 py-2 text-sm ${language === lang.code ? 'font-bold text-green-600 bg-green-50' : 'text-gray-700 hover:bg-gray-100'}`}
                          >
                            {lang.name}
                          </a>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>
              
              {/* Mobile Menu Button */}
              <div className="lg:hidden">
                <button
                    onClick={() => setIsMobileMenuOpen(true)}
                    className="p-2 rounded-md text-gray-600 hover:text-gray-900 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-green-500"
                    aria-label="Open menu"
                >
                    <MenuIcon className="h-6 w-6" />
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Mobile Menu Panel */}
      {isMobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 z-50 overflow-hidden" role="dialog" aria-modal="true">
            <div className="absolute inset-0 bg-black bg-opacity-25" aria-hidden="true" onClick={() => setIsMobileMenuOpen(false)}></div>
            <div className="fixed inset-y-0 right-0 w-full max-w-sm bg-white shadow-xl flex flex-col">
                <div className="flex items-center justify-between p-4 border-b">
                     <span className="text-xl font-bold text-green-800">Menyu</span>
                     <button 
                        onClick={() => setIsMobileMenuOpen(false)}
                        className="p-2 rounded-md text-gray-600 hover:text-gray-900 hover:bg-gray-100"
                        aria-label="Close menu"
                    >
                        <XIcon className="h-6 w-6" />
                     </button>
                </div>
                
                <div className="flex-1 overflow-y-auto">
                    <nav className="px-2 py-4 space-y-1">
                        {navItems.map((item) => (
                           <a
                                key={item.id}
                                href="#"
                                onClick={(e) => { e.preventDefault(); handleNavClick(item.id); }}
                                className={`block px-3 py-2 rounded-md text-base font-medium ${
                                    activeSection === item.id 
                                    ? 'bg-green-100 text-green-700' 
                                    : 'text-gray-700 hover:bg-gray-100 hover:text-gray-900'
                                }`}
                            >
                               {item.label[language]}
                           </a>
                        ))}
                    </nav>

                    <div className="border-t border-gray-200 px-2 py-4">
                        {currentUser ? (
                            <div className="space-y-2">
                                <div className="px-3 py-2">
                                    <p className="text-sm text-gray-500">{authTranslations.welcome[language]},</p>
                                    <p className="font-semibold text-gray-800">{currentUser.firstName} {currentUser.lastName}</p>
                                </div>
                                <a href="#" onClick={(e) => { e.preventDefault(); handleNavClick('profile'); }} className="flex items-center px-3 py-2 text-base font-medium text-gray-700 rounded-md hover:bg-gray-100">
                                    <UserCircleIcon className="h-6 w-6 mr-3" />
                                    {authTranslations.profile[language]}
                                </a>
                                <a href="#" onClick={(e) => { e.preventDefault(); onLogout(); setIsMobileMenuOpen(false); }} className="flex items-center px-3 py-2 text-base font-medium text-red-600 rounded-md hover:bg-red-50">
                                    <LogoutIcon className="h-6 w-6 mr-3"/>
                                    {authTranslations.logout[language]}
                                </a>
                            </div>
                        ) : (
                            <div className="space-y-2">
                                <a href="#" onClick={(e) => { e.preventDefault(); handleNavClick('login'); }} className="flex items-center px-3 py-2 text-base font-medium text-gray-700 rounded-md hover:bg-gray-100">
                                    <LoginIcon className="h-6 w-6 mr-3" />
                                    {authTranslations.login[language]}
                                </a>
                                <a href="#" onClick={(e) => { e.preventDefault(); handleNavClick('register'); }} className="flex items-center px-3 py-2 text-base font-medium text-gray-700 rounded-md hover:bg-gray-100">
                                    <UserAddIcon className="h-6 w-6 mr-3" />
                                    {authTranslations.register[language]}
                                </a>
                            </div>
                        )}
                    </div>
                    
                    <div className="border-t border-gray-200 px-2 py-4">
                        <p className="px-3 text-sm font-semibold text-gray-500 mb-2">Til / Язык / Language</p>
                        <div className="space-y-1">
                            {languages.map(lang => (
                                <a
                                    key={lang.code}
                                    href="#"
                                    onClick={(e) => { e.preventDefault(); handleLanguageChange(lang.code); }}
                                    className={`flex items-center px-3 py-2 text-base font-medium rounded-md ${language === lang.code ? 'font-bold text-green-600 bg-green-50' : 'text-gray-700 hover:bg-gray-100'}`}
                                >
                                    {lang.name}
                                </a>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
      )}
    </header>
  );
};