import type { Messages } from '@/lib/i18n/messages';

export type HobbyId = keyof Messages['hobbies'];

export const hobbies: HobbyId[] = [
  'technologiesComputers',
  'softwareArchitecture',
  'booksReading',
  'investing',
  'startups',
  'businessStrategy',
  'travel',
  'triathlon',
  'biohacking',
];
