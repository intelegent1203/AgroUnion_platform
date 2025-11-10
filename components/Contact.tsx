import React from 'react';
import type { Language } from '../types';
import { SectionCard } from './SectionCard';

const translations = {
  title: { uz: 'Aloqa', ru: 'Контакты', en: 'Contact' },
  content: { 
    uz: 'Biz bilan bog\'lanish ma\'lumotlari tez orada joylashtiriladi.', 
    ru: 'Контактная информация будет добавлена в ближайшее время.', 
    en: 'Contact information will be added soon.' 
  },
};

export const Contact: React.FC<{ language: Language }> = ({ language }) => {
  return (
    <SectionCard title={translations.title[language]}>
      <p className="text-gray-600">{translations.content[language]}</p>
    </SectionCard>
  );
};
