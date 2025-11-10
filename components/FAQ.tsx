import React from 'react';
import type { Language } from '../types';
import { SectionCard } from './SectionCard';

const translations = {
  title: { uz: 'Ko\'p Beriladigan Savollar', ru: 'Часто Задаваемые Вопросы', en: 'Frequently Asked Questions' },
  content: { 
    uz: 'Ko\'p beriladigan savollar va ularning javoblari tez orada bu yerda bo\'ladi.', 
    ru: 'Часто задаваемые вопросы и ответы на них скоро появятся здесь.', 
    en: 'Frequently asked questions and their answers will be here soon.' 
  },
};

export const FAQ: React.FC<{ language: Language }> = ({ language }) => {
  return (
    <SectionCard title={translations.title[language]}>
      <p className="text-gray-600">{translations.content[language]}</p>
    </SectionCard>
  );
};
