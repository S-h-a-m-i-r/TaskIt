import { Card, CardHeader, CardTitle, CardDescription } from '../ui/card';
import { Badge } from '../ui/badge';
import { Palette, Trash2, Settings, Users } from 'lucide-react';
import TaskImage from '../../assets/Task.png'

const features = [
  {
    icon: <Palette className="h-8 w-8 text-primary-50" />,
    title: 'Color-Coded Task Status',
    description: 'Visually track your tasks with intuitive color codes. Instantly know the status of any task and manage your workflow with ease.',
    image: {
      src: TaskImage,
      alt: 'Color coded task board',
      'data-ai-hint': 'task board',
    },
    extraContent: (
      <div className="mt-4 flex flex-wrap gap-2">
        <Badge className="bg-blue-50 text-blue-500">Submitted</Badge>
        <Badge className="bg-yellow-50 text-yellow-500">In Progress</Badge>
        <Badge className="bg-green-50 text-green-500">Completed</Badge>
        <Badge className='bg-red-50 text-red-500'>Closed</Badge>
      </div>
    ),
  },
  {
    icon: <Trash2 className="h-8 w-8 text-primary-50" />,
    title: 'Full Data Control',
    description: 'Your data is yours. Manually delete information or set automatic deletion schedules to maintain privacy and control.',
    image: {
      src: TaskImage,
      alt: 'Data privacy settings screen',
      'data-ai-hint': 'data privacy',
    },
  },
  {
    icon: <Settings className="h-8 w-8 text-primary-50" />,
    title: 'Modern & Responsive',
    description: 'Enjoy a visually appealing, fast, and easy-to-navigate design that works flawlessly across all browsers and devices.',
     image: {
      src: TaskImage,
      alt: 'App shown on different devices',
      'data-ai-hint': 'responsive design',
    },
  },
  {
    icon: <Users className="h-8 w-8 text-primary-50" />,
    title: 'Seamless Collaboration',
    description: 'Invite team members, assign tasks, and track progress together. TaskAway is built for teams of all sizes.',
     image: {
      src: TaskImage,
      alt: 'Team members collaborating on a project',
      'data-ai-hint': 'team collaboration',
    },
  },
];

export function Features() {
  return (
    <section id="features" className="py-20 sm:py-24 lg:py-32 bg-white">
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="font-headline text-3xl font-extrabold text-primary-50 dark:text-white sm:text-4xl">
            Everything You Need to Succeed
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-gray-600">
            TaskAway provides a powerful suite of tools to help you and your team achieve your goals faster.
          </p>
        </div>
        <div className="mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-2">
          {features.map((feature) => (
            <Card key={feature.title} className="flex transform flex-col overflow-hidden bg-white border-gray-200 transition-transform duration-300 hover:scale-105 hover:shadow-xl">
              {feature.image && (
                <div className="overflow-hidden">
                  <img
                    src={feature.image.src}
                    alt={feature.image.alt}
                    width={600}
                    height={400}
                    className="h-auto w-full object-cover"
                    {...(feature.image['data-ai-hint'] && {'data-ai-hint': feature.image['data-ai-hint']})}
                  />
                </div>
              )}
              <CardHeader>
                {feature.icon}
                <CardTitle className="mt-4 font-headline text-xl text-primary-50">{feature.title}</CardTitle>
                <CardDescription className="mt-2 text-base text-gray-600">{feature.description}</CardDescription>
              </CardHeader>
              <div className="flex-grow p-6 pt-0">
                {feature.extraContent}
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
