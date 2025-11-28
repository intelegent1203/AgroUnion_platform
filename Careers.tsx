import React from 'react';
import type { Language } from '../types';
import { SectionCard } from './SectionCard';

const translations = {
  title: { uz: 'Karyera', ru: 'Карьера', en: 'Careers' },
  content: { 
    uz: 'Ochiq ish o\'rinlari haqidagi ma\'lumotlar tez orada joylashtiriladi.', 
    ru: 'Информация об открытых вакансиях будет добавлена в ближайшее время.', 
    en: 'Information about open vacancies will be added soon.' 
  },
};

export const Careers: React.FC<{ language: Language }> = ({ language }) => {
  return (
    <SectionCard title={translations.title[language]}>
      <p className="text-gray-600">{translations.content[language]}</p>
    </SectionCard>
  );
};
