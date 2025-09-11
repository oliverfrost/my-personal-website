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

export default function Home() {
  return (
    <main className='p-4 lg:flex lg:gap-8'>
      <div className="mb-4 lg:mb-0 lg:w-1/3">
        <Summary />
      </div>

      <div className="lg:w-2/3">
        <Greeting />
        <PersonalInformation />
        <Languages />
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
