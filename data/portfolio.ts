export interface PortfolioProject {
  title: string;
  imageUrl: string | null;
  linkUrl: string;
  about: string;
  technologies: string;
}

export const portfolioProjects: PortfolioProject[] = [
  {
    title: 'BookStream',
    imageUrl: null,
    linkUrl: '#',
    about:
      'BookStream is an online bookstore built with Angular and Angular Universal, featuring server-side rendering and in-browser book streaming for a fast, SEO-friendly reading experience.',
    technologies:
      'Protractor, Selenium WebDriver, JavaScript/TypeScript, Jasmine 2, AngularJS, underscore, NodeJs, TeamCity',
  },
  {
    title: 'Project #2',
    imageUrl: null,
    linkUrl: '#',
    about:
      'Business intelligence platform that lets users join, analyze, and picture out information they require to make better and more intelligent business decisions and craft out workable plans and strategies.',
    technologies:
      'Protractor, Selenium WebDriver, JavaScript/TypeScript, Jasmine 2, AngularJS, underscore, NodeJs, TeamCity',
  },
  {
    title: 'Project #3',
    imageUrl: null,
    linkUrl: '#',
    about:
      'Business intelligence platform that lets users join, analyze, and picture out information they require to make better and more intelligent business decisions and craft out workable plans and strategies.',
    technologies:
      'Protractor, Selenium WebDriver, JavaScript/TypeScript, Jasmine 2, AngularJS, underscore, NodeJs, TeamCity',
  },
  {
    title: 'Project #4',
    imageUrl: null,
    linkUrl: '#',
    about:
      'Business intelligence platform that lets users join, analyze, and picture out information they require to make better and more intelligent business decisions and craft out workable plans and strategies.',
    technologies:
      'Protractor, Selenium WebDriver, JavaScript/TypeScript, Jasmine 2, AngularJS, underscore, NodeJs, TeamCity',
  },
];
