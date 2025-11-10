import React from 'react';
import type { Language } from '../types';
import { SectionCard } from './SectionCard';

const translations = {
  title: { uz: 'Maxfiylik Siyosati', ru: 'Политика Конфиденциальности', en: 'Privacy Policy' },
  content: { 
    uz: 'Maxfiylik siyosati matni tez orada joylashtiriladi.', 
    ru: 'Текст политики конфиденциальности будет добавлен в ближайшее время.', 
    en: 'The text of the privacy policy will be added soon.' 
  },
};

export const PrivacyPolicy: React.FC<{ language: Language }> = ({ language }) => {
  return (
    <SectionCard title={translations.title[language]}>
      <p className="text-gray-600">{translations.content[language]}</p>
    </SectionCard>
  );
};
