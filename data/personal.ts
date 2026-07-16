export interface PersonalInfo {
  name: string;
  location: string;
  /** Base64-encoded phone number so the plaintext never ships in HTML or the JS bundle; decoded with atob() on user click. */
  phoneEncoded: string;
  email: string;
  linkedinLabel: string;
  linkedinUrl: string;
}

export const personalInfo: PersonalInfo = {
  name: 'Serhii Kholodnyi',
  location: 'Barcelona, Spain',
  phoneEncoded: 'KzM0IDYxMyA0NjggNzc1',
  email: 'serg.holodny@gmail.com',
  linkedinLabel: 'linkedin.com/in/serhii-kholodnyi',
  linkedinUrl: 'https://www.linkedin.com/in/serhii-kholodnyi',
};
