import React from 'react';
import Image from 'next/image'
import  StackOverflowIcon  from './icons/stackoverflow';

export default function Summary() {
  return <section className="p-4 bg-navy-blue">
    <h1 className="text-3xl font-bold uppercase text-white">Serhii Kholodnyi</h1>

    <span className='block text-white'>Team Lead</span>
    <span className='block text-white'>Senior Full-Stack Developer</span>

    <ul className="flex flex-row gap-4 list-none p-0">
      <li>
        <a href="https://www.linkedin.com/in/serhii-kholodnyi" target="_blank">
        <Image className="text-white" src="/linkedin.svg" alt="LinkedIn" width="32" height="32" />
        </a>
      </li>
      <li>
        <a href="https://stackoverflow.com/users/4520707/oliverfrost21">
        {/* <Image src="/stackoverflow.svg" alt="StackOverflow" width="32" height="32" /> */}
        <StackOverflowIcon className="light" />
        </a>
      </li>
      <li>
        <a href=""></a>
        <Image src="/github.svg" alt="GitHub" width="32" height="32" />
      </li>
      <li>
        <a href=""></a>
        <Image src="/leetcode.svg" alt="LeetCode" width="32" height="32" />
      </li>
    </ul>

  </section>;
}
