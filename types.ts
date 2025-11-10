export type Language = 'uz' | 'ru' | 'en';

export type UserRole = 'scientist' | 'farmer' | 'student' | 'enthusiast' | 'admin' | 'entrepreneur';

export interface User {
  firstName: string;
  lastName: string;
  role: UserRole;
  phone?: string;
  email: string;
}

export type NavItemId =
  | 'home'
  | 'sectors'
  | 'technologies'
  | 'statistics'
  | 'legislation'
  | 'education'
  | 'news'
  | 'suggestions'
  | 'aboutPlatform'
  | 'team'
  | 'careers'
  | 'contact'
  | 'faq'
  | 'privacy'
  | 'terms'
  | 'login'
  | 'register'
  | 'profile'
  | 'search';

export type LocalizedString = Record<Language, string>;

export interface NavItem {
  id: NavItemId;
  label: LocalizedString;
}

// Data structure types for search
export interface SectorData {
  name: LocalizedString;
  description: LocalizedString;
  subSectors: LocalizedString[];
}

export interface TechData {
  name: LocalizedString;
  description: LocalizedString;
  application: LocalizedString;
  link?: string;
}

export interface DocData {
  type: LocalizedString;
  name: LocalizedString;
  date: LocalizedString;
  description: LocalizedString;
  link?: string;
}

export interface NewsData {
  title: LocalizedString;
  category: LocalizedString;
  description: LocalizedString;
  updateTime: LocalizedString;
}

export interface SearchResults {
  sectors: SectorData[];
  technologies: TechData[];
  legislation: DocData[];
  news: NewsData[];
}

// Types for AI search results
export interface GroundingChunk {
  web: {
    uri: string;
    title: string;
  };
}

export interface AiSearchResult {
  text: string;
  sources: GroundingChunk[];
}

// Type for AI-enhanced sector data
export interface EnhancedSectorData extends SectorData {
  aiContent: AiSearchResult | null;
}

// Type for User Suggestions
export interface Suggestion {
  name: string;
  email: string;
  message: string;
  timestamp: Date;
}

// Type for dynamic news articles from AI
export interface DynamicNewsArticle {
  title: string;
  summary: string;
  sourceUrl: string;
  publicationDate: string;
}