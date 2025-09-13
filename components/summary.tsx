import React from 'react';
import StackOverflowIcon  from './icons/stackoverflow';
import LinkedInIcon from './icons/linkedin';
import GithubIcon from './icons/github';
import LeetCodeIcon from './icons/leetcode';

export default function Summary({ className }: { className?: string }) {
  return <section className={`p-4 bg-navy-blue ${className || ''}`}>
    <h1 className="mb-4 text-3xl font-bold uppercase text-white">Serhii Kholodnyi</h1>

    <span className='block text-white'>Team Lead</span>
    <span className='mb-4 block text-white'>Senior Full-Stack Developer</span>

    <ul className="flex flex-row gap-4 justify-between list-none p-0">
      <li>
        <a href="https://www.linkedin.com/in/serhii-kholodnyi" target="_blank">
        <LinkedInIcon variant="light" />
        </a>
      </li>
      <li>
        <a href="https://stackoverflow.com/users/4520707/oliverfrost21" target="_blank">
        <StackOverflowIcon variant="light" />
        </a>
      </li>
      <li>
        <a href="https://github.com/oliverfrost" target="_blank">
        <GithubIcon variant="light" />
        </a>
      </li>
      <li>
        <a href="https://leetcode.com/u/oliverfrost21/" target="_blank">
        <LeetCodeIcon variant="light" />
        </a>
      </li>
    </ul>

  </section>;
}
