import React from 'react';
import type { Language } from '../types';
import { SectionCard } from './SectionCard';

const translations = {
  title: { uz: 'Foydalanish Shartlari', ru: 'Условия Использования', en: 'Terms of Use' },
  content: { 
    uz: 'Foydalanish shartlari matni tez orada joylashtiriladi.', 
    ru: 'Текст условий использования будет добавлен в ближайшее время.', 
    en: 'The text of the terms of use will be added soon.' 
  },
};

export const TermsOfUse: React.FC<{ language: Language }> = ({ language }) => {
  return (
    <SectionCard title={translations.title[language]}>
      <p className="text-gray-600">{translations.content[language]}</p>
    </SectionCard>
  );
};
