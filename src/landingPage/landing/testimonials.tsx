import { Card, CardContent } from '../ui/card';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '../ui/carousel';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { Star } from 'lucide-react';

const testimonials = [
  {
    quote:
      'TaskAway has revolutionized how our team manages projects. The AI credit allocation is a game-changer for balancing workloads!',
    name: 'Sarah L.',
    title: 'Project Manager, TechCorp',
    avatar: 'https://placehold.co/100x100.png',
  },
  {
    quote:
      "I've tried every task manager out there, and nothing comes close to the simplicity and power of TaskAway. The interface is beautiful and intuitive.",
    name: 'Mike R.',
    title: 'Freelance Developer',
    avatar: 'https://placehold.co/100x100.png',
  },
  {
    quote:
      'The color-coded statuses and clean layout help me stay organized and focused. I can finally see all my tasks at a glance.',
    name: 'Jessica M.',
    title: 'Marketing Director, InnovateCo',
    avatar: 'https://placehold.co/100x100.png',
  },
  {
    quote:
      'As a student, TaskAway helps me keep track of all my assignments and deadlines. It\'s simple, effective, and the free plan is perfect for me.',
    name: 'David C.',
    title: 'University Student',
    avatar: 'https://placehold.co/100x100.png',
  },
];

export function Testimonials() {
  return (
    <section
      id="testimonials"
      className="relative bg-cover bg-center bg-no-repeat py-20 sm:py-24 lg:py-32"
      style={{ backgroundImage: "url('/assets/Review.png')" }}
    >
      <div className="absolute inset-0 bg-black/60" />
      <div className="relative z-10 container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="font-headline text-3xl font-extrabold text-white sm:text-4xl">
            Loved by Teams and Individuals
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-white/90">
            Don't just take our word for it. Here's what our users have to say.
          </p>
        </div>
        <Carousel
          opts={{
            align: 'start',
            loop: true,
          }}
          className="relative mt-16"
        >
          <CarouselContent>
            {testimonials.map((testimonial, index) => (
              <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
                <div className="p-4 h-full">
                  <Card className="flex flex-col h-full bg-white/80 backdrop-blur-sm border-white/20 shadow-xl transition-all duration-300 ease-in-out hover:bg-white/90 hover:scale-105">
                    <CardContent className="flex flex-col flex-grow p-6">
                      <div className="flex-grow">
                        <div className="flex pb-4">
                          {[...Array(5)].map((_, i) => (
                            <Star key={i} className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                          ))}
                        </div>
                        <blockquote className="text-lg font-medium text-primary-50">
                          "{testimonial.quote}"
                        </blockquote>
                      </div>
                      <div className="mt-6 flex items-center">
                        <Avatar className="h-12 w-12 border-2 border-primary-50">
                          <AvatarImage
                            src={'/assets/Review.png'}
                            alt={testimonial.name}
                            data-ai-hint="person"
                           />
                          <AvatarFallback>{testimonial.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div className="ml-4 text-left">
                          <p className="font-semibold text-primary-50">{testimonial.name}</p>
                          <p className="text-sm text-gray-600">
                            {testimonial.title}
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="bg-white/80 hover:bg-white text-primary-50 border-white/20" />
          <CarouselNext className="bg-white/80 hover:bg-white text-primary-50 border-white/20" />
        </Carousel>
      </div>
    </section>
  );
}
