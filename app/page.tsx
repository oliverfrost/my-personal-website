import PersonalInformation from '@/components/personal-information';
import Languages from '@/components/languages';
import HardSkills from '@/components/hard-skills';
import Skills from '@/components/skills';
import WorkExperience from '@/components/work-experience';
import Education from '@/components/education';
import Greeting from '@/components/greeting';
import Summary from '@/components/summary';
import DomainExpertise from '@/components/domain-expertise';
import Hobbies from '@/components/hobbies';
import ContactForm from '@/components/contact-form';
import Portfolio from '@/components/portfolio';
import FullSizeThemeSwitcher from '@/components/full-size-theme-switcher';
import LanguageSwitcher from '@/components/language-switcher';
import SimpleSwitcher from '@/components/simple-switcher';
import { features } from '@/lib/features';

export default function Home() {
  return (
    <main className="mx-auto w-full max-w-[1600px] p-4 lg:flex lg:gap-14">
      {/* Summary: top card on mobile, left sidebar on desktop */}
      <div className="mb-4 lg:mb-0 lg:w-1/3">
        {/* Mobile-only language + theme switchers sit inside the navy card */}
        <div className="bg-surface text-surface-foreground flex items-center justify-end gap-4 p-4 pb-0 lg:hidden">
          <LanguageSwitcher />
          <SimpleSwitcher onSurface />
        </div>
        <Summary />
      </div>

      <div className="flex flex-col gap-4 lg:w-2/3 lg:gap-8">
        {/* Desktop-only top bar */}
        <div className="hidden lg:mb-2 lg:flex lg:items-center lg:justify-end lg:gap-4">
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
        <Hobbies />
        {features.portfolio && <Portfolio />}
        <ContactForm />
      </div>
    </main>
  );
}
