import { Button } from '../ui/button';
import { ArrowRight } from 'lucide-react';
import {Link} from 'react-router-dom'

export function Hero() {
  return (
    <section className="relative bg-cover bg-center bg-no-repeat" style={{ backgroundImage: "url('/assets/Landing.png')" }}>
      {/* <div className="absolute inset-0 bg-black/50" /> */}
      <div className="relative z-10 container mx-auto max-w-7xl px-4 py-20 text-center sm:px-6 sm:py-24 lg:py-32 lg:px-8">
        <h1 className="font-headline text-4xl font-extrabold tracking-tight text-primary-50 dark:text-white sm:text-5xl md:text-6xl lg:text-7xl">
          <span className="block">Manage Your Tasks,</span>
          <span className="block text-primary-50">Not Your Time</span>
        </h1>
        <p className="mx-auto mt-6 max-w-lg text-lg text-gray-600 sm:max-w-3xl md:text-xl">
          TaskAway streamlines your workflow and enhances collaboration. Focus on what truly matters.
        </p>
        <div className="mx-auto mt-10 max-w-sm sm:flex sm:max-w-none sm:justify-center">
          <Button size="lg" asChild className="bg-primary-50 hover:bg-primary-50/90 text-white">
            <Link to="/signup">
              Get Started Free <ArrowRight className="ml-2" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
