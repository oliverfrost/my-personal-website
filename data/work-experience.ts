export interface WorkExperienceEntry {
  dateRange: string;
  company: string;
  role: string;
  responsibilities: string[];
}

export const workExperience: WorkExperienceEntry[] = [
  {
    dateRange: 'November 2021 - Present',
    company: 'TurnKey Labs',
    role: 'Senior Frontend Engineer / Team Lead',
    responsibilities: [
      'Leading a frontend team on multiple client-facing projects',
      'Designing scalable frontend architecture',
      'Performing code reviews, mentoring developers',
      'Coordinating closely with designers and product managers',
    ],
  },
  {
    dateRange: 'September 2018 - November 2021',
    company: 'DataArt',
    role: 'Senior Frontend Engineer / Team Lead',
    responsibilities: [
      'Frontend architecture design and implementation',
      'Leading cross-functional frontend teams',
      'Integrating with RESTful APIs and backend services',
      'Code quality control, test automation',
    ],
  },
  {
    dateRange: 'September 2017 - September 2018',
    company: 'DataArt',
    role: 'Frontend Engineer / Team Lead',
    responsibilities: [
      'Built and maintained client-side components',
      'Managed small team and sprint planning',
      'Participated in product decision-making and UI optimization',
    ],
  },
  {
    dateRange: 'January 2017 - September 2017',
    company: 'EOS Data Analytics (EOSDA)',
    role: 'Frontend Engineer',
    responsibilities: [
      'Developed and maintained multiple GIS-related frontend apps',
      'Wrote unit and end-to-end tests',
      'Performed code reviews and acted as Scrum Master',
    ],
  },
  {
    dateRange: 'July 2014 - January 2017',
    company: 'Ciklum',
    role: 'Quality Assurance Automation Engineer',
    responsibilities: [
      'Created E2E and API tests (Protractor, Appium, Java, Selenium)',
      'Migrated codebases from ES5 → ES6 → TypeScript',
      'Managed CI/CD pipelines, led QA teams, participated in BDD adoption',
      'Developed iOS UI tests using Swift & Xcode UI Test',
    ],
  },
  {
    dateRange: 'July 2013 - July 2014',
    company: 'Cupid plc',
    role: 'Quality Assurance Engineer',
    responsibilities: [
      'QA for multiple dating platforms (web, mobile, social widgets)',
      'Focused on payment system integrations and UI/UX testing',
      'Developed automation test suites using Selenium',
      'Mentored junior QA engineers',
    ],
  },
];
