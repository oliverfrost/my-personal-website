import type { Messages } from '@/lib/i18n/messages';

export type DomainId = keyof Messages['domains'];

export const domainExpertise: DomainId[] = [
  'finance',
  'insurance',
  'healthcare',
  'socialNetworks',
  'education',
  'seo',
  'computerNetworks',
];
