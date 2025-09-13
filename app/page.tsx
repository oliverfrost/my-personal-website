import PersonalInformation from '../components/personal-information';
import Languages from '../components/languages';
import HardSkills from '@/components/hard-skills';
import Skills from '@/components/skills';
import WorkExperience from '@/components/work-experience';
import Education from '@/components/education';
import Greeting from '@/components/greeting';
import Summary from '@/components/summary';
import DomainExpertise from '@/components/domain-expertise';
import ContactForm from '@/components/contact-form';
import FullSizeThemeSwitcher from '@/components/full-size-theme-switcher';
import LanguageSwitcher from '@/components/language-switcher';

export default function Home() {
  return (
    <main className='w-full p-4 lg:flex lg:gap-14'>
      <div className="mb-4 lg:mb-0 lg:w-1/3">
        <Summary />
      </div>

      <div className="flex flex-col gap-4 lg:w-2/3 lg:gap-8">
        <div className="hidden lg:flex lg:justify-end lg:mb-2 lg:gap-2">
          <LanguageSwitcher />
          <FullSizeThemeSwitcher />
        </div>
        <Greeting />

        <div className="lg:flex lg:gap-4">
          <div className="lg:w-1/2">
            <PersonalInformation />
          </div>
          <div className="lg:w-1/2">
            <Languages />
          </div>
        </div>

        <HardSkills />
        <Skills />
        <WorkExperience />
        <Education />
        <DomainExpertise />
        <ContactForm />
      </div>
    </main>
  );
}
