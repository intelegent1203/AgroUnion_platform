import React from 'react';
import type { Language, NavItemId } from '../types';
import { LeafIcon, TwitterIcon, FacebookIcon, InstagramIcon } from './IconComponents';

interface FooterProps {
  language: Language;
  setActiveSection: (section: NavItemId) => void;
}

const translations = {
  about: {
    uz: 'Biz haqimizda',
    ru: 'О нас',
    en: 'About Us',
  },
  contact: {
    uz: 'Aloqa',
    ru: 'Контакты',
    en: 'Contact',
  },
  privacy: {
    uz: 'Maxfiylik siyosati',
    ru: 'Политика конфиденциальности',
    en: 'Privacy Policy',
  },
  terms: {
    uz: 'Foydalanish shartlari',
    ru: 'Условия использования',
    en: 'Terms of Use',
  },
  rights: {
    uz: 'Barcha huquqlar himoyalangan.',
    ru: 'Все права защищены.',
    en: 'All rights reserved.',
  }
};

export const Footer: React.FC<FooterProps> = ({ language, setActiveSection }) => {
  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, section: NavItemId) => {
    e.preventDefault();
    setActiveSection(section);
    window.scrollTo(0, 0);
  };
  
  return (
    <footer className="bg-white border-t mt-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-1">
            <div className="flex items-center space-x-2">
              <LeafIcon className="h-8 w-8 text-green-600" />
              <span className="text-xl font-bold text-green-800">AgroUnion</span>
            </div>
            <p className="mt-4 text-gray-500 text-sm">
              Qishloq xo'jaligi sohasidagi bilimlarni tizimlashtirish va tajriba almashish platformasi.
            </p>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-gray-400 tracking-wider uppercase">{translations.about[language]}</h3>
            <ul className="mt-4 space-y-4">
              <li><a href="#" onClick={(e) => handleNavClick(e, 'aboutPlatform')} className="text-base text-gray-500 hover:text-gray-900">Platforma</a></li>
              <li><a href="#" onClick={(e) => handleNavClick(e, 'team')} className="text-base text-gray-500 hover:text-gray-900">Jamoa</a></li>
              <li><a href="#" onClick={(e) => handleNavClick(e, 'careers')} className="text-base text-gray-500 hover:text-gray-900">Karyera</a></li>
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-gray-400 tracking-wider uppercase">Support</h3>
            <ul className="mt-4 space-y-4">
              <li><a href="#" onClick={(e) => handleNavClick(e, 'contact')} className="text-base text-gray-500 hover:text-gray-900">{translations.contact[language]}</a></li>
              <li><a href="#" onClick={(e) => handleNavClick(e, 'faq')} className="text-base text-gray-500 hover:text-gray-900">FAQ</a></li>
              <li><a href="#" onClick={(e) => handleNavClick(e, 'privacy')} className="text-base text-gray-500 hover:text-gray-900">{translations.privacy[language]}</a></li>
              <li><a href="#" onClick={(e) => handleNavClick(e, 'terms')} className="text-base text-gray-500 hover:text-gray-900">{translations.terms[language]}</a></li>
            </ul>
          </div>
          <div className="flex space-x-6">
            <a href="#" className="text-gray-400 hover:text-gray-500"><TwitterIcon className="h-6 w-6" /></a>
            <a href="#" className="text-gray-400 hover:text-gray-500"><FacebookIcon className="h-6 w-6" /></a>
            <a href="#" className="text-gray-400 hover:text-gray-500"><InstagramIcon className="h-6 w-6" /></a>
          </div>
        </div>
        <div className="mt-12 border-t border-gray-200 pt-8">
          <p className="text-base text-gray-400 text-center">&copy; {new Date().getFullYear()} AgroUnion. {translations.rights[language]}</p>
        </div>
      </div>
    </footer>
  );
};
