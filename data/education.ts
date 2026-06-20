import type { Messages } from '@/lib/i18n/messages';

export interface EducationEntry {
  period: string;
  university: string;
  degreeKey: keyof Messages['degrees'];
  field: string;
}

export const education: EducationEntry[] = [
  {
    period: '2006 - 2011',
    university: 'Zaporizhzhya National Technical University',
    degreeKey: 'master',
    field: 'INFORMATIONAL COMMUNICATION NETWORKS',
  },
  {
    period: '2008 - 2011',
    university: 'Zaporizhzhya National Technical University',
    degreeKey: 'bachelor',
    field: 'TECHNICAL TRANSLATION (ENGLISH)',
  },
];
