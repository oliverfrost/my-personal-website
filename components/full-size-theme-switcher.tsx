import React from 'react';
import SimpleSwitcher from './simple-switcher';
import MoonIcon from './icons/moon-icon';
import SunIcon from './icons/sun-icon';

export default function FullSizeThemeSwitcher() {
    return (
        <div className="w-[320px] flex justify-between">
            <div className="flex items-center">
                <MoonIcon variant='dark' />
                <span className="ml-1">Dark theme</span>
            </div>
            <SimpleSwitcher />
            <div className="flex items-center">
                <SunIcon variant='dark' />
                <span className="ml-1">Light theme</span>
            </div>
        </div>
    );
}