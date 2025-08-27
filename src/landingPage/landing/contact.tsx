import { Link } from 'react-router-dom';
import { Button } from '../ui/button';
import { ArrowRight } from 'lucide-react';


export function Contact() {
  return (
    <section id="contact" className="bg-gray-50">
      <div className="container mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
        <div className="relative overflow-hidden rounded-2xl bg-primary-50 shadow-xl">
          <img
            src="/assets/Started.png"
            alt="Team collaborating"
            className="absolute inset-0"
          />
          <div className="absolute inset-0 bg-primary-50" />
          <div className="relative p-12 sm:p-20">
            <div className="text-center">
              <h2 className="font-headline text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
                Ready to take control?
              </h2>
              <p className="mx-auto mt-4 max-w-2xl text-lg text-white/80">
                Join thousands of productive teams and individuals. Start for free, no credit card required.
              </p>
            </div>
            <div className="mt-8 flex justify-center">
              <Button size="lg" variant="outline" className="bg-white text-primary-50 hover:bg-gray-100 hover:text-primary-50 border-white" asChild>
                <Link to="#pricing">
                  Get Started Now <ArrowRight className="ml-2" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
