 

import { useState } from 'react';
import { Button } from '../ui/button';
import { Sheet, SheetContent, SheetTrigger } from '../ui/sheet';
import { Menu, ArrowRight } from 'lucide-react';
import { Logo } from './logo';
import {Link} from 'react-router-dom'

export function Header() {
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { href: '#features', label: 'Features' },
    { href: '#pricing', label: 'Plans' },
    { href: '#contact', label: 'Contact' },
  ];

  const NavLinkItems = ({ isMobile = false }) => (
    <>
      {navLinks.map((link) => (
        <Link
          key={link.href}
          to={link.href}
          onClick={() => setIsOpen(false)}
          className={`rounded-lg px-4 py-2 font-medium text-gray-600 transition-colors hover:bg-gray-200 hover:text-primary-50 ${
            isMobile ? 'block w-full text-left text-lg' : ''
          }`}
        >
          {link.label}
        </Link>
      ))}
    </>
  );

  return (
    <header className="sticky top-4 z-50 mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
      <div className="flex h-20 items-center justify-between rounded-2xl border border-gray-200 bg-white/95 px-8 shadow-lg backdrop-blur-sm supports-[backdrop-filter]:bg-white/60">
        <Logo />
        <nav className="hidden items-center gap-2 md:flex">
          <NavLinkItems />
        </nav>
        <div className="flex items-center gap-2">
           <Button variant="ghost" asChild className="hidden md:flex text-gray-600 hover:text-primary-50 hover:bg-gray-200">
            <Link to="/login">
              Sign In
            </Link>
          </Button>
          <Button asChild className="hidden md:flex bg-primary-50 hover:bg-primary-50/90 text-white">
            <Link to="/signup">
              Get Started Free
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
          <div className="md:hidden">
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild>
                <Button variant="outline" size="icon" className="border-gray-200 text-gray-600">
                  <Menu className="h-6 w-6" />
                  <span className="sr-only">Open menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="bg-white">
                 <div className="p-4">
                  <div className="mb-8">
                    <Logo />
                  </div>
                  <div className="flex flex-col items-start gap-y-2">
                    <NavLinkItems isMobile />
                    <div className="mt-6 w-full space-y-2">
                      <Button asChild size="lg" className="w-full bg-primary-50 hover:bg-primary-50/90 text-white">
                        <Link to="#contact" onClick={() => setIsOpen(false)}>
                          Get Started Free
                        </Link>
                      </Button>
                      <Button variant="outline" asChild size="lg" className="w-full border-gray-200 text-gray-600 hover:text-primary-50">
                        <Link to="/login" onClick={() => setIsOpen(false)}>
                          Sign In
                        </Link>
                      </Button>
                    </div>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
}
