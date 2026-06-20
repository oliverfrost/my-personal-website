import type { Messages } from '@/lib/i18n/messages';

export interface LanguageProficiency {
  nameKey: keyof Messages['languageNames'];
  level: string;
}

export const languageProficiencies: LanguageProficiency[] = [
  { nameKey: 'english', level: 'C1' },
  { nameKey: 'ukrainian', level: 'C2' },
  { nameKey: 'russian', level: 'C2' },
  { nameKey: 'spanish', level: 'B1' },
  { nameKey: 'german', level: 'A1' },
];
