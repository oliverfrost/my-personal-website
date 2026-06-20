export interface SocialLink {
  id: 'linkedin' | 'stackoverflow' | 'github' | 'leetcode';
  url: string;
}

export const socialLinks: SocialLink[] = [
  { id: 'linkedin', url: 'https://www.linkedin.com/in/serhii-kholodnyi' },
  {
    id: 'stackoverflow',
    url: 'https://stackoverflow.com/users/4520707/oliverfrost21',
  },
  { id: 'github', url: 'https://github.com/oliverfrost' },
  { id: 'leetcode', url: 'https://leetcode.com/u/oliverfrost21/' },
];
