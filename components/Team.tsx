import React from 'react';
import type { Language } from '../types';
import { SectionCard } from './SectionCard';

const translations = {
  title: { uz: 'Jamoa', ru: 'Команда', en: 'Team' },
  content: { 
    uz: 'Bizning jamoamiz haqidagi ma\'lumotlar tez orada joylashtiriladi.', 
    ru: 'Информация о нашей команде будет добавлена в ближайшее время.', 
    en: 'Information about our team will be added soon.' 
  },
};

export const Team: React.FC<{ language: Language }> = ({ language }) => {
  return (
    <SectionCard title={translations.title[language]}>
      <p className="text-gray-600">{translations.content[language]}</p>
    </SectionCard>
  );
};
