export interface SocialLink {
  id:
    | 'linkedin'
    | 'stackoverflow'
    | 'github'
    | 'leetcode'
    | 'facebook'
    | 'instagram';
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
  { id: 'facebook', url: 'https://www.facebook.com/oliverfrost21' },
  { id: 'instagram', url: 'https://www.instagram.com/oliverfrost21' },
];
