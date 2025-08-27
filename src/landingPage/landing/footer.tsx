 

import { useState, useEffect } from 'react';
import { Twitter, Github, Linkedin } from 'lucide-react';
import { Logo } from './logo';
import { Link } from 'react-router-dom';

export function Footer() {
  const [currentYear, setCurrentYear] = useState<number | null>(null);

  useEffect(() => {
    setCurrentYear(new Date().getFullYear());
  }, []);

  const socialLinks = [
    { name: 'Twitter', icon: <Twitter className="h-6 w-6" />, href: '#' },
    { name: 'GitHub', icon: <Github className="h-6 w-6" />, href: '#' },
    { name: 'LinkedIn', icon: <Linkedin className="h-6 w-6" />, href: '#' },
  ];

  const footerNav = [
    {
      title: 'Product',
      links: [
        { name: 'Features', href: '#features' },
        { name: 'Pricing', href: '#pricing' },
        { name: 'Contact', href: '#contact' },
      ],
    },
    {
      title: 'Company',
      links: [
        { name: 'About Us', href: '#' },
        { name: 'Careers', href: '#' },
        { name: 'Blog', href: '#' },
      ],
    },
    {
      title: 'Legal',
      links: [
        { name: 'Privacy Policy', href: '#' },
        { name: 'Terms of Service', href: '#' },
      ],
    },
  ];

  return (
    <footer className="relative z-10 mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8 my-8">
      <div className="rounded-2xl border border-gray-200 bg-white/95 p-8 shadow-lg backdrop-blur-sm supports-[backdrop-filter]:bg-white/60">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
          <div className="lg:col-span-4 xl:col-span-5">
            <Logo />
            <p className="mt-4 text-base text-gray-600">
              The smart way to manage your tasks and elevate your productivity.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-8 md:grid-cols-3 lg:col-span-8 xl:col-span-7">
            {footerNav.map((section) => (
              <div key={section.title}>
                <h3 className="text-sm font-semibold uppercase tracking-wider text-gray-600">
                  {section.title}
                </h3>
                <ul className="mt-4 space-y-4">
                  {section.links.map((link) => (
                    <li key={link.name}>
                      <Link to={link.href} className="text-base text-gray-600 hover:text-primary-50">
                        {link.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
        
        <div className="mt-12 border-t border-gray-200 pt-8 flex flex-col items-center gap-6 sm:flex-row sm:justify-between">
          <div className="flex space-x-6">
              {socialLinks.map((item) => (
                <a key={item.name} href={item.href} className="text-gray-600 hover:text-primary-50">
                  <span className="sr-only">{item.name}</span>
                  {item.icon}
                </a>
              ))}
            </div>
          <p className="text-base text-gray-600">
            &copy; {currentYear ?? new Date().getFullYear()} TaskAway, Inc. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
