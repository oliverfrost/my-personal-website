export interface PersonalInfo {
  name: string;
  location: string;
  phone: string;
  phoneHref: string;
  email: string;
  linkedinLabel: string;
  linkedinUrl: string;
}

export const personalInfo: PersonalInfo = {
  name: 'Serhii Kholodnyi',
  location: 'Tallinn, Estonia',
  phone: '+372 5190 0494',
  phoneHref: 'tel:+37251900494',
  email: 'serg.holodny@gmail.com',
  linkedinLabel: 'linkedin.com/in/serhii-kholodnyi',
  linkedinUrl: 'https://www.linkedin.com/in/serhii-kholodnyi',
};
